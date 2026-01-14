import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function AboutUs({ auth }: PageProps) {
    return (
        <>
            <Head title="About Us - Adra Research Theme" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="about"/>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden py-20">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">About Us</h1>
                        <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
                            Empowering academic publishing with innovative solutions
                        </p>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    {/* Story Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Our Story</h2>
                        <div className="prose prose-sm sm:prose-lg max-w-none text-gray-600">
                            <p className="mb-4">
                                Adra Research Theme was founded with a clear vision: to transform the landscape of academic publishing 
                                through innovative, user-friendly solutions for Open Journal Systems (OJS). We understand the challenges 
                                faced by academic institutions, researchers, and publishers in today's digital age.
                            </p>
                            <p className="mb-4">
                                Our journey began when we recognized the gap between the powerful capabilities of OJS and the need for 
                                modern, professional themes and plugins that could unlock its full potential. We set out to create 
                                solutions that are not only functional but also beautiful, intuitive, and aligned with the latest 
                                academic publishing standards.
                            </p>
                            <p>
                                Today, we're proud to serve academic publishers worldwide, helping them enhance their journals' 
                                visibility, improve user experience, and streamline their publishing workflows.
                            </p>
                        </div>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-100">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                To provide academic publishers with cutting-edge, accessible, and affordable solutions that 
                                enhance the quality and reach of scholarly communication worldwide.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 sm:p-8 border border-purple-100">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                To become the leading provider of OJS solutions, recognized globally for innovation, quality, 
                                and exceptional support in academic publishing technology.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 mb-8 sm:mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Our Core Values</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Quality</h4>
                                <p className="text-sm sm:text-base text-gray-600">We deliver premium products that exceed expectations</p>
                            </div>

                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Innovation</h4>
                                <p className="text-sm sm:text-base text-gray-600">Continuously evolving with the latest technologies</p>
                            </div>

                            <div className="text-center">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Support</h4>
                                <p className="text-sm sm:text-base text-gray-600">Dedicated assistance whenever you need it</p>
                            </div>
                        </div>
                    </div>

                    {/* Team/Stats Section */}
                    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 md:p-12 text-white">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Our Impact</h2>
                        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                            <div>
                                <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">500+</div>
                                <div className="text-sm sm:text-base text-blue-100">Active Users</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">50+</div>
                                <div className="text-sm sm:text-base text-blue-100">Countries Served</div>
                            </div>
                            <div>
                                <div className="text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">98%</div>
                                <div className="text-sm sm:text-base text-blue-100">Customer Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
