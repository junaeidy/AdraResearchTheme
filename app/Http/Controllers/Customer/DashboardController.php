<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        /** @var User $user */
        $user = Auth::user();

        $stats = [
            'active_licenses' => $user->licenses()->where('status', 'active')->count(),
            'expiring_soon' => $user->licenses()
                ->where('status', 'active')
                ->where('expires_at', '<=', now()->addDays(30))
                ->whereNotNull('expires_at')
                ->count(),
            'total_orders' => $user->orders()->count(),
            'pending_orders' => $user->orders()
                ->whereIn('status', ['pending', 'awaiting_verification'])
                ->count(),
            'recent_licenses' => $user->licenses()
                ->with('product')
                ->latest()
                ->take(5)
                ->get(),
            'recent_orders' => $user->orders()
                ->with(['items.product', 'paymentProof'])
                ->latest()
                ->take(5)
                ->get(),
        ];

        return Inertia::render('Account/Dashboard', $stats);
    }
}
