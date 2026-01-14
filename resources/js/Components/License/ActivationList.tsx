import { LicenseActivation } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import DeleteConfirmationModal from '@/Components/Shared/DeleteConfirmationModal';
import toast from 'react-hot-toast';

interface Props {
    activations: LicenseActivation[];
    productSlug: string;
}

export default function ActivationList({ activations, productSlug }: Props) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingActivation, setDeletingActivation] = useState<LicenseActivation | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeactivate = (activation: LicenseActivation) => {
        setDeletingActivation(activation);
        setIsDeleteModalOpen(true);
    };

    const confirmDeactivate = () => {
        if (!deletingActivation) return;

        setIsDeleting(true);
        router.post(
            route('licenses.deactivate', productSlug),
            { activation_id: deletingActivation.id },
            {
                onSuccess: () => {
                    toast.success('Activation removed successfully');
                    setIsDeleteModalOpen(false);
                    setDeletingActivation(null);
                },
                onError: () => {
                    toast.error('Failed to remove activation');
                },
                onFinish: () => {
                    setIsDeleting(false);
                },
            }
        );
    };

    if (activations.length === 0) {
        return (
            <div className="text-center py-6 sm:py-8 text-gray-500">
                <p className="text-sm sm:text-base">No activations yet</p>
                <p className="text-xs sm:text-sm mt-1">This license hasn't been activated on any site</p>
            </div>
        );
    }

    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Domain / Journal
                            </th>
                            <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                OJS Version
                            </th>
                            <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                                Activated
                            </th>
                            <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                                Last Check
                            </th>
                            <th className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {activations.map((activation) => (
                            <tr key={activation.id} className="hover:bg-gray-50">
                                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
                                    <div className="min-w-0">
                                        <div className="font-medium text-sm sm:text-base text-gray-900 truncate">{activation.domain}</div>
                                        {activation.journal_path && (
                                            <div className="text-xs sm:text-sm text-gray-500 truncate">{activation.journal_path}</div>
                                        )}
                                        <div className="text-xs text-gray-500 mt-1 md:hidden">
                                            v{activation.ojs_version}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                                    {activation.ojs_version}
                                </td>
                                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 hidden lg:table-cell">
                                    {new Date(activation.activated_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-500 hidden xl:table-cell">
                                    {new Date(activation.last_check_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </td>
                                <td className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-right">
                                    <button
                                        onClick={() => handleDeactivate(activation)}
                                        className="text-red-600 hover:text-red-900 text-xs sm:text-sm font-medium px-2 py-1 hover:bg-red-50 rounded transition-colors"
                                    >
                                        <span className="hidden sm:inline">Deactivate</span>
                                        <span className="sm:hidden">Remove</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <DeleteConfirmationModal
                show={isDeleteModalOpen}
                onCancel={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeactivate}
                title="Deactivate License"
                message={`Are you sure you want to deactivate this license from ${deletingActivation?.domain}?`}
                processing={isDeleting}
            />
        </>
    );
}
