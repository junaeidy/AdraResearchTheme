import AdminLayout from '@/Layouts/AdminLayout';
import { License, PageProps } from '@/types';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { useState, useEffect, FormEventHandler } from 'react';
import LicenseStatusBadge from '@/Components/License/LicenseStatusBadge';
import ExpiryCountdown from '@/Components/License/ExpiryCountdown';
import LicenseKeyDisplay from '@/Components/License/LicenseKeyDisplay';
import Modal from '@/Components/Modal';
import Button from '@/Components/Shared/Button';
import Input from '@/Components/Shared/Input';
import DeleteConfirmationModal from '@/Components/Shared/DeleteConfirmationModal';
import ConfirmationModal from '@/Components/Shared/ConfirmationModal';
import { formatRupiah } from '@/utils/currency';
import toast from 'react-hot-toast';

interface Props extends PageProps {
    license: License;
}

export default function AdminLicenseShow({ auth, license }: Props) {
    const { flash } = usePage().props as any;
    const [isExtendModalOpen, setIsExtendModalOpen] = useState(false);
    const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);
    const [isUnsuspendModalOpen, setIsUnsuspendModalOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);

    const { data: extendData, setData: setExtendData, post: postExtend, processing: extending, reset: resetExtend } = useForm({
        months: '6',
    });

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleExtend: FormEventHandler = (e) => {
        e.preventDefault();
        postExtend(route('admin.licenses.extend', license.id), {
            onSuccess: () => {
                setIsExtendModalOpen(false);
                resetExtend();
            },
        });
    };

    const handleRevoke = () => {
        router.post(route('admin.licenses.revoke', license.id), {}, {
            onSuccess: () => {
                setIsRevokeModalOpen(false);
            },
        });
    };

    const handleUnsuspend = () => {
        router.post(route('admin.licenses.unsuspend', license.id), {}, {
            onSuccess: () => {
                setIsUnsuspendModalOpen(false);
            },
        });
    };

    const handleReset = () => {
        router.post(route('admin.licenses.reset', license.id), {}, {
            onSuccess: () => {
                setIsResetModalOpen(false);
            },
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Manage Licenses</h2>
            }
        >
            <Head title={`License - ${license.product?.name}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('admin.licenses.index')}
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Licenses
                        </Link>
                    </div>

                    {/* License Details Card */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                    {license.product?.name}
                                </h1>
                                <p className="text-sm text-gray-600">
                                    License ID: {license.id}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <LicenseStatusBadge status={license.status} />
                                <ExpiryCountdown expiresAt={license.expires_at} />
                            </div>
                        </div>

                        {/* License Key */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                License Key
                            </label>
                            <LicenseKeyDisplay licenseKey={license.license_key} />
                        </div>

                        {/* License Info Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Type</div>
                                <div className="font-medium text-gray-900 capitalize">
                                    {license.type.replace(/-/g, ' ')}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Duration</div>
                                <div className="font-medium text-gray-900 capitalize">
                                    {license.duration.replace(/-/g, ' ')}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Activations</div>
                                <div className="font-medium text-gray-900">
                                    {license.activated_count} / {license.max_activations}
                                </div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Created</div>
                                <div className="font-medium text-gray-900">
                                    {new Date(license.created_at).toLocaleDateString('id-ID')}
                                </div>
                            </div>
                        </div>

                        {/* Admin Actions */}
                        <div className="border-t pt-6 flex gap-3">
                            <Button
                                onClick={() => setIsExtendModalOpen(true)}
                                disabled={!license.expires_at}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                Extend License
                            </Button>
                            {license.status === 'suspended' ? (
                                <Button
                                    onClick={() => setIsUnsuspendModalOpen(true)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Activate License
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => setIsRevokeModalOpen(true)}
                                    className="bg-orange-600 hover:bg-orange-700"
                                >
                                    Suspend License
                                </Button>
                            )}
                            <Button
                                onClick={() => setIsResetModalOpen(true)}
                                disabled={license.activated_count === 0}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Reset Activations
                            </Button>
                        </div>
                    </div>

                    {/* Customer Info */}
                    {license.user && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Name</div>
                                    <div className="font-medium text-gray-900">{license.user.name}</div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Email</div>
                                    <div className="font-medium text-gray-900">{license.user.email}</div>
                                </div>
                                {license.user.organization && (
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Organization</div>
                                        <div className="font-medium text-gray-900">{license.user.organization}</div>
                                    </div>
                                )}
                                {license.user.country && (
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Country</div>
                                        <div className="font-medium text-gray-900">{license.user.country}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Order Info */}
                    {license.order && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Order Number</div>
                                    <Link
                                        href={route('admin.payment-verification.show', license.order.order_number)}
                                        className="font-medium text-blue-600 hover:text-blue-800"
                                    >
                                        {license.order.order_number}
                                    </Link>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Order Date</div>
                                    <div className="font-medium text-gray-900">
                                        {new Date(license.order.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                                    <div className="font-medium text-gray-900">
                                        {formatRupiah(license.order.total_amount)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Payment Status</div>
                                    <div className="font-medium text-gray-900 capitalize">
                                        {license.order.payment_status.replace(/_/g, ' ')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Activations */}
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Active Installations</h3>
                        </div>
                        {license.activations && license.activations.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domain</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Journal Path</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">OJS Version</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Activated</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Check</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {license.activations.map((activation) => (
                                            <tr key={activation.id}>
                                                <td className="px-6 py-4 text-sm text-gray-900">{activation.domain}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{activation.journal_path || '-'}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900">{activation.ojs_version}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">{activation.ip_address}</td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(activation.activated_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(activation.last_check_at).toLocaleDateString('id-ID')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="px-6 py-8 text-center text-gray-500">
                                No activations yet
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Extend License Modal */}
            <Modal show={isExtendModalOpen} onClose={() => setIsExtendModalOpen(false)}>
                <form onSubmit={handleExtend} className="p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Extend License</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Add months to the license expiry date. Current expiry: {' '}
                        <span className="font-medium">
                            {license.expires_at ? new Date(license.expires_at).toLocaleDateString('id-ID') : 'N/A'}
                        </span>
                    </p>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Extend by (months)
                        </label>
                        <Input
                            type="number"
                            min="1"
                            max="24"
                            value={extendData.months}
                            onChange={(e) => setExtendData('months', e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button type="button" onClick={() => setIsExtendModalOpen(false)} className="bg-gray-500 hover:bg-gray-600">
                            Cancel
                        </Button>
                        <Button type="submit" disabled={extending} className="bg-blue-600 hover:bg-blue-700">
                            {extending ? 'Extending...' : 'Extend License'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Revoke License Modal */}
            <DeleteConfirmationModal
                show={isRevokeModalOpen}
                onCancel={() => setIsRevokeModalOpen(false)}
                onConfirm={handleRevoke}
                title="Suspend License"
                message="Are you sure you want to suspend this license? The customer will not be able to use it until reactivated."
            />

            {/* Unsuspend License Modal */}
            <ConfirmationModal
                show={isUnsuspendModalOpen}
                onCancel={() => setIsUnsuspendModalOpen(false)}
                onConfirm={handleUnsuspend}
                title="Activate License"
                message="Are you sure you want to activate this license? The customer will be able to use it again."
                confirmText="Activate"
                confirmButtonClass="bg-green-600 hover:bg-green-700"
                type="success"
            />

            {/* Reset Activations Modal */}
            <DeleteConfirmationModal
                show={isResetModalOpen}
                onCancel={() => setIsResetModalOpen(false)}
                onConfirm={handleReset}
                title="Reset All Activations"
                message={`Are you sure you want to reset all ${license.activated_count} activations? This will deactivate the license from all sites.`}
            />
        </AdminLayout>
    );
}
