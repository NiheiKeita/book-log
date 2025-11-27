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
            if (!Schema::hasColumn('users', 'google_sub')) {
                $table->string('google_sub')->nullable()->unique()->after('email');
            }
            if (!Schema::hasColumn('users', 'image_url')) {
                $table->string('image_url')->nullable()->after('google_sub');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            if (Schema::hasColumn('users', 'google_sub')) {
                $table->dropColumn('google_sub');
            }
            if (Schema::hasColumn('users', 'image_url')) {
                $table->dropColumn('image_url');
            }
        });
    }
};
