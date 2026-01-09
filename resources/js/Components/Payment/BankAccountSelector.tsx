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
            <label className="block text-sm font-medium text-gray-700">
                Select Bank Account *
            </label>
            
            <div className="grid gap-3">
                {bankAccounts.map((bank) => (
                    <label
                        key={bank.id}
                        className={`
                            relative flex items-start p-4 border-2 rounded-lg cursor-pointer
                            transition-all duration-200
                            ${selectedId === bank.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300 bg-white'}
                        `}
                    >
                        <input
                            type="radio"
                            name="bank_account"
                            value={bank.id}
                            checked={selectedId === bank.id}
                            onChange={() => onSelect(bank.id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        
                        <div className="ml-3 flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                {bank.logo && (
                                    <img 
                                        src={`/storage/${bank.logo}`} 
                                        alt={bank.bank_name}
                                        className="h-8 w-auto object-contain"
                                    />
                                )}
                                <span className="font-semibold text-gray-900">
                                    {bank.bank_name}
                                </span>
                            </div>
                            
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Account Number:</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-semibold text-gray-900">
                                            {bank.account_number}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => copyToClipboard(bank.account_number, bank.id)}
                                            className="text-blue-600 hover:text-blue-700 transition-colors"
                                            title="Copy account number"
                                        >
                                            {copied === bank.id ? (
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-600">Account Name:</span>
                                    <span className="font-medium text-gray-900">
                                        {bank.account_name}
                                    </span>
                                </div>
                                
                                {bank.branch && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600">Branch:</span>
                                        <span className="text-gray-900">{bank.branch}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </label>
                ))}
            </div>
            
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}
