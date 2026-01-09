import { License } from '@/types';

interface Props {
    status: License['status'];
}

export default function LicenseStatusBadge({ status }: Props) {
    const badges = {
        active: {
            color: 'bg-green-100 text-green-800 border-green-200',
            label: 'Active'
        },
        pending: {
            color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            label: 'Pending'
        },
        expired: {
            color: 'bg-red-100 text-red-800 border-red-200',
            label: 'Expired'
        },
        suspended: {
            color: 'bg-gray-100 text-gray-800 border-gray-200',
            label: 'Suspended'
        }
    };

    const badge = badges[status] || badges.pending;

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
            {badge.label}
        </span>
    );
}
