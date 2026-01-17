<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class DiscountCode extends Model
{
    protected $fillable = [
        'code',
        'description',
        'discount_type',
        'discount_value',
        'usage_limit',
        'used_count',
        'valid_from',
        'valid_until',
        'is_active',
        'minimum_purchase',
        'maximum_discount',
    ];

    protected $casts = [
        'discount_value' => 'decimal:2',
        'minimum_purchase' => 'decimal:0',
        'maximum_discount' => 'decimal:0',
        'valid_from' => 'datetime',
        'valid_until' => 'datetime',
        'is_active' => 'boolean',
    ];

    /**
     * Get discount usages
     */
    public function usages(): HasMany
    {
        return $this->hasMany(DiscountUsage::class);
    }

    /**
     * Check if code is valid
     */
    public function isValid(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        // Check if usage limit reached
        if ($this->used_count >= $this->usage_limit) {
            return false;
        }

        // Check valid date range
        $now = Carbon::now();
        
        if ($this->valid_from && $now->lt($this->valid_from)) {
            return false;
        }

        if ($this->valid_until && $now->gt($this->valid_until)) {
            return false;
        }

        return true;
    }

    /**
     * Check if user already used this code
     */
    public function isUsedByUser(int $userId): bool
    {
        return $this->usages()->where('user_id', $userId)->exists();
    }

    /**
     * Calculate discount amount
     */
    public function calculateDiscount(int $subtotal): int
    {
        if ($this->discount_type === 'percentage') {
            $discount = (int) ($subtotal * ($this->discount_value / 100));
            
            // Apply maximum discount if set
            if ($this->maximum_discount && $discount > $this->maximum_discount) {
                $discount = (int) $this->maximum_discount;
            }
            
            return $discount;
        }

        // Fixed amount
        return min((int) $this->discount_value, $subtotal);
    }

    /**
     * Increment usage count
     */
    public function incrementUsage(): void
    {
        $this->increment('used_count');
    }
}
