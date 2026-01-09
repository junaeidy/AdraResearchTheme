<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\LicenseActivated;
use App\Models\License;
use App\Models\LicenseActivation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class LicenseController extends Controller
{
    public function activate(Request $request)
    {
        $validated = $request->validate([
            'license_key' => 'required|string',
            'domain' => 'required|string',
            'journal_path' => 'nullable|string',
            'ojs_version' => 'required|string',
        ]);
        
        $license = License::where('license_key', $validated['license_key'])->first();
        
        if (!$license) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid license key.',
            ], 404);
        }
        
        // Check if active
        if ($license->status !== 'active') {
            return response()->json([
                'valid' => false,
                'message' => 'License is not active.',
            ], 403);
        }
        
        // Check if expired
        if ($license->expires_at && $license->expires_at->isPast()) {
            return response()->json([
                'valid' => false,
                'message' => 'License has expired.',
            ], 403);
        }
        
        // Generate identifier
        $identifier = $validated['domain'] . ($validated['journal_path'] ?? '');
        
        // Check if already activated on this site
        $existingActivation = $license->activations()
            ->where('full_identifier', $identifier)
            ->first();
        
        if ($existingActivation) {
            return response()->json([
                'valid' => true,
                'message' => 'License already activated on this site.',
                'license' => $this->formatLicenseResponse($license),
                'activation' => $existingActivation,
            ]);
        }
        
        // Check if max activations reached
        if ($license->activated_count >= $license->max_activations) {
            return response()->json([
                'valid' => false,
                'message' => 'Maximum activations reached.',
                'max_activations' => $license->max_activations,
            ], 403);
        }
        
        // Create activation
        $activation = LicenseActivation::create([
            'license_id' => $license->id,
            'domain' => $validated['domain'],
            'journal_path' => $validated['journal_path'],
            'full_identifier' => $identifier,
            'ip_address' => $request->ip(),
            'ojs_version' => $validated['ojs_version'],
            'user_agent' => $request->userAgent(),
            'activated_at' => now(),
            'last_check_at' => now(),
        ]);
        
        // Increment count
        $license->increment('activated_count');
        
        // Send notification email
        Mail::to($license->user->email)->send(new LicenseActivated($license, $activation));
        
        return response()->json([
            'valid' => true,
            'message' => 'License activated successfully.',
            'license' => $this->formatLicenseResponse($license),
            'activation' => $activation,
        ]);
    }
    
    public function validateLicense(Request $request)
    {
        $validated = $request->validate([
            'license_key' => 'required|string',
            'domain' => 'required|string',
            'journal_path' => 'nullable|string',
        ]);
        
        $license = License::where('license_key', $validated['license_key'])->first();
        
        if (!$license) {
            return response()->json(['valid' => false, 'message' => 'Invalid license key.'], 404);
        }
        
        $identifier = $validated['domain'] . ($validated['journal_path'] ?? '');
        
        $activation = $license->activations()
            ->where('full_identifier', $identifier)
            ->first();
        
        if (!$activation) {
            return response()->json(['valid' => false, 'message' => 'License not activated on this site.'], 403);
        }
        
        // Check status and expiry
        if ($license->status !== 'active') {
            return response()->json(['valid' => false, 'message' => 'License is not active.'], 403);
        }
        
        if ($license->expires_at && $license->expires_at->isPast()) {
            return response()->json(['valid' => false, 'message' => 'License has expired.'], 403);
        }
        
        // Update last check
        $activation->update(['last_check_at' => now()]);
        
        return response()->json([
            'valid' => true,
            'license' => $this->formatLicenseResponse($license),
        ]);
    }
    
    public function deactivate(Request $request)
    {
        $validated = $request->validate([
            'license_key' => 'required|string',
            'domain' => 'required|string',
            'journal_path' => 'nullable|string',
        ]);
        
        $license = License::where('license_key', $validated['license_key'])->first();
        
        if (!$license) {
            return response()->json(['success' => false, 'message' => 'Invalid license key.'], 404);
        }
        
        $identifier = $validated['domain'] . ($validated['journal_path'] ?? '');
        
        $activation = $license->activations()
            ->where('full_identifier', $identifier)
            ->first();
        
        if (!$activation) {
            return response()->json(['success' => false, 'message' => 'Activation not found.'], 404);
        }
        
        $activation->delete();
        $license->decrement('activated_count');
        
        return response()->json(['success' => true, 'message' => 'License deactivated.']);
    }
    
    public function info(Request $request, string $licenseKey)
    {
        $license = License::where('license_key', $licenseKey)
            ->with(['product', 'activations'])
            ->first();
        
        if (!$license) {
            return response()->json(['error' => 'License not found.'], 404);
        }
        
        return response()->json([
            'license' => $this->formatLicenseResponse($license),
            'activations' => $license->activations,
        ]);
    }
    
    private function formatLicenseResponse(License $license): array
    {
        return [
            'license_key' => $license->license_key,
            'product' => [
                'name' => $license->product->name,
                'version' => $license->product->version,
            ],
            'type' => $license->type,
            'duration' => $license->duration,
            'status' => $license->status,
            'max_activations' => $license->max_activations,
            'activated_count' => $license->activated_count,
            'expires_at' => $license->expires_at?->toDateString(),
        ];
    }
}
