import { Head, Link } from '@inertiajs/react';
import { Product, LicenseTypeOption } from '@/types/models';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ProductGallery from '@/Components/Product/ProductGallery';
import ProductInfo from '@/Components/Product/ProductInfo';
import ProductPricing from '@/Components/Product/ProductPricing';
import ProductTabs from '@/Components/Product/ProductTabs';
import ProductCard from '@/Components/Product/ProductCard';

interface Props {
    auth: {
        user: any;
    };
    product: Product;
    relatedProducts: Product[];
    licenseTypes: LicenseTypeOption[];
}

export default function Show({ auth, product, relatedProducts, licenseTypes }: Props) {
    return (
        <>
            <Head title={product.name} />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="shop" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm">
                        <ol className="flex items-center space-x-2 text-gray-500">
                            <li>
                                <Link href="/" className="hover:text-gray-700">
                                    Home
                                </Link>
                            </li>
                            <li>/</li>
                            <li>
                                <Link href="/shop" className="hover:text-gray-700">
                                    Shop
                                </Link>
                            </li>
                            {product.category && (
                                <>
                                    <li>/</li>
                                    <li>
                                        <Link
                                            href={`/shop?category=${product.category.id}`}
                                            className="hover:text-gray-700"
                                        >
                                            {product.category.name}
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>/</li>
                            <li className="text-gray-900 font-medium">{product.name}</li>
                        </ol>
                    </nav>

                    {/* Product Detail Grid */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Images & Info */}
                        <div className="lg:col-span-2 space-y-8">
                            <ProductGallery
                                images={product.screenshots}
                                productName={product.name}
                            />
                            <ProductInfo product={product} />
                        </div>

                        {/* Right Column - Pricing (Sticky) */}
                        <div className="lg:col-span-1">
                            <ProductPricing
                                product={product}
                                licenseTypes={licenseTypes}
                            />
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <ProductTabs product={product} />

                    {/* Related Products */}
                    {relatedProducts && relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                Related Products
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
