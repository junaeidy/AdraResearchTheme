import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';

type AlertVariant = 'success' | 'warning' | 'error' | 'info';

interface AlertProps {
    children: ReactNode;
    variant?: AlertVariant;
    title?: string;
    onClose?: () => void;
    className?: string;
}

const variantConfig: Record<
    AlertVariant,
    {
        bgColor: string;
        borderColor: string;
        textColor: string;
        icon: typeof CheckCircleIcon;
        iconColor: string;
    }
> = {
    success: {
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-800',
        icon: CheckCircleIcon,
        iconColor: 'text-green-400',
    },
    warning: {
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-800',
        icon: ExclamationTriangleIcon,
        iconColor: 'text-yellow-400',
    },
    error: {
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-800',
        icon: XCircleIcon,
        iconColor: 'text-red-400',
    },
    info: {
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-800',
        icon: InformationCircleIcon,
        iconColor: 'text-blue-400',
    },
};

export default function Alert({
    children,
    variant = 'info',
    title,
    onClose,
    className = '',
}: AlertProps) {
    const config = variantConfig[variant];
    const Icon = config.icon;

    return (
        <div
            className={`
                rounded-lg border p-4
                ${config.bgColor} ${config.borderColor}
                ${className}
            `}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <Icon className={`h-5 w-5 ${config.iconColor}`} aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1">
                    {title && (
                        <h3 className={`text-sm font-medium ${config.textColor} mb-1`}>
                            {title}
                        </h3>
                    )}
                    <div className={`text-sm ${config.textColor}`}>{children}</div>
                </div>
                {onClose && (
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                type="button"
                                onClick={onClose}
                                className={`
                                    inline-flex rounded-md p-1.5 
                                    ${config.textColor} 
                                    hover:bg-opacity-20 
                                    focus:outline-none focus:ring-2 focus:ring-offset-2
                                `}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
