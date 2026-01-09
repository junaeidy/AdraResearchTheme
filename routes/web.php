<?php

use App\Http\Controllers\Admin\BankAccountController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PaymentVerificationController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShopController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{slug}', [ShopController::class, 'show'])->name('shop.show');

// Cart routes with rate limiting
Route::prefix('cart')->name('cart.')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('index');
    Route::get('/count', [CartController::class, 'count'])->name('count');
    
    // Limit add-to-cart to prevent abuse
    Route::post('/add', [CartController::class, 'add'])
        ->middleware('throttle:20,1') // 20 requests per minute
        ->name('add');
    
    Route::patch('/{item}', [CartController::class, 'update'])
        ->middleware('throttle:30,1')
        ->name('update');
    
    Route::delete('/{item}', [CartController::class, 'remove'])->name('remove');
    Route::delete('/', [CartController::class, 'clear'])->name('clear');
});

// Merge cart on login (authenticated users only)
Route::post('/cart/merge', [CartController::class, 'merge'])
    ->middleware(['auth', 'throttle:10,1'])
    ->name('cart.merge');

// Auth routes
require __DIR__.'/auth.php';

// Authenticated user routes
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('home');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // 🔒 Checkout routes with rate limiting
    Route::prefix('checkout')->name('checkout.')->middleware('cart.not.empty')->group(function () {
        Route::get('/', [CheckoutController::class, 'index'])->name('index');
        Route::get('/billing', [CheckoutController::class, 'billing'])->name('billing');
        
        // Rate limit billing submission
        Route::post('/billing', [CheckoutController::class, 'storeBilling'])
            ->middleware('throttle:10,1') // 10 per minute
            ->name('billing.store');
        
        Route::get('/review', [CheckoutController::class, 'review'])
            ->middleware('billing.info')
            ->name('review');
        
        // Strict rate limit on order creation (prevent spam)
        Route::post('/order', [CheckoutController::class, 'store'])
            ->middleware(['throttle:5,1', 'billing.info']) // 5 orders per minute max
            ->name('order.store');
    });

    // 💳 Payment routes
    Route::prefix('payment')->name('payment.')->group(function () {
        Route::get('/{order:order_number}', [PaymentController::class, 'index'])->name('index');
        Route::post('/{order:order_number}', [PaymentController::class, 'submit'])
            ->middleware('throttle:10,1')
            ->name('submit');
        Route::get('/{order:order_number}/pending', [PaymentController::class, 'pending'])->name('pending');
    });

    // 📦 Order tracking
    Route::prefix('orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/{order:order_number}', [OrderController::class, 'show'])->name('show');
        Route::get('/{order:order_number}/payment-proof', [OrderController::class, 'paymentProofImage'])->name('payment-proof');
    });
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Product management
    Route::resource('products', ProductController::class);
    
    // Category management
    Route::resource('categories', CategoryController::class);

    // 🏦 Bank accounts management
    Route::resource('bank-accounts', BankAccountController::class)->except(['show']);
    Route::post('bank-accounts/{bankAccount}/toggle', [BankAccountController::class, 'toggleActive'])
        ->name('bank-accounts.toggle');
    Route::post('bank-accounts/{bankAccount}/update-with-file', [BankAccountController::class, 'update'])
        ->name('bank-accounts.update-with-file');

    // ✅ Payment verification
    Route::prefix('payment-verification')->name('payment-verification.')->group(function () {
        Route::get('/', [PaymentVerificationController::class, 'index'])->name('index');
        Route::get('/{order:order_number}', [PaymentVerificationController::class, 'show'])->name('show');
        Route::get('/{order:order_number}/image', [PaymentVerificationController::class, 'image'])->name('image');
        Route::post('/{order:order_number}/verify', [PaymentVerificationController::class, 'verify'])->name('verify');
        Route::post('/{order:order_number}/reject', [PaymentVerificationController::class, 'reject'])->name('reject');
    });
});
