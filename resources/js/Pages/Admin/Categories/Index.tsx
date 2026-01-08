import { Head, useForm, router } from '@inertiajs/react';
import { useState, FormEventHandler } from 'react';
import { ProductCategory, PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Input from '@/Components/Shared/Input';
import Button from '@/Components/Shared/Button';
import Modal from '@/Components/Modal';
import DeleteConfirmationModal from '@/Components/Shared/DeleteConfirmationModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface AdminCategoriesIndexProps extends PageProps {
    categories: ProductCategory[];
}

export default function AdminCategoriesIndex({ auth, categories }: AdminCategoriesIndexProps) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
    const [deletingCategory, setDeletingCategory] = useState<ProductCategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data: createData, setData: setCreateData, post, processing: creating, errors: createErrors, reset: resetCreate } = useForm({
        name: '',
        slug: '',
        description: '',
        icon: '',
        sort_order: '0',
    });

    const { data: editData, setData: setEditData, put, processing: updating, errors: editErrors, reset: resetEdit } = useForm({
        name: '',
        slug: '',
        description: '',
        icon: '',
        sort_order: '0',
    });

    const handleCreate: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('admin.categories.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                resetCreate();
                toast.success('Category created successfully.');
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error('Category name already exists or is invalid.');
                } else if (errors.slug) {
                    toast.error('Slug is already in use.');
                } else {
                    toast.error('An error occurred while creating category.');
                }
            },
        });
    };

    const handleEdit = (category: ProductCategory) => {
        setEditingCategory(category);
        setEditData({
            name: category.name,
            slug: category.slug,
            description: category.description || '',
            icon: category.icon || '',
            sort_order: category.sort_order?.toString() || '0',
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate: FormEventHandler = (e) => {
        e.preventDefault();
        
        if (!editingCategory) return;
        
        put(route('admin.categories.update', editingCategory.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                setEditingCategory(null);
                resetEdit();
                toast.success('Category updated successfully.');
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error('Category name already exists or is invalid.');
                } else if (errors.slug) {
                    toast.error('Slug is already in use.');
                } else {
                    toast.error('An error occurred while updating category.');
                }
            },
        });
    };

    const handleDelete = (category: ProductCategory) => {
        setDeletingCategory(category);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!deletingCategory) return;

        setIsDeleting(true);
        router.delete(route('admin.categories.destroy', deletingCategory.id), {
            onSuccess: () => {
                toast.success('Category deleted successfully.');
                setIsDeleteModalOpen(false);
                setDeletingCategory(null);
            },
            onError: () => {
                toast.error('An error occurred while deleting category.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setDeletingCategory(null);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Manage Categories</h2>
            }
        >
            <Head title="Manage Categories" />

            <div className="max-w-6xl">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Product Categories</CardTitle>
                            <Button onClick={() => setIsCreateModalOpen(true)}>
                                + Add Category
                            </Button>
                        </div>
                    </CardHeader>

                    {/* Categories Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Icon
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Slug
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Sort Order
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No categories found. Create your first category!
                                        </td>
                                    </tr>
                                ) : (
                                    categories.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="text-2xl">{category.icon}</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{category.slug}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 max-w-xs truncate">
                                                    {category.description}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{category.sort_order}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(category)}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <PencilIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(category)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <form onSubmit={handleCreate} className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
                    
                    <div className="space-y-4">
                        <Input
                            label="Category Name"
                            value={createData.name}
                            onChange={(e) => setCreateData('name', e.target.value)}
                            error={createErrors.name}
                            required
                        />

                        <Input
                            label="Slug"
                            value={createData.slug}
                            onChange={(e) => setCreateData('slug', e.target.value)}
                            error={createErrors.slug}
                            helperText="URL-friendly name (e.g., payment-gateways)"
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={createData.description}
                                onChange={(e) => setCreateData('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                            />
                            {createErrors.description && (
                                <p className="mt-1 text-sm text-red-500">{createErrors.description}</p>
                            )}
                        </div>

                        <Input
                            label="Icon (Emoji)"
                            value={createData.icon}
                            onChange={(e) => setCreateData('icon', e.target.value)}
                            error={createErrors.icon}
                            placeholder="🔌"
                            maxLength={10}
                        />

                        <Input
                            label="Sort Order"
                            type="number"
                            value={createData.sort_order}
                            onChange={(e) => setCreateData('sort_order', e.target.value)}
                            error={createErrors.sort_order}
                            min="0"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsCreateModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={creating}>
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <form onSubmit={handleUpdate} className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                    
                    <div className="space-y-4">
                        <Input
                            label="Category Name"
                            value={editData.name}
                            onChange={(e) => setEditData('name', e.target.value)}
                            error={editErrors.name}
                            required
                        />

                        <Input
                            label="Slug"
                            value={editData.slug}
                            onChange={(e) => setEditData('slug', e.target.value)}
                            error={editErrors.slug}
                            helperText="URL-friendly name (e.g., payment-gateways)"
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={editData.description}
                                onChange={(e) => setEditData('description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                rows={3}
                            />
                            {editErrors.description && (
                                <p className="mt-1 text-sm text-red-500">{editErrors.description}</p>
                            )}
                        </div>

                        <Input
                            label="Icon (Emoji)"
                            value={editData.icon}
                            onChange={(e) => setEditData('icon', e.target.value)}
                            error={editErrors.icon}
                            placeholder="🔌"
                            maxLength={10}
                        />

                        <Input
                            label="Sort Order"
                            type="number"
                            value={editData.sort_order}
                            onChange={(e) => setEditData('sort_order', e.target.value)}
                            error={editErrors.sort_order}
                            min="0"
                        />
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={updating}>
                            Update
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={isDeleteModalOpen}
                title="Delete Category"
                itemName={deletingCategory?.name}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                processing={isDeleting}
            />
        </AdminLayout>
    );
}
