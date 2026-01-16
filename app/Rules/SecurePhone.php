<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validates phone numbers with strict format checks
 * Supports international format and common variations
 */
class SecurePhone implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            return;
        }
        
        // 1. Remove whitespace and common separators
        $cleaned = preg_replace('/[\s\-\(\)\.]/u', '', $value);
        
        // 2. Check for non-digit characters except leading +
        if (!preg_match('/^\+?[0-9]{6,15}$/', $cleaned)) {
            $fail("The field is not a valid phone number.", null);
            return;
        }
        
        // 3. Check for null bytes
        if (strpos($value, "\x00") !== false) {
            $fail("The field contains invalid characters.", null);
            return;
        }
        
        // 4. Check length (E.164 format: max 15 digits)
        $digits = preg_replace('/[^0-9]/', '', $cleaned);
        if (strlen($digits) > 15 || strlen($digits) < 6) {
            $fail("The field must be between 6 and 15 digits.", null);
            return;
        }
        
        // 5. Prevent common injection patterns
        if (preg_match('/[^0-9\+\-\(\)\s\.]/u', $value)) {
            $fail("The field contains invalid characters.", null);
            return;
        }
    }
}
