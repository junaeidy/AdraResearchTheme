<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DownloadController extends Controller
{
    public function index()
    {
        // Get all products that user has active license for
        $products = auth()->user()->licenses()
            ->with(['product' => function($query) {
                $query->where('is_active', true);
            }])
            ->where('status', 'active')
            ->whereHas('product', function($query) {
                $query->where('is_active', true);
            })
            ->get()
            ->map(function($license) {
                $product = $license->product;
                $product->license_expires_at = $license->expires_at;
                $product->license_status = $license->status;
                $product->license_type = $license->license_type;
                return $product;
            })
            ->unique('id')
            ->values();
        
        // Get download history for statistics
        $downloadHistory = auth()->user()->downloads()
            ->with(['product'])
            ->latest('downloaded_at')
            ->take(10)
            ->get();
        
        return Inertia::render('Account/Downloads', [
            'products' => $products,
            'downloadHistory' => $downloadHistory,
        ]);
    }
    
    public function download(Product $product, Request $request)
    {
        // Check if user owns active license for this product
        $license = auth()->user()->licenses()
            ->where('product_id', $product->id)
            ->where('status', 'active')
            ->first();
        
        if (!$license) {
            abort(403, 'You do not have an active license for this product.');
        }
        
        // Check if license expired
        if ($license->expires_at && $license->expires_at->isPast()) {
            abort(403, 'Your license has expired.');
        }
        
        // Check if product file exists
        if (!$product->file_path || !Storage::disk('private')->exists($product->file_path)) {
            abort(404, 'Product file not found. Please contact support.');
        }
        
        // Log download
        Download::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'license_id' => $license->id,
            'version' => $product->version,
            'file_path' => $product->file_path,
            'ip_address' => $request->ip(),
            'downloaded_at' => now(),
        ]);
        
        // Download file from private storage with original filename
        $downloadFilename = $product->original_filename ?? basename($product->file_path);
        
        return Storage::disk('private')->download(
            $product->file_path,
            $downloadFilename
        );
    }
}
