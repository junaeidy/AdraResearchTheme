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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('product_type', ['plugin', 'theme']);
            $table->foreignId('category_id')->constrained('product_categories');
            $table->enum('license_scope', ['installation', 'journal']);
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->json('features')->nullable();
            $table->string('version');
            $table->string('compatibility')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(false);
            $table->string('image')->nullable();
            $table->string('download_url')->nullable();
            $table->string('demo_url')->nullable();
            $table->json('screenshots')->nullable();
            $table->string('documentation_url')->nullable();
            $table->json('changelog')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
