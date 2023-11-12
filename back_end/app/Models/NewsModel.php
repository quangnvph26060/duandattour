<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsModel extends Model
{
    use HasFactory;
    protected $table="news";
    protected $fillable=[
        'tieu_de',
        'image',
        'noi_dung',
        'ngay_dang',
    ];
}
