import { Product } from '@/types/models';
import { Link } from '@inertiajs/react';

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-5">
            {/* Category Badge */}
            {product.category && (
                <Link
                    href={`/shop?category=${product.category.id}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-xs sm:text-[13px] font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-200 hover:from-blue-100 hover:to-indigo-100 active:scale-95 transition-all duration-200"
                >
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                    </svg>
                    {product.category.name}
                </Link>
            )}

            {/* Product Name */}
            <h1 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] font-bold text-gray-900 leading-tight">
                {product.name}
            </h1>

            {/* Short Description */}
            {product.short_description && (
                <p className="text-sm sm:text-[15px] lg:text-[16px] text-gray-600 leading-relaxed">
                    {product.short_description}
                </p>
            )}

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 sm:gap-4 py-2 sm:py-3">
                <div className="flex items-center gap-0.5 sm:gap-1">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                i < Math.floor(Number(product.reviews_avg_rating) || 0)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="ml-1.5 sm:ml-2 text-sm sm:text-[15px] font-semibold text-gray-900">
                        {(Number(product.reviews_avg_rating) || 0).toFixed(1)}
                    </span>
                </div>
                <span className="text-xs sm:text-[14px] text-gray-500">
                    ({product.reviews_count || 0} {(product.reviews_count || 0) === 1 ? 'review' : 'reviews'})
                </span>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 py-4 sm:py-5 border-t border-b border-gray-200">
                <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[11px] sm:text-[13px] text-gray-500 font-medium">Version</span>
                    <p className="text-sm sm:text-[15px] font-semibold text-gray-900">{product.version}</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[11px] sm:text-[13px] text-gray-500 font-medium">Type</span>
                    <p className="text-sm sm:text-[15px] font-semibold text-gray-900 capitalize">{product.product_type}</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[11px] sm:text-[13px] text-gray-500 font-medium">Compatibility</span>
                    <p className="text-sm sm:text-[15px] font-semibold text-gray-900 truncate" title={product.compatibility}>{product.compatibility}</p>
                </div>
                <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[11px] sm:text-[13px] text-gray-500 font-medium">License Scope</span>
                    <p className="text-sm sm:text-[15px] font-semibold text-gray-900 capitalize">{product.license_scope}</p>
                </div>
            </div>

            {/* Links */}
            {(product.demo_url || product.documentation_url) && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.demo_url && (
                        <a
                            href={product.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 active:text-blue-800 text-xs sm:text-[14px] font-semibold transition-colors"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            View Demo
                        </a>
                    )}
                    {product.documentation_url && (
                        <a
                            href={product.documentation_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-700 active:text-blue-800 text-xs sm:text-[14px] font-semibold transition-colors"
                        >
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Documentation
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
