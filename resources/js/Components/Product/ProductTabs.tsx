import { useState } from 'react';
import { Product, ChangelogEntry } from '@/types/models';

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'changelog'>('description');

    const tabs = [
        { id: 'description' as const, label: 'Description' },
        { id: 'features' as const, label: 'Features' },
        { id: 'changelog' as const, label: 'Changelog' },
    ];

    return (
        <div className="mt-12">
            {/* Tab Headers */}
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                                activeTab === tab.id
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="py-8">
                {activeTab === 'description' && (
                    <div className="prose max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="space-y-3">
                        {product.features && Array.isArray(product.features) && product.features.length > 0 ? (
                            <ul className="grid md:grid-cols-2 gap-3">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg
                                            className="w-6 h-6 text-green-500 mr-2 flex-shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No features listed.</p>
                        )}
                    </div>
                )}

                {activeTab === 'changelog' && (
                    <div className="space-y-6">
                        {product.changelog && product.changelog.length > 0 ? (
                            product.changelog.map((entry: ChangelogEntry, index) => (
                                <div key={index} className="border-l-4 border-blue-500 pl-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            Version {entry.version}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {new Date(entry.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <ul className="space-y-1">
                                        {entry.changes.map((change, changeIndex) => (
                                            <li key={changeIndex} className="text-gray-700 text-sm">
                                                • {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No changelog available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
