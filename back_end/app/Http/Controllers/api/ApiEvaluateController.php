<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\DatTour;
use App\Models\Evaluate;
use App\Models\LoaiTourModel;
use App\Models\TourModel;
use Illuminate\Http\Request;

class ApiEvaluateController extends Controller
{
    //add
    public function addDanhGia(Request $request)
    {
        $user = auth()->user()->id;
        $so_sao = $request->input('so_sao');
        $id_tour = $request->input('id_tour');
        $noi_dung = $request->input('noi_dung');
        $danhgia = Evaluate::create([
            'id_user' => $user,
            'so_sao' => $so_sao,
            'id_tour' => $id_tour,
            'noi_dung' => $noi_dung,
        ]);
        return response()->json($danhgia, 200);
    }
    public function findDanhGia(Request $request)
    {
        $user = auth()->user()->id;
        $evaluation = Evaluate::where('id_user', $user)->get();
        $dattour = DatTour::where('trang_thai', 1)->get();
        $tours = TourModel::all();
        $loaitour = LoaiTourModel::all();
        // lấy đánh giá của tour
        $result = [];
        foreach ($dattour as $item) {
            foreach ($evaluation as $as) {
                if ((int)$item->id_tour === (int)$as->id_tour) {
                    $item['danh_gia'] = $as; // Thêm $as vào thuộc tính "ketqua" của $item
                }
            }
            $result[] = $item; // Thêm $item vào mảng $result
        }
        // lấy tên tour và các thông tin của nó 
        $newResult = [];
        foreach ($result as $res) {
            foreach ($tours as $tour) {
                if ((int)$res->id_tour === (int)$tour->id) {
                    $res['tour'] = $tour;
                }
            }
            $newResult[] = $res;
        }
        // lấy tên của các miền vào mảng $result
        $success = [];
        foreach ($result as $res) {
            foreach ($loaitour as $loai) {
                if ((int)$res['tour']->ma_loai_tour === (int)$loai->id) {
                    $res['ten_loai_tour'] = $loai;
                }
            }
            $success[] = $res;  
        }
       
       
        if ($evaluation) {
            return response()->json([
                "tour" => $success
            ]);
        } else {
            return response()->json(['message' => 'Chưa có đánh giá'], 404);
        }
    }
}


