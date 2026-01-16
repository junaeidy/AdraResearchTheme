<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validates email addresses with strict security checks
 * Prevents homograph attacks, null bytes, encoding bypasses
 */
class SecureEmail implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            return;
        }
        
        // 1. Check null bytes
        if (strpos($value, "\x00") !== false) {
            $fail("The field contains invalid characters.", null);
            return;
        }
        
        // 2. Basic email format
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $fail("The field is not a valid email address.", null);
            return;
        }
        
        // 3. Check for encoded characters (homograph attack prevention)
        if (preg_match('/[%@\x80-\xff]/u', $value)) {
            $fail("The field contains suspicious characters.", null);
            return;
        }
        
        // 4. Check for multiple @ symbols
        if (substr_count($value, '@') !== 1) {
            $fail("The field is not a valid email address.", null);
            return;
        }
        
        // 5. Check local and domain parts
        [$local, $domain] = explode('@', $value);
        
        // Local part validation
        if (strlen($local) > 64) {
            $fail("The local part of the field is too long.", null);
            return;
        }
        
        // Domain validation
        if (!preg_match('/^([a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/', $domain)) {
            $fail("The domain of the field is not valid.", null);
            return;
        }
        
        // 6. Check for reserved domains (if needed)
        $reservedDomains = ['localhost', 'test.local'];
        if (in_array(strtolower($domain), $reservedDomains)) {
            $fail("The domain of the field is reserved.", null);
            return;
        }
        
        // 7. Check domain length
        if (strlen($domain) > 255) {
            $fail("The domain of the field is too long.", null);
            return;
        }
    }
}
