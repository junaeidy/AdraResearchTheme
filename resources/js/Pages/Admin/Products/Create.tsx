import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { ProductCategory, PageProps } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Input from '@/Components/Shared/Input';
import Button from '@/Components/Shared/Button';
import Alert from '@/Components/Shared/Alert';
import ImageUploader, { MultipleImageUploader } from '@/Components/Admin/ImageUploader';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';

interface AdminProductsCreateProps extends PageProps {
    categories: ProductCategory[];
}

interface ChangelogEntry {
    version: string;
    date: string;
    changes: string[];
}

export default function AdminProductsCreate({ auth, categories }: AdminProductsCreateProps) {
    const [mainImage, setMainImage] = useState<File | null>(null);
    const [screenshots, setScreenshots] = useState<File[]>([]);
    const [productFile, setProductFile] = useState<File | null>(null);
    const [features, setFeatures] = useState<string[]>([]);
    const [newFeature, setNewFeature] = useState('');
    const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
    const [showChangelogForm, setShowChangelogForm] = useState(false);
    const [newChangelogVersion, setNewChangelogVersion] = useState('');
    const [newChangelogChanges, setNewChangelogChanges] = useState('');

    const { data, setData, post, processing, errors, transform } = useForm({
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
        demo_url: '',
        documentation_url: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        // Validate required fields
        if (!data.name || !data.product_type || !data.category_id || !data.license_scope || !data.description || !data.version || !data.price || !productFile) {
            toast.error('Please fill all required fields');
            return;
        }

        transform((data) => {
            const formData = new FormData();
            
            // Nullable fields that should always be sent (even if empty)
            const nullableFields = ['demo_url', 'documentation_url', 'short_description', 'compatibility', 'sale_price'];
            
            // Append all text fields
            Object.entries(data).forEach(([key, value]) => {
                // For nullable fields, always append them (even if empty)
                if (nullableFields.includes(key)) {
                    formData.append(key, value?.toString() || '');
                } 
                // For required fields, only append if they have a value
                else if (value !== null && value !== undefined && value !== '') {
                    formData.append(key, value.toString());
                }
            });

            // Append features as JSON string (only if not empty)
            if (features.length > 0) {
                formData.append('features', JSON.stringify(features));
            } else {
                formData.append('features', '[]');
            }

            // Append changelog as JSON string (only if not empty)
            if (changelog.length > 0) {
                formData.append('changelog', JSON.stringify(changelog));
            } else {
                formData.append('changelog', '[]');
            }

            // Append main image
            if (mainImage) {
                formData.append('image', mainImage);
            }

            // Append product file
            if (productFile) {
                formData.append('product_file', productFile);
            }

            // Append screenshots
            screenshots.forEach((file, index) => {
                formData.append(`screenshots[${index}]`, file);
            });

            return formData;
        });

        post(route('admin.products.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Product created successfully.');
            },
            onError: (errors: any) => {
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

    const addFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature.trim()]);
            setNewFeature('');
        }
    };

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const addChangelogEntry = () => {
        if (newChangelogVersion.trim() && newChangelogChanges.trim()) {
            const changes = newChangelogChanges
                .split('\n')
                .map((c) => c.trim())
                .filter((c) => c.length > 0);

            const entry: ChangelogEntry = {
                version: newChangelogVersion.trim(),
                date: new Date().toISOString().split('T')[0],
                changes: changes,
            };

            setChangelog([...changelog, entry]);
            setNewChangelogVersion('');
            setNewChangelogChanges('');
        }
    };

    const removeChangelogEntry = (index: number) => {
        setChangelog(changelog.filter((_, i) => i !== index));
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
                                <div className="border border-gray-300 rounded-lg overflow-hidden">
                                    <Editor
                                        apiKey="9h8xi1w7cxnn3iss2hdjiiuxah4bcpj2a0fi07w9dx0i1ksk"
                                        value={data.description}
                                        onEditorChange={(content) => {
                                            // Clean up data attributes added by TinyMCE more thoroughly
                                            const cleanedContent = content
                                                .replace(/\s*data-[\w-]*="[^"]*"/g, '')
                                                .replace(/\s*data-[\w-]*='[^']*'/g, '')
                                                .replace(/\s+>/g, '>')  // Remove extra spaces before closing tags
                                                .replace(/<([^>]+)\s+>/g, '<$1>');  // Remove trailing spaces in tags
                                            setData('description', cleanedContent);
                                        }}
                                        init={{
                                            height: 400,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'charmap',
                                                'anchor', 'searchreplace', 'visualblocks', 'code',
                                                'insertdatetime', 'table', 'wordcount', 'help'
                                            ],
                                            toolbar: 'undo redo | blocks | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link table | code | removeformat help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            verify_html: false,
                                            cleanup: false,
                                            convert_urls: false,
                                            forced_root_block: '',
                                            force_p_newlines: false
                                        }}
                                    />
                                </div>
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
                                    step="1"
                                    required
                                />

                                <Input
                                    label="Sale Price (IDR)"
                                    type="number"
                                    value={data.sale_price}
                                    onChange={(e) => setData('sale_price', e.target.value)}
                                    error={errors.sale_price}
                                    min="0"
                                    step="1"
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
                                error={(errors as any).image}
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

                    {/* Features */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Features</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Add Feature
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newFeature}
                                        onChange={(e) => setNewFeature(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                addFeature();
                                            }
                                        }}
                                        placeholder="Enter a feature (e.g., 'Support for OJS 3.3+')"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                    <Button
                                        type="button"
                                        onClick={addFeature}
                                        className="whitespace-nowrap"
                                    >
                                        Add Feature
                                    </Button>
                                </div>
                            </div>

                            {features.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Features List ({features.length})
                                    </label>
                                    <ul className="space-y-2">
                                        {features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center justify-between bg-green-50 p-3 rounded-lg border border-green-200"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        className="w-5 h-5 text-green-600"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFeature(index)}
                                                    className="text-red-600 hover:text-red-800 font-semibold"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Changelog */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Changelog</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <button
                                type="button"
                                onClick={() => setShowChangelogForm(!showChangelogForm)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {showChangelogForm ? 'Cancel' : 'Add Changelog Entry'}
                            </button>

                            {showChangelogForm && (
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Version
                                        </label>
                                        <input
                                            type="text"
                                            value={newChangelogVersion}
                                            onChange={(e) => setNewChangelogVersion(e.target.value)}
                                            placeholder="e.g., 1.0.1"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Changes (one per line)
                                        </label>
                                        <textarea
                                            value={newChangelogChanges}
                                            onChange={(e) => setNewChangelogChanges(e.target.value)}
                                            placeholder="Fixed bug in module&#10;Added new feature&#10;Improved performance"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                            rows={4}
                                        />
                                    </div>

                                    <Button
                                        type="button"
                                        onClick={addChangelogEntry}
                                        className="w-full"
                                    >
                                        Add Entry
                                    </Button>
                                </div>
                            )}

                            {changelog.length > 0 && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Changelog Entries ({changelog.length})
                                    </label>
                                    <div className="space-y-3">
                                        {changelog.map((entry, index) => (
                                            <div
                                                key={index}
                                                className="bg-blue-50 p-4 rounded-lg border border-blue-200"
                                            >
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h4 className="font-bold text-gray-900">
                                                            Version {entry.version}
                                                        </h4>
                                                        <p className="text-xs text-gray-600">
                                                            {new Date(entry.date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeChangelogEntry(index)}
                                                        className="text-red-600 hover:text-red-800 font-semibold text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <ul className="text-sm text-gray-700 space-y-1 ml-4">
                                                    {entry.changes.map((change, changeIndex) => (
                                                        <li key={changeIndex}>• {change}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Product File */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product File</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Product File (.zip or .tar.gz) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="file"
                                    accept=".zip,.tar.gz"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            // Validate file size (100MB)
                                            if (file.size > 100 * 1024 * 1024) {
                                                toast.error('File size must not exceed 100MB');
                                                e.target.value = '';
                                                return;
                                            }
                                            setProductFile(file);
                                        }
                                    }}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                    required
                                />
                                {productFile && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        Selected: {productFile.name} ({(productFile.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                                {(errors as any).product_file && (
                                    <p className="mt-1 text-sm text-red-500">{(errors as any).product_file}</p>
                                )}
                                <p className="mt-1 text-xs text-gray-500">
                                    Upload the plugin/theme file (.zip or .tar.gz). Max size: 100MB
                                </p>
                            </div>
                        </div>
                    </Card>

                    {/* Links */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Links</CardTitle>
                        </CardHeader>

                        <div className="space-y-4">
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
