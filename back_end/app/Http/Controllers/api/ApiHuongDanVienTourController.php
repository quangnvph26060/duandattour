<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HuongDanVienTour;
use App\Models\TourModel;
use Illuminate\Support\Facades\Auth;
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

    // list huong dan vien
    public function getListHDVTour(){
        $user = Auth::user();
        if($user){
            $hdvTour = HuongDanVienTour::where('hdv_id', $user->id)->get();
            $hdvTours = [];
           
            foreach($hdvTour as $tourhdv){
                $tour = TourModel::where('id', $tourhdv->tour_id)->first();
                $tourhdv->ten_tour = $tour->ten_tour; // Thêm trường "ten_tour" vào đối tượng $tourhdv
                $tourhdv->lich_khoi_hanh = $tour->lich_khoi_hanh;
                $tourhdv->ngay_ket_thuc = $tour->ngay_ket_thuc;
                $tourhdv->ten_hdv = $user->name;
                $hdvTours[] = $tourhdv;
            }
          
            return response()->json(['hdvtour' => $hdvTours], 200);
        }
    }

    public function updateStatustourhdv($id)
    {
        $updateStatus = HuongDanVienTour::find($id);
        // dd($updateStatus->status);
        if($updateStatus->status==0){
            $updateStatus->status = 1;
            $updateStatus->save();
            return response()->json(['message'=>'Cập nhật trạng thái thành công!!'],201);
        }else if($updateStatus->status==1){
            $updateStatus->status = 0;
            $updateStatus->save();
            return response()->json(['message'=>'Cập nhật trạng thái thành công!!'],201);
        }else{
            return response()->json(['message'=>'Lỗi không thể cập nhật'],404);
        }
    }
}
