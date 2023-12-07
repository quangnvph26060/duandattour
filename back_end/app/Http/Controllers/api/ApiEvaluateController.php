<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Evaluate;
use Illuminate\Http\Request;

class ApiEvaluateController extends Controller
{
    public function addDanhGia(Request $request)
    {
        $user = auth()->user()->id;
        $so_sao = $request->input('so_sao');
        $noi_dung = $request->input('noi_dung');
        $danhgia = Evaluate::create([
            'id_user' => $user,
            'so_sao' => $so_sao,
            'noi_dung' => $noi_dung,
        ]);
        return response()->json($danhgia, 200);
    }
}
