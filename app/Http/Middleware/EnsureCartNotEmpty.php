<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Services\CartService;
use Symfony\Component\HttpFoundation\Response;

class EnsureCartNotEmpty
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $cartService = app(CartService::class);
        
        if ($cartService->getCartCount() === 0) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty');
        }
        
        return $next($request);
    }
}
