import { Link } from '@inertiajs/react';
import { formatRupiah } from '@/utils/currency';
import PrimaryButton from '../PrimaryButton';

interface CartSummaryProps {
    subtotal: number;
    discount?: number;
    tax?: number;
    total: number;
    itemCount: number;
}

export default function CartSummary({
    subtotal,
    discount = 0,
    tax = 0,
    total,
    itemCount,
}: CartSummaryProps) {
    return (
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 shadow-lg lg:sticky lg:top-24">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-blue-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                </div>
                <h2 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                    Order Summary
                </h2>
            </div>

            <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-[14px]">
                    <span className="text-gray-600 font-medium">
                        Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-bold text-gray-900">
                        {formatRupiah(subtotal)}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-xs sm:text-[14px]">
                        <span className="text-gray-600 font-medium">Discount</span>
                        <span className="font-bold text-green-600">
                            -{formatRupiah(discount)}
                        </span>
                    </div>
                )}

                {tax > 0 && (
                    <div className="flex justify-between text-xs sm:text-[14px]">
                        <span className="text-gray-600 font-medium">Tax</span>
                        <span className="font-bold text-gray-900">
                            {formatRupiah(tax)}
                        </span>
                    </div>
                )}

                <div className="pt-3 sm:pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-[16px] font-bold text-gray-900">
                            Total
                        </span>
                        <span className="text-2xl sm:text-3xl lg:text-[32px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {formatRupiah(total)}
                        </span>
                    </div>
                </div>
            </div>

            <Link href="/checkout">
                <button
                    className="w-full py-3 sm:py-4 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-[16px] font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                    disabled={itemCount === 0}
                >
                    <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                    Proceed to Checkout
                </button>
            </Link>

            <Link
                href="/shop"
                className="mt-3 sm:mt-4 block text-center text-sm sm:text-[15px] text-blue-600 hover:text-blue-700 active:text-blue-800 font-bold transition-colors"
            >
                ← Continue Shopping
            </Link>

            {/* Security Info */}
            <div className="mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-blue-200">
                <div className="flex items-start gap-2 sm:gap-2.5 bg-green-50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-green-200">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <span className="text-[11px] sm:text-[12px] text-gray-700 font-medium leading-relaxed">
                        Your payment information is secure with SSL encryption
                    </span>
                </div>
            </div>
        </div>
    );
}
