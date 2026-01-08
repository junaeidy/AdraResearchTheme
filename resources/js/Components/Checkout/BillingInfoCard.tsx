import React from 'react';
import { Link } from '@inertiajs/react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { BillingFormData } from '@/utils/validationSchemas';

interface BillingInfoCardProps {
    billing: BillingFormData;
}

const countryNames: Record<string, string> = {
    ID: 'Indonesia',
    US: 'United States',
    GB: 'United Kingdom',
    AU: 'Australia',
    CA: 'Canada',
    SG: 'Singapore',
    MY: 'Malaysia',
    JP: 'Japan',
    KR: 'South Korea',
    CN: 'China',
    TW: 'Taiwan',
    TH: 'Thailand',
    VN: 'Vietnam',
    PH: 'Philippines',
    IN: 'India',
};

export default function BillingInfoCard({ billing }: BillingInfoCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Billing Information</h3>
                <Link
                    href={route('checkout.billing')}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    <PencilIcon className="w-4 h-4" />
                    Edit
                </Link>
            </div>

            <div className="space-y-3">
                {/* Personal Info */}
                <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-base text-gray-900 font-medium">{billing.name}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-base text-gray-900">{billing.email}</p>
                </div>

                <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-base text-gray-900">{billing.phone}</p>
                </div>

                {billing.organization && (
                    <div>
                        <p className="text-sm text-gray-500">Organization</p>
                        <p className="text-base text-gray-900">{billing.organization}</p>
                    </div>
                )}

                {/* Address */}
                <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-2">Address</p>
                    <div className="text-base text-gray-900">
                        <p>{billing.address}</p>
                        <p>
                            {billing.city}
                            {billing.postal_code && `, ${billing.postal_code}`}
                        </p>
                        <p>{countryNames[billing.country] || billing.country}</p>
                    </div>
                </div>

                {billing.notes && (
                    <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-500">Order Notes</p>
                        <p className="text-base text-gray-900 whitespace-pre-wrap">
                            {billing.notes}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
