<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the user's orders.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = auth()->user();
        $orders = $user->orders()
            ->with(['items.product', 'paymentProof'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('Account/Orders/Index', [
            'orders' => $orders,
        ]);
    }
    
    /**
     * Display the specified order.
     *
     * @param Order $order
     * @return \Inertia\Response
     */
    public function show(Order $order)
    {
        // Authorize that the user can view this order
        $this->authorize('view', $order);
        
        return Inertia::render('Account/Orders/Show', [
            'order' => $order->load([
                'items.product',
                'paymentProof',
                'licenses',
                'bankAccount'
            ]),
        ]);
    }

    /**
     * Serve payment proof image for the order.
     *
     * @param Order $order
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function paymentProofImage(Order $order)
    {
        // Authorize that the user can view this order
        $this->authorize('view', $order);
        
        if (!$order->paymentProof || !$order->paymentProof->proof_image) {
            abort(404, 'Payment proof not found.');
        }
        
        $path = storage_path('app/private/' . $order->paymentProof->proof_image);
        
        if (!file_exists($path)) {
            abort(404, 'Payment proof image not found.');
        }
        
        return response()->file($path);
    }
}
