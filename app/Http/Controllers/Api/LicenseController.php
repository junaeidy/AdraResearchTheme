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
            'product_slug' => 'required|string',
            'domain' => 'required|string',
            'journal_path' => 'nullable|string',
            'ojs_version' => 'required|string',
        ]);
        
        $license = License::where('license_key', $validated['license_key'])
            ->with('product')
            ->first();
        
        if (!$license) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid license key.',
            ], 404);
        }
        
        // CRITICAL: Check if license is for the correct product
        if ($license->product->slug !== $validated['product_slug']) {
            return response()->json([
                'valid' => false,
                'message' => 'This license key is not valid for this product. License is for: ' . $license->product->name,
                'licensed_product' => $license->product->name,
                'requested_product' => $validated['product_slug'],
            ], 403);
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
        
        // CRITICAL: Validate scope (installation vs journal)
        if ($license->scope === 'journal') {
            // Journal-scoped license MUST have journal_path
            if (empty($validated['journal_path'])) {
                return response()->json([
                    'valid' => false,
                    'message' => 'This is a journal-specific license. Please provide journal_path.',
                    'license_scope' => 'journal',
                ], 400);
            }
            
            // CRITICAL: For single-journal licenses, validate journal path matches
            if ($license->type === 'single-journal') {
                // First activation - store the licensed journal path
                if ($license->licensed_journal_path === null) {
                    $license->update([
                        'licensed_journal_path' => ltrim($validated['journal_path'], '/'),
                    ]);
                } else {
                    // Subsequent activations - must use the same journal
                    $normalizedRequestJournal = ltrim($validated['journal_path'], '/');
                    if ($license->licensed_journal_path !== $normalizedRequestJournal) {
                        return response()->json([
                            'valid' => false,
                            'message' => "This single-journal license is restricted to '{$license->licensed_journal_path}'. You cannot use it on '{$normalizedRequestJournal}'.",
                            'licensed_journal' => $license->licensed_journal_path,
                            'requested_journal' => $normalizedRequestJournal,
                        ], 403);
                    }
                }
            }
            
            // Generate identifier with journal path
            $identifier = $validated['domain'] . '/' . ltrim($validated['journal_path'], '/');
        } else {
            // Installation-scoped license: use domain only, ignore journal_path
            $identifier = $validated['domain'];
        }
        
        // Set activated_at dan expires_at pada aktivasi pertama kali
        if ($license->activated_at === null) {
            $licenseService = app(\App\Services\LicenseService::class);
            $license->update([
                'activated_at' => now(),
                'expires_at' => $licenseService->calculateExpiryDate($license->duration),
            ]);
        }
        
        // Check if already activated on this site/journal
        $existingActivation = $license->activations()
            ->where('full_identifier', $identifier)
            ->first();
        
        if ($existingActivation) {
            $locationMsg = $license->scope === 'journal' 
                ? 'this journal' 
                : 'this site';
            return response()->json([
                'valid' => true,
                'message' => "License already activated on {$locationMsg}.",
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
            'product_slug' => 'required|string',
            'domain' => 'required|string',
            'journal_path' => 'nullable|string',
        ]);
        
        $license = License::where('license_key', $validated['license_key'])
            ->with('product')
            ->first();
        
        if (!$license) {
            return response()->json(['valid' => false, 'message' => 'Invalid license key.'], 404);
        }
        
        // CRITICAL: Check if license is for the correct product
        if ($license->product->slug !== $validated['product_slug']) {
            return response()->json([
                'valid' => false,
                'message' => 'This license key is not valid for this product.',
                'licensed_product' => $license->product->name,
            ], 403);
        }
        
        // CRITICAL: Validate scope (installation vs journal)
        if ($license->scope === 'journal') {
            if (empty($validated['journal_path'])) {
                return response()->json([
                    'valid' => false,
                    'message' => 'This is a journal-specific license. Please provide journal_path.',
                ], 400);
            }
            
            // CRITICAL: For single-journal licenses, validate journal path matches
            if ($license->type === 'single-journal') {
                $normalizedRequestJournal = ltrim($validated['journal_path'], '/');
                if ($license->licensed_journal_path !== null && 
                    $license->licensed_journal_path !== $normalizedRequestJournal) {
                    return response()->json([
                        'valid' => false,
                        'message' => "This single-journal license is restricted to '{$license->licensed_journal_path}'. You cannot use it on '{$normalizedRequestJournal}'.",
                        'licensed_journal' => $license->licensed_journal_path,
                        'requested_journal' => $normalizedRequestJournal,
                    ], 403);
                }
            }
            
            $identifier = $validated['domain'] . '/' . ltrim($validated['journal_path'], '/');
        } else {
            $identifier = $validated['domain'];
        }
        
        $activation = $license->activations()
            ->where('full_identifier', $identifier)
            ->first();
        
        if (!$activation) {
            $scopeMsg = $license->scope === 'journal' 
                ? 'this journal' 
                : 'this site';
            return response()->json([
                'valid' => false, 
                'message' => "License not activated on {$scopeMsg}.",
                'license_scope' => $license->scope,
            ], 403);
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
            'cache_control' => [
                'max_age' => 300, // 5 minutes - untuk real-time deactivation
                'must_revalidate' => true,
            ],
            'validated_at' => now()->toIso8601String(),
        ])->header('Cache-Control', 'no-cache, must-revalidate, max-age=300');
    }
    
    public function deactivate(Request $request)
    {
        $validated = $request->validate([
            'license_key' => 'required|string',
            'product_slug' => 'required|string',
            'domain' => 'required|string',
            'journal_path' => 'nullable|string',
        ]);
        
        $license = License::where('license_key', $validated['license_key'])
            ->with('product')
            ->first();
        
        if (!$license) {
            return response()->json(['success' => false, 'message' => 'Invalid license key.'], 404);
        }
        
        // Check if license is for the correct product
        if ($license->product->slug !== $validated['product_slug']) {
            return response()->json([
                'success' => false,
                'message' => 'This license key is not valid for this product.',
            ], 403);
        }
        
        // CRITICAL: Validate scope (installation vs journal)
        if ($license->scope === 'journal') {
            if (empty($validated['journal_path'])) {
                return response()->json([
                    'success' => false,
                    'message' => 'This is a journal-specific license. Please provide journal_path.',
                ], 400);
            }
            
            // CRITICAL: For single-journal licenses, validate journal path matches
            if ($license->type === 'single-journal') {
                $normalizedRequestJournal = ltrim($validated['journal_path'], '/');
                if ($license->licensed_journal_path !== null && 
                    $license->licensed_journal_path !== $normalizedRequestJournal) {
                    return response()->json([
                        'success' => false,
                        'message' => "This single-journal license is restricted to '{$license->licensed_journal_path}'. You cannot use it on '{$normalizedRequestJournal}'.",
                    ], 403);
                }
            }
            
            $identifier = $validated['domain'] . '/' . ltrim($validated['journal_path'], '/');
        } else {
            $identifier = $validated['domain'];
        }
        
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

    public function suspend(Request $request, string $licenseKey)
    {
        $license = License::where('license_key', $licenseKey)->first();
        
        if (!$license) {
            return response()->json(['error' => 'License not found.'], 404);
        }
        
        if ($license->status === 'suspended') {
            return response()->json([
                'success' => false, 
                'message' => 'License is already suspended.'
            ], 400);
        }
        
        $license->update(['status' => 'suspended']);
        
        return response()->json([
            'success' => true,
            'message' => 'License suspended successfully.',
            'license' => $this->formatLicenseResponse($license),
        ]);
    }

    public function unsuspend(Request $request, string $licenseKey)
    {
        $license = License::where('license_key', $licenseKey)->first();
        
        if (!$license) {
            return response()->json(['error' => 'License not found.'], 404);
        }
        
        if ($license->status !== 'suspended') {
            return response()->json([
                'success' => false, 
                'message' => 'License is not suspended.',
                'current_status' => $license->status
            ], 400);
        }
        
        $license->update(['status' => 'active']);
        
        return response()->json([
            'success' => true,
            'message' => 'License activated successfully.',
            'license' => $this->formatLicenseResponse($license),
        ]);
    }
    
    private function formatLicenseResponse(License $license): array
    {
        // Hitung days remaining dengan cara yang sama seperti frontend
        $daysRemaining = null;
        if ($license->expires_at) {
            $now = now();
            $daysRemaining = (int) ceil($license->expires_at->diffInDays($now, false));
            if ($daysRemaining < 0) {
                $daysRemaining = 0; // Expired
            }
        }
        
        return [
            'license_key' => $license->license_key,
            'product' => [
                'name' => $license->product->name,
                'version' => $license->product->version,
            ],
            'type' => $license->type,
            'scope' => $license->scope,
            'duration' => $license->duration,
            'status' => $license->status,
            'max_activations' => $license->max_activations,
            'activated_count' => $license->activated_count,
            'activated_at' => $license->activated_at ? $license->activated_at->toDateString() : null,
            'expires_at' => $license->expires_at ? $license->expires_at->toDateString() : null,
            'days_remaining' => $daysRemaining,
        ];
    }
}
