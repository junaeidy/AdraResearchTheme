import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { CartItem as CartItemType } from '@/types/models';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import CartItem from '@/Components/Cart/CartItem';
import CartSummary from '@/Components/Cart/CartSummary';
import CartEmpty from '@/Components/Cart/CartEmpty';
import { useCartStore } from '@/stores/cartStore';

interface Props {
    auth: {
        user: any;
    };
    items: CartItemType[];
    total: number;
    count: number;
}

export default function Index({ auth, items, total, count }: Props) {
    const setItems = useCartStore((state) => state.setItems);

    // Sync cart items from backend to store
    useEffect(() => {
        setItems(items);
    }, [items, setItems]);

    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <Head title="Shopping Cart" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Shopping Cart
                    </h1>

                    {items.length === 0 ? (
                        <CartEmpty />
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="lg:col-span-1">
                                <CartSummary
                                    subtotal={subtotal}
                                    total={total}
                                    itemCount={itemCount}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            <Footer />
        </div>
        </>
    );
}
