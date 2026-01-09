<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Rules\NoSqlInjection;
use App\Rules\ValidProductFile;
use App\Services\FileUploadService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->filled('search')) {
            $query->where(function($q) use ($request) {
                $q->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('description', 'LIKE', '%' . $request->search . '%');
            });
        }

        if ($request->filled('category')) {
            $query->where('category_id', $request->category);
        }

        if ($request->filled('type')) {
            $query->where('product_type', $request->type);
        }

        $products = $query->latest()->paginate(15)->withQueryString();
        $categories = ProductCategory::all();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category', 'type']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = ProductCategory::orderBy('name')->get();

        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Convert boolean fields if they're sent as strings
        $request->merge([
            'is_active' => filter_var($request->input('is_active', true), FILTER_VALIDATE_BOOLEAN),
            'is_featured' => filter_var($request->input('is_featured', false), FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', new NoSqlInjection()],
            'product_type' => 'required|in:plugin,theme',
            'category_id' => 'required|exists:product_categories,id',
            'license_scope' => 'required|in:installation,journal',
            'description' => ['required', 'string', new NoSqlInjection()],
            'short_description' => ['nullable', 'string', 'max:500', new NoSqlInjection()],
            'version' => ['required', 'string', 'max:50', new NoSqlInjection()],
            'compatibility' => ['nullable', 'string', 'max:100', new NoSqlInjection()],
            'price' => 'required|numeric|min:0|max:99999999.99',
            'sale_price' => 'nullable|numeric|min:0|max:99999999.99',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'screenshots.*' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'product_file' => ['required', 'file', new ValidProductFile()],
            'demo_url' => 'nullable|url|max:500',
            'documentation_url' => 'nullable|url|max:500',
        ]);

        // Upload image
        if ($request->hasFile('image')) {
            $validated['image'] = $this->fileUploadService->uploadImage(
                $request->file('image'),
                'products'
            );
        }

        // Upload screenshots
        if ($request->hasFile('screenshots')) {
            $screenshots = [];
            foreach ($request->file('screenshots') as $screenshot) {
                $screenshots[] = $this->fileUploadService->uploadImage(
                    $screenshot,
                    'products/screenshots'
                );
            }
            $validated['screenshots'] = $screenshots;
        }

        // Upload product file (.zip or .tar.gz)
        if ($request->hasFile('product_file')) {
            $file = $request->file('product_file');
            $slug = \Illuminate\Support\Str::slug($validated['name']);
            $version = $validated['version'];
            
            // Determine file extension
            $extension = $file->getClientOriginalExtension();
            if ($extension === 'gz' && str_ends_with($file->getClientOriginalName(), '.tar.gz')) {
                $extension = 'tar.gz';
            }
            
            // Store file: products/{slug}/{version}/{slug}-{version}.{ext}
            $fileName = "{$slug}-{$version}.{$extension}";
            $path = "products/{$slug}/{$version}";
            
            $validated['file_path'] = $file->storeAs($path, $fileName, 'private');
        }

        Product::create($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load(['category', 'reviews', 'licenses']);

        return Inertia::render('Admin/Products/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = ProductCategory::orderBy('name')->get();

        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Convert boolean fields if they're sent as strings
        $request->merge([
            'is_active' => filter_var($request->input('is_active', $product->is_active), FILTER_VALIDATE_BOOLEAN),
            'is_featured' => filter_var($request->input('is_featured', $product->is_featured), FILTER_VALIDATE_BOOLEAN),
        ]);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', new NoSqlInjection()],
            'product_type' => 'required|in:plugin,theme',
            'category_id' => 'required|exists:product_categories,id',
            'license_scope' => 'required|in:installation,journal',
            'description' => ['required', 'string', new NoSqlInjection()],
            'short_description' => ['nullable', 'string', 'max:500', new NoSqlInjection()],
            'version' => ['required', 'string', 'max:50', new NoSqlInjection()],
            'compatibility' => ['nullable', 'string', 'max:100', new NoSqlInjection()],
            'price' => 'required|numeric|min:0|max:99999999.99',
            'sale_price' => 'nullable|numeric|min:0|max:99999999.99',
            'is_active' => 'boolean',
            'is_featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'screenshots.*' => 'nullable|image|mimes:jpeg,jpg,png,webp|max:5120',
            'product_file' => ['nullable', 'file', new ValidProductFile()],
            'demo_url' => 'nullable|url|max:500',
            'documentation_url' => 'nullable|url|max:500',
        ]);

        // Upload new image if provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            
            $validated['image'] = $this->fileUploadService->uploadImage(
                $request->file('image'),
                'products'
            );
        }

        // Upload new screenshots if provided
        if ($request->hasFile('screenshots')) {
            // Delete old screenshots
            if ($product->screenshots) {
                foreach ($product->screenshots as $screenshot) {
                    Storage::disk('public')->delete($screenshot);
                }
            }

            $screenshots = [];
            foreach ($request->file('screenshots') as $screenshot) {
                $screenshots[] = $this->fileUploadService->uploadImage(
                    $screenshot,
                    'products/screenshots'
                );
            }
            $validated['screenshots'] = $screenshots;
        }

        // Upload new product file if provided
        if ($request->hasFile('product_file')) {
            // Delete old product file
            if ($product->file_path) {
                Storage::disk('private')->delete($product->file_path);
            }
            
            $file = $request->file('product_file');
            $slug = \Illuminate\Support\Str::slug($validated['name']);
            $version = $validated['version'];
            
            // Determine file extension
            $extension = $file->getClientOriginalExtension();
            if ($extension === 'gz' && str_ends_with($file->getClientOriginalName(), '.tar.gz')) {
                $extension = 'tar.gz';
            }
            
            // Store file: products/{slug}/{version}/{slug}-{version}.{ext}
            $fileName = "{$slug}-{$version}.{$extension}";
            $path = "products/{$slug}/{$version}";
            
            $validated['file_path'] = $file->storeAs($path, $fileName, 'private');
        }

        $product->update($validated);

        return redirect()->route('admin.products.index')
            ->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete associated images
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        if ($product->screenshots) {
            foreach ($product->screenshots as $screenshot) {
                Storage::disk('public')->delete($screenshot);
            }
        }

        // Delete product file
        if ($product->file_path) {
            Storage::disk('private')->delete($product->file_path);
        }

        $product->delete();

        return redirect()->route('admin.products.index')
            ->with('success', 'Product deleted successfully.');
    }
}
