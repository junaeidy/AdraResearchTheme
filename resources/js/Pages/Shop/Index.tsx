import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Product, ProductCategory, PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import ProductGrid from '@/Components/Product/ProductGrid';
import ProductFilter from '@/Components/Product/ProductFilter';

interface ShopIndexProps extends PageProps {
    products: {
        data: Product[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    categories: ProductCategory[];
    filters: {
        category?: string;
        type?: string;
        search?: string;
        min_price?: number;
        max_price?: number;
        sort?: string;
    };
}

export default function ShopIndex({ auth, products, categories, filters }: ShopIndexProps) {
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    return (
        <>
            <Head title="Shop" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="shop" />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                                </svg>
                                <span className="text-xs sm:text-[14px] font-semibold">Product Marketplace</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold mb-2 sm:mb-3 px-4">
                                {filters.search ? `Search: "${filters.search}"` : 'Browse Our Products'}
                            </h1>
                            <p className="text-sm sm:text-base lg:text-[17px] text-blue-100">
                                {products.data.length} premium {products.data.length === 1 ? 'product' : 'products'} available
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Desktop Sidebar Filters */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-24">
                                <ProductFilter 
                                    categories={categories}
                                    filters={{
                                        ...filters,
                                        min_price: filters.min_price,
                                        max_price: filters.max_price,
                                    }}
                                />
                            </div>
                        </aside>

                        {/* Mobile Filter Overlay */}
                        {showMobileFilters && (
                            <>
                                {/* Backdrop */}
                                <div 
                                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                                    onClick={() => setShowMobileFilters(false)}
                                />
                                
                                {/* Drawer */}
                                <div className="fixed inset-y-0 left-0 w-80 max-w-[85%] bg-white z-50 overflow-y-auto lg:hidden">
                                    <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                                        <button
                                            onClick={() => setShowMobileFilters(false)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <ProductFilter 
                                            categories={categories}
                                            filters={{
                                                ...filters,
                                                min_price: filters.min_price,
                                                max_price: filters.max_price,
                                            }}
                                            onApply={() => setShowMobileFilters(false)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Products Grid */}
                        <main className="lg:col-span-9">
                            {/* Toolbar */}
                            <div className="mb-4 sm:mb-6 bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 shadow-sm">
                                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
                                    <div className="flex items-center justify-between sm:justify-start gap-3">
                                        {/* Mobile Filter Button */}
                                        <button
                                            onClick={() => setShowMobileFilters(true)}
                                            className="lg:hidden flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                            </svg>
                                            <span>Filters</span>
                                        </button>

                                        <div className="flex items-center gap-2">
                                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            <span className="text-sm sm:text-[15px] font-semibold text-gray-900">
                                                {products.data.length} {products.data.length === 1 ? 'Product' : 'Products'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <label className="text-xs sm:text-[14px] text-gray-600 font-medium whitespace-nowrap">Sort by:</label>
                                        <select 
                                            className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-[14px] font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            value={filters.sort || 'newest'}
                                            onChange={(e) => {
                                                router.get('/shop', {
                                                    ...filters,
                                                    sort: e.target.value,
                                                }, {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                });
                                            }}
                                        >
                                            <option value="newest">Newest First</option>
                                            <option value="price_low">Price: Low to High</option>
                                            <option value="price_high">Price: High to Low</option>
                                            <option value="name">Name: A to Z</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Product Grid */}
                            <ProductGrid products={products.data} />

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="mt-6 sm:mt-8 flex justify-center px-2">
                                    <div className="inline-flex items-center gap-0.5 sm:gap-1 bg-white rounded-lg sm:rounded-xl border border-gray-200 p-1 sm:p-1.5 shadow-sm overflow-x-auto max-w-full">
                                        {products.links.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`min-w-[32px] sm:min-w-[40px] px-2 sm:px-4 py-1.5 sm:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-[14px] font-semibold transition-all duration-200 ${
                                                    link.active
                                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
