<?php

namespace Database\Seeders;

use App\Models\DiscountCode;
use Illuminate\Database\Seeder;

class DiscountCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh kode diskon persentase dengan batas maksimal
        DiscountCode::create([
            'code' => 'WELCOME2026',
            'description' => 'Diskon sambutan untuk pelanggan baru',
            'discount_type' => 'percentage',
            'discount_value' => 15,
            'usage_limit' => 100,
            'used_count' => 0,
            'valid_from' => now(),
            'valid_until' => now()->addMonths(3),
            'is_active' => true,
            'minimum_purchase' => 100000,
            'maximum_discount' => 500000,
        ]);

        // Contoh kode diskon nominal tetap
        DiscountCode::create([
            'code' => 'SAVE50K',
            'description' => 'Potongan langsung Rp 50.000',
            'discount_type' => 'fixed',
            'discount_value' => 50000,
            'usage_limit' => 50,
            'used_count' => 0,
            'valid_from' => now(),
            'valid_until' => now()->addMonth(),
            'is_active' => true,
            'minimum_purchase' => 200000,
            'maximum_discount' => null,
        ]);

        // Contoh kode diskon terbatas
        DiscountCode::create([
            'code' => 'FLASHSALE',
            'description' => 'Flash sale - hanya 10 orang pertama!',
            'discount_type' => 'percentage',
            'discount_value' => 30,
            'usage_limit' => 10,
            'used_count' => 0,
            'valid_from' => now(),
            'valid_until' => now()->addDays(7),
            'is_active' => true,
            'minimum_purchase' => 150000,
            'maximum_discount' => 1000000,
        ]);

        // Contoh kode diskon tidak aktif (untuk testing)
        DiscountCode::create([
            'code' => 'EXPIRED',
            'description' => 'Kode diskon yang sudah kadaluarsa',
            'discount_type' => 'percentage',
            'discount_value' => 20,
            'usage_limit' => 100,
            'used_count' => 0,
            'valid_from' => now()->subDays(30),
            'valid_until' => now()->subDays(1),
            'is_active' => false,
            'minimum_purchase' => null,
            'maximum_discount' => null,
        ]);
    }
}
