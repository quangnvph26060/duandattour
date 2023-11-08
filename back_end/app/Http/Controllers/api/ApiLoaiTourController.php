<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoaiTourRequest;
use App\Models\LoaiTourModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// {

//     "ten_tour": "tour 1",
//     "diem_di":"ha noi",
//     "diem_den":"ho chi minh",
//     "lich_khoi_hanh":"2023-10-08",
//     "thoi_gian":"6 ngày",
//     "diem_khoi_hanh":"ha noi",
//     "anh":"hinh/1.jpg",
//     "soluong":"1",
//     "trang_thai":0,
//     "ma_loai_tour":1,
//     "ma_hdv":1
// }
class ApiLoaiTourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function ShowLoaiTour()
    {
        $results = DB::select("
        SELECT dia_diem.ten_dia_diem, loai_tour.ten_loai_tour
        FROM dia_diem
        INNER JOIN loai_tour ON dia_diem.ma_loai_tour = loai_tour.id
                                    ");

        $groupedData = [];
        foreach ($results as $result) {
            $tenLoaiTour = $result->ten_loai_tour;
            $tenDiaDiem = $result->ten_dia_diem;

            if (!isset($groupedData[$tenLoaiTour])) {
                $groupedData[$tenLoaiTour] = [
                    'ten_loai_tour' => $tenLoaiTour,
                    'dia_diem' => []
                ];
            }

            $groupedData[$tenLoaiTour]['dia_diem'][] = $tenDiaDiem;
        }

        $formattedData = [];
        foreach ($groupedData as $key => $value) {
            $formattedData[] = $value;
        }

        return response()->json([
            'code' => 200,
            'data' => $formattedData
        ]);
    }
    public function index()
    {
        //
        $loaiTour = LoaiTourModel::all();
        return response()->json([
            'code' => 200,
            'data' => $loaiTour
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $loaiTour = $request->all();

        // Kiểm tra trước khi thêm
        $existingRecord = DB::table('loai_tour')
            ->where('ten_loai_tour', $loaiTour['ten_loai_tour'])
            ->whereNotNull('deleted_at')
            ->first();

        if ($existingRecord) {
            // Bản ghi đã tồn tại và đã bị xóa, bạn có thể khôi phục nó
            DB::table('loai_tour')
                ->where('id', $existingRecord->id)
                ->update(['deleted_at' => null]);

            return response()->json(['message' => 'Khôi phục bản ghi thành công']);
        } else {
            // Bản ghi không tồn tại hoặc chưa bị xóa, bạn có thể tạo một bản ghi mới
            return LoaiTourModel::create($loaiTour);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

        $loaiTourModel = LoaiTourModel::find($id);

        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }

        return response()->json($loaiTourModel);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $loaiTourModel = LoaiTourModel::find($id);
        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $loaiTourModel->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $loaiTourModel = LoaiTourModel::find($id);
        if (!$loaiTourModel) {
            return response()->json(['message' => 'Không tìm thấy đối tượng LoaiTourModel'], 404);
        }
        return $loaiTourModel->delete();
    }
    public function getMenuPhanCap()
    {
        $loaiTours = LoaiTourModel::all();

        $menuPhanCap = $loaiTours->map(function ($loaiTour) {
            $diemDens = $loaiTour->tours->pluck('diem_den')->unique();
            $uniqueDiemDen=[];
            foreach ($diemDens as $value) {
                $lowerValue = strtolower($value);
                $found = false;
               
                foreach ($uniqueDiemDen as $uniqueValue) {
                    
                    if (strtolower($uniqueValue) === $lowerValue) {
                        $found = true;
                        break;   
                    }
                }
                
                if (!$found) {
                    $uniqueDiemDen[] = $value;
                }

                return [
                    'loaiTour' => $loaiTour->only(['id', 'ten_loai_tour']),
                    'diemDens' => $uniqueDiemDen,
                ];

            }
        });

        return response()->json(['menuPhanCap' => $menuPhanCap], 200);
    }
}
