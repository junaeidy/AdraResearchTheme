interface Props {
    expiresAt?: string;
}

export default function ExpiryCountdown({ expiresAt }: Props) {
    if (!expiresAt) {
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                ♾️ Lifetime
            </span>
        );
    }

    const now = new Date();
    const expiry = new Date(expiresAt);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
        return (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                Expired {Math.abs(daysUntilExpiry)} days ago
            </span>
        );
    }

    let colorClass = 'bg-green-100 text-green-800 border-green-200';
    if (daysUntilExpiry <= 7) {
        colorClass = 'bg-red-100 text-red-800 border-red-200';
    } else if (daysUntilExpiry <= 30) {
        colorClass = 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
            {daysUntilExpiry === 0 ? 'Expires today' : `${daysUntilExpiry} days left`}
        </span>
    );
}
