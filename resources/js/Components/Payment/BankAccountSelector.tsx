import { BankAccount } from '@/types';
import { useState } from 'react';

interface BankAccountSelectorProps {
    bankAccounts: BankAccount[];
    selectedId?: number;
    onSelect: (id: number) => void;
    error?: string;
}

export default function BankAccountSelector({ 
    bankAccounts, 
    selectedId, 
    onSelect,
    error 
}: BankAccountSelectorProps) {
    const [copied, setCopied] = useState<number | null>(null);

    const copyToClipboard = (text: string, id: number) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="space-y-3">
            <label className="block text-[14px] font-bold text-gray-900">
                Select Bank Account *
            </label>
            
            <div className="grid gap-3">
                {bankAccounts.map((bank) => (
                    <label
                        key={bank.id}
                        className={`
                            relative flex items-start p-4 sm:p-5 border-2 rounded-2xl cursor-pointer
                            transition-all duration-200
                            ${selectedId === bank.id 
                                ? 'border-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md scale-[1.02]' 
                                : 'border-gray-300 hover:border-blue-400 hover:shadow-sm bg-white'}
                        `}
                    >
                        <input
                            type="radio"
                            name="bank_account"
                            value={bank.id}
                            checked={selectedId === bank.id}
                            onChange={() => onSelect(bank.id)}
                            className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 focus:ring-2 focus:ring-blue-500 border-2 border-gray-300"
                        />
                        
                        <div className="ml-4 flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                {bank.logo && (
                                    <img 
                                        src={`/storage/${bank.logo}`} 
                                        alt={bank.bank_name}
                                        className="h-8 sm:h-10 w-auto object-contain"
                                    />
                                )}
                                <span className="font-bold text-sm sm:text-[17px] text-gray-900">
                                    {bank.bank_name}
                                </span>
                            </div>
                            
                            <div className="space-y-2 text-[14px]">
                                <div className="flex items-center justify-between bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 text-sm sm:text-[14px]">
                                    <span className="text-gray-600 font-medium">Account Number:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-gray-900">
                                            {bank.account_number}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(bank.account_number, bank.id)}
                                            className="text-blue-600 hover:text-blue-700 transition-colors p-1.5 rounded-lg hover:bg-blue-50"
                                            title="Copy account number"
                                        >
                                            {copied === bank.id ? (
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 text-sm sm:text-[14px]">
                                    <span className="text-gray-600 font-medium">Account Name:</span>
                                    <span className="font-bold text-gray-900">
                                        {bank.account_name}
                                    </span>
                                </div>
                                
                                {bank.branch && (
                                    <div className="flex items-center justify-between bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 text-sm sm:text-[14px]">
                                        <span className="text-gray-600 font-medium">Branch:</span>
                                        <span className="text-gray-900 font-medium">{bank.branch}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </label>
                ))}
            </div>
            
            {error && (
                <p className="text-[13px] text-red-600 font-medium">{error}</p>
            )}
        </div>
    );
}
