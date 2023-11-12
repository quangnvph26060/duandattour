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
        if($result){
            $tour= TourModel::with('images')->first();
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
        $createDatTour = DatTour::create($datTour);
        return response()->json(['createDatTour' => $createDatTour]);
    }
    public function indexDat(){
        $dattour = DatTour::all();
        return response()->json(['code'=>200,'dattour'=>$dattour]);
    }

    public function getListBookingTour() {

            $bookings = DatTour::with('ThanhToan','tours')->get();
            return response()->json(['data'=>$bookings],200);
    }

    public function updateStatus($id){
        $updateStatus = DatTour::find($id);
        if($updateStatus->trang_thai==0){
            $updateStatus->trang_thai=1;
            $updateStatus->save();
            return response()->json(['message'=>'Cập nhập trạng thái thành công!!'],200);
        }
        return response()->json(['message'=>'Đơn hàng đã thanh toán rồi'],404);
        // dd($updateStatus->ten_khach_hang);
        // if($updateStatus){

        // }
    }

}
