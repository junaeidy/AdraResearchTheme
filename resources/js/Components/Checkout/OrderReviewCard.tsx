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
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-lg p-4 sm:p-6">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-blue-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                    </svg>
                </div>
                <h3 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>Order Summary</h3>
            </div>
            
            {/* Order Items */}
            <div className="space-y-3.5 sm:space-y-4 mb-5 sm:mb-6">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-2.5 sm:gap-3 pb-3.5 sm:pb-4 border-b border-blue-200/60 last:border-0">
                        <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16">
                            <img
                                src={item.product?.image || placeholderImage}
                                alt={item.product?.name || 'Product'}
                                className="w-full h-full object-cover rounded-lg sm:rounded-xl shadow-md"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-[14px] font-bold text-gray-900 line-clamp-2">
                                {item.product.name}
                            </h4>
                            <p className="text-[11px] sm:text-[12px] text-gray-600 mt-0.5 sm:mt-1 font-medium">
                                {getLicenseLabel(item.license_type, item.license_duration)}
                            </p>
                            <p className="text-[11px] sm:text-[12px] text-gray-600 font-medium">
                                Qty: <span className="text-gray-900 font-bold">{item.quantity}</span>
                            </p>
                        </div>
                        <div className="flex-shrink-0 text-right">
                            <p className="text-sm sm:text-[15px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                {formatCurrency(Number(item.total) || (Number(item.price) * Number(item.quantity)))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Totals */}
            <div className="space-y-2.5 sm:space-y-3 border-t-2 border-blue-200 pt-3.5 sm:pt-4">
                <div className="flex justify-between text-xs sm:text-[14px]">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold">{formatCurrency(subtotal)}</span>
                </div>
                
                {tax > 0 && (
                    <div className="flex justify-between text-xs sm:text-[14px]">
                        <span className="text-gray-600 font-medium">Tax</span>
                        <span className="text-gray-900 font-bold">{formatCurrency(tax)}</span>
                    </div>
                )}
                
                {discount > 0 && (
                    <div className="flex justify-between text-xs sm:text-[14px]">
                        <span className="text-gray-600 font-medium">Discount</span>
                        <span className="text-green-600 font-bold">-{formatCurrency(discount)}</span>
                    </div>
                )}
                
                <div className="flex justify-between items-center pt-2.5 sm:pt-3 border-t-2 border-blue-200">
                    <span className="text-sm sm:text-[16px] font-bold text-gray-900">Total</span>
                    <span className="text-2xl sm:text-[28px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{formatCurrency(finalTotal)}</span>
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-200">
                <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <p className="text-[11px] sm:text-[13px] text-blue-900 font-bold leading-relaxed">
                        Payment Deadline: Your order must be paid within 3 days.
                    </p>
                </div>
            </div>
        </div>
    );
}
