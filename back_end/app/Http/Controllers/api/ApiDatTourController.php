<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\TourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class ApiDatTourController extends Controller
{
    //
    public function getDatTour(Request $request, $id)
    {
        $tour = TourModel::with('images')->find($id);
        $user = null;

        if (Auth::guard('sanctum')->check()) {
            $user = Auth::guard('sanctum')->user();
        }

        $response = [
            'data' => $tour,
            'user' => $user,
        ];

        return response()->json($response);
    }

    public function createDatTour(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        $datTour = $request->all();
        $datTour['ngay_dat'] = now(); // Gắn mặc định ngày đặt là ngày hiện tại
       // $datTour['ngay_dat'] = Carbon::today(); // Lấy ngày tháng năm hiện tại
       // $datTour['ngay_het_han'] = Carbon::today()->addDay(); // Thêm 1 ngày vào ngày hiện tại
        $createDatTour = DatTour::create($datTour);
        return response()->json(['createDatTour' => $createDatTour]);
    }
   

    // public function demo()
    // {
    //     $datTours = DatTour::all();
    
    //     $result = [];
    
    //     foreach ($datTours as $datTour) {

    //         $ngayDat = Carbon::parse($datTour->ngay_dat);
    //          // Chuyển đổi giá trị ngày đặt thành đối tượng Carbon
    //         $ngayDatCongMotGio = $ngayDat->addHour(1);
    //          // Cộng thêm một giờ vào ngày đặt
    
    //         $result[] = [
    //             'ngay_dat_ban_dau' => $datTour->ngay_dat,
    //             'ngay_dat_cong_mot_gio' => $ngayDatCongMotGio->toDateTimeString()
    //         ];
    //     }
    
    //     return response()->json($result);
    // }

}
