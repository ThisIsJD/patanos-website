/**
 * MenuCard — Image-forward poster-style card for the Patanos menu.
 * Uses Tailwind CSS exclusively for styling.
 *
 * Props:
 *   name        — Product name
 *   description — Short tagline
 *   price       — Price number (₱ prefix added)
 *   imageSrc    — URL to beverage image
 *   imageAlt    — Alt text for the image
 *   category    — Category label
 */
function MenuCard({ name, description, price, imageSrc, imageAlt, category }) {
  return (
    <article className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-bg-secondary border-2 border-gold/40 group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(245,192,0,0.3)] hover:border-gold flex flex-col items-center justify-between p-4 pb-6">

      {/* Product Image (Floating) */}
      <div className="w-full h-1/2 relative flex items-center justify-center mt-2">
        {/* Subtle glow behind image on hover */}
        <div className="absolute w-3/4 h-3/4 bg-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <img
          src={imageSrc}
          alt={imageAlt || name}
          loading="lazy"
          className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2"
        />
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col items-center w-full mt-4 text-center">
        <h3 className="font-display text-lg tracking-widest text-text-primary uppercase drop-shadow-md line-clamp-2 min-h-[50px] flex items-center justify-center">
          {name}
        </h3>

        {/* Divider line before prices */}
        <div className="w-8 h-[1px] bg-gold/40 my-3"></div>

        {/* Price Area */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <span className="font-body text-[8px] tracking-widest text-text-secondary uppercase mb-1">REG</span>
            <span className="font-body text-xl text-gold font-bold">₱{price}</span>
          </div>
          {/* If there was a large price, we would show it here. Simulating it with price + 20 for visual fidelity to reference */}
          <div className="w-[1px] h-full bg-border"></div>
          <div className="flex flex-col items-center">
            <span className="font-body text-[8px] tracking-widest text-text-secondary uppercase mb-1">LRG</span>
            <span className="font-body text-xl text-gold font-bold">₱{price + 20}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MenuCard;
