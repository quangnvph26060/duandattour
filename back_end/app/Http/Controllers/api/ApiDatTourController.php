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
        $tour = TourModel::find($id);
        $user = null;

        if (Auth::guard('sanctum')->check()) {
            $user = Auth::guard('sanctum')->user();
        }

        $response = [
            'tour' => $tour,
            'user' => $user,
        ];

        return response()->json($response);
    }

    public function creatDatTour(Request $request)
    {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        if (!Auth::guard('sanctum')->check()) {
            // Người dùng chưa đăng nhập, lấy thông tin từ các trường request
            $name = $request->input('name');
            $image = $request->input('image');
            $dia_chi = $request->input('dia_chi');
            $email = $request->input('email');
            $phone = $request->input('phone');
            $cccd = $request->input('cccd');
        } else {
            // Người dùng đã đăng nhập, lấy thông tin từ người dùng đã đăng nhập
            $user = Auth::guard('sanctum')->user();
            $name = $user->name;
            $image = $user->image;
            $dia_chi = $user->dia_chi;
            $email = $user->email;
            $phone = $user->phone;
            $cccd = $user->cccd;
        }

        $tour_id = $request->input('tour_id');

        // Lấy thông tin tour từ ID tour
        $tour = TourModel::find($tour_id);

        // Kiểm tra xem tour và khách hàng có tồn tại hay không
        if (!$tour || !$name || !$email) {
            return response()->json(['message' => 'Failed to create booking.'], 400);
        }

        // Tạo một booking mới
        $booking = new DatTour();
        $booking->customer_id = null; // Mặc định id_user là null khi chưa đăng nhập
        $booking->name = $name;
        $booking->image = $image;
        $booking->dia_chi = $dia_chi;
        $booking->email = $email;
        $booking->phone = $phone;
        $booking->cccd = $cccd;
        $booking->tour_id = $tour->id;
        // Các thông tin khác của booking

        // Lưu booking vào cơ sở dữ liệu
        $booking->save();

        return response()->json(['message' => 'Booking created successfully.', 'booking' => $booking]);
    }
}
