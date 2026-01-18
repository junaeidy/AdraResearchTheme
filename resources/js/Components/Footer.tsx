import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative">
            {/* Wave Divider */}
            <div className="relative">
                <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <path 
                        d="M0,40 C320,10 320,70 640,50 C960,30 960,80 1280,55 C1440,45 1440,60 1440,50 L1440,0 L0,0 Z" 
                        fill="#F9FAFB"
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-6 sm:pb-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
                    {/* About Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-lg sm:text-xl lg:text-[21px] font-bold">Adra Research</div>
                                <div className="text-xs sm:text-sm text-blue-300">Academic Publishing</div>
                            </div>
                        </div>
                        <p className="text-sm sm:text-base text-blue-100/80 leading-relaxed mb-3 sm:mb-4">
                            Professional plugins and themes designed to elevate your Open Journal Systems platform.
                        </p>
                        <div className="flex gap-2 sm:gap-3">
                            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                            <a href="#" className="w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h3>
                        <ul className="space-y-2 sm:space-y-2.5">
                            <li>
                                <Link href="/" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/shop" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/services" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal/Resources Links */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Legal</h3>
                        <ul className="space-y-2 sm:space-y-2.5">
                            <li>
                                <Link href="/privacy-policy" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms-of-service" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookie-policy" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Get in Touch</h3>
                        <ul className="space-y-2.5 sm:space-y-3">
                            <li className="flex items-start gap-2 sm:gap-3">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <div className="text-xs sm:text-sm text-blue-300 font-medium mb-0.5">Email</div>
                                    <a href="mailto:support@adraresearchtheme.com" className="text-sm sm:text-base text-blue-100/80 hover:text-white transition-colors break-all">
                                        support@adraresearchtheme.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-2 sm:gap-3">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <div className="text-xs sm:text-sm text-blue-300 font-medium mb-0.5">Location</div>
                                    <p className="text-sm sm:text-base text-blue-100/80">
                                        Batusangkar, Indonesia
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Map Section */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Our Location</h3>
                        <div className="rounded-xl overflow-hidden border-2 border-blue-400/30 shadow-lg">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2821.1381300283433!2d100.59018820761477!3d-0.45628283994626384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd52d6bf1c50065%3A0x677f2c62769e5b76!2sGHVR%2B3VG%2C%20Jl.%20Soekarno-Hatta%2C%20Baringin%2C%20Kec.%20Lima%20Kaum%2C%20Kabupaten%20Tanah%20Datar%2C%20Sumatera%20Barat%2027212!5e0!3m2!1sid!2sid!4v1768377018085!5m2!1sid!2sid"
                                width="100%" 
                                height="160" 
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-300"
                                title="Our Location Map"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-6 sm:pt-8 border-t border-blue-400/20">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2 sm:gap-4">
                        <p className="text-sm sm:text-base text-blue-100/70 text-center">
                            &copy; {currentYear} Adra Research Theme. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>
        </footer>
    );
}
