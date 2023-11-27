<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HuongDanVienTour;
use Illuminate\Support\Facades\DB;

class ApiHuongDanVienTourController extends Controller
{
    // lọc ra những id hướng dẫn viên chưa có tour đó 
    public function store(Request $request)
    {
       
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        // Tạo một đối tượng Carbon từ ngày bắt đầu
        $currentDate = \Carbon\Carbon::parse($startDate);
        // Khởi tạo mảng để lưu trữ các ngày
        $dateArray = [];
        // Lặp qua từng ngày trong khoảng thời gian và thêm vào mảng
        while ($currentDate <= \Carbon\Carbon::parse($endDate)) {
            $dateArray[] = $currentDate->toDateString();
            $currentDate->addDay();
        }
        $result = DB::table('hdv_tour')
            ->whereNotIn('start_date', $dateArray)
            ->whereNotIn('end_date', $dateArray)
            ->get();
        return response()->json($result);
    }
}
