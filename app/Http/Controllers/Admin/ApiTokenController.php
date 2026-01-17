<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiTokenController extends Controller
{
    /**
     * Show API tokens management page
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $tokens = [
            'has_token' => !empty($user->api_token),
            'token' => $user->api_token ? substr($user->api_token, 0, 10) . '...' . substr($user->api_token, -10) : null,
            'full_token' => $user->api_token, // Only show once when generated
            'email' => $user->email,
            'note' => $user->api_token ? 'Token untuk API endpoint: /api/admin/maintenance/toggle dan /api/admin/maintenance/status' : null,
        ];

        return Inertia::render('Admin/ApiTokens', [
            'tokens' => $tokens,
        ]);
    }

    /**
     * Generate new API token
     */
    public function generate(Request $request)
    {
        $user = $request->user();
        $newToken = $user->generateApiToken();

        return back()->with('success', 'API Token generated successfully.')
            ->with('newToken', $newToken);
    }

    /**
     * Revoke API token
     */
    public function revoke(Request $request)
    {
        $request->user()->revokeApiToken();

        return back()->with('success', 'API Token revoked successfully.');
    }
}
