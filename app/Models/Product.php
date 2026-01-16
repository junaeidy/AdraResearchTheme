<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'product_type',
        'category_id',
        'license_scope',
        'description',
        'short_description',
        'features',
        'version',
        'compatibility',
        'price',
        'sale_price',
        'is_active',
        'is_featured',
        'image',
        'file_path',
        'original_filename',
        'demo_url',
        'screenshots',
        'documentation_url',
        'changelog',
        'rating_average',
        'rating_count',
    ];

    protected $casts = [
        'features' => 'array',
        'screenshots' => 'array',
        'changelog' => 'array',
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'price' => 'decimal:0',
        'sale_price' => 'decimal:0',
        'rating_average' => 'decimal:1',
        'rating_count' => 'integer',
    ];

    protected $appends = [
        'effective_price',
        'image_url',
        'screenshot_urls',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });

        static::updating(function ($product) {
            if ($product->isDirty('name') && empty($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    /**
     * Relationships
     */
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'category_id');
    }

    public function licenses()
    {
        return $this->hasMany(License::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function downloads()
    {
        return $this->hasMany(Download::class);
    }

    /**
     * Accessors
     */
    public function getEffectivePriceAttribute()
    {
        return $this->sale_price ?? $this->price;
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        return '/storage/' . $this->image;
    }

    public function getScreenshotUrlsAttribute()
    {
        $urls = [];
        
        // Add main image as first screenshot
        if ($this->image) {
            $urls[] = '/storage/' . $this->image;
        }
        
        // Add additional screenshots
        if ($this->screenshots && is_array($this->screenshots)) {
            foreach ($this->screenshots as $screenshot) {
                $urls[] = '/storage/' . $screenshot;
            }
        }
        
        return $urls;
    }

    /**
     * Get the price for a specific license type and duration.
     * 
     * @param string $licenseType The license type (single-site, single-journal, etc.)
     * @param string $licenseDuration The duration (1-year, 2-years, lifetime)
     * @return float The calculated price
     */
    public function getPriceForLicense(string $licenseType, string $licenseDuration): float
    {
        $basePrice = $this->sale_price ?? $this->price;

        // License type multipliers
        // Base price is for single license (single-site or single-journal)
        $typeMultipliers = [
            'single-site' => 1.0,
            'single-journal' => 1.0,  // Same as single-site
            'multi-site' => 3.0,      // 3x for 5 sites
            'multi-journal' => 3.0,   // 3x for 5 journals
            'unlimited' => 5.0,       // 5x for unlimited
        ];

        // Duration multipliers
        $durationMultipliers = [
            '1-year' => 1.0,
            '2-years' => 1.8,  // 10% discount
            'lifetime' => 2.5, // ~3x annual
        ];

        $typeMultiplier = $typeMultipliers[$licenseType] ?? 1.0;
        $durationMultiplier = $durationMultipliers[$licenseDuration] ?? 1.0;

        return round($basePrice * $typeMultiplier * $durationMultiplier, 0);
    }
}
