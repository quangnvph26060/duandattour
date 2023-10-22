<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
class ImageModel extends Model
{
    use HasFactory , SoftDeletes;
    protected $table="images";
    protected $fillable=[
        'image_path',
       
    ];
}
