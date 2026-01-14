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
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>Billing Information</h3>
                </div>
                <Link
                    href={route('checkout.billing')}
                    className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-[14px] text-blue-600 hover:text-blue-700 active:text-blue-800 font-bold transition-colors bg-blue-50 px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-blue-100 active:bg-blue-200"
                >
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                </Link>
            </div>

            <div className="space-y-3.5 sm:space-y-4">
                {/* Personal Info */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-[13px] text-gray-600 font-semibold mb-0.5 sm:mb-1">Full Name</p>
                    <p className="text-sm sm:text-[16px] text-gray-900 font-bold">{billing.name}</p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-[13px] text-gray-600 font-semibold mb-0.5 sm:mb-1">Email</p>
                    <p className="text-sm sm:text-[15px] text-gray-900 font-medium break-all">{billing.email}</p>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <p className="text-xs sm:text-[13px] text-gray-600 font-semibold mb-0.5 sm:mb-1">Phone</p>
                    <p className="text-sm sm:text-[15px] text-gray-900 font-medium">{billing.phone}</p>
                </div>

                {billing.organization && (
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <p className="text-xs sm:text-[13px] text-gray-600 font-semibold mb-0.5 sm:mb-1">Organization</p>
                        <p className="text-sm sm:text-[15px] text-gray-900 font-medium">{billing.organization}</p>
                    </div>
                )}

                {/* Address */}
                <div className="pt-2.5 sm:pt-3 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                        <p className="text-xs sm:text-[13px] text-gray-600 font-semibold mb-1.5 sm:mb-2">Address</p>
                        <div className="text-sm sm:text-[15px] text-gray-900 font-medium space-y-0.5 sm:space-y-1">
                            <p>{billing.address}</p>
                            <p>
                                {billing.city}
                                {billing.postal_code && `, ${billing.postal_code}`}
                            </p>
                            <p>{countryNames[billing.country] || billing.country}</p>
                        </div>
                    </div>
                </div>

                {billing.notes && (
                    <div className="pt-2.5 sm:pt-3 border-t border-gray-200">
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50/20 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <p className="text-xs sm:text-[13px] text-gray-600 font-semibold mb-1.5 sm:mb-2">Order Notes</p>
                            <p className="text-sm sm:text-[15px] text-gray-900 font-medium whitespace-pre-wrap leading-relaxed">
                                {billing.notes}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
