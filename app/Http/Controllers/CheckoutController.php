<?php

namespace App\Http\Controllers;

use App\Services\CartService;
use App\Services\OrderService;
use App\Rules\NoSqlInjection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    protected CartService $cartService;
    protected OrderService $orderService;

    public function __construct(CartService $cartService, OrderService $orderService)
    {
        $this->cartService = $cartService;
        $this->orderService = $orderService;
    }

    /**
     * Show checkout overview
     */
    public function index(): Response
    {
        $cartItems = $this->cartService->getCartItems();
        
        return Inertia::render('Checkout/Index', [
            'items' => $cartItems,
            'total' => $this->cartService->getCartTotal(),
        ]);
    }

    /**
     * Show billing form
     */
    public function billing(): Response
    {
        $user = auth()->user();
        
        return Inertia::render('Checkout/Billing', [
            'user' => $user,
        ]);
    }

    /**
     * Store billing information
     */
    public function storeBilling(Request $request): RedirectResponse
    {
        // 🔒 Strong validation
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', new NoSqlInjection()],
            'email' => 'required|email:rfc,dns',
            'phone' => ['required', 'string', 'regex:/^[0-9\+\-\(\)\s]+$/', 'max:20'],
            'organization' => ['nullable', 'string', 'max:255', new NoSqlInjection()],
            'country' => 'required|string|in:ID,US,GB,AU,CA,SG,MY,JP,KR,CN,TW,TH,VN,PH,IN',
            'address' => ['required', 'string', 'max:500', new NoSqlInjection()],
            'city' => ['required', 'string', 'max:100', new NoSqlInjection()],
            'postal_code' => ['nullable', 'string', 'max:10', 'regex:/^[a-zA-Z0-9\s\-]+$/'],
            'notes' => ['nullable', 'string', 'max:1000', new NoSqlInjection()],
        ]);
        
        // Store in session (encrypted)
        session(['billing_info' => $validated]);
        
        // Update user profile
        auth()->user()->update([
            'phone' => $validated['phone'],
            'organization' => $validated['organization'],
            'country' => $validated['country'],
        ]);
        
        return redirect()->route('checkout.review');
    }

    /**
     * Show order review
     */
    public function review(): Response|RedirectResponse
    {
        $cartItems = $this->cartService->getCartItems();
        $billingInfo = session('billing_info');
        
        if (!$billingInfo) {
            return redirect()->route('checkout.billing');
        }
        
        return Inertia::render('Checkout/Review', [
            'items' => $cartItems,
            'billing' => $billingInfo,
            'total' => $this->cartService->getCartTotal(),
        ]);
    }

    /**
     * Create order from cart
     */
    public function store(Request $request): RedirectResponse
    {
        // 🔒 CSRF protected automatically by Laravel
        // 🔒 Rate limited to prevent spam orders
        
        $validated = $request->validate([
            'terms_accepted' => 'required|accepted',
            'idempotency_key' => 'nullable|string|max:64',
        ]);
        
        // 🔒 Generate or use provided idempotency key
        $idempotencyKey = $validated['idempotency_key'] ?? hash('sha256', auth()->id() . session()->getId() . microtime(true));
        
        // 🔒 Check if order with this idempotency key already exists
        $existingOrder = Order::where('idempotency_key', $idempotencyKey)
            ->where('user_id', auth()->id())
            ->first();
        
        if ($existingOrder) {
            // Order already created, redirect to payment page
            return redirect()->route('payment.index', $existingOrder->order_number)
                ->with('info', 'Order has already been created.');
        }
        
        // 🔒 Verify cart not empty (prevent race condition)
        if ($this->cartService->getCartCount() === 0) {
            return back()->with('error', 'Cart is empty');
        }
        
        // 🔒 Verify billing info exists
        if (!session('billing_info')) {
            return redirect()->route('checkout.billing')
                ->with('error', 'Billing information required');
        }
        
        DB::beginTransaction();
        try {
            // Create order with idempotency key
            $order = $this->orderService->createFromCart(
                auth()->user(),
                session('billing_info'),
                $idempotencyKey
            );
            
            // Clear cart
            $this->cartService->clearCart();
            
            // Clear billing session
            session()->forget('billing_info');
            
            DB::commit();
            
            // Redirect to payment page using order_number
            return redirect()->route('payment.index', $order->order_number);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed: ' . $e->getMessage());
            return back()->with('error', 'Failed to create order. Please try again.');
        }
    }
}
