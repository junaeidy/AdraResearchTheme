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
        Schema::table('orders', function (Blueprint $table) {
            // Change price columns from decimal to unsigned big integer
            $table->unsignedBigInteger('subtotal')->change();
            $table->unsignedBigInteger('tax')->default(0)->change();
            $table->unsignedBigInteger('discount')->default(0)->change();
            $table->unsignedBigInteger('total_amount')->change();
        });
        
        Schema::table('order_items', function (Blueprint $table) {
            // Change price columns from decimal to unsigned big integer
            $table->unsignedBigInteger('price')->change();
            $table->unsignedBigInteger('subtotal')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Revert back to decimal
            $table->decimal('subtotal', 10, 2)->change();
            $table->decimal('tax', 10, 2)->default(0)->change();
            $table->decimal('discount', 10, 2)->default(0)->change();
            $table->decimal('total_amount', 10, 2)->change();
        });
        
        Schema::table('order_items', function (Blueprint $table) {
            // Revert back to decimal
            $table->decimal('price', 10, 2)->change();
            $table->decimal('subtotal', 10, 2)->change();
        });
    }
};
