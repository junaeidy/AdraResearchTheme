<?php

namespace App\Http\Requests\Auth;

use App\Services\LoginAttemptService;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    protected $loginAttemptService;
    
    public function __construct(LoginAttemptService $loginAttemptService)
    {
        parent::__construct();
        $this->loginAttemptService = $loginAttemptService;
    }
    
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
            'recaptcha_token' => ['required', 'string'],
        ];
    }

    /**
     * Attempt to authenticate the request's credentials.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function authenticate(): void
    {
        $email = $this->string('email');
        $ip = $this->ip();
        
        // Check if account is locked using LoginAttemptService
        if ($this->loginAttemptService->isLocked($email, $ip)) {
            $remainingMinutes = $this->loginAttemptService->getRemainingLockoutTime($email, $ip);
            
            throw ValidationException::withMessages([
                'email' => "Too many failed login attempts. Account is locked for {$remainingMinutes} more minutes.",
            ]);
        }
        
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());
            
            // Record failed attempt using LoginAttemptService
            $this->loginAttemptService->recordFailedAttempt($email, $ip);

            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        // Clear failed attempts on successful login
        RateLimiter::clear($this->throttleKey());
        $this->loginAttemptService->clearAttempts($email, $ip);
    }

    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited(): void
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
