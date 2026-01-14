<?php

namespace App\Services;

use App\Models\License;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class LicenseService
{
    /**
     * Generate licenses from an order.
     *
     * @param Order $order
     * @return Collection
     */
    public function generateFromOrder(Order $order): Collection
    {
        $licenses = collect();
        
        foreach ($order->items as $item) {
            $license = License::create([
                'license_key' => $this->generateLicenseKey($item->product),
                'product_id' => $item->product_id,
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'type' => $item->license_type,
                'duration' => $item->license_duration,
                'scope' => $item->product->license_scope,
                'max_activations' => $this->getMaxActivations($item->license_type),
                'status' => 'active',
                // activated_at dan expires_at akan di-set saat aktivasi pertama
                'activated_at' => null,
                'expires_at' => null,
            ]);
            
            $licenses->push($license);
        }
        
        return $licenses;
    }
    
    /**
     * Generate a unique license key for a product.
     *
     * @param Product $product
     * @return string
     */
    private function generateLicenseKey(Product $product): string
    {
        do {
            $productCode = strtoupper(substr($product->slug, 0, 4));
            $randomString = strtoupper(Str::random(8));
            $checksum = strtoupper(substr(md5($productCode . $randomString), 0, 4));
            
            $licenseKey = "PROD-{$productCode}-{$randomString}-{$checksum}";
        } while (License::where('license_key', $licenseKey)->exists());
        
        return $licenseKey;
    }
    
    /**
     * Get the maximum number of activations for a license type.
     *
     * @param string $type
     * @return int
     */
    private function getMaxActivations(string $type): int
    {
        return match($type) {
            'single-site', 'single-journal' => 1,
            'multi-site', 'multi-journal' => 5,
            'unlimited' => 9999,
            default => 1,
        };
    }
    
    /**
     * Calculate the expiry date based on license duration.
     *
     * @param string $duration
     * @return Carbon|null
     */
    public function calculateExpiryDate(string $duration): ?Carbon
    {
        return match($duration) {
            '1-year' => now()->addYear(),
            '2-years' => now()->addYears(2),
            'lifetime' => null,
            default => null,
        };
    }
}
