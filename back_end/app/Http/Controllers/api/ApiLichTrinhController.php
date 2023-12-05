<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LichTrinhModel;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ApiLichTrinhController extends Controller
{
    //
    public function index()
    {
        $lichtrinh = LichTrinhModel::all();
        return response()->json([
            'code' => 200,
            'date' => $lichtrinh
        ]);
    }
    public function store(Request $request)
    {
        $thoi_gian = Carbon::parse($request->thoi_gian)->format('Y-m-d');
        $requestData = $request->all();
        $requestData['thoi_gian'] = $thoi_gian;
        return LichTrinhModel::create($requestData);
    }
    public function show(string $id)
    {
        $lichtrinh = LichTrinhModel::find($id);
        if (!$lichtrinh) {
            return response()->json($lichtrinh);
        }
        return response()->json($lichtrinh);
    }
    public function update(Request $request, string $id)
    {
        $lichtrinh = LichTrinhModel::find($id);
        if (!$lichtrinh) {
            return response()->json([
                'message' => 'Không tìm thấy lịch trình'
            ], 404);
        }
        return $lichtrinh->update($request->all());
    }
    public function destroy(string $id)
    {
        $lichtrinh = LichTrinhModel::find($id);
        if (!$lichtrinh) {
            return response()->json([
                'message' => 'Không tìm thấy lịch trình '
            ], 404);
        }
        return $lichtrinh->delete();
    }
}