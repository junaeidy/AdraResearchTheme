<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\DiscountCode;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class DiscountCodeController extends Controller
{
    /**
     * Display a listing of discount codes
     */
    public function index()
    {
        $discountCodes = DiscountCode::withCount('usages')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/DiscountCodes/Index', [
            'discountCodes' => $discountCodes,
        ]);
    }

    /**
     * Show the form for creating a new discount code
     */
    public function create()
    {
        return Inertia::render('Admin/DiscountCodes/Create');
    }

    /**
     * Store a newly created discount code
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:discount_codes,code',
            'description' => 'nullable|string|max:255',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'usage_limit' => 'required|integer|min:1',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'boolean',
            'minimum_purchase' => 'nullable|numeric|min:0',
            'maximum_discount' => 'nullable|numeric|min:0',
        ]);

        // Validate discount value based on type
        if ($validated['discount_type'] === 'percentage' && $validated['discount_value'] > 100) {
            return back()->withErrors(['discount_value' => 'Percentage discount cannot exceed 100%']);
        }

        // Convert code to uppercase
        $validated['code'] = strtoupper($validated['code']);

        DiscountCode::create($validated);

        return redirect()->route('admin.discount-codes.index')
            ->with('success', 'Discount code created successfully.');
    }

    /**
     * Show the form for editing the specified discount code
     */
    public function edit(DiscountCode $discountCode)
    {
        return Inertia::render('Admin/DiscountCodes/Edit', [
            'discountCode' => $discountCode->load('usages'),
        ]);
    }

    /**
     * Update the specified discount code
     */
    public function update(Request $request, DiscountCode $discountCode)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:discount_codes,code,' . $discountCode->id,
            'description' => 'nullable|string|max:255',
            'discount_type' => 'required|in:percentage,fixed',
            'discount_value' => 'required|numeric|min:0',
            'usage_limit' => 'required|integer|min:1',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'boolean',
            'minimum_purchase' => 'nullable|numeric|min:0',
            'maximum_discount' => 'nullable|numeric|min:0',
        ]);

        // Validate discount value based on type
        if ($validated['discount_type'] === 'percentage' && $validated['discount_value'] > 100) {
            return back()->withErrors(['discount_value' => 'Percentage discount cannot exceed 100%']);
        }

        // Convert code to uppercase
        $validated['code'] = strtoupper($validated['code']);

        $discountCode->update($validated);

        return redirect()->route('admin.discount-codes.index')
            ->with('success', 'Discount code updated successfully.');
    }

    /**
     * Remove the specified discount code
     */
    public function destroy(DiscountCode $discountCode)
    {
        $discountCode->delete();

        return back()->with('success', 'Discount code deleted successfully.');
    }

    /**
     * Toggle active status
     */
    public function toggleStatus(DiscountCode $discountCode)
    {
        $discountCode->update([
            'is_active' => !$discountCode->is_active,
        ]);

        return back()->with('success', 'Discount code status updated successfully.');
    }

    /**
     * Generate random discount code
     */
    public function generateCode()
    {
        do {
            $code = strtoupper(Str::random(8));
        } while (DiscountCode::where('code', $code)->exists());

        return response()->json(['code' => $code]);
    }
}
