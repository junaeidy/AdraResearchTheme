<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiter;

class DDoSProtectionProvider extends ServiceProvider
{
    /**
     * Register DDoS protection services
     */
    public function register(): void
    {
        // Cache configuration untuk DDoS mitigation
        config([
            'cache.default' => env('CACHE_STORE', 'redis'),
        ]);
    }

    /**
     * Bootstrap DDoS protection services
     */
    public function boot(): void
    {
        // Register cache keys untuk frequently accessed data
        $this->registerCachedQueries();
        $this->registerCachingStrategy();
    }

    /**
     * Register commonly accessed queries untuk caching
     */
    private function registerCachedQueries(): void
    {
        // Product listings cache (1 hour)
        cache()->remember('products.all', 3600, function () {
            return \App\Models\Product::where('active', true)
                ->with('category')
                ->get();
        });

        // Product categories cache (24 hours)
        cache()->remember('categories.all', 86400, function () {
            return \App\Models\ProductCategory::where('active', true)
                ->withCount('products')
                ->get();
        });

        // Popular products cache (1 hour)
        cache()->remember('products.popular', 3600, function () {
            return \App\Models\Product::where('active', true)
                ->withCount('reviews')
                ->orderBy('reviews_count', 'desc')
                ->limit(10)
                ->get();
        });
    }

    /**
     * Register global caching strategy
     */
    private function registerCachingStrategy(): void
    {
        // Cache HTTP responses untuk safe GET requests
        // Dapat dikonfigurasi di routes atau middleware
    }
}
