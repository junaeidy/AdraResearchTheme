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
        <div className="w-full py-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <React.Fragment key={step.name}>
                        <div className="flex flex-col items-center">
                            <div className={`
                                flex items-center justify-center w-10 h-10 rounded-full border-2
                                ${step.status === 'completed' 
                                    ? 'bg-green-600 border-green-600 text-white' 
                                    : step.status === 'current'
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-400'}
                            `}>
                                {step.status === 'completed' ? (
                                    <CheckCircleIcon className="w-6 h-6" />
                                ) : (
                                    <div className={`w-6 h-6 rounded-full ${step.status === 'current' ? 'bg-current' : 'border-2 border-current'}`} />
                                )}
                            </div>
                            <span className={`
                                mt-2 text-sm font-medium
                                ${step.status === 'completed' || step.status === 'current'
                                    ? 'text-gray-900'
                                    : 'text-gray-400'}
                            `}>
                                {step.name}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div className={`
                                flex-1 h-0.5 mx-2
                                ${steps[index + 1].status === 'completed' || step.status === 'completed'
                                    ? 'bg-green-600'
                                    : 'bg-gray-300'}
                            `} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
