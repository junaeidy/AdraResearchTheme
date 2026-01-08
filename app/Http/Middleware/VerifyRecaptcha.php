<?php

namespace App\Http\Middleware;

use Closure;
use App\Services\RecaptchaService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VerifyRecaptcha
{
    protected $recaptcha;
    
    public function __construct(RecaptchaService $recaptcha)
    {
        $this->recaptcha = $recaptcha;
    }
    
    public function handle(Request $request, Closure $next, string $action = 'submit', float $score = 0.5)
    {
        $token = $request->input('recaptcha_token');
        
        \Log::info('VerifyRecaptcha Middleware', [
            'has_token' => !empty($token),
            'token_preview' => $token ? substr($token, 0, 20) . '...' : 'null',
            'all_inputs' => array_keys($request->all()),
            'action' => $action,
        ]);
        
        if (!$token) {
            throw ValidationException::withMessages([
                'recaptcha_token' => 'reCAPTCHA token is required.'
            ]);
        }
        
        if (!$this->recaptcha->verify($token, $action, $score)) {
            throw ValidationException::withMessages([
                'recaptcha_token' => 'reCAPTCHA verification failed. Please try again.'
            ]);
        }
        
        return $next($request);
    }
}
