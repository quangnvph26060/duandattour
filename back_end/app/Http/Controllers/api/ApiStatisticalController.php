<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\Evaluate;
use App\Models\HoaDon;
use App\Models\NewsModel;
use App\Models\TourModel;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Metadata\Uses;
use Illuminate\Support\Facades\DB;

class ApiStatisticalController extends Controller
{
    //
    public function getStatistical()
    {
        $statistical = [];
        $totalTours = TourModel::where('trang_thai', 1)->count();
        $totalToursbooked = DatTour::count();
        $totalUser = User::whereHas('roles', function ($query) {
            $query->where('name', 'khach_hang');
        })->with('roles', 'roles.permissions')->count();
        $totalNews = NewsModel::count();
        $currentDate = date('Y-m-d');
        $currentMonth = date('m');
        $currentYear = date('Y');

        $totalRevenueToday = HoaDon::whereDate('ngay_tao_hoa_don', $currentDate)->sum('tong_tien');
        $totalRevenueThisMonth = HoaDon::whereYear('ngay_tao_hoa_don', $currentYear)
            ->whereMonth('ngay_tao_hoa_don', $currentMonth)
            ->sum('tong_tien');
        $totalRevenueThisYear = HoaDon::whereYear('ngay_tao_hoa_don', $currentYear)->sum('tong_tien');
        $statistical['totalTours'] = $totalTours;
        $statistical['totalToursbooked'] = $totalToursbooked;
        $statistical['totalUser'] = $totalUser;
        $statistical['totalNews'] = $totalNews;
        $statistical['totalRevenueToday'] = $totalRevenueToday;
        $statistical['totalRevenueThisMonth'] = $totalRevenueThisMonth;
        $statistical['totalRevenueThisYear'] = $totalRevenueThisYear;
        return response()->json(['statistical' => $statistical]);
    }
    // thống kê top 5 tour đánh giá cao nhất
    public function topFiveTours()
    {
        $topFiveTours = Evaluate::select('id_tour', DB::raw('AVG(so_sao) as average_rating'))
            ->groupBy('id_tour')
            ->orderByRaw('average_rating DESC')
            ->limit(5)
            ->get();
        $name_tour = TourModel::select('id', 'ten_tour')->get();

        // Duyệt qua từng kết quả trong mảng $topFiveTours
        foreach ($topFiveTours as $tour) {
            // Tìm tên_tour tương ứng với id_tour
            $matchingTour = $name_tour->where('id', $tour->id_tour)->first();

            // Thay thế id_tour bằng tên_tour nếu có kết quả tương ứng
            if ($matchingTour) {
                $tour->id_tour = $matchingTour->ten_tour;
            }
        }

        return response()->json($topFiveTours, 200);
    }
//     axios.get('http://localhost:8000/api/admin/statistical/demo')
//   .then(response => {
//     // Xử lý dữ liệu trả về khi yêu cầu thành công
//     console.log(response.data);
//   })
//   .catch(error => {
//     // Xử lý lỗi khi yêu cầu thất bại
//     console.error(error);
//   });
}
