import { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Props {
    licenseKey: string;
}

export default function LicenseKeyDisplay({ licenseKey }: Props) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    // Auto-hide after 10 seconds
    useEffect(() => {
        if (isRevealed) {
            const timer = setTimeout(() => {
                setIsRevealed(false);
            }, 10000);
            return () => clearTimeout(timer);
        }
    }, [isRevealed]);

    const maskLicenseKey = (key: string) => {
        const parts = key.split('-');
        if (parts.length !== 4) return key;
        
        return `••••-${parts[1]}-••••••••-${parts[3]}`;
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(licenseKey);
            setIsCopied(true);
            toast.success('License key copied to clipboard');
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy license key');
        }
    };

    return (
        <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <code className="flex-1 font-mono text-sm text-gray-900">
                {isRevealed ? licenseKey : maskLicenseKey(licenseKey)}
            </code>
            
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsRevealed(!isRevealed)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title={isRevealed ? 'Hide key' : 'Reveal key'}
                >
                    {isRevealed ? (
                        <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                        <EyeIcon className="w-5 h-5" />
                    )}
                </button>
                
                <button
                    onClick={handleCopy}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                >
                    {isCopied ? (
                        <CheckIcon className="w-5 h-5 text-green-600" />
                    ) : (
                        <ClipboardIcon className="w-5 h-5" />
                    )}
                </button>
            </div>
        </div>
    );
}
