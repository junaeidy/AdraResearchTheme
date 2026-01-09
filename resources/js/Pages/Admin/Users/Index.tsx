import { Head, Link, router } from '@inertiajs/react';
import { PageProps, PaginatedData } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import { UserIcon, ShoppingBagIcon, KeyIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    orders_count: number;
    licenses_count: number;
}

interface UsersIndexProps extends PageProps {
    users: PaginatedData<User>;
}

export default function UsersIndex({ auth, users }: UsersIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<string | null>(null);
    const [toggling, setToggling] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users',
            { search: searchTerm, role: filterRole },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleFilter = (role: string | null) => {
        setFilterRole(role);
        router.get('/admin/users',
            { role, search: searchTerm },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleToggleRole = (userId: number) => {
        if (!confirm('Are you sure you want to change this user\'s role?')) return;

        setToggling(userId);
        router.post(`/admin/users/${userId}/toggle-role`, {}, {
            onFinish: () => setToggling(null),
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
            }
        >
            <Head title="Manage Users" />

            <div className="max-w-7xl">
                {/* Header */}
                <div className="bg-white rounded-lg shadow mb-6 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            All Users ({users.total})
                        </h3>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 min-w-[300px]">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </form>

                        {/* Role Filter */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleFilter(null)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filterRole === null
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleFilter('admin')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filterRole === 'admin'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Admins
                            </button>
                            <button
                                onClick={() => handleFilter('customer')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    filterRole === 'customer'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                Customers
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    {users.data.length > 0 ? (
                        <>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Orders
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Licenses
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registered
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <UserIcon className="w-8 h-8 text-gray-400 mr-3" />
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    user.role === 'admin'
                                                        ? 'bg-purple-100 text-purple-800'
                                                        : 'bg-green-100 text-green-800'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <ShoppingBagIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-900">{user.orders_count}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <KeyIcon className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm text-gray-900">{user.licenses_count}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        View
                                                    </Link>
                                                    {user.id !== auth.user.id && (
                                                        <button
                                                            onClick={() => handleToggleRole(user.id)}
                                                            disabled={toggling === user.id}
                                                            className="text-purple-600 hover:text-purple-900 disabled:opacity-50"
                                                        >
                                                            {toggling === user.id ? 'Toggling...' : 'Toggle Role'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            {users.last_page > 1 && (
                                <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{users.from}</span> to{' '}
                                            <span className="font-medium">{users.to}</span> of{' '}
                                            <span className="font-medium">{users.total}</span> results
                                        </div>
                                        <div className="flex gap-2">
                                            {users.links.map((link, index) => {
                                                if (!link.url) return null;
                                                
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        preserveState
                                                        preserveScroll
                                                        className={`px-3 py-1 rounded text-sm ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white'
                                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">No users found.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
