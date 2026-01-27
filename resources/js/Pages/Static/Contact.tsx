import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import WhatsAppButton from '@/Components/Shared/WhatsAppButton';
import { FormEventHandler, useState } from 'react';

export default function Contact({ auth }: PageProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setStatus({ type: null, message: '' });

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    access_key: '56b5f77b-d585-447d-9b7a-1d2ebffc32e3',
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    from_name: 'Adra Research Theme Contact Form',
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus({
                    type: 'success',
                    message: 'Thank you for your message! We will get back to you soon.',
                });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus({
                    type: 'error',
                    message: 'Something went wrong. Please try again or email us directly.',
                });
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'Failed to send message. Please check your connection and try again.',
            });
        } finally {
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Contact Us - Adra Research Theme" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="contact" />

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden py-20">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">Contact Us</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Have a question? We'd love to hear from you
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                        {/* Contact Info Cards */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Email</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-2">Send us an email anytime</p>
                            <a href="mailto:support@adraresearchtheme.com" className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium break-all">
                                support@adraresearchtheme.com
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Phone</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-2">Mon-Fri from 8am to 5pm</p>
                            <a href="tel:+6281396857105" className="text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium">
                                +62 813 9685 7105
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center hover:shadow-md transition-shadow">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Office</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-2">Visit our office</p>
                            <p className="text-sm sm:text-base text-blue-600 font-medium">
                                Batusangkar, Indonesia
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center">Send us a Message</h2>
                            <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-8">
                                Fill out the form below and we'll get back to you as soon as possible
                            </p>

                            {/* Status Message */}
                            {status.type && (
                                <div className={`p-4 rounded-lg mb-6 ${
                                    status.type === 'success' 
                                        ? 'bg-green-50 border border-green-200 text-green-800' 
                                        : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                    <div className="flex items-center gap-3">
                                        {status.type === 'success' ? (
                                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                        <p className="font-medium">{status.message}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="john@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="How can we help you?"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                        required
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            <details className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 group">
                                <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none flex items-center justify-between">
                                    <span>What is your response time?</span>
                                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    We typically respond to all inquiries within 24 business hours. For urgent matters, please mention it in your message subject.
                                </p>
                            </details>

                            <details className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 group">
                                <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none flex items-center justify-between">
                                    <span>Do you offer technical support?</span>
                                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Yes! We provide comprehensive technical support for all our products. Premium support packages are also available for priority assistance.
                                </p>
                            </details>

                            <details className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 group">
                                <summary className="cursor-pointer font-semibold text-gray-900 text-lg list-none flex items-center justify-between">
                                    <span>Can I request custom development?</span>
                                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <p className="mt-4 text-gray-600">
                                    Absolutely! We offer custom development services for OJS themes and plugins. Contact us with your requirements for a personalized quote.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>

                <Footer />
                
                {/* WhatsApp Floating Button */}
                <WhatsAppButton 
                    phoneNumber={import.meta.env.VITE_WHATSAPP_NUMBER || '+6281234567890'}
                    message="Hi! I have a question and need assistance."
                />
            </div>
        </>
    );
}
