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
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-center lg:text-left space-y-4 sm:space-y-6">
                                {/* Badge */}
                                <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <span className="text-xs sm:text-sm font-medium text-blue-100">Trusted by Academic Publishers</span>
                                </div>

                                {/* Heading */}
                                <div className="space-y-3 sm:space-y-4">
                                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                                        <span className="block text-white">Professional Solutions</span>
                                        <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                                            for Open Journal Systems
                                        </span>
                                    </h1>
                                    <p className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                                        Elevate your scholarly publishing platform with expertly crafted plugins and themes designed for modern academic institutions.
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0">
                                    <Link 
                                        href="/shop" 
                                        className="group inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                                    >
                                        <span>Explore Products</span>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                    <Link 
                                        href="/faq" 
                                        className="inline-flex items-center justify-center gap-2 bg-blue-500/20 backdrop-blur-sm text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300"
                                    >
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        <span>Documentation</span>
                                    </Link>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-blue-400/20 px-2 sm:px-0">
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl sm:text-3xl font-bold text-white">500+</div>
                                        <div className="text-xs sm:text-sm text-blue-200">Active Users</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl sm:text-3xl font-bold text-white">50+</div>
                                        <div className="text-xs sm:text-sm text-blue-200">Products</div>
                                    </div>
                                    <div className="text-center lg:text-left">
                                        <div className="text-2xl sm:text-3xl font-bold text-white">4.9★</div>
                                        <div className="text-xs sm:text-sm text-blue-200">Rating</div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="relative hidden lg:block min-h-[400px]">
                                <div className="relative h-full">
                                    {/* Floating Card 1 */}
                                    <div className="absolute top-0 right-0 w-56 xl:w-64 bg-white/10 backdrop-blur-md rounded-xl p-4 xl:p-6 shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-8 h-8 xl:w-10 xl:h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg"></div>
                                            <div className="flex-1">
                                                <div className="h-2 bg-white/40 rounded w-3/4 mb-1"></div>
                                                <div className="h-2 bg-white/30 rounded w-1/2"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-1 bg-white/30 rounded"></div>
                                            <div className="h-1 bg-white/30 rounded w-5/6"></div>
                                            <div className="h-1 bg-white/30 rounded w-4/6"></div>
                                        </div>
                                    </div>

                                    {/* Floating Card 2 */}
                                    <div className="absolute top-24 xl:top-32 right-8 xl:right-12 w-64 xl:w-72 bg-white/10 backdrop-blur-md rounded-xl p-4 xl:p-6 shadow-2xl border border-white/20 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-semibold text-blue-300 uppercase">Premium Theme</span>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="h-28 xl:h-32 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-3"></div>
                                        <div className="flex items-center justify-between">
                                            <div className="h-2 bg-white/40 rounded w-1/3"></div>
                                            <div className="h-2 bg-white/40 rounded w-1/4"></div>
                                        </div>
                                    </div>

                                    {/* Background Glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 xl:w-96 xl:h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                            <path 
                                d="M0,100 C320,130 320,70 640,90 C960,110 960,60 1280,85 C1440,95 1440,80 1440,90 L1440,160 L0,160 Z" 
                                fill="#95C9FD"
                                fillOpacity="0.5"
                            />
                            <path 
                                d="M0,100 C320,130 320,70 640,90 C960,110 960,60 1280,85 C1440,95 1440,80 1440,90 L1440,160 L0,160 Z" 
                                fill="#F9FAFB"
                                stroke="#95C9FD"
                                strokeWidth="0.5"
                                strokeOpacity="0.3"
                            />
                        </svg>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="text-center mb-8 sm:mb-12">
                            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                                </svg>
                                <span className="text-xs sm:text-sm font-semibold text-blue-600">Product Categories</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 px-4">Browse by Category</h2>
                            <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">Discover our comprehensive collection of plugins and themes tailored for different aspects of journal publishing</p>
                        </div>

                        {/* Categories Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            {categories.map((category) => (
                                <div 
                                    key={category.id}
                                    className="group bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <span className="text-2xl sm:text-3xl">{category.icon}</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{category.name}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{category.description}</p>
                                    <div className="mt-3 sm:mt-4 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className="text-xs sm:text-sm font-semibold">Explore</span>
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Products Section */}
                <section className="py-12 sm:py-16 lg:py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Section Header */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 sm:mb-12">
                            <div className="text-center md:text-left">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                    <span className="text-xs sm:text-sm font-semibold text-blue-600">Premium Collection</span>
                                </div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 px-4 md:px-0">Featured Products</h2>
                                <p className="text-sm sm:text-base lg:text-lg text-gray-600 px-4 md:px-0">Top-rated plugins and themes loved by researchers worldwide</p>
                            </div>
                            <Link 
                                href="/shop"
                                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm lg:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                            >
                                View All
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {featuredProducts.map((product) => (
                                <Link
                                    key={product.id}
                                    href={`/shop/${product.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                                >
                                    <div className="relative h-40 sm:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                        {product.image_url ? (
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600"></div>
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                                <div className="absolute inset-0 opacity-10">
                                                    <div className="absolute inset-0" style={{
                                                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                                                    }}></div>
                                                </div>
                                            </>
                                        )}
                                        <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                                            <span className="inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold text-blue-600 uppercase shadow-lg">
                                                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                                {product.product_type}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-4 sm:p-5">
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2 leading-relaxed">
                                            {product.short_description}
                                        </p>
                                        <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-100">
                                            <div>
                                                <div className="text-[10px] sm:text-[11px] text-gray-500 uppercase font-semibold mb-1">Price</div>
                                                <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                                    {formatRupiah(product.sale_price || product.price)}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 sm:gap-1.5 text-blue-600 font-semibold text-xs sm:text-sm group-hover:gap-2 sm:group-hover:gap-2.5 transition-all">
                                                <span className="hidden sm:inline">Details</span>
                                                <span className="sm:hidden">Info</span>
                                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Mobile View All Button */}
                        <div className="mt-6 sm:mt-8 text-center md:hidden">
                            <Link 
                                href="/shop"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                View All Products
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
