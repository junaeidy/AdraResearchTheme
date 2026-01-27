<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use App\Models\Order;
use App\Models\PaymentProof;
use App\Rules\SafeString;
use App\Mail\PaymentProofReceived;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaymentController extends Controller
{
    use AuthorizesRequests;
    /**
     * Show payment form.
     *
     * @param Order $order
     * @return \Inertia\Response
     */
    public function index(Order $order)
    {
        // Only order owner can view payment page
        $this->authorize('view', $order);
        
        // 🔒 Check if order is cancelled - cannot submit payment
        if ($order->status === 'cancelled') {
            return redirect()->route('orders.show', $order->order_number)
                ->with('error', 'This order has been cancelled and cannot accept payment. Please place a new order.');
        }
        
        // Check if order has expired
        if ($order->payment_deadline && $order->payment_deadline < now()) {
            return redirect()->route('orders.show', $order->order_number)
                ->with('error', 'Payment deadline has expired. Please contact support if you need assistance.');
        }
        
        // Redirect if payment already submitted
        if ($order->payment_status !== 'unpaid') {
            return redirect()->route('orders.show', $order->order_number)
                ->with('info', 'Payment proof has already been submitted for this order.');
        }
        
        $bankAccounts = BankAccount::where('is_active', true)
            ->orderBy('sort_order')
            ->get();
        
        return Inertia::render('Payment/Index', [
            'order' => $order->load('items.product'),
            'bankAccounts' => $bankAccounts,
        ]);
    }
    
    /**
     * Submit payment proof.
     *
     * @param Request $request
     * @param Order $order
     * @return \Illuminate\Http\RedirectResponse
     */
    public function submit(Request $request, Order $order)
    {
        $this->authorize('update', $order);
        
        // 🔒 Check if order is cancelled - cannot submit payment
        if ($order->status === 'cancelled') {
            return redirect()->route('orders.show', $order->order_number)
                ->with('error', 'This order has been cancelled and cannot accept payment. Please place a new order.');
        }
        
        // 🔒 Prevent double submission - check if payment proof already exists
        if ($order->paymentProof()->exists()) {
            return redirect()->route('orders.show', $order->order_number)
                ->with('error', 'Payment proof has already been submitted for this order.');
        }
        
        // 🔒 Check if order status allows payment submission
        if (!in_array($order->payment_status, ['unpaid', 'rejected'])) {
            return redirect()->route('orders.show', $order->order_number)
                ->with('error', 'This order cannot accept payment proof at this time.');
        }
        
        // 🔒 Check if payment deadline has expired
        if ($order->payment_deadline && $order->payment_deadline < now()) {
            return redirect()->route('orders.show', $order->order_number)
                ->with('error', 'Payment deadline has expired. Please contact support.');
        }
        
        $validated = $request->validate([
            'bank_account_id' => 'required|integer|exists:bank_accounts,id',
            'bank_name' => ['required', 'string', 'max:255', new SafeString()],
            'account_number' => ['required', 'string', 'max:50', 'regex:/^[a-zA-Z0-9]{6,50}$/'],
            'account_name' => ['required', 'string', 'max:255', new SafeString()],
            'transfer_amount' => 'required|numeric|min:0',
            'transfer_date' => 'required|date|before_or_equal:today',
            'proof_image' => 'required|image|mimes:jpeg,jpg,png|max:5120', // 5MB
            'notes' => ['nullable', 'string', 'max:500', new SafeString(true)],
        ]);
        
        // Upload proof image to private storage
        $path = $request->file('proof_image')->store('payment-proofs', 'private');
        
        // Create payment proof record
        $paymentProof = PaymentProof::create([
            'order_id' => $order->id,
            'bank_name' => $validated['bank_name'],
            'account_number' => $validated['account_number'],
            'account_name' => $validated['account_name'],
            'transfer_amount' => $validated['transfer_amount'],
            'transfer_date' => $validated['transfer_date'],
            'proof_image' => $path,
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);
        
        // Update order status
        $order->update([
            'bank_account_id' => $validated['bank_account_id'],
            'status' => 'awaiting_verification',
            'payment_status' => 'pending_verification',
        ]);
        
        // Send notification to admin
        $adminEmail = config('mail.admin_email', config('mail.from.address'));
        Mail::to($adminEmail)->send(new PaymentProofReceived($order, $paymentProof));
        
        return redirect()->route('orders.show', $order->order_number)
            ->with('success', 'Payment proof submitted successfully. We will verify within 24 hours.');
    }
    
    /**
     * Show payment pending page.
     *
     * @param Order $order
     * @return \Inertia\Response
     */
    public function pending(Order $order)
    {
        $this->authorize('view', $order);
        
        return Inertia::render('Payment/Pending', [
            'order' => $order->load(['items.product', 'paymentProof']),
        ]);
    }
}
