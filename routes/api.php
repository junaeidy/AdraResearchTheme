<?php

use App\Http\Controllers\Api\LicenseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// 🔑 License validation API (for OJS plugin)
Route::prefix('licenses')->middleware(['throttle:10,1'])->group(function () {
    Route::post('/activate', [LicenseController::class, 'activate']);
    Route::post('/validate', [LicenseController::class, 'validateLicense']);
    Route::post('/deactivate', [LicenseController::class, 'deactivate']);
    Route::get('/{licenseKey}/info', [LicenseController::class, 'info']);
});
