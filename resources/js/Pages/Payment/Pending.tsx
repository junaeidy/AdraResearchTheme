import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Order, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Props extends PageProps {
    order: Order;
}

export default function PaymentPending({ auth, order }: Props) {
    return (
        <AuthenticatedLayout>
            <Head title={`Payment Pending - Order #${order.order_number}`} />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        {/* Success Header */}
                        <div className="bg-blue-50 border-b border-blue-200 p-8 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                Payment Proof Submitted!
                            </h1>
                            <p className="text-gray-600">
                                Your payment proof has been successfully submitted for verification
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-6">
                            {/* Order Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">Order Number</p>
                                        <p className="font-semibold text-gray-900 mt-1">
                                            {order.order_number}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">Total Amount</p>
                                        <p className="font-semibold text-gray-900 mt-1">
                                            Rp {order.total_amount.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-4">What Happens Next?</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Verification in Progress</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Our team will verify your payment proof within 24 hours
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-semibold">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">License Generation</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Once verified, we'll automatically generate your license keys
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-shrink-0 w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center font-semibold">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">Email Notification</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                You'll receive an email with your license keys and download links
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Time */}
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h4 className="font-medium text-yellow-900">Estimated Verification Time</h4>
                                        <p className="text-sm text-yellow-800 mt-1">
                                            Most payments are verified within a few hours during business hours. 
                                            Maximum processing time is 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Proof Details */}
                            {order.payment_proof && (
                                <div className="border-t pt-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Your Payment Details</h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Transfer From</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {order.payment_proof.bank_name}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Account Number</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {order.payment_proof.account_number}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Transfer Date</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {new Date(order.payment_proof.transfer_date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Transfer Amount</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                Rp {order.payment_proof.transfer_amount.toLocaleString('id-ID')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="border-t pt-6 flex gap-3">
                                <Link
                                    href={route('orders.show', order.order_number)}
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    View Order Details
                                </Link>
                                <Link
                                    href={route('home')}
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Back to Home
                                </Link>
                            </div>

                            {/* Support Info */}
                            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                                <p className="font-medium text-gray-900 mb-2">Need Help?</p>
                                <p>
                                    If you have any questions or concerns, please contact our support team at{' '}
                                    <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                                        support@example.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
