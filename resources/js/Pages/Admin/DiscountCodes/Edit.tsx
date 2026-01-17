import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Input from '@/Components/Shared/Input';
import Button from '@/Components/Shared/Button';
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
}

interface EditDiscountCodeProps extends PageProps {
    discountCode: DiscountCode;
}

export default function Edit({ auth, discountCode }: EditDiscountCodeProps) {
    const { data, setData, put, processing, errors } = useForm({
        code: discountCode.code,
        description: discountCode.description || '',
        discount_type: discountCode.discount_type,
        discount_value: discountCode.discount_value,
        usage_limit: discountCode.usage_limit,
        valid_from: discountCode.valid_from ? discountCode.valid_from.slice(0, 16) : '',
        valid_until: discountCode.valid_until ? discountCode.valid_until.slice(0, 16) : '',
        is_active: discountCode.is_active,
        minimum_purchase: discountCode.minimum_purchase?.toString() || '',
        maximum_discount: discountCode.maximum_discount?.toString() || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('admin.discount-codes.update', discountCode.id), {
            onSuccess: () => {
                toast.success('Kode diskon berhasil diperbarui');
            },
            onError: () => {
                toast.error('Gagal memperbarui kode diskon');
            },
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Edit ${discountCode.code} - Admin Panel`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Edit Kode Diskon</h1>
                        <p className="text-gray-600 mt-2">Perbarui informasi kode diskon {discountCode.code}</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Informasi Kode Diskon</CardTitle>
                            </CardHeader>

                            <div className="p-6 space-y-6 border-t">
                                {/* Usage Info */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Penggunaan:</strong> {discountCode.used_count} dari {discountCode.usage_limit} sudah digunakan
                                    </p>
                                </div>

                                {/* Code */}
                                <div>
                                    <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                                        Kode Diskon <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="code"
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                        placeholder="DISKON2026"
                                        required
                                    />
                                    {errors.code && (
                                        <p className="mt-1 text-sm text-red-600">{errors.code}</p>
                                    )}
                                </div>

                                {/* Description */}
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Deskripsi
                                    </label>
                                    <Input
                                        id="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Diskon spesial untuk pelanggan setia"
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                                    )}
                                </div>

                                {/* Discount Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tipe Diskon <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="percentage"
                                                checked={data.discount_type === 'percentage'}
                                                onChange={(e) => setData('discount_type', e.target.value as 'percentage')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Persentase (%)</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                value="fixed"
                                                checked={data.discount_type === 'fixed'}
                                                onChange={(e) => setData('discount_type', e.target.value as 'fixed')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Nominal Tetap (Rp)</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Discount Value */}
                                <div>
                                    <label htmlFor="discount_value" className="block text-sm font-medium text-gray-700">
                                        Nilai Diskon <span className="text-red-500">*</span>
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        {data.discount_type === 'fixed' && (
                                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                Rp
                                            </span>
                                        )}
                                        <Input
                                            id="discount_value"
                                            type="number"
                                            value={data.discount_value}
                                            onChange={(e) => setData('discount_value', parseFloat(e.target.value) || 0)}
                                            className={data.discount_type === 'fixed' ? 'rounded-l-none' : ''}
                                            min="0"
                                            max={data.discount_type === 'percentage' ? '100' : undefined}
                                            step="0.01"
                                            required
                                        />
                                        {data.discount_type === 'percentage' && (
                                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                %
                                            </span>
                                        )}
                                    </div>
                                    {errors.discount_value && (
                                        <p className="mt-1 text-sm text-red-600">{errors.discount_value}</p>
                                    )}
                                </div>

                                {/* Maximum Discount (only for percentage) */}
                                {data.discount_type === 'percentage' && (
                                    <div>
                                        <label htmlFor="maximum_discount" className="block text-sm font-medium text-gray-700">
                                            Maksimal Diskon (Rp)
                                        </label>
                                        <Input
                                            id="maximum_discount"
                                            type="number"
                                            value={data.maximum_discount}
                                            onChange={(e) => setData('maximum_discount', e.target.value)}
                                            placeholder="500000"
                                            min="0"
                                        />
                                        {errors.maximum_discount && (
                                            <p className="mt-1 text-sm text-red-600">{errors.maximum_discount}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Batas maksimal diskon dalam rupiah (opsional)
                                        </p>
                                    </div>
                                )}

                                {/* Minimum Purchase */}
                                <div>
                                    <label htmlFor="minimum_purchase" className="block text-sm font-medium text-gray-700">
                                        Minimum Pembelian (Rp)
                                    </label>
                                    <Input
                                        id="minimum_purchase"
                                        type="number"
                                        value={data.minimum_purchase}
                                        onChange={(e) => setData('minimum_purchase', e.target.value)}
                                        placeholder="100000"
                                        min="0"
                                    />
                                    {errors.minimum_purchase && (
                                        <p className="mt-1 text-sm text-red-600">{errors.minimum_purchase}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        Minimum total belanja untuk menggunakan kode ini (opsional)
                                    </p>
                                </div>

                                {/* Usage Limit */}
                                <div>
                                    <label htmlFor="usage_limit" className="block text-sm font-medium text-gray-700">
                                        Batas Penggunaan <span className="text-red-500">*</span>
                                    </label>
                                    <Input
                                        id="usage_limit"
                                        type="number"
                                        value={data.usage_limit}
                                        onChange={(e) => setData('usage_limit', parseInt(e.target.value) || 1)}
                                        min={discountCode.used_count}
                                        required
                                    />
                                    {errors.usage_limit && (
                                        <p className="mt-1 text-sm text-red-600">{errors.usage_limit}</p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-500">
                                        Minimal {discountCode.used_count} (sudah digunakan sebanyak ini)
                                    </p>
                                </div>

                                {/* Valid From */}
                                <div>
                                    <label htmlFor="valid_from" className="block text-sm font-medium text-gray-700">
                                        Berlaku Dari
                                    </label>
                                    <Input
                                        id="valid_from"
                                        type="datetime-local"
                                        value={data.valid_from}
                                        onChange={(e) => setData('valid_from', e.target.value)}
                                    />
                                    {errors.valid_from && (
                                        <p className="mt-1 text-sm text-red-600">{errors.valid_from}</p>
                                    )}
                                </div>

                                {/* Valid Until */}
                                <div>
                                    <label htmlFor="valid_until" className="block text-sm font-medium text-gray-700">
                                        Berlaku Hingga
                                    </label>
                                    <Input
                                        id="valid_until"
                                        type="datetime-local"
                                        value={data.valid_until}
                                        onChange={(e) => setData('valid_until', e.target.value)}
                                    />
                                    {errors.valid_until && (
                                        <p className="mt-1 text-sm text-red-600">{errors.valid_until}</p>
                                    )}
                                </div>

                                {/* Is Active */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                    />
                                    <label htmlFor="is_active" className="ml-3 block text-sm font-medium text-gray-700">
                                        Aktifkan kode diskon
                                    </label>
                                </div>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => router.visit(route('admin.discount-codes.index'))}
                                >
                                    Batal
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Menyimpan...' : 'Perbarui Kode Diskon'}
                                </Button>
                            </div>
                        </Card>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
