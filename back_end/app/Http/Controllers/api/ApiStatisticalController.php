<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\HoaDon;
use App\Models\NewsModel;
use App\Models\ThanhToan;
use App\Models\ThanhToanDetail;
use App\Models\TourModel;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Metadata\Uses;

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

        $totalRevenueToday = ThanhToanDetail::whereDate('ngay_thanh_toan', $currentDate)->sum('tong_tien_tt');
        $totalRevenueThisMonth = ThanhToanDetail::whereYear('ngay_thanh_toan', $currentYear)
            ->whereMonth('ngay_thanh_toan', $currentMonth)
            ->sum('tong_tien_tt'); 
        $totalRevenueThisYear = ThanhToanDetail::whereYear('ngay_thanh_toan', $currentYear)->sum('tong_tien_tt');
        $statistical['totalTours'] = $totalTours;
        $statistical['totalToursbooked'] = $totalToursbooked;
        $statistical['totalUser'] = $totalUser;
        $statistical['totalNews'] = $totalNews;
        $statistical['totalRevenueToday'] = $totalRevenueToday;
        $statistical['totalRevenueThisMonth'] = $totalRevenueThisMonth;
        $statistical['totalRevenueThisYear'] = $totalRevenueThisYear;
        return response()->json(['statistical'=> $statistical]);
    }

    public function columnChart($year = null)
    {
        if ($year === null) {
            $year = date('Y'); // Sử dụng năm hiện tại nếu $year là null
        }
    
        $totalRevenueByMonth = [];
    
        for ($month = 1; $month <= 12; $month++) {
            $totalRevenue = ThanhToanDetail::whereYear('ngay_thanh_toan', $year)
                ->whereMonth('ngay_thanh_toan', $month)
                ->sum('tong_tien_tt');
            $totalRevenueByMonth[] = intval($totalRevenue); // Chuyển đổi thành số nguyên
        }
    
        return response()->json(['doanhthu' => $totalRevenueByMonth], 200);
    }
}
