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
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
                <div className={`${colorClasses[color]} p-3 rounded-lg`}>
                    <div className="text-white">
                        {icon}
                    </div>
                </div>
                <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                    {trend !== undefined && (
                        <p className={`text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% vs last period
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
