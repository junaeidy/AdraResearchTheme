import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useCartStore } from '@/stores/cartStore';

interface HeaderProps {
    user?: User;
    currentPage?: 'home' | 'shop' | 'checkout' | 'about' | 'contact';
}

export default function Header({ user, currentPage = 'home' }: HeaderProps) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { count, refreshCount } = useCartStore();

    // Refresh cart count on mount
    useEffect(() => {
        refreshCount();
    }, [refreshCount]);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [currentPage]);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo - Left */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="hidden sm:block">
                                <div className="text-lg sm:text-xl lg:text-[23px] font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                                    Adra Research Theme
                                </div>
                                <div className="text-[10px] sm:text-[12px] text-gray-500 font-medium -mt-0.5">
                                    Academic Publishing Solutions
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation - Center */}
                    <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                        <Link 
                            href="/" 
                            className={`px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 ${
                                currentPage === 'home' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/shop" 
                            className={`px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 ${
                                currentPage === 'shop' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Shop
                        </Link>
                        <Link 
                            href="/about" 
                            className={`px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 ${
                                currentPage === 'about' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            About Us
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`px-4 xl:px-5 py-2 xl:py-2.5 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 ${
                                currentPage === 'contact' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Contact
                        </Link>
                    </nav>
                    
                    {/* Right Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">

                        {/* Cart Icon with Badge */}
                        <Link 
                            href="/cart" 
                            className="relative text-gray-700 hover:text-blue-600 p-2 sm:p-2.5 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                        >
                            <svg 
                                className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" 
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
                                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] sm:text-[11px] font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center shadow-lg">
                                    {count > 9 ? '9+' : count}
                                </span>
                            )}
                        </Link>
                        
                        {user ? (
                            // Authenticated User Menu
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 group"
                                >
                                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden md:block font-medium text-sm lg:text-base">{user.name}</span>
                                    <svg 
                                        className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
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
                                        <div className="absolute right-0 mt-3 w-56 sm:w-64 bg-white rounded-xl shadow-2xl py-2 z-20 border border-gray-100 overflow-hidden">
                                            <div className="px-3 sm:px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                                                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{user.name}</p>
                                                <p className="text-xs sm:text-sm text-gray-600 truncate mt-0.5">{user.email}</p>
                                                {user.role === 'admin' && (
                                                    <span className="inline-flex items-center gap-1 mt-2 px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-sm">
                                                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                                        </svg>
                                                        Administrator
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {user.role === 'admin' && (
                                                <Link
                                                    href="/admin/dashboard"
                                                    className="flex items-center gap-3 px-3 sm:px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                                                >
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
                                                    </svg>
                                                    <span>Admin Dashboard</span>
                                                </Link>
                                            )}
                                            
                                            <Link
                                                href="/account"
                                                className="flex items-center gap-3 px-3 sm:px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span>My Account</span>
                                            </Link>
                                            
                                            <div className="border-t border-gray-100 my-2"></div>
                                            
                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="flex items-center gap-3 w-full px-3 sm:px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                                            >
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span>Logout</span>
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            // Guest Links
                            <div className="hidden sm:flex items-center gap-2">
                                <Link 
                                    href="/login" 
                                    className="px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            <svg className="w-6 h-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M6 18L18 6M6 6l12 12"
                                        className="animate-in"
                                    />
                                ) : (
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M4 6h16M4 12h16M4 18h16"
                                        className="animate-in"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div 
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-gray-200 ${
                        isMobileMenuOpen 
                            ? 'max-h-[500px] opacity-100 border-t' 
                            : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="py-4 space-y-1">
                        <Link 
                            href="/" 
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                                currentPage === 'home' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/shop" 
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                                currentPage === 'shop' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Shop
                        </Link>
                        <Link 
                            href="/about" 
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                                currentPage === 'about' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            About Us
                        </Link>
                        <Link 
                            href="/contact" 
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                                currentPage === 'contact' 
                                    ? 'text-blue-600 bg-blue-50' 
                                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            Contact
                        </Link>

                        {/* Guest Links for Mobile */}
                        {!user && (
                            <div className="pt-4 mt-4 border-t border-gray-200 space-y-2">
                                <Link 
                                    href="/login" 
                                    className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link 
                                    href="/register" 
                                    className="block px-4 py-3 rounded-lg text-base font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
