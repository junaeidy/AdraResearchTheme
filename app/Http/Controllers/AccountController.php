<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Get statistics
        $stats = [
            'active_orders' => $user->orders()
                ->whereIn('status', ['pending', 'processing', 'completed'])
                ->count(),
            
            'active_licenses' => $user->licenses()
                ->where('status', 'active')
                ->count(),
            
            'total_downloads' => $user->downloads()->count(),
            
            'total_spent' => $user->orders()
                ->where('status', 'completed')
                ->sum('total_amount'),
        ];
        
        // Get recent orders
        $recentOrders = $user->orders()
            ->with('items.product')
            ->latest()
            ->take(5)
            ->get();
        
        // Get active licenses with products
        $activeLicenses = $user->licenses()
            ->with('product')
            ->where('status', 'active')
            ->latest()
            ->take(5)
            ->get();
        
        return Inertia::render('Account/Index', [
            'stats' => $stats,
            'recentOrders' => $recentOrders,
            'activeLicenses' => $activeLicenses,
        ]);
    }
}
