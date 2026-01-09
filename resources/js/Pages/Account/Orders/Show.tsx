import { Order, PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import OrderStatusTimeline from '@/Components/Order/OrderStatusTimeline';
import OrderItemsList from '@/Components/Order/OrderItemsList';
import PaymentProofViewer from '@/Components/Order/PaymentProofViewer';
import PaymentStatusBadge from '@/Components/Order/PaymentStatusBadge';
import { formatRupiah } from '@/utils/currency';
import toast from 'react-hot-toast';

interface Props extends PageProps {
    order: Order;
}

export default function OrderShow({ auth, order }: Props) {
    const { flash } = usePage().props as any;
    
    const canResubmitPayment = order.payment_status === 'rejected' || order.payment_status === 'unpaid';
    const showLicenses = order.status === 'completed';
    const paymentProofImageUrl = order.payment_proof 
        ? route('orders.payment-proof', order.order_number)
        : '';

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
        if (flash?.info) {
            toast(flash.info, { icon: 'ℹ️' });
        }
    }, [flash]);

    return (
        <>
            <Head title={`Order #${order.order_number}`} />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} />

                <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Order #{order.order_number}
                                </h1>
                                <p className="text-gray-600 mt-2">
                                    Placed on {new Date(order.created_at).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            
                            <div className="flex gap-2">
                                <PaymentStatusBadge status={order.payment_status} />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {canResubmitPayment && (
                        <div className="mb-6">
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h3 className="font-semibold text-yellow-900">
                                                {order.payment_status === 'rejected' ? 'Payment Rejected' : 'Payment Required'}
                                            </h3>
                                            <p className="text-sm text-yellow-800 mt-1">
                                                {order.payment_status === 'rejected' 
                                                    ? 'Please review the rejection reason and submit a new payment proof'
                                                    : 'Complete your payment to process this order'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('payment.index', order.order_number)}
                                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                                    >
                                        {order.payment_status === 'rejected' ? 'Resubmit Payment' : 'Pay Now'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Message for Completed Orders */}
                    {showLicenses && (
                        <div className="mb-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-green-900">Order Completed!</h3>
                                        <p className="text-sm text-green-800 mt-1">
                                            Your license keys have been generated and sent to your email. You can also view them below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Order Details (2/3) */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Timeline */}
                            <OrderStatusTimeline order={order} />

                            {/* Order Items */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Items
                                </h3>
                                <OrderItemsList items={order.items || []} showLicenses={showLicenses} />
                            </div>

                            {/* Payment Proof */}
                            {order.payment_proof && paymentProofImageUrl && (
                                <PaymentProofViewer 
                                    paymentProof={order.payment_proof} 
                                    imageUrl={paymentProofImageUrl}
                                />
                            )}
                        </div>

                        {/* Right Column - Summary (1/3) */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Summary
                                </h3>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-medium text-gray-900">
                                            {formatRupiah(order.subtotal)}
                                        </span>
                                    </div>
                                    
                                    {order.tax > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax</span>
                                            <span className="font-medium text-gray-900">
                                                {formatRupiah(order.tax)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount</span>
                                            <span className="font-medium">
                                                - {formatRupiah(order.discount)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="border-t pt-3 flex justify-between">
                                        <span className="text-gray-900 font-semibold">Total</span>
                                        <span className="text-xl font-bold text-gray-900">
                                            {formatRupiah(order.total_amount)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            {order.bank_account && (
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Payment Method
                                    </h3>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-gray-600">Bank Transfer</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {order.bank_account.bank_name}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-600">Account Number</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {order.bank_account.account_number}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-600">Account Name</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {order.bank_account.account_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Customer Notes */}
                            {order.notes && (
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Notes
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {order.notes}
                                    </p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="space-y-2">
                                <Link
                                    href={route('orders.index')}
                                    className="block w-full text-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    ← Back to Orders
                                </Link>
                                
                                {showLicenses && (
                                    <Link
                                        href="/account/licenses"
                                        className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        View My Licenses
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        </>
    );
}
