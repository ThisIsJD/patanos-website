import { useState } from 'react';

/**
 * MenuCard — Image-forward poster-style card for the Patanos menu.
 * Uses Tailwind CSS exclusively for styling.
 *
 * Props:
 *   name        — Product name
 *   description — Short tagline
 *   sizes       — Array of { size, price } grouped from CMS
 *   imageSrc    — URL to beverage image
 *   imageAlt    — Alt text for the image
 *   category    — Category label
 */
function MenuCard({ name, description, sizes, imageSrc, imageAlt, category }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <article className="relative w-full aspect-3/4 sm:aspect-4/5 rounded-xl sm:rounded-2xl overflow-hidden bg-bg-secondary border-2 border-gold/40 group cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_30px_rgba(245,192,0,0.3)] active:shadow-[0_0_20px_rgba(245,192,0,0.2)] hover:border-gold active:border-gold flex flex-col items-center justify-between p-2.5 pb-3 sm:p-4 sm:pb-6">

      {/* Product Image (Floating) */}
      <div className="w-full h-1/2 relative flex items-center justify-center mt-1 sm:mt-2">
        {/* Subtle glow behind image on hover */}
        <div className="absolute w-full h-full bg-bg-secondary animate-pulse rounded-xl sm:rounded-2xl" style={{ display: imageLoaded ? 'none' : 'block' }}></div>
        <div className="absolute w-3/4 h-3/4 bg-gold/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-500"></div>
        <img
          src={imageSrc}
          alt={imageAlt || name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => { e.target.src = '/placeholder-drink.png'; setImageLoaded(true); }}
          style={{ opacity: imageLoaded ? 1 : 0 }}
          className="relative z-10 w-full h-full object-contain drop-shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-active:scale-105"
        />
      </div>

      {/* Bottom Content Area */}
      <div className="flex flex-col items-center w-full mt-2 sm:mt-4 text-center">
        <h3 className="font-display text-xs sm:text-lg tracking-widest text-text-primary uppercase drop-shadow-md line-clamp-2 min-h-8 sm:min-h-12.5 flex items-center justify-center leading-tight">
          {name}
        </h3>

        {/* Divider line before prices */}
        <div className="w-6 sm:w-8 h-px bg-gold/40 my-1.5 sm:my-3"></div>

        {/* Price Area */}
        {(!sizes || sizes.length === 0) ? null :
          sizes.length === 1 ? (
            <span className="font-body text-base sm:text-xl text-gold font-bold">
              ₱{parseFloat(sizes[0].price).toFixed(0)}
            </span>
          ) : sizes.length === 2 ? (
            <div className="flex items-center gap-1.5 sm:gap-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-body text-[10px] sm:text-xs text-text-secondary">{sizes[0].size}</span>
                <span className="font-body text-sm sm:text-lg text-gold font-bold">₱{parseFloat(sizes[0].price).toFixed(0)}</span>
              </div>
              <span className="text-text-secondary/50">|</span>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-body text-[10px] sm:text-xs text-text-secondary">{sizes[1].size}</span>
                <span className="font-body text-sm sm:text-lg text-gold font-bold">₱{parseFloat(sizes[1].price).toFixed(0)}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-1 sm:gap-y-2 w-full justify-items-center">
              {sizes.map((s, index) => (
                <div key={index} className="flex items-center gap-1 sm:gap-2 w-full justify-between">
                  <span className="font-body text-[10px] sm:text-xs text-text-secondary">{s.size}</span>
                  <span className="font-body text-xs sm:text-base text-gold font-bold">₱{parseFloat(s.price).toFixed(0)}</span>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </article>
  );
}

export default MenuCard;
