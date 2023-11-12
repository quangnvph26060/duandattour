<?php

use App\Http\Controllers\Api\ApiAuthLoginController;
use App\Http\Controllers\Api\ApiDatTourController;
use App\Http\Controllers\Api\ApiHuongDanVienController;
use App\Http\Controllers\Api\ApiLoaiTourController;
use App\Http\Controllers\Api\ApiLoaiPhuongTienController;
use App\Http\Controllers\Api\ApiDiaDiemController;
use App\Http\Controllers\api\ApiImagesController;
use App\Http\Controllers\api\ApiLichTrinhController;
use App\Http\Controllers\Api\ApiTourController;
use App\Http\Controllers\api\ApiTourImageController;
use App\Http\Controllers\api\ApiTourPhuongTienController;
use App\Http\Controllers\api\ApiLoaiKhachSanController;
use App\Http\Controllers\api\ApiTourKhachSanController;
use App\Http\Controllers\api\ApiPermissionsController;
use App\Http\Controllers\api\ApiPaymentController;
use App\Http\Controllers\api\ApiMessageController;
use App\Http\Controllers\Api\ApiSearchController;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;


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

Route::get('demo', function () {
    dd(gethostbyname(gethostname()));
});
// api show user và vai trò của nó 
Route::get('/showuser', [ApiMessageController::class, 'showuser']);
// api hiển thị  message
Route::get('/messages', [ApiMessageController::class, 'showMessage']);
// them tin nhắn 
Route::post('/messages', [ApiMessageController::class, 'store']);
// lấy ra id của tài khoản có vai trò phản hồi tin nhắn 
Route::get('/findNameRole', [ApiMessageController::class, 'findNameRole']);
//route payment
Route::post('/vnpay_payment', [ApiPaymentController::class, 'vnpay_payment'])->name('vnpay_payment');
// lưu kết quả thanh toán vnpay vào DB
Route::post('/paymentresult', [ApiPaymentController::class, 'CreatePayment']);
// lưu thanh toán tiền mặt vào DB
Route::post('/cash', [ApiPaymentController::class, 'CreatePaymentCash']);
// hiển thị  kết quả thanh toán 
Route::get('/showResult', [ApiPaymentController::class, 'getPaymentData']);

Route::post('/login', [ApiAuthLoginController::class, 'login'])->name('login');

//api chi tiet tour
Route::get('getDatTour/{id}', [ApiDatTourController::class, 'getDatTour']);
Route::get('showDattour', [ApiDatTourController::class, 'indexDat']);
Route::post('postDattour', [ApiDatTourController::class, 'createDatTour']);

Route::get('bookingtour/{id}', [ApiPaymentController::class, 'getBookingTour']);
//api list ra danh sách menu
Route::get('menu-phan-cap', [ApiLoaiTourController::class, 'getMenuPhanCap']);
// api show tour theo cái menu ở trên có cả đếm xem có bao nhiêu tour
Route::get('/get/{destination}', [ApiTourController::class, 'getToursByDestination']);

//api láy all điểm đến của tour làm chức năng search
Route::get('/getListDiemDen', [ApiSearchController::class, 'getListDiemDen']);
//api láy all điểm đi của tour làm chức năng search
Route::get('/getListDiemDi', [ApiSearchController::class, 'getListDiemDi']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/deltailuser', [ApiAuthLoginController::class, 'delailUser']);
    Route::delete('logout', [ApiAuthLoginController::class, 'logout'])->name('logout');
    Route::put('/change_password', [ApiAuthLoginController::class, 'changePassword'])->name('changePassword');
});


Route::prefix('register')->group(function () {
    Route::get('/', [ApiAuthController::class, 'index']);
    Route::post('/dk', [ApiAuthController::class, 'registers']);;
});

//permission && role

// Route::get('/', [ApiPermissionsController::class, 'index']);
// Route::get('/phanvaitro/{id}', [ApiPermissionsController::class, 'PhanVaiTro']);
// Route::get('/phanquyen/{id}', [ApiPermissionsController::class, 'PhanQuyen']);
// Route::post('/add_role', [ApiPermissionsController::class, 'add_role'])->name('add_role');
// Route::post('/add_permission', [ApiPermissionsController::class, 'add_permission'])->name('add_permission');
// Route::post('insert_roles/{id}', [ApiPermissionsController::class, 'InsertRoles'])->name('user.insertroles');
// Route::post('insert_permission/{id}', [ApiPermissionsController::class, 'InsertPermission'])->name('user.insert_permission');
// end  permission && role


// show chỗ đoạn menu
Route::get('/ShowLoaiTour', [ApiLoaiTourController::class, 'ShowLoaiTour']);

Route::group(['middleware' => ['auth:sanctum', 'role:admin|nhan_vien']], function () {
    Route::prefix('admin')->group(function () {
        Route::prefix('loaitour')->group(function () {
            Route::get('/', [ApiLoaiTourController::class, 'index']);
            Route::post('/', [ApiLoaiTourController::class, 'store']);
            Route::get('/{id}', [ApiLoaiTourController::class, 'show']);
            Route::put('/{id}', [ApiLoaiTourController::class, 'update']);
            Route::delete('/{id}', [ApiLoaiTourController::class, 'destroy']);
        });
    });
});

//api phương tiện
Route::prefix('admin')->group(function () {

    Route::prefix('user')->group(function () {
        Route::get('/', [ApiPermissionsController::class, 'index']);
        Route::get('/phanvaitro/{id}', [ApiPermissionsController::class, 'PhanVaiTro']);
        Route::get('/phanquyen/{id}', [ApiPermissionsController::class, 'PhanQuyen']);
        Route::post('/add_role', [ApiPermissionsController::class, 'add_role'])->name('add_role');
        Route::post('/add_permission', [ApiPermissionsController::class, 'add_permission'])->name('add_permission');
        Route::post('insert_roles/{id}', [ApiPermissionsController::class, 'InsertRoles'])->name('user.insertroles');
        Route::post('insert_permission/{id}', [ApiPermissionsController::class, 'InsertPermission'])->name('user.insert_permission');
    });

    Route::prefix('images')->group(function () {
        Route::get('/images', [ApiImagesController::class, 'getImage']);
        Route::get('/', [ApiImagesController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiImagesController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiImagesController::class, 'show']); // lấy ra  id muốn sửa
        Route::post('edit/{id}', [ApiImagesController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiImagesController::class, 'destroy']); // xóa theo id
    });

    Route::prefix('tour-images')->group(function () {
        Route::get('/', [ApiTourImageController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiTourImageController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiTourImageController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiTourImageController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiTourImageController::class, 'destroy']); // xóa theo id

    });
    Route::prefix('phuongtien')->group(function () {
        Route::get('/', [ApiLoaiPhuongTienController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiLoaiPhuongTienController::class, 'store']); //  thêm 1 phương tiện mới
        Route::get('/{id}', [ApiLoaiPhuongTienController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiLoaiPhuongTienController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiLoaiPhuongTienController::class, 'destroy']); // xóa theo id
    });
    Route::prefix('huongdanvien')->group(function () {
        Route::get('/', [ApiHuongDanVienController::class, 'index']);
        Route::post('/', [ApiHuongDanVienController::class, 'store']);
        Route::get('/{id}', [ApiHuongDanVienController::class, 'show']);
        Route::put('/{id}', [ApiHuongDanVienController::class, 'update']);
        Route::delete('/{id}', [ApiHuongDanVienController::class, 'destroy']);
        // Route::post('testmail',[ApiHuongDanVienController::class,'testMail']);
    });
    Route::prefix('diadiem')->group(function () {
        Route::get('/', [ApiDiaDiemController::class, 'index']);
        Route::post('/', [ApiDiaDiemController::class, 'store']);
        Route::get('/{id}', [ApiDiaDiemController::class, 'show']);
        Route::put('/{id}', [ApiDiaDiemController::class, 'update']);
        Route::delete('/{id}', [ApiDiaDiemController::class, 'destroy']);
    });
    Route::prefix('loaitour')->group(function () {
        Route::get('/', [ApiLoaiTourController::class, 'index']);
        Route::post('/', [ApiLoaiTourController::class, 'store']);
        Route::get('/{id}', [ApiLoaiTourController::class, 'show']);
        Route::put('/{id}', [ApiLoaiTourController::class, 'update']);
        Route::delete('/{id}', [ApiLoaiTourController::class, 'destroy']);
    });
    Route::prefix('tour')->group(function () {
        Route::get('/{id}', [ApiTourController::class, 'ShowTour']);
        Route::get('/', [ApiTourController::class, 'index']);
        Route::post('/', [ApiTourController::class, 'store']);
        // Route::get('/{id}', [ApiTourController::class, 'show']);
        Route::put('/{id}', [ApiTourController::class, 'update']);
        Route::delete('/{id}', [ApiTourController::class, 'destroy']);
    });
    //api khách sạn
    Route::prefix('khachsan')->group(function () {
        Route::get('/', [ApiLoaiKhachSanController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiLoaiKhachSanController::class, 'store']); //  thêm 1 khách sạn mới
        Route::get('/{id}', [ApiLoaiKhachSanController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiLoaiKhachSanController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiLoaiKhachSanController::class, 'destroy']); // xóa theo id
    });
    //api Tour khách sạn
    Route::prefix('tourkhachsan')->group(function () {
        Route::get('/', [ApiTourKhachSanController::class, 'index']); // lấy ra danh sách
        Route::post('/', [ApiTourKhachSanController::class, 'store']); //  thêm 1 tour khách sạn mới
        Route::get('/{id}', [ApiTourKhachSanController::class, 'show']); // lấy ra  id muốn sửa
        Route::put('/{id}', [ApiTourKhachSanController::class, 'update']); // sủa theo id
        Route::delete('/{id}', [ApiTourKhachSanController::class, 'destroy']); // xóa theo id
    });
    Route::prefix('lichtrinh')->group(function () {
        Route::get('/', [ApiLichTrinhController::class, 'index']);
        Route::post('/', [ApiLichTrinhController::class, 'store']);
        Route::get('/{id}', [ApiLichTrinhController::class, 'show']);
        Route::put('/{id}', [ApiLichTrinhController::class, 'update']);
        Route::delete('/{id}', [ApiLichTrinhController::class, 'destroy']);
    });
    Route::prefix('tourphuongtien')->group(function () {
        Route::get('/', [ApiTourPhuongTienController::class, 'index']);
        Route::post('/', [ApiTourPhuongTienController::class, 'store']);
        Route::get('/{id}', [ApiTourPhuongTienController::class, 'show']);
        Route::put('/{id}', [ApiTourPhuongTienController::class, 'update']);
        Route::delete('/{id}', [ApiTourPhuongTienController::class, 'destroy']);
    });

    Route::prefix('dattour')->group(function () {
        Route::get('/getListBookingTour', [ApiDatTourController::class, 'getListBookingTour']);
        Route::put('/updateStatus/{id}', [ApiDatTourController::class, 'updateStatus']);
    });
});
