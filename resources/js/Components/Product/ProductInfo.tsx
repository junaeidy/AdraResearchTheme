import { Product } from '@/types/models';
import { Link } from '@inertiajs/react';

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="space-y-4">
            {/* Category Badge */}
            {product.category && (
                <Link
                    href={`/shop?category=${product.category.id}`}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                >
                    {product.category.name}
                </Link>
            )}

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
            </h1>

            {/* Short Description */}
            {product.short_description && (
                <p className="text-lg text-gray-600">
                    {product.short_description}
                </p>
            )}

            {/* Rating & Reviews */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-5 h-5 ${
                                i < Math.floor(product.average_rating || 0)
                                    ? 'text-yellow-400'
                                    : 'text-gray-300'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                        {(product.average_rating || 0).toFixed(1)}
                    </span>
                </div>
                <span className="text-sm text-gray-500">
                    ({product.review_count || 0} {(product.review_count || 0) === 1 ? 'review' : 'reviews'})
                </span>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
                <div>
                    <span className="text-sm text-gray-500">Version</span>
                    <p className="font-semibold">{product.version}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">Type</span>
                    <p className="font-semibold capitalize">{product.product_type}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">Compatibility</span>
                    <p className="font-semibold">{product.compatibility}</p>
                </div>
                <div>
                    <span className="text-sm text-gray-500">License Scope</span>
                    <p className="font-semibold capitalize">{product.license_scope}</p>
                </div>
            </div>

            {/* Links */}
            {(product.demo_url || product.documentation_url) && (
                <div className="flex flex-wrap gap-3">
                    {product.demo_url && (
                        <a
                            href={product.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
