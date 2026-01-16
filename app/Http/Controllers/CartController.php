<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use App\Services\CartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class CartController extends Controller
{
    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    /**
     * Display the shopping cart.
     */
    public function index()
    {
        $items = $this->cartService->getCartItems();
        $total = $this->cartService->getCartTotal();
        $count = $this->cartService->getCartCount();

        return Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $total,
            'count' => $count,
        ]);
    }

    /**
     * Add a product to the cart.
     */
    public function add(Request $request)
    {
        // 🔒 Validate input and prevent manipulation
        $validated = $request->validate([
            'product_id' => 'required|integer|exists:products,id',
            'license_type' => 'required|in:single-site,single-journal,multi-site,multi-journal,unlimited',
            'license_duration' => 'required|in:1-year,2-years,lifetime',
            'quantity' => 'required|integer|min:1|max:10',
        ]);

        // 🔒 Verify product is active
        $product = Product::where('id', $validated['product_id'])
            ->where('is_active', true)
            ->firstOrFail();

        // 🔒 Calculate price server-side (never trust client)
        $price = $product->getPriceForLicense(
            $validated['license_type'],
            $validated['license_duration']
        );

        // Add to cart
        $this->cartService->addItem(
            $product,
            $validated['license_type'],
            $validated['license_duration'],
            $validated['quantity'],
            $price
        );

        return back()->with('success', 'Product added to cart successfully');
    }

    /**
     * Update a cart item.
     */
    public function update(Request $request, CartItem $item)
    {
        // 🔒 Validate ownership (prevent cart tampering)
        $this->validateCartItemOwnership($item);

        $validated = $request->validate([
            'license_type' => 'sometimes|in:single-site,single-journal,multi-site,multi-journal,unlimited',
            'license_duration' => 'sometimes|in:1-year,2-years,lifetime',
            'quantity' => 'sometimes|integer|min:1|max:10',
        ]);

        // 🔒 Recalculate price if license changed
        if (isset($validated['license_type']) || isset($validated['license_duration'])) {
            $product = $item->product;
            $validated['price'] = $product->getPriceForLicense(
                $validated['license_type'] ?? $item->license_type,
                $validated['license_duration'] ?? $item->license_duration
            );
        }

        $this->cartService->updateItem($item, $validated);

        return back()->with('success', 'Cart updated successfully');
    }

    /**
     * Remove a cart item.
     */
    public function remove(CartItem $item)
    {
        // 🔒 Validate ownership
        $this->validateCartItemOwnership($item);

        $this->cartService->removeItem($item);

        return back()->with('success', 'Item removed from cart');
    }

    /**
     * Clear the entire cart.
     */
    public function clear()
    {
        $this->cartService->clearCart();

        return back()->with('success', 'Cart cleared successfully');
    }

    /**
     * Merge guest cart with user cart on login.
     */
    public function merge(Request $request)
    {
        if (!Auth::check()) {
            abort(403, 'Unauthorized');
        }

        $sessionId = $request->input('session_id', Session::getId());
        $userId = Auth::id();

        $this->cartService->mergeCarts($sessionId, $userId);

        return response()->json(['success' => true, 'message' => 'Cart merged successfully']);
    }

    /**
     * Get cart count (for AJAX requests).
     */
    public function count()
    {
        $count = $this->cartService->getCartCount();
        return response()->json(['count' => $count]);
    }

    /**
     * Validate that the current user/session owns this cart item.
     */
    private function validateCartItemOwnership(CartItem $item): void
    {
        if ($item->user_id) {
            // Cart item belongs to a user
            if (!Auth::check() || $item->user_id !== Auth::id()) {
                abort(403, 'Unauthorized access to cart item');
            }
        } else {
            // Cart item belongs to a session
            if ($item->session_id !== Session::getId()) {
                abort(403, 'Unauthorized access to cart item');
            }
        }
    }
}
