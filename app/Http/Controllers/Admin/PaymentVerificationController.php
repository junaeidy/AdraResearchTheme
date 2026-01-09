<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\PaymentProof;
use App\Services\LicenseService;
use App\Mail\PaymentVerified;
use App\Mail\PaymentRejected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class PaymentVerificationController extends Controller
{
    protected $licenseService;
    
    public function __construct(LicenseService $licenseService)
    {
        $this->licenseService = $licenseService;
    }
    
    /**
     * Display a listing of all orders requiring attention.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Get all orders with all statuses
        $orders = \App\Models\Order::with(['user', 'items.product', 'paymentProof', 'bankAccount'])
            ->latest()
            ->paginate(20);
        
        // Count stats
        $stats = [
            'unpaid' => \App\Models\Order::where('payment_status', 'unpaid')->count(),
            'pending_verification' => PaymentProof::where('status', 'pending')->count(),
            'rejected' => PaymentProof::where('status', 'rejected')->count(),
        ];
        
        return Inertia::render('Admin/PaymentVerification/Index', [
            'orders' => $orders,
            'stats' => $stats,
        ]);
    }
    
    /**
     * Display the specified payment proof.
     *
     * @param Order $order
     * @return \Inertia\Response
     */
    public function show(Order $order)
    {
        $paymentProof = $order->paymentProof;
        
        if (!$paymentProof) {
            abort(404, 'Payment proof not found');
        }
        
        return Inertia::render('Admin/PaymentVerification/Show', [
            'payment' => $paymentProof->load(['order.user', 'order.items.product', 'order.bankAccount']),
        ]);
    }

    /**
     * Serve payment proof image from private storage.
     *
     * @param Order $order
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function image(Order $order)
    {
        $paymentProof = $order->paymentProof;
        
        if (!$paymentProof) {
            abort(404, 'Payment proof not found');
        }
        
        $path = storage_path('app/private/' . $paymentProof->proof_image);
        
        if (!file_exists($path)) {
            abort(404);
        }
        
        return response()->file($path);
    }
    
    /**
     * Verify a payment proof.
     *
     * @param Order $order
     * @return \Illuminate\Http\RedirectResponse
     */
    public function verify(Order $order)
    {
        $paymentProof = $order->paymentProof;
        
        if (!$paymentProof) {
            return back()->with('error', 'Payment proof not found.');
        }
        
        // Check if already verified or rejected
        if ($paymentProof->status !== 'pending') {
            return back()->with('error', 'Payment has already been ' . $paymentProof->status . '.');
        }
        
        DB::beginTransaction();
        
        try {
            // Update payment proof status
            $paymentProof->update([
                'status' => 'verified',
                'verified_by' => auth()->user()?->id,
                'verified_at' => now(),
            ]);
            
            // Update order status
            $order = $paymentProof->order;
            $order->update([
                'status' => 'processing',
                'payment_status' => 'paid',
            ]);
            
            // Generate licenses for all products in the order
            $licenses = $this->licenseService->generateFromOrder($order);
            
            // Update order to completed
            $order->update(['status' => 'completed']);
            
            // Send email to customer
            Mail::to($order->user->email)->send(new PaymentVerified($order, $licenses));
            
            DB::commit();
            
            return redirect()->route('admin.payment-verification.index');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()->withErrors(['error' => 'Failed to verify payment: ' . $e->getMessage()]);
        }
    }
    
    /**
     * Reject a payment proof.
     *
     * @param Request $request
     * @param Order $order
     * @return \Illuminate\Http\RedirectResponse
     */
    public function reject(Request $request, Order $order)
    {
        $paymentProof = $order->paymentProof;
        
        if (!$paymentProof) {
            return back()->with('error', 'Payment proof not found.');
        }
        
        // Check if already verified or rejected
        if ($paymentProof->status !== 'pending') {
            return back()->with('error', 'Payment has already been ' . $paymentProof->status . '.');
        }
        
        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);
        
        DB::beginTransaction();
        
        try {
            // Update payment proof status
            $paymentProof->update([
                'status' => 'rejected',
                'verified_by' => auth()->user()?->id,
                'verified_at' => now(),
                'rejection_reason' => $validated['rejection_reason'],
            ]);
            
            // Update order status
            $order = $paymentProof->order;
            $order->update([
                'status' => 'payment_rejected',
                'payment_status' => 'rejected',
            ]);
            
            // Send email to customer
            Mail::to($order->user->email)->send(new PaymentRejected($order, $validated['rejection_reason']));
            
            DB::commit();
            
            return redirect()->route('admin.payment-verification.index');
        } catch (\Exception $e) {
            DB::rollBack();
            
            return back()->withErrors(['error' => 'Failed to reject payment: ' . $e->getMessage()]);
        }
    }
}
