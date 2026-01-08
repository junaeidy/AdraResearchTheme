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
            className={`bg-white rounded-lg border border-gray-200 p-6 transition-opacity ${
                isRemoving ? 'opacity-50' : ''
            }`}
        >
            <div className="flex gap-6">
                {/* Product Image */}
                <Link
                    href={`/shop/${item.product.slug}`}
                    className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden hover:opacity-75 transition-opacity"
                >
                    <img
                        src={item.product.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e2e8f0" width="400" height="400"/%3E%3Ctext fill="%2364748b" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EProduct%3C/text%3E%3C/svg%3E'}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                    />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <Link
                                href={`/shop/${item.product.slug}`}
                                className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                            >
                                {item.product.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                                Version {item.product.version}
                            </p>
                        </div>
                        <button
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className="text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                            title="Remove item"
                        >
                            <svg
                                className="w-5 h-5"
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

                    <div className="grid md:grid-cols-3 gap-4">
                        {/* License Type */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                License Type
                            </label>
                            <select
                                value={item.license_type}
                                onChange={(e) =>
                                    handleLicenseTypeChange(e.target.value as LicenseType)
                                }
                                disabled={isUpdating}
                                className="w-full border-gray-300 rounded-md text-sm disabled:opacity-50"
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Duration
                            </label>
                            <select
                                value={item.license_duration}
                                onChange={(e) =>
                                    handleDurationChange(e.target.value as LicenseDuration)
                                }
                                disabled={isUpdating}
                                className="w-full border-gray-300 rounded-md text-sm disabled:opacity-50"
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
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                                Quantity
                            </label>
                            <div className="flex items-center">
                                <button
                                    onClick={() => handleQuantityChange(item.quantity - 1)}
                                    disabled={item.quantity <= 1 || isUpdating}
                                    className="px-3 py-1 border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    className="w-16 text-center border-t border-b border-gray-300 py-1 disabled:opacity-50"
                                />
                                <button
                                    onClick={() => handleQuantityChange(item.quantity + 1)}
                                    disabled={item.quantity >= 10 || isUpdating}
                                    className="px-3 py-1 border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            {formatRupiah(Number(item.price))} × {item.quantity}
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                            {formatRupiah(Number(item.price) * item.quantity)}
                        </div>
                    </div>

                    {isUpdating && (
                        <div className="mt-2 text-xs text-blue-600">
                            Updating...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
