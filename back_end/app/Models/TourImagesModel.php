<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourImagesModel extends Model
{
    use HasFactory;
    protected $table="tour_images";
    protected $fillable=[
        'tour_id', 'image_id',
       
    ];
   
}
