import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BankAccount, Order, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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
        <AuthenticatedLayout>
            <Head title={`Payment - Order #${order.order_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Complete Your Payment
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Order #{order.order_number}
                        </p>
                    </div>

                    {order.payment_deadline && (
                        <div className="mb-6">
                            <PaymentTimer deadline={order.payment_deadline} />
                        </div>
                    )}

                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Left Column - Payment Form (2/3) */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
                                {/* Bank Account Selection */}
                                <BankAccountSelector
                                    bankAccounts={bankAccounts}
                                    selectedId={data.bank_account_id ? Number(data.bank_account_id) : undefined}
                                    onSelect={(id) => setData('bank_account_id', id.toString())}
                                    error={errors.bank_account_id}
                                />

                                {/* Transfer From Details */}
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Transfer Details
                                    </h3>
                                    
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <InputLabel htmlFor="bank_name" value="Your Bank Name *" />
                                            <TextInput
                                                id="bank_name"
                                                type="text"
                                                value={data.bank_name}
                                                onChange={(e) => setData('bank_name', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="e.g., BCA, Mandiri"
                                            />
                                            <InputError message={errors.bank_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="account_number" value="Your Account Number *" />
                                            <TextInput
                                                id="account_number"
                                                type="text"
                                                value={data.account_number}
                                                onChange={(e) => setData('account_number', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Your bank account number"
                                            />
                                            <InputError message={errors.account_number} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="account_name" value="Your Account Name *" />
                                            <TextInput
                                                id="account_name"
                                                type="text"
                                                value={data.account_name}
                                                onChange={(e) => setData('account_name', e.target.value)}
                                                className="mt-1 block w-full"
                                                placeholder="Name on your bank account"
                                            />
                                            <InputError message={errors.account_name} className="mt-2" />
                                        </div>

                                        <div>
                                            <InputLabel htmlFor="transfer_date" value="Transfer Date *" />
                                            <TextInput
                                                id="transfer_date"
                                                type="date"
                                                value={data.transfer_date}
                                                onChange={(e) => setData('transfer_date', e.target.value)}
                                                max={new Date().toISOString().split('T')[0]}
                                                className="mt-1 block w-full"
                                            />
                                            <InputError message={errors.transfer_date} className="mt-2" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <InputLabel htmlFor="transfer_amount" value="Transfer Amount *" />
                                            <div className="mt-1 flex items-center">
                                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                                    Rp
                                                </span>
                                                <TextInput
                                                    id="transfer_amount"
                                                    type="text"
                                                    value={formatNumber(Number(data.transfer_amount))}
                                                    readOnly
                                                    className="rounded-l-none block w-full bg-gray-50"
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">
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
                                    <InputLabel htmlFor="notes" value="Additional Notes (Optional)" />
                                    <textarea
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        rows={3}
                                        maxLength={500}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Any additional information you'd like to share..."
                                    />
                                    <InputError message={errors.notes} className="mt-2" />
                                    <p className="text-xs text-gray-500 mt-1">
                                        {data.notes.length}/500 characters
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <div className="border-t pt-6">
                                    <PrimaryButton
                                        type="submit"
                                        disabled={processing || !isFormValid}
                                        className="w-full justify-center py-3"
                                    >
                                        {processing ? 'Submitting...' : 'Submit Payment Proof'}
                                    </PrimaryButton>
                                    
                                    {!isFormValid && (
                                        <p className="text-sm text-red-600 mt-2 text-center">
                                            Please fill in all required fields
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Order Summary & Instructions (1/3) */}
                        <div className="space-y-6">
                            {/* Order Summary */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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

                                <div className="mt-4 text-sm text-gray-600">
                                    <p className="font-medium">Items ({order.items?.length || 0}):</p>
                                    <ul className="mt-2 space-y-1">
                                        {order.items?.map((item) => (
                                            <li key={item.id} className="flex justify-between">
                                                <span className="truncate">{item.product_name}</span>
                                                <span className="ml-2 flex-shrink-0">
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
        </AuthenticatedLayout>
    );
}
