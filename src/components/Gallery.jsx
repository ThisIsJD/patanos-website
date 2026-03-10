import { motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery';

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
        <section id="gallery" className="py-24 bg-bg-primary min-h-[80vh]">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="font-display text-4xl md:text-5xl lg:text-6xl text-gold tracking-widest uppercase mb-4"
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
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-bg-surface border-t-gold rounded-full animate-spin"></div>
                    </div>
                )}

                {error && (
                    <div className="text-center py-20 text-error">
                        <p>Error loading gallery: {error}</p>
                    </div>
                )}

                {!loading && !error && accordionPhotos && (
                    <div className="flex flex-col gap-4 mt-8">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="flex flex-col md:flex-row w-full h-[800px] md:h-[600px] gap-2 md:gap-4"
                        >
                            {accordionPhotos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    variants={itemVariants}
                                    className="relative flex-1 md:flex-1 h-full cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] hover:flex-[3] md:hover:flex-[4] rounded-2xl md:rounded-3xl overflow-hidden group bg-bg-surface border border-gold/10 hover:border-gold/50 shadow-lg"
                                >
                                    {/* Background Image */}
                                    <img
                                        src={photo.image}
                                        alt={photo.caption}
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                                    />

                                    {/* Gradient Overlay (Darkens the bottom for text readability) */}
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                                    {/* Active Overlay (Subtle gold tint on hover) */}
                                    <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Content Elements */}
                                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                                        {/* Numbering (always visible, top left) */}
                                        <span className="absolute top-6 left-6 font-display text-gold/60 text-xl font-bold tracking-widest group-hover:text-gold transition-colors duration-300">
                                            0{index + 1}
                                        </span>

                                        {/* Text Content Container (Hidden until hovered, or rotated if preferred. Here we fade it in on expand) */}
                                        <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-2 min-w-max">
                                            <h3 className="font-display text-xl md:text-2xl lg:text-2xl text-white tracking-wider uppercase drop-shadow-md">
                                                {photo.caption}
                                            </h3>
                                            <div className="w-10 h-1 bg-gold rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
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
                                {overflowPhotos.map((photo) => (
                                    <motion.div
                                        key={photo.id}
                                        variants={itemVariants}
                                        className="relative w-full aspect-square cursor-pointer transition-all duration-[600ms] rounded-2xl md:rounded-3xl overflow-hidden group bg-bg-surface border border-gold/10 hover:border-gold/50 shadow-lg"
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={photo.image}
                                            alt={photo.caption}
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

                                        {/* Active Overlay */}
                                        <div className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Content Elements */}
                                        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                                            {/* Text Content Container (Hidden until hovered) */}
                                            <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100 flex flex-col gap-1 min-w-max">
                                                <h3 className="font-display text-base md:text-lg lg:text-xl text-white tracking-wider uppercase drop-shadow-md">
                                                    {photo.caption}
                                                </h3>
                                                <div className="w-6 h-1 bg-gold rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-300"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Gallery;
