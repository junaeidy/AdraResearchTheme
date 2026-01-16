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
            <div className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-bold shadow-md flex-shrink-0">
                        {auth.user.name.split(' ').map(n=>n[0]).slice(0,2).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 truncate">
                            Welcome back, {auth.user.name}!
                        </h2>
                        <p className="text-sm sm:text-base text-gray-600">
                            Here's an overview of your account activity
                        </p>
                        {stats.total_spent > 0 && (
                            <p className="text-sm text-gray-700 mt-2">
                                Total spent: <span className="font-semibold text-gray-900">{formatRupiah(stats.total_spent)}</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-xl sm:rounded-2xl border-2 border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                    >
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg sm:text-xl shadow-md flex-shrink-0">
                                    <span>{stat.icon}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-xs sm:text-sm font-bold text-gray-700 truncate">{stat.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{stat.description}</p>
                                </div>
                            </div>
                            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex-shrink-0">{stat.value}</div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Recent Orders */}
            {recentOrders && recentOrders.length > 0 && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-[18px] font-bold text-gray-900">Recent Orders</h3>
                        <Link href="/account/orders" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        {recentOrders.slice(0, 3).map((order) => (
                            <Link
                                key={order.id}
                                href={`/account/orders/${order.order_number}`}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100 hover:shadow-md transition gap-2 sm:gap-0"
                            >
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-sm sm:text-base text-gray-900 truncate">Order #{order.order_number}</p>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {order.items?.length || 0} item(s) • {formatRupiah(order.total_amount)}
                                    </p>
                                </div>
                                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 self-start sm:self-center ${
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
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 p-4 sm:p-5 lg:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <h3 className="text-base sm:text-[18px] font-bold text-gray-900">Active Licenses</h3>
                        <Link href="/account/licenses" className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View all
                        </Link>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        {activeLicenses.slice(0, 3).map((license) => (
                            <div
                                key={license.id}
                                className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100 shadow-sm gap-3"
                            >
                                <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 min-w-0 flex-1">
                                    {license.product?.image_url && (
                                        <img
                                            src={license.product.image_url}
                                            alt={license.product.name}
                                            className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl object-cover border border-gray-100 flex-shrink-0"
                                        />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-sm sm:text-base text-gray-900 truncate">{license.product?.name}</p>
                                        <p className="text-xs sm:text-sm text-gray-600">
                                            {license.type} • v{license.product?.version}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    href={`/account/licenses/${license.product?.slug || license.id}`}
                                    className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium flex-shrink-0"
                                >
                                    Manage
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 p-4 sm:p-5 lg:p-6">
                <h3 className="text-base sm:text-[18px] font-bold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <Link
                        href="/shop"
                        className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-white to-blue-50 rounded-lg sm:rounded-xl border border-blue-100 hover:shadow-md transition gap-3"
                    >
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl">
                            🛍️
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm sm:text-base text-gray-900 truncate">Browse Products</p>
                            <p className="text-xs sm:text-sm text-gray-600">Explore our catalog</p>
                        </div>
                    </Link>
                    
                    <Link
                        href="/account/profile"
                        className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-white to-green-50 rounded-lg sm:rounded-xl border border-green-100 hover:shadow-md transition gap-3"
                    >
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-green-400 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl">
                            ⚙️
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-bold text-sm sm:text-base text-gray-900 truncate">Profile Settings</p>
                            <p className="text-xs sm:text-sm text-gray-600">Update your information</p>
                        </div>
                    </Link>
                </div>
            </div>
        </AccountLayout>
    );
}
