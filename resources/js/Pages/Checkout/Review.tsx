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
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header user={auth?.user} currentPage="checkout" />
                
                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 sm:py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white" style={{fontFamily: 'NexusSansWebPro'}}>
                                    Review Your Order
                                </h1>
                                <p className="text-xs sm:text-sm lg:text-[15px] text-blue-100 mt-0.5 sm:mt-1">Please review your order details before proceeding to payment</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <CheckoutSteps currentStep="review" />

                <form onSubmit={handlePlaceOrder} className="mt-6 sm:mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
                            {/* Left Column - Order Details */}
                            <div className="lg:col-span-2 space-y-5 sm:space-y-6">
                                {/* Billing Information */}
                                <BillingInfoCard billing={billing} />

                                {/* Order Items */}
                                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                                    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                            Order Items ({items.length})
                                        </h3>
                                    </div>
                                    <div className="space-y-3.5 sm:space-y-4">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-3 sm:gap-4 pb-3.5 sm:pb-4 border-b border-gray-200 last:border-0"
                                            >
                                                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20">
                                                    <img
                                                        src={item.product?.image_url || placeholderImage}
                                                        alt={item.product?.name || 'Product'}
                                                        className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="text-sm sm:text-[16px] font-bold text-gray-900 line-clamp-2">
                                                        {item.product.name}
                                                    </h4>
                                                    <p className="text-xs sm:text-[14px] text-gray-600 mt-1 sm:mt-1.5 font-medium">
                                                        <span className="text-blue-600">{item.license_type}</span> - <span className="text-blue-600">{item.license_duration}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-[14px] text-gray-600 font-medium">
                                                        Qty: <span className="text-gray-900 font-bold">{item.quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                                    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                            Terms and Conditions
                                        </h3>
                                    </div>
                                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg sm:rounded-xl p-4 sm:p-5 mb-4 sm:mb-5 max-h-64 overflow-y-auto border border-gray-200">
                                        <div className="text-xs sm:text-[14px] text-gray-700 space-y-2.5 sm:space-y-3 leading-relaxed">
                                            <p className="font-bold text-sm sm:text-[15px] text-gray-900">License Agreement</p>
                                            <ul className="list-disc list-inside space-y-1.5 ml-2">
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
                                            <p className="font-bold text-[15px] text-gray-900 mt-4">Payment Terms</p>
                                            <ul className="list-disc list-inside space-y-1.5 ml-2">
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
                                            <p className="font-bold text-[15px] text-gray-900 mt-4">Refund Policy</p>
                                            <ul className="list-disc list-inside space-y-1.5 ml-2">
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
                                    <div className="flex items-start gap-2.5 sm:gap-3 bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-blue-200">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={termsAccepted}
                                            onChange={(e) => setTermsAccepted(e.target.checked)}
                                            className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded-md border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 flex-shrink-0"
                                        />
                                        <label htmlFor="terms" className="text-xs sm:text-[14px] text-gray-700 font-medium leading-relaxed">
                                            I have read and agree to the{' '}
                                            <a href="#" className="text-blue-600 hover:text-blue-700 active:text-blue-800 font-bold">
                                                Terms and Conditions
                                            </a>{' '}
                                            and{' '}
                                            <a href="privacy-policy" className="text-blue-600 hover:text-blue-700 active:text-blue-800 font-bold">
                                                Privacy Policy
                                            </a>
                                            <span className="text-red-500 font-bold"> *</span>
                                        </label>
                                    </div>
                                    {validationErrors.terms_accepted && (
                                        <p className="mt-2.5 sm:mt-3 text-xs sm:text-[13px] text-red-600 font-medium">
                                            {validationErrors.terms_accepted}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Right Column - Order Summary (Sticky) */}
                            <div className="lg:col-span-1">
                                <div className="lg:sticky lg:top-6">
                                    <OrderReviewCard items={items} total={finalTotal} />

                                    {/* Place Order Button */}
                                    <button
                                        type="submit"
                                        disabled={!termsAccepted || isSubmitting}
                                        className="w-full mt-5 sm:mt-6 px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base sm:text-[17px] lg:text-[18px] rounded-lg sm:rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-200 shadow-lg flex items-center justify-center gap-2.5 sm:gap-3"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Place Order
                                            </>
                                        )}
                                    </button>

                                    <p className="text-[11px] sm:text-[12px] text-gray-600 text-center mt-3 sm:mt-4 font-medium px-2">
                                        By placing your order, you agree to our terms and conditions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            <Footer />
        </>
    );
}
