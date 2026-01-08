<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    // Allowed MIME types
    protected $allowedImageTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp',
    ];
    
    protected $allowedDocTypes = [
        'application/pdf',
    ];
    
    protected $allowedArchiveTypes = [
        'application/zip',
        'application/x-zip-compressed',
    ];
    
    public function validateImage(UploadedFile $file, int $maxSizeMB = 5): bool
    {
        // Check size
        if ($file->getSize() > $maxSizeMB * 1024 * 1024) {
            throw new \Exception("File size exceeds {$maxSizeMB}MB");
        }
        
        // Check MIME type
        if (!in_array($file->getMimeType(), $this->allowedImageTypes)) {
            throw new \Exception('Invalid file type. Only JPG, PNG, WebP allowed.');
        }
        
        // Check actual file content (not just extension)
        $imageInfo = @getimagesize($file->getPathname());
        if (!$imageInfo) {
            throw new \Exception('File is not a valid image.');
        }
        
        return true;
    }
    
    public function uploadImage(UploadedFile $file, string $directory, string $disk = 'public'): string
    {
        $this->validateImage($file);
        
        // Generate unique filename
        $filename = Str::random(40) . '.' . $file->getClientOriginalExtension();
        
        // Store with private visibility initially
        $path = $file->storeAs($directory, $filename, $disk);
        
        return $path;
    }
    
    public function validateArchive(UploadedFile $file, int $maxSizeMB = 50): bool
    {
        if ($file->getSize() > $maxSizeMB * 1024 * 1024) {
            throw new \Exception("File size exceeds {$maxSizeMB}MB");
        }
        
        if (!in_array($file->getMimeType(), $this->allowedArchiveTypes)) {
            throw new \Exception('Invalid file type. Only ZIP allowed.');
        }
        
        return true;
    }
    
    public function uploadArchive(UploadedFile $file, string $directory, string $disk = 'public'): string
    {
        $this->validateArchive($file);
        
        // Generate unique filename
        $filename = Str::random(40) . '.zip';
        
        // Store the file
        $path = $file->storeAs($directory, $filename, $disk);
        
        return $path;
    }
    
    public function deleteFile(string $path, string $disk = 'public'): bool
    {
        if (Storage::disk($disk)->exists($path)) {
            return Storage::disk($disk)->delete($path);
        }
        return false;
    }
}
