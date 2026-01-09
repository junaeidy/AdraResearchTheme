<x-mail::message>
# Payment Proof Rejected

Unfortunately, we were unable to verify your payment proof for the following reason:

**Order Number:** {{ $order->order_number }}  
**Amount:** Rp {{ number_format($order->total_amount, 0, ',', '.') }}

## Rejection Reason

{{ $rejectionReason }}

## What to Do Next

Please check the rejection reason above and submit a new payment proof with the correct information.

<x-mail::button :url="$url">
Submit New Payment Proof
</x-mail::button>

If you believe this is an error or need assistance, please contact our support team.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
