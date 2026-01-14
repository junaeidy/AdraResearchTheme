import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CheckoutSteps from '@/Components/Checkout/CheckoutSteps';
import { CartItem } from '@/types/models';
import { PageProps } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface Props extends PageProps {
    items: CartItem[];
    total: number;
}

export default function Index({ auth, items, total }: Props) {
    const calculatedTotal = items.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const itemTotal = Number(item.total) || (itemPrice * itemQty);
        return sum + itemTotal;
    }, 0);
    const finalTotal = Number(total) || calculatedTotal;
    
    const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2393c5fd" width="400" height="400"/%3E%3Ctext fill="%231e40af" font-family="Arial" font-size="24" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    return (
        <>
            <Head title="Checkout" />
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header user={auth?.user} currentPage="checkout" />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-[40px] font-bold text-white" style={{fontFamily: 'NexusSansWebPro'}}>
                                    Checkout
                                </h1>
                                <p className="text-[15px] text-blue-100 mt-1">Review your items and proceed to billing information</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CheckoutSteps currentStep="cart" />

                    {items.length === 0 ? (
                        <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg p-16 text-center mt-8">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20"></div>
                                <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-2 border-blue-200">
                                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-[28px] font-bold text-gray-900 mt-6" style={{fontFamily: 'NexusSansWebPro'}}>
                                Your cart is empty
                            </h2>
                            <p className="text-[15px] text-gray-600 mt-3 mb-6">
                                Add some products to get started
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[16px] font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6 mt-8">
                            {/* Cart Items */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                        Order Items ({items.length})
                                    </h2>
                                </div>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                                        >
                                            <div className="flex-shrink-0 w-24 h-24">
                                                <img
                                                    src={item.product?.image || placeholderImage}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-full h-full object-cover rounded-xl shadow-md"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-[17px] font-bold text-gray-900">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-[14px] text-gray-600 mt-1.5 font-medium">
                                                    License: <span className="text-blue-600">{item.license_type}</span> - <span className="text-blue-600">{item.license_duration}</span>
                                                </p>
                                                <p className="text-[14px] text-gray-600 font-medium">
                                                    Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span>
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <p className="text-[20px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    {formatCurrency(Number(item.total) || (Number(item.price) * Number(item.quantity)))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl border-2 border-blue-200 shadow-lg p-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-200">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <h2 className="text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                        Order Summary
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[15px]">
                                        <span className="text-gray-600 font-medium">Subtotal</span>
                                        <span className="text-gray-900 font-bold">{formatCurrency(finalTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-[18px] font-bold pt-4 border-t border-blue-200">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-[28px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{formatCurrency(finalTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center">
                                <Link
                                    href={route('cart.index')}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold text-[15px] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Cart
                                </Link>
                                <Link
                                    href={route('checkout.billing')}
                                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[16px] font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg"
                                >
                                    Continue to Billing
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </>
    );
}
