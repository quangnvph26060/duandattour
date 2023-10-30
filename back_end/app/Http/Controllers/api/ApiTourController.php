<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourResoure;
use App\Models\TourModel;

use App\Models\DatTour;
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

        return response()->json($tour);
    }


    public function index()
    {
<<<<<<< HEAD
        $tours = TourModel::with('images', 'phuongTien', 'khachSan', 'lichTRinh')->get();

        if ($tours->isEmpty()) {
            return response()->json(['message' => 'No tours found'], 404);
        }

        return response()->json($tours);
=======
        $tour = TourModel::all();
        // lấy ra tất cả
        // $tours = TourModel::join('dat_tours', 'tour.id', '=', 'dat_tours.id_tour')
        //     ->join('hoa_dons', 'dat_tours.id', '=', 'hoa_dons.id_dat_tour')
        //     ->select('tour.lich_khoi_hanh', 'tour.ngay_ket_thuc', 'hoa_dons.ma_hoa_don')
        //     ->get();
        // // lấy ngày kết thúc 
        // $hoadon = HoaDon::join('dat_tours', 'hoa_dons.id_dat_tour', '=', 'dat_tours.id')
        // ->join('tour', 'dat_tours.id_tour', '=', 'tour.id')
        // ->join('huong_dan_vien_hoa_dons', 'hoa_dons.id', '=', 'huong_dan_vien_hoa_dons.hoadon_id')
        // ->select('tour.ngay_ket_thuc')
        // ->first();
        // lấy ngày kết thúc ra sử dụng 
        // $ngayKetThucArray = $hoadon->pluck('ngay_ket_thuc')->toArray();
        // foreach ($tours as $tour) {
        //     $lichKhoiHanh = Carbon::parse($tour->lich_khoi_hanh);
        //     $ngayKetThuc = Carbon::parse($tour->ngay_ket_thuc);
        //     $soNgayChenhLech = $ngayKetThuc->diffInDays($lichKhoiHanh);

        //     // Lưu số ngày chênh lệch vào thuộc tính của đối tượng tour
        //     $tour->so_ngay_chenh_lech = $soNgayChenhLech;

        //      $ngayHienTai = Carbon::today(); // Lấy ngày hiện tại (không bao gồm giờ, phút, giây)

        //      $tour->ngay_hien_tai = $ngayHienTai->toDateString();

        // }

        // return response()->json($tours);

        // bảng hoasddwon chưa liên kết với bảng hướng đãn viên 
        //       $results = DB::table('hoa_dons')
        // ->leftJoin('huong_dan_vien_hoa_dons', 'hoa_dons.id', '=', 'huong_dan_vien_hoa_dons.hoadon_id')
        // ->select('hoa_dons.*')
        // ->whereNull('huong_dan_vien_hoa_dons.hoadon_id')
        // ->get();
        //   return response()->json($results);
        //bảng hướng dẫn viên chưa liên kết với bảng hóa đơn
        //   $hdv = DB::table('huong_dan_vien')
        // ->leftJoin('huong_dan_vien_hoa_dons', 'huong_dan_vien.id', '=', 'huong_dan_vien_hoa_dons.hdv_id')
        // ->select('huong_dan_vien.*')
        // ->whereNull('huong_dan_vien_hoa_dons.hdv_id')
        // ->get();
        // return response()->json($hdv);

        return  TourResoure::collection($tour);
>>>>>>> quangnvph26060
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
}
