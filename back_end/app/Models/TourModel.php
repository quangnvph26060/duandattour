<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\TourImagesModel;
class TourModel extends Model
{
    use HasFactory,SoftDeletes;
    protected $table ="tour";
    protected $fillable = [
        'ten_tour',
        'diem_di',
        'diem_den',
        'lich_khoi_hanh',
        'ngay_ket_thuc',
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
}
