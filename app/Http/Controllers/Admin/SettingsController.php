<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\WebsiteSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Show settings page
     */
    public function index()
    {
        $settings = [
            'maintenance_mode' => WebsiteSetting::getSetting('maintenance_mode', 'false') === 'true',
            'maintenance_message' => WebsiteSetting::getSetting('maintenance_message', ''),
            'discount_percentage' => (float) WebsiteSetting::getSetting('discount_percentage', '0'),
            'tax_percentage' => (float) WebsiteSetting::getSetting('tax_percentage', '0'),
        ];

        return Inertia::render('Admin/Settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update settings
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'maintenance_mode' => 'required|boolean',
            'maintenance_message' => 'required|string|max:500',
            'discount_percentage' => 'required|numeric|min:0|max:100',
            'tax_percentage' => 'required|numeric|min:0|max:100',
        ]);

        WebsiteSetting::updateSetting('maintenance_mode', $validated['maintenance_mode'] ? 'true' : 'false');
        WebsiteSetting::updateSetting('maintenance_message', $validated['maintenance_message']);
        WebsiteSetting::updateSetting('discount_percentage', (string) $validated['discount_percentage']);
        WebsiteSetting::updateSetting('tax_percentage', (string) $validated['tax_percentage']);

        return back()->with('success', 'Settings updated successfully.');
    }
}
