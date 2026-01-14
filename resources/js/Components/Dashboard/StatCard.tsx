import React from 'react';

interface StatCardProps {
    title: string;
    value: number | string;
    trend?: number; // percentage change
    icon: React.ReactNode;
    color?: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
};

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, color = 'blue' }) => {
    return (
        <div className="bg-white rounded-lg sm:rounded-xl shadow p-4 sm:p-5 lg:p-6">
            <div className="flex items-center">
                <div className={`${colorClasses[color]} p-2 sm:p-3 rounded-lg flex-shrink-0`}>
                    <div className="text-white w-5 h-5 sm:w-6 sm:h-6">
                        {icon}
                    </div>
                </div>
                <div className="ml-3 sm:ml-4 flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{value}</p>
                    {trend !== undefined && (
                        <p className={`text-xs sm:text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%<span className="hidden sm:inline"> vs last period</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
