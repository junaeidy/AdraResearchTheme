import { License, PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import LicenseStatusBadge from '@/Components/License/LicenseStatusBadge';
import ExpiryCountdown from '@/Components/License/ExpiryCountdown';
import LicenseKeyDisplay from '@/Components/License/LicenseKeyDisplay';
import ActivationManager from '@/Components/License/ActivationManager';
import DownloadButton from '@/Components/Download/DownloadButton';
import { formatRupiah } from '@/utils/currency';
import toast from 'react-hot-toast';

interface Props extends PageProps {
    license: License;
}

export default function LicenseShow({ auth, license }: Props) {
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

    const canDownload = license.status === 'active' && (!license.expires_at || new Date(license.expires_at) > new Date());

    return (
        <>
            <Head title={`License: ${license.product?.name || 'Product'}`} />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} />

                <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <div className="mb-6">
                        <Link
                            href={route('licenses.index')}
                            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 font-medium"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Licenses
                        </Link>
                    </div>

                    {/* License Info Card */}
                    <div className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden mb-6 shadow-md">
                        {/* Product Image */}
                        {license.product?.image && (
                            <div className="aspect-video bg-gray-100 overflow-hidden rounded-t-2xl">
                                <img 
                                    src={`/storage/${license.product.image}`} 
                                    alt={license.product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        <div className="p-6">
                            {/* Product Name & Status */}
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                        {license.product?.name}
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Version {license.product?.version}
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
                                <div className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-xl p-4">
                                    <LicenseKeyDisplay licenseKey={license.license_key} />
                                </div>
                            </div>

                            {/* License Details */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
                                    <div className="text-sm text-gray-600 mb-1">Purchased</div>
                                    <div className="font-medium text-gray-900">
                                        {new Date(license.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Download Section */}
                            {canDownload && license.product && (
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Download Product</h3>
                                    <div className="flex items-center gap-4">
                                        <DownloadButton product={license.product} license={license} />
                                        <div className="text-sm text-gray-600">
                                            Latest version: {license.product.version}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {!canDownload && (
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                                    <p className="text-sm text-red-800 font-medium">
                                        {license.status !== 'active' 
                                            ? 'This license is not active. Please contact support.'
                                            : 'This license has expired. Please renew to continue downloads.'
                                        }
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Activation Manager */}
                    <ActivationManager license={license} />

                    {/* Order Info */}
                    {license.order && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-sm text-gray-600 mb-1">Order Number</div>
                                    <Link
                                        href={route('orders.show', license.order.order_number)}
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
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
        </>
    );
}
