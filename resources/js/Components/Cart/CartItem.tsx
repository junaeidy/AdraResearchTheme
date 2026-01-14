import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { CartItem as CartItemType, LicenseType, LicenseDuration } from '@/types/models';
import { useCart } from '@/hooks/useCart';
import { formatRupiah } from '@/utils/currency';

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const { updateCart, removeFromCart, calculatePrice } = useCart();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const handleLicenseTypeChange = async (newType: LicenseType) => {
        setIsUpdating(true);
        try {
            await updateCart(item.id, { license_type: newType });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDurationChange = async (newDuration: LicenseDuration) => {
        setIsUpdating(true);
        try {
            await updateCart(item.id, { license_duration: newDuration });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleQuantityChange = async (newQuantity: number) => {
        if (newQuantity < 1 || newQuantity > 10) return;
        setIsUpdating(true);
        try {
            await updateCart(item.id, { quantity: newQuantity });
        } finally {
            setIsUpdating(false);
        }
    };

    const handleRemove = async () => {
        if (confirm('Are you sure you want to remove this item from your cart?')) {
            setIsRemoving(true);
            await removeFromCart(item.id);
        }
    };

    const licenseTypeOptions = [
        { value: 'single-site' as LicenseType, label: 'Single Site' },
        { value: 'single-journal' as LicenseType, label: 'Single Journal' },
        { value: 'multi-site' as LicenseType, label: 'Multi Site (5)' },
        { value: 'multi-journal' as LicenseType, label: 'Multi Journal (5)' },
        { value: 'unlimited' as LicenseType, label: 'Unlimited' },
    ];

    const durationOptions = [
        { value: '1-year' as LicenseDuration, label: '1 Year' },
        { value: '2-years' as LicenseDuration, label: '2 Years' },
        { value: 'lifetime' as LicenseDuration, label: 'Lifetime' },
    ];

    return (
        <div
            className={`bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 ${
                isRemoving ? 'opacity-50' : ''
            }`}
        >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Product Image */}
                <Link
                    href={`/shop/${item.product.slug}`}
                    className="flex-shrink-0 w-full sm:w-32 lg:w-36 h-32 sm:h-32 lg:h-36 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-transform duration-300 shadow-md"
                >
                    <img
                        src={item.product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e2e8f0" width="400" height="400"/%3E%3Ctext fill="%2364748b" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProduct%3C/text%3E%3C/svg%3E'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                            <Link
                                href={`/shop/${item.product.slug}`}
                                className="text-base sm:text-lg lg:text-[19px] font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2" style={{fontFamily: 'NexusSansWebPro'}}
                            >
                                {item.product.name}
                            </Link>
                            <div className="flex items-center gap-2 mt-1.5 sm:mt-2">
                                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                                    </svg>
                                    Version {item.product.version}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg sm:rounded-xl bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-700 active:scale-95 transition-all duration-200 disabled:opacity-50 flex-shrink-0"
                            title="Remove item"
                        >
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                        {/* License Type */}
                        <div>
                            <label className="block text-xs sm:text-[13px] font-bold text-gray-900 mb-1.5 sm:mb-2">
                                License Type
                            </label>
                            <select
                                value={item.license_type}
                                onChange={(e) =>
                                    handleLicenseTypeChange(e.target.value as LicenseType)
                                }
                                disabled={isUpdating}
                                className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-[14px] py-2 sm:py-2.5 px-2.5 sm:px-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50 font-medium"
                            >
                                {licenseTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-xs sm:text-[13px] font-bold text-gray-900 mb-1.5 sm:mb-2">
                                Duration
                            </label>
                            <select
                                value={item.license_duration}
                                onChange={(e) =>
                                    handleDurationChange(e.target.value as LicenseDuration)
                                }
                                disabled={isUpdating}
                                className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-[14px] py-2 sm:py-2.5 px-2.5 sm:px-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50 font-medium"
                            >
                                {durationOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-xs sm:text-[13px] font-bold text-gray-900 mb-1.5 sm:mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-1.5 sm:gap-2">
                                <button
                                    onClick={() => handleQuantityChange(item.quantity - 1)}
                                    disabled={item.quantity <= 1 || isUpdating}
                                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg sm:rounded-xl hover:border-blue-600 hover:bg-blue-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent font-bold text-gray-700 transition-all duration-200"
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleQuantityChange(parseInt(e.target.value) || 1)
                                    }
                                    disabled={isUpdating}
                                    className="w-14 sm:w-16 text-center border-2 border-gray-300 rounded-lg sm:rounded-xl py-1.5 sm:py-2 font-bold text-sm sm:text-[15px] focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all disabled:opacity-50"
                                />
                                <button
                                    onClick={() => handleQuantityChange(item.quantity + 1)}
                                    disabled={item.quantity >= 10 || isUpdating}
                                    className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center border-2 border-gray-300 rounded-lg sm:rounded-xl hover:border-blue-600 hover:bg-blue-50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-transparent font-bold text-gray-700 transition-all duration-200"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
                        <div className="text-xs sm:text-[14px] text-gray-600 font-medium">
                            {formatRupiah(Number(item.price))} × {item.quantity}
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-[26px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            {formatRupiah(Number(item.price) * item.quantity)}
                        </div>
                    </div>

                    {isUpdating && (
                        <div className="mt-2 sm:mt-3 flex items-center gap-2 text-xs sm:text-[13px] text-blue-600 font-semibold">
                            <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Updating...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
