<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NotificationModel;
use Illuminate\Http\Request;

class ApiNotificationController extends Controller
{
    //
    public function getlistNotification(){
        $notification = NotificationModel::all();
        return response()->json(['notification'=>$notification],200);
    }

    public function updateStatusNotification()
    {
        $notifications = NotificationModel::all();
        foreach ($notifications as $notification) {
           if($notification->status==0){
            $notification->status=1;
            $notification->save();
           }
        }
    
        return response()->json(['statuses' => 'Cập nhật trạng thái thành công!'], 200);
    }
}
