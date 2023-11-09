<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResources;
use Illuminate\Http\Request;
use App\Models\UsersModel;
use App\Mail\RegisterUser;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ApiAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $user = UsersModel::all();
        return response()->json([
            'code' => 200,
            'data' => $user
        ]);
    }
    public function registers(Request $request)
    {
        // // $request->validate([
        // //     // 'name' => 'required|string|max:255',
        // //     // // 'image' => 'required|string',
        // //     // 'dia_chi' => 'required|string|max:255',
        // //     // 'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        // //     // 'sdt' => 'required|string|max:255',
        // //     // 'cccd' => 'required|string|max:255',
        // //     // 'password' => 'required|string|min:6',
        // // ]);
        if ($request->hasFile('hinh') && $request->file('hinh')->isValid()) {
            $imagePath = uploadFile('hinh', $request->file('hinh'));
        } else {
            return response()->json(['error' => 'Invalid file or file upload failed'], 500);
        }

        $user = UsersModel::create([
            'name' => $request->name,
            'image' => $imagePath,
            'dia_chi' => $request->dia_chi,
            'email' => $request->email,
            'sdt' => $request->sdt,
            'cccd' => $request->cccd,
            'password' => Hash::make($request->password),

        ]);


        Mail::to($user->email)->send(new RegisterUser($user));

        return response()->json(['message' => 'Đăng ký tài khoản thành công!!']);
    }
}
