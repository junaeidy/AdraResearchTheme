<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validates that a string is safe from injection attacks using a whitelist approach
 * Allows: alphanumeric, spaces, common punctuation, unicode letters
 * Blocks: SQL keywords, scripting tags, command chars, control chars
 */
class SafeString implements ValidationRule
{
    protected bool $allowHtml;
    protected bool $allowSpecialChars;
    
    public function __construct(bool $allowHtml = false, bool $allowSpecialChars = false)
    {
        $this->allowHtml = $allowHtml;
        $this->allowSpecialChars = $allowSpecialChars;
    }
    
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            return;
        }
        
        // 1. Check for null bytes and control characters
        if (preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', $value)) {
            $fail("The field contains invalid control characters.", null);
            return;
        }
        
        // 2. SQL injection patterns (case-insensitive with encoding bypass prevention)
        // Only detect actual SQL injection patterns, not common English words
        $sqlPatterns = [
            // Dangerous SQL keywords (excluding common words like AND, OR, JOIN, FROM)
            '/\b(SELECT\s+|INSERT\s+INTO|UPDATE\s+SET|DELETE\s+FROM|DROP\s+(TABLE|DATABASE)|CREATE\s+(TABLE|DATABASE)|ALTER\s+TABLE|EXEC\s*\(|EXECUTE\s*\(|UNION\s+SELECT)\b/iu',
            // SQL operators and syntax (not including | or & which might be in text)
            '/(--;|;(?=\s*(SELECT|INSERT|UPDATE|DELETE))|\\/\\*|\\*\\/)/i',
            // Common encoding bypasses
            '/(%20%27|%27%20|%22%27|&#x[0-9a-f]+;|&#[0-9]+;)/i',
        ];
        
        foreach ($sqlPatterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $fail("The field contains invalid SQL patterns.", null);
                return;
            }
        }
        
        // 3. XSS/Script injection patterns
        $xssPatterns = [
            // Script tags and event handlers
            '/<(script|iframe|object|embed|link|style|meta|form|frame|frameset|body|head|html|input|img|source)\b/iu',
            '/(javascript:|onerror=|onload=|onclick=|onmouseover=|onkeydown=|onfocus=)/iu',
            // Data URIs
            '/data:(text\/html|application\/javascript|image\/svg\+xml)/i',
            // Protocol handlers
            '/(vbscript|data|file|javascript):/i',
        ];
        
        if (!$this->allowHtml) {
            foreach ($xssPatterns as $pattern) {
                if (preg_match($pattern, $value)) {
                    $fail("The field contains invalid HTML or script patterns.", null);
                    return;
                }
            }
        }
        
        // 4. Command injection patterns
        $cmdPatterns = [
            // Shell metacharacters
            '/([\$`][\(\{]|\||&&|;|<|>|\\\\n)/i',
            // Command substitution
            '/\$\(.*\)/u',
            // Backtick execution
            '/`.*`/u',
        ];
        
        foreach ($cmdPatterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $fail("The field contains invalid command characters.", null);
                return;
            }
        }
        
        // 5. Path traversal patterns
        $pathPatterns = [
            '/\.\.[\\/]/i',  // ../ or ..\
            '/^[\\/]/i',     // Leading slash
        ];
        
        foreach ($pathPatterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $fail("The field contains invalid path patterns.", null);
                return;
            }
        }
        
        // 6. LDAP injection - only detect actual LDAP injection patterns
        // Allow normal parentheses in text like "BANK (BSI)"
        if (preg_match('/\(\s*[\*\|&!]\s*\(|\)\s*[\*\|&!]\s*\)/i', $value)) {
            $fail("The field contains invalid LDAP characters.", null);
            return;
        }
        
        // 7. XML injection - only detect actual XML/PHP injection patterns
        if (preg_match('/<\?php|<\?xml|<!DOCTYPE|<!ENTITY/i', $value)) {
            $fail("The field contains invalid XML patterns.", null);
            return;
        }
    }
}
