<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Add indexes for orders table to improve query performance
        Schema::table('orders', function (Blueprint $table) {
            $table->index('payment_status');
            $table->index('payment_deadline');
            $table->index(['payment_status', 'payment_deadline']);
        });
        
        // Add index for payment_proofs table
        Schema::table('payment_proofs', function (Blueprint $table) {
            $table->index('status');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropIndex(['payment_status']);
            $table->dropIndex(['payment_deadline']);
            $table->dropIndex(['payment_status', 'payment_deadline']);
        });
        
        Schema::table('payment_proofs', function (Blueprint $table) {
            $table->dropIndex(['status']);
            $table->dropIndex(['status', 'created_at']);
        });
    }
};
