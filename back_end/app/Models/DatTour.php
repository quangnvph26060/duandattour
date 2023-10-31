<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatTour extends Model
{
    use HasFactory;
    protected $table = 'dat_tours';
    protected $fillable = [
        'ten_khach_hang',
        'email',
        'sdt',
        'dia_chi',
        'cccd',
        'ngay_dat',
        'so_luong_khach',
        'trang_thai',
        'ma_khach_hang',
        'id_tour'
];
}
