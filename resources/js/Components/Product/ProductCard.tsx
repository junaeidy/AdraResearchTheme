import { Link } from '@inertiajs/react';
import { Product } from '@/types';
import { formatRupiah } from '@/utils/currency';
import Badge from '@/Components/Shared/Badge';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const hasDiscount = product.sale_price && product.sale_price < product.price;

    return (
        <Link
            href={`/shop/${product.slug}`}
            className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
        >
            <div className="relative">
                {/* Product Image */}
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    {product.image ? (
                        <img
                            src={`/storage/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-400 text-4xl">📦</div>
                    )}
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
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

            <div className="p-4">
                {/* Category */}
                <div className="text-xs text-gray-500 mb-1">
                    {product.category?.name}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                {/* Short Description */}
                {product.short_description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.short_description}
                    </p>
                )}

                {/* Version & Compatibility */}
                <div className="flex gap-2 mb-3 text-xs text-gray-500">
                    <span>v{product.version}</span>
                    {product.compatibility && (
                        <>
                            <span>•</span>
                            <span>{product.compatibility}</span>
                        </>
                    )}
                </div>

                {/* Rating (placeholder for now) */}
                <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">(0)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div>
                        {hasDiscount ? (
                            <>
                                <div className="text-lg font-bold text-blue-600">
                                    {formatRupiah(product.sale_price!)}
                                </div>
                                <div className="text-sm text-gray-500 line-through">
                                    {formatRupiah(product.price)}
                                </div>
                            </>
                        ) : (
                            <div className="text-lg font-bold text-blue-600">
                                {formatRupiah(product.price)}
                            </div>
                        )}
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                        View
                    </button>
                </div>
            </div>
        </Link>
    );
}
