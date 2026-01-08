import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useCartStore } from '@/stores/cartStore';

interface HeaderProps {
    user?: User;
    currentPage?: 'home' | 'shop';
}

export default function Header({ user, currentPage = 'home' }: HeaderProps) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { count, refreshCount } = useCartStore();

    // Refresh cart count on mount
    useEffect(() => {
        refreshCount();
    }, [refreshCount]);

    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        Adra Research Theme
                    </Link>
                    
                    <nav className="flex items-center space-x-4">
                        <Link 
                            href="/" 
                            className={`hover:text-gray-900 ${
                                currentPage === 'home' 
                                    ? 'text-gray-900 font-medium' 
                                    : 'text-gray-700'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/shop" 
                            className={`hover:text-gray-900 ${
                                currentPage === 'shop' 
                                    ? 'text-gray-900 font-medium' 
                                    : 'text-gray-700'
                            }`}
                        >
                            Shop
                        </Link>

                        {/* Cart Icon with Badge */}
                        <Link 
                            href="/cart" 
                            className="relative text-gray-700 hover:text-gray-900 p-2"
                        >
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                                />
                            </svg>
                            {count > 0 && (
                                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                                    {count > 9 ? '9+' : count}
                                </span>
                            )}
                        </Link>
                        
                        {user ? (
                            // Authenticated User Menu
                            <div className="relative ml-4">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-medium">{user.name}</span>
                                    <svg 
                                        className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {isUserMenuOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <div 
                                            className="fixed inset-0 z-10"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        />
                                        
                                        {/* Menu */}
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20 border border-gray-200">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                                {user.role === 'admin' && (
                                                    <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                                                        Admin
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {user.role === 'admin' && (
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                My Dashboard
                                            </Link>
                                            
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Profile Settings
                                            </Link>
                                            
                                            <div className="border-t border-gray-200 my-1"></div>
                                            
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Logout
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            // Guest Links
                            <>
                                <Link 
                                    href="/login" 
                                    className="text-gray-700 hover:text-gray-900"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
