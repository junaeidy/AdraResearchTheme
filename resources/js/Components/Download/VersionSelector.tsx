import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface VersionOption {
    version: string;
    releaseDate: string;
    changelog?: string;
}

interface Props {
    versions: VersionOption[];
    currentVersion: string;
    onVersionChange: (version: string) => void;
}

export default function VersionSelector({ versions, currentVersion, onVersionChange }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    if (versions.length <= 1) {
        return (
            <div className="text-sm text-gray-600">
                Version: <span className="font-medium text-gray-900">{currentVersion}</span>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <span className="text-sm font-medium text-gray-900">Version: {currentVersion}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                        <div className="max-h-96 overflow-y-auto">
                            {versions.map((v) => (
                                <button
                                    key={v.version}
                                    onClick={() => {
                                        onVersionChange(v.version);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                        v.version === currentVersion ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-gray-900">v{v.version}</span>
                                        <span className="text-xs text-gray-500">{v.releaseDate}</span>
                                    </div>
                                    {v.changelog && (
                                        <p className="text-sm text-gray-600 line-clamp-2">{v.changelog}</p>
                                    )}
                                    {v.version === currentVersion && (
                                        <span className="inline-block mt-1 text-xs text-blue-600 font-medium">
                                            Current
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
