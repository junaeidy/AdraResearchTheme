<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class SecurityHeaders
{
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        
        $isDev = config('app.env') === 'local' || config('app.debug');
        
        // Prevent clickjacking
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        
        // XSS Protection
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        
        // Referrer Policy
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // Permissions Policy
        $response->headers->set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
        
        // Content Security Policy - Only in production
        if (!$isDev) {
            $csp = "default-src 'self'; ";
            $csp .= "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; ";
            $csp .= "connect-src 'self'; ";
            $csp .= "style-src 'self' 'unsafe-inline'; ";
            $csp .= "img-src 'self' data: https:; ";
            $csp .= "font-src 'self' data:; ";
            $csp .= "frame-src https://www.google.com;";
            
            $response->headers->set('Content-Security-Policy', $csp);
        }
        
        return $response;
    }
}
