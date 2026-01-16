<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\License;
use App\Models\LicenseActivation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LicenseController extends Controller
{
    public function index()
    {
        $licenses = auth()->user()->licenses()
            ->with(['product', 'activations', 'order'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('Account/Licenses/Index', [
            'licenses' => $licenses,
        ]);
    }
    
    public function show($productSlug)
    {
        // Find license by product slug for current user
        $license = auth()->user()->licenses()
            ->whereHas('product', function($query) use ($productSlug) {
                $query->where('slug', $productSlug);
            })
            ->with(['product', 'activations', 'order'])
            ->firstOrFail();
        
        $this->authorize('view', $license);
        
        return Inertia::render('Account/Licenses/Show', [
            'license' => $license,
        ]);
    }
    
    public function deactivate($productSlug, Request $request)
    {
        // Find license by product slug for current user
        $license = auth()->user()->licenses()
            ->whereHas('product', function($query) use ($productSlug) {
                $query->where('slug', $productSlug);
            })
            ->firstOrFail();
        
        $this->authorize('update', $license);
        
        $validated = $request->validate([
            'activation_id' => 'required|exists:license_activations,id',
        ]);
        
        $activation = LicenseActivation::findOrFail($validated['activation_id']);
        
        if ($activation->license_id != $license->id) {
            abort(403);
        }
        
        $activation->delete();
        
        // Decrement activated count
        $license->decrement('activated_count');
        
        return back()->with('success', 'Activation removed.');
    }
}
