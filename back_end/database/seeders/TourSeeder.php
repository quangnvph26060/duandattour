<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tour')->insert([
            'ten_tour' => "Buôn Ma Thuột - Pleiku - Kon Tum - Khu Du Lịch Măng Đen - Hồ Lăk",
            'diem_di' => 'Đà Nẵng',
            'diem_den' => 'Hà Nội',
            'lich_khoi_hanh' => '2023/12/10',
            'ngay_ket_thuc' => '2023/12/15',
            'diem_khoi_hanh' => 'Hà Nội',
            'gia_tour'=>1000,
            'mo_ta'=>'Singapore 4 ngày 3 đêm (Một ngày tự do, Tặng vé vườn thực vật Flower Dome và Supertree Observation)- Đã giảm 1.000.000/ khách',
            'image'=>"",
            'soluong' =>  3,
            'trang_thai' => '0',
            'ma_loai_tour' => '1',
         
        ]);
    }
}
