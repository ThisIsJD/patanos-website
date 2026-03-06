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
                    <div className="flex justify-center items-center py-20">
                        <div className="w-12 h-12 border-4 border-bg-surface border-t-gold rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-20 bg-bg-surface rounded-xl border border-error/50">
                        <p className="text-error font-body font-bold text-lg mb-2">Failed to load menu</p>
                        <p className="text-text-secondary">{error}</p>
                    </div>
                )}

                {/* Not Loading, No Error, and Empty */}
                {!loading && !error && filteredItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-body text-text-secondary text-lg">
                            No items found in this category.
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
                                    price={item.price}
                                    imageSrc={item.image}
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
