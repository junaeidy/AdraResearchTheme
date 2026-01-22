<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * For existing single-journal licenses with activations, populate the licensed_journal_path
     * from the first activation record.
     */
    public function up(): void
    {
        // Get single-journal licenses that have activations
        $licenses = DB::table('licenses')
            ->where('type', 'single-journal')
            ->where('scope', 'journal')
            ->where('licensed_journal_path', null)
            ->get();

        foreach ($licenses as $license) {
            // Get the first activation for this license
            $firstActivation = DB::table('license_activations')
                ->where('license_id', $license->id)
                ->orderBy('created_at', 'asc')
                ->first();

            if ($firstActivation && $firstActivation->journal_path) {
                // Extract and store the journal path
                $journalPath = ltrim($firstActivation->journal_path, '/');
                DB::table('licenses')
                    ->where('id', $license->id)
                    ->update(['licensed_journal_path' => $journalPath]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No need to reverse - the column was created in the previous migration
        // This migration just populates data
    }
};
