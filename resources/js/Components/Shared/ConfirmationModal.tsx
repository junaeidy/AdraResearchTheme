import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

interface ConfirmationModalProps {
    show: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
    processing?: boolean;
    confirmText?: string;
    cancelText?: string;
    confirmButtonClass?: string;
    type?: 'info' | 'warning' | 'success';
}

export default function ConfirmationModal({
    show,
    title = 'Confirm Action',
    message = 'Are you sure you want to proceed?',
    onConfirm,
    onCancel,
    processing = false,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonClass = 'bg-blue-600 hover:bg-blue-700',
    type = 'info',
}: ConfirmationModalProps) {
    const iconMap = {
        info: InformationCircleIcon,
        warning: ExclamationTriangleIcon,
        success: CheckCircleIcon,
    };

    const iconColorMap = {
        info: 'text-blue-600',
        warning: 'text-orange-600',
        success: 'text-green-600',
    };

    const Icon = iconMap[type];
    const iconColor = iconColorMap[type];

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onCancel}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <div className="flex items-start">
                                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-${type === 'warning' ? 'orange' : type === 'success' ? 'green' : 'blue'}-100`}>
                                        <Icon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-semibold leading-6 text-gray-900"
                                        >
                                            {title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600">
                                                {message}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <Button
                                        type="button"
                                        onClick={onCancel}
                                        disabled={processing}
                                        className="bg-gray-500 hover:bg-gray-600"
                                    >
                                        {cancelText}
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={onConfirm}
                                        disabled={processing}
                                        className={confirmButtonClass}
                                    >
                                        {processing ? 'Processing...' : confirmText}
                                    </Button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
