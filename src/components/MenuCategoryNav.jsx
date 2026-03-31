/**
 * MenuCategoryNav — Sticky horizontal navigation for the Menu section.
 * Filters menu items by category.
 */
function MenuCategoryNav({ activeCategory, setActiveCategory, categories }) {
    return (
        <div className="bg-bg-primary/95 backdrop-blur-md py-3 sm:py-4 mb-6 sm:mb-12 shadow-md">
            <div className="container mx-auto px-3 sm:px-6 max-w-6xl">
                <ul className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2 mask-linear">
                    {categories.map((category) => (
                        <li key={category}>
                            <button
                                onClick={() => setActiveCategory(category)}
                                className={`whitespace-nowrap px-4 sm:px-6 py-1.5 sm:py-2 font-display text-[10px] sm:text-xs tracking-wider rounded-full transition-all duration-300 border ${activeCategory === category
                                    ? 'border-gold bg-gold text-bg-primary shadow-[0_0_10px_rgba(245,192,0,0.5)]'
                                    : 'border-white text-white hover:border-gold hover:text-gold active:border-gold active:text-gold'
                                    }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MenuCategoryNav;
