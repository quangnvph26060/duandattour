<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Notifications\Notifiable;
// use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;

class UsersModel extends Model
{
    use  HasFactory, SoftDeletes, Notifiable;
    protected $table = "users";
    protected $fillable = [
        'name',
        'image',
        'dia_chi',
        'email',
        'sdt',
        'cccd',
        'password'

    ];
}
