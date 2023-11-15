<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourDiscount extends Model
{
    use HasFactory;
    protected $table="tour_discount";
    protected $fillable=[
        'tour_id', 'discount_id',
       
    ];
}
