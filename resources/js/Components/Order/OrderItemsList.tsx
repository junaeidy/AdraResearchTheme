import { OrderItem } from '@/types';
import { formatRupiah } from '@/utils/currency';
import { Link } from '@inertiajs/react';

interface OrderItemsListProps {
    items: OrderItem[];
    showLicenses?: boolean;
}

export default function OrderItemsList({ items, showLicenses = false }: OrderItemsListProps) {
    const formatLicenseType = (type: string) => {
        const types: Record<string, string> = {
            'single-site': 'Single Site',
            'multi-site': 'Multi Site (5 sites)',
            'unlimited': 'Unlimited Sites',
            'single-journal': 'Single Journal',
            'multi-journal': 'Multi Journal (5 journals)',
        };
        return types[type] || type;
    };

    const formatDuration = (duration: string) => {
        const durations: Record<string, string> = {
            '1-year': '1 Year',
            '2-years': '2 Years',
            'lifetime': 'Lifetime',
        };
        return durations[duration] || duration;
    };

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex gap-4">
                        {item.product?.image && (
                            <img
                                src={`/storage/${item.product.image}`}
                                alt={item.product_name}
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                        )}
                        
                        <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900">
                                {item.product_name}
                            </h4>
                            
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                    <span>License: {formatLicenseType(item.license_type)}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Duration: {formatDuration(item.license_duration)}</span>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span>Version: {item.product_version}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                            <p className="text-lg font-semibold text-gray-900">
                                {formatRupiah(item.price)}
                            </p>
                            {item.quantity > 1 && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Qty: {item.quantity}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Show license key if order is completed */}
                    {showLicenses && item.product && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-medium text-green-900">
                                            License Key Ready
                                        </p>
                                        <p className="text-xs text-green-700 mt-0.5">
                                            Check your email for license details
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/account/licenses`}
                                    className="text-sm font-medium text-green-700 hover:text-green-800"
                                >
                                    View License →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
