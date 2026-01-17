import { useState } from 'react';
import { Product, ChangelogEntry } from '@/types/models';

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<'description' | 'features' | 'changelog'>('description');

    // Parse changelog if it's a string
    let changelogData: ChangelogEntry[] = [];
    if (product.changelog) {
        if (typeof product.changelog === 'string') {
            try {
                changelogData = JSON.parse(product.changelog);
            } catch (e) {
                changelogData = [];
            }
        } else if (Array.isArray(product.changelog)) {
            changelogData = product.changelog;
        }
    }

    // Parse features if it's a string
    let featuresData: string[] = [];
    if (product.features) {
        if (typeof product.features === 'string') {
            try {
                featuresData = JSON.parse(product.features);
            } catch (e) {
                featuresData = [];
            }
        } else if (Array.isArray(product.features)) {
            featuresData = product.features;
        }
    }

    const tabs = [
        { id: 'description' as const, label: 'Description' },
        { id: 'features' as const, label: 'Features' },
        { id: 'changelog' as const, label: 'Changelog' },
    ];

    return (
        <div className="mt-8 sm:mt-12">
            {/* Tab Headers */}
            <div className="bg-white rounded-t-xl sm:rounded-t-2xl border-x border-t border-gray-200 shadow-sm">
                <nav className="flex px-1 sm:px-2 pt-1.5 sm:pt-2 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm sm:text-[15px] font-semibold rounded-t-lg sm:rounded-t-xl transition-all duration-200 whitespace-nowrap ${
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
            <div className="bg-white rounded-b-xl sm:rounded-b-2xl border border-gray-200 shadow-sm p-4 sm:p-6 lg:p-8">
                {activeTab === 'description' && (
                    <div className="prose prose-sm sm:prose max-w-none">
                        <div 
                            style={{
                                color: '#374151',
                                lineHeight: '1.6'
                            }}
                            dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                        <style dangerouslySetInnerHTML={{
                            __html: `
                                .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
                                    font-weight: 700 !important;
                                    color: #1f2937 !important;
                                    margin-top: 1.5rem !important;
                                    margin-bottom: 0.75rem !important;
                                }
                                .prose h1 { font-size: 1.875rem !important; }
                                .prose h2 { font-size: 1.5rem !important; }
                                .prose h3 { font-size: 1.25rem !important; }
                                .prose p {
                                    margin-bottom: 1rem !important;
                                    color: #374151 !important;
                                }
                                .prose strong {
                                    font-weight: 600 !important;
                                    color: #1f2937 !important;
                                }
                                .prose em {
                                    font-style: italic !important;
                                    color: #6b7280 !important;
                                }
                                .prose ul, .prose ol {
                                    margin: 1rem 0 !important;
                                    padding-left: 1.5rem !important;
                                }
                                .prose li {
                                    margin: 0.25rem 0 !important;
                                }
                            `
                        }} />
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="space-y-2 sm:space-y-3">
                        {featuresData && Array.isArray(featuresData) && featuresData.length > 0 ? (
                            <ul className="grid gap-2 sm:gap-3 md:grid-cols-2">
                                {featuresData.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2 sm:gap-3 bg-gradient-to-r from-green-50 to-emerald-50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl border border-green-200">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg
                                                className="w-3 h-3 sm:w-4 sm:h-4 text-white"
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
                                        <span className="text-sm sm:text-[15px] text-gray-700 font-medium">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">No features listed.</p>
                        )}
                    </div>
                )}

                {activeTab === 'changelog' && (
                    <div className="space-y-4 sm:space-y-6">
                        {changelogData && Array.isArray(changelogData) && changelogData.length > 0 ? (
                            changelogData.map((entry: ChangelogEntry, index) => (
                                <div key={index} className="relative pl-6 sm:pl-8 pb-4 sm:pb-6 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                                    <div className="absolute -left-2 sm:-left-2.5 top-0 w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full border-2 border-white shadow-md"></div>
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-blue-200">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                                            <h3 className="text-base sm:text-[17px] font-bold text-gray-900">
                                                Version {entry.version}
                                            </h3>
                                            <span className="text-xs sm:text-[13px] text-gray-600 font-medium bg-white px-2.5 sm:px-3 py-1 rounded-full self-start">
                                                {new Date(entry.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <ul className="space-y-1.5 sm:space-y-2">
                                            {entry.changes.map((change, changeIndex) => (
                                                <li key={changeIndex} className="flex items-start gap-1.5 sm:gap-2 text-gray-700 text-xs sm:text-[14px]">
                                                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                                                    <span>{change}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-6 sm:py-8 text-sm sm:text-base">No changelog available.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
