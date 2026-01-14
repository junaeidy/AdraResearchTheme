import React from 'react';
import { useForm } from '@inertiajs/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm as useHookForm } from 'react-hook-form';
import { billingSchema, BillingFormData } from '@/utils/validationSchemas';
import { User } from '@/types';

interface BillingFormProps {
    user: User;
}

const countries = [
    { code: 'ID', name: 'Indonesia' },
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' },
    { code: 'CA', name: 'Canada' },
    { code: 'SG', name: 'Singapore' },
    { code: 'MY', name: 'Malaysia' },
    { code: 'JP', name: 'Japan' },
    { code: 'KR', name: 'South Korea' },
    { code: 'CN', name: 'China' },
    { code: 'TW', name: 'Taiwan' },
    { code: 'TH', name: 'Thailand' },
    { code: 'VN', name: 'Vietnam' },
    { code: 'PH', name: 'Philippines' },
    { code: 'IN', name: 'India' },
];

export default function BillingForm({ user }: BillingFormProps) {
    const { data, setData, post, processing, errors } = useForm<BillingFormData>({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        organization: '',
        country: 'ID',
        address: '',
        city: '',
        postal_code: '',
        notes: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors: validationErrors },
    } = useHookForm<BillingFormData>({
        resolver: zodResolver(billingSchema),
        defaultValues: data,
    });

    const onSubmit = (formData: BillingFormData) => {
        // Update Inertia form data
        Object.keys(formData).forEach((key) => {
            setData(key as keyof BillingFormData, formData[key as keyof BillingFormData]);
        });
        
        post(route('checkout.billing.store'), {
            onSuccess: () => {
                // Will redirect to review
            },
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h3 className="text-[18px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>Personal Information</h3>
                </div>
                
                <div>
                    <label htmlFor="name" className="block text-[14px] font-bold text-gray-900 mb-2">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        onChange={(e) => setData('name', e.target.value)}
                        className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                        autoFocus
                    />
                    {(validationErrors.name || errors.name) && (
                        <p className="mt-2 text-[13px] text-red-600 font-medium">
                            {validationErrors.name?.message || errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-[14px] font-bold text-gray-900 mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        value={data.email}
                        readOnly
                        className="block w-full rounded-xl border-2 border-gray-300 bg-gray-50 px-4 py-3 text-[15px] cursor-not-allowed"
                    />
                    {(validationErrors.email || errors.email) && (
                        <p className="mt-2 text-[13px] text-red-600 font-medium">
                            {validationErrors.email?.message || errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-[14px] font-bold text-gray-900 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="+62 812 3456 7890"
                        className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    {(validationErrors.phone || errors.phone) && (
                        <p className="mt-2 text-[13px] text-red-600 font-medium">
                            {validationErrors.phone?.message || errors.phone}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="organization" className="block text-[14px] font-bold text-gray-900 mb-2">
                        Organization (Optional)
                    </label>
                    <input
                        type="text"
                        id="organization"
                        {...register('organization')}
                        onChange={(e) => setData('organization', e.target.value)}
                        placeholder="University, Company, etc."
                        className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    {(validationErrors.organization || errors.organization) && (
                        <p className="mt-2 text-[13px] text-red-600 font-medium">
                            {validationErrors.organization?.message || errors.organization}
                        </p>
                    )}
                </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-[18px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>Address Information</h3>
                </div>
                
                <div>
                    <label htmlFor="country" className="block text-[14px] font-bold text-gray-900 mb-2">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="country"
                        {...register('country')}
                        onChange={(e) => setData('country', e.target.value)}
                        className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    >
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {(validationErrors.country || errors.country) && (
                        <p className="mt-2 text-[13px] text-red-600 font-medium">
                            {validationErrors.country?.message || errors.country}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="address" className="block text-[14px] font-bold text-gray-900 mb-2">
                        Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="address"
                        {...register('address')}
                        onChange={(e) => setData('address', e.target.value)}
                        rows={3}
                        placeholder="Street address, building, apartment, etc."
                        className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    {(validationErrors.address || errors.address) && (
                        <p className="mt-2 text-[13px] text-red-600 font-medium">
                            {validationErrors.address?.message || errors.address}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-[14px] font-bold text-gray-900 mb-2">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register('city')}
                            onChange={(e) => setData('city', e.target.value)}
                            className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                        {(validationErrors.city || errors.city) && (
                            <p className="mt-2 text-[13px] text-red-600 font-medium">
                                {validationErrors.city?.message || errors.city}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="postal_code" className="block text-[14px] font-bold text-gray-900 mb-2">
                            Postal Code (Optional)
                        </label>
                        <input
                            type="text"
                            id="postal_code"
                            {...register('postal_code')}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                        />
                        {(validationErrors.postal_code || errors.postal_code) && (
                            <p className="mt-2 text-[13px] text-red-600 font-medium">
                                {validationErrors.postal_code?.message || errors.postal_code}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional Notes */}
            <div>
                <label htmlFor="notes" className="block text-[14px] font-bold text-gray-900 mb-2">
                    Order Notes (Optional)
                </label>
                <textarea
                    id="notes"
                    {...register('notes')}
                    onChange={(e) => setData('notes', e.target.value)}
                    rows={3}
                    placeholder="Any special instructions or notes for your order"
                    className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                {(validationErrors.notes || errors.notes) && (
                    <p className="mt-2 text-[13px] text-red-600 font-medium">
                        {validationErrors.notes?.message || errors.notes}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={processing}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[16px] font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {processing ? 'Processing...' : 'Continue to Review'}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </form>
    );
}
