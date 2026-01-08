import { useCartStore } from '@/stores/cartStore';
import { router } from '@inertiajs/react';
import { toast } from 'react-hot-toast';
import { LicenseType, LicenseDuration, Product } from '@/types/models';

export function useCart() {
    const store = useCartStore();

    const addToCart = async (
        productId: number,
        licenseType: LicenseType,
        licenseDuration: LicenseDuration,
        quantity: number = 1
    ) => {
        try {
            await router.post(
                '/cart/add',
                {
                    product_id: productId,
                    license_type: licenseType,
                    license_duration: licenseDuration,
                    quantity,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Product added to cart!');
                        store.refreshCount();
                    },
                    onError: (errors) => {
                        const errorMessage = Object.values(errors)[0] as string;
                        toast.error(errorMessage || 'Failed to add to cart');
                    },
                }
            );
        } catch (error) {
            toast.error('Failed to add to cart');
            console.error('Add to cart error:', error);
        }
    };

    const updateCart = async (
        itemId: number,
        updates: {
            license_type?: LicenseType;
            license_duration?: LicenseDuration;
            quantity?: number;
        }
    ) => {
        try {
            await router.patch(
                `/cart/${itemId}`,
                updates,
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.success('Cart updated!');
                        store.syncWithBackend();
                    },
                    onError: (errors) => {
                        const errorMessage = Object.values(errors)[0] as string;
                        toast.error(errorMessage || 'Failed to update cart');
                    },
                }
            );
        } catch (error) {
            toast.error('Failed to update cart');
            console.error('Update cart error:', error);
        }
    };

    const removeFromCart = async (itemId: number) => {
        try {
            await router.delete(`/cart/${itemId}`, {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Item removed from cart');
                    store.removeItem(itemId);
                    store.refreshCount();
                },
                onError: (errors) => {
                    const errorMessage = Object.values(errors)[0] as string;
                    toast.error(errorMessage || 'Failed to remove item');
                },
            });
        } catch (error) {
            toast.error('Failed to remove item');
            console.error('Remove from cart error:', error);
        }
    };

    const clearCart = async () => {
        try {
            await router.delete('/cart', {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Cart cleared');
                    store.clearCart();
                },
                onError: () => {
                    toast.error('Failed to clear cart');
                },
            });
        } catch (error) {
            toast.error('Failed to clear cart');
            console.error('Clear cart error:', error);
        }
    };

    const calculatePrice = (
        product: Product,
        licenseType: LicenseType,
        licenseDuration: LicenseDuration
    ): number => {
        const basePrice = product.sale_price ?? product.price;

        const typeMultipliers: Record<LicenseType, number> = {
            'single-site': 1.0,
            'single-journal': 0.7,
            'multi-site': 2.5,
            'multi-journal': 2.0,
            'unlimited': 4.0,
        };

        const durationMultipliers: Record<LicenseDuration, number> = {
            '1-year': 1.0,
            '2-years': 1.8,
            'lifetime': 2.5,
        };

        const typeMultiplier = typeMultipliers[licenseType] || 1.0;
        const durationMultiplier = durationMultipliers[licenseDuration] || 1.0;

        return Math.round(basePrice * typeMultiplier * durationMultiplier * 100) / 100;
    };

    return {
        items: store.items,
        count: store.count,
        total: store.total,
        isLoading: store.isLoading,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
        syncWithBackend: store.syncWithBackend,
        refreshCount: store.refreshCount,
        calculatePrice,
    };
}
