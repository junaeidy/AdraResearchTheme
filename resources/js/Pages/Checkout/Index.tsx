import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CheckoutSteps from '@/Components/Checkout/CheckoutSteps';
import WhatsAppButton from '@/Components/Shared/WhatsAppButton';
import { CartItem } from '@/types/models';
import { PageProps } from '@/types';
import { formatCurrency } from '@/utils/currency';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface Props extends PageProps {
    items: CartItem[];
    subtotal: number;
    total: number;
    taxPercentage?: number;
}

export default function Index({ auth, items, subtotal, total, taxPercentage = 0 }: Props) {
    const itemCount = items.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
    const calculatedSubtotal = items.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const itemTotal = Number(item.total) || (itemPrice * itemQty);
        return sum + itemTotal;
    }, 0);
    const finalSubtotal = Number(subtotal) || calculatedSubtotal;
    const finalTotal = Number(total) || finalSubtotal;
    
    const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2393c5fd" width="400" height="400"/%3E%3Ctext fill="%231e40af" font-family="Arial" font-size="24" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
    
    return (
        <>
            <Head title="Checkout" />
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header user={auth?.user} currentPage="checkout" />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 sm:py-10">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white" style={{fontFamily: 'NexusSansWebPro'}}>
                                    Checkout
                                </h1>
                                <p className="text-xs sm:text-sm lg:text-[15px] text-blue-100 mt-0.5 sm:mt-1">Review your items and proceed to billing information</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <CheckoutSteps currentStep="cart" />

                    {items.length === 0 ? (
                        <div className="bg-white rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-lg p-8 sm:p-12 lg:p-16 text-center mt-6 sm:mt-8">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20"></div>
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-2 border-blue-200">
                                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl sm:text-[28px] font-bold text-gray-900 mt-5 sm:mt-6" style={{fontFamily: 'NexusSansWebPro'}}>
                                Your cart is empty
                            </h2>
                            <p className="text-sm sm:text-[15px] text-gray-600 mt-2.5 sm:mt-3 mb-5 sm:mb-6 px-4">
                                Add some products to get started
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-[16px] font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-5 sm:space-y-6 mt-6 sm:mt-8">
                            {/* Cart Items */}
                            <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                                <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                        Order Items ({items.length})
                                    </h2>
                                </div>
                                <div className="space-y-3.5 sm:space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-3.5 sm:pb-4 border-b border-gray-200 last:border-0"
                                        >
                                            <div className="flex gap-3 sm:gap-4">
                                                <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24">
                                                    <img
                                                        src={item.product?.image_url || placeholderImage}
                                                        alt={item.product?.name || 'Product'}
                                                        className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-base sm:text-[17px] font-bold text-gray-900 line-clamp-2">
                                                        {item.product.name}
                                                    </h3>
                                                    <p className="text-xs sm:text-[14px] text-gray-600 mt-1 sm:mt-1.5 font-medium">
                                                        License: <span className="text-blue-600">{item.license_type}</span> - <span className="text-blue-600">{item.license_duration}</span>
                                                    </p>
                                                    <p className="text-xs sm:text-[14px] text-gray-600 font-medium">
                                                        Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 sm:text-right">
                                                <p className="text-lg sm:text-[20px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    {formatCurrency(Number(item.total) || (Number(item.price) * Number(item.quantity)))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-lg p-4 sm:p-6">
                                <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-blue-200">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <h2 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                        Order Summary
                                    </h2>
                                </div>
                                <div className="space-y-2.5 sm:space-y-3">
                                    <div className="flex justify-between text-sm sm:text-[15px]">
                                        <span className="text-gray-600 font-medium">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                                        <span className="text-gray-900 font-bold">{formatCurrency(finalSubtotal)}</span>
                                    </div>
                                    
                                    {taxPercentage > 0 && (
                                        <div className="flex justify-between text-sm sm:text-[15px]">
                                            <span className="text-gray-600 font-medium">Tax ({taxPercentage}%)</span>
                                            <span className="text-gray-900 font-bold">{formatCurrency(Math.round((finalSubtotal * taxPercentage) / 100))}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-base sm:text-[18px] font-bold pt-3 sm:pt-4 border-t border-blue-200">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-2xl sm:text-[28px] bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{formatCurrency(finalTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
                                <Link
                                    href={route('cart.index')}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 active:text-blue-800 font-bold text-sm sm:text-[15px] transition-colors"
                                >
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Cart
                                </Link>
                                <Link
                                    href={route('checkout.billing')}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-[16px] font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                                >
                                    Continue to Billing
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
            
            {/* WhatsApp Floating Button */}
            <WhatsAppButton 
                phoneNumber={import.meta.env.VITE_WHATSAPP_NUMBER || '+6281234567890'}
                message="Hi! I need assistance with my checkout process."
            />
        </>
    );
}
