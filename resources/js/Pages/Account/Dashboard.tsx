import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { formatRupiah } from '@/utils/currency';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/Dashboard/StatCard';
import { 
    KeyIcon, 
    ClockIcon, 
    ShoppingBagIcon, 
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface License {
    id: number;
    license_key: string;
    status: string;
    expires_at: string | null;
    product: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Order {
    id: number;
    order_number: string;
    total_amount: number;
    status: string;
    payment_status: string;
    created_at: string;
    items: Array<{
        product_name: string;
    }>;
}

interface DashboardProps extends PageProps {
    active_licenses: number;
    expiring_soon: number;
    total_orders: number;
    pending_orders: number;
    recent_licenses: License[];
    recent_orders: Order[];
}

export default function CustomerDashboard({ 
    auth, 
    active_licenses,
    expiring_soon,
    total_orders,
    pending_orders,
    recent_licenses,
    recent_orders
}: DashboardProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-white">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">Welcome back, {auth.user.name}!</h1>
                    <p className="text-sm sm:text-base text-blue-100 mb-4 sm:mb-6">Here's an overview of your account</p>
                    <div className="flex flex-wrap gap-2 sm:gap-4">
                        <Link 
                            href="/account/licenses"
                            className="bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition transform hover:scale-105 backdrop-blur-sm font-medium text-sm sm:text-base"
                        >
                            View Licenses
                        </Link>
                        <Link 
                            href="/account/orders"
                            className="bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition transform hover:scale-105 backdrop-blur-sm font-medium text-sm sm:text-base"
                        >
                            My Orders
                        </Link>
                        <Link 
                            href="/account/downloads"
                            className="bg-white/20 hover:bg-white/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition transform hover:scale-105 backdrop-blur-sm font-medium text-sm sm:text-base"
                        >
                            Downloads
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                    <StatCard
                        title="Active Licenses"
                        value={active_licenses}
                        icon={<KeyIcon className="w-6 h-6" />}
                        color="green"
                    />
                    <StatCard
                        title="Expiring Soon"
                        value={expiring_soon}
                        icon={<ClockIcon className="w-6 h-6" />}
                        color="yellow"
                    />
                    <StatCard
                        title="Total Orders"
                        value={total_orders}
                        icon={<ShoppingBagIcon className="w-6 h-6" />}
                        color="blue"
                    />
                    <StatCard
                        title="Pending Orders"
                        value={pending_orders}
                        icon={<ExclamationTriangleIcon className="w-6 h-6" />}
                        color="red"
                    />
                </div>

                {/* Warning for expiring licenses */}
                {expiring_soon > 0 && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mb-6 sm:mb-8 rounded">
                        <div className="flex">
                            <ExclamationTriangleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-2 sm:mr-3 flex-shrink-0" />
                            <div>
                                <p className="text-xs sm:text-sm text-yellow-700">
                                    You have <strong>{expiring_soon}</strong> license{expiring_soon > 1 ? 's' : ''} expiring within 30 days.
                                    {' '}
                                    <Link href="/account/licenses" className="font-medium underline hover:text-yellow-900">
                                        Renew now
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                    {/* Recent Licenses */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-base sm:text-[18px] font-bold text-gray-900">Recent Licenses</h3>
                            <Link 
                                href="/account/licenses"
                                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="p-4 sm:p-6">
                            {recent_licenses && recent_licenses.length > 0 ? (
                                <div className="space-y-3 sm:space-y-4">
                                    {recent_licenses.map((license) => (
                                        <div key={license.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl border border-blue-100 hover:shadow-md transition gap-3 sm:gap-0">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-bold text-sm sm:text-base text-gray-900 truncate">{license.product.name}</div>
                                                <div className="text-xs sm:text-sm text-gray-600 truncate">
                                                    Key: {license.license_key}
                                                </div>
                                                {license.expires_at && (
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Expires: {new Date(license.expires_at).toLocaleDateString()}
                                                    </div>
                                                )}
                                            </div>
                                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 self-start sm:self-center ${
                                                license.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : license.status === 'expired'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {license.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm sm:text-base text-gray-500 text-center py-6 sm:py-8">
                                    No licenses yet. 
                                    <Link href="/shop" className="text-blue-600 hover:text-blue-700 ml-1 font-medium">
                                        Browse products
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden">
                        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-base sm:text-[18px] font-bold text-gray-900">Recent Orders</h3>
                            <Link 
                                href="/account/orders"
                                className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="p-4 sm:p-6">
                            {recent_orders && recent_orders.length > 0 ? (
                                <div className="space-y-3 sm:space-y-4">
                                    {recent_orders.map((order) => (
                                        <Link 
                                            key={order.id}
                                            href={`/account/orders/${order.order_number}`}
                                            className="block p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-100 hover:shadow-md transition"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="font-bold text-sm sm:text-base text-gray-900 truncate">{order.order_number}</div>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                                                    order.payment_status === 'paid' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : order.payment_status === 'pending_verification'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : order.payment_status === 'rejected'
                                                        ? 'bg-red-100 text-red-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {order.payment_status?.replace('_', ' ') || 'unpaid'}
                                                </span>
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600 truncate">
                                                {order.items[0]?.product_name}
                                                {order.items.length > 1 && ` +${order.items.length - 1} more`}
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <div className="text-sm sm:text-base font-bold text-gray-900">
                                                    {formatRupiah(order.total_amount)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm sm:text-base text-gray-500 text-center py-6 sm:py-8">
                                    No orders yet. 
                                    <Link href="/shop" className="text-blue-600 hover:text-blue-700 ml-1 font-medium">
                                        Start shopping
                                    </Link>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    <Link 
                        href="/shop"
                        className="bg-white border-2 border-blue-600 text-blue-600 p-4 sm:p-5 lg:p-6 rounded-xl shadow hover:bg-blue-50 transition text-center"
                    >
                        <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Browse Products</div>
                        <div className="text-xs sm:text-sm text-gray-600">Explore our plugins and themes</div>
                    </Link>

                    <Link 
                        href="/account/downloads"
                        className="bg-white border-2 border-gray-300 text-gray-700 p-4 sm:p-5 lg:p-6 rounded-xl shadow hover:bg-gray-50 transition text-center"
                    >
                        <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Downloads</div>
                        <div className="text-xs sm:text-sm text-gray-600">Access your purchased products</div>
                    </Link>

                    <Link 
                        href="/account/profile"
                        className="bg-white border-2 border-gray-300 text-gray-700 p-4 sm:p-5 lg:p-6 rounded-xl shadow hover:bg-gray-50 transition text-center"
                    >
                        <div className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">Account Settings</div>
                        <div className="text-xs sm:text-sm text-gray-600">Update your profile information</div>
                    </Link>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
