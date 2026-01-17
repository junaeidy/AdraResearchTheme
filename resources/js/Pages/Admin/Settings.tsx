import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Input from '@/Components/Shared/Input';
import Button from '@/Components/Shared/Button';
import toast from 'react-hot-toast';

interface SettingsPageProps extends PageProps {
    settings: {
        maintenance_mode: boolean;
        maintenance_message: string;
        discount_percentage: number;
        tax_percentage: number;
    };
}

export default function Settings({ auth, settings }: SettingsPageProps) {
    const { data, setData, post, processing, errors } = useForm({
        maintenance_mode: settings.maintenance_mode,
        maintenance_message: settings.maintenance_message,
        discount_percentage: settings.discount_percentage,
        tax_percentage: settings.tax_percentage,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('admin.settings.update'), {
            onSuccess: () => {
                toast.success('Settings saved successfully.');
            },
            onError: () => {
                toast.error('An error occurred while saving settings.');
            },
        });
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Settings - Admin Panel" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Pengaturan Website</h1>
                        <p className="text-gray-600 mt-2">Kelola pengaturan website, maintenance mode, dan pajak</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Maintenance Mode Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Mode Pemeliharaan</CardTitle>
                            </CardHeader>
                            <div className="p-6 border-t">
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="maintenance_mode"
                                            checked={data.maintenance_mode}
                                            onChange={(e) =>
                                                setData('maintenance_mode', e.target.checked)
                                            }
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                        />
                                        <label htmlFor="maintenance_mode" className="ml-3 block text-sm font-medium text-gray-700">
                                            Aktifkan Mode Pemeliharaan
                                        </label>
                                    </div>

                                    <div>
                                        <label htmlFor="maintenance_message" className="block text-sm font-medium text-gray-700">
                                            Pesan Pemeliharaan
                                        </label>
                                        <textarea
                                            id="maintenance_message"
                                            value={data.maintenance_message}
                                            onChange={(e) =>
                                                setData('maintenance_message', e.target.value)
                                            }
                                            maxLength={500}
                                            rows={4}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                                            placeholder="Masukkan pesan yang akan ditampilkan saat website sedang dalam pemeliharaan..."
                                        />
                                        {errors.maintenance_message && (
                                            <p className="mt-1 text-sm text-red-600">{errors.maintenance_message}</p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            {data.maintenance_message.length} / 500 karakter
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Tax Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Pengaturan Pajak</CardTitle>
                            </CardHeader>
                            <div className="p-6 border-t">
                                <div>
                                    <label htmlFor="tax_percentage" className="block text-sm font-medium text-gray-700">
                                        Persentase Pajak (%)
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            id="tax_percentage"
                                            value={data.tax_percentage}
                                            onChange={(e) =>
                                                setData('tax_percentage', parseFloat(e.target.value) || 0)
                                            }
                                            min="0"
                                            max="100"
                                            step="0.01"
                                            className="flex-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm border px-3 py-2"
                                            placeholder="0"
                                        />
                                        <span className="inline-flex items-center px-3 rounded-r-md bg-gray-50 text-gray-500 text-sm border border-l-0 border-gray-300">
                                            %
                                        </span>
                                    </div>
                                    {errors.tax_percentage && (
                                        <p className="mt-1 text-sm text-red-600">{errors.tax_percentage}</p>
                                    )}
                                    <p className="mt-2 text-sm text-gray-600">
                                        Pajak akan ditambahkan ke total harga pesanan. Masukkan 0 untuk menonaktifkan pajak.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-4">
                            <Button
                                variant="secondary"
                                onClick={() => window.history.back()}
                                disabled={processing}
                            >
                                Batal
                            </Button>
                            <Button
                                type="submit"
                                disabled={processing}
                                isLoading={processing}
                            >
                                Simpan Pengaturan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
