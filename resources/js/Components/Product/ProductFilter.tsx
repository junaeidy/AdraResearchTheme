import { useState } from 'react';
import { router } from '@inertiajs/react';
import { ProductCategory } from '@/types';
import Card, { CardHeader, CardTitle } from '@/Components/Shared/Card';
import Button from '@/Components/Shared/Button';

interface ProductFilterProps {
    categories: ProductCategory[];
    filters: {
        category?: string;
        type?: string;
        min_price?: number;
        max_price?: number;
        search?: string;
    };
}

export default function ProductFilter({ categories, filters }: ProductFilterProps) {
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');
    const [minPrice, setMinPrice] = useState(filters.min_price?.toString() || '');
    const [maxPrice, setMaxPrice] = useState(filters.max_price?.toString() || '');

    const handleApplyFilters = () => {
        const params: any = { ...filters };

        if (selectedCategory) {
            params.category = selectedCategory;
        } else {
            delete params.category;
        }

        if (selectedType) {
            params.type = selectedType;
        } else {
            delete params.type;
        }

        if (minPrice) {
            params.min_price = minPrice;
        } else {
            delete params.min_price;
        }

        if (maxPrice) {
            params.max_price = maxPrice;
        } else {
            delete params.max_price;
        }

        router.get('/shop', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearFilters = () => {
        setSelectedCategory('');
        setSelectedType('');
        setMinPrice('');
        setMaxPrice('');

        router.get('/shop', { search: filters.search }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const hasActiveFilters = selectedCategory || selectedType || minPrice || maxPrice;

    return (
        <Card className="sticky top-4">
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>

            <div className="space-y-6">
                {/* Category Filter */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Category</h4>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="category"
                                value=""
                                checked={selectedCategory === ''}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="mr-2"
                            />
                            <span className="text-sm">All Categories</span>
                        </label>
                        {categories.map((category) => (
                            <label key={category.id} className="flex items-center">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category.slug}
                                    checked={selectedCategory === category.slug}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="mr-2"
                                />
                                <span className="text-sm">{category.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Type Filter */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Product Type</h4>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="type"
                                value=""
                                checked={selectedType === ''}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="mr-2"
                            />
                            <span className="text-sm">All Types</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="type"
                                value="plugin"
                                checked={selectedType === 'plugin'}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="mr-2"
                            />
                            <span className="text-sm">🔌 Plugins</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="type"
                                value="theme"
                                checked={selectedType === 'theme'}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="mr-2"
                            />
                            <span className="text-sm">🎨 Themes</span>
                        </label>
                    </div>
                </div>

                {/* Price Range Filter */}
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                    <div className="space-y-2">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            min="0"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                            min="0"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-4 border-t">
                    <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </Button>
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleClearFilters}
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            </div>
        </Card>
    );
}
