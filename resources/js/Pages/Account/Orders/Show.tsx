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
    
    const canResubmitPayment = (order.payment_status === 'rejected' || order.payment_status === 'unpaid') 
        && order.status !== 'cancelled';
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

                <div className="py-8 sm:py-10 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-4 sm:mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                            <div className="min-w-0 flex-1">
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                                    Order #{order.order_number}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-600 mt-2">
                                    Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                            
                            <div className="flex gap-2 flex-shrink-0">
                                <PaymentStatusBadge status={order.payment_status} />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {canResubmitPayment && (
                        <div className="mb-4 sm:mb-6">
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="flex items-start gap-2 sm:gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-400 flex items-center justify-center text-white flex-shrink-0">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="font-bold text-sm sm:text-base text-yellow-900">
                                                {order.payment_status === 'rejected' ? 'Payment Rejected' : 'Payment Required'}
                                            </h3>
                                            <p className="text-sm text-yellow-800 mt-1 font-medium">
                                                {order.payment_status === 'rejected' 
                                                    ? 'Please review the rejection reason and submit a new payment proof'
                                                    : 'Complete your payment to process this order'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={route('payment.index', order.order_number)}
                                        className="px-4 sm:px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-500 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:scale-105 transition-transform font-medium shadow-md w-full sm:w-auto text-center"
                                    >
                                        {order.payment_status === 'rejected' ? 'Resubmit Payment' : 'Pay Now'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Success Message for Completed Orders */}
                    {showLicenses && (
                        <div className="mb-4 sm:mb-6">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-sm sm:text-base text-green-900">Order Completed!</h3>
                                        <p className="text-xs sm:text-sm text-green-800 mt-1">
                                            Your license keys have been generated and sent to your email. You can also view them below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Cancelled Order Message */}
                    {order.status === 'cancelled' && (
                        <div className="mb-4 sm:mb-6">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h3 className="font-semibold text-sm sm:text-base text-red-900">Order Cancelled</h3>
                                        <p className="text-xs sm:text-sm text-red-800 mt-1">
                                            This order has been cancelled. {order.admin_notes || 'Payment deadline has been exceeded.'}
                                        </p>
                                        <p className="text-xs sm:text-sm text-red-700 mt-2">
                                            Please place a new order if you still want to purchase these items.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                        {/* Left Column - Order Details (2/3) */}
                        <div className="lg:col-span-2 space-y-4 sm:space-y-5 lg:space-y-6">
                            {/* Timeline */}
                            <OrderStatusTimeline order={order} />

                            {/* Order Items */}
                            <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm">
                                <h3 className="text-base sm:text-[18px] font-bold text-gray-900 mb-3 sm:mb-4">
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
                        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
                            {/* Order Summary */}
                            <div className="bg-gradient-to-r from-white to-blue-50 border-2 border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-md">
                                <h3 className="text-base sm:text-[18px] font-bold text-gray-900 mb-3 sm:mb-4">
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
                                <div className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm">
                                    <h3 className="text-base sm:text-[18px] font-bold text-gray-900 mb-3 sm:mb-4">
                                        Payment Method
                                    </h3>
                                    
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <p className="text-gray-600">Bank Transfer</p>
                                            <p className="font-bold text-gray-900 mt-1">
                                                {order.bank_account.bank_name}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-600">Account Number</p>
                                            <p className="font-bold text-gray-900 mt-1">
                                                {order.bank_account.account_number}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-gray-600">Account Name</p>
                                            <p className="font-bold text-gray-900 mt-1">
                                                {order.bank_account.account_name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Customer Notes */}
                            {order.notes && (
                                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 lg:p-6">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
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
                                    className="block w-full text-center px-4 py-2 bg-white border-2 border-gray-200 text-gray-700 text-sm sm:text-base rounded-lg sm:rounded-xl hover:shadow-sm transition"
                                >
                                    ← Back to Orders
                                </Link>
                                
                                {showLicenses && (
                                    <Link
                                        href="/account/licenses"
                                        className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-base rounded-lg sm:rounded-xl hover:scale-105 transition-transform font-medium shadow-md"
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
