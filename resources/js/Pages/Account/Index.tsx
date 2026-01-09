import { PageProps, Order, License } from '@/types';
import AccountLayout from '@/Layouts/AccountLayout';
import { Link } from '@inertiajs/react';
import { formatRupiah } from '@/utils/currency';

interface AccountStats {
    active_orders: number;
    active_licenses: number;
    total_downloads: number;
    total_spent: number;
}

interface Props extends PageProps {
    stats: AccountStats;
    recentOrders: Order[];
    activeLicenses: License[];
}

export default function AccountDashboard({ auth, stats, recentOrders, activeLicenses }: Props) {
    const statCards = [
        {
            name: 'Active Orders',
            value: stats.active_orders.toString(),
            href: '/account/orders',
            icon: '📦',
            description: 'View your order history',
        },
        {
            name: 'Active Licenses',
            value: stats.active_licenses.toString(),
            href: '/account/licenses',
            icon: '🔑',
            description: 'Manage your licenses',
        },
        {
            name: 'Downloads',
            value: stats.total_downloads.toString(),
            href: '/account/downloads',
            icon: '📥',
            description: 'Access your downloads',
        },
    ];

    return (
        <AccountLayout title="My Account" auth={auth}>
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Welcome back, {auth.user.name}!
                </h2>
                <p className="text-gray-600">
                    Here's an overview of your account activity
                </p>
                {stats.total_spent > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                        Total spent: <span className="font-semibold text-gray-900">{formatRupiah(stats.total_spent)}</span>
                    </p>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-4xl">{stat.icon}</span>
                            <span className="text-3xl font-bold text-gray-900">
                                {stat.value}
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {stat.name}
                        </h3>
                        <p className="text-sm text-gray-600">{stat.description}</p>
                    </Link>
                ))}
            </div>

            {/* Recent Orders */}
            {recentOrders && recentOrders.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                        <Link href="/account/orders" className="text-sm text-blue-600 hover:text-blue-800">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {recentOrders.slice(0, 3).map((order) => (
                            <Link
                                key={order.id}
                                href={`/account/orders/${order.order_number}`}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">Order #{order.order_number}</p>
                                    <p className="text-sm text-gray-600">
                                        {order.items?.length || 0} item(s) • {formatRupiah(order.total_amount)}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                }`}>
                                    {order.status}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Active Licenses */}
            {activeLicenses && activeLicenses.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Active Licenses</h3>
                        <Link href="/account/licenses" className="text-sm text-blue-600 hover:text-blue-800">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {activeLicenses.slice(0, 3).map((license) => (
                            <div
                                key={license.id}
                                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                            >
                                <div className="flex items-center gap-4">
                                    {license.product?.image && (
                                        <img
                                            src={`/storage/${license.product.image}`}
                                            alt={license.product.name}
                                            className="w-12 h-12 rounded object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="font-medium text-gray-900">{license.product?.name}</p>
                                        <p className="text-sm text-gray-600">
                                            {license.type} • v{license.product?.version}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/account/licenses/${license.product?.slug || license.id}`}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Manage
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link
                        href="/shop"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                            🛍️
                        </div>
                        <div className="ml-4">
                            <p className="font-medium text-gray-900">Browse Products</p>
                            <p className="text-sm text-gray-600">Explore our catalog</p>
                        </div>
                    </Link>
                    
                    <Link
                        href="/account/profile"
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                    >
                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                            ⚙️
                        </div>
                        <div className="ml-4">
                            <p className="font-medium text-gray-900">Profile Settings</p>
                            <p className="text-sm text-gray-600">Update your information</p>
                        </div>
                    </Link>
                </div>
            </div>
        </AccountLayout>
    );
}
