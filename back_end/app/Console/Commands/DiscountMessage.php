<?php

namespace App\Console\Commands;
use Carbon\Carbon;

use Illuminate\Support\Facades\DB;
use Illuminate\Console\Command;

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
        $currentDate = Carbon::now()->toDateString();
        DB::table('discounts')
            ->whereDate('expiry_date', '<', $currentDate)
            ->delete();
    }
}
