import { License, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import LicenseCard from '@/Components/License/LicenseCard';
import AccountLayout from '@/Layouts/AccountLayout';
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

export default function LicensesIndex({ auth, licenses }: Props) {
    const { flash } = usePage().props as any;
    const [filter, setFilter] = useState<'all' | 'active' | 'expiring' | 'expired'>('all');
    const [sortBy, setSortBy] = useState<'expiry' | 'product'>('expiry');

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

        // Apply filter
        if (filter === 'active') {
            filtered = filtered.filter(l => l.status === 'active');
        } else if (filter === 'expiring') {
            filtered = filtered.filter(l => {
                if (!l.expires_at || l.status !== 'active') return false;
                const daysUntilExpiry = Math.ceil((new Date(l.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
            });
        } else if (filter === 'expired') {
            filtered = filtered.filter(l => l.status === 'expired' || (l.expires_at && new Date(l.expires_at) < new Date()));
        }

        // Apply sort
        if (sortBy === 'expiry') {
            filtered.sort((a, b) => {
                if (!a.expires_at) return 1;
                if (!b.expires_at) return -1;
                return new Date(a.expires_at).getTime() - new Date(b.expires_at).getTime();
            });
        } else if (sortBy === 'product') {
            filtered.sort((a, b) => {
                const nameA = a.product?.name || '';
                const nameB = b.product?.name || '';
                return nameA.localeCompare(nameB);
            });
        }

        return filtered;
    };

    const filteredLicenses = filterLicenses(licenses.data);

    const filterButtons = [
        { value: 'all' as const, label: 'All Licenses', count: licenses.data.length },
        { value: 'active' as const, label: 'Active', count: licenses.data.filter(l => l.status === 'active').length },
        { value: 'expiring' as const, label: 'Expiring Soon', count: licenses.data.filter(l => {
            if (!l.expires_at || l.status !== 'active') return false;
            const daysUntilExpiry = Math.ceil((new Date(l.expires_at).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
        }).length },
        { value: 'expired' as const, label: 'Expired', count: licenses.data.filter(l => l.status === 'expired' || (l.expires_at && new Date(l.expires_at) < new Date())).length },
    ];

    return (
        <AccountLayout title="My Licenses" auth={auth}>
            {/* Filters */}
                    <div className="mb-6 bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            {/* Filter Buttons */}
                            <div className="flex flex-wrap gap-2">
                                {filterButtons.map((btn) => (
                                    <button
                                        key={btn.value}
                                        onClick={() => setFilter(btn.value)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                            filter === btn.value
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {btn.label} ({btn.count})
                                    </button>
                                ))}
                            </div>

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Sort by:</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'expiry' | 'product')}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="expiry">Expiry Date</option>
                                    <option value="product">Product Name</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Licenses Grid */}
                    {filteredLicenses.length === 0 ? (
                        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No licenses found</h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {filter === 'all' 
                                    ? "You don't have any licenses yet. Purchase a product to get started."
                                    : `No licenses match the "${filter}" filter.`
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredLicenses.map((license) => (
                                <LicenseCard key={license.id} license={license} />
                            ))}
                        </div>
                    )}
        </AccountLayout>
    );
}
