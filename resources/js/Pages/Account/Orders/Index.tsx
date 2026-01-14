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
                        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900">No orders yet</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Start shopping to see your orders here.
                            </p>
                            <Link
                                href={route('shop.index')}
                                className="mt-6 inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                            >
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.data.map((order) => (
                                <div key={order.id} className="bg-white rounded-2xl shadow-sm border-2 border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900">
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
                                            
                                            <div className="flex gap-2 items-center">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
                                                    {formatStatus(order.status)}
                                                </span>
                                                <PaymentStatusBadge status={order.payment_status} />
                                            </div>
                                        </div>

                                        {/* Order Items Summary */}
                                        <div className="space-y-2 mb-4">
                                            {order.items?.slice(0, 2).map((item) => (
                                                <div key={item.id} className="flex items-center gap-3 text-sm">
                                                    {item.product?.image && (
                                                        <img
                                                            src={`/storage/${item.product.image}`}
                                                            alt={item.product_name}
                                                            className="w-12 h-12 object-cover rounded-xl border border-gray-100"
                                                        />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="font-medium text-gray-900">{item.product_name}</p>
                                                        <p className="text-gray-500">
                                                            {item.license_type} • {item.license_duration}
                                                        </p>
                                                    </div>
                                                    <p className="font-semibold text-gray-900">
                                                        {formatRupiah(item.price)}
                                                    </p>
                                                </div>
                                            ))}
                                            {order.items && order.items.length > 2 && (
                                                <p className="text-sm text-gray-500">
                                                    +{order.items.length - 2} more item(s)
                                                </p>
                                            )}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div>
                                                <p className="text-sm text-gray-600">Total Amount</p>
                                                <p className="text-xl font-bold text-gray-900">
                                                    {formatRupiah(order.total_amount)}
                                                </p>
                                            </div>
                                            
                                            <div className="flex gap-3">
                                                {order.payment_status === 'unpaid' && (
                                                    <Link
                                                        href={route('payment.index', order.order_number)}
                                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                                                    >
                                                        Complete Payment
                                                    </Link>
                                                )}
                                                
                                                {order.payment_status === 'rejected' && (
                                                    <Link
                                                        href={route('payment.index', order.order_number)}
                                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-500 text-white rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                                                    >
                                                        Resubmit Payment
                                                    </Link>
                                                )}
                                                
                                                <Link
                                                    href={route('orders.show', order.order_number)}
                                                    className="inline-flex items-center px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:shadow-sm transition"
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
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: orders.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={route('orders.index', { page })}
                                    className={`
                                        px-4 py-2 rounded-lg transition-colors
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
