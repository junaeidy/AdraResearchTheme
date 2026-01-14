import { Product, PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import AccountLayout from '@/Layouts/AccountLayout';
import { ArrowDownTrayIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Download {
    id: number;
    product: Product;
    version: string;
    downloaded_at: string;
    product_id: number;
}

interface Props extends PageProps {
    products: Product[];
    downloadHistory: Download[];
}

export default function Downloads({ auth, products, downloadHistory }: Props) {
    const { flash } = usePage().props as any;

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleDownload = (productId: number) => {
        const url = route('download', { product: productId });
        window.location.href = url;
        toast.success('Download started');
    };

    return (
        <AccountLayout title="Downloads" auth={auth}>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">My Downloads</h1>
                        <p className="text-gray-600 mt-2">
                            Download your licensed products
                        </p>
                    </div>

                    {/* Available Downloads */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Available Products</h2>
                        
                        {products.length === 0 ? (
                            <div className="bg-white rounded-2xl border-2 border-gray-100 p-12 text-center shadow-sm">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                    />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No products available</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    You don't have any active licenses. Purchase a product to get started.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route('shop.index')}
                                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                                    >
                                        Browse Products
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product: any) => (
                                    <div key={product.id} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                                        {/* Product Image */}
                                        {product.image && (
                                            <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-2xl">
                                                <img
                                                    src={`/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        
                                        {/* Product Info */}
                                        <div className="p-5">
                                            <div className="mb-3">
                                                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <span className="capitalize">{product.product_type}</span>
                                                    <span>•</span>
                                                    <span>v{product.version}</span>
                                                </div>
                                            </div>

                                            {/* License Info */}
                                            <div className="mb-4 space-y-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                                    <span className="text-gray-600">License: {product.license_type}</span>
                                                </div>
                                                {product.license_expires_at && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <ClockIcon className="w-4 h-4 text-gray-400" />
                                                        <span className="text-gray-600">
                                                            Expires: {new Date(product.license_expires_at).toLocaleDateString('id-ID')}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Download Button */}
                                            <button
                                                onClick={() => handleDownload(product.id)}
                                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
                                            >
                                                <ArrowDownTrayIcon className="w-5 h-5" />
                                                Download
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Download History */}
                    {downloadHistory.length > 0 && (
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Downloads</h2>
                            <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Product
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Version
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Downloaded At
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {downloadHistory.map((download) => (
                                                <tr key={download.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            {download.product?.image && (
                                                                <img
                                                                    src={`/storage/${download.product.image}`}
                                                                    alt={download.product.name}
                                                                    className="w-10 h-10 rounded object-cover mr-3"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="font-medium text-gray-900 text-sm">
                                                                    {download.product?.name || 'Product'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-900">
                                                        v{download.version}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {new Date(download.downloaded_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
        </AccountLayout>
    );
}
