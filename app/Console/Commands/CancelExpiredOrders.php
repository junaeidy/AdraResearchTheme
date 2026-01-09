<?php

namespace App\Console\Commands;

use App\Models\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CancelExpiredOrders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'orders:cancel-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancel orders that have exceeded their payment deadline';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('Checking for expired orders...');

        // Find orders that are unpaid and past their payment deadline
        $expiredOrders = Order::where('payment_status', 'unpaid')
            ->whereNotNull('payment_deadline')
            ->where('payment_deadline', '<', now())
            ->whereIn('status', ['pending', 'awaiting_payment'])
            ->get();

        if ($expiredOrders->isEmpty()) {
            $this->info('No expired orders found.');
            return Command::SUCCESS;
        }

        $cancelledCount = 0;

        foreach ($expiredOrders as $order) {
            try {
                $order->update([
                    'status' => 'cancelled',
                    'payment_status' => 'expired',
                    'admin_notes' => 'Automatically cancelled due to payment deadline exceeded at ' . now()->toDateTimeString(),
                ]);

                $cancelledCount++;
                
                Log::info("Order {$order->order_number} cancelled due to expired payment deadline.", [
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'payment_deadline' => $order->payment_deadline,
                ]);

                // Optional: Send notification email to customer
                // Mail::to($order->user->email)->send(new OrderCancelledDueToExpiry($order));
            } catch (\Exception $e) {
                Log::error("Failed to cancel order {$order->order_number}: " . $e->getMessage());
                $this->error("Failed to cancel order {$order->order_number}");
            }
        }

        $this->info("Successfully cancelled {$cancelledCount} expired order(s).");

        return Command::SUCCESS;
    }
}
