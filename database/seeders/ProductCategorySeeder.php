<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Editorial Management',
                'slug' => 'editorial-management',
                'description' => 'Plugins to enhance editorial workflow and manuscript management',
                'icon' => '📝',
                'sort_order' => 1,
            ],
            [
                'name' => 'Themes & Design',
                'slug' => 'themes-design',
                'description' => 'Professional themes for OJS journal websites',
                'icon' => '🎨',
                'sort_order' => 2,
            ],
            [
                'name' => 'Submission & Review',
                'slug' => 'submission-review',
                'description' => 'Tools for submission and peer review processes',
                'icon' => '📋',
                'sort_order' => 3,
            ],
            [
                'name' => 'Publishing & Distribution',
                'slug' => 'publishing-distribution',
                'description' => 'Plugins for article publishing and distribution',
                'icon' => '📚',
                'sort_order' => 4,
            ],
            [
                'name' => 'Analytics & Reporting',
                'slug' => 'analytics-reporting',
                'description' => 'Track and analyze journal performance',
                'icon' => '📊',
                'sort_order' => 5,
            ],
            [
                'name' => 'Payment & Commerce',
                'slug' => 'payment-commerce',
                'description' => 'Payment processing and e-commerce solutions',
                'icon' => '💳',
                'sort_order' => 6,
            ],
            [
                'name' => 'Integration & API',
                'slug' => 'integration-api',
                'description' => 'Third-party integrations and API extensions',
                'icon' => '🔌',
                'sort_order' => 7,
            ],
        ];

        foreach ($categories as $category) {
            ProductCategory::create($category);
        }
    }
}
