import React from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/solid';

interface Step {
    name: string;
    status: 'completed' | 'current' | 'upcoming';
}

interface CheckoutStepsProps {
    currentStep: 'cart' | 'billing' | 'review' | 'payment';
}

export default function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
    const steps: Step[] = [
        {
            name: 'Cart',
            status: ['billing', 'review', 'payment'].includes(currentStep) ? 'completed' : 
                    currentStep === 'cart' ? 'current' : 'upcoming',
        },
        {
            name: 'Billing',
            status: ['review', 'payment'].includes(currentStep) ? 'completed' : 
                    currentStep === 'billing' ? 'current' : 'upcoming',
        },
        {
            name: 'Review',
            status: currentStep === 'payment' ? 'completed' : 
                    currentStep === 'review' ? 'current' : 'upcoming',
        },
        {
            name: 'Payment',
            status: currentStep === 'payment' ? 'current' : 'upcoming',
        },
    ];

    return (
        <div className="w-full py-6 sm:py-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.name}>
                        <div className="flex flex-col items-center flex-1">
                            <div className={`
                                flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl border-2 shadow-md transition-all duration-300
                                ${step.status === 'completed' 
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-500 text-white shadow-green-200' 
                                    : step.status === 'current'
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600 text-white shadow-blue-200 scale-105 sm:scale-110'
                                    : 'bg-white border-gray-300 text-gray-400'}
                            `}>
                                {step.status === 'completed' ? (
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <div className={`text-base sm:text-[17px] lg:text-[18px] font-bold ${step.status === 'current' ? 'text-white' : 'text-gray-400'}`}>
                                        {index + 1}
                                    </div>
                                )}
                            </div>
                            <span className={`
                                mt-2 sm:mt-3 text-xs sm:text-[13px] lg:text-[14px] font-bold text-center
                                ${step.status === 'completed' || step.status === 'current'
                                    ? 'text-gray-900'
                                    : 'text-gray-400'}
                            `}>
                                {step.name}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`
                                flex-1 h-0.5 sm:h-1 mx-1.5 sm:mx-2 lg:mx-3 rounded-full transition-all duration-300 -mt-8 sm:-mt-9 lg:-mt-10
                                ${steps[index + 1].status === 'completed' || step.status === 'completed'
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                    : 'bg-gray-300'}
                            `} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
