<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\TourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiDatTourController extends Controller
{
    //
    public function getDatTour(Request $request, $id)
    {
        $result = TourModel::find($id);
        if ($result) {
            $tour = TourModel::with('images')->first();
            $user = null;

            if (Auth::guard('sanctum')->check()) {
                $user = Auth::guard('sanctum')->user();
            }
            $response = [
                'data' => $tour,
                'user' => $user,
            ];
        }

        return response()->json($response);
    }

    public function createDatTour(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        $datTour = $request->all();
        $datTour['ngay_dat'] = now(); // Gắn mặc định ngày đặt là ngày hiện tại
        if ($request->has('so_luong_khach')) {
            // Trường 'so_luong_khach' đã tồn tại trong yêu cầu HTTP
            // Tiếp tục truy cập vào giá trị của trường 'so_luong_khach'
            $soLuongKhach = $request->input('so_luong_khach');
            // Tiếp tục xử lý với giá trị $soLuongKhach
        } else {
            // Trường 'so_luong_khach' không tồn tại trong yêu cầu HTTP
            // Thực hiện xử lý mặc định ở đây (ví dụ: gán giá trị mặc định là 1)
            $soLuongKhach = 1;
        }
        $tourone = TourModel::find($datTour['id_tour']);
        if ($soLuongKhach <= $tourone->soluong) {
            $createDatTour = DatTour::create($datTour);
            $soluong = $tourone->soluong - $soLuongKhach;
            if($createDatTour){
                $tourone->soluong = $soluong;
                $tourone->save();
            }
            return response()->json(['createDatTour' => $createDatTour]);
        }else{
            return response()->json(['message'=>'Đặt tour thất bại vì quá số lượng'],404);
        }
       
    }
    public function indexDat()
    {
        $dattour = DatTour::all();
        return response()->json(['code' => 200, 'dattour' => $dattour]);
    }

    public function getListBookingTour()
    {

        $bookings = DatTour::with('ThanhToan', 'tours.images')->get();
        return response()->json(['data' => $bookings], 200);
    }

    public function getListBookingTourUnpaid()
    {

        $bookingsUnpaid = DatTour::with('ThanhToan', 'tours.images')
        ->where('trang_thai',0)
        ->get();
        return response()->json(['data' => $bookingsUnpaid], 200);
    }

    public function getListBookingTourPaid()
    {

        $bookingsUnpaid = DatTour::with('ThanhToan', 'tours.images')
        ->where('trang_thai',1)
        ->get();
        return response()->json(['data' => $bookingsUnpaid], 200);
    }

    public function getBookingTourDeltail($id) {
        $bookingtour = DatTour::find($id);
        if($bookingtour){
            $bookings = DatTour::with('ThanhToan','tours.images')->find($id);
            return response()->json(['data'=>$bookings],200);
        }
        // return response()->json(['booking'=>$bookingtour],200);
        return response()->json(['message'=>'Không tìm thấy booking tour'],404);
    }

    public function updateStatus($id)
    {
        $updateStatus = DatTour::find($id);
        if ($updateStatus->trang_thai == 0) {
            $updateStatus->trang_thai = 1;
            $updateStatus->save();
            return response()->json(['message' => 'Cập nhập trạng thái thành công!!'], 200);
        }
        return response()->json(['message' => 'Đơn hàng đã thanh toán rồi'], 404);
    }
}
