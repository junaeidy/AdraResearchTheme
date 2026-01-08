import { Head, Link } from '@inertiajs/react';
import { Product, ProductCategory, PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { formatRupiah } from '@/utils/currency';

interface HomeProps extends PageProps {
    featuredProducts: Product[];
    categories: ProductCategory[];
}

export default function Home({ auth, featuredProducts, categories }: HomeProps) {
    return (
        <>
            <Head title="Home" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="home" />

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Premium OJS Plugins & Themes
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100">
                            Enhance your Open Journal Systems with professional plugins and themes
                        </p>
                        <Link 
                            href="/shop" 
                            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
                        >
                            Browse Products
                        </Link>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Category</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <div 
                                    key={category.id}
                                    className="bg-white p-6 rounded-lg shadow hover:shadow-md transition cursor-pointer"
                                >
                                    <div className="text-3xl mb-3">{category.icon}</div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                                    <p className="text-sm text-gray-600">{category.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <div 
                                    key={product.id}
                                    className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                                >
                                    <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                                    <div className="p-4">
                                        <span className="text-xs font-medium text-blue-600 uppercase">
                                            {product.product_type}
                                        </span>
                                        <h3 className="font-semibold text-gray-900 mt-1 mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                                            {product.short_description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">
                                                {formatRupiah(product.sale_price || product.price)}
                                            </span>
                                            <Link 
                                                href={`/shop/${product.slug}`}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                View Details →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
