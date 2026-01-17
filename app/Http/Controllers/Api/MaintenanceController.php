<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\WebsiteSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MaintenanceController extends Controller
{
    /**
     * Toggle maintenance mode via API token
     */
    public function toggle(Request $request): JsonResponse
    {
        // Get token from query parameter
        $token = $request->query('token');
        
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'API token is required',
            ], 401);
        }

        // Find user with this token
        $user = User::where('api_token', $token)->first();

        if (!$user || !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Valid admin API token required.',
            ], 403);
        }

        // Toggle maintenance mode
        $currentMode = WebsiteSetting::getSetting('maintenance_mode', 'false') === 'true';
        $newMode = !$currentMode;
        $newModeText = $newMode ? 'true' : 'false';

        WebsiteSetting::updateSetting('maintenance_mode', $newModeText);

        $status = $newMode ? 'ON' : 'OFF';
        $message = WebsiteSetting::getSetting('maintenance_message', '');

        return response()->json([
            'success' => true,
            'message' => "Maintenance mode is now {$status}",
            'data' => [
                'maintenance_mode' => $newMode,
                'maintenance_message' => $message,
                'toggled_by' => $user->email,
                'timestamp' => now()->toIso8601String(),
            ],
        ]);
    }

    /**
     * Get current maintenance status
     */
    public function status(Request $request): JsonResponse
    {
        $token = $request->query('token');
        
        if (!$token) {
            return response()->json([
                'success' => false,
                'message' => 'API token is required',
            ], 401);
        }

        $user = User::where('api_token', $token)->first();

        if (!$user || !$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 403);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'maintenance_mode' => WebsiteSetting::getSetting('maintenance_mode', 'false') === 'true',
                'maintenance_message' => WebsiteSetting::getSetting('maintenance_message', ''),
            ],
        ]);
    }
}
