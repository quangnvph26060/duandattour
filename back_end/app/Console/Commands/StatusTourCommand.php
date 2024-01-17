<?php

namespace App\Console\Commands;

use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class StatusTourCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:status-tour-command';

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
        $currentDate = Carbon::now()->toDateString();
        
        DB::table('tour')
            ->whereDate('lich_khoi_hanh', '<', $currentDate)
            ->orWhere('soluong', '=', 0)
            ->update(['trang_thai' => 0]);
    
        DB::table('tour')
            ->where(function ($query) use ($currentDate) {
                $query->whereDate('lich_khoi_hanh', '>=', $currentDate)
                      ->where('soluong', '>', 0);
            })
            ->update(['trang_thai' => 1]);
    }
}
