<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_products' => Product::count(),
            'active_products' => Product::where('is_active', true)->count(),
            'total_orders' => Order::count(),
            'pending_orders' => Order::where(function($query) {
                $query->whereIn('payment_status', ['unpaid', 'pending_verification', 'rejected'])
                      ->orWhere('status', 'pending');
            })->count(),
            'total_customers' => User::where('role', 'customer')->count(),
            'total_revenue' => Order::where('status', 'completed')->sum('total_amount'),
        ];

        // Get recent orders that need attention (same query as payment verification)
        $recentOrders = Order::with('user')
            ->where(function($query) {
                $query->whereIn('payment_status', ['unpaid', 'pending_verification', 'rejected'])
                      ->orWhere('status', 'pending');
            })
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
        ]);
    }
}
