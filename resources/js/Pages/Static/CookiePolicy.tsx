import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function CookiePolicy({ auth }: PageProps) {
    return (
        <>
            <Head title="Cookie Policy - Adra Research Theme" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} />

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden py-20">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Cookie Policy</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            How we use cookies and similar technologies
                        </p>
                        <p className="text-xs sm:text-sm text-blue-200 mt-3 sm:mt-4">Last updated: January 14, 2026</p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12">
                        <div className="prose prose-sm sm:prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="mb-10">
                                <p className="text-gray-600 leading-relaxed">
                                    This Cookie Policy explains how Adra Research Theme ("we", "us", or "our") uses cookies and 
                                    similar technologies to recognize you when you visit our website. It explains what these 
                                    technologies are, why we use them, and your rights to control our use of them.
                                </p>
                            </div>

                            {/* What Are Cookies */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">1</span>
                                    </span>
                                    What Are Cookies?
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Cookies are small text files that are placed on your computer or mobile device when you visit 
                                        a website. They are widely used to make websites work more efficiently and provide information 
                                        to website owners.
                                    </p>
                                    <p className="text-gray-600">
                                        Cookies set by the website owner (in this case, Adra Research Theme) are called "first-party 
                                        cookies". Cookies set by parties other than the website owner are called "third-party cookies".
                                    </p>
                                </div>
                            </div>

                            {/* Why We Use Cookies */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">2</span>
                                    </span>
                                    Why Do We Use Cookies?
                                </h2>
                                <div className="ml-9 sm:ml-11">
                                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                                        We use cookies for several reasons:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>To enable certain functions of the website</li>
                                        <li>To provide analytics and track website usage</li>
                                        <li>To store your preferences and settings</li>
                                        <li>To enhance security and prevent fraud</li>
                                        <li>To remember items in your shopping cart</li>
                                        <li>To improve overall user experience</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Types of Cookies */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">3</span>
                                    </span>
                                    Types of Cookies We Use
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-4 sm:space-y-6">
                                    {/* Essential Cookies */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100">
                                        <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Essential Cookies</h3>
                                                <p className="text-gray-700 mb-2">
                                                    These cookies are strictly necessary for the website to function and cannot be 
                                                    disabled in our systems. They are usually only set in response to actions made 
                                                    by you, such as setting your privacy preferences, logging in, or filling in forms.
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Examples:</strong> Session cookies, authentication cookies, security cookies
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Performance Cookies */}
                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Performance and Analytics Cookies</h3>
                                                <p className="text-gray-700 mb-2">
                                                    These cookies allow us to count visits and traffic sources so we can measure and 
                                                    improve the performance of our site. They help us understand which pages are most 
                                                    and least popular and see how visitors move around the site.
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Examples:</strong> Google Analytics, internal analytics tools
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Functionality Cookies */}
                                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Functionality Cookies</h3>
                                                <p className="text-gray-700 mb-2">
                                                    These cookies enable the website to provide enhanced functionality and 
                                                    personalization. They may be set by us or by third-party providers whose 
                                                    services we have added to our pages.
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Examples:</strong> Language preferences, theme settings, cart items
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Marketing Cookies */}
                                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-900 mb-2">Targeting and Marketing Cookies</h3>
                                                <p className="text-gray-700 mb-2">
                                                    These cookies may be set through our site by our advertising partners. They may 
                                                    be used to build a profile of your interests and show you relevant adverts on 
                                                    other sites.
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    <strong>Examples:</strong> Social media pixels, retargeting cookies
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* How to Control Cookies */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">4</span>
                                    </span>
                                    How to Control Cookies
                                </h2>
                                <div className="ml-11 space-y-3">
                                    <p className="text-gray-600">
                                        You have the right to decide whether to accept or reject cookies. You can exercise your 
                                        cookie preferences by clicking on the appropriate opt-out links in our cookie consent banner.
                                    </p>
                                    <p className="text-gray-600">
                                        You can also set or amend your web browser controls to accept or refuse cookies. The method 
                                        for doing so varies from browser to browser. Here are links to instructions for popular browsers:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies</li>
                                        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                                        <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                                        <li><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies</li>
                                    </ul>
                                    <p className="text-gray-600 mt-3">
                                        Please note that if you choose to block cookies, some parts of our website may not function 
                                        properly, and your user experience may be degraded.
                                    </p>
                                </div>
                            </div>

                            {/* Third-Party Cookies */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">5</span>
                                    </span>
                                    Third-Party Cookies
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600 mb-3">
                                        In addition to our own cookies, we may also use various third-party cookies to report usage 
                                        statistics of the website and deliver advertisements. These third-party services may include:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Google Analytics - for website analytics</li>
                                        <li>Payment processors - for secure payment processing</li>
                                        <li>Social media platforms - for social sharing features</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Updates to Policy */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">6</span>
                                    </span>
                                    Updates to This Cookie Policy
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        We may update this Cookie Policy from time to time to reflect changes in our practices or 
                                        for other operational, legal, or regulatory reasons. Please revisit this Cookie Policy 
                                        regularly to stay informed about our use of cookies.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Us */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </span>
                                    Contact Us
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600 mb-3">
                                        If you have any questions about our use of cookies, please contact us at:
                                    </p>
                                    <div className="space-y-2 text-gray-700">
                                        <p><strong>Email:</strong> privacy@adraresearchtheme.com</p>
                                        <p><strong>Address:</strong> Batusangkar, Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
