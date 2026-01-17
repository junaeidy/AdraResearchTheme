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
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header user={auth.user} currentPage="checkout" />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 sm:py-10">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white" style={{fontFamily: 'NexusSansWebPro'}}>
                                    Billing Information
                                </h1>
                                <p className="text-xs sm:text-sm lg:text-[15px] text-blue-100 mt-0.5 sm:mt-1">Please provide your billing details to continue</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <CheckoutSteps currentStep="billing" />

                <div className="mt-6 sm:mt-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6">
                        <BillingForm user={auth.user} />
                    </div>

                    {/* Security Notice */}
                    <div className="mt-5 sm:mt-6 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                        <div className="flex items-start gap-2.5 sm:gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <svg
                                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2.5}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-sm sm:text-[15px] font-bold text-gray-900">
                                    Your information is secure
                                </h3>
                                <p className="text-xs sm:text-[14px] text-gray-700 mt-1 sm:mt-1.5 leading-relaxed">
                                    We use industry standard encryption to protect your personal data.
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
