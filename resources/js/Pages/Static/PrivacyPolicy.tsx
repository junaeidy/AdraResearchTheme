import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function PrivacyPolicy({ auth }: PageProps) {
    return (
        <>
            <Head title="Privacy Policy - Adra Research Theme" />
            
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
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Privacy Policy</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Your privacy is important to us
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
                                    At Adra Research Theme, we are committed to protecting your privacy and ensuring the security 
                                    of your personal information. This Privacy Policy explains how we collect, use, disclose, and 
                                    safeguard your information when you visit our website or use our services.
                                </p>
                            </div>

                            {/* Information We Collect */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">1</span>
                                    </span>
                                    Information We Collect
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3 sm:space-y-4">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Personal Information</h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            We may collect personal information that you voluntarily provide to us when you:
                                        </p>
                                        <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mt-2 space-y-1">
                                            <li>Register for an account</li>
                                            <li>Make a purchase</li>
                                            <li>Subscribe to our newsletter</li>
                                            <li>Contact us for support</li>
                                            <li>Participate in surveys or promotions</li>
                                        </ul>
                                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                                            This information may include: name, email address, billing address, payment information, 
                                            and any other information you choose to provide.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Automatic Information</h3>
                                        <p className="text-sm sm:text-base text-gray-600">
                                            When you visit our website, we automatically collect certain information about your device, 
                                            including information about your web browser, IP address, time zone, and some of the cookies 
                                            installed on your device.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* How We Use Your Information */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">2</span>
                                    </span>
                                    How We Use Your Information
                                </h2>
                                <div className="ml-9 sm:ml-11">
                                    <p className="text-sm sm:text-base text-gray-600 mb-3">
                                        We use the information we collect in various ways, including to:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Process and fulfill your orders</li>
                                        <li>Provide customer support and respond to your inquiries</li>
                                        <li>Send you updates about your orders and account</li>
                                        <li>Improve and optimize our website and services</li>
                                        <li>Send you marketing communications (with your consent)</li>
                                        <li>Detect and prevent fraud or security issues</li>
                                        <li>Comply with legal obligations</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Information Sharing */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">3</span>
                                    </span>
                                    Information Sharing and Disclosure
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600 mb-3">
                                        We may share your personal information with third parties in the following situations:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>With service providers who assist us in operating our website and business</li>
                                        <li>With payment processors to process your transactions</li>
                                        <li>To comply with legal requirements or respond to lawful requests</li>
                                        <li>To protect our rights, privacy, safety, or property</li>
                                        <li>In connection with a business transfer or merger</li>
                                    </ul>
                                    <p className="text-gray-600 mt-3">
                                        We do not sell your personal information to third parties for their marketing purposes.
                                    </p>
                                </div>
                            </div>

                            {/* Data Security */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">4</span>
                                    </span>
                                    Data Security
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        We implement appropriate technical and organizational security measures to protect your 
                                        personal information against unauthorized access, alteration, disclosure, or destruction. 
                                        However, no method of transmission over the Internet or electronic storage is 100% secure, 
                                        and we cannot guarantee absolute security.
                                    </p>
                                </div>
                            </div>

                            {/* Your Rights */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">5</span>
                                    </span>
                                    Your Rights
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600 mb-3">
                                        Depending on your location, you may have the following rights regarding your personal information:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                                        <li>Access to your personal information</li>
                                        <li>Correction of inaccurate data</li>
                                        <li>Deletion of your personal information</li>
                                        <li>Restriction of processing</li>
                                        <li>Data portability</li>
                                        <li>Objection to processing</li>
                                        <li>Withdrawal of consent</li>
                                    </ul>
                                    <p className="text-gray-600 mt-3">
                                        To exercise these rights, please contact us using the information provided below.
                                    </p>
                                </div>
                            </div>

                            {/* Cookies */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">6</span>
                                    </span>
                                    Cookies and Tracking Technologies
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        We use cookies and similar tracking technologies to track activity on our website and hold 
                                        certain information. You can instruct your browser to refuse all cookies or to indicate when 
                                        a cookie is being sent. For more information, please see our Cookie Policy.
                                    </p>
                                </div>
                            </div>

                            {/* Third-Party Links */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">7</span>
                                    </span>
                                    Third-Party Links
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        Our website may contain links to third-party websites. We are not responsible for the privacy 
                                        practices or content of these third-party sites. We encourage you to read the privacy policies 
                                        of any third-party sites you visit.
                                    </p>
                                </div>
                            </div>

                            {/* Children's Privacy */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">8</span>
                                    </span>
                                    Children's Privacy
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        Our services are not intended for children under the age of 13. We do not knowingly collect 
                                        personal information from children under 13. If you are a parent or guardian and believe your 
                                        child has provided us with personal information, please contact us.
                                    </p>
                                </div>
                            </div>

                            {/* Changes to Policy */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">9</span>
                                    </span>
                                    Changes to This Privacy Policy
                                </h2>
                                <div className="ml-11">
                                    <p className="text-gray-600">
                                        We may update our Privacy Policy from time to time. We will notify you of any changes by 
                                        posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
                                        advised to review this Privacy Policy periodically for any changes.
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
                                        If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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
