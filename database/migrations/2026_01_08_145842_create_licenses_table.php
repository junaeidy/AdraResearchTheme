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
        Schema::create('licenses', function (Blueprint $table) {
            $table->id();
            $table->string('license_key')->unique();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->unsignedBigInteger('order_id')->nullable();
            $table->enum('type', ['single-site', 'single-journal', 'multi-site', 'multi-journal', 'unlimited']);
            $table->enum('duration', ['1-year', '2-years', 'lifetime']);
            $table->enum('scope', ['installation', 'journal']);
            $table->integer('max_activations')->default(1);
            $table->integer('activated_count')->default(0);
            $table->enum('status', ['pending', 'active', 'expired', 'suspended'])->default('pending');
            $table->timestamp('activated_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('licenses');
    }
};
