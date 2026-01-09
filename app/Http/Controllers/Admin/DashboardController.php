<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\License;
use App\Models\LicenseActivation;
use App\Models\Order;
use App\Models\PaymentProof;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->get('period', '30d'); // 7d, 30d, 3m, 1y

        $stats = [
            'total_revenue' => $this->getTotalRevenue($period),
            'total_orders' => $this->getTotalOrders($period),
            'total_licenses' => $this->getActiveLicenses(),
            'pending_payments' => $this->getPendingPayments(),
            'revenue_trend' => $this->getRevenueTrend($period),
            'popular_products' => $this->getPopularProducts(10),
            'recent_orders' => $this->getRecentOrders(10),
            'recent_activations' => $this->getRecentActivations(10),
        ];

        return Inertia::render('Admin/Dashboard', $stats);
    }

    private function getTotalRevenue($period)
    {
        return Order::where('status', 'completed')
            ->where('created_at', '>=', $this->getPeriodStart($period))
            ->sum('total_amount');
    }

    private function getTotalOrders($period)
    {
        return Order::where('created_at', '>=', $this->getPeriodStart($period))
            ->count();
    }

    private function getActiveLicenses()
    {
        return License::where('status', 'active')->count();
    }

    private function getPendingPayments()
    {
        return PaymentProof::where('status', 'pending')->count();
    }

    private function getRevenueTrend($period)
    {
        // Group by day/week/month depending on period
        return Order::where('status', 'completed')
            ->where('created_at', '>=', $this->getPeriodStart($period))
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->groupBy('date')
            ->orderBy('date')
            ->get();
    }

    private function getPopularProducts($limit)
    {
        return Product::withCount(['orderItems as orders_count'])
            ->orderByDesc('orders_count')
            ->take($limit)
            ->get();
    }

    private function getRecentOrders($limit)
    {
        return Order::with(['user', 'items.product'])
            ->latest()
            ->take($limit)
            ->get();
    }

    private function getRecentActivations($limit)
    {
        return LicenseActivation::with(['license.product', 'license.user'])
            ->latest('activated_at')
            ->take($limit)
            ->get();
    }

    private function getPeriodStart($period)
    {
        return match ($period) {
            '7d' => now()->subDays(7),
            '30d' => now()->subDays(30),
            '3m' => now()->subMonths(3),
            '1y' => now()->subYear(),
            default => now()->subDays(30),
        };
    }
}
