import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CheckoutSteps from '@/Components/Checkout/CheckoutSteps';
import BillingForm from '@/Components/Checkout/BillingForm';
import { PageProps } from '@/types';

interface Props extends PageProps {}

export default function Billing({ auth }: Props) {
    // Redirect if not authenticated (shouldn't happen with middleware)
    if (!auth?.user) {
        return null;
    }
    
    return (
        <>
            <Head title="Billing Information" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth.user} currentPage="checkout" />

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CheckoutSteps currentStep="billing" />

                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Billing Information
                    </h1>
                    <p className="text-gray-600 mb-8">
                        Please provide your billing details to continue
                    </p>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <BillingForm user={auth.user} />
                    </div>

                    {/* Security Notice */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start gap-3">
                            <svg
                                className="w-5 h-5 text-gray-600 mt-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">
                                    Your information is secure
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    We use industry-standard encryption to protect your personal data.
                                    Your information will only be used for order processing and communication.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
        </>
    );
}
