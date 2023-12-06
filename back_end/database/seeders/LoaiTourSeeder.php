<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LoaiTourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('loai_tour')->insert(
            [
                [
                    'image'=>"a.jpg",
                    'ten_loai_tour' => "Miền Bắc"

                ],
                [
                    'image'=>"a.jpg",
                    'ten_loai_tour' => "Miền Trung"
                ],
                [
                    'image'=>"a.jpg",
                    'ten_loai_tour' => "Miền Nam"
                ]
            ]
        );
    }
}
