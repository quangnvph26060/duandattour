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
                'tour' => $tour,
                'user' => $user,
            ];
        }
        
        return response()->json($response);
    }

    public function creatDatTour(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        $datTour = $request->all();
        $datTour['ngay_dat'] = now(); // Gắn mặc định ngày đặt là ngày hiện tại
        $creatDatTour = DatTour::create($datTour);
        return response()->json(['creatDatTour' => $creatDatTour]);
    }
    public function indexDat(){
        $dattour = DatTour::all();
        return response()->json(['code'=>200,'dattour'=>$dattour]);
    }
}
