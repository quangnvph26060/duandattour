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
        Schema::create('tour_hdv', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tour_id');
            $table->unsignedBigInteger('hdv_id');
            
    
            $table->foreign('tour_id')->references('id')->on('tour')->onDelete('cascade');
            $table->foreign('hdv_id')->references('id')->on('huong_dan_vien')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_hdv');
    }
};
