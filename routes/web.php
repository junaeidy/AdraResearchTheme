<?php

use App\Http\Controllers\Admin\BankAccountController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DiscountCodeController;
use App\Http\Controllers\Admin\ApiTokenController;
use App\Http\Controllers\Admin\LicenseController as AdminLicenseController;
use App\Http\Controllers\Admin\PaymentVerificationController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ReviewController as AdminReviewController;
use App\Http\Controllers\Admin\SettingsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\Customer\LicenseController;
use App\Http\Controllers\DownloadController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\StaticPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/shop', [ShopController::class, 'index'])->name('shop.index');
Route::get('/shop/{slug}', [ShopController::class, 'show'])->name('shop.show');

// Static pages
Route::get('/about', [StaticPageController::class, 'aboutUs'])->name('about');
Route::get('/services', [StaticPageController::class, 'services'])->name('services');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::post('/contact', [StaticPageController::class, 'submitContact'])->name('contact.submit')->middleware('throttle:5,1');
Route::get('/privacy-policy', [StaticPageController::class, 'privacyPolicy'])->name('privacy-policy');
Route::get('/terms-of-service', [StaticPageController::class, 'termsOfService'])->name('terms-of-service');
Route::get('/cookie-policy', [StaticPageController::class, 'cookiePolicy'])->name('cookie-policy');
Route::get('/faq', [StaticPageController::class, 'faq'])->name('faq');

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
    // 🎟️ Discount Code Validation
    Route::post('/api/discount-codes/validate', [\App\Http\Controllers\Api\DiscountCodeController::class, 'validateCode'])
        ->middleware('throttle:20,1')
        ->name('api.discount-codes.validate');

    // Account routes with /account prefix
    Route::prefix('account')->group(function () {
        Route::get('/', [AccountController::class, 'index'])->name('account');
        
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    // 📝 Reviews
    Route::post('/products/{product:slug}/reviews', [ReviewController::class, 'store'])->name('reviews.store')->middleware('throttle:5,1');
    Route::patch('/reviews/{review}', [ReviewController::class, 'update'])->name('reviews.update');
    Route::delete('/reviews/{review}', [ReviewController::class, 'destroy'])->name('reviews.destroy');

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
    Route::prefix('account/orders')->name('orders.')->group(function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/{order:order_number}', [OrderController::class, 'show'])->name('show');
        Route::get('/{order:order_number}/payment-proof', [OrderController::class, 'paymentProofImage'])->name('payment-proof');
    });

    // 🔑 License management
    Route::prefix('account/licenses')->name('licenses.')->group(function () {
        Route::get('/', [LicenseController::class, 'index'])->name('index');
        Route::get('/{productSlug}', [LicenseController::class, 'show'])->name('show');
        Route::post('/{productSlug}/deactivate', [LicenseController::class, 'deactivate'])->name('deactivate');
    });

    // 📥 Downloads
    Route::get('/account/downloads', [DownloadController::class, 'index'])->name('downloads.index');
    Route::get('/download/{product}', [DownloadController::class, 'download'])->name('download');
});

// Admin routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Product management
    Route::resource('products', ProductController::class);
    
    // Category management
    Route::resource('categories', CategoryController::class);

    // 👥 User management
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::post('/users/{user}/toggle-role', [UserController::class, 'toggleRole'])->name('users.toggle-role');

    // 📝 Review management
    Route::get('/reviews', [AdminReviewController::class, 'index'])->name('reviews.index');
    Route::delete('/reviews/{review}', [AdminReviewController::class, 'destroy'])->name('reviews.destroy');

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

    // 🔑 License management
    Route::prefix('licenses')->name('licenses.')->group(function () {
        Route::get('/', [AdminLicenseController::class, 'index'])->name('index');
        Route::get('/{license}', [AdminLicenseController::class, 'show'])->name('show');
        Route::post('/{license}/extend', [AdminLicenseController::class, 'extend'])->name('extend');
        Route::post('/{license}/revoke', [AdminLicenseController::class, 'revoke'])->name('revoke');
        Route::post('/{license}/unsuspend', [AdminLicenseController::class, 'unsuspend'])->name('unsuspend');
        Route::post('/{license}/reset', [AdminLicenseController::class, 'resetActivations'])->name('reset');
    });

    // ⚙️ Settings management
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings.index');
    Route::post('/settings', [SettingsController::class, 'update'])->name('settings.update');

    // 🎟️ Discount Code management
    Route::resource('discount-codes', DiscountCodeController::class);
    Route::post('discount-codes/{discountCode}/toggle-status', [DiscountCodeController::class, 'toggleStatus'])
        ->name('discount-codes.toggle-status');
    Route::get('discount-codes-generate', [DiscountCodeController::class, 'generateCode'])
        ->name('discount-codes.generate');

    // 🔑 API Token management
    Route::get('/api-tokens', [ApiTokenController::class, 'index'])->name('api-tokens.index');
    Route::post('/api-tokens/generate', [ApiTokenController::class, 'generate'])->name('api-tokens.generate');
    Route::post('/api-tokens/revoke', [ApiTokenController::class, 'revoke'])->name('api-tokens.revoke');
});
