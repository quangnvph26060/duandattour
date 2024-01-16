<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\LogoModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApiLogoController extends Controller
{
    //
    public function index()
    {
        $logo = LogoModel::all();
        return response()->json($logo);
    }
    public function store(Request $request)
    {
       if ($request->hasFile('hinh_logo') && $request->file('hinh_logo')->isValid()) {
            $imageLogo = uploadFile('hinh_logo', $request->file('hinh_logo'));
        } else {
            return response()->json(['error' => 'không thể thêm ảnh'], 500);
        }
        $AddLogo = LogoModel::create([
            
            'image_logo' => $imageLogo,
    
        ]);
        return response()->json(['message' => 'Thêm ảnh logo thành công']);
    }
    public function show(string $id){
        $logo=LogoModel::find($id);
        if (!$logo) {
            return response()->json($logo);
        }
        return response()->json($logo);
    }
    public function update(Request $request, string $id){
        
            $update_logo = LogoModel::find($id);
    
            if (!$update_logo) {
                return response()->json(['message' => 'Không tìm thấy đối tượng PostDmModel'], 404);
            }
    
            // Kiểm tra và xử lý nếu có file ảnh được gửi lên
            if ($request->hasFile('image_logo')) {
                $image = $request->file('image_logo');
    
                // Xóa ảnh hiện tại nếu có
                if ($update_logo->image) {
                    Storage::disk('public')->delete($update_logo->image);
                }
    
                // Lưu trữ ảnh mới vào thư mục 'images' trong 'public'
                $imagePath = $image->store('hinh_logo', 'public');
    
                // Cập nhật đường dẫn ảnh trong cơ sở dữ liệu
                $update_logo->image = $imagePath;
            }
    
            // Cập nhật các trường dữ liệu khác nếu có
            
    
            // Lưu các thay đổi vào cơ sở dữ liệu
            $update_logo->save();
            return response()->json(['message' => 'Cập nhật thành công']);
        }
    public function destroy(string $id){
        $delete_logo=LogoModel::find($id);
        if(!$delete_logo){
            return response()->json([
                'message'=>'Không tìm thấy '
            ],404);
        }
        return $delete_logo->delete();


    }
}