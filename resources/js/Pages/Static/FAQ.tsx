import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
    category: 'general' | 'licensing' | 'payment' | 'technical' | 'support';
}

export default function FAQ({ auth }: PageProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData: FAQItem[] = [
        // General Questions
        {
            category: 'general',
            question: 'What is Adra Research Theme?',
            answer: 'Adra Research Theme is a professional marketplace for Open Journal Systems (OJS) themes and plugins. We provide high-quality, customizable solutions to enhance your academic publishing platform with modern design and advanced functionality.'
        },
        {
            category: 'general',
            question: 'Who can use your products?',
            answer: 'Our products are designed for academic institutions, universities, independent journals, and publishers using Open Journal Systems (OJS). Whether you manage a single journal or multiple publications, we have solutions tailored to your needs.'
        },
        {
            category: 'general',
            question: 'What types of products do you offer?',
            answer: 'We offer two main types of products: Themes (for customizing the visual appearance of your OJS installation) and Plugins (for adding new features and functionality to your journals).'
        },

        // Licensing Questions
        {
            category: 'licensing',
            question: 'What is the difference between Installation Scope and Journal Scope?',
            answer: 'Installation Scope licenses apply to your entire OJS installation and can be used across all journals on that domain. Journal Scope licenses are specific to individual journals and can only be used on the designated journal path. Choose Installation Scope for multiple journals, or Journal Scope for a single journal.'
        },
        {
            category: 'licensing',
            question: 'What license types do you offer?',
            answer: 'We offer five license types: Single-Site (1 installation), Single-Journal (1 journal), Multi-Site (3-5 installations), Multi-Journal (3-5 journals), and Unlimited (unlimited activations). Each type comes with options for 1-year, 2-years, or lifetime duration.'
        },
        {
            category: 'licensing',
            question: 'Can I change my license from one site to another?',
            answer: 'Yes! You can deactivate your license from the current site and reactivate it on a new site. This is useful if you migrate your journal to a different domain or installation. Simply deactivate from your account dashboard and activate on the new location.'
        },
        {
            category: 'licensing',
            question: 'What happens when my license expires?',
            answer: 'When your license expires, the theme or plugin will continue to work, but you will no longer receive updates, new features, or technical support. You can renew your license at any time to regain access to updates and support.'
        },
        {
            category: 'licensing',
            question: 'Can I upgrade my license later?',
            answer: 'Yes, you can upgrade from a smaller license (e.g., Single-Site) to a larger one (e.g., Multi-Site or Unlimited) at any time. Contact our support team to arrange an upgrade with credit for your existing license.'
        },
        {
            category: 'licensing',
            question: 'Do you offer refunds?',
            answer: 'Due to the digital nature of our products, all sales are final. However, we offer refunds on a case-by-case basis for valid technical issues that cannot be resolved. Please contact our support team within 14 days of purchase if you experience any problems.'
        },

        // Payment Questions
        {
            category: 'payment',
            question: 'What payment methods do you accept?',
            answer: 'We accept bank transfers to Indonesian bank accounts. After placing your order, you will receive bank account details and instructions for completing the payment.'
        },
        {
            category: 'payment',
            question: 'How long does payment verification take?',
            answer: 'Our admin team typically verifies payments within 24 business hours. You will receive an email notification once your payment is confirmed and your license is activated.'
        },
        {
            category: 'payment',
            question: 'What currency are the prices listed in?',
            answer: 'All prices are listed in Indonesian Rupiah (IDR). Prices are inclusive of applicable taxes and fees.'
        },
        {
            category: 'payment',
            question: 'Do you offer discounts or bulk pricing?',
            answer: 'Yes! We offer discounts for bulk purchases and educational institutions. We also have periodic promotions and special offers. Contact us at sales@adraresearchtheme.com for custom pricing on large orders.'
        },
        {
            category: 'payment',
            question: 'Can I get an invoice for my purchase?',
            answer: 'Yes, invoices are automatically generated for all purchases and can be downloaded from your account dashboard. If you need a custom invoice format for your institution, please contact our support team.'
        },

        // Technical Questions
        {
            category: 'technical',
            question: 'How do I install a theme or plugin?',
            answer: 'After purchasing, you will receive a download link and detailed installation instructions. Generally, themes and plugins are installed through the OJS admin panel by uploading the downloaded file. Full documentation is provided with each product.'
        },
        {
            category: 'technical',
            question: 'What OJS versions are supported?',
            answer: 'Our products are compatible with OJS 3.3.x and newer versions. Each product page clearly states the compatible OJS versions. We regularly update our products to support the latest OJS releases.'
        },
        {
            category: 'technical',
            question: 'How do I activate my license?',
            answer: 'License activation is done through the product settings in your OJS admin panel. Enter your license key when prompted, and the plugin/theme will automatically contact our server to verify and activate the license.'
        },
        {
            category: 'technical',
            question: 'Can I customize the theme/plugin after purchase?',
            answer: 'Yes! Our products are built to be customizable. You can modify colors, layouts, and settings through the admin interface. For advanced customizations, you have access to the source code, though we recommend keeping backups before making changes.'
        },
        {
            category: 'technical',
            question: 'Do you provide documentation?',
            answer: 'Yes, comprehensive documentation is provided with each product. This includes installation guides, configuration instructions, API documentation (for plugins), and troubleshooting tips.'
        },
        {
            category: 'technical',
            question: 'What happens if I encounter technical issues?',
            answer: 'We provide technical support for all active license holders. You can contact our support team via email, and we will help resolve any issues. Response times are typically within 24-48 hours on business days.'
        },

        // Support Questions
        {
            category: 'support',
            question: 'How do I get support?',
            answer: 'You can get support by emailing support@adraresearchtheme.com or submitting a ticket through your account dashboard. Make sure to include your license key and a detailed description of your issue.'
        },
        {
            category: 'support',
            question: 'What is included in support?',
            answer: 'Support includes help with installation, configuration, troubleshooting, and bug fixes. We also assist with understanding features and best practices. Custom development and extensive customization requests may require additional fees.'
        },
        {
            category: 'support',
            question: 'Do you offer custom development services?',
            answer: 'Yes! We offer custom development services for themes, plugins, and OJS customizations. Contact us with your requirements for a personalized quote and timeline.'
        },
        {
            category: 'support',
            question: 'How often do you release updates?',
            answer: 'We regularly release updates to improve features, fix bugs, and maintain compatibility with new OJS versions. Active license holders receive automatic update notifications and can download updates from their account dashboard.'
        },
        {
            category: 'support',
            question: 'Can I request new features?',
            answer: 'Absolutely! We welcome feature requests from our users. While we cannot guarantee implementation of every request, we carefully consider all suggestions and prioritize features that benefit the community.'
        },
    ];

    const categories = [
        { id: 'all', name: 'All Questions', icon: '📚' },
        { id: 'general', name: 'General', icon: '❓' },
        { id: 'licensing', name: 'Licensing', icon: '🔑' },
        { id: 'payment', name: 'Payment', icon: '💳' },
        { id: 'technical', name: 'Technical', icon: '⚙️' },
        { id: 'support', name: 'Support', icon: '🆘' },
    ];

    const filteredFAQs = activeCategory === 'all' 
        ? faqData 
        : faqData.filter(faq => faq.category === activeCategory);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <Head title="FAQ - Frequently Asked Questions" />
            
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
                        <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs sm:text-sm font-medium text-blue-100">Frequently Asked Questions</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">How Can We Help You?</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Find answers to common questions about our products, licensing, and services
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    {/* Category Filters */}
                    <div className="mb-8 sm:mb-12">
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-medium transition-all duration-200 ${
                                        activeCategory === category.id
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                                >
                                    <span className="mr-1 sm:mr-2">{category.icon}</span>
                                    <span className="hidden sm:inline">{category.name}</span>
                                    <span className="sm:hidden">{category.name.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Count */}
                    <div className="text-center mb-6 sm:mb-8">
                        <p className="text-sm sm:text-base text-gray-600">
                            Showing <span className="font-bold text-blue-600">{filteredFAQs.length}</span> {filteredFAQs.length === 1 ? 'question' : 'questions'}
                        </p>
                    </div>

                    {/* FAQ Items */}
                    <div className="space-y-3 sm:space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start gap-2 sm:gap-4 flex-1 min-w-0">
                                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            faq.category === 'general' ? 'bg-blue-100' :
                                            faq.category === 'licensing' ? 'bg-purple-100' :
                                            faq.category === 'payment' ? 'bg-green-100' :
                                            faq.category === 'technical' ? 'bg-orange-100' :
                                            'bg-pink-100'
                                        }`}>
                                            <span className="text-base sm:text-xl">
                                                {faq.category === 'general' ? '❓' :
                                                 faq.category === 'licensing' ? '🔑' :
                                                 faq.category === 'payment' ? '💳' :
                                                 faq.category === 'technical' ? '⚙️' :
                                                 '🆘'}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 pr-2 sm:pr-4">
                                                {faq.question}
                                            </h3>
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                {openIndex === index && (
                                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                                        <div className="pl-10 sm:pl-14 pr-6 sm:pr-10">
                                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Still Have Questions Section */}
                    <div className="mt-12 sm:mt-16 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 md:p-12 border border-blue-100">
                        <div className="text-center max-w-2xl mx-auto">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                Still Have Questions?
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Can't find the answer you're looking for? Our support team is here to help you.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact Support
                                </a>
                                <a
                                    href="mailto:support@adraresearchtheme.com"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 border-2 border-blue-600"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Email Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
