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
        <div className="bg-white rounded-lg border-2 border-gray-200 p-6 sticky top-4 space-y-6">
            {/* Price Display */}
            <div className="pb-6 border-b">
                <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                        {formatRupiah(price)}
                    </span>
                    {selectedDuration !== '1-year' && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                            {formatRupiah(basePrice * durationOptions.find(d => d.value === selectedDuration)!.multiplier)}
                        </span>
                    )}
                </div>
                {product.sale_price && (
                    <div className="mt-2">
                        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
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
            <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                    Select Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {durationOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setSelectedDuration(option.value)}
                            className={`relative p-3 rounded-lg border-2 text-center transition-all ${
                                selectedDuration === option.value
                                    ? 'border-blue-600 bg-blue-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="text-sm font-semibold">
                                {option.label}
                            </div>
                            {option.savings && (
                                <div className="text-xs text-green-600 font-medium mt-1">
                                    {option.savings}
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700">
                    Quantity
                </label>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        -
                    </button>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                        className="w-20 text-center border-2 border-gray-200 rounded-lg py-2 font-semibold"
                    />
                    <button
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Total Price */}
            {quantity > 1 && (
                <div className="flex justify-between items-center text-sm pt-4 border-t">
                    <span className="text-gray-600">Total:</span>
                    <span className="text-xl font-bold text-gray-900">
                        {formatRupiah(price * quantity)}
                    </span>
                </div>
            )}

            {/* Add to Cart Button */}
            <PrimaryButton
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full py-4 text-lg font-semibold justify-center"
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
            <div className="text-center text-xs text-gray-500 pt-4 border-t">
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure checkout with SSL encryption
            </div>
        </div>
    );
}
