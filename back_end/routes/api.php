<?php

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
Route::prefix('phuongtien')->group(function () {
    Route::get('/', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'index']); // lấy ra danh sách
    Route::post('/', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'store']); //  thêm 1 phương tiện mới
    Route::get('/{id}', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'show']); // lấy ra  id muốn sửa
    Route::put('/{id}', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'update']); // sủa theo id
    Route::delete('/{id}', [\App\Http\Controllers\api\ApiLoaiPhuongTienController::class, 'destroy']); // xóa theo id
});
