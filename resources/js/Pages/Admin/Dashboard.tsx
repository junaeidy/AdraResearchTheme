import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatRupiah } from '@/utils/currency';
import AdminLayout from '@/Layouts/AdminLayout';
import StatCard from '@/Components/Dashboard/StatCard';
import { 
    BanknotesIcon, 
    ShoppingBagIcon, 
    KeyIcon, 
    ClockIcon,
    UserIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

interface DashboardProps extends PageProps {
    total_revenue: number;
    total_orders: number;
    total_licenses: number;
    pending_payments: number;
    revenue_trend: Array<{date: string; total: number}>;
    popular_products: Array<{
        id: number;
        name: string;
        orders_count: number;
    }>;
    recent_orders: Array<{
        id: number;
        order_number: string;
        user: { name: string };
        total_amount: number;
        status: string;
        created_at: string;
    }>;
    recent_activations: Array<{
        id: number;
        activated_at: string;
        license: {
            product: { name: string };
            user: { name: string };
        };
    }>;
}

export default function AdminDashboard({ 
    auth, 
    total_revenue,
    total_orders,
    total_licenses,
    pending_payments,
    revenue_trend,
    popular_products,
    recent_orders,
    recent_activations
}: DashboardProps) {
    const [period, setPeriod] = useState('30d');

    const handlePeriodChange = (newPeriod: string) => {
        setPeriod(newPeriod);
        router.get('/admin/dashboard', { period: newPeriod }, { 
            preserveState: true,
            preserveScroll: true
        });
    };

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Revenue"
                        value={formatRupiah(total_revenue)}
                        icon={<BanknotesIcon className="w-6 h-6" />}
                        color="green"
                    />
                    <StatCard
                        title="Total Orders"
                        value={total_orders}
                        icon={<ShoppingBagIcon className="w-6 h-6" />}
                        color="blue"
                    />
                    <StatCard
                        title="Active Licenses"
                        value={total_licenses}
                        icon={<KeyIcon className="w-6 h-6" />}
                        color="purple"
                    />
                    <StatCard
                        title="Pending Payments"
                        value={pending_payments}
                        icon={<ClockIcon className="w-6 h-6" />}
                        color="yellow"
                    />
                </div>

                {/* Period Selector & Revenue Trend */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                        <div className="flex gap-2">
                            {['7d', '30d', '3m', '1y'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => handlePeriodChange(p)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        period === p
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : p === '3m' ? '3 Months' : '1 Year'}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    {revenue_trend && revenue_trend.length > 0 ? (
                        <div className="h-64">
                            <div className="flex items-end h-full gap-2">
                                {revenue_trend.map((item, index) => {
                                    const maxRevenue = Math.max(...revenue_trend.map(r => Number(r.total)));
                                    const height = maxRevenue > 0 ? (Number(item.total) / maxRevenue) * 100 : 0;
                                    
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center">
                                            <div 
                                                className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition relative group"
                                                style={{ height: `${height}%` }}
                                            >
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                                    {formatRupiah(Number(item.total))}
                                                </div>
                                            </div>
                                            <div className="text-xs text-gray-500 mt-2">
                                                {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 flex items-center justify-center text-gray-500">
                            No revenue data for this period
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                            <Link 
                                href="/admin/payment-verification"
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="p-6">
                            {recent_orders && recent_orders.length > 0 ? (
                                <div className="space-y-4">
                                    {recent_orders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                            <div>
                                                <div className="font-medium text-gray-900">{order.order_number}</div>
                                                <div className="text-sm text-gray-500">{order.user?.name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-medium text-gray-900">{formatRupiah(order.total_amount)}</div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No recent orders</p>
                            )}
                        </div>
                    </div>

                    {/* Popular Products */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Popular Products</h3>
                        </div>
                        <div className="p-6">
                            {popular_products && popular_products.length > 0 ? (
                                <div className="space-y-4">
                                    {popular_products.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="font-medium text-gray-900 text-sm">{product.name}</div>
                                                <div className="text-xs text-gray-500">{product.orders_count} sales</div>
                                            </div>
                                            <div className="w-32 bg-gray-200 rounded-full h-2 ml-4">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full" 
                                                    style={{ 
                                                        width: `${Math.min((product.orders_count / (popular_products[0]?.orders_count || 1)) * 100, 100)}%` 
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No sales data</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Recent Activations */}
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Recent License Activations</h3>
                        <Link 
                            href="/admin/licenses"
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            View All →
                        </Link>
                    </div>
                    <div className="p-6">
                        {recent_activations && recent_activations.length > 0 ? (
                            <div className="space-y-3">
                                {recent_activations.map((activation) => (
                                    <div key={activation.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-gray-900">
                                                {activation.license?.product?.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                by {activation.license?.user?.name}
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(activation.activated_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No recent activations</p>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link 
                        href="/admin/products/create"
                        className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition text-center"
                    >
                        <div className="text-lg font-semibold mb-2">+ Add New Product</div>
                        <div className="text-sm text-blue-100">Create a new plugin or theme</div>
                    </Link>

                    <Link 
                        href="/admin/payment-verification"
                        className="bg-yellow-600 text-white p-6 rounded-lg shadow hover:bg-yellow-700 transition text-center"
                    >
                        <div className="text-lg font-semibold mb-2">Payment Verification</div>
                        <div className="text-sm text-yellow-100">{pending_payments} pending</div>
                    </Link>

                    <Link 
                        href="/admin/licenses"
                        className="bg-purple-600 text-white p-6 rounded-lg shadow hover:bg-purple-700 transition text-center"
                    >
                        <div className="text-lg font-semibold mb-2">Manage Licenses</div>
                        <div className="text-sm text-purple-100">{total_licenses} active licenses</div>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
