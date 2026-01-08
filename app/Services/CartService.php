<?php

namespace App\Services;

use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CartService
{
    /**
     * Add an item to the cart.
     */
    public function addItem(Product $product, string $licenseType, string $licenseDuration, int $quantity, float $price): CartItem
    {
        $identifier = $this->getIdentifier();

        // Check if item already exists with same license configuration
        $existingItem = CartItem::where($identifier['column'], $identifier['value'])
            ->where('product_id', $product->id)
            ->where('license_type', $licenseType)
            ->where('license_duration', $licenseDuration)
            ->first();

        if ($existingItem) {
            // Update quantity
            $existingItem->quantity += $quantity;
            $existingItem->save();
            return $existingItem;
        }

        // Create new cart item
        return CartItem::create([
            $identifier['column'] => $identifier['value'],
            'product_id' => $product->id,
            'license_type' => $licenseType,
            'license_duration' => $licenseDuration,
            'price' => $price,
            'quantity' => $quantity,
        ]);
    }

    /**
     * Update a cart item.
     */
    public function updateItem(CartItem $item, array $data): CartItem
    {
        $item->update($data);
        return $item->fresh();
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(CartItem $item): bool
    {
        return $item->delete();
    }

    /**
     * Get all cart items for current user/session.
     */
    public function getCartItems()
    {
        $identifier = $this->getIdentifier();

        return CartItem::with('product')
            ->where($identifier['column'], $identifier['value'])
            ->get();
    }

    /**
     * Get the cart total.
     */
    public function getCartTotal(): float
    {
        $items = $this->getCartItems();
        
        return $items->sum(function ($item) {
            return $item->price * $item->quantity;
        });
    }

    /**
     * Get the cart item count.
     */
    public function getCartCount(): int
    {
        $identifier = $this->getIdentifier();

        return CartItem::where($identifier['column'], $identifier['value'])
            ->sum('quantity');
    }

    /**
     * Clear the cart.
     */
    public function clearCart(): bool
    {
        $identifier = $this->getIdentifier();

        return CartItem::where($identifier['column'], $identifier['value'])
            ->delete();
    }

    /**
     * Merge guest cart with user cart on login.
     */
    public function mergeCarts(string $sessionId, int $userId): void
    {
        // Get all cart items from the guest session
        $guestItems = CartItem::where('session_id', $sessionId)->get();

        foreach ($guestItems as $guestItem) {
            // Check if user already has this product with same license configuration
            $existingItem = CartItem::where('user_id', $userId)
                ->where('product_id', $guestItem->product_id)
                ->where('license_type', $guestItem->license_type)
                ->where('license_duration', $guestItem->license_duration)
                ->first();

            if ($existingItem) {
                // Merge quantities
                $existingItem->quantity += $guestItem->quantity;
                $existingItem->save();
                $guestItem->delete();
            } else {
                // Transfer guest item to user
                $guestItem->user_id = $userId;
                $guestItem->session_id = null;
                $guestItem->save();
            }
        }
    }

    /**
     * Get the identifier (user_id or session_id) for current context.
     */
    protected function getIdentifier(): array
    {
        if (Auth::check()) {
            return [
                'column' => 'user_id',
                'value' => Auth::id()
            ];
        }

        return [
            'column' => 'session_id',
            'value' => Session::getId()
        ];
    }
}
