import { License } from '@/types';
import { Link } from '@inertiajs/react';
import LicenseStatusBadge from './LicenseStatusBadge';
import ExpiryCountdown from './ExpiryCountdown';

interface Props {
    license: License;
}

export default function LicenseCard({ license }: Props) {
    const maskLicenseKey = (key: string) => {
        const parts = key.split('-');
        if (parts.length !== 4) return key;
        return `••••-••••-••••-${parts[3]}`;
    };

    const remainingActivations = license.max_activations - license.activated_count;

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            {license.product?.image && (
                <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img 
                        src={`/storage/${license.product.image}`} 
                        alt={license.product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            <div className="p-6">
                {/* Product Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {license.product?.name || 'Product'}
                </h3>

                {/* License Key */}
                <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">License Key</p>
                    <code className="text-sm font-mono text-gray-700">
                        {maskLicenseKey(license.license_key)}
                    </code>
                </div>

                {/* Status & Expiry */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <LicenseStatusBadge status={license.status} />
                    <ExpiryCountdown expiresAt={license.expires_at} />
                </div>

                {/* Activations */}
                <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Activations</span>
                        <span className="font-medium text-gray-900">
                            {license.activated_count} / {license.max_activations}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full transition-all ${
                                license.activated_count >= license.max_activations 
                                    ? 'bg-red-500' 
                                    : 'bg-blue-500'
                            }`}
                            style={{ width: `${(license.activated_count / license.max_activations) * 100}%` }}
                        />
                    </div>
                    {remainingActivations > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                            {remainingActivations} slot{remainingActivations !== 1 ? 's' : ''} remaining
                        </p>
                    )}
                </div>

                {/* Type & Duration */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="capitalize">{license.type.replace(/-/g, ' ')}</span>
                    <span>•</span>
                    <span className="capitalize">{license.duration.replace(/-/g, ' ')}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={route('licenses.show', license.product?.slug || license.id)}
                        className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        View Details
                    </Link>
                    {license.status === 'expired' && (
                        <button
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                            Renew
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
