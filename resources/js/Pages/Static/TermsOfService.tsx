import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function TermsOfService({ auth }: PageProps) {
    return (
        <>
            <Head title="Terms of Service - Adra Research Theme" />
            
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
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Terms of Service</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Please read these terms carefully before using our services
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
                                    Welcome to Adra Research Theme. These Terms of Service ("Terms") govern your access to and use 
                                    of our website, products, and services. By accessing or using our services, you agree to be bound 
                                    by these Terms. If you do not agree to these Terms, please do not use our services.
                                </p>
                            </div>

                            {/* Acceptance of Terms */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">1</span>
                                    </span>
                                    Acceptance of Terms
                                </h2>
                                <div className="ml-9 sm:ml-11">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        By creating an account, making a purchase, or otherwise using our services, you represent that 
                                        you are at least 18 years old and have the legal capacity to enter into these Terms. If you 
                                        are using our services on behalf of an organization, you represent that you have the authority 
                                        to bind that organization to these Terms.
                                    </p>
                                </div>
                            </div>

                            {/* Account Registration */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">2</span>
                                    </span>
                                    Account Registration and Security
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        To access certain features of our services, you may need to register for an account. When 
                                        creating an account, you agree to:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Provide accurate, current, and complete information</li>
                                        <li>Maintain and promptly update your account information</li>
                                        <li>Keep your password secure and confidential</li>
                                        <li>Notify us immediately of any unauthorized use of your account</li>
                                        <li>Be responsible for all activities that occur under your account</li>
                                    </ul>
                                    <p className="text-gray-600">
                                        We reserve the right to suspend or terminate accounts that violate these Terms or are 
                                        inactive for extended periods.
                                    </p>
                                </div>
                            </div>

                            {/* Products and Services */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">3</span>
                                    </span>
                                    Products and Services
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        We offer various digital products and services for Open Journal Systems (OJS), including 
                                        themes, plugins, and customization services. By purchasing our products, you agree that:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Products are licensed, not sold, for your use</li>
                                        <li>Each license is for a single installation unless otherwise specified</li>
                                        <li>You may not resell, redistribute, or share our products</li>
                                        <li>Updates and support are provided as specified in your license</li>
                                        <li>We may modify or discontinue products at any time</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Licensing */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">4</span>
                                    </span>
                                    License Grant and Restrictions
                                </h2>
                                <div className="ml-11 space-y-3">
                                    <p className="text-gray-600">
                                        Subject to your compliance with these Terms, we grant you a limited, non-exclusive, 
                                        non-transferable license to use our products. You may not:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Modify, reverse engineer, or decompile our products</li>
                                        <li>Remove or alter any copyright notices or branding</li>
                                        <li>Use our products for unlawful purposes</li>
                                        <li>Share your license keys with others</li>
                                        <li>Use our products beyond the scope of your license</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Payment and Refunds */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">5</span>
                                    </span>
                                    Payment and Refunds
                                </h2>
                                <div className="ml-11 space-y-3">
                                    <p className="text-gray-600">
                                        All prices are in Indonesian Rupiah (IDR) and are subject to change. Payment terms:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Payment is required before product delivery</li>
                                        <li>We accept various payment methods as displayed on our website</li>
                                        <li>All sales are final for digital products</li>
                                        <li>Refunds may be provided at our discretion for valid technical issues</li>
                                        <li>Subscription renewals are automatic unless cancelled</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Intellectual Property */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">6</span>
                                    </span>
                                    Intellectual Property Rights
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        All content, features, and functionality of our website and products, including but not 
                                        limited to text, graphics, logos, icons, images, audio clips, digital downloads, and software, 
                                        are the exclusive property of Adra Research Theme and are protected by international copyright, 
                                        trademark, and other intellectual property laws.
                                    </p>
                                </div>
                            </div>

                            {/* Prohibited Activities */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">7</span>
                                    </span>
                                    Prohibited Activities
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600 mb-3">
                                        You may not use our services to:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Violate any applicable laws or regulations</li>
                                        <li>Infringe on the intellectual property rights of others</li>
                                        <li>Distribute malware or harmful code</li>
                                        <li>Engage in fraudulent activities</li>
                                        <li>Attempt to gain unauthorized access to our systems</li>
                                        <li>Interfere with the proper functioning of our services</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Disclaimers */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">8</span>
                                    </span>
                                    Disclaimers and Limitation of Liability
                                </h2>
                                <div className="ml-11 space-y-3">
                                    <p className="text-gray-600">
                                        OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER 
                                        EXPRESS OR IMPLIED. WE DO NOT GUARANTEE THAT OUR SERVICES WILL BE UNINTERRUPTED, SECURE, OR 
                                        ERROR-FREE.
                                    </p>
                                    <p className="text-gray-600">
                                        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                                        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OUR SERVICES.
                                    </p>
                                </div>
                            </div>

                            {/* Termination */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">9</span>
                                    </span>
                                    Termination
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        We reserve the right to suspend or terminate your access to our services at any time, with 
                                        or without cause or notice, for any violation of these Terms or for any other reason. Upon 
                                        termination, your right to use our services will immediately cease.
                                    </p>
                                </div>
                            </div>

                            {/* Governing Law */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">10</span>
                                    </span>
                                    Governing Law
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        These Terms shall be governed by and construed in accordance with the laws of Indonesia, 
                                        without regard to its conflict of law provisions. Any disputes arising from these Terms 
                                        shall be subject to the exclusive jurisdiction of the courts of Indonesia.
                                    </p>
                                </div>
                            </div>

                            {/* Changes to Terms */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">11</span>
                                    </span>
                                    Changes to Terms
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        We reserve the right to modify these Terms at any time. We will notify you of any material 
                                        changes by posting the updated Terms on our website and updating the "Last updated" date. 
                                        Your continued use of our services after such changes constitutes your acceptance of the 
                                        new Terms.
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
                                        If you have any questions about these Terms of Service, please contact us at:
                                    </p>
                                    <div className="space-y-2 text-gray-700">
                                        <p><strong>Email:</strong> support@adraresearchtheme.com</p>
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
