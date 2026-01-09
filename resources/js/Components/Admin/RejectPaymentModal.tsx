import { useState, FormEventHandler } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';

interface RejectPaymentModalProps {
    show: boolean;
    onClose: () => void;
    paymentProofId: number;
}

export default function RejectPaymentModal({ show, onClose, paymentProofId }: RejectPaymentModalProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        rejection_reason: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        post(route('admin.payment-verification.reject', paymentProofId), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={handleClose} maxWidth="lg">
            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">
                            Reject Payment Proof
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Please provide a reason for rejecting this payment
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <InputLabel htmlFor="rejection_reason" value="Rejection Reason *" />
                    <textarea
                        id="rejection_reason"
                        value={data.rejection_reason}
                        onChange={(e) => setData('rejection_reason', e.target.value)}
                        rows={4}
                        maxLength={500}
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-red-500 focus:ring-red-500"
                        placeholder="e.g., Transfer amount doesn't match, unclear image, wrong account number..."
                    />
                    <InputError message={errors.rejection_reason} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">
                        {data.rejection_reason.length}/500 characters
                    </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <div className="text-sm text-yellow-800">
                            <p className="font-medium">Important:</p>
                            <p className="mt-1">
                                The customer will be notified via email and can resubmit their payment proof. 
                                Please be clear and specific in your rejection reason.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3">
                    <SecondaryButton type="button" onClick={handleClose}>
                        Cancel
                    </SecondaryButton>
                    <DangerButton type="submit" disabled={processing || !data.rejection_reason.trim()}>
                        {processing ? 'Rejecting...' : 'Reject Payment'}
                    </DangerButton>
                </div>
            </form>
        </Modal>
    );
}
