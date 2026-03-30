import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import logo from '../assets/Brand/Patanos_logo.png';

/**
 * Navbar — Sticky top navigation for the Patanos marketing site.
 * Starts transparent and transitions to a dark background with a gold border on scroll.
 */
function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'About', href: '#about' },
        { name: 'Menu', href: '#menu' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Franchise', href: '#franchise' },
        { name: 'Contact', href: '#visit-us' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-bg-primary/95 backdrop-blur-md border-b border-border-gold shadow-lg py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
                {/* Hidden or small logo on scroll could go here if requested, 
            but keeping it simple with a text brand or just empty if hero has logo. 
            We'll put a subtle text logo here that appears on scroll. */}
                <div className="transition-opacity duration-300">
                    <a href="#hero" className="block">
                        <img src={logo} alt="Patanos Logo" className="h-10 md:h-12 w-auto object-contain" />
                    </a>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-text-primary hover:text-gold font-body text-sm uppercase tracking-wider font-semibold transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-text-primary p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Drawer */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden bg-bg-surface border-b border-border-gold"
                >
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-text-primary hover:text-gold font-body text-lg font-semibold py-2"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
}

export default Navbar;
