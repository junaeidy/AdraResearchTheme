import AdminLayout from '@/Layouts/AdminLayout';
import { License, PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LicenseStatusBadge from '@/Components/License/LicenseStatusBadge';
import ExpiryCountdown from '@/Components/License/ExpiryCountdown';
import Input from '@/Components/Shared/Input';
import toast from 'react-hot-toast';

interface PaginatedLicenses {
    data: License[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props extends PageProps {
    licenses: PaginatedLicenses;
}

export default function AdminLicensesIndex({ auth, licenses }: Props) {
    const { flash } = usePage().props as any;
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | License['status']>('all');

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const filterLicenses = (licenses: License[]) => {
        let filtered = [...licenses];

        if (statusFilter !== 'all') {
            filtered = filtered.filter(l => l.status === statusFilter);
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(l =>
                l.license_key.toLowerCase().includes(searchLower) ||
                l.product?.name.toLowerCase().includes(searchLower) ||
                l.user?.name.toLowerCase().includes(searchLower) ||
                l.user?.email.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    };

    const filteredLicenses = filterLicenses(licenses.data);

    const stats = {
        total: licenses.data.length,
        active: licenses.data.filter(l => l.status === 'active').length,
        expired: licenses.data.filter(l => l.status === 'expired').length,
        expiring: licenses.data.filter(l => {
            if (!l.expires_at || l.status !== 'active') return false;
            const daysUntilExpiry = Math.ceil((new Date(l.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
        }).length,
    };

    return (
        <AdminLayout
            user={auth.user}
                header={
                    <h2 className="text-xl font-semibold text-gray-800">Manage Licenses</h2>
                }
        >
            <Head title="License Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">License Management</h1>
                        <p className="text-gray-600 mt-2">
                            Manage all customer licenses and activations
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                            <div className="text-sm text-gray-600">Total Licenses</div>
                        </div>
                        <div className="bg-white border border-green-200 rounded-lg p-6">
                            <div className="text-2xl font-bold text-green-900">{stats.active}</div>
                            <div className="text-sm text-green-700">Active</div>
                        </div>
                        <div className="bg-white border border-yellow-200 rounded-lg p-6">
                            <div className="text-2xl font-bold text-yellow-900">{stats.expiring}</div>
                            <div className="text-sm text-yellow-700">Expiring Soon</div>
                        </div>
                        <div className="bg-white border border-red-200 rounded-lg p-6">
                            <div className="text-2xl font-bold text-red-900">{stats.expired}</div>
                            <div className="text-sm text-red-700">Expired</div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search */}
                            <div>
                                <Input
                                    type="text"
                                    placeholder="Search by license key, product, or customer..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full"
                                />
                            </div>

                            {/* Status Filter */}
                            <div>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value as any)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="all">All Statuses</option>
                                    <option value="active">Active</option>
                                    <option value="pending">Pending</option>
                                    <option value="expired">Expired</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Licenses Table */}
                    {filteredLicenses.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                            <p className="text-gray-500">No licenses found</p>
                        </div>
                    ) : (
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                License Key
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Product
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Customer
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Expiry
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Activations
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredLicenses.map((license) => (
                                            <tr key={license.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4">
                                                    <code className="text-sm font-mono text-gray-900">
                                                        {license.license_key.split('-').slice(-1)[0]}
                                                    </code>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{license.product?.name}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900">{license.user?.name}</div>
                                                        <div className="text-gray-500">{license.user?.email}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900 capitalize">
                                                    {license.type.replace(/-/g, ' ')}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <LicenseStatusBadge status={license.status} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <ExpiryCountdown expiresAt={license.expires_at} />
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {license.activated_count} / {license.max_activations}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={route('admin.licenses.show', license.id)}
                                                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            {licenses.last_page > 1 && (
                                <div className="px-6 py-4 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm text-gray-500">
                                            Showing page {licenses.current_page} of {licenses.last_page}
                                        </div>
                                        <div className="flex gap-2">
                                            {licenses.links.map((link, index) => {
                                                if (!link.url) {
                                                    return (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed"
                                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                                        />
                                                    );
                                                }
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url}
                                                        className={`px-3 py-1 border rounded text-sm transition-colors ${
                                                            link.active
                                                                ? 'bg-blue-600 text-white border-blue-600'
                                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
