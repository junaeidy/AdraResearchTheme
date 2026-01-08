<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $editorialMgmt = ProductCategory::where('slug', 'editorial-management')->first();
        $themes = ProductCategory::where('slug', 'themes-design')->first();
        $submission = ProductCategory::where('slug', 'submission-review')->first();
        $publishing = ProductCategory::where('slug', 'publishing-distribution')->first();
        $analytics = ProductCategory::where('slug', 'analytics-reporting')->first();
        $payment = ProductCategory::where('slug', 'payment-commerce')->first();

        $products = [
            [
                'name' => 'Advanced Workflow Manager',
                'slug' => 'advanced-workflow-manager',
                'product_type' => 'plugin',
                'category_id' => $editorialMgmt->id,
                'license_scope' => 'installation',
                'description' => 'A comprehensive workflow management plugin that streamlines your editorial process with advanced automation features, custom stages, and intelligent task assignment.',
                'short_description' => 'Streamline editorial workflow with automation',
                'features' => json_encode(['Custom workflow stages', 'Automated email notifications', 'Task assignment', 'Deadline tracking', 'Progress reporting']),
                'version' => '2.1.0',
                'compatibility' => 'OJS 3.3+',
                'price' => 2240000,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Modern Academic Theme',
                'slug' => 'modern-academic-theme',
                'product_type' => 'theme',
                'category_id' => $themes->id,
                'license_scope' => 'journal',
                'description' => 'A beautiful, responsive theme designed for academic journals. Features customizable colors, typography, and layout options to match your journal\'s brand.',
                'short_description' => 'Modern, responsive theme for academic journals',
                'features' => json_encode(['Responsive design', 'Customizable colors', 'Multiple layouts', 'SEO optimized', 'Accessibility compliant']),
                'version' => '1.5.2',
                'compatibility' => 'OJS 3.2+',
                'price' => 1485000,
                'sale_price' => 1185000,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Reviewer Analytics Dashboard',
                'slug' => 'reviewer-analytics-dashboard',
                'product_type' => 'plugin',
                'category_id' => $analytics->id,
                'license_scope' => 'installation',
                'description' => 'Track and analyze reviewer performance with detailed metrics, response times, and quality scores. Generate reports to identify your best reviewers.',
                'short_description' => 'Track reviewer performance and metrics',
                'features' => json_encode(['Review time tracking', 'Performance metrics', 'Quality scoring', 'Custom reports', 'Export data']),
                'version' => '1.3.0',
                'compatibility' => 'OJS 3.3+',
                'price' => 1935000,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Smart Submission Assistant',
                'slug' => 'smart-submission-assistant',
                'product_type' => 'plugin',
                'category_id' => $submission->id,
                'license_scope' => 'journal',
                'description' => 'Help authors submit better manuscripts with AI-powered formatting checks, reference validation, and plagiarism detection integration.',
                'short_description' => 'AI-powered submission assistance for authors',
                'features' => json_encode(['Format checking', 'Reference validation', 'Plagiarism detection', 'File validation', 'Author guidance']),
                'version' => '2.0.1',
                'compatibility' => 'OJS 3.3+',
                'price' => 2985000,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Minimalist Pro Theme',
                'slug' => 'minimalist-pro-theme',
                'product_type' => 'theme',
                'category_id' => $themes->id,
                'license_scope' => 'journal',
                'description' => 'Clean, minimalist theme focusing on content readability. Perfect for journals that want a simple, elegant design.',
                'short_description' => 'Clean, content-focused theme',
                'features' => json_encode(['Minimalist design', 'Fast loading', 'Mobile optimized', 'Easy customization', 'Dark mode']),
                'version' => '1.2.0',
                'compatibility' => 'OJS 3.2+',
                'price' => 1185000,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'DOI Management Suite',
                'slug' => 'doi-management-suite',
                'product_type' => 'plugin',
                'category_id' => $publishing->id,
                'license_scope' => 'installation',
                'description' => 'Complete DOI management solution with automatic registration, metadata export, and CrossRef integration.',
                'short_description' => 'Automated DOI registration and management',
                'features' => json_encode(['Auto DOI assignment', 'CrossRef integration', 'Metadata validation', 'Bulk operations', 'Status tracking']),
                'version' => '1.8.0',
                'compatibility' => 'OJS 3.3+',
                'price' => 2535000,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Flexible Payment Gateway',
                'slug' => 'flexible-payment-gateway',
                'product_type' => 'plugin',
                'category_id' => $payment->id,
                'license_scope' => 'installation',
                'description' => 'Accept payments for article processing charges with support for multiple payment gateways including Stripe, PayPal, and local payment methods.',
                'short_description' => 'Multi-gateway payment processing',
                'features' => json_encode(['Multiple gateways', 'Invoice generation', 'Payment tracking', 'Automated receipts', 'Currency conversion']),
                'version' => '1.6.0',
                'compatibility' => 'OJS 3.2+',
                'price' => 2835000,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'Journal Metrics Pro',
                'slug' => 'journal-metrics-pro',
                'product_type' => 'plugin',
                'category_id' => $analytics->id,
                'license_scope' => 'journal',
                'description' => 'Comprehensive analytics for your journal including article views, downloads, citations, and geographic distribution.',
                'short_description' => 'Complete analytics and metrics suite',
                'features' => json_encode(['Article metrics', 'Geographic data', 'Citation tracking', 'Custom dashboards', 'Export reports']),
                'version' => '2.2.0',
                'compatibility' => 'OJS 3.3+',
                'price' => 2085000,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Corporate Edition Theme',
                'slug' => 'corporate-edition-theme',
                'product_type' => 'theme',
                'category_id' => $themes->id,
                'license_scope' => 'journal',
                'description' => 'Professional theme designed for corporate and institutional journals. Features mega menu, custom widgets, and advanced customization options.',
                'short_description' => 'Professional theme for corporate journals',
                'features' => json_encode(['Mega menu', 'Custom widgets', 'Advanced styling', 'Logo placement', 'Footer customization']),
                'version' => '1.4.0',
                'compatibility' => 'OJS 3.2+',
                'price' => 1785000,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Enhanced Peer Review',
                'slug' => 'enhanced-peer-review',
                'product_type' => 'plugin',
                'category_id' => $submission->id,
                'license_scope' => 'installation',
                'description' => 'Improve your peer review process with blind review options, reviewer recommendations, and customizable review forms.',
                'short_description' => 'Advanced peer review management',
                'features' => json_encode(['Double-blind review', 'Reviewer matching', 'Custom forms', 'Review templates', 'Reminder system']),
                'version' => '1.9.0',
                'compatibility' => 'OJS 3.3+',
                'price' => 2385000,
                'is_active' => true,
                'is_featured' => true,
            ],
            [
                'name' => 'ORCID Integration Pro',
                'slug' => 'orcid-integration-pro',
                'product_type' => 'plugin',
                'category_id' => $publishing->id,
                'license_scope' => 'installation',
                'description' => 'Seamless ORCID integration for author identification and authentication. Automatically fetch author information and update publication records.',
                'short_description' => 'Complete ORCID integration solution',
                'features' => json_encode(['ORCID authentication', 'Auto-fill profiles', 'Publication sync', 'Verification badges', 'API integration']),
                'version' => '1.7.0',
                'compatibility' => 'OJS 3.2+',
                'price' => 1635000,
                'is_active' => true,
                'is_featured' => false,
            ],
            [
                'name' => 'Colorful Academic Theme',
                'slug' => 'colorful-academic-theme',
                'product_type' => 'theme',
                'category_id' => $themes->id,
                'license_scope' => 'journal',
                'description' => 'Vibrant, modern theme with bold colors and engaging design. Perfect for journals targeting younger audiences.',
                'short_description' => 'Bold, modern theme with vibrant colors',
                'features' => json_encode(['Bold design', 'Color schemes', 'Animated elements', 'Social integration', 'Mobile-first']),
                'version' => '1.1.0',
                'compatibility' => 'OJS 3.3+',
                'price' => 1335000,
                'is_active' => true,
                'is_featured' => false,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
