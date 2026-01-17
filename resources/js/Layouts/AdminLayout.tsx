import { PropsWithChildren, ReactNode, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { User } from '@/types';
import {
    HomeIcon,
    ShoppingBagIcon,
    TagIcon,
    BanknotesIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    KeyIcon,
    ChatBubbleLeftRightIcon,
    TicketIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

interface AdminLayoutProps extends PropsWithChildren {
    user: User;
    header?: ReactNode;
}

interface NavItem {
    name: string;
    href: string;
    icon: typeof HomeIcon;
    current?: boolean;
}

export default function AdminLayout({ user, header, children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation: NavItem[] = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: HomeIcon },
        { name: 'Products', href: '/admin/products', icon: ShoppingBagIcon },
        { name: 'Categories', href: '/admin/categories', icon: TagIcon },
        { name: 'Orders & Payments', href: '/admin/payment-verification', icon: BanknotesIcon },
        { name: 'Licenses', href: '/admin/licenses', icon: KeyIcon },
        { name: 'Discount Codes', href: '/admin/discount-codes', icon: TicketIcon },
        { name: 'Bank Accounts', href: '/admin/bank-accounts', icon: BanknotesIcon },
        { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
        { name: 'Reviews', href: '/admin/reviews', icon: ChatBubbleLeftRightIcon },
        { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
        { name: 'API Tokens', href: '/admin/api-tokens', icon: KeyIcon },
    ];

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                toast.success('Logged out successfully.');
            },
            onError: () => {
                toast.error('An error occurred while logging out.');
            },
        });
    };

    return (
        <>
            <Head title="Admin Panel" />
            
            <div className="min-h-screen bg-gray-100">
                {/* Mobile sidebar backdrop */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <div
                    className={`
                        fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white
                        transform transition-transform duration-300 ease-in-out
                        lg:translate-x-0
                        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    `}
                >
                    <div className="flex flex-col h-full">
                        {/* Logo */}
                        <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
                            <Link href="/admin/dashboard" className="text-xl font-bold">
                                Adra Admin
                            </Link>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="lg:hidden"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            {navigation.map((item) => {
                                const isActive = window.location.pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            flex items-center px-4 py-3 text-sm font-medium rounded-lg
                                            transition-colors
                                            ${
                                                isActive
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }
                                        `}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User info & logout */}
                        <div className="border-t border-gray-800 p-4">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium">{user.name}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg transition"
                            >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:pl-64">
                    {/* Top bar */}
                    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden"
                            >
                                <Bars3Icon className="w-6 h-6 text-gray-600" />
                            </button>

                            {header && (
                                <div className="flex-1">
                                    {header}
                                </div>
                            )}

                            <div className="flex items-center gap-4">
                                <Link
                                    href="/"
                                    className="text-sm text-gray-600 hover:text-gray-900"
                                >
                                    View Site
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Page content */}
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
