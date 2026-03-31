/**
 * Footer — Minimal dark footer for the Patanos Sip Sensations website.
 */

import { useState } from 'react';
import logo from '../assets/Brand/Patanos_logo.png';

function Footer() {
    const currentYear = new Date().getFullYear();
    const [mapStatus, setMapStatus] = useState('idle');

    const handleGetDirections = (e) => {
        e.preventDefault();
        setMapStatus('loading');

        const destination = "Patanos+Sip+Sensations,+San+Isidro,+Bombon,+Camarines+Sur,+Philippines";

        if (!navigator.geolocation) {
            fallbackMaps(destination);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=driving`, '_blank');
                setMapStatus('idle');
            },
            () => {
                fallbackMaps(destination);
            }
        );
    };

    const fallbackMaps = (destination) => {
        setMapStatus('error');
        setTimeout(() => {
            window.open(`https://www.google.com/maps/search/?api=1&query=${destination}`, '_blank');
            setMapStatus('idle');
        }, 1000);
    };

    return (
        <footer id="visit-us" className="bg-bg-primary pt-14 sm:pt-24 pb-8 border-t-4 border-gold">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest text-white mb-2">
                        VISIT <span className="text-gold">US</span>
                    </h2>
                    <p className="font-body text-text-secondary text-base">Stop by and taste the sensation</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-20 items-center">
                    {/* Left: Google Maps Interactive Embed */}
                    <div className="w-full lg:w-1/2">
                        <iframe
                            src="https://www.google.com/maps?q=Patanos+Sip+Sensations,+San+Isidro,+Bombon,+Camarines+Sur,+Philippines&output=embed"
                            width="100%"
                            height="400"
                            style={{ border: 0, borderRadius: '12px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Patanos Sip Sensations Location"
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8">

                        <div className="flex gap-4">
                            <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <div>
                                <h4 className="font-display tracking-widest uppercase text-white mb-1">Address</h4>
                                <p className="font-body text-sm text-text-secondary">San Isidro, Bombon<br />Camarines Sur, Philippines</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h4 className="font-display tracking-widest uppercase text-white mb-1">Hours</h4>
                                <p className="font-body text-sm text-text-secondary">Monday - Friday: 10:00 AM - 10:00 PM<br />Saturday - Sunday: 9:00 AM - 11:00 PM</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <svg className="w-6 h-6 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <div>
                                <h4 className="font-display tracking-widest uppercase text-white mb-1">Contact</h4>
                                <p className="font-body text-sm text-text-secondary">+63 912 345 6789<br />hello@patanos.ph</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button
                                onClick={handleGetDirections}
                                disabled={mapStatus === 'loading'}
                                className="inline-flex items-center gap-2 bg-gold text-on-gold font-bold font-body text-sm tracking-widest px-6 py-3 sm:px-8 sm:py-4 transition-colors hover:bg-gold-dark active:bg-gold-dark uppercase disabled:opacity-75 disabled:cursor-wait"
                            >
                                {mapStatus === 'idle' && (
                                    <>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        GET DIRECTIONS
                                    </>
                                )}
                                {mapStatus === 'loading' && 'Getting your location...'}
                                {mapStatus === 'error' && 'Opening Maps...'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar Container */}
                <div className="border-t border-border pt-8 flex flex-col items-center">
                    <img src={logo} alt="Patanos Logo" className="w-20 h-20 object-contain mb-4" />
                    <p className="font-body text-sm text-text-secondary mb-8">Sip Sensations. Live Bold.</p>

                    <div className="flex gap-6 mb-8">
                        <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-gold active:text-gold hover:border-gold active:border-gold transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-gold active:text-gold hover:border-gold active:border-gold transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-gold active:text-gold hover:border-gold active:border-gold transition-colors" aria-label="Twitter">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                        </a>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4">
                        <a href="#home" className="text-xs font-body tracking-wider text-text-secondary hover:text-gold active:text-gold transition-colors">Home</a>
                        <a href="#about" className="text-xs font-body tracking-wider text-text-secondary hover:text-gold active:text-gold transition-colors">About</a>
                        <a href="#menu" className="text-xs font-body tracking-wider text-text-secondary hover:text-gold active:text-gold transition-colors">Menu</a>
                        <a href="#gallery" className="text-xs font-body tracking-wider text-text-secondary hover:text-gold active:text-gold transition-colors">Gallery</a>
                        <a href="#franchise" className="text-xs font-body tracking-wider text-text-secondary hover:text-gold active:text-gold transition-colors">Franchise</a>
                        <a href="#contact" className="text-xs font-body tracking-wider text-text-secondary hover:text-gold active:text-gold transition-colors">Contact</a>
                    </div>

                    <p className="font-body text-xs text-text-muted mt-4">
                        &copy; {currentYear} Patanos. All rights reserved. Crafted with passion in San Isidro, Bombon.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
