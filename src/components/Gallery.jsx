import { motion } from 'framer-motion';
import { useGallery } from '../hooks/useGallery';

/**
 * Gallery — Asymmetric bento grid layout for the #PatanosMoments section.
 * Mix of large and small photo squares fetching data from useGallery hook.
 */
function Gallery() {
    const { data: photos, loading, error } = useGallery();

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

                {!loading && !error && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]"
                    >
                        {photos.map((photo) => (
                            <motion.div
                                key={photo.id}
                                variants={itemVariants}
                                className={`relative rounded-xl overflow-hidden group bg-bg-surface border border-border ${photo.size === 'large'
                                    ? 'col-span-2 row-span-2'
                                    : 'col-span-1 row-span-1'
                                    }`}
                            >
                                <img
                                    src={photo.image}
                                    alt={photo.caption}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gold/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 mix-blend-multiply"></div>

                                {/* Text explicitly above the mix-blend layer */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 z-10">
                                    <p className="font-display text-bg-primary text-xl md:text-2xl lg:text-3xl text-center leading-tight">
                                        {photo.caption}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

export default Gallery;
