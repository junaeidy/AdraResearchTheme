<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class License extends Model
{
    use HasFactory;

    protected $fillable = [
        'license_key',
        'product_id',
        'user_id',
        'order_id',
        'type',
        'duration',
        'scope',
        'licensed_journal_path',
        'max_activations',
        'activated_count',
        'status',
        'activated_at',
        'expires_at',
    ];

    protected $casts = [
        'activated_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($license) {
            if (empty($license->license_key)) {
                $license->license_key = self::generateLicenseKey();
            }
        });
    }

    /**
     * Generate unique license key
     * Format: XXXX-XXXX-XXXXXXXX-XXXX
     */
    public static function generateLicenseKey(): string
    {
        do {
            $part1 = strtoupper(Str::random(4));
            $part2 = strtoupper(Str::random(4));
            $part3 = strtoupper(Str::random(8));
            $part4 = strtoupper(Str::random(4));
            
            $key = "{$part1}-{$part2}-{$part3}-{$part4}";
        } while (self::where('license_key', $key)->exists());

        return $key;
    }

    /**
     * Relationships
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function activations()
    {
        return $this->hasMany(LicenseActivation::class);
    }

    /**
     * Helper methods
     */
    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function isActive(): bool
    {
        return $this->status === 'active' && !$this->isExpired();
    }

    public function canActivate(): bool
    {
        return $this->isActive() && $this->activated_count < $this->max_activations;
    }
}
