import { Head, Link, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';
import { formatCurrency } from '@/utils/currency';
import toast from 'react-hot-toast';

interface DiscountCode {
    id: number;
    code: string;
    description: string | null;
    discount_type: 'percentage' | 'fixed';
    discount_value: number;
    usage_limit: number;
    used_count: number;
    valid_from: string | null;
    valid_until: string | null;
    is_active: boolean;
    minimum_purchase: number | null;
    maximum_discount: number | null;
    usages_count: number;
    created_at: string;
}

interface DiscountCodesPageProps extends PageProps {
    discountCodes: {
        data: DiscountCode[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
}

export default function Index({ auth, discountCodes }: DiscountCodesPageProps) {
    const handleDelete = (id: number, code: string) => {
        if (!confirm(`Apakah Anda yakin ingin menghapus kode diskon "${code}"?`)) {
            return;
        }

        router.delete(route('admin.discount-codes.destroy', id), {
            onSuccess: () => toast.success('Kode diskon berhasil dihapus'),
            onError: () => toast.error('Gagal menghapus kode diskon'),
        });
    };

    const handleToggleStatus = (id: number) => {
        router.post(route('admin.discount-codes.toggle-status', id), {}, {
            onSuccess: () => toast.success('Status kode diskon berhasil diubah'),
            onError: () => toast.error('Gagal mengubah status kode diskon'),
        });
    };

    const isExpired = (validUntil: string | null) => {
        if (!validUntil) return false;
        return new Date(validUntil) < new Date();
    };

    const isNotStarted = (validFrom: string | null) => {
        if (!validFrom) return false;
        return new Date(validFrom) > new Date();
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Kelola Kode Diskon - Admin Panel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8 flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Kode Diskon</h1>
                            <p className="text-gray-600 mt-2">
                                Kelola kode diskon untuk pelanggan
                            </p>
                        </div>
                        <Link href={route('admin.discount-codes.create')}>
                            <Button>+ Buat Kode Diskon</Button>
                        </Link>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Daftar Kode Diskon</CardTitle>
                        </CardHeader>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kode
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Diskon
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Penggunaan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Masa Berlaku
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {discountCodes.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                                Belum ada kode diskon. Buat kode diskon pertama Anda!
                                            </td>
                                        </tr>
                                    ) : (
                                        discountCodes.data.map((discount) => (
                                            <tr key={discount.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="font-semibold text-gray-900">
                                                        {discount.code}
                                                    </div>
                                                    {discount.description && (
                                                        <div className="text-sm text-gray-500">
                                                            {discount.description}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {discount.discount_type === 'percentage' ? (
                                                            <>
                                                                {discount.discount_value}%
                                                                {discount.maximum_discount && (
                                                                    <div className="text-xs text-gray-500">
                                                                        Max: {formatCurrency(discount.maximum_discount)}
                                                                    </div>
                                                                )}
                                                            </>
                                                        ) : (
                                                            formatCurrency(discount.discount_value)
                                                        )}
                                                    </div>
                                                    {discount.minimum_purchase && (
                                                        <div className="text-xs text-gray-500">
                                                            Min: {formatCurrency(discount.minimum_purchase)}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {discount.usages_count} / {discount.usage_limit}
                                                    </div>
                                                    {discount.usages_count >= discount.usage_limit && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                                            Habis
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {discount.valid_from || discount.valid_until ? (
                                                        <>
                                                            {formatDate(discount.valid_from)}
                                                            {' - '}
                                                            {formatDate(discount.valid_until)}
                                                            {isExpired(discount.valid_until) && (
                                                                <div className="text-xs text-red-600">Kadaluarsa</div>
                                                            )}
                                                            {isNotStarted(discount.valid_from) && (
                                                                <div className="text-xs text-orange-600">Belum aktif</div>
                                                            )}
                                                        </>
                                                    ) : (
                                                        'Tidak terbatas'
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <button
                                                        onClick={() => handleToggleStatus(discount.id)}
                                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            discount.is_active
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}
                                                    >
                                                        {discount.is_active ? 'Aktif' : 'Nonaktif'}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route('admin.discount-codes.edit', discount.id)}
                                                            className="text-blue-600 hover:text-blue-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(discount.id, discount.code)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        {discountCodes.last_page > 1 && (
                            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Menampilkan {discountCodes.data.length} dari {discountCodes.total} kode diskon
                                </div>
                                <div className="flex space-x-2">
                                    {Array.from({ length: discountCodes.last_page }, (_, i) => i + 1).map((page) => (
                                        <Link
                                            key={page}
                                            href={route('admin.discount-codes.index', { page })}
                                            className={`px-3 py-1 rounded ${
                                                page === discountCodes.current_page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
