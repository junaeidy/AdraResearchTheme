<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DiscountCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class DiscountCodeController extends Controller
{
    /**
     * Validate discount code
     */
    public function validateCode(Request $request)
    {
        try {
            $request->validate([
                'code' => 'required|string',
                'subtotal' => 'required|numeric|min:0',
            ]);

            $code = strtoupper($request->code);
            $subtotal = (int) $request->subtotal;

            Log::info('Validating discount code', [
                'code' => $code,
                'subtotal' => $subtotal,
                'user_id' => Auth::id(),
            ]);

            // Find discount code
            $discountCode = DiscountCode::where('code', $code)->first();

            if (!$discountCode) {
                return response()->json([
                    'valid' => false,
                    'message' => 'Discount code not found.',
                ], 404);
            }

        // Check if code is valid
        if (!$discountCode->isValid()) {
            $message = 'Discount code is not valid.';
            
            if (!$discountCode->is_active) {
                $message = 'Discount code is not active.';
            } elseif ($discountCode->used_count >= $discountCode->usage_limit) {
                $message = 'Discount code has reached its usage limit.';
            } elseif ($discountCode->valid_from && now()->lt($discountCode->valid_from)) {
                $message = 'Discount code is not yet valid.';
            } elseif ($discountCode->valid_until && now()->gt($discountCode->valid_until)) {
                $message = 'Discount code has expired.';
            }

            return response()->json([
                'valid' => false,
                'message' => $message,
            ], 400);
        }

        // Check if user already used this code
        if ($discountCode->isUsedByUser(Auth::id())) {
            return response()->json([
                'valid' => false,
                'message' => 'You have already used this discount code before.',
            ], 400);
        }

        // Check minimum purchase
        if ($discountCode->minimum_purchase && $subtotal < $discountCode->minimum_purchase) {
            return response()->json([
                'valid' => false,
                'message' => 'Minimum purchase for this code is Rp ' . number_format($discountCode->minimum_purchase, 0, ',', '.'),
            ], 400);
        }

        // Calculate discount
        $discountAmount = $discountCode->calculateDiscount($subtotal);

        return response()->json([
            'valid' => true,
            'message' => 'Discount code successfully applied!',
            'discount_code_id' => $discountCode->id,
            'discount_amount' => $discountAmount,
            'discount_type' => $discountCode->discount_type,
            'discount_value' => $discountCode->discount_value,
        ]);
        } catch (\Exception $e) {
            Log::error('Discount validation error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'valid' => false,
                'message' => 'An error occurred while validating the discount code.',
            ], 500);
        }
    }
}
