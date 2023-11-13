<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ApiAuthLoginController extends Controller
{
    //
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)
            ->orwhere('sdt', $request->sdt)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => "Sai tài khoản hoặc mật khẩu"
            ], 422);
        }
        $roles = $user->getRoleNames();
        $token = $user->createToken('authToken')->plainTextToken;
        // return redirect()->route('/home'); // add

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'messagee' => 'Đăng nhập thành công!!',
            'data' => $user,
            'role' => $roles
        ], 200);
    }

    public function delailUser()
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'], 404);
        }

        return response()->json(['data' => $user], 200);
    }

    public function changePassword(Request $request)
    {
        $userId = Auth::id();

        $user = User::where('id', $userId)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Mật khẩu không khớp'
            ], 422);
        }

        $success = $user->update(['password' => $request->passwordnew]);

        if ($success) {
            return response()->json([
                'message' => 'Thay đổi password thành công'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Không thể cập nhật password'
            ], 500);
        }
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return response()->json(['message' => 'Đăng xuất thành công !!'], 200);
    }
}
