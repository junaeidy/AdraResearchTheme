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
    return (
        <>
            <Head title="Shop" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="shop" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                        {/* Sidebar Filters */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <ProductFilter 
                                categories={categories}
                                filters={{
                                    ...filters,
                                    min_price: filters.min_price,
                                    max_price: filters.max_price,
                                }}
                            />
                        </aside>

                        {/* Products Grid */}
                        <main className="lg:col-span-9">
                            <div className="mb-6 flex justify-between items-center">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {filters.search ? `Search results for "${filters.search}"` : 'All Products'}
                                    </h1>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {products.data.length} products found
                                    </p>
                                </div>
                                
                                <select 
                                    className="px-4 py-2 border border-gray-300 rounded-lg"
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
                                    <option value="newest">Newest</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                    <option value="name">Name: A to Z</option>
                                </select>
                            </div>

                            {/* Product Grid */}
                            <ProductGrid products={products.data} />

                            {/* Pagination */}
                            {products.last_page > 1 && (
                                <div className="mt-8 flex justify-center gap-2">
                                    {products.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                                link.active
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
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
