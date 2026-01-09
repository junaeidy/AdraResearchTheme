<?php

namespace App\Services;

use App\Models\User;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Str;

class OrderService
{
    /**
     * Create an order from cart items
     *
     * @param User $user
     * @param array $billingInfo
     * @param string|null $idempotencyKey
     * @return Order
     */
    public function createFromCart(User $user, array $billingInfo, ?string $idempotencyKey = null): Order
    {
        $cartService = app(CartService::class);
        $cartItems = $cartService->getCartItems();
        
        // Calculate subtotal as integer (no decimals for Rupiah)
        $subtotal = $cartItems->sum(function($item) {
            $price = (int) $item->price;
            $quantity = (int) $item->quantity;
            return $price * $quantity;
        });
        
        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'order_number' => $this->generateOrderNumber(),
            'idempotency_key' => $idempotencyKey,
            'subtotal' => $subtotal,
            'tax' => 0,
            'discount' => 0,
            'total_amount' => $subtotal,
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
