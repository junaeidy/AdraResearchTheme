<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Rules\NoSqlInjection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index(Request $request)
    {
        // Validate and sanitize input
        $validated = $request->validate([
            'category' => 'nullable|exists:product_categories,slug',
            'type' => 'nullable|in:plugin,theme',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'search' => ['nullable', 'string', 'max:100', new NoSqlInjection()],
            'sort' => 'nullable|in:newest,price_low,price_high,name',
        ]);

        $query = Product::where('is_active', true)->with('category');

        // Apply filters
        if ($request->filled('category')) {
            $category = ProductCategory::where('slug', $request->category)->first();
            if ($category) {
                $query->where('category_id', $category->id);
            }
        }

        if ($request->filled('type')) {
            $query->where('product_type', $request->type);
        }

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('short_description', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('description', 'LIKE', '%' . $request->search . '%');
            });
        }

        // Apply sorting
        switch ($request->sort) {
            case 'price_low':
                $query->orderBy('price', 'asc');
                break;
            case 'price_high':
                $query->orderBy('price', 'desc');
                break;
            case 'name':
                $query->orderBy('name', 'asc');
                break;
            default:
                $query->latest();
        }

        $products = $query->paginate(12)->withQueryString();
        
        $categories = ProductCategory::whereNull('parent_id')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Shop/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $validated,
        ]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)
            ->where('is_active', true)
            ->with(['category', 'reviews' => function ($query) {
                $query->with('user')->latest();
            }])
            ->firstOrFail();

        $relatedProducts = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->where('is_active', true)
            ->limit(4)
            ->get();

        // License types configuration
        $licenseTypes = $this->getLicenseTypesForProduct($product);

        // Check if user can review (purchased and hasn't reviewed yet)
        $canReview = false;
        if (Auth::check()) {
            $hasPurchased = Order::where('user_id', Auth::id())
                ->where('status', 'completed')
                ->whereHas('items', function ($query) use ($product) {
                    $query->where('product_id', $product->id);
                })
                ->exists();

            $hasReviewed = $product->reviews()->where('user_id', Auth::id())->exists();
            
            $canReview = $hasPurchased && !$hasReviewed;
        }

        return Inertia::render('Shop/Show', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'licenseTypes' => $licenseTypes,
            'canReview' => $canReview,
        ]);
    }

    /**
     * Get license types configuration for a product.
     */
    private function getLicenseTypesForProduct($product): array
    {
        $isInstallationScope = $product->license_scope === 'installation';
        
        return [
            [
                'value' => $isInstallationScope ? 'single-site' : 'single-journal',
                'label' => $isInstallationScope ? 'Single Site' : 'Single Journal',
                'description' => $isInstallationScope 
                    ? 'For one website installation' 
                    : 'For one journal publication',
                'max_activations' => 1,
            ],
            [
                'value' => $isInstallationScope ? 'multi-site' : 'multi-journal',
                'label' => $isInstallationScope ? 'Multi Site (5)' : 'Multi Journal (5)',
                'description' => $isInstallationScope 
                    ? 'For up to 5 website installations' 
                    : 'For up to 5 journal publications',
                'max_activations' => 5,
            ],
            [
                'value' => 'unlimited',
                'label' => 'Unlimited',
                'description' => 'For unlimited installations',
                'max_activations' => null,
            ],
        ];
    }
}
