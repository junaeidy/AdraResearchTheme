<x-mail::message>
# Order Cancelled - Payment Deadline Exceeded

Your order has been automatically cancelled because the payment deadline has passed.

**Order Number:** {{ $order->order_number }}  
**Order Date:** {{ $order->created_at->format('d M Y, H:i') }}  
**Payment Deadline:** {{ $order->payment_deadline->format('d M Y, H:i') }}  
**Amount:** Rp {{ number_format($order->total_amount, 0, ',', '.') }}

## Order Items

@if($order->items->count() > 0)
@foreach($order->items as $item)
- {{ $item->product->name }} ({{ $item->quantity }}x) - Rp {{ number_format($item->subtotal, 0, ',', '.') }}
@endforeach
@else
*No items recorded for this order*
@endif

---

**Subtotal:** Rp {{ number_format($order->subtotal, 0, ',', '.') }}  
@if($order->discount > 0)
**Discount:** -Rp {{ number_format($order->discount, 0, ',', '.') }}  
@endif
@if($order->tax > 0)
**Tax:** Rp {{ number_format($order->tax, 0, ',', '.') }}  
@endif
**Total:** Rp {{ number_format($order->total_amount, 0, ',', '.') }}

## What Happened?

Your order was automatically cancelled because payment was not completed before the deadline ({{ $order->payment_deadline->format('d M Y, H:i') }}).

## Want to Purchase Again?

You can place a new order for the same products from our store.

<x-mail::button :url="$url">
Visit Our Store
</x-mail::button>

If you have any questions or need assistance, please don't hesitate to contact our support team.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
