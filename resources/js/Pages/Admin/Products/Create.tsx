import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { ProductCategory, PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Input from '@/Components/Shared/Input';
import Button from '@/Components/Shared/Button';
import Alert from '@/Components/Shared/Alert';
import ImageUploader, { MultipleImageUploader } from '@/Components/Admin/ImageUploader';
import toast from 'react-hot-toast';

interface AdminProductsCreateProps extends PageProps {
    categories: ProductCategory[];
}

export default function AdminProductsCreate({ auth, categories }: AdminProductsCreateProps) {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [screenshots, setScreenshots] = useState<File[]>([]);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        product_type: 'plugin' as 'plugin' | 'theme',
        category_id: '',
        license_scope: 'installation' as 'installation' | 'journal',
        description: '',
        short_description: '',
        version: '',
        compatibility: '',
        price: '',
        sale_price: '',
        is_active: true,
        is_featured: false,
        download_url: '',
        demo_url: '',
        documentation_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        // Append all text fields
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                formData.append(key, value.toString());
            }
        });

        // Append main image
        if (mainImage) {
            formData.append('image', mainImage);
        }

        // Append screenshots
        screenshots.forEach((file, index) => {
            formData.append(`screenshots[${index}]`, file);
        });

        post(route('admin.products.store'), {
            data: formData,
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Product created successfully.');
            },
            onError: (errors) => {
                if (errors.name) {
                    toast.error('Product name already exists or is invalid.');
                } else if (errors.price) {
                    toast.error('Price is invalid.');
                } else if (errors.image) {
                    toast.error('Product image is invalid or too large.');
                } else {
                    toast.error('An error occurred while creating product.');
                }
            },
        });
    };

    return (
        <AdminLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold text-gray-800">Create New Product</h2>
            }
        >
            <Head title="Create Product" />

            <div className="max-w-4xl">
                <form onSubmit={submit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <Input
                                label="Product Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                error={errors.name}
                                required
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.product_type}
                                        onChange={(e) =>
                                            setData('product_type', e.target.value as 'plugin' | 'theme')
                                        }
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="plugin">Plugin</option>
                                        <option value="theme">Theme</option>
                                    </select>
                                    {errors.product_type && (
                                        <p className="mt-1 text-sm text-red-500">{errors.product_type}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Category <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={data.category_id}
                                        onChange={(e) => setData('category_id', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    License Scope <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={data.license_scope}
                                    onChange={(e) =>
                                        setData('license_scope', e.target.value as 'installation' | 'journal')
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="installation">Installation (per OJS installation)</option>
                                    <option value="journal">Journal (per journal within OJS)</option>
                                </select>
                                {errors.license_scope && (
                                    <p className="mt-1 text-sm text-red-500">{errors.license_scope}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Short Description
                                </label>
                                <textarea
                                    value={data.short_description}
                                    onChange={(e) => setData('short_description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    rows={2}
                                    maxLength={500}
                                />
                                {errors.short_description && (
                                    <p className="mt-1 text-sm text-red-500">{errors.short_description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    rows={6}
                                    required
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>
                        </div>
                    </Card>

                    {/* Version & Pricing */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Version & Pricing</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Version"
                                    value={data.version}
                                    onChange={(e) => setData('version', e.target.value)}
                                    error={errors.version}
                                    placeholder="1.0.0"
                                    required
                                />

                                <Input
                                    label="Compatibility"
                                    value={data.compatibility}
                                    onChange={(e) => setData('compatibility', e.target.value)}
                                    error={errors.compatibility}
                                    placeholder="OJS 3.3.x - 3.4.x"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    label="Price (IDR)"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    error={errors.price}
                                    min="0"
                                    step="0.01"
                                    required
                                />

                                <Input
                                    label="Sale Price (IDR)"
                                    type="number"
                                    value={data.sale_price}
                                    onChange={(e) => setData('sale_price', e.target.value)}
                                    error={errors.sale_price}
                                    min="0"
                                    step="0.01"
                                    helperText="Leave empty if no discount"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Images */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Images</CardTitle>
                        </CardHeader>

                        <div className="space-y-6">
                            <ImageUploader
                                label="Main Product Image"
                                onImageSelect={setMainImage}
                                onImageRemove={() => setMainImage(null)}
                                error={errors.image}
                            />

                            <MultipleImageUploader
                                label="Screenshots"
                                onImagesSelect={(files) => setScreenshots([...screenshots, ...files])}
                                onImageRemove={(index) => {
                                    setScreenshots(screenshots.filter((_, i) => i !== index));
                                }}
                            />
                        </div>
                    </Card>

                    {/* Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Links</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <Input
                                label="Download URL"
                                type="url"
                                value={data.download_url}
                                onChange={(e) => setData('download_url', e.target.value)}
                                error={errors.download_url}
                            />

                            <Input
                                label="Demo URL"
                                type="url"
                                value={data.demo_url}
                                onChange={(e) => setData('demo_url', e.target.value)}
                                error={errors.demo_url}
                            />

                            <Input
                                label="Documentation URL"
                                type="url"
                                value={data.documentation_url}
                                onChange={(e) => setData('documentation_url', e.target.value)}
                                error={errors.documentation_url}
                            />
                        </div>
                    </Card>

                    {/* Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Active (visible on shop)</span>
                            </label>

                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)}
                                    className="mr-2"
                                />
                                <span className="text-sm font-medium text-gray-700">Featured (show on homepage)</span>
                            </label>
                        </div>
                    </Card>

                    {/* Actions */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={processing}>
                            Create Product
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
