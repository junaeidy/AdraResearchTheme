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
        Schema::create('license_activations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('license_id')->constrained()->onDelete('cascade');
            $table->string('domain');
            $table->string('journal_path')->nullable();
            $table->string('full_identifier');
            $table->string('ip_address')->nullable();
            $table->string('ojs_version')->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamp('activated_at');
            $table->timestamp('last_check_at')->nullable();
            $table->timestamps();
            
            $table->unique(['license_id', 'full_identifier']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('license_activations');
    }
};
