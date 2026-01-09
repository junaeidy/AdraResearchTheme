<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\License;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LicenseController extends Controller
{
    public function index()
    {
        $licenses = License::with(['product', 'user', 'order'])
            ->latest()
            ->paginate(20);
        
        return Inertia::render('Admin/Licenses/Index', [
            'licenses' => $licenses,
        ]);
    }
    
    public function show(License $license)
    {
        return Inertia::render('Admin/Licenses/Show', [
            'license' => $license->load(['product', 'user', 'order', 'activations']),
        ]);
    }
    
    public function extend(License $license, Request $request)
    {
        $validated = $request->validate([
            'months' => 'required|integer|min:1|max:24',
        ]);
        
        if ($license->expires_at) {
            $license->update([
                'expires_at' => $license->expires_at->addMonths($validated['months']),
            ]);
        }
        
        return back()->with('success', 'License extended.');
    }
    
    public function revoke(License $license)
    {
        $license->update(['status' => 'suspended']);
        return back()->with('success', 'License suspended.');
    }
    
    public function resetActivations(License $license)
    {
        $license->activations()->delete();
        $license->update(['activated_count' => 0]);
        return back()->with('success', 'Activations reset.');
    }
}
