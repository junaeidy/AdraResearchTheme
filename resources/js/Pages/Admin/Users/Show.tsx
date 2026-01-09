import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { formatRupiah } from '@/utils/currency';
import { 
    UserIcon, 
    EnvelopeIcon, 
    CalendarIcon,
    ShoppingBagIcon,
    KeyIcon,
    ChatBubbleLeftIcon
} from '@heroicons/react/24/outline';
import RatingStars from '@/Components/Review/RatingStars';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    organization: string | null;
    country: string | null;
    created_at: string;
    orders: Array<{
        id: number;
        order_number: string;
        total_amount: number;
        status: string;
        payment_status: string;
        created_at: string;
        items: Array<{
            product: {
                name: string;
            };
        }>;
    }>;
    licenses: Array<{
        id: number;
        license_key: string;
        status: string;
        expires_at: string | null;
        product: {
            name: string;
            slug: string;
        };
    }>;
    reviews: Array<{
        id: number;
        rating: number;
        comment: string | null;
        created_at: string;
        product: {
            name: string;
            slug: string;
        };
    }>;
}

interface UserShowProps extends PageProps {
    user: User;
}

export default function UserShow({ auth, user }: UserShowProps) {
    const [toggling, setToggling] = useState(false);

    const handleToggleRole = () => {
        if (!confirm(`Are you sure you want to change ${user.name}'s role from ${user.role} to ${user.role === 'admin' ? 'customer' : 'admin'}?`)) return;

        setToggling(true);
        router.post(`/admin/users/${user.id}/toggle-role`, {}, {
            onFinish: () => setToggling(false),
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-800">User Details</h2>
                    <Link 
                        href="/admin/users"
                        className="text-sm text-blue-600 hover:text-blue-700"
                    >
                        ← Back to Users
                    </Link>
                </div>
            }
        >
            <Head title={`User: ${user.name}`} />

            <div className="max-w-7xl">
                {/* User Info Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <UserIcon className="w-16 h-16 text-gray-400" />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                                <div className="flex items-center gap-2 text-gray-600 mt-1">
                                    <EnvelopeIcon className="w-4 h-4" />
                                    {user.email}
                                </div>
                                {user.organization && (
                                    <div className="text-sm text-gray-500 mt-1">
                                        Organization: {user.organization}
                                    </div>
                                )}
                                {user.country && (
                                    <div className="text-sm text-gray-500">
                                        Country: {user.country}
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                                    <CalendarIcon className="w-4 h-4" />
                                    Joined {new Date(user.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <span className={`px-4 py-2 rounded-lg text-sm font-semibold text-center ${
                                user.role === 'admin'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-green-100 text-green-800'
                            }`}>
                                {user.role.toUpperCase()}
                            </span>
                            {user.id !== auth.user.id && (
                                <button
                                    onClick={handleToggleRole}
                                    disabled={toggling}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-medium disabled:opacity-50"
                                >
                                    {toggling ? 'Toggling...' : 'Toggle Role'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <ShoppingBagIcon className="w-5 h-5 text-blue-500" />
                                <div className="text-2xl font-bold text-gray-900">{user.orders.length}</div>
                            </div>
                            <div className="text-sm text-gray-600">Orders</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <KeyIcon className="w-5 h-5 text-green-500" />
                                <div className="text-2xl font-bold text-gray-900">{user.licenses.length}</div>
                            </div>
                            <div className="text-sm text-gray-600">Licenses</div>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                                <ChatBubbleLeftIcon className="w-5 h-5 text-yellow-500" />
                                <div className="text-2xl font-bold text-gray-900">{user.reviews.length}</div>
                            </div>
                            <div className="text-sm text-gray-600">Reviews</div>
                        </div>
                    </div>
                </div>

                {/* Orders */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
                    </div>
                    <div className="p-6">
                        {user.orders.length > 0 ? (
                            <div className="space-y-4">
                                {user.orders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <div className="font-medium text-gray-900">{order.order_number}</div>
                                            <div className="text-sm text-gray-600">
                                                {order.items[0]?.product?.name}
                                                {order.items.length > 1 && ` +${order.items.length - 1} more`}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-gray-900">{formatRupiah(order.total_amount)}</div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
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
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No orders yet</p>
                        )}
                    </div>
                </div>

                {/* Licenses */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Active Licenses</h3>
                    </div>
                    <div className="p-6">
                        {user.licenses.length > 0 ? (
                            <div className="space-y-4">
                                {user.licenses.map((license) => (
                                    <div key={license.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div>
                                            <Link 
                                                href={`/shop/${license.product.slug}`}
                                                className="font-medium text-blue-600 hover:text-blue-700"
                                            >
                                                {license.product.name}
                                            </Link>
                                            <div className="text-sm text-gray-600 font-mono">{license.license_key}</div>
                                            {license.expires_at && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Expires: {new Date(license.expires_at).toLocaleDateString()}
                                                </div>
                                            )}
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                            <p className="text-gray-500 text-center py-8">No licenses yet</p>
                        )}
                    </div>
                </div>

                {/* Reviews */}
                <div className="bg-white rounded-lg shadow">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Reviews Written</h3>
                    </div>
                    <div className="p-6">
                        {user.reviews.length > 0 ? (
                            <div className="space-y-4">
                                {user.reviews.map((review) => (
                                    <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <Link 
                                                href={`/shop/${review.product.slug}`}
                                                className="font-medium text-blue-600 hover:text-blue-700"
                                            >
                                                {review.product.name}
                                            </Link>
                                            <RatingStars rating={review.rating} size="sm" />
                                        </div>
                                        {review.comment && (
                                            <p className="text-sm text-gray-700">{review.comment}</p>
                                        )}
                                        <div className="text-xs text-gray-500 mt-2">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No reviews yet</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
