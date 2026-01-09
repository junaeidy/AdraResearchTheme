<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// 🔒 Scheduled Tasks
Schedule::command('orders:cancel-expired')
    ->daily()
    ->at('00:00')
    ->description('Cancel orders that have exceeded their payment deadline');
