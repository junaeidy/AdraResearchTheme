import { Product, License } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    license?: License;
    version?: string;
}

export default function DownloadButton({ product, license, version }: Props) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = () => {
        setIsDownloading(true);
        
        const downloadVersion = version || product.version;
        
        // Create a link and trigger download
        const url = route('download', {
            product: product.id,
            version: downloadVersion
        });
        
        window.location.href = url;
        
        // Reset loading state after a delay
        setTimeout(() => {
            setIsDownloading(false);
            toast.success('Download started');
        }, 1000);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
            <ArrowDownTrayIcon className="w-5 h-5" />
            {isDownloading ? 'Preparing Download...' : 'Download'}
        </button>
    );
}
