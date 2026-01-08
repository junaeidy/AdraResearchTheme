<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NoSqlInjection implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            return;
        }
        
        $patterns = [
            '/(\bSELECT\b|\bINSERT\b|\bUPDATE\b|\bDELETE\b|\bDROP\b)/i',
            '/(\bUNION\b|\bJOIN\b)/i',
            '/(<script|<iframe|javascript:)/i',
        ];
        
        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $fail("The {$attribute} contains invalid characters.", null);
                return;
            }
        }
    }
}
