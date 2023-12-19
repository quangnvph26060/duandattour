<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\HoaDon;
use App\Models\NewsModel;
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
        return response()->json(['statistical'=> $statistical]);
    }
}
