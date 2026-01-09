import AdminLayout from '@/Layouts/AdminLayout';
import { PaymentProof, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { formatRupiah } from '@/utils/currency';

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    payment_status: string;
    status: string;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    payment_proof?: PaymentProof;
    items: any[];
}

interface Props extends PageProps {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    stats: {
        unpaid: number;
        pending_verification: number;
        rejected: number;
    };
}

export default function PaymentVerificationIndex({ auth, orders, stats }: Props) {
    // Default values to prevent undefined errors
    const safeStats = stats || { unpaid: 0, pending_verification: 0, rejected: 0 };
    const safeOrders = orders || { data: [], current_page: 1, last_page: 1, per_page: 20, total: 0 };
    
    return (
        <AdminLayout user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Order & Payment</h2>
            }>
            <Head title="Payment Verification" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Orders & Payment Verification
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Review and verify pending payment proofs
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-red-600 font-medium">Unpaid Orders</p>
                                    <p className="text-3xl font-bold text-red-900 mt-2">
                                        {safeStats.unpaid}
                                    </p>
                                </div>
                                <svg className="w-12 h-12 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-yellow-600 font-medium">Pending Verification</p>
                                    <p className="text-3xl font-bold text-yellow-900 mt-2">
                                        {safeStats.pending_verification}
                                    </p>
                                </div>
                                <svg className="w-12 h-12 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600 font-medium">Rejected</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">
                                        {safeStats.rejected}
                                    </p>
                                </div>
                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Orders List */}
                    {safeOrders.data.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">All caught up!</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                There are no orders requiring attention at the moment.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Number
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Payment Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {safeOrders.data.map((order) => {
                                        const getStatusBadge = (status: string) => {
                                            const styles = {
                                                unpaid: 'bg-red-100 text-red-800',
                                                pending_verification: 'bg-yellow-100 text-yellow-800',
                                                paid: 'bg-green-100 text-green-800',
                                                rejected: 'bg-gray-100 text-gray-800',
                                            };
                                            return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
                                        };
                                        
                                        return (
                                        <tr key={order.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">
                                                    {order.order_number}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {order.user.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {order.user.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {formatRupiah(order.total_amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(order.payment_status)}`}>
                                                    {order.payment_status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                {order.payment_proof ? (
                                                    <Link
                                                        href={route('admin.payment-verification.show', order.order_number)}
                                                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                    >
                                                        Review Payment
                                                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                ) : (
                                                    <span className="text-sm text-gray-500">Waiting for payment</span>
                                                )}
                                            </td>
                                        </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    {safeOrders.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {Array.from({ length: safeOrders.last_page }, (_, i) => i + 1).map((page) => (
                                <Link
                                    key={page}
                                    href={route('admin.payment-verification.index', { page })}
                                    className={`
                                        px-4 py-2 rounded-lg transition-colors
                                        ${page === safeOrders.current_page
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
                </div>
            </div>
        </AdminLayout>
    );
}
