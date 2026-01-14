export default function TransferInstructions() {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h3 className="text-[20px] font-bold text-gray-900">
                    Transfer Instructions
                </h3>
            </div>
            
            <ol className="space-y-4">
                <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-[16px] shadow-md">
                        1
                    </span>
                    <div>
                        <h4 className="font-bold text-[16px] text-gray-900">Transfer Exact Amount</h4>
                        <p className="text-[14px] text-gray-600 mt-1 font-medium">
                            Transfer the exact total amount shown to the selected bank account
                        </p>
                    </div>
                </li>
                
                <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-[16px] shadow-md">
                        2
                    </span>
                    <div>
                        <h4 className="font-bold text-[16px] text-gray-900">Take Screenshot/Photo</h4>
                        <p className="text-[14px] text-gray-600 mt-1 font-medium">
                            Capture a clear image of your transfer receipt or bank statement showing the transaction
                        </p>
                    </div>
                </li>
                
                <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-[16px] shadow-md">
                        3
                    </span>
                    <div>
                        <h4 className="font-bold text-[16px] text-gray-900">Upload Proof</h4>
                        <p className="text-[14px] text-gray-600 mt-1 font-medium">
                            Upload the payment proof image using the form on the left
                        </p>
                    </div>
                </li>
                
                <li className="flex gap-4">
                    <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-[16px] shadow-md">
                        4
                    </span>
                    <div>
                        <h4 className="font-bold text-[16px] text-gray-900">Wait for Verification</h4>
                        <p className="text-[14px] text-gray-600 mt-1 font-medium">
                            We will verify your payment within 24 hours and send you the license keys via email
                        </p>
                    </div>
                </li>
            </ol>

            <div className="mt-6 pt-6 border-t-2 border-blue-300">
                <h4 className="font-bold text-[16px] text-gray-900 mb-3">Important Notes:</h4>
                <ul className="space-y-3 text-[14px] text-gray-700">
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">Make sure the payment proof clearly shows the amount, date, and recipient</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">The transfer amount must match exactly with your order total</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="font-medium">You can add notes if you have any special circumstances</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
