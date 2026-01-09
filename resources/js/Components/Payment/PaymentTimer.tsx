import { useEffect, useState } from 'react';

interface PaymentTimerProps {
    deadline: string;
}

export default function PaymentTimer({ deadline }: PaymentTimerProps) {
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        expired: boolean;
    }>({ days: 0, hours: 0, minutes: 0, expired: false });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(deadline).getTime() - new Date().getTime();
            
            if (difference <= 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, expired: true });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);

            setTimeLeft({ days, hours, minutes, expired: false });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [deadline]);

    if (timeLeft.expired) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                        <h4 className="font-semibold text-red-900">Payment Deadline Expired</h4>
                        <p className="text-sm text-red-700 mt-1">
                            This order has expired. Please contact support if you still want to proceed.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 24;

    return (
        <div className={`
            border rounded-lg p-4
            ${isUrgent 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-gray-50 border-gray-200'
            }
        `}>
            <div className="flex items-center justify-between">
                <div>
                    <h4 className={`
                        font-semibold
                        ${isUrgent ? 'text-yellow-900' : 'text-gray-900'}
                    `}>
                        Payment Deadline
                    </h4>
                    <p className={`
                        text-sm mt-1
                        ${isUrgent ? 'text-yellow-700' : 'text-gray-600'}
                    `}>
                        Complete payment before deadline
                    </p>
                </div>
                
                <div className="text-right">
                    <div className={`
                        text-2xl font-bold
                        ${isUrgent ? 'text-yellow-900' : 'text-gray-900'}
                    `}>
                        {timeLeft.days > 0 && `${timeLeft.days}d `}
                        {timeLeft.hours}h {timeLeft.minutes}m
                    </div>
                    <p className={`
                        text-xs mt-1
                        ${isUrgent ? 'text-yellow-600' : 'text-gray-500'}
                    `}>
                        {isUrgent ? 'Urgent!' : 'remaining'}
                    </p>
                </div>
            </div>
            
            {isUrgent && (
                <div className="mt-3 pt-3 border-t border-yellow-200">
                    <p className="text-sm text-yellow-800 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Please complete your payment soon to avoid order cancellation
                    </p>
                </div>
            )}
        </div>
    );
}
