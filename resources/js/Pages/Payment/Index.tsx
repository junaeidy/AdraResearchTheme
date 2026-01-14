import { BankAccount, Order, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import BankAccountSelector from '@/Components/Payment/BankAccountSelector';
import PaymentProofUploader from '@/Components/Payment/PaymentProofUploader';
import TransferInstructions from '@/Components/Payment/TransferInstructions';
import PaymentTimer from '@/Components/Payment/PaymentTimer';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { FormEventHandler } from 'react';
import { formatRupiah, formatNumber } from '@/utils/currency';

interface Props extends PageProps {
    order: Order;
    bankAccounts: BankAccount[];
}

export default function PaymentIndex({ auth, order, bankAccounts }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        bank_account_id: '',
        bank_name: '',
        account_number: '',
        account_name: '',
        transfer_amount: order.total_amount.toString(),
        transfer_date: new Date().toISOString().split('T')[0],
        proof_image: null as File | null,
        notes: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('payment.submit', order.order_number), {
            forceFormData: true,
        });
    };

    const isFormValid = data.bank_account_id && 
                        data.bank_name && 
                        data.account_number && 
                        data.account_name && 
                        data.transfer_date && 
                        data.proof_image;

    return (
        <>
            <Head title={`Payment - Order #${order.order_number}`} />
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header user={auth?.user} />

                {/* Page Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 sm:py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white" style={{fontFamily: 'NexusSansWebPro'}}>
                                    Complete Your Payment
                                </h1>
                                <p className="text-xs sm:text-sm lg:text-[15px] text-blue-100 mt-0.5 sm:mt-1">Order #{order.order_number}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {order.payment_deadline && (
                        <div className="mb-6">
                            <PaymentTimer deadline={order.payment_deadline} />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Payment Form (2/3) */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 shadow-lg p-4 sm:p-6 space-y-5 sm:space-y-6">
                                {/* Bank Account Selection */}
                                <BankAccountSelector
                                    bankAccounts={bankAccounts}
                                    selectedId={data.bank_account_id ? Number(data.bank_account_id) : undefined}
                                    onSelect={(id) => setData('bank_account_id', id.toString())}
                                    error={errors.bank_account_id}
                                />

                                {/* Transfer From Details */}
                                <div className="border-t pt-6">
                                    <div className="flex items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                            </svg>
                                        </div>
                                        <h3 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                            Transfer Details
                                        </h3>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs sm:text-[13px] lg:text-[14px] font-bold text-gray-900 mb-1.5 sm:mb-2">Your Bank Name *</label>
                                            <input
                                                id="bank_name"
                                                type="text"
                                                value={data.bank_name}
                                                onChange={(e) => setData('bank_name', e.target.value)}
                                                className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                                                placeholder="e.g., BCA, Mandiri"
                                            />
                                            <InputError message={errors.bank_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-[13px] lg:text-[14px] font-bold text-gray-900 mb-1.5 sm:mb-2">Your Account Number *</label>
                                            <input
                                                id="account_number"
                                                type="text"
                                                value={data.account_number}
                                                onChange={(e) => setData('account_number', e.target.value)}
                                                className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                                                placeholder="Your bank account number"
                                            />
                                            <InputError message={errors.account_number} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-[13px] lg:text-[14px] font-bold text-gray-900 mb-1.5 sm:mb-2">Your Account Name *</label>
                                            <input
                                                id="account_name"
                                                type="text"
                                                value={data.account_name}
                                                onChange={(e) => setData('account_name', e.target.value)}
                                                className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                                                placeholder="Name on your bank account"
                                            />
                                            <InputError message={errors.account_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <label className="block text-xs sm:text-[13px] lg:text-[14px] font-bold text-gray-900 mb-1.5 sm:mb-2">Transfer Date *</label>
                                            <input
                                                id="transfer_date"
                                                type="date"
                                                value={data.transfer_date}
                                                onChange={(e) => setData('transfer_date', e.target.value)}
                                                max={new Date().toISOString().split('T')[0]}
                                                className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                                            />
                                            <InputError message={errors.transfer_date} className="mt-2" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs sm:text-[13px] lg:text-[14px] font-bold text-gray-900 mb-1.5 sm:mb-2">Transfer Amount *</label>
                                            <div className="flex items-center">
                                                <span className="inline-flex items-center px-4 py-3 rounded-l-xl border-2 border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-[15px] font-bold">
                                                    Rp
                                                </span>
                                                <input
                                                    id="transfer_amount"
                                                    type="text"
                                                    value={formatNumber(Number(data.transfer_amount))}
                                                    readOnly
                                                    className="rounded-l-none block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] bg-gray-50 font-bold"
                                                />
                                            </div>
                                            <p className="text-[11px] sm:text-[12px] text-gray-600 mt-2 font-medium">
                                                Amount is pre-filled and must match exactly
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Proof Upload */}
                                <div className="border-t pt-6">
                                    <PaymentProofUploader
                                        value={data.proof_image}
                                        onChange={(file) => setData('proof_image', file)}
                                        error={errors.proof_image}
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-[14px] font-bold text-gray-900 mb-2">Additional Notes (Optional)</label>
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows={3}
                                        maxLength={500}
                                        className="block w-full rounded-xl border-2 border-gray-300 px-4 py-3 text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                                        placeholder="Any additional information you'd like to share..."
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                    <p className="text-[12px] text-gray-600 mt-2 font-medium">
                                        {data.notes.length}/500 characters
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="border-t pt-4 sm:pt-6">
                                    <button
                                        type="submit"
                                        disabled={processing || !isFormValid}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm sm:text-[18px] font-bold rounded-lg sm:rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                    >
                                        {processing ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Submitting...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Submit Payment Proof
                                            </>
                                        )}
                                    </button>
                                    
                                    {!isFormValid && (
                                        <p className="text-xs sm:text-[13px] text-red-600 font-medium mt-3 text-center">
                                            Please fill in all required fields
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Order Summary & Instructions (1/3) */}
                        <div className="space-y-6 mt-4 lg:mt-0">
                            {/* Order Summary */}
                            <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl border-2 border-blue-200 shadow-lg p-3 sm:p-6">
                                <div className="flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-blue-200">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg sm:text-[20px] font-bold text-gray-900" style={{fontFamily: 'NexusSansWebPro'}}>
                                        Order Summary
                                    </h3>
                                </div>

                                <div className="space-y-2.5 sm:space-y-3 text-sm sm:text-[14px]">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600 font-medium">Subtotal</span>
                                        <span className="font-bold text-gray-900">
                                            {formatRupiah(order.subtotal)}
                                        </span>
                                    </div>
                                    
                                    {order.tax > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600 font-medium">Tax</span>
                                            <span className="font-bold text-gray-900">
                                                {formatRupiah(order.tax)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span className="font-medium">Discount</span>
                                            <span className="font-bold">
                                                - {formatRupiah(order.discount)}
                                            </span>
                                        </div>
                                    )}
                                    
                                    <div className="border-t-2 border-blue-200 pt-4 flex justify-between items-center">
                                        <span className="text-gray-900 font-bold text-[16px]">Total</span>
                                        <span className="text-[28px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                            {formatRupiah(order.total_amount)}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t-2 border-blue-200">
                                    <p className="font-bold text-sm sm:text-[14px] text-gray-900 mb-2">Items ({order.items?.length || 0}):</p>
                                    <ul className="space-y-2">
                                        {order.items?.map((item) => (
                                            <li key={item.id} className="flex justify-between items-start bg-blue-50 p-2 sm:p-3 rounded-lg">
                                                <span className="truncate text-sm sm:text-[13px] text-gray-700 font-medium">{item.product_name}</span>
                                                <span className="ml-2 flex-shrink-0 text-sm sm:text-[13px] font-bold text-blue-600">
                                                    {formatRupiah(item.price)}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Transfer Instructions */}
                            <TransferInstructions />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
        </>
    );
}
