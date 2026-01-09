import { PaymentProof } from '@/types';
import { useState } from 'react';

interface PaymentProofViewerProps {
    paymentProof: PaymentProof;
    imageUrl: string;
}

export default function PaymentProofViewer({ paymentProof, imageUrl }: PaymentProofViewerProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Payment Proof</h3>
            </div>
            
            <div className="p-6 space-y-4">
                {/* Transfer Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-600">Transfer From</p>
                        <p className="font-medium text-gray-900 mt-1">{paymentProof.bank_name}</p>
                    </div>
                    
                    <div>
                        <p className="text-gray-600">Account Number</p>
                        <p className="font-medium text-gray-900 mt-1">{paymentProof.account_number}</p>
                    </div>
                    
                    <div>
                        <p className="text-gray-600">Account Name</p>
                        <p className="font-medium text-gray-900 mt-1">{paymentProof.account_name}</p>
                    </div>
                    
                    <div>
                        <p className="text-gray-600">Transfer Amount</p>
                        <p className="font-medium text-gray-900 mt-1">
                            Rp {paymentProof.transfer_amount.toLocaleString('id-ID')}
                        </p>
                    </div>
                    
                    <div>
                        <p className="text-gray-600">Transfer Date</p>
                        <p className="font-medium text-gray-900 mt-1">
                            {new Date(paymentProof.transfer_date).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                    
                    <div>
                        <p className="text-gray-600">Status</p>
                        <span className={`
                            inline-block px-2 py-1 rounded text-xs font-medium mt-1
                            ${paymentProof.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                            ${paymentProof.status === 'verified' ? 'bg-green-100 text-green-800' : ''}
                            ${paymentProof.status === 'rejected' ? 'bg-red-100 text-red-800' : ''}
                        `}>
                            {paymentProof.status.charAt(0).toUpperCase() + paymentProof.status.slice(1)}
                        </span>
                    </div>
                </div>

                {paymentProof.notes && (
                    <div>
                        <p className="text-sm text-gray-600">Notes from Customer</p>
                        <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded-lg">
                            {paymentProof.notes}
                        </p>
                    </div>
                )}

                {/* Payment Proof Image */}
                <div>
                    <p className="text-sm text-gray-600 mb-2">Proof Image</p>
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
                            title={isZoomed ? 'Zoom out' : 'Zoom in'}
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

                        <a
                            href={imageUrl}
                            download
                            className="absolute bottom-2 right-2 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
                            title="Download image"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
