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
        <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            {/* Product Image */}
            {license.product?.image_url && (
                <div className="aspect-video bg-gray-100 overflow-hidden">
                    <img 
                        src={license.product.image_url} 
                        alt={license.product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            <div className="p-4 sm:p-5 lg:p-6">
                {/* Product Name */}
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 truncate">
                    {license.product?.name || 'Product'}
                </h3>

                {/* License Key */}
                <div className="mb-3 sm:mb-4">
                    <p className="text-xs text-gray-500 mb-1">License Key</p>
                    <code className="text-xs sm:text-sm font-mono text-gray-700 break-all">
                        {maskLicenseKey(license.license_key)}
                    </code>
                </div>

                {/* Status & Expiry */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    <LicenseStatusBadge status={license.status} />
                    <ExpiryCountdown expiresAt={license.expires_at} />
                </div>

                {/* Activations */}
                <div className="mb-3 sm:mb-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-600">Activations</span>
                        <span className="font-medium text-gray-900 text-xs sm:text-sm">
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
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                    <span className="capitalize truncate">{license.type.replace(/-/g, ' ')}</span>
                    <span>•</span>
                    <span className="capitalize truncate">{license.duration.replace(/-/g, ' ')}</span>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                        href={route('licenses.show', license.product?.slug || license.id)}
                        className="flex-1 text-center px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-lg sm:rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        View Details
                    </Link>
                    {license.status === 'expired' && (
                        <button
                            className="px-3 py-2 bg-green-600 text-white text-xs sm:text-sm rounded-lg sm:rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Renew
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
