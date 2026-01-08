import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatRupiah } from '@/utils/currency';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/Shared/Card';

interface DashboardProps extends PageProps {
    stats: {
        total_products: number;
        active_products: number;
        total_orders: number;
        pending_orders: number;
        total_customers: number;
        total_revenue: number;
    };
    recentOrders: any[];
}

export default function AdminDashboard({ auth, stats, recentOrders }: DashboardProps) {
    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="max-w-7xl">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="text-sm text-gray-600 mb-1">Total Products</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_products}</div>
                        <div className="text-sm text-green-600 mt-2">
                            {stats.active_products} active
                        </div>
                    </Card>

                    <Card>
                        <div className="text-sm text-gray-600 mb-1">Total Orders</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_orders}</div>
                        <div className="text-sm text-yellow-600 mt-2">
                            {stats.pending_orders} pending
                        </div>
                    </Card>

                    <Card>
                        <div className="text-sm text-gray-600 mb-1">Total Customers</div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_customers}</div>
                    </Card>
                </div>

                {/* Revenue Card */}
                <Card className="mb-8">
                    <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                    <div className="text-3xl font-bold text-green-600">
                        {formatRupiah(stats.total_revenue)}
                    </div>
                </Card>

                {/* Recent Orders */}
                <Card>
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    </div>
                    <div className="p-6">
                        {recentOrders.length > 0 ? (
                            <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Order #
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Customer
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Total
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                                                    Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {recentOrders.map((order) => (
                                                <tr key={order.id}>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {order.order_number}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {order.user?.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {formatRupiah(order.total_amount)}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            order.status === 'completed' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : order.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-500">
                                                        {new Date(order.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No orders yet</p>
                            )}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Link 
                            href="/admin/products/create"
                            className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition text-center"
                        >
                            <div className="text-lg font-semibold mb-2">+ Add New Product</div>
                            <div className="text-sm text-blue-100">Create a new plugin or theme</div>
                        </Link>

                        <Link 
                            href="/admin/categories"
                            className="bg-indigo-600 text-white p-6 rounded-lg shadow hover:bg-indigo-700 transition text-center"
                        >
                            <div className="text-lg font-semibold mb-2">Manage Categories</div>
                            <div className="text-sm text-indigo-100">View all categories</div>
                        </Link>

                        <Link 
                            href="/admin/products"
                            className="bg-gray-600 text-white p-6 rounded-lg shadow hover:bg-gray-700 transition text-center"
                        >
                            <div className="text-lg font-semibold mb-2">Manage Products</div>
                            <div className="text-sm text-gray-100">View and edit all products</div>
                        </Link>
                    </div>
                </div>
        </AdminLayout>
    );
}
