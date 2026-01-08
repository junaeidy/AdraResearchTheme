import React from 'react';
import { CartItem } from '@/types/models';
import { formatCurrency } from '@/utils/currency';

interface OrderReviewCardProps {
    items: CartItem[];
    total: number;
}

export default function OrderReviewCard({ items, total }: OrderReviewCardProps) {
    const subtotal = items.reduce((sum, item) => {
        const itemPrice = Number(item.price) || 0;
        const itemQty = Number(item.quantity) || 1;
        const itemTotal = Number(item.total) || (itemPrice * itemQty);
        return sum + itemTotal;
    }, 0);
    const tax = 0; // No tax for now
    const discount = 0; // No discount for now
    const finalTotal = Number(total) || subtotal;
    
    const placeholderImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%2393c5fd" width="400" height="400"/%3E%3Ctext fill="%231e40af" font-family="Arial" font-size="24" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';

    const getLicenseLabel = (type: string, duration: string) => {
        const typeLabels: Record<string, string> = {
            'single-site': 'Single Site',
            'single-journal': 'Single Journal',
            'multi-site': 'Multi Site (5)',
            'multi-journal': 'Multi Journal (5)',
            'unlimited': 'Unlimited',
        };

        const durationLabels: Record<string, string> = {
            '1-year': '1 Year',
            '2-years': '2 Years',
            'lifetime': 'Lifetime',
        };

        return `${typeLabels[type] || type} - ${durationLabels[duration] || duration}`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                        <div className="flex-shrink-0 w-16 h-16">
                            <img
                                src={item.product?.image || placeholderImage}
                                alt={item.product?.name || 'Product'}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                                {item.product.name}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                                {getLicenseLabel(item.license_type, item.license_duration)}
                            </p>
                            <p className="text-sm text-gray-500">
                                Qty: {item.quantity}
                            </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <p className="text-sm font-medium text-gray-900">
                                {formatCurrency(Number(item.total) || (Number(item.price) * Number(item.quantity)))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                
                {tax > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900">{formatCurrency(tax)}</span>
                    </div>
                )}
                
                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-600">-{formatCurrency(discount)}</span>
                    </div>
                )}
                
                <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-200">
                    <span className="text-gray-900">Total</span>
                    <span className="text-blue-600">{formatCurrency(finalTotal)}</span>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                    <strong>Payment Deadline:</strong> Your order must be paid within 3 days.
                </p>
            </div>
        </div>
    );
}
