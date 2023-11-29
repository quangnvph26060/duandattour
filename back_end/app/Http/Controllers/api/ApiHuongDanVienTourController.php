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
        $results = DB::table('hdv_tour')->get();

        $permissions = User::whereHas('roles', function ($query) {
            $query->where('name', 'huong_dan_vien');
        })->with('roles', 'roles.permissions')->get();
        $matchedPermissions = [];
        $matchedRecords  = [];
        foreach ($result as $hdv) {
            $hdvId = $hdv->hdv_id;
            foreach ($permissions as $user) {
                if ($user->id == $hdvId) {
                    $matchedPermissions[] = $user;
                }
            }
        }
        foreach ($permissions as $user) {
            $found = false;
            foreach ($results as $hdv) {
                if ($user->id == $hdv->hdv_id) {
                    $found = true;
                    break;
                }
            }
            if (!$found) {
                $matchedRecords[] = $user;
            }
        }

        $uniquePermissions = array_unique($matchedPermissions);
        $matchedRecords  = array_unique($matchedRecords);
        $hdv_abc = collect($uniquePermissions)->concat($matchedRecords)->unique()->all();

        if (count($permissions) > 0 && count($uniquePermissions) > 0) {
            $combinedArray = collect($permissions)->concat($uniquePermissions)->unique()->all();
        } else {
            $combinedArray = collect($matchedRecords)->concat($uniquePermissions)->unique()->all();
        }
        return response()->json([
            'hdv' => $result, 'abc' => $matchedRecords, 'hdv_abc' => $hdv_abc,
            'combinedArray' => $combinedArray,'all_hdv'=>$permissions
        ]);
    }
    // chọn hướng dẫn viên cho tour đó 
    public function handleHuongDanVien(Request $request)
    {
        $id_tour = $request->input('id_tour');
        $id_hdv = $request->input('id_hdv');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $result = DB::table('hdv_tour')->insert([
            'tour_id' => $id_tour,
            'hdv_id' => $id_hdv,
            'start_date' => $start_date,
            'end_date' => $end_date
        ]);
        return response()->json(['message' => "Thêm thành công "]);
    }
    public function allHuongDanVienTOur()
    {
        $hdv_tour =  HuongDanVienTour::all();

        return response()->json(['hdv' => $hdv_tour]);
    }
}
