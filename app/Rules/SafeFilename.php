<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

/**
 * Validates filenames to prevent path traversal and injection attacks
 */
class SafeFilename implements ValidationRule
{
    protected array $blockedExtensions = [
        'php', 'phtml', 'php3', 'php4', 'php5', 'php6', 'php7', 'php8',
        'pht', 'phps', 'phar', 'phpt', 'pgif', 'shtml', 'htaccess',
        'exe', 'com', 'bat', 'cmd', 'scr', 'vbs', 'js', 'jar', 'py', 'rb',
        'sh', 'asp', 'aspx', 'csr', 'jsp', 'cfm', 'pl', 'app', 'deb',
    ];
    
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value)) {
            return;
        }
        
        // 1. Check for null bytes
        if (strpos($value, "\x00") !== false) {
            $fail("The field contains invalid characters.", null);
            return;
        }
        
        // 2. Path traversal prevention
        if (preg_match('/\.\.[\\/]|^[\\/]/i', $value)) {
            $fail("The field contains invalid path characters.", null);
            return;
        }
        
        // 3. Check for multiple dots (extension spoofing)
        $parts = explode('.', $value);
        if (count($parts) > 3) {
            $fail("The field contains too many extensions.", null);
            return;
        }
        
        // 4. Get file extension
        $extension = strtolower(pathinfo($value, PATHINFO_EXTENSION));
        
        // 5. Check against blocked extensions
        if (in_array($extension, $this->blockedExtensions)) {
            $fail("The field extension is not allowed.", null);
            return;
        }
        
        // 6. Check filename length
        if (strlen($value) > 255) {
            $fail("The field is too long.", null);
            return;
        }
        
        // 7. Check for control characters
        if (preg_match('/[\x00-\x1f\x7f]/u', $value)) {
            $fail("The field contains invalid control characters.", null);
            return;
        }
        
        // 8. Check for reserved Windows filenames
        $reservedNames = [
            'con', 'prn', 'aux', 'nul', 'com1', 'com2', 'com3', 'com4',
            'com5', 'com6', 'com7', 'com8', 'com9', 'lpt1', 'lpt2', 'lpt3',
            'lpt4', 'lpt5', 'lpt6', 'lpt7', 'lpt8', 'lpt9',
        ];
        
        $basename = strtolower(pathinfo($value, PATHINFO_FILENAME));
        if (in_array($basename, $reservedNames)) {
            $fail("The field uses a reserved system name.", null);
            return;
        }
        
        // 9. Check for special shell characters
        if (preg_match('/[`$|&;<>(){}[\]\\\\]/u', $value)) {
            $fail("The field contains invalid shell characters.", null);
            return;
        }
    }
}
