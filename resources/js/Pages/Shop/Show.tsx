import { Head, Link } from '@inertiajs/react';
import { Product, LicenseTypeOption } from '@/types/models';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ProductGallery from '@/Components/Product/ProductGallery';
import ProductInfo from '@/Components/Product/ProductInfo';
import ProductPricing from '@/Components/Product/ProductPricing';
import ProductTabs from '@/Components/Product/ProductTabs';
import ProductCard from '@/Components/Product/ProductCard';
import ReviewList from '@/Components/Review/ReviewList';

interface Props {
    auth: {
        user: any;
    };
    product: Product;
    relatedProducts: Product[];
    licenseTypes: LicenseTypeOption[];
    canReview: boolean;
}

export default function Show({ auth, product, relatedProducts, licenseTypes, canReview }: Props) {
    return (
        <>
            <Head title={product.name} />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="shop" />

            <div className="py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-4 sm:mb-6 overflow-x-auto">
                        <ol className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-[14px] whitespace-nowrap pb-2">
                            <li>
                                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-1 sm:gap-1.5">
                                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    <span className="hidden sm:inline">Home</span>
                                </Link>
                            </li>
                            <li className="text-gray-400">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                            <li>
                                <Link href="/shop" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                                    Shop
                                </Link>
                            </li>
                            {product.category && (
                                <>
                                    <li className="text-gray-400">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </li>
                                    <li>
                                        <Link
                                            href={`/shop?category=${product.category.slug}`}
                                            className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                                        >
                                            {product.category.name}
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li className="text-gray-400">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </li>
                            <li className="text-gray-900 font-semibold truncate max-w-[150px] sm:max-w-none">{product.name}</li>
                        </ol>
                    </nav>

                    {/* Product Detail Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                        {/* Left Column - Images & Info */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                            <ProductGallery
                                images={product.screenshot_urls || []}
                                productName={product.name}
                            />
                            <ProductInfo product={product} />
                        </div>

                        {/* Right Column - Pricing (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24">
                                <ProductPricing
                                    product={product}
                                    licenseTypes={licenseTypes}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <ProductTabs product={product} />

                    {/* Reviews Section */}
                    <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200">
                        <div className="flex items-start sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                            <div>
                                <h2 className="text-lg sm:text-xl lg:text-[24px] font-bold text-gray-900">Customer Reviews</h2>
                                <p className="text-xs sm:text-sm lg:text-[14px] text-gray-600">See what others are saying about this product</p>
                            </div>
                        </div>
                        <ReviewList
                            reviews={product.reviews || []}
                            product={product}
                            canReview={canReview}
                            currentUserId={auth?.user?.id}
                        />
                    </div>

                    {/* Related Products */}
                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-gray-200">
                            <div className="mb-6 sm:mb-8">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-2 sm:mb-3">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                                            </svg>
                                            <span className="text-xs sm:text-[13px] font-semibold text-blue-600">You May Also Like</span>
                                        </div>
                                        <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900">Related Products</h2>
                                        <p className="text-sm sm:text-[15px] text-gray-600 mt-1">Discover similar products that might interest you</p>
                                    </div>
                                    <Link 
                                        href="/shop"
                                        className="inline-flex items-center gap-2 text-sm sm:text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto"
                                    >
                                        View All
                                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard
                                        key={relatedProduct.id}
                                        product={relatedProduct}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
        </>
    );
}
