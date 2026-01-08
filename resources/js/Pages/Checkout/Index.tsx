import React from 'react';
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
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="checkout" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CheckoutSteps currentStep="cart" />

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
                    <p className="text-gray-600 mb-8">
                        Review your items and proceed to billing information
                    </p>

                    {items.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <ShoppingCartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Add some products to get started
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Cart Items */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Items ({items.length})
                                </h2>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                                        >
                                            <div className="flex-shrink-0 w-20 h-20">
                                                <img
                                                    src={item.product?.image || placeholderImage}
                                                    alt={item.product?.name || 'Product'}
                                                    className="w-full h-full object-cover rounded"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-base font-medium text-gray-900">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    License: {item.license_type} - {item.license_duration}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Quantity: {item.quantity}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 text-right">
                                                <p className="text-base font-semibold text-gray-900">
                                                    {formatCurrency(Number(item.total) || (Number(item.price) * Number(item.quantity)))}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Summary
                                </h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-base">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="text-gray-900">{formatCurrency(finalTotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                                        <span className="text-gray-900">Total</span>
                                        <span className="text-blue-600">{formatCurrency(finalTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between items-center">
                                <Link
                                    href={route('cart.index')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    ← Back to Cart
                                </Link>
                                <Link
                                    href={route('checkout.billing')}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Continue to Billing
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
        </>
    );
}
