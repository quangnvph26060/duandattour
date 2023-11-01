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
        $createDatTour = DatTour::create($datTour);
        return response()->json(['createDatTour' => $createDatTour]);
    }

}
