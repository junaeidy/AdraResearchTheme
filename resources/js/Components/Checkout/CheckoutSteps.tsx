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
        <div className="w-full py-8">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.name}>
                        <div className="flex flex-col items-center">
                            <div className={`
                                flex items-center justify-center w-14 h-14 rounded-2xl border-2 shadow-md transition-all duration-300
                                ${step.status === 'completed' 
                                    ? 'bg-gradient-to-br from-green-500 to-emerald-500 border-green-500 text-white shadow-green-200' 
                                    : step.status === 'current'
                                    ? 'bg-gradient-to-br from-blue-600 to-indigo-600 border-blue-600 text-white shadow-blue-200 scale-110'
                                    : 'bg-white border-gray-300 text-gray-400'}
                            `}>
                                {step.status === 'completed' ? (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <div className={`text-[18px] font-bold ${step.status === 'current' ? 'text-white' : 'text-gray-400'}`}>
                                        {index + 1}
                                    </div>
                                )}
                            </div>
                            <span className={`
                                mt-3 text-[14px] font-bold
                                ${step.status === 'completed' || step.status === 'current'
                                    ? 'text-gray-900'
                                    : 'text-gray-400'}
                            `}>
                                {step.name}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`
                                flex-1 h-1 mx-3 rounded-full transition-all duration-300
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
