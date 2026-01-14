import { useState } from 'react';
import { Product, LicenseType, LicenseDuration, LicenseTypeOption } from '@/types/models';
import { useCart } from '@/hooks/useCart';
import { formatRupiah } from '@/utils/currency';
import LicenseSelector from './LicenseSelector';
import PrimaryButton from '../PrimaryButton';

interface ProductPricingProps {
    product: Product;
    licenseTypes: LicenseTypeOption[];
}

export default function ProductPricing({ product, licenseTypes }: ProductPricingProps) {
    const [selectedType, setSelectedType] = useState<LicenseType>(licenseTypes[0]?.value || 'single-site');
    const [selectedDuration, setSelectedDuration] = useState<LicenseDuration>('1-year');
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const { addToCart, calculatePrice } = useCart();

    const price = calculatePrice(product, selectedType, selectedDuration);
    const basePrice = calculatePrice(product, selectedType, '1-year');

    const durationOptions = [
        { value: '1-year' as LicenseDuration, label: '1 Year', multiplier: 1.0 },
        { value: '2-years' as LicenseDuration, label: '2 Years', multiplier: 1.8, savings: 'Save 10%' },
        { value: 'lifetime' as LicenseDuration, label: 'Lifetime', multiplier: 2.5, savings: 'Best Value' },
    ];

    const handleAddToCart = async () => {
        setIsAdding(true);
        try {
            await addToCart(product.id, selectedType, selectedDuration, quantity);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl sm:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 shadow-lg space-y-4 sm:space-y-6">
            {/* Price Display */}
            <div className="pb-4 sm:pb-6 border-b border-blue-200">
                <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
                    <span className="text-2xl sm:text-3xl lg:text-[40px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {formatRupiah(price)}
                    </span>
                    {selectedDuration !== '1-year' && (
                        <span className="text-xs sm:text-[14px] text-gray-500 line-through">
                            {formatRupiah(basePrice * durationOptions.find(d => d.value === selectedDuration)!.multiplier)}
                        </span>
                    )}
                </div>
                {product.sale_price && (
                    <div className="mt-2 sm:mt-3">
                        <span className="inline-flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[11px] sm:text-[12px] font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-md">
                            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                            </svg>
                            ON SALE!
                        </span>
                    </div>
                )}
            </div>

            {/* License Type Selector */}
            <LicenseSelector
                licenseTypes={licenseTypes}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
            />

            {/* Duration Selector */}
            <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-[14px] font-bold text-gray-900">
                    Select Duration
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {durationOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setSelectedDuration(option.value)}
                            className={`relative p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 text-center transition-all duration-200 active:scale-95 ${
                                selectedDuration === option.value
                                    ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-md scale-105'
                                    : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                            }`}
                        >
                            <div className="text-[11px] sm:text-[13px] font-bold text-gray-900">
                                {option.label}
                            </div>
                            {option.savings && (
                                <div className="text-[10px] sm:text-[11px] text-green-600 font-semibold mt-0.5 sm:mt-1">
                                    {option.savings}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 sm:space-y-3">
                <label className="block text-xs sm:text-[14px] font-bold text-gray-900">
                    Quantity
                </label>
                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent font-bold text-gray-700 transition-all duration-200"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                        className="w-16 sm:w-20 text-center border-2 border-gray-300 rounded-lg sm:rounded-xl py-2 sm:py-2.5 font-bold text-sm sm:text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                    <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent font-bold text-gray-700 transition-all duration-200"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Total Price */}
            {quantity > 1 && (
                <div className="flex justify-between items-center text-xs sm:text-[14px] pt-3 sm:pt-4 border-t border-blue-200">
                    <span className="text-gray-600 font-semibold">Total:</span>
                    <span className="text-lg sm:text-xl lg:text-[22px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {formatRupiah(price * quantity)}
                    </span>
                </div>
            )}

            {/* Add to Cart Button */}
            <PrimaryButton
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-3 sm:py-4 text-base sm:text-lg font-semibold justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white active:scale-95"
            >
                {isAdding ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                    </span>
                ) : (
                    <span className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </span>
                )}
            </PrimaryButton>

            {/* Security Badge */}
            <div className="text-center text-[10px] sm:text-xs text-gray-500 pt-3 sm:pt-4 border-t">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout with SSL encryption
            </div>
        </div>
    );
}
