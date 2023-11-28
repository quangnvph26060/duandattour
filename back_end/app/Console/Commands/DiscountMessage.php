<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class DiscountMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:discountmessage';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scheduling delete discount expDate';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $currentDateTime = Carbon::now()->setTimezone('Asia/Ho_Chi_Minh')->format('Y-m-d H:i:s'); // chuyển sang múi giờ chuẩn giờ hiện tại
        DB::table('discounts')
            ->where('expiry_date', '<', $currentDateTime)
            ->delete();
    }
    
}