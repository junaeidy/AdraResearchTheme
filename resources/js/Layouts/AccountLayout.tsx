import { PropsWithChildren } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

interface AccountLayoutProps extends PropsWithChildren {
    title: string;
    auth: PageProps['auth'];
}

export default function AccountLayout({ children, title, auth }: AccountLayoutProps) {
    const isActive = (path: string) => {
        return window.location.pathname.startsWith(path);
    };

    const tabClass = (path: string) => {
        return isActive(path)
            ? 'border-blue-600 text-blue-600 font-medium'
            : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300';
    };

    return (
        <>
            <Head title={title} />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} />

                <div className="py-6 sm:py-8 lg:py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Page Header */}
                        <div className="mb-4 sm:mb-6 lg:mb-8">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">My Account</h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">Manage your orders, licenses, and profile</p>
                        </div>

                        {/* Tab Navigation */}
                        <div className="border-b border-gray-200 mb-4 sm:mb-6 lg:mb-8">
                            <nav className="-mb-px flex space-x-4 sm:space-x-6 lg:space-x-8">
                                <Link
                                    href="/account"
                                    className={`${window.location.pathname === '/account' ? 'border-blue-600 text-blue-600 font-medium' : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'} whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/account/orders"
                                    className={`${tabClass('/account/orders')} whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors`}
                                >
                                    Orders
                                </Link>
                                <Link
                                    href="/account/licenses"
                                    className={`${tabClass('/account/licenses')} whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors`}
                                >
                                    Licenses
                                </Link>
                                <Link
                                    href="/account/downloads"
                                    className={`${tabClass('/account/downloads')} whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors`}
                                >
                                    Downloads
                                </Link>
                                <Link
                                    href="/account/profile"
                                    className={`${tabClass('/account/profile')} whitespace-nowrap py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors`}
                                >
                                    Profile
                                </Link>
                            </nav>
                        </div>

                        {/* Page Content */}
                        <div className="mt-4 sm:mt-6 lg:mt-8">
                            {children}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
