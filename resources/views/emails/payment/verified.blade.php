<x-mail::message>
# Payment Verified Successfully! 🎉

Great news! Your payment has been verified and your licenses are now ready.

**Order Number:** {{ $order->order_number }}  
**Amount Paid:** Rp {{ number_format($order->total_amount, 0, ',', '.') }}

## Your License Keys

@foreach($licenses as $license)
**{{ $license->product->name }}**  
License Key: `{{ $license->license_key }}`  
Type: {{ ucfirst(str_replace('-', ' ', $license->type)) }}  
Duration: {{ ucfirst(str_replace('-', ' ', $license->duration)) }}  
@if($license->expires_at)
Expires: {{ $license->expires_at->format('d M Y') }}
@else
Expires: Never (Lifetime)
@endif

---
@endforeach

<x-mail::button :url="$url">
View Order & Download Products
</x-mail::button>

Thank you for your purchase! If you have any questions, feel free to contact us.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
