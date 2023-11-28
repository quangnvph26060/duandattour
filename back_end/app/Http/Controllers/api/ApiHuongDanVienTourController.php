<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\HuongDanVienTour;
use App\Models\TourModel;
use App\Models\User;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;

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
        $permissions   = User::with('roles', 'roles.permissions')->get();
        $matchedPermissions = [];
        foreach ($result as $hdv) {
            $hdvId = $hdv->hdv_id;

            foreach ($permissions as $user) {
                if ($user->id == $hdvId) {
                    $matchedPermissions[] = $user;
                    break;
                }
            }
        }
        $uniquePermissions = array_unique($matchedPermissions);
        return response()->json(['hdv' => $result, 'user' => $permissions,'user' => $uniquePermissions]);
    }
    // public function getListHDVTour(){
    //     $user = Auth::user();
    //     if($user){
    //          $hdvTour = HuongDanVienTour::where('hdv_id',$user->id)->get();
    //         $demo = [];
    //             foreach($hdvTour as $item){
    //                 $demo[] =$item->tour_id;
    //             }

    //          $tour = TourModel::whereIn('id', $demo)->get();
    //          return response()->json($tour,200);
    //     }

    // }
}
