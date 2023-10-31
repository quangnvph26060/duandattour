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
        Schema::create('dat_tours', function (Blueprint $table) {
            $table->id();
            $table->string('ten_khach_hang');
            $table->string('email')->unique();
            $table->string('sdt');
            $table->string('dia_chi');
            $table->string('cccd');
            $table->date('ngay_dat');
            $table->integer('so_luong_khach');
            $table->tinyInteger('trang_thai')->default(0);
            $table->foreignId('ma_khach_hang')->constrained('users');
            $table->foreignId('id_tour')->constrained('tour');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dat_tours');
    }
};