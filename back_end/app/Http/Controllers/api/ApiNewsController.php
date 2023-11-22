<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsModel;
use Illuminate\Http\Request;

class ApiNewsController extends Controller
{
    //
    public function index()
    {
        $news = NewsModel::all();
        return response()->json($news);
    }
    public function store(Request $request)
    {
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'không thể thêm ảnh'], 500);
        }
        $news = NewsModel::create([
            'tieu_de' => $request->tieu_de,
            'image' => $imagePath,
            'noi_dung' => $request->noi_dung,
            'ngay_dang' => $request->ngay_dang,
        ]);
        return response()->json(['message' => 'Thêm tin tức thành công']);
    }
    public function show(string $id)
    {
        $news = NewsModel::find($id);
        if (!$news) {
            return response()->json($news);
        }
        return response()->json($news);
    }

    public function update(Request $request, $id)
    {
  
        
        $news = NewsModel::find($id);

        if (!$news) {
            return response()->json(['message' => 'Không tìm thấy bài viết'], 404);
        }

        // Update 'name' field
       


        // Update image if provided
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public/hinh', $imageName); // Save image to storage
            $news->image = $imageName;
        }
        
        $news->tieu_de =$request->tieu_de;
        $news->ngay_dang =$request->ngay_dang;
        $news->noi_dung =$request->noi_dung;
        $news->save();

        return response()->json(['message' => 'Cập nhật thành công', 'data' => $news], 200);
    }
}
