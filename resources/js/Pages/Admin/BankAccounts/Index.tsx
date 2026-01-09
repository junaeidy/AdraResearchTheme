import AdminLayout from '@/Layouts/AdminLayout';
import { BankAccount, PageProps } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import DeleteConfirmationModal from '@/Components/Shared/DeleteConfirmationModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Props extends PageProps {
    bankAccounts: BankAccount[];
}

export default function BankAccountsIndex({ auth, bankAccounts, flash }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [editingBank, setEditingBank] = useState<BankAccount | null>(null);
    const [deletingBank, setDeletingBank] = useState<BankAccount | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        bank_name: '',
        account_number: '',
        account_name: '',
        branch: '',
        logo: null as File | null,
    });

    // Show toast notifications on page load if there are flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.info) {
            toast(flash.info);
        }
    }, [flash]);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (editingBank) {
            // Use special route for update with file upload
            post(route('admin.bank-accounts.update-with-file', editingBank.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                },
                onError: (errors) => {
                    if (errors.bank_name) {
                        toast.error('Bank name is required.');
                    } else if (errors.account_number) {
                        toast.error('Account number is required.');
                    } else {
                        toast.error('An error occurred while updating bank account.');
                    }
                },
            });
        } else {
            post(route('admin.bank-accounts.store'), {
                forceFormData: true,
                onSuccess: () => {
                    closeModal();
                },
                onError: (errors) => {
                    if (errors.bank_name) {
                        toast.error('Bank name is required.');
                    } else if (errors.account_number) {
                        toast.error('Account number is required.');
                    } else {
                        toast.error('An error occurred while creating bank account.');
                    }
                },
            });
        }
    };

    const openModal = (bank?: BankAccount) => {
        if (bank) {
            setEditingBank(bank);
            setData({
                bank_name: bank.bank_name,
                account_number: bank.account_number,
                account_name: bank.account_name,
                branch: bank.branch || '',
                logo: null,
            });
        } else {
            setEditingBank(null);
            reset();
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingBank(null);
        reset();
    };

    const handleToggleActive = (bank: BankAccount) => {
        const action = bank.is_active ? 'deactivated' : 'activated';
        post(route('admin.bank-accounts.toggle', bank.id), {
        });
    };

    const handleDelete = (bank: BankAccount) => {
        setDeletingBank(bank);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!deletingBank) return;

        setIsDeleting(true);
        router.delete(route('admin.bank-accounts.destroy', deletingBank.id), {
            onSuccess: () => {
                toast.success('Bank account deleted successfully.');
                setIsDeleteModalOpen(false);
                setDeletingBank(null);
            },
            onError: () => {
                toast.error('Failed to delete bank account.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setDeletingBank(null);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Bank Accounts Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Bank Accounts</h1>
                            <p className="text-gray-600 mt-2">
                                Manage bank accounts for customer payments
                            </p>
                        </div>
                        
                        <PrimaryButton onClick={() => openModal()}>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Bank Account
                        </PrimaryButton>
                    </div>

                    {/* Bank Accounts List */}
                    {bankAccounts.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No bank accounts</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Get started by adding your first bank account.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bank Details
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Account Info
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {bankAccounts.map((bank) => (
                                        <tr key={bank.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {bank.logo && (
                                                        <img
                                                            src={`/storage/${bank.logo}`}
                                                            alt={bank.bank_name}
                                                            className="h-10 w-auto object-contain mr-3"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-gray-900">
                                                            {bank.bank_name}
                                                        </div>
                                                        {bank.branch && (
                                                            <div className="text-sm text-gray-500">
                                                                {bank.branch}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {bank.account_number}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {bank.account_name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleToggleActive(bank)}
                                                    className={`
                                                        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                                        ${bank.is_active
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-gray-100 text-gray-800'
                                                        }
                                                    `}
                                                >
                                                    {bank.is_active ? 'Active' : 'Inactive'}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openModal(bank)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(bank)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <Modal show={showModal} onClose={closeModal} maxWidth="2xl">
                <form onSubmit={handleSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        {editingBank ? 'Edit Bank Account' : 'Add Bank Account'}
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <InputLabel htmlFor="bank_name" value="Bank Name *" />
                            <TextInput
                                id="bank_name"
                                value={data.bank_name}
                                onChange={(e) => setData('bank_name', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.bank_name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="account_number" value="Account Number *" />
                            <TextInput
                                id="account_number"
                                value={data.account_number}
                                onChange={(e) => setData('account_number', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.account_number} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="account_name" value="Account Name *" />
                            <TextInput
                                id="account_name"
                                value={data.account_name}
                                onChange={(e) => setData('account_name', e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                            <InputError message={errors.account_name} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="branch" value="Branch (Optional)" />
                            <TextInput
                                id="branch"
                                value={data.branch}
                                onChange={(e) => setData('branch', e.target.value)}
                                className="mt-1 block w-full"
                            />
                            <InputError message={errors.branch} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="logo" value="Bank Logo (Optional)" />
                            <input
                                id="logo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            <InputError message={errors.logo} className="mt-2" />
                            <p className="text-xs text-gray-500 mt-1">Max 1MB (JPEG, PNG, SVG)</p>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton type="button" onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton type="submit" disabled={processing}>
                            {editingBank ? 'Update' : 'Create'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={isDeleteModalOpen}
                title="Delete Bank Account"
                itemName={deletingBank?.bank_name}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                processing={isDeleting}
            />
        </AdminLayout>
    );
}
