<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\NewsModel;
use Illuminate\Http\Request;

class ApiNewsController extends Controller
{
    //
    public function index(){
        $news=NewsModel::all();
        return response()->json($news);
    }
    public function store(Request $request){
        if($request->hasFile('hinh') && $request->file('hinh')->isValid()){
            $imagePath=uploadFile('hinh',$request->file('hinh'));
        }else{
            return response()->json(['error' => 'không thể thêm ảnh'],500);
        }
        $news=NewsModel::create([
            'tieu_de'=>$request->tieu_de,
            'image'=>$imagePath,
            'noi_dung'=>$request->noi_dung,
            'ngay_dang'=>$request->ngay_dang,
        ]);
        return response()->json(['message'=>'Thêm tin tức thành công']);
    }
    public function show(string $id){
        $news=NewsModel::find($id);
        if(!$news){
            return response()->json($news);
        }
        return response()->json($news);
    }
    public function update(Request $request, string $id)
    {
        //
        $news = NewsModel::find($id);
        if (!$news) {
            return response()->json(['message' => 'Không tìm thấy  bài viết'], 404);
        }
        $news->data = $request->input('data', $news->data);

        // Xử lý ảnh nếu có
        if ($request->hasFile('image')) {
            // Lưu ảnh vào thư mục public/uploads (bạn có thể tùy chỉnh đường dẫn)
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('hinh'), $imageName);

            // Lưu tên ảnh vào trường image
            $news->image = $imageName;
        }

        // Lưu các thay đổi
        $news->save();

        return response()->json(['message' => 'Update successful'], 200);
        return $news->update($request->all());
    }
    public function destroy(string $id)
    {
        $news=NewsModel::find($id);
        if (!$news) {
            return response()->json([
                'message' => 'Không tìm thấy bài viết '
            ], 404);
        }
        return $news->delete();
    }
}
