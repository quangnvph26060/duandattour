<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\ImageModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ApiImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = ImageModel::all();
        return ImageResource::collection($images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath =   uploadFile('hinh', $request->file('hinh'));
            $request->merge(['image_path' => $imagePath]);
        }

        $image = $request->all();
        // trả về thông tin vừa thêm
        return ImageModel::create($image);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $image = ImageModel::find($id);
        if ($image) {
            return new ImageResource($image);
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
    
    $image = ImageModel::find($id);

    if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
        if ($image->image_path) {
            Storage::delete('/public/' . $image->image_path);
        }
        $imagePath = uploadFile('hinh', $request->file('hinh'));
        $request->merge(['image_path' => $imagePath]);
        // Cập nhật đường dẫn ảnh mới
        $image->image_path = $imagePath;
    }

    $image->fill($request->except('hinh'))->save();

    return response()->json($image);
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = ImageModel::find($id);
        if ($image) {
          $image->delete();
          Storage::delete('/public/' . $image->image_path);
          return  response()->json([
            'message' => 'Xóa Thành Công '
        ], 201);
        } else {
            return  response()->json([
                'message' => 'Không tìm thấy thong tin'
            ], 404);
        }
    }
}
