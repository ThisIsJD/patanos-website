import { motion } from 'framer-motion';

/**
 * Testimonials — Displays customer reviews in a 3-column grid.
 * Matches the "WHAT PEOPLE SAY" section in the reference design.
 */
function Testimonials() {
    const reviews = [
        {
            id: 1,
            name: "Maria Santos",
            quote: "The best milkshakes in town! The Mango Madness is literally life-changing. Obsessed! 🍋✨",
            rating: 5
        },
        {
            id: 2,
            name: "Juan Dela Cruz",
            quote: "Patanos is my go-to spot for hangouts. Great vibes, amazing drinks, and the snacks are on point!",
            rating: 5
        },
        {
            id: 3,
            name: "Lisa Reyes",
            quote: "Their halo-halo is a work of art! Perfect for beating the heat. Highly recommend! 💛",
            rating: 5
        }
    ];

    return (
        <section id="testimonials" className="py-24 bg-bg-primary">
            <div className="container mx-auto px-6 max-w-6xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="font-display text-4xl md:text-5xl uppercase tracking-widest text-white mb-4"
                    >
                        WHAT PEOPLE SAY
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="font-body text-text-secondary text-sm md:text-base tracking-wide"
                    >
                        Real reviews from real sippers
                    </motion.p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-bg-secondary border border-gold/40 rounded-xl p-8 flex flex-col justify-between"
                        >
                            <div>
                                {/* 5 Stars */}
                                <div className="flex text-gold mb-6">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="font-body text-text-primary text-sm leading-relaxed mb-8">
                                    "{review.quote}"
                                </p>
                            </div>
                            <p className="font-display text-gold text-lg">
                                — {review.name}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Testimonials;
