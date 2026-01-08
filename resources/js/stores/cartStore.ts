import { create } from 'zustand';
import { CartItem } from '@/types/models';
import axios from 'axios';

interface CartStore {
    items: CartItem[];
    count: number;
    total: number;
    isLoading: boolean;
    
    // Actions
    setItems: (items: CartItem[]) => void;
    addItem: (item: CartItem) => void;
    updateItem: (id: number, updates: Partial<CartItem>) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    syncWithBackend: () => Promise<void>;
    refreshCount: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    count: 0,
    total: 0,
    isLoading: false,

    setItems: (items) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        set({ items, total, count });
    },

    addItem: (item) => {
        const { items } = get();
        const existingIndex = items.findIndex(
            (i) =>
                i.product_id === item.product_id &&
                i.license_type === item.license_type &&
                i.license_duration === item.license_duration
        );

        let newItems;
        if (existingIndex >= 0) {
            // Update quantity if item exists
            newItems = [...items];
            newItems[existingIndex] = {
                ...newItems[existingIndex],
                quantity: newItems[existingIndex].quantity + item.quantity,
            };
        } else {
            // Add new item
            newItems = [...items, item];
        }

        const total = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const count = newItems.reduce((sum, i) => sum + i.quantity, 0);
        set({ items: newItems, total, count });
    },

    updateItem: (id, updates) => {
        const { items } = get();
        const newItems = items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        );
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = newItems.reduce((sum, item) => sum + item.quantity, 0);
        set({ items: newItems, total, count });
    },

    removeItem: (id) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== id);
        const total = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const count = newItems.reduce((sum, item) => sum + item.quantity, 0);
        set({ items: newItems, total, count });
    },

    clearCart: () => {
        set({ items: [], total: 0, count: 0 });
    },

    syncWithBackend: async () => {
        try {
            set({ isLoading: true });
            const response = await axios.get('/cart');
            const items = response.data.items || [];
            get().setItems(items);
        } catch (error) {
            console.error('Failed to sync cart with backend:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    refreshCount: async () => {
        try {
            const response = await axios.get('/cart/count');
            set({ count: response.data.count || 0 });
        } catch (error) {
            console.error('Failed to refresh cart count:', error);
        }
    },
}));
