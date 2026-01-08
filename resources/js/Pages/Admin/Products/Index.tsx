import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { Product, ProductCategory, PageProps } from '@/types';
import { formatRupiah } from '@/utils/currency';
import AdminLayout from '@/Layouts/AdminLayout';
import Card from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';
import Badge from '@/Components/Shared/Badge';
import DeleteConfirmationModal from '@/Components/Shared/DeleteConfirmationModal';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface AdminProductsIndexProps extends PageProps {
    products: {
        data: Product[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: ProductCategory[];
    filters: {
        search?: string;
        category?: string;
        type?: string;
    };
}

export default function AdminProductsIndex({ auth, products, categories, filters }: AdminProductsIndexProps) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteClick = (product: Product) => {
        setProductToDelete(product);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!productToDelete) return;

        setIsDeleting(true);
        router.delete(route('admin.products.destroy', productToDelete.id), {
            onSuccess: () => {
                toast.success('Product deleted successfully.');
                setDeleteModalOpen(false);
                setProductToDelete(null);
            },
            onError: () => {
                toast.error('An error occurred while deleting product.');
            },
            onFinish: () => {
                setIsDeleting(false);
            },
        });
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
        setProductToDelete(null);
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Manage Products</h2>
            }
        >
            <Head title="Manage Products" />
            
            <div className="max-w-7xl mx-auto">
                    {/* Actions Bar */}
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="px-4 py-2 border border-gray-300 rounded-lg"
                                defaultValue={filters.search}
                            />
                            <select className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <select className="px-4 py-2 border border-gray-300 rounded-lg">
                                <option value="">All Types</option>
                                <option value="plugin">Plugin</option>
                                <option value="theme">Theme</option>
                            </select>
                        </div>

                        <Link href="/admin/products/create">
                            <Button>+ Add Product</Button>
                        </Link>
                    </div>

                    {/* Products Table */}
                    <Card padding="none">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {products.data.map((product) => (
                                    <tr key={product.id}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded"></div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {product.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        v{product.version}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant="info" size="sm">
                                                {product.product_type}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.category?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {formatRupiah(product.sale_price || product.price)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge variant={product.is_active ? 'success' : 'danger'} size="sm">
                                                {product.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-2">
                                                <Link 
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <PencilIcon className="w-5 h-5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteClick(product)}
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
                    </Card>

                    {/* Pagination */}
                    {products.last_page > 1 && (
                        <div className="mt-6 flex justify-center gap-2">
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                show={deleteModalOpen}
                title="Delete Product"
                itemName={productToDelete?.name}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                processing={isDeleting}
            />
        </AdminLayout>
    );
}