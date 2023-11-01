<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\ThanhToan;
use Illuminate\Http\Request;

class ApiPaymentController extends Controller
{
    // thanh toán vnpay
    public function vnpay_payment(Request $request)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = "http://localhost:3000/paymentResult"; // bên react
        $vnp_TmnCode = "EAJULQG0"; // Mã website tại VNPAY
        $vnp_HashSecret = "FRGFBFYWLNQEFGLSYIPFMIDTRDAOZODT"; // Chuỗi bí mật
        $vnp_TxnRef = $request->input('vnp_TxnRef'); // Mã đơn hàng (có thể thay đổi theo nhu cầu)
        $vnp_OrderInfo =  $request->input('vnp_OrderInfo'); // Thông tin đơn hàng (có thể thay đổi theo nhu cầu)
        $vnp_OrderType = $request->input('vnp_OrderType'); // Loại đơn hàng (có thể thay đổi theo nhu cầu)
        $vnp_Amount = $request->input('vnp_Amount'); // Số tiền (đơn vị: VNĐ) (có thể thay đổi theo nhu cầu)
        $vnp_Locale = 'vn'; // Ngôn ngữ hiển thị trang thanh toán
        $vnp_BankCode = 'NCB'; // Mã ngân hàng (nếu có)
        $vnp_IpAddr = $request->ip(); // Địa chỉ IP của khách hàng

        // Tạo mảng chứa dữ liệu đầu vào
        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef
        );

        // Thêm các trường tùy chọn (nếu có)
        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        // Sắp xếp dữ liệu theo thứ tự tăng dần theo khóa
        ksort($inputData);

        // Tạo chuỗi truy vấn và chuỗi hash
        $query = "";
        $hashdata = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        // Tạo URL thanh toán VNPAY
        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        // Trả về kết quả dưới dạng JSON
        $returnData = array(
            'code' => '00',
            'message' => 'success',
            'data' => $vnp_Url
        );

        if (isset($_POST['redirect'])) {
            // Chuyển hướng người dùng đến URL thanh toán VNPAY
            header('Location: ' . $vnp_Url);
            die();
        } else {
            // Trả về phản hồi JSON
            echo json_encode($returnData);
        }
    }
    // thêm Db thanh toán bằng chuyền khoản vnpay 
    //  sử dụng actions này trong route /paymentResult
    public function CreatePayment(Request $request)
    {
        $paymentData = $request->all();

        if ($paymentData['vnp_ResponseCode'] == '00') {
            // /$latestDatTour = DatTour::orderBy('id', 'desc')->first();
            $thanhToan = ThanhToan::create([
                'ma_giao_dich' => $paymentData['vnp_TxnRef'],
                'tong_tien_tt' => $paymentData['vnp_Amount'],
                'pttt' => 'transfer',
                'ma_phan_hoi' => $paymentData['vnp_ResponseCode'],
                'ghi_chu' => $paymentData['vnp_OrderInfo'],
                'ma_ngan_hang' => $paymentData['vnp_BankCode'],
                'ngay_thanh_toan' => $paymentData['vnp_PayDate'],
                'id_dat_tour' => '1', //  $latestDatTour->id or lấy từ bên react sang 
            ]);

            return response()->json($thanhToan, 201);
        }

        return response()->json(['error' => 'Payment failed'], 400);
    }
    // hiển thị  sử dụng actions này trong route /paymentResult
    public function getPaymentData(Request $request)
    {
        $paymentData = $request->all();

        $thanhToan = ThanhToan::where('ma_giao_dich', $paymentData['vnp_TxnRef'])->first();
        return response()->json($thanhToan);
    }
    // thanh toán bằng tiền mặt 
    public function CreatePaymentCash(Request $request)
    {
        $paymentData = $request->all();

        if ($paymentData['method'] == 'cash') {
            // /$latestDatTour = DatTour::orderBy('id', 'desc')->first();
            $thanhToan = ThanhToan::create([
                'ma_giao_dich' => null,
                'tong_tien_tt' => $paymentData['vnp_Amount'],
                'pttt' => 'cash',
                'ma_phan_hoi' => null,
                'ghi_chu' => $paymentData['vnp_OrderInfo'],
                'ma_ngan_hang' => null,
                'ngay_thanh_toan' => date('Y-m-d H:i:s'),
                'id_dat_tour' => '1', //  $latestDatTour->id or lấy từ bên react sang 
            ]);

            return response()->json($thanhToan, 201);
        }

        return response()->json(['error' => 'Payment failed'], 400);
    }

}
