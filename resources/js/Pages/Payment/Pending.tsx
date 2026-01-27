import { Order, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { formatRupiah } from '@/utils/currency';

interface Props extends PageProps {
    order: Order;
}

export default function PaymentPending({ auth, order }: Props) {
    return (
        <>
            <Head title={`Payment Pending - Order #${order.order_number}`} />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} />

                <div className="py-8 sm:py-12">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
                        {/* Success Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 sm:p-10 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl mb-4 sm:mb-5 shadow-xl">
                                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h1 className="text-2xl sm:text-[32px] font-bold text-white mb-1 sm:mb-2">
                                Payment Proof Submitted!
                            </h1>
                            <p className="text-sm sm:text-[16px] text-blue-100 font-medium">
                                Your payment proof has been successfully submitted for verification
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-6 sm:p-8 space-y-6">
                            {/* Order Info */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-sm sm:text-[14px]">
                                    <div>
                                        <p className="text-gray-600 font-medium">Order Number</p>
                                        <p className="font-bold text-[16px] text-gray-900 mt-2">
                                            {order.order_number}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 font-medium">Total Amount</p>
                                        <p className="font-bold text-lg sm:text-[20px] bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mt-2">
                                            {formatRupiah(order.total_amount)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="font-bold text-[20px] text-gray-900 mb-5">What Happens Next?</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                                            1
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm sm:text-[16px] text-gray-900">Verification in Progress</h4>
                                            <p className="text-sm sm:text-[14px] text-gray-600 mt-1.5 sm:mt-2 font-medium">
                                                Our team will verify your payment proof within 24 hours
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 text-gray-500 rounded-lg flex items-center justify-center font-bold text-sm">
                                            2
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm sm:text-[16px] text-gray-900">License Generation</h4>
                                            <p className="text-sm sm:text-[14px] text-gray-600 mt-1.5 sm:mt-2 font-medium">
                                                Once verified, we'll automatically generate your license keys
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 sm:gap-4">
                                        <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-gray-200 text-gray-500 rounded-lg flex items-center justify-center font-bold text-sm">
                                            3
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm sm:text-[16px] text-gray-900">Email Notification</h4>
                                            <p className="text-sm sm:text-[14px] text-gray-600 mt-1.5 sm:mt-2 font-medium">
                                                You'll receive an email with your license keys and download links
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Estimated Time */}
                            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-5 shadow-md">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[16px] text-yellow-900">Estimated Verification Time</h4>
                                        <p className="text-[14px] text-yellow-800 mt-2 font-medium">
                                            Most payments are verified within a few hours during business hours. 
                                            Maximum processing time is 24 hours.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Proof Details */}
                            {order.payment_proof && (
                                <div className="border-t-2 border-gray-200 pt-6">
                                    <h3 className="font-bold text-[18px] text-gray-900 mb-4">Your Payment Details</h3>
                                    <div className="grid md:grid-cols-2 gap-4 text-[14px]">
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <p className="text-gray-600 font-medium">Transfer From</p>
                                            <p className="font-bold text-[15px] text-gray-900 mt-2">
                                                {order.payment_proof.bank_name}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <p className="text-gray-600 font-medium">Account Number</p>
                                            <p className="font-bold text-[15px] text-gray-900 mt-2">
                                                {order.payment_proof.account_number}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <p className="text-gray-600 font-medium">Transfer Date</p>
                                            <p className="font-bold text-[15px] text-gray-900 mt-2">
                                                {new Date(order.payment_proof.transfer_date).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </div>
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                                            <p className="text-gray-600 font-medium">Transfer Amount</p>
                                            <p className="font-bold text-[15px] text-gray-900 mt-2">
                                                {formatRupiah(order.payment_proof.transfer_amount)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="border-t-2 border-gray-200 pt-6 flex gap-4">
                                <Link
                                    href={route('orders.show', order.order_number)}
                                    className="flex-1 inline-flex justify-center items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[16px] font-bold rounded-xl hover:scale-105 transition-transform shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    View Order Details
                                </Link>
                                <Link
                                    href={route('home')}
                                    className="flex-1 inline-flex justify-center items-center gap-2 px-5 py-3 bg-white border-2 border-gray-300 text-gray-700 text-[16px] font-bold rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                    Back to Home
                                </Link>
                            </div>

                            {/* Support Info */}
                            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-5 text-[14px] text-gray-700">
                                <p className="font-bold text-[16px] text-gray-900 mb-2">Need Help?</p>
                                <p className="font-medium">
                                    If you have any questions or concerns, please contact our support team at{' '}
                                    <a href="mailto:support@example.com" className="text-blue-600 hover:underline font-bold">
                                        support@example.com
                                    </a>
                                </p>
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
