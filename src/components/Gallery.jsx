import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery';

const GalleryImage = ({ src, alt, className }) => {
    const [loaded, setLoaded] = useState(false);
    return (
        <>
            {!loaded && <div className={`absolute inset-0 bg-[#2A2A2A] animate-pulse ${className?.includes('rounded') ? 'rounded-2xl md:rounded-3xl' : ''}`}></div>}
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={(e) => { e.target.src = '/placeholder-drink.png'; setLoaded(true); }}
                className={`${className} transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
        </>
    );
};

/**
 * Gallery — Asymmetric bento grid layout for the #PatanosMoments section.
 * Mix of large and small photo squares fetching data from useGallery hook.
 */
function Gallery() {
    const { data: photos, loading, error } = useGallery();

    const accordionPhotos = photos ? photos.slice(0, 5) : [];
    const overflowPhotos = photos ? photos.slice(5) : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <section id="gallery" className="py-14 sm:py-24 bg-bg-primary min-h-[80vh]">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <div className="text-center mb-10 sm:mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-gold tracking-widest uppercase mb-4"
                    >
                        #PATANOSMOMENTS
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-body text-text-primary text-sm md:text-base tracking-wide"
                    >
                        Tag us to be featured!
                    </motion.p>
                </div>

                {loading && (
                    <div className="flex flex-col gap-4 mt-8">
                        <div className="grid grid-cols-2 gap-2 md:flex md:flex-row w-full md:h-[600px] md:gap-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="aspect-square md:aspect-auto md:flex-1 md:h-full rounded-xl md:rounded-3xl bg-[#141414] border border-yellow-500/20 animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                )}

                {error && !loading && (
                    <div className="flex flex-col items-center justify-center text-center py-20 md:py-32 bg-bg-surface/30 rounded-2xl border border-white/5 mt-8">
                        <span className="text-4xl mb-4 opacity-50 grayscale">⚠️</span>
                        <h3 className="font-display tracking-widest text-text-primary uppercase text-lg mb-2 text-gold/80">Gallery temporarily unavailable.</h3>
                        <p className="font-body text-text-secondary/70">Please visit us in San Isidro, Bombon.</p>
                        <p className="font-body text-xs text-error/30 mt-6 capitalize">{error}</p>
                    </div>
                )}

                {!loading && !error && accordionPhotos && (
                    <div className="flex flex-col gap-4 mt-8">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-2 gap-2 md:flex md:flex-row w-full md:h-[600px] md:gap-4"
                        >
                            {accordionPhotos.map((photo, index) => {
                                const imageSrc = photo.imageUrl || photo.image;
                                const content = (
                                    <>
                                        {/* Background Image */}
                                        <GalleryImage
                                            src={imageSrc}
                                            alt={photo.caption}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105 group-active:scale-105"
                                        />

                                        {/* Gradient Overlay — always visible on mobile, hover on desktop */}
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-500"></div>

                                        {/* Active Overlay (Subtle gold tint on hover/tap) */}
                                        <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>

                                        {/* Content Elements */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6 md:p-8">
                                            {/* Numbering (always visible, top left) */}
                                            <span className="absolute top-3 left-3 sm:top-6 sm:left-6 font-display text-gold/60 text-sm sm:text-xl font-bold tracking-widest md:group-hover:text-gold transition-colors duration-300">
                                                0{index + 1}
                                            </span>

                                            {/* Link Icon (optional) */}
                                            {photo.link && (
                                                <span className="absolute top-3 right-3 sm:top-6 sm:right-6 font-display text-gold/80 text-lg sm:text-2xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:group-hover:-translate-y-1 md:group-hover:translate-x-1">
                                                    ↗
                                                </span>
                                            )}

                                            {/* Text Content — always visible on mobile, hover-reveal on desktop */}
                                            <div className="opacity-100 translate-y-0 md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-1 sm:gap-2">
                                                <h3 className="font-display text-xs sm:text-lg md:text-2xl text-white tracking-wider uppercase drop-shadow-md">
                                                    {photo.caption}
                                                </h3>
                                                <div className="w-6 sm:w-10 h-1 bg-gold rounded-full transform origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 delay-300"></div>
                                            </div>
                                        </div>
                                    </>
                                );

                                const wrapperClasses = `relative aspect-square md:aspect-auto md:flex-1 md:h-full transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] md:hover:flex-[4] rounded-xl md:rounded-3xl overflow-hidden group bg-bg-surface border border-gold/10 hover:border-gold/50 active:border-gold/50 shadow-lg ${photo.link ? 'cursor-pointer' : 'cursor-default'}`;

                                return photo.link ? (
                                    <motion.a
                                        key={photo.id}
                                        variants={itemVariants}
                                        href={photo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={wrapperClasses}
                                    >
                                        {content}
                                    </motion.a>
                                ) : (
                                    <motion.div
                                        key={photo.id}
                                        variants={itemVariants}
                                        className={wrapperClasses}
                                    >
                                        {content}
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Overflow Grid for photos 7+ */}
                        {overflowPhotos.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-100px" }}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4 pt-4 border-t border-yellow-500/20"
                            >
                                {overflowPhotos.map((photo) => {
                                    const imageSrc = photo.imageUrl || photo.image;
                                    const content = (
                                        <>
                            {/* Background Image */}
                                            <GalleryImage
                                                src={imageSrc}
                                                alt={photo.caption}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105 group-active:scale-105"
                                            />

                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-500"></div>

                                            {/* Active Overlay */}
                                            <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>

                                            {/* Content Elements */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4 md:p-6">
                                                {/* Link Icon */}
                                                {photo.link && (
                                                    <span className="absolute top-3 right-3 sm:top-4 sm:right-4 font-display text-gold/80 text-lg sm:text-xl opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform md:group-hover:-translate-y-1 md:group-hover:translate-x-1">
                                                        ↗
                                                    </span>
                                                )}

                                                {/* Text Content — always visible on mobile, hover-reveal on desktop */}
                                                <div className="opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-1">
                                                    <h3 className="font-display text-xs sm:text-base md:text-lg lg:text-xl text-white tracking-wider uppercase drop-shadow-md">
                                                        {photo.caption}
                                                    </h3>
                                                    <div className="w-6 h-1 bg-gold rounded-full transform origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 delay-300"></div>
                                                </div>
                                            </div>
                                        </>
                                    );

                                    const wrapperClasses = `relative w-full aspect-square transition-all duration-[600ms] rounded-xl md:rounded-3xl overflow-hidden group bg-bg-surface border border-gold/10 hover:border-gold/50 active:border-gold/50 shadow-lg ${photo.link ? 'cursor-pointer' : 'cursor-default'}`;

                                    return photo.link ? (
                                        <motion.a
                                            key={photo.id}
                                            variants={itemVariants}
                                            href={photo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={wrapperClasses}
                                        >
                                            {content}
                                        </motion.a>
                                    ) : (
                                        <motion.div
                                            key={photo.id}
                                            variants={itemVariants}
                                            className={wrapperClasses}
                                        >
                                            {content}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Gallery;
