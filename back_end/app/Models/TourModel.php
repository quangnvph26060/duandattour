<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TourImagesModel;
use App\Models\LichTrinhModel;
use App\Models\TourPhuongTienModel;
use App\Models\TourKhachSanModel;

class TourModel extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = "tour";
    protected $fillable = [
        'ten_tour',
        'diem_di',
        'diem_den',
        'lich_khoi_hanh',
        'thoi_gian',
        'diem_khoi_hanh',
        'gia_tour',
        'mo_ta',
        'soluong',
        'trang_thai',
        'ma_loai_tour',
        'ma_hdv'
    ];
    public function tourImages()
    {
        return $this->hasMany(TourImagesModel::class, 'tour_id', 'id');
    }
    public function images()
    {
        return $this->belongsToMany(ImageModel::class, 'tour_images', 'tour_id', 'image_id');
    }

    public function tourPhuongTien()
    {
        return $this->hasMany(TourPhuongTienModel::class, 'id_tour', 'id');
    }
    public function phuongTien()
    {
        return $this->belongsToMany(LoaiPhuongTienModel::class, 'tour_phuong_tien', 'id_tour', 'ma_loai_phuong_tien');
    }
    public function tourkhachSan()
    {
        return $this->hasMany(TourKhachSanModel::class, 'id_tour', 'id');
    }
    public function khachSan()
    {
        return $this->belongsToMany(LoaiKhachSanModel::class, 'tour_khach_san', 'id_tour', 'ma_loai_khach_san');
    }
    public function lichTRinh()
    {
        return $this->hasMany(LichTrinhModel::class, 'id_tour', 'id');
    }
}
