import { Link } from '@inertiajs/react';
import { Product } from '@/types';
import { formatRupiah } from '@/utils/currency';
import Badge from '@/Components/Shared/Badge';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const hasDiscount = product.sale_price && product.sale_price < product.price;
    
    // Calculate starting price with lowest license multiplier (single-journal = 0.7)
    const basePrice = product.sale_price || product.price;
    const lowestMultiplier = product.license_scope === 'journal' ? 0.7 : 1.0; // single-journal or single-site
    const startingPrice = basePrice * lowestMultiplier;

    return (
        <Link
            href={`/shop/${product.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative">
                {/* Product Image */}
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-400 text-3xl sm:text-4xl">📦</div>
                    )}
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-wrap gap-1 sm:gap-2 max-w-[calc(100%-1rem)]">
                    <Badge variant="info" size="sm">
                        {product.product_type === 'plugin' ? '🔌 Plugin' : '🎨 Theme'}
                    </Badge>
                    {product.is_featured && (
                        <Badge variant="warning" size="sm">
                            ⭐ Featured
                        </Badge>
                    )}
                    {hasDiscount && (
                        <Badge variant="danger" size="sm">
                            SALE
                        </Badge>
                    )}
                </div>
            </div>

            <div className="p-3 sm:p-4">
                {/* Category */}
                <div className="text-[10px] sm:text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {product.category?.name}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 text-sm sm:text-base leading-tight">
                    {product.name}
                </h3>

                {/* Short Description */}
                {product.short_description && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                        {product.short_description}
                    </p>
                )}

                {/* Version & Compatibility */}
                <div className="flex gap-1.5 sm:gap-2 mb-2 sm:mb-3 text-[10px] sm:text-xs text-gray-500">
                    <span>v{product.version}</span>
                    {product.compatibility && (
                        <>
                            <span>•</span>
                            <span className="truncate">{product.compatibility}</span>
                        </>
                    )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                    <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-3 h-3 sm:w-4 sm:h-4 fill-current ${
                                    star <= Math.floor(Number(product.reviews_avg_rating) || 0)
                                        ? 'text-yellow-400'
                                        : 'text-gray-300'
                                }`}
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[10px] sm:text-sm text-gray-500">
                        ({product.reviews_count || 0})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-end justify-between gap-2">
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] sm:text-xs text-gray-500 mb-0.5 sm:mb-1">Starting from</div>
                        {hasDiscount ? (
                            <>
                                <div className="text-base sm:text-lg lg:text-xl font-bold text-blue-600 truncate">
                                    {formatRupiah(startingPrice)}
                                </div>
                                <div className="text-[10px] sm:text-sm text-gray-500 line-through truncate">
                                    {formatRupiah(product.price * lowestMultiplier)}
                                </div>
                            </>
                        ) : (
                            <div className="text-base sm:text-lg lg:text-xl font-bold text-blue-600 truncate">
                                {formatRupiah(startingPrice)}
                            </div>
                        )}
                    </div>
                    <button className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors whitespace-nowrap flex-shrink-0">
                        View
                    </button>
                </div>
            </div>
        </Link>
    );
}
