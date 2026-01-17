<?php

namespace App\Console\Commands;

use App\Models\WebsiteSetting;
use Illuminate\Console\Command;

class MaintenanceToggle extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'maintenance:toggle {--message=Website sedang dalam pemeliharaan. Silakan coba lagi nanti. : Custom maintenance message}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Toggle maintenance mode on/off';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentMode = WebsiteSetting::getSetting('maintenance_mode', 'false') === 'true';
        $newMode = !$currentMode;
        $newModeText = $newMode ? 'true' : 'false';
        
        WebsiteSetting::updateSetting('maintenance_mode', $newModeText);
        
        // Update message if provided
        if ($newMode && $this->option('message')) {
            WebsiteSetting::updateSetting('maintenance_message', $this->option('message'));
        }

        $status = $newMode ? 'ON' : 'OFF';
        $this->info("✅ Maintenance mode is now {$status}");
        
        if ($newMode) {
            $message = WebsiteSetting::getSetting('maintenance_message', '');
            $this->line("📝 Message: {$message}");
        }

        return Command::SUCCESS;
    }
}
