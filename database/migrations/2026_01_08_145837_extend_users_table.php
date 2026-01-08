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
        Schema::table('users', function (Blueprint $table) {
            $table->string('organization')->nullable();
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
            $table->enum('role', ['admin', 'customer'])->default('customer');
            $table->string('api_token', 80)->unique()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['organization', 'country', 'phone', 'role', 'api_token']);
        });
    }
};
