import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CheckoutSteps from '@/Components/Checkout/CheckoutSteps';
import OrderReviewCard from '@/Components/Checkout/OrderReviewCard';
import BillingInfoCard from '@/Components/Checkout/BillingInfoCard';
import { CartItem } from '@/types/models';
import { BillingFormData } from '@/utils/validationSchemas';
import { PageProps } from '@/types';

interface Props extends PageProps {
    items: CartItem[];
    billing: BillingFormData;
    total: number;
}

export default function Review({ auth, items, billing, total }: Props) {
    const calculatedTotal = items.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const itemTotal = Number(item.total) || (itemPrice * itemQty);
        return sum + itemTotal;
    }, 0);
    const finalTotal = Number(total) || calculatedTotal;
    
    const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2393c5fd" width="400" height="400"/%3E%3Ctext fill="%231e40af" font-family="Arial" font-size="24" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState<any>({});
    
    // 🔒 Generate idempotency key once and reuse it
    const [idempotencyKey] = useState(() => {
        // Create a unique key based on user ID, session, and timestamp
        const userId = auth?.user?.id || 'guest';
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        return `${userId}-${timestamp}-${random}`;
    });

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!termsAccepted) {
            return;
        }

        setIsSubmitting(true);
        
        // Use Inertia router.post to send data with idempotency key
        router.post(route('checkout.order.store'), {
            terms_accepted: 1,
            idempotency_key: idempotencyKey,
        }, {
            onSuccess: () => {
                // Will redirect to payment page
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
                setValidationErrors(errors);
                setIsSubmitting(false);
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <>
            <Head title="Review Order" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="checkout" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <CheckoutSteps currentStep="review" />

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Order</h1>
                    <p className="text-gray-600 mb-8">
                        Please review your order details before proceeding to payment
                    </p>

                    <form onSubmit={handlePlaceOrder}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column - Order Details */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Billing Information */}
                                <BillingInfoCard billing={billing} />

                                {/* Order Items */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Order Items ({items.length})
                                    </h3>
                                    <div className="space-y-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                                            >
                                                <div className="flex-shrink-0 w-16 h-16">
                                                    <img
                                                        src={item.product?.image || placeholderImage}
                                                        alt={item.product?.name || 'Product'}
                                                        className="w-full h-full object-cover rounded"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-base font-medium text-gray-900">
                                                        {item.product.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {item.license_type} - {item.license_duration}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Terms and Conditions
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
                                        <div className="text-sm text-gray-700 space-y-2">
                                            <p className="font-semibold">License Agreement</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>
                                                    Licenses are valid according to the selected type and duration
                                                </li>
                                                <li>
                                                    Each license is tied to the specified domain or journal
                                                </li>
                                                <li>
                                                    Lifetime licenses include lifetime updates and support
                                                </li>
                                                <li>
                                                    Time-limited licenses can be renewed after expiration
                                                </li>
                                            </ul>
                                            <p className="font-semibold mt-3">Payment Terms</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>
                                                    Payment must be completed within 3 days of order creation
                                                </li>
                                                <li>
                                                    Orders will be cancelled if payment is not received
                                                </li>
                                                <li>
                                                    All prices are in IDR (Indonesian Rupiah)
                                                </li>
                                            </ul>
                                            <p className="font-semibold mt-3">Refund Policy</p>
                                            <ul className="list-disc list-inside space-y-1 ml-2">
                                                <li>
                                                    Refunds available within 14 days of purchase
                                                </li>
                                                <li>
                                                    License must not have been activated to qualify
                                                </li>
                                                <li>
                                                    Contact support for refund requests
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <label htmlFor="terms" className="text-sm text-gray-700">
                                            I have read and agree to the{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-700">
                                                Terms and Conditions
                                            </a>{' '}
                                            and{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-700">
                                                Privacy Policy
                                            </a>
                                            <span className="text-red-500"> *</span>
                                        </label>
                                    </div>
                                    {validationErrors.terms_accepted && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {validationErrors.terms_accepted}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Order Summary (Sticky) */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-6">
                                    <OrderReviewCard items={items} total={finalTotal} />

                                    {/* Place Order Button */}
                                    <button
                                        type="submit"
                                        disabled={!termsAccepted || isSubmitting}
                                        className="w-full mt-6 px-6 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSubmitting ? 'Processing...' : 'Place Order'}
                                    </button>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        By placing your order, you agree to our terms and conditions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <Footer />
        </div>
        </>
    );
}
