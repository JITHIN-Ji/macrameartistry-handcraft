import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ tattoo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(tattoo)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={tattoo.image}
          alt={tattoo.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        

      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">
          {tattoo.title}
        </h3>
        
        <div className="mb-4">
          <span className="text-2xl font-bold text-blue-500">
            ${tattoo.price || '45.00'}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {tattoo.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          {(() => {
            const origin = typeof window !== 'undefined' ? window.location.origin : '';
            const productUrl = `${origin}/products`;
            const text = `Hi, I'm interested in \"${tattoo.title}\". ${tattoo.description || ''} Price: ${tattoo.price || ''} ${productUrl}`;
            const encoded = encodeURIComponent(text);
            const waNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '';
            const normalized = (waNumber || '').replace(/[^0-9]/g, '');
            const link = normalized ? `https://wa.me/${normalized}?text=${encoded}` : `https://wa.me/?text=${encoded}`;

            return (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.stopPropagation(); }}
                className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
                title="Message on WhatsApp"
                aria-label={`Message ${tattoo.title} on WhatsApp`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .1 4.86.1 11.27c0 1.99.52 3.95 1.5 5.66L0 24l7.34-1.92A11.9 11.9 0 0 0 12 22.55c6.63 0 11.9-4.86 11.9-11.27 0-3.01-1.23-5.82-3.38-7.8zM12 20.2c-1.2 0-2.37-.33-3.38-.95l-.24-.15-4.36 1.14 1.17-3.97-.16-.26A8.54 8.54 0 0 1 3.4 11.3c0-4.66 4.01-8.45 8.6-8.45 4.58 0 8.59 3.79 8.59 8.45 0 4.66-4.01 8.45-8.59 8.45z" />
                  <path d="M17.52 14.3c-.28-.14-1.65-.81-1.9-.91-.26-.1-.45-.14-.64.14-.2.28-.78.91-.96 1.1-.18.2-.36.22-.66.08-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.6.13-.12.3-.33.45-.5.15-.17.2-.28.3-.47.1-.2.05-.37-.02-.51-.08-.14-.64-1.53-.88-2.08-.23-.54-.47-.47-.64-.48l-.55-.01c-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.12 2.86.13.18 1.93 2.95 4.68 4.14 3.26 1.4 3.26.93 3.84.87.59-.06 1.92-.78 2.19-1.53.26-.75.26-1.39.18-1.53-.08-.13-.28-.2-.56-.34z" />
                </svg>
                <span className="text-sm">WhatsApp</span>
              </a>
            );
          })()}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;