import { Link } from '@inertiajs/react';

export default function CartEmpty() {
    return (
        <div className="text-center py-16">
            <svg
                className="mx-auto h-24 w-24 text-gray-300"
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
            <h3 className="mt-4 text-2xl font-semibold text-gray-900">
                Your cart is empty
            </h3>
            <p className="mt-2 text-gray-600">
                Looks like you haven't added any products to your cart yet.
            </p>
            <Link
                href="/shop"
                className="mt-6 inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
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
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                </svg>
                Continue Shopping
            </Link>
        </div>
    );
}
