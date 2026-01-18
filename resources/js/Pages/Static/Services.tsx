import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

export default function Services({ auth }: PageProps) {
    const testimonials = [
        {
            id: 1,
            name: 'Dr. Ahmad Wijaya',
            title: 'Editor-in-Chief, Journal of Educational Research',
            institution: 'Universitas Negeri Jakarta',
            content: 'The team at Adra Research Theme transformed our journal completely. Their OJS installation and setup was professional, and the ongoing support has been exceptional. We saw a 150% increase in submissions within the first quarter!',
            avatar: 'AW',
            image: null, // Ganti dengan URL gambar, contoh: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad'
            rating: 5
        },
        {
            id: 2,
            name: 'Prof. Siti Nurhaliza',
            title: 'Head of Academic Publishing',
            institution: 'Universitas Gadjah Mada',
            content: 'Outstanding service from start to finish. The SINTA indexing consultation helped us understand the requirements perfectly. Our journal is now indexed and visible to a much wider academic audience.',
            avatar: 'SN',
            image: null, // Ganti dengan URL gambar
            rating: 5
        },
        {
            id: 3,
            name: 'Dr. Bambang Sutrisno',
            title: 'IT Director',
            institution: 'Universitas Indonesia',
            content: 'When our system was hacked, I was panicked. But the Adra team responded immediately, recovered everything, and hardened our security. Their 24/7 support gives us complete peace of mind.',
            avatar: 'BS',
            image: null, // Ganti dengan URL gambar
            rating: 5
        },
        {
            id: 4,
            name: 'Dr. Lisa Wijaya',
            title: 'Publisher Coordinator',
            institution: 'Institut Pertanian Bogor',
            content: 'The hosting services are reliable and their team is always responsive. We have never experienced any downtime, and the domain management is seamless. Highly recommended!',
            avatar: 'LW',
            image: null, // Ganti dengan URL gambar
            rating: 5
        }
    ];

    const services = [
        {
            id: 1,
            title: 'OJS Installation',
            description: 'Complete installation and setup of Open Journal Systems tailored to your institution\'s needs',
            longDescription: 'We provide professional installation services for OJS, including server configuration, database setup, and initial customization. Our team ensures your platform is optimized for performance and security from day one.',
            icon: (
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            color: 'from-blue-500 to-blue-600',
            features: [
                'Server configuration and optimization',
                'Database setup and migration',
                'SSL certificate installation',
                'Initial theme and plugin setup',
                'User account creation',
                'Data backup configuration'
            ]
        },
        {
            id: 2,
            title: 'Hosting & Domain',
            description: 'Reliable hosting solutions and domain management services for your academic platform',
            longDescription: 'We offer comprehensive hosting and domain services specifically configured for OJS platforms. Our dedicated servers ensure uptime, speed, and security for academic institutions.',
            icon: (
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
            ),
            color: 'from-purple-500 to-purple-600',
            features: [
                'Managed OJS hosting',
                'Domain registration and renewal',
                'DNS management',
                'Email hosting setup',
                'CDN integration',
                '99.9% uptime guarantee',
                '24/7 technical support'
            ]
        },
        {
            id: 3,
            title: 'Hacking Repair & Security',
            description: 'Expert recovery and security hardening for compromised OJS installations',
            longDescription: 'Our security specialists provide emergency response and complete restoration of hacked systems. We identify vulnerabilities, remove malware, and implement comprehensive security measures to prevent future attacks.',
            icon: (
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            color: 'from-red-500 to-red-600',
            features: [
                'Security audit and assessment',
                'Malware detection and removal',
                'System restoration from backups',
                'Vulnerability patching',
                'Access control hardening',
                'Security monitoring setup',
                'Incident response documentation'
            ]
        },
        {
            id: 4,
            title: 'Consultation & SINTA Indexing',
            description: 'Expert guidance for journal visibility and SINTA indexing to enhance academic credibility',
            longDescription: 'We provide strategic consultation to improve your journal\'s visibility, implement best practices for academic publishing, and guide you through the SINTA (Science and Technology Index) indexing process.',
            icon: (
                <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: 'from-green-500 to-green-600',
            features: [
                'Journal quality assessment',
                'Editorial workflow optimization',
                'SINTA compliance guidance',
                'Indexing submission assistance',
                'International indexing strategy',
                'Visibility and metrics improvement',
                'Peer review process enhancement',
                'Ongoing consultation support'
            ]
        }
    ];

    return (
        <>
            <Head title="Services - Adra Research Theme" />
            
            <div className="min-h-screen bg-gray-50">
                <Header user={auth?.user} currentPage="services" />

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden py-20">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }}></div>
                    </div>
                    
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
                                <span className="block">Professional Services</span>
                                <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent">
                                    for Academic Publishing
                                </span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
                                Comprehensive solutions to establish, secure, and optimize your Open Journal System platform
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
                            >
                                {/* Gradient accent */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300`}></div>
                                
                                <div className="relative">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                                        {service.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                                        {service.longDescription}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-2 sm:space-y-3">
                                        <p className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">Key Features:</p>
                                        <ul className="space-y-2 sm:space-y-2.5">
                                            {service.features.slice(0, 4).map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2 sm:gap-3">
                                                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA Button */}
                                    <Link
                                        href="/contact"
                                        className="inline-block mt-6 sm:mt-8 group/btn"
                                    >
                                        <button className={`inline-flex items-center gap-2 bg-gradient-to-r ${service.color} text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300`}>
                                            <span>Learn More</span>
                                            <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Process Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 md:p-12 mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">How We Work</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                            {[
                                { step: 1, title: 'Consultation', desc: 'We understand your needs and goals' },
                                { step: 2, title: 'Planning', desc: 'Create a customized solution strategy' },
                                { step: 3, title: 'Implementation', desc: 'Deploy with professional expertise' },
                                { step: 4, title: 'Support', desc: 'Ongoing assistance and maintenance' }
                            ].map((item) => (
                                <div key={item.step} className="relative">
                                    {/* Connector line */}
                                    {item.step < 4 && (
                                        <div className="hidden lg:block absolute top-8 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-transparent"></div>
                                    )}
                                    
                                    <div className="text-center">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg sm:text-xl shadow-lg relative z-10">
                                            {item.step}
                                        </div>
                                        <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16 lg:mb-20 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
                                Why Choose Our Services?
                            </h2>
                            <div className="space-y-4 sm:space-y-6">
                                {[
                                    { title: 'Expert Team', desc: 'Years of experience in OJS and academic publishing' },
                                    { title: 'Dedicated Support', desc: '24/7 technical support and maintenance' },
                                    { title: 'Secure & Reliable', desc: 'Enterprise-grade security and 99.9% uptime' },
                                    { title: 'Cost Effective', desc: 'Competitive pricing with transparent billing' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4 sm:gap-6">
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
                                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full"></div>
                                <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/10 rounded-full"></div>
                                
                                <div className="relative space-y-6 sm:space-y-8">
                                    <div>
                                        <div className="text-4xl sm:text-5xl font-bold mb-2 text-blue-100">500+</div>
                                        <p className="text-sm sm:text-base text-blue-100/90">Journals Successfully Launched</p>
                                    </div>
                                    <div className="border-t border-blue-400/30 pt-6 sm:pt-8">
                                        <div className="text-4xl sm:text-5xl font-bold mb-2 text-blue-100">98%</div>
                                        <p className="text-sm sm:text-base text-blue-100/90">Customer Satisfaction Rate</p>
                                    </div>
                                    <div className="border-t border-blue-400/30 pt-6 sm:pt-8">
                                        <div className="text-4xl sm:text-5xl font-bold mb-2 text-blue-100">24/7</div>
                                        <p className="text-sm sm:text-base text-blue-100/90">Technical Support Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials Section */}
                    <div className="mb-12 sm:mb-16 lg:mb-20">
                        <div className="text-center mb-10 sm:mb-14">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                                What Our Clients Say
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                                Trusted by leading academic institutions across Indonesia and beyond
                            </p>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="w-5 h-5 text-amber-400 fill-current"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600/30 mb-3 sm:mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>

                                    {/* Content */}
                                    <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                        {testimonial.content}
                                    </p>

                                    {/* Author Info */}
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        {testimonial.image ? (
                                            <img 
                                                src={testimonial.image} 
                                                alt={testimonial.name}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-blue-200"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                                                {testimonial.avatar}
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                                            <p className="text-xs sm:text-sm text-gray-600">{testimonial.title}</p>
                                            <p className="text-xs text-blue-600 font-medium">{testimonial.institution}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-2xl p-8 sm:p-12 md:p-16 text-center text-white overflow-hidden relative mb-12 sm:mb-16 lg:mb-20">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                            }}></div>
                        </div>

                        <div className="relative max-w-2xl mx-auto">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Ready to Get Started?</h2>
                            <p className="text-base sm:text-lg text-blue-100 mb-8 sm:mb-10">
                                Let us help you establish and optimize your academic publishing platform. Contact us today for a personalized consultation.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-900 px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-sm sm:text-base"
                                >
                                    <span>Contact Us</span>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/shop"
                                    className="inline-flex items-center justify-center gap-2 bg-blue-500/20 backdrop-blur-sm text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold border border-blue-400/30 hover:bg-blue-500/30 transition-all duration-300 text-sm sm:text-base"
                                >
                                    <span>Explore Products</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
