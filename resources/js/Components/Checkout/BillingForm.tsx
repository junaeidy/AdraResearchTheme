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
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        {...register('name')}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        autoFocus
                    />
                    {(validationErrors.name || errors.name) && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.name?.message || errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        {...register('email')}
                        value={data.email}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm cursor-not-allowed"
                    />
                    {(validationErrors.email || errors.email) && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.email?.message || errors.email}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        {...register('phone')}
                        onChange={(e) => setData('phone', e.target.value)}
                        placeholder="+62 812 3456 7890"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {(validationErrors.phone || errors.phone) && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.phone?.message || errors.phone}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray-700">
                        Organization (Optional)
                    </label>
                    <input
                        type="text"
                        id="organization"
                        {...register('organization')}
                        onChange={(e) => setData('organization', e.target.value)}
                        placeholder="University, Company, etc."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {(validationErrors.organization || errors.organization) && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.organization?.message || errors.organization}
                        </p>
                    )}
                </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Address Information</h3>
                
                <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="country"
                        {...register('country')}
                        onChange={(e) => setData('country', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                    {(validationErrors.country || errors.country) && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.country?.message || errors.country}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                        Street Address <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="address"
                        {...register('address')}
                        onChange={(e) => setData('address', e.target.value)}
                        rows={3}
                        placeholder="Street address, building, apartment, etc."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {(validationErrors.address || errors.address) && (
                        <p className="mt-1 text-sm text-red-600">
                            {validationErrors.address?.message || errors.address}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="city"
                            {...register('city')}
                            onChange={(e) => setData('city', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {(validationErrors.city || errors.city) && (
                            <p className="mt-1 text-sm text-red-600">
                                {validationErrors.city?.message || errors.city}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700">
                            Postal Code (Optional)
                        </label>
                        <input
                            type="text"
                            id="postal_code"
                            {...register('postal_code')}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                        {(validationErrors.postal_code || errors.postal_code) && (
                            <p className="mt-1 text-sm text-red-600">
                                {validationErrors.postal_code?.message || errors.postal_code}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Additional Notes */}
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Order Notes (Optional)
                </label>
                <textarea
                    id="notes"
                    {...register('notes')}
                    onChange={(e) => setData('notes', e.target.value)}
                    rows={3}
                    placeholder="Any special instructions or notes for your order"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {(validationErrors.notes || errors.notes) && (
                    <p className="mt-1 text-sm text-red-600">
                        {validationErrors.notes?.message || errors.notes}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {processing ? 'Processing...' : 'Continue to Review'}
                </button>
            </div>
        </form>
    );
}
