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
            
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <Header user={auth?.user} />

            {/* Page Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold text-white" style={{fontFamily: 'NexusSansWebPro'}}>
                                Shopping Cart
                            </h1>
                            <p className="text-xs sm:text-sm lg:text-[15px] text-blue-100 mt-0.5 sm:mt-1">Review your items and proceed to checkout</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6 sm:py-8 lg:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {items.length === 0 ? (
                        <CartEmpty />
                    ) : (
                        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
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
