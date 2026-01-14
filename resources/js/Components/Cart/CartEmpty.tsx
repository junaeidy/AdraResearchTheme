import { Link } from '@inertiajs/react';

export default function CartEmpty() {
    return (
        <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-20"></div>
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center border-2 border-blue-200">
                    <svg
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                    </svg>
                </div>
            </div>
            <h3 className="mt-6 sm:mt-8 text-2xl sm:text-3xl lg:text-[32px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                Your cart is empty
            </h3>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-[15px] lg:text-[16px] text-gray-600 max-w-md mx-auto px-4">
                Looks like you haven't added any products to your cart yet.
            </p>
            <Link
                href="/shop"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-[16px] font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Continue Shopping
            </Link>
        </div>
    );
}
