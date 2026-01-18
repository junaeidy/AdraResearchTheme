import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function TermsAndConditions({ auth }: PageProps) {
    return (
        <>
            <Head title="Terms and Conditions - Adra Research Theme" />
            
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
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Terms and Conditions</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            License usage terms and conditions for plugins and themes
                        </p>
                        <p className="text-xs sm:text-sm text-blue-200 mt-3 sm:mt-4">Last updated: January 18, 2026</p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12">
                        <div className="prose prose-sm sm:prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="mb-10">
                                <p className="text-gray-600 leading-relaxed">
                                    These Terms and Conditions govern the use of all plugins and themes ("Products") provided by Adra Research Theme. 
                                    By purchasing, downloading, or using any of our Products, you agree to comply with these terms. 
                                    If you do not agree to these terms, you may not use our Products.
                                </p>
                            </div>

                            {/* License Grant */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">1</span>
                                    </span>
                                    License Grant
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Adra Research Theme grants you a non-exclusive, non-transferable license to use the purchased Products 
                                        only in accordance with the terms of this agreement. The license type depends on the product category:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                                        <li><strong>Single Journal License:</strong> Usage limited to one (1) journal installation</li>
                                        <li><strong>Single Site License:</strong> Usage limited to one (1) website installation</li>
                                        <li><strong>Multi-Journal License (5):</strong> Usage limited to five (5) journal installations</li>
                                        <li><strong>Multi-Site License (5):</strong> Usage limited to five (5) website installations</li>
                                        <li><strong>Unlimited License:</strong> Unlimited journal/website installations</li>
                                    </ul>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Each license is bound to the specified domain(s) or journal(s) specified at the time of purchase. 
                                        You may not transfer or share your license with other individuals or organizations.
                                    </p>
                                </div>
                            </div>

                            {/* Permitted Use */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">2</span>
                                    </span>
                                    Permitted Use
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        You are permitted to:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>Install and use the Product on the specified domain(s) or journal(s)</li>
                                        <li>Use the Product for personal or commercial purposes</li>
                                        <li>Receive updates and technical support during the license validity period</li>
                                        <li>Create a backup copy of the Product for backup purposes only</li>
                                        <li>Integrate the Product with other compatible applications</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Prohibited Use - Modifications */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-red-600 font-bold">⚠</span>
                                    </span>
                                    Prohibited Use - Modifications & Unauthorized Changes
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-4">
                                    <p className="text-sm sm:text-base text-red-700 font-semibold">
                                        The following actions are strictly prohibited without prior written consent from Adra Research Theme:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-2">
                                        <li>Modifying, altering, or creating derivative works from the Product code</li>
                                        <li>Removing or obscuring copyright notices, licensing information, or attribution text</li>
                                        <li>Reverse engineering, decompiling, or disassembling the Product</li>
                                        <li>Removing the Product branding or trademark information</li>
                                        <li>Creating modified versions and distributing them to third parties</li>
                                        <li>Using the Product on more installations than licensed for</li>
                                        <li>Transferring or selling the license to another person or organization</li>
                                        <li>Redistributing the Product or license key to others</li>
                                        <li>Using the Product for resale or as a commercial service without authorization</li>
                                    </ul>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Minor customizations for your specific journal/website needs within the backend interface are permitted, 
                                        but modifications to the core product files are not allowed.
                                    </p>
                                </div>
                            </div>

                            {/* Sanctions for Violations */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-red-600 font-bold">!</span>
                                    </span>
                                    Sanctions for Violations
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-4">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        If you violate any of these Terms and Conditions, Adra Research Theme reserves the right to take 
                                        the following actions:
                                    </p>

                                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                        <h3 className="text-sm sm:text-base font-semibold text-red-900 mb-2">Immediate Actions:</h3>
                                        <ul className="list-disc list-inside text-sm sm:text-base text-red-800 space-y-1.5">
                                            <li>Suspend or terminate your license immediately</li>
                                            <li>Revoke your access to downloads and support services</li>
                                            <li>Invalidate your license key</li>
                                            <li>Remove your account from our system</li>
                                        </ul>
                                    </div>

                                    <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                                        <h3 className="text-sm sm:text-base font-semibold text-orange-900 mb-2">Legal Actions:</h3>
                                        <ul className="list-disc list-inside text-sm sm:text-base text-orange-800 space-y-1.5">
                                            <li>Pursue civil and criminal charges for breach of contract</li>
                                            <li>Seek damages for intellectual property infringement</li>
                                            <li>Obtain injunctive relief to prevent continued violations</li>
                                            <li>Recover legal fees and court costs</li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                        <h3 className="text-sm sm:text-base font-semibold text-yellow-900 mb-2">Financial Penalties:</h3>
                                        <ul className="list-disc list-inside text-sm sm:text-base text-yellow-800 space-y-1.5">
                                            <li>Charge for unauthorized license usage (per installation)</li>
                                            <li>Impose penalties up to IDR 10,000,000 for severe violations</li>
                                            <li>Require payment for damages caused by unauthorized modifications</li>
                                        </ul>
                                    </div>

                                    <p className="text-sm sm:text-base text-gray-600 font-semibold mt-4">
                                        Additionally, Adra Research Theme may:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>Publicly report violations and blacklist the violating domain/organization</li>
                                        <li>Report intellectual property infringement to authorities</li>
                                        <li>Take legal action through judicial processes</li>
                                        <li>Collaborate with law enforcement if criminal activity is involved</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Detection & Monitoring */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">3</span>
                                    </span>
                                    Detection & Monitoring
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Adra Research Theme employs various methods to detect unauthorized modifications and violations:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>Automated license verification and activation checks</li>
                                        <li>License key validation on every update and installation</li>
                                        <li>Monitoring for unauthorized license sharing across multiple domains</li>
                                        <li>Checksum verification of core Product files</li>
                                        <li>Regular audits of publicly available modifications and forks</li>
                                        <li>Monitoring for products being resold or redistributed</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Requesting Modifications */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-green-600 font-bold">✓</span>
                                    </span>
                                    Requesting Modifications or Customizations
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        If you require modifications or customizations to the Product beyond the permitted interface settings, 
                                        you may:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>Contact Adra Research Theme to request customization services</li>
                                        <li>Request a quote for custom development or modifications</li>
                                        <li>Obtain written permission for specific code modifications</li>
                                        <li>Hire an Adra Research Theme certified developer for custom work</li>
                                    </ul>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Unauthorized modifications void your warranty and support eligibility.
                                    </p>
                                </div>
                            </div>

                            {/* Warranty & Support */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">4</span>
                                    </span>
                                    Warranty & Support
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Warranty and support terms depend on your license:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li><strong>1-Year Licenses:</strong> 12 months of updates and priority support included</li>
                                        <li><strong>2-Year Licenses:</strong> 24 months of updates and priority support included</li>
                                        <li><strong>Lifetime Licenses:</strong> Lifetime updates and lifetime support included</li>
                                    </ul>
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Support and updates are provided only to valid, unmodified installations. If you have modified 
                                        the Product, you are ineligible for support until the original Product is restored.
                                    </p>
                                </div>
                            </div>

                            {/* Refund Policy */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">5</span>
                                    </span>
                                    Refund Policy
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>Refunds are available within 14 days of purchase if the license has not been activated</li>
                                        <li>Once the license is activated on your domain/journal, refunds are not permitted</li>
                                        <li>Refunds will not be issued for products used in violation of these Terms</li>
                                        <li>All refund requests must be submitted through our support system</li>
                                    </ul>
                                </div>
                            </div>

                            {/* License Duration & Renewal */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">6</span>
                                    </span>
                                    License Duration & Renewal
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Time-limited licenses expire at the end of the purchased duration period. To continue using the Product:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>You may purchase a renewal license before expiration</li>
                                        <li>Renewal licenses include continued updates and support</li>
                                        <li>Expired licenses will no longer receive updates or support</li>
                                        <li>The Product will continue to function after expiration, but without updates or support</li>
                                        <li>Lifetime licenses do not expire and require no renewal</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Disclaimer of Warranties */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">7</span>
                                    </span>
                                    Disclaimer of Warranties
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        The Product is provided "as-is" without warranties of any kind. We do not warrant that:
                                    </p>
                                    <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 space-y-1.5">
                                        <li>The Product will meet your specific requirements</li>
                                        <li>The Product will be uninterrupted or error-free</li>
                                        <li>Any defects will be corrected</li>
                                        <li>The Product is compatible with all systems or environments</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Limitation of Liability */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">8</span>
                                    </span>
                                    Limitation of Liability
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        In no event shall Adra Research Theme be liable for any indirect, incidental, special, consequential, 
                                        or punitive damages resulting from your use of the Product or inability to use it, even if we have 
                                        been advised of the possibility of such damages.
                                    </p>
                                </div>
                            </div>

                            {/* Governing Law */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">9</span>
                                    </span>
                                    Governing Law
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        These Terms and Conditions are governed by and construed in accordance with the laws of Indonesia, 
                                        and you irrevocably submit to the exclusive jurisdiction of the courts located in Indonesia.
                                    </p>
                                </div>
                            </div>

                            {/* Changes to Terms */}
                            <div className="mb-8 sm:mb-10">
                                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 sm:gap-3">
                                    <span className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm sm:text-base text-blue-600 font-bold">10</span>
                                    </span>
                                    Changes to Terms
                                </h2>
                                <div className="ml-9 sm:ml-11 space-y-3">
                                    <p className="text-sm sm:text-base text-gray-600">
                                        Adra Research Theme reserves the right to modify these Terms and Conditions at any time. 
                                        Changes will be effective upon posting to this page. Your continued use of the Product after 
                                        any changes constitutes your acceptance of the new terms.
                                    </p>
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Questions or Concerns?</h3>
                                <p className="text-sm sm:text-base text-gray-600 mb-3">
                                    If you have any questions about these Terms and Conditions or need to report a violation, 
                                    please contact us:
                                </p>
                                <div className="text-sm sm:text-base text-gray-700 space-y-1.5">
                                    <p><strong>Email:</strong> support@adraresearchtheme.com</p>
                                    <p><strong>Support Form:</strong> Visit our contact page for detailed inquiries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
