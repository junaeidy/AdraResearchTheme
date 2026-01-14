<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'order_number',
        'idempotency_key',
        'subtotal',
        'tax',
        'discount',
        'total_amount',
        'status',
        'payment_status',
        'payment_method',
        'bank_account_id',
        'payment_deadline',
        'notes',
        'admin_notes',
    ];

    protected $casts = [
        'subtotal' => 'decimal:0',
        'tax' => 'decimal:0',
        'discount' => 'decimal:0',
        'total_amount' => 'decimal:0',
        'payment_deadline' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            if (empty($order->order_number)) {
                $order->order_number = self::generateOrderNumber();
            }
        });
    }

    /**
     * Generate unique order number
     */
    public static function generateOrderNumber(): string
    {
        do {
            $number = 'ORD-' . date('Ymd') . '-' . strtoupper(\Illuminate\Support\Str::random(6));
        } while (self::where('order_number', $number)->exists());

        return $number;
    }

    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function paymentProof()
    {
        return $this->hasOne(PaymentProof::class);
    }

    public function licenses()
    {
        return $this->hasMany(License::class);
    }
}
