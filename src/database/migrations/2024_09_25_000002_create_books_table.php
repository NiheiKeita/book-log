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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('isbn13', 13)->unique();
            $table->string('title');
            $table->string('title_normalized')->index();
            $table->string('author')->nullable();
            $table->string('author_normalized')->nullable()->index();
            $table->string('publisher')->nullable();
            $table->string('published_year', 4)->nullable();
            $table->string('image_url')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
