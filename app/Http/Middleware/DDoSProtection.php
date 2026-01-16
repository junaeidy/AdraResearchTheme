<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

/**
 * DDoS Protection Middleware
 * 
 * Implements:
 * - Request body size limits
 * - Payload validation
 * - Suspicious pattern detection
 * - Connection rate monitoring
 */
class DDoSProtection
{
    // Maximum request body size: 10MB
    private const MAX_BODY_SIZE = 10 * 1024 * 1024;
    
    // Maximum requests per second per IP
    private const MAX_REQUESTS_PER_SECOND = 10;
    
    // Suspicious patterns that indicate attack
    private const SUSPICIOUS_PATTERNS = [
        // Large repeated requests
        '/(.+)\1{4,}/',
        
        // SQL injection attempts (additional layer)
        '/(union|select|insert|update|delete|drop|create|alter|exec|execute|script|javascript)/i',
        
        // Path traversal attempts
        '/(\.\.[\/\\])+/',
        
        // Shell metacharacters
        '/[`;|&<>(){}[\]$\\n\\r]/i',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        // Check 1: Request body size
        if (!$this->validateBodySize($request)) {
            return response('Payload too large', 413);
        }

        // Check 2: Request rate limiting per IP
        if (!$this->checkRequestRate($request)) {
            return response('Too many requests', 429);
        }

        // Check 3: Suspicious patterns
        if ($this->detectSuspiciousPatterns($request)) {
            // Log suspicious activity
            \Log::warning('Suspicious request pattern detected', [
                'ip' => $request->ip(),
                'path' => $request->path(),
                'method' => $request->method(),
            ]);
            
            return response('Forbidden', 403);
        }

        // Check 4: Validate request headers
        if (!$this->validateHeaders($request)) {
            return response('Invalid headers', 400);
        }

        return $next($request);
    }

    /**
     * Validate request body size
     */
    private function validateBodySize(Request $request): bool
    {
        $contentLength = $request->server('CONTENT_LENGTH');
        
        if ($contentLength && $contentLength > self::MAX_BODY_SIZE) {
            \Log::warning('Request body exceeds limit', [
                'ip' => $request->ip(),
                'size' => $contentLength,
                'limit' => self::MAX_BODY_SIZE,
            ]);
            return false;
        }
        
        return true;
    }

    /**
     * Check request rate per IP (sliding window)
     */
    private function checkRequestRate(Request $request): bool
    {
        $ip = $request->ip();
        $key = "ddos:rate:{$ip}";
        
        $count = cache()->get($key, 0);
        
        if ($count >= self::MAX_REQUESTS_PER_SECOND) {
            \Log::warning('Request rate limit exceeded', [
                'ip' => $ip,
                'count' => $count,
            ]);
            return false;
        }

        // Increment counter with 1 second expiry
        cache()->put($key, $count + 1, 1);
        
        return true;
    }

    /**
     * Detect suspicious patterns in request
     */
    private function detectSuspiciousPatterns(Request $request): bool
    {
        // Check URL path
        if ($this->matchesSuspiciousPattern($request->path())) {
            return true;
        }

        // Check all input values
        foreach ($request->all() as $value) {
            if (is_string($value) && $this->matchesSuspiciousPattern($value)) {
                return true;
            }
        }

        // Check user agent untuk suspicious signatures
        $userAgent = $request->userAgent() ?? '';
        $suspiciousAgents = [
            'sqlmap',
            'nikto',
            'nmap',
            'masscan',
            'nessus',
            'burpsuite',
            'zap',
        ];

        foreach ($suspiciousAgents as $agent) {
            if (stripos($userAgent, $agent) !== false) {
                return true;
            }
        }

        return false;
    }

    /**
     * Check string against suspicious patterns
     */
    private function matchesSuspiciousPattern(string $value): bool
    {
        foreach (self::SUSPICIOUS_PATTERNS as $pattern) {
            if (preg_match($pattern, $value)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Validate request headers untuk DDoS indicators
     */
    private function validateHeaders(Request $request): bool
    {
        // Check for missing or suspicious headers
        $requiredHeaders = [
            'User-Agent',
            'Accept',
        ];

        $headers = $request->headers->all();

        // Very few headers atau excessive headers might indicate attack
        if (count($headers) < 3) {
            return false;
        }

        if (count($headers) > 50) {
            return false;
        }

        // Check for header injection attempts
        foreach ($headers as $name => $values) {
            foreach ((array) $values as $value) {
                if (preg_match('/[\r\n]/m', $value)) {
                    return false;
                }
            }
        }

        return true;
    }
}
