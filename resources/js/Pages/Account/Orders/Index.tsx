import { Order, PageProps } from '@/types';
import { Link } from '@inertiajs/react';
import AccountLayout from '@/Layouts/AccountLayout';
import PaymentStatusBadge from '@/Components/Order/PaymentStatusBadge';
import { formatRupiah } from '@/utils/currency';

interface Props extends PageProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function OrdersIndex({ auth, orders }: Props) {
    const getOrderStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            awaiting_verification: 'bg-blue-100 text-blue-800',
            processing: 'bg-blue-100 text-blue-800',
            completed: 'bg-green-100 text-green-800',
            cancelled: 'bg-gray-100 text-gray-800',
            payment_rejected: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const formatStatus = (status: string) => {
        return status
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <AccountLayout title="My Orders" auth={auth}>
            {/* Orders List */}
            {orders.data.length === 0 ? (
                        <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border-2 border-gray-100 p-8 sm:p-10 lg:p-12 text-center">
                            <svg className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h3 className="mt-4 text-base sm:text-lg font-semibold text-gray-900">No orders yet</h3>
                            <p className="mt-2 text-xs sm:text-sm text-gray-500">
                                Start shopping to see your orders here.
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="mt-4 sm:mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3 sm:space-y-4">
                            {orders.data.map((order) => (
                                <div key={order.id} className="bg-white rounded-xl sm:rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-4 sm:p-5 lg:p-6">
                                        <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                                                    Order #{order.order_number}
                                                </h3>
                                                <p className="text-sm text-gray-500 mt-1">
                                                    {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </p>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 items-center">
                                                <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                                                    {formatStatus(order.status)}
                                                </span>
                                                <PaymentStatusBadge status={order.payment_status} />
                                            </div>
                                        </div>

                                        {/* Order Items Summary */}
                                        <div className="space-y-2 mb-3 sm:mb-4">
                                            {order.items?.slice(0, 2).map((item) => (
                                                <div key={item.id} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                                    {item.product?.image && (
                                                        <img
                                                            src={`/storage/${item.product.image}`}
                                                            alt={item.product_name}
                                                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg sm:rounded-xl border border-gray-100 flex-shrink-0"
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-gray-900 truncate">{item.product_name}</p>
                                                        <p className="text-gray-500 truncate">
                                                            {item.license_type} • {item.license_duration}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-gray-900 text-sm sm:text-base flex-shrink-0">
                                                        {formatRupiah(item.price)}
                                                    </p>
                                                </div>
                                            ))}
                                            {order.items && order.items.length > 2 && (
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    +{order.items.length - 2} more item(s)
                                                </p>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 sm:pt-4 border-t border-gray-100 gap-3 sm:gap-0">
                                            <div>
                                                <p className="text-xs sm:text-sm text-gray-600">Total Amount</p>
                                                <p className="text-lg sm:text-xl font-bold text-gray-900">
                                                    {formatRupiah(order.total_amount)}
                                                </p>
                                            </div>
                                            
                                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                                {order.payment_status === 'unpaid' && (
                                                    <Link
                                                        href={route('payment.index', order.order_number)}
                                                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                                                    >
                                                        Complete Payment
                                                    </Link>
                                                )}
                                                
                                                {order.payment_status === 'rejected' && (
                                                    <Link
                                                        href={route('payment.index', order.order_number)}
                                                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-500 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                                                    >
                                                        Resubmit Payment
                                                    </Link>
                                                )}
                                                
                                                <Link
                                                    href={route('orders.show', order.order_number)}
                                                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-sm transition"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {orders.last_page > 1 && (
                        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1 sm:gap-2">
                            {Array.from({ length: orders.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={route('orders.index', { page })}
                                    className={`
                                        px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm sm:text-base
                                        ${page === orders.current_page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                        }
                                    `}
                                >
                                    {page}
                                </Link>
                            ))}
                        </div>
                    )}
        </AccountLayout>
    );
}
