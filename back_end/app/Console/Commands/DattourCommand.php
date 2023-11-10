<?php

namespace App\Console\Commands;

use App\Models\DatTour;
use Illuminate\Console\Command;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class DattourCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:dattour-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        
     
        $currentDate = Carbon::now()->toDateString(); // Lấy ngày hiện tại
        $tours = DatTour::all(); // Lấy danh sách các tour

        foreach ($tours as $tour) {
            $expirationDate = $tour->ngay_het_han;
            if ($expirationDate < $currentDate && $tour->trang_thai == 0) {
                // Xóa tour nếu ngày hết hạn đã qua và trạng thái là 0
                $tour->delete();
            }
        }

        return 'Xóa các tour hết hạn thành công';
    
    }
}
