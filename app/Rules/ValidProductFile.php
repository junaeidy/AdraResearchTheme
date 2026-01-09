<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

class ValidProductFile implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!$value instanceof UploadedFile) {
            $fail('validation.file')->translate();
            return;
        }

        // Check file size (max 100MB)
        $maxSize = 100 * 1024 * 1024; // 100MB in bytes
        if ($value->getSize() > $maxSize) {
            $fail('The :attribute must not be larger than 100MB.');
            return;
        }

        // Get original filename
        $filename = $value->getClientOriginalName();
        
        // Valid extensions
        $validExtensions = ['.zip', '.tar.gz'];
        
        // Check if filename ends with valid extension
        $isValid = false;
        foreach ($validExtensions as $ext) {
            if (str_ends_with(strtolower($filename), $ext)) {
                $isValid = true;
                break;
            }
        }
        
        if (!$isValid) {
            $fail('The :attribute must be a .zip or .tar.gz file.');
            return;
        }

        // Check MIME type
        $mime = $value->getMimeType();
        $validMimes = [
            'application/zip',
            'application/x-zip',
            'application/x-zip-compressed',
            'application/gzip',
            'application/x-gzip',
            'application/x-tar',
            'application/x-compressed-tar',
        ];
        
        if (!in_array($mime, $validMimes)) {
            $fail('The :attribute must be a valid compressed archive file.');
            return;
        }

        // Additional security: check for double extensions (e.g., file.php.zip)
        $nameParts = explode('.', $filename);
        if (count($nameParts) > 3) { // Allow name.tar.gz but not name.php.tar.gz
            $fail('The :attribute filename contains suspicious patterns.');
            return;
        }

        // Check for dangerous extensions before the valid one
        $dangerousExtensions = ['php', 'phtml', 'php3', 'php4', 'php5', 'pht', 'exe', 'sh', 'bat', 'cmd'];
        foreach ($nameParts as $part) {
            if (in_array(strtolower($part), $dangerousExtensions)) {
                $fail('The :attribute filename contains prohibited extensions.');
                return;
            }
        }
    }
}
