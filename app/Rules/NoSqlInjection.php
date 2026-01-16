<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Improved SQL Injection prevention using comprehensive pattern detection
 * with encoding bypass prevention and multiple injection technique coverage
 */
class NoSqlInjection implements ValidationRule
{
    protected bool $strict;
    
    public function __construct(bool $strict = true)
    {
        $this->strict = $strict;
    }
    
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            return;
        }
        
        // Check for null bytes (encoding bypass attempt)
        if (strpos($value, "\x00") !== false) {
            $fail("The attribute contains invalid null bytes.", null);
            return;
        }
        
        // 1. SQL KEYWORD DETECTION (only dangerous patterns, not common English words)
        // These are actual dangerous SQL patterns - common English words like "features", "group", "order" are excluded
        $dangerousSqlPatterns = [
            // Injection patterns
            '/\bSELECT\s+/iu',           // SELECT statement
            '/\bINSERT\s+INTO/iu',       // INSERT statement
            '/\bUPDATE\s+/iu',           // UPDATE statement
            '/\bDELETE\s+FROM/iu',       // DELETE statement
            '/\bUNION\s+SELECT/iu',      // UNION SELECT injection
            '/\bUNION\s+ALL\s+SELECT/iu',// UNION ALL SELECT
            '/\bDROP\s+(TABLE|DATABASE)/iu', // DROP statement
            '/\bCREATE\s+(TABLE|DATABASE)/iu', // CREATE statement
            '/\bALTER\s+TABLE/iu',       // ALTER statement
            '/\bTRUNCATE\s+/iu',         // TRUNCATE statement
            '/\bEXEC\s*\(/iu',           // EXEC function
            '/\bEXECUTE\s*\(/iu',        // EXECUTE function
            '/\bDECLARE\s+/iu',          // DECLARE statement
            '/\bCALL\s+/iu',             // CALL statement
        ];
        
        // Check each dangerous pattern
        foreach ($dangerousSqlPatterns as $pattern) {
            if (preg_match($pattern, $value)) {
                $fail("The attribute contains SQL injection patterns.", null);
                return;
            }
        }
        
        // 2. SQL OPERATORS AND COMMENT SYNTAX
        if (preg_match('/(--|#|\/\*|\*\/|\/\/)/i', $value)) {
            $fail("The attribute contains SQL comment syntax.", null);
            return;
        }
        
        // 3. ENCODING BYPASS - detect common encoding patterns
        if (preg_match('/%[0-9a-f]{2}/iu', $value)) {
            $decoded = urldecode($value);
            // Recheck decoded version for SQL keywords
            foreach ($sqlKeywords as $keyword) {
                if (preg_match('/\b' . preg_quote($keyword, '/') . '\b/iu', $decoded)) {
                    $fail("The attribute contains encoded SQL patterns.", null);
                    return;
                }
            }
        }
        
        // 4. UNICODE ENCODING BYPASS (&#x, &#)
        if (preg_match('/&#x[0-9a-f]+|&#[0-9]+/iu', $value)) {
            $fail("The attribute contains encoded characters.", null);
            return;
        }
        
        // 5. SCRIPT/XSS TAGS
        if (preg_match('/<(script|iframe|object|embed|frame|applet|meta|link|style)\b/iu', $value)) {
            $fail("The attribute contains HTML/script tags.", null);
            return;
        }
        
        // 6. EVENT HANDLERS
        if (preg_match('/(javascript:|onerror|onload|onclick|onmouseover|onkeydown|onfocus|onchange|onsubmit)=/iu', $value)) {
            $fail("The attribute contains event handlers.", null);
            return;
        }
        
        // 7. UNION-SELECT PATTERN (UNION-based SQLi)
        if (preg_match('/\bunion\s+select/iu', $value)) {
            $fail("The attribute contains UNION SELECT pattern.", null);
            return;
        }
        
        // 8. COMMAND SUBSTITUTION (shell injection)
        if (preg_match('/[`$]\(|[`$]\{|exec\s*\(|system\s*\(|passthru\s*\(|shell_exec\s*\(/iu', $value)) {
            $fail("The attribute contains command execution patterns.", null);
            return;
        }
        
        // 9. DATA URIs (XSS vector)
        if (preg_match('/data:(text\/html|application\/javascript|image\/svg\+xml)/iu', $value)) {
            $fail("The attribute contains unsafe data URIs.", null);
            return;
        }
        
        // 10. LDAP INJECTION (in strict mode) - only detect actual LDAP injection patterns
        // Allow normal parentheses in text like "BANK (BSI)"
        if ($this->strict && preg_match('/\(\s*[\*\|&!]\s*\(|\)\s*[\*\|&!]\s*\)|\\\\[*()]/', $value)) {
            $fail("The field contains invalid SQL patterns.");
            return;
        }
        
        // 11. XML INJECTION
        if (preg_match('/<\?php|<\?xml|<!DOCTYPE|<!ENTITY/iu', $value)) {
            $fail("The attribute contains XML/PHP injection patterns.", null);
            return;
        }
        
        // 12. STACKED QUERIES
        if (preg_match('/;\s*(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE)/iu', $value)) {
            $fail("The attribute contains multiple SQL statements.", null);
            return;
        }
        
        // 13. BLIND SQL INJECTION PATTERNS (more specific - only detect actual injection patterns)
        if (preg_match('/(AND\s+\d+\s*=\s*\d+|OR\s+\d+\s*=\s*\d+|\'\s*OR\s+\'\d+\'|1\'\s*=\s*\'1)/iu', $value)) {
            $fail("The attribute contains SQL injection patterns.", null);
            return;
        }
    }
}
