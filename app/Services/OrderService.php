<?php

namespace App\Services;

use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\DiscountCode;
use App\Models\DiscountUsage;
use Illuminate\Support\Str;

class OrderService
{
    /**
     * Create an order from cart items
     *
     * @param User $user
     * @param array $billingInfo
     * @param string|null $idempotencyKey
     * @param int|null $discountCodeId
     * @return Order
     */
    public function createFromCart(User $user, array $billingInfo, ?string $idempotencyKey = null, ?int $discountCodeId = null): Order
    {
        $cartService = app(CartService::class);
        $cartItems = $cartService->getCartItems();
        
        // Calculate subtotal as integer (no decimals for Rupiah)
        $subtotal = $cartItems->sum(function($item) {
            $price = (int) $item->price;
            $quantity = (int) $item->quantity;
            return $price * $quantity;
        });
        
        // Calculate discount
        $discount = 0;
        $discountCode = null;
        
        if ($discountCodeId) {
            $discountCode = DiscountCode::find($discountCodeId);
            
            // Validate discount code one more time before creating order
            if ($discountCode && $discountCode->isValid() && !$discountCode->isUsedByUser($user->id)) {
                if (!$discountCode->minimum_purchase || $subtotal >= $discountCode->minimum_purchase) {
                    $discount = $discountCode->calculateDiscount($subtotal);
                }
            } else {
                $discountCode = null; // Invalid, don't apply
            }
        }
        
        // Get tax percentage from settings
        $taxPercentage = (float) \App\Models\WebsiteSetting::getSetting('tax_percentage', '0');
        // Tax calculated from subtotal after discount
        $tax = (int) (($subtotal - $discount) * ($taxPercentage / 100));
        $totalAmount = $subtotal - $discount + $tax;
        
        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => $this->generateOrderNumber(),
            'idempotency_key' => $idempotencyKey,
            'subtotal' => $subtotal,
            'tax' => $tax,
            'discount' => $discount,
            'discount_code_id' => $discountCode ? $discountCode->id : null,
            'total_amount' => $totalAmount,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'payment_deadline' => now()->addDays(3),
            'notes' => $billingInfo['notes'] ?? null,
        ]);
        
        // Create order items
        foreach ($cartItems as $cartItem) {
            $itemPrice = (int) $cartItem->price;
            $itemQuantity = (int) $cartItem->quantity;
            
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $cartItem->product_id,
                'product_name' => $cartItem->product->name,
                'product_version' => $cartItem->product->version,
                'license_type' => $cartItem->license_type,
                'license_duration' => $cartItem->license_duration,
                'price' => $itemPrice,
                'quantity' => $itemQuantity,
                'subtotal' => $itemPrice * $itemQuantity,
            ]);
        }
        
        // Record discount usage if applied
        if ($discountCode && $discount > 0) {
            DiscountUsage::create([
                'discount_code_id' => $discountCode->id,
                'user_id' => $user->id,
                'order_id' => $order->id,
                'discount_amount' => $discount,
            ]);
            
            // Increment usage count
            $discountCode->incrementUsage();
        }
        
        return $order->fresh('items.product');
    }
    
    /**
     * Generate unique order number
     *
     * @return string
     */
    private function generateOrderNumber(): string
    {
        return 'ORD-' . now()->format('Ymd') . '-' . strtoupper(Str::random(6));
    }
}
