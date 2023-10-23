<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TourResoure;
use App\Models\TourModel;
use Illuminate\Http\Request;
use Carbon\Carbon;
class ApiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tour = TourModel::all();
        return  TourResoure::collection($tour); 
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
        if($tour){
            $tour->delete();
            return  response()->json([
                'message' => 'Xóa Thành Công'
            ], 201);
        }else{
            return  response()->json([
                'message' => 'Không tìm thấy thông tin'
            ], 404);
        }
    }
}
