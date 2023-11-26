<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\contactModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ApiContactController extends Controller
{
    //
    public function sendContactForm(Request $request)
    {
       

        $contact =  contactModel::create([
            'loai_thong_tin'=> $request->get('loai_thong_tin'),
            'ho_ten'    => $request->get('ho_ten'),
            'email' => $request->get('email'),
            'sdt' => $request->get('sdt'),
            'so_khach' => $request->get('so_khach'),
            'ten_cong_ty' => $request->get('ten_cong_ty'),
            'dia_chi' => $request->get('dia_chi'),
            'tieu_de' => $request->get('tieu_de'),
            'noi_dung' => $request->get('noi_dung')
        ]);

        Mail::to('trongnam032003@gmail.com')->send(new ContactMail($contact['email'], $contact));
        return response()->json(['message' => 'Bạn đã gửi mail thành công!!']);
    }

    public function getcontact (){
        $contact = contactModel:: all();
        return response()->json(['contact'=>$contact],200);
    }
}
