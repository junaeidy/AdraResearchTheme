export default function TransferInstructions() {
    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Transfer Instructions
            </h3>
            
            <ol className="space-y-4">
                <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        1
                    </span>
                    <div>
                        <h4 className="font-medium text-gray-900">Transfer Exact Amount</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Transfer the exact total amount shown to the selected bank account
                        </p>
                    </div>
                </li>
                
                <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        2
                    </span>
                    <div>
                        <h4 className="font-medium text-gray-900">Take Screenshot/Photo</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Capture a clear image of your transfer receipt or bank statement showing the transaction
                        </p>
                    </div>
                </li>
                
                <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        3
                    </span>
                    <div>
                        <h4 className="font-medium text-gray-900">Upload Proof</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            Upload the payment proof image using the form on the left
                        </p>
                    </div>
                </li>
                
                <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                        4
                    </span>
                    <div>
                        <h4 className="font-medium text-gray-900">Wait for Verification</h4>
                        <p className="text-sm text-gray-600 mt-1">
                            We will verify your payment within 24 hours and send you the license keys via email
                        </p>
                    </div>
                </li>
            </ol>

            <div className="mt-6 pt-6 border-t border-blue-200">
                <h4 className="font-medium text-gray-900 mb-2">Important Notes:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>Make sure the payment proof clearly shows the amount, date, and recipient</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>The transfer amount must match exactly with your order total</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>You can add notes if you have any special circumstances</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
