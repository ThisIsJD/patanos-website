import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMenu } from '../hooks/useMenu';
import MenuCategoryNav from './MenuCategoryNav';
import MenuCard from './MenuCard';

/**
 * Menu — The main menu section container.
 * Features data fetching via useMenu, category filtering, and staggered card animations.
 */
function Menu() {
    const { data: menuItems, categories, loading, error } = useMenu();
    // Default to 'Shakes' based on user request instead of 'All'
    const [activeCategory, setActiveCategory] = useState('Shakes');

    // Filter items based on active category
    const filteredItems = useMemo(() => {
        // 'All' tab is removed, but keeping logic just in case it ever returns.
        if (activeCategory === 'All') return menuItems;
        return menuItems.filter((item) => item.category === activeCategory);
    }, [menuItems, activeCategory]);

    return (
        <section id="menu" className="py-24 bg-bg-primary min-h-screen">
            {/* Menu Header */}
            <div className="container mx-auto px-6 max-w-6xl text-center mb-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    className="font-display text-4xl md:text-5xl uppercase tracking-widest text-white mb-4"
                >
                    OUR <span className="text-gold">MENU</span>
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: 60 }}
                    viewport={{ once: true }}
                    className="h-1 bg-gold mx-auto rounded-full mb-6 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="font-body text-text-secondary max-w-xl mx-auto text-lg"
                >
                    Hand-crafted from scratch. Discover your next favorite craving.
                </motion.p>
            </div>

            {/* Sticky Category Nav */}
            <MenuCategoryNav
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                categories={categories}
            />

            {/* Menu Grid */}
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 mt-8">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="w-full aspect-[4/5] rounded-2xl bg-[#141414] border border-yellow-500/20 animate-pulse flex flex-col items-center justify-between p-4 pb-6">
                                <div className="w-full h-[65%] rounded-xl bg-white/5"></div>
                                <div className="w-full flex flex-col items-center mt-4">
                                    <div className="w-3/4 h-6 rounded bg-white/5 mb-5 mt-auto"></div>
                                    <div className="w-1/2 h-5 rounded bg-white/5"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="flex flex-col items-center justify-center text-center py-20 md:py-32 bg-bg-surface/30 rounded-2xl border border-white/5 mt-8">
                        <span className="text-4xl mb-4 opacity-50 grayscale">⚠️</span>
                        <h3 className="font-display tracking-widest text-text-primary uppercase text-lg mb-2 text-gold/80">Menu temporarily unavailable.</h3>
                        <p className="font-body text-text-secondary/70">Please visit us in San Isidro, Bombon.</p>
                        <p className="font-body text-xs text-error/30 mt-6 capitalize">{error}</p>
                    </div>
                )}

                {/* Not Loading, No Error, and Empty */}
                {!loading && !error && filteredItems.length === 0 && (
                    <div className="flex flex-col items-center justify-center text-center py-20 md:py-32">
                        <p className="font-display tracking-widest text-gold/60 text-lg uppercase">
                            No items in this category yet.
                        </p>
                    </div>
                )}

                {/* Data Grid with AnimatePresence for smooth category switching */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10 mt-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <MenuCard
                                    name={item.name}
                                    sizes={item.sizes}
                                    imageSrc={item.imageUrl}
                                    category={item.category}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Global CSS for the hiding scrollbar on the sticky nav */}
            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .mask-linear {
          mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 1%, black 99%, transparent);
        }
      `}</style>
        </section>
    );
}

export default Menu;
