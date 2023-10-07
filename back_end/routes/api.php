<?php

use App\Http\Controllers\Api\ApiHuongDanVienController;
use App\Http\Controllers\Api\ApiLoaiTourController;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//api phương tiện
Route::prefix('admin')->group(function () {
    Route::prefix('phuongtien')->group(function () {
        Route::get('/', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'index']); // lấy ra danh sách
        Route::post('/', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'destroy']); // xóa theo id
    });
    Route::prefix('loaitour')->group(function () {
        Route::get('/', [ApiLoaiTourController::class, 'index']);
        Route::post('/', [ApiLoaiTourController::class, 'store']);
        Route::get('/{id}', [ApiLoaiTourController::class, 'show']);
        Route::put('/{id}', [ApiLoaiTourController::class, 'update']);
        Route::delete('/{id}', [ApiLoaiTourController::class, 'destroy']);
    });
    Route::prefix('huongdanvien')->group(function () {
        Route::get('/', [ApiHuongDanVienController::class, 'index']); 
        Route::post('/', [ApiHuongDanVienController::class, 'store']); 
        Route::get('/{id}', [ApiHuongDanVienController::class, 'show']); 
        Route::put('/{id}', [ApiHuongDanVienController::class, 'update']); 
        Route::delete('/{id}', [ApiHuongDanVienController::class, 'destroy']); 
    });
});


