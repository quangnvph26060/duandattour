<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use  App\Models\ThanhToan;

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

    public function ThanhToan()
    {
        return $this->hasOne(ThanhToan::class, 'id_dat_tour');
    }


    public function tours()
    {
        return $this->belongsto(TourModel::class, 'id_tour');
    }
    public function loaiTours()
    {
        return $this->belongsto(TourModel::class, 'ma_loai_tour');
    }
    public function khach_hang()
    {
        return $this->belongsto(TourModel::class, 'ma_khach_hang');
    }
}
