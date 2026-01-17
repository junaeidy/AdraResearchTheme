<?php

namespace App\Http\Middleware;

use App\Models\WebsiteSetting;
use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class CheckMaintenance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $maintenanceMode = WebsiteSetting::getSetting('maintenance_mode', 'false') === 'true';
        $maintenanceMessage = WebsiteSetting::getSetting('maintenance_message', 'Website sedang dalam pemeliharaan. Silakan coba lagi nanti.');
        
        // Allow admin users to access the site even in maintenance mode
        if ($maintenanceMode && !($request->user() && $request->user()->isAdmin())) {
            return Inertia::render('Errors/Maintenance', [
                'message' => $maintenanceMessage,
            ])->toResponse($request);
        }

        return $next($request);
    }
}
