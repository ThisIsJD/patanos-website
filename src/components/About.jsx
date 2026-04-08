import { motion } from 'framer-motion';
import storeImage from '../assets/Photos/gallery_costumers4.jpg';

/**
 * About — Brand story section.
 * Features a split layout (text left, image right) with scroll-triggered fade-in.
 */
function About() {
    const textVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
        }
    };

    return (
        <section id="about" className="py-16 sm:py-24 md:py-32 bg-bg-secondary relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Left: Text Content */}
                    <motion.div
                        className="w-full lg:w-1/2 flex flex-col justify-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={textVariants}
                    >
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase tracking-widest leading-tight mb-4 text-white flex flex-col">
                            <span>OUR STRAIGHT PATH TO</span>
                            <span className="text-gold">FLAVOR</span>
                        </h2>

                        <div className="font-body text-text-secondary text-base leading-relaxed space-y-4">
                            <p>
                                At Patanos, we believe in keeping it real and keeping it bold. Our journey
                                started on the streets, serving up sensations that make taste buds
                                dance and hearts sing.
                            </p>
                            <p>
                                From our signature shakes to our handcrafted sodas, every sip tells
                                a story. We blend modern cafe vibes with authentic street food
                                energy, creating a space where flavor meets culture.
                            </p>
                            <p>
                                No shortcuts. No compromises. Just pure, unapologetic deliciousness
                                straight from our kitchen to your cup.
                            </p>
                        </div>

                        {/* Statistics */}
                        <div className="mt-12 grid grid-cols-3 gap-2 border-t border-border pt-8 text-center sm:text-left">
                            <div className="flex flex-col items-center sm:items-start">
                                <span className="font-display text-3xl lg:text-4xl text-gold">50+</span>
                                <span className="font-body text-[10px] md:text-xs text-text-secondary tracking-widest uppercase mt-1">Menu Items</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start border-l border-border pl-2 sm:pl-6">
                                <span className="font-display text-3xl lg:text-4xl text-gold">10K+</span>
                                <span className="font-body text-[10px] md:text-xs text-text-secondary tracking-widest uppercase mt-1">Happy Customers</span>
                            </div>
                            <div className="flex flex-col items-center sm:items-start border-l border-border pl-2 sm:pl-6">
                                <span className="font-display text-3xl lg:text-4xl text-gold flex items-center">
                                    5<svg className="w-5 h-5 ml-1 lg:ml-2 inline text-gold fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                </span>
                                <span className="font-body text-[10px] md:text-xs text-text-secondary tracking-widest uppercase mt-1">Rating</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Atmospheric Image */}
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={imageVariants}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl group border border-gold border-opacity-30">
                            <div className="absolute inset-0 bg-linear-to-tr from-gold/10 to-transparent mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 group-active:opacity-0"></div>
                            <img
                                src={storeImage}
                                alt="Patanos Sip Sensations community hangout"
                                className="w-full h-auto object-cover aspect-4/3 transform transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

export default About;
