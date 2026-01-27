import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TattooCard = ({ tattoo, onClick }) => {
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
        
        {/* Overlay with View Details Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            View Details
          </motion.button>
        </motion.div>
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
      </div>
    </motion.div>
  );
};

export default TattooCard;