<?php

namespace App\Services;

use App\Models\FailedLoginAttempt;
use Carbon\Carbon;

class LoginAttemptService
{
    protected $maxAttempts = 5;
    protected $lockoutMinutes = 15;
    
    public function recordFailedAttempt(string $email, string $ip): void
    {
        $attempt = FailedLoginAttempt::firstOrNew([
            'email' => $email,
            'ip_address' => $ip,
        ]);
        
        if ($attempt->exists && $attempt->last_attempt_at->diffInMinutes(now()) > 15) {
            // Reset if last attempt was > 15 minutes ago
            $attempt->attempts = 1;
        } else {
            $attempt->attempts = ($attempt->attempts ?? 0) + 1;
        }
        
        $attempt->last_attempt_at = now();
        
        if ($attempt->attempts >= $this->maxAttempts) {
            $attempt->locked_until = now()->addMinutes($this->lockoutMinutes);
        }
        
        $attempt->save();
    }
    
    public function isLocked(string $email, string $ip): bool
    {
        $attempt = FailedLoginAttempt::where('email', $email)
            ->where('ip_address', $ip)
            ->first();
        
        if (!$attempt) {
            return false;
        }
        
        if ($attempt->locked_until && $attempt->locked_until->isFuture()) {
            return true;
        }
        
        return false;
    }
    
    public function clearAttempts(string $email, string $ip): void
    {
        FailedLoginAttempt::where('email', $email)
            ->where('ip_address', $ip)
            ->delete();
    }
    
    public function getRemainingLockoutTime(string $email, string $ip): ?int
    {
        $attempt = FailedLoginAttempt::where('email', $email)
            ->where('ip_address', $ip)
            ->first();
        
        if ($attempt && $attempt->locked_until && $attempt->locked_until->isFuture()) {
            return $attempt->locked_until->diffInMinutes(now());
        }
        
        return null;
    }
}
