import { motion } from 'framer-motion';
import bannerBg from '../assets/Brand/patanos_banner.png';

/**
 * Hero — Full viewport height section.
 * Features staggered entrance animation and the main banner background.
 */
function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-bg-primary px-6"
        >
            {/* Background Image & Overlay */}
            <div className="absolute inset-0">
                <img
                    src={bannerBg}
                    alt="Patanos Banner Background"
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-bg-primary/70 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent"></div>
            </div>

            <motion.div
                className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-16 md:mt-0"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="font-display text-text-primary text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 tracking-wide drop-shadow-md"
                >
                    <span className="text-gold block mb-2">SIP SENSATIONS</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    variants={itemVariants}
                    className="font-body text-text-primary text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 leading-relaxed"
                >
                    A bold beverage experience. Hand-crafted drinks made with passion,
                    premium ingredients, and a touch of local flavor in Bombon.
                </motion.p>

                {/* CTA Button */}
                <motion.div variants={itemVariants}>
                    <a
                        href="#menu"
                        className="inline-flex items-center justify-center font-body font-bold text-sm md:text-base uppercase tracking-wider bg-gold text-on-gold px-8 py-4 rounded-md transition-all duration-300 hover:bg-gold-dark hover:scale-105 shadow-gold hover:shadow-gold-lg"
                    >
                        VIEW MENU
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Hero;
