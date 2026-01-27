import AdminLayout from '@/Layouts/AdminLayout';
import { PaymentProof, PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import RejectPaymentModal from '@/Components/Admin/RejectPaymentModal';
import { formatRupiah } from '@/utils/currency';
import toast from 'react-hot-toast';

interface Props extends PageProps {
    payment: PaymentProof & {
        order: any;
    };
}

export default function PaymentVerificationShow({ auth, payment }: Props) {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const { post, processing } = useForm({});

    const handleVerify = () => {
        if (confirm('Are you sure you want to verify this payment? This will automatically generate license keys for the customer.')) {
            post(route('admin.payment-verification.verify', payment.order.order_number), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Payment verified successfully! Licenses have been generated and sent to customer.');
                },
                onError: () => {
                    toast.error('Failed to verify payment. Please try again.');
                },
            });
        }
    };

    const imageUrl = route('admin.payment-verification.image', payment.order.order_number);

    return (
        <AdminLayout user={auth.user}>
            <Head title={`Verify Payment - Order #${payment.order.order_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <Link
                                href={route('admin.payment-verification.index')}
                                className="text-blue-600 hover:text-blue-700 flex items-center gap-2 mb-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to List
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Payment Verification
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Order #{payment.order.order_number}
                            </p>
                        </div>
                        
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                            payment.status === 'verified' 
                                ? 'bg-green-100 text-green-800' 
                                : payment.status === 'rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                        }`}>
                            {payment.status === 'verified' && (
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                            {payment.status === 'rejected' && (
                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Left Column - Order & Customer Info */}
                        <div className="space-y-6">
                            {/* Order Details */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Order Information
                                </h3>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Number</span>
                                        <span className="font-medium text-gray-900">
                                            {payment.order.order_number}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Date</span>
                                        <span className="font-medium text-gray-900">
                                            {new Date(payment.order.created_at).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Order Total</span>
                                        <span className="text-xl font-bold text-gray-900">
                                            {formatRupiah(payment.order.total_amount)}
                                        </span>
                                    </div>
                                    
                                    <div className="border-t pt-3 mt-3">
                                        <p className="text-gray-600 mb-2">Items:</p>
                                        <ul className="space-y-2">
                                            {payment.order.items?.map((item: any) => (
                                                <li key={item.id} className="flex justify-between">
                                                    <span className="text-gray-900">{item.product_name}</span>
                                                    <span className="font-medium text-gray-900">
                                                        {formatRupiah(item.price)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Details */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Customer Information
                                </h3>
                                
                                <div className="space-y-3 text-sm">
                                    <div>
                                        <p className="text-gray-600">Name</p>
                                        <p className="font-medium text-gray-900 mt-1">
                                            {payment.order.user?.name || 'N/A'}
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <p className="text-gray-600">Email</p>
                                        <p className="font-medium text-gray-900 mt-1">
                                            {payment.order.user?.email || 'N/A'}
                                        </p>
                                    </div>
                                    
                                    {payment.order.user?.organization && (
                                        <div>
                                            <p className="text-gray-600">Organization</p>
                                            <p className="font-medium text-gray-900 mt-1">
                                                {payment.order.user.organization}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Transfer Details */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Transfer Details
                                </h3>
                                
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">From Bank</span>
                                        <span className="font-medium text-gray-900">
                                            {payment.bank_name}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Account Number</span>
                                        <span className="font-medium text-gray-900">
                                            {payment.account_number}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Account Name</span>
                                        <span className="font-medium text-gray-900">
                                            {payment.account_name}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between border-t pt-3 mt-3">
                                        <span className="text-gray-600">Transfer Amount</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            {formatRupiah(payment.transfer_amount)}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Transfer Date</span>
                                        <span className="font-medium text-gray-900">
                                            {new Date(payment.transfer_date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    {/* Amount Match Check */}
                                    <div className={`
                                        mt-4 p-3 rounded-lg border
                                        ${payment.transfer_amount === payment.order.total_amount
                                            ? 'bg-green-50 border-green-200'
                                            : 'bg-red-50 border-red-200'
                                        }
                                    `}>
                                        <div className="flex items-center gap-2">
                                            {payment.transfer_amount === payment.order.total_amount ? (
                                                <>
                                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-green-800">
                                                        Amount matches order total
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-red-800">
                                                        Amount mismatch! Check carefully
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {payment.notes && (
                                    <div className="mt-4 pt-4 border-t">
                                        <p className="text-sm text-gray-600 mb-2">Customer Notes:</p>
                                        <p className="text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
                                            {payment.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Payment Proof Image */}
                        <div className="space-y-6">
                            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <div className="p-4 bg-gray-50 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Payment Proof Image</h3>
                                </div>
                                
                                <div className="p-6">
                                    <div className="relative">
                                        <img
                                            src={imageUrl}
                                            alt="Payment proof"
                                            className={`
                                                w-full rounded-lg border border-gray-300 cursor-pointer transition-transform
                                                ${isZoomed ? 'scale-150' : 'hover:scale-105'}
                                            `}
                                            onClick={() => setIsZoomed(!isZoomed)}
                                        />
                                        
                                        <button
                                            onClick={() => setIsZoomed(!isZoomed)}
                                            className="absolute top-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                                        >
                                            {isZoomed ? (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 mb-4">Verification Actions</h3>
                                
                                {payment.status === 'pending' ? (
                                    <>
                                        <PrimaryButton
                                            onClick={handleVerify}
                                            disabled={processing}
                                            className="w-full justify-center py-3"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {processing ? 'Verifying...' : 'Verify Payment & Generate Licenses'}
                                        </PrimaryButton>
                                        
                                        <DangerButton
                                            onClick={() => setShowRejectModal(true)}
                                            disabled={processing}
                                            className="w-full justify-center py-3"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            Reject Payment
                                        </DangerButton>

                                        <div className="pt-4 border-t">
                                            <p className="text-xs text-gray-500">
                                                <strong>Important:</strong> Verifying will automatically generate license keys and notify the customer via email. Make sure the payment details are correct before proceeding.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className={`p-4 rounded-lg ${
                                        payment.status === 'verified' 
                                            ? 'bg-green-50 border border-green-200' 
                                            : 'bg-red-50 border border-red-200'
                                    }`}>
                                        <div className="flex items-start gap-3">
                                            {payment.status === 'verified' ? (
                                                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                            <div className="flex-1">
                                                <p className={`font-medium ${
                                                    payment.status === 'verified' ? 'text-green-800' : 'text-red-800'
                                                }`}>
                                                    Payment {payment.status === 'verified' ? 'Verified' : 'Rejected'}
                                                </p>
                                                <p className={`text-sm mt-1 ${
                                                    payment.status === 'verified' ? 'text-green-700' : 'text-red-700'
                                                }`}>
                                                    {payment.status === 'verified' 
                                                        ? 'This payment has been verified and licenses have been generated.'
                                                        : `This payment has been rejected. Reason: ${payment.rejection_reason || 'No reason provided.'}`
                                                    }
                                                </p>
                                                {payment.verified_at && (
                                                    <p className={`text-xs mt-2 ${
                                                        payment.status === 'verified' ? 'text-green-600' : 'text-red-600'
                                                    }`}>
                                                        {payment.status === 'verified' ? 'Verified' : 'Rejected'} on {new Date(payment.verified_at).toLocaleString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reject Modal */}
            <RejectPaymentModal
                show={showRejectModal}
                onClose={() => setShowRejectModal(false)}
                paymentProofId={payment.id}
            />
        </AdminLayout>
    );
}
