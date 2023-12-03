<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class NotificationModel extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "notification";
    protected $fillable = [
        'name_user',
        'body',
        'ngay_gio',
        'loai_thong_bao',
        'user_id'
    ];
}
