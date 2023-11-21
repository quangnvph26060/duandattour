<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourResoure;
use App\Models\LoaiTourModel;
use App\Models\TourModel;

use App\Models\DatTour;
use App\Models\Discount;
use App\Models\HoaDon;
use Illuminate\Http\Request;
use Carbon\Carbon;

use Illuminate\Support\Facades\DB;

class ApiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ShowTour(string $id)
    {
        $tour = TourModel::with('images', 'phuongTien', 'khachSan', 'lichTRinh')->find($id);

        if (!$tour) {
            return response()->json(['message' => 'Tour not found'], 404);
        }

        return response()->json(['data' => $tour]);
    }

    public function getToursByDestination(Request $request)
    {
        $query = $request->input('diem_den');
        $tourdiemden = TourModel::with('images')->where('diem_den','like',"%{$query}%")->get();
        $tourdiemdencout = $tourdiemden->count();
        return response()->json(['tourdiemden' => $tourdiemden, 'tourdiemdencout' => $tourdiemdencout], 200);
    }

    public function index()
    {
       
        $tours = TourModel::with('images', 'phuongTien', 'khachSan', 'lichTRinh')->get();
        if ($tours->isEmpty()) {
            return response()->json(['message' => 'No tours found'], 404);
        }
        return response()->json(['data' => $tours]);
        
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $lich_khoi_hanh = Carbon::parse($request->lich_khoi_hanh)->format('Y-m-d');
        $requestData = $request->all();
        $requestData['lich_khoi_hanh'] = $lich_khoi_hanh;
        $tour = TourModel::create($requestData);
        // Trả về thông tin vừa thêm
        return new TourResoure($tour);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tour = TourModel::find($id);
        if ($tour) {
            return new TourResoure($tour);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tour = TourModel::find($id);
        if ($tour) {
            $tour->update($request->all());
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tour = TourModel::find($id);
        if ($tour) {
            $tour->delete();
            return  response()->json([
                'message' => 'Xóa Thành Công'
            ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }

    public function getlisttourKM() {
        $tourKM = TourModel::with('discounts','images')->where('trang_thai',1)->get();
        $tourKMWithDiscounts = [];
        
        foreach ($tourKM as $tour) {
            if ($tour->discounts->isNotEmpty()) {
                $expiryDates = $tour->discounts->pluck('expiry_date');
                $maxExpiryDate = $expiryDates->max();
                $now = Carbon::now();
                $expiryDate = Carbon::parse($maxExpiryDate);
                $countdown = $expiryDate->diffInSeconds($now);
                $tour->max_expiry_date = $maxExpiryDate;
                $tourKMWithDiscounts[] = $tour;
            }
        }
        
        return response()->json(['tourKM' => $tourKMWithDiscounts], 200);
    }
}
