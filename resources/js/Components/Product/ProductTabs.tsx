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
            <div className="bg-white rounded-t-2xl border-x border-t border-gray-200 shadow-sm">
                <nav className="flex px-2 pt-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-6 py-3.5 text-[15px] font-semibold rounded-t-xl transition-all duration-200 ${
                                activeTab === tab.id
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t"></span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-b-2xl border border-gray-200 shadow-sm p-8">
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
                                    <li key={index} className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl border border-green-200">
                                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-4 h-4 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2.5}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                        </div>
                                        <span className="text-[15px] text-gray-700 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No features listed.</p>
                        )}
                    </div>
                )}

                {activeTab === 'changelog' && (
                    <div className="space-y-6">
                        {product.changelog && product.changelog.length > 0 ? (
                            product.changelog.map((entry: ChangelogEntry, index) => (
                                <div key={index} className="relative pl-8 pb-6 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                                    <div className="absolute -left-2.5 top-0 w-5 h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-2 border-white shadow-md"></div>
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[17px] font-bold text-gray-900">
                                                Version {entry.version}
                                            </h3>
                                            <span className="text-[13px] text-gray-600 font-medium bg-white px-3 py-1 rounded-full">
                                                {new Date(entry.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <ul className="space-y-2">
                                            {entry.changes.map((change, changeIndex) => (
                                                <li key={changeIndex} className="flex items-start gap-2 text-gray-700 text-[14px]">
                                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                                    <span>{change}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-8">No changelog available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
