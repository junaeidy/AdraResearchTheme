<x-mail::message>
# New Payment Proof Received

A new payment proof has been submitted for verification.

**Order Number:** {{ $order->order_number }}  
**Customer:** {{ $order->user->name }} ({{ $order->user->email }})  
**Amount:** Rp {{ number_format($order->total_amount, 0, ',', '.') }}

## Transfer Details

- **From Bank:** {{ $paymentProof->bank_name }}
- **Account Number:** {{ $paymentProof->account_number }}
- **Account Name:** {{ $paymentProof->account_name }}
- **Transfer Amount:** Rp {{ number_format($paymentProof->transfer_amount, 0, ',', '.') }}
- **Transfer Date:** {{ $paymentProof->transfer_date->format('d M Y') }}

@if($paymentProof->notes)
**Customer Notes:**  
{{ $paymentProof->notes }}
@endif

<x-mail::button :url="$url">
View Payment Proof
</x-mail::button>

Please verify this payment within 24 hours.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
