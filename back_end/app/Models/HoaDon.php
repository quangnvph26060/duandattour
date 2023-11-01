<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoaDon extends Model
{
    use HasFactory;
    protected $table = 'hoa_dons';
    protected $fillable = [
        'ma_hoa_don',
        'tong_tien',
        'ngay_tao_hoa_don',
        'id_dat_tour',
        'ma_khuyen_mai',
       
        
    ];
}
