@component('mail::message')
# License Activated on New Site

Your license for **{{ $license->product->name }}** has been activated on a new site.

**License Details:**
- License Key: `{{ $license->license_key }}`
- Product: {{ $license->product->name }}
- Activations: {{ $license->activated_count }} / {{ $license->max_activations }}

**Activation Details:**
- Domain: {{ $activation->domain }}
@if($activation->journal_path)
- Journal Path: {{ $activation->journal_path }}
@endif
- OJS Version: {{ $activation->ojs_version }}
- Activated At: {{ $activation->activated_at->format('F d, Y H:i:s') }}

@if($license->activated_count >= $license->max_activations)
@component('mail::panel')
⚠️ **Maximum Activations Reached**

You have reached the maximum number of activations for this license. To activate on a new site, you'll need to deactivate an existing site first.
@endcomponent
@endif

@component('mail::button', ['url' => route('licenses.show', $license)])
View License Details
@endcomponent

If you did not perform this activation, please contact support immediately.

Thanks,<br>
{{ config('app.name') }}
@endcomponent
