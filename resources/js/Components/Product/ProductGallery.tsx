import { useState } from 'react';

interface ProductGalleryProps {
    images: string[];
    productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);

    const allImages = images && images.length > 0 ? images : ['data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="450"%3E%3Crect fill="%23e2e8f0" width="800" height="450"/%3E%3Ctext fill="%2364748b" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProduct Image%3C/text%3E%3C/svg%3E'];

    return (
        <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden group shadow-md sm:shadow-lg border border-gray-200">
                <img
                    src={allImages[selectedImage]}
                    alt={productName}
                    className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500 group-hover:scale-110"
                    onClick={() => setIsZoomed(true)}
                />
                
                {/* Zoom hint */}
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs sm:text-[13px] font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg flex items-center gap-1.5 sm:gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="hidden sm:inline">Click to zoom</span>
                    <span className="sm:hidden">Zoom</span>
                </div>
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                    {allImages.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`aspect-video rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                                selectedImage === index
                                    ? 'border-blue-600 ring-2 ring-blue-200 shadow-md scale-105'
                                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm active:scale-95'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
                    onClick={() => setIsZoomed(false)}
                >
                    <button
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full text-white transition-all duration-200"
                        onClick={() => setIsZoomed(false)}
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img
                        src={allImages[selectedImage]}
                        alt={productName}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
