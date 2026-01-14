interface PaymentStatusBadgeProps {
    status: 'unpaid' | 'pending_verification' | 'paid' | 'rejected';
}

export default function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    const config = {
        unpaid: {
            label: 'Unpaid',
            className: 'bg-gray-100 text-gray-800 border-gray-300',
        },
        pending_verification: {
            label: 'Awaiting Verification',
            className: 'bg-blue-100 text-blue-800 border-blue-300',
        },
        paid: {
            label: 'Paid',
            className: 'bg-green-100 text-green-800 border-green-300',
        },
        rejected: {
            label: 'Rejected',
            className: 'bg-red-100 text-red-800 border-red-300',
        },
    };

    const { label, className } = config[status];

    return (
        <span className={`
            inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium border
            ${className}
        `}>
            {label}
        </span>
    );
}
