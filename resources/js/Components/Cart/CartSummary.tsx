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
        <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
            </h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                        Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-medium text-gray-900">
                        {formatRupiah(subtotal)}
                    </span>
                </div>

                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-green-600">
                            -{formatRupiah(discount)}
                        </span>
                    </div>
                )}

                {tax > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium text-gray-900">
                            {formatRupiah(tax)}
                        </span>
                    </div>
                )}

                <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-base font-semibold text-gray-900">
                            Total
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                            {formatRupiah(total)}
                        </span>
                    </div>
                </div>
            </div>

            <Link href="/checkout">
                <PrimaryButton
                    className="w-full py-4 text-base font-semibold justify-center"
                    disabled={itemCount === 0}
                >
                    <svg
                        className="w-5 h-5 mr-2"
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
                </PrimaryButton>
            </Link>

            <Link
                href="/shop"
                className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
                ← Continue Shopping
            </Link>

            {/* Security Info */}
            <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-start text-xs text-gray-500 space-x-2">
                    <svg
                        className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>
                    <span>
                        Your payment information is secure with SSL encryption
                    </span>
                </div>
            </div>
        </div>
    );
}
