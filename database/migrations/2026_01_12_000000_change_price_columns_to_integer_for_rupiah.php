<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Change all price-related decimal(10,2) columns to decimal(10,0) for Indonesian Rupiah
     * which doesn't use decimal places.
     */
    public function up(): void
    {
        // Update products table
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('price', 10, 0)->change();
            $table->decimal('sale_price', 10, 0)->nullable()->change();
        });

        // Update orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('subtotal', 10, 0)->change();
            $table->decimal('tax', 10, 0)->default(0)->change();
            $table->decimal('discount', 10, 0)->default(0)->change();
            $table->decimal('total_amount', 10, 0)->change();
        });

        // Update order_items table
        Schema::table('order_items', function (Blueprint $table) {
            $table->decimal('price', 10, 0)->change();
            $table->decimal('subtotal', 10, 0)->change();
        });

        // Update payment_proofs table
        Schema::table('payment_proofs', function (Blueprint $table) {
            $table->decimal('transfer_amount', 10, 0)->change();
        });

        // Update cart_items table
        Schema::table('cart_items', function (Blueprint $table) {
            $table->decimal('price', 10, 0)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert products table
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->change();
            $table->decimal('sale_price', 10, 2)->nullable()->change();
        });

        // Revert orders table
        Schema::table('orders', function (Blueprint $table) {
            $table->decimal('subtotal', 10, 2)->change();
            $table->decimal('tax', 10, 2)->default(0)->change();
            $table->decimal('discount', 10, 2)->default(0)->change();
            $table->decimal('total_amount', 10, 2)->change();
        });

        // Revert order_items table
        Schema::table('order_items', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->change();
            $table->decimal('subtotal', 10, 2)->change();
        });

        // Revert payment_proofs table
        Schema::table('payment_proofs', function (Blueprint $table) {
            $table->decimal('transfer_amount', 10, 2)->change();
        });

        // Revert cart_items table
        Schema::table('cart_items', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->change();
        });
    }
};
