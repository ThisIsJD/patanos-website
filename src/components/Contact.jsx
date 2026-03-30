import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Contact — Franchise inquiry form and location information.
 * Uses a split layout with contact details and a Formspree-ready form.
 */
function Contact() {
    const [formStatus, setFormStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('submitting');

        // Simulate Formspree submission
        // Replace this with actual Formspree endpoint URL in action tag later
        setTimeout(() => {
            setFormStatus('success');
            e.target.reset();
        }, 1500);
    };

    return (
        <section id="franchise" className="py-24 bg-bg-primary relative overflow-hidden">
            {/* Decorative background circle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10 flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-widest mb-4 flex flex-col md:flex-row items-center justify-center gap-2"
                    >
                        <span>JOIN THE</span> <span className="text-gold">PATANOS FAMILY</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-body text-text-secondary text-base lg:text-lg tracking-wide"
                    >
                        Bring the sensation to your community
                    </motion.p>
                </div>

                {/* Info Blocks */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-16"
                >
                    <div className="bg-bg-secondary p-8 rounded-xl flex flex-col items-center text-center border border-border">
                        <svg className="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <h4 className="font-display text-white text-lg tracking-widest uppercase mb-2">Proven Business Model</h4>
                        <p className="font-body text-text-secondary text-sm">Join a growing brand with established systems and success</p>
                    </div>
                    <div className="bg-bg-secondary p-8 rounded-xl flex flex-col items-center text-center border border-border">
                        <svg className="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        <h4 className="font-display text-white text-lg tracking-widest uppercase mb-2">Full Support</h4>
                        <p className="font-body text-text-secondary text-sm">Training, marketing, and operational support every step</p>
                    </div>
                    <div className="bg-bg-secondary p-8 rounded-xl flex flex-col items-center text-center border border-border">
                        <svg className="w-8 h-8 text-gold mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                        <h4 className="font-display text-white text-lg tracking-widest uppercase mb-2">Premium Brand</h4>
                        <p className="font-body text-text-secondary text-sm">Be part of a recognized name in the beverage industry</p>
                    </div>
                </motion.div>

                {/* Right: Franchise Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    className="w-full max-w-2xl"
                >
                    <div className="bg-bg-primary p-8 md:p-10 border border-gold border-opacity-30 relative overflow-hidden">

                        <div className="text-center mb-8">
                            <h3 className="font-display text-2xl text-gold uppercase tracking-widest">REQUEST FRANCHISE INFO</h3>
                        </div>

                        {/* Form success overlay */}
                        {formStatus === 'success' && (
                            <div className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center text-center p-8">
                                <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="font-display text-3xl text-text-primary mb-2">Inquiry Sent!</h3>
                                <p className="font-body text-text-secondary">We'll be in touch with you shortly to discuss franchise opportunities.</p>
                                <button onClick={() => setFormStatus('idle')} className="mt-8 font-body font-bold text-gold hover:text-white transition-colors underline underline-offset-4">
                                    Send another inquiry
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="font-body text-xs font-bold text-text-secondary tracking-wider block">Full Name *</label>
                                <input required type="text" id="name" name="name" className="w-full bg-bg-primary border border-border px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors" placeholder="Juan Dela Cruz" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="font-body text-xs font-bold text-text-secondary tracking-wider block">Email Address *</label>
                                <input required type="email" id="email" name="email" className="w-full bg-bg-primary border border-border px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors" placeholder="you@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="contact" className="font-body text-xs font-bold text-text-secondary tracking-wider block">Phone Number *</label>
                                <input required type="tel" id="contact" name="contact" className="w-full bg-bg-primary border border-border px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold transition-colors" placeholder="+63 912 345 6789" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="location" className="font-body text-xs font-bold text-text-secondary tracking-wider block">Preferred Location *</label>
                                <input required type="text" id="location" name="location" className="w-full bg-bg-primary border border-border px-4 py-3 font-body text-text-primary placeholder:text-text-muted focus:outline-none focus:border-gold  transition-colors" placeholder="City, Province" />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus === 'submitting'}
                                className="w-full bg-gold hover:bg-gold-dark text-on-gold font-body font-bold tracking-widest text-sm py-4 mt-8 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formStatus === 'submitting' ? 'SENDING...' : 'SUBMIT REQUEST'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;
