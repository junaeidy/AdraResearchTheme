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
            <div className="text-xs sm:text-sm text-gray-600">
                <span className="hidden sm:inline">Version: </span><span className="font-medium text-gray-900">v{currentVersion}</span>
            </div>
        );
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
                <span className="text-xs sm:text-sm font-medium text-gray-900 truncate"><span className="hidden sm:inline">Version: </span>{currentVersion}</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-gray-200 rounded-lg sm:rounded-xl shadow-lg z-20">
                        <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                            {versions.map((v) => (
                                <button
                                    key={v.version}
                                    onClick={() => {
                                        onVersionChange(v.version);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                        v.version === currentVersion ? 'bg-blue-50' : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-sm sm:text-base text-gray-900">v{v.version}</span>
                                        <span className="text-xs text-gray-500">{v.releaseDate}</span>
                                    </div>
                                    {v.changelog && (
                                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{v.changelog}</p>
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
