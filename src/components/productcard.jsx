import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getImagePublicUrl } from '../utils/supabaseStorage';

const ProductCard = ({ tattoo, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/products/${tattoo.id}`);
  };

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
          src={getImagePublicUrl(tattoo.image_path || (Array.isArray(tattoo.image_paths) && tattoo.image_paths[0]) || tattoo.image)}
          alt={tattoo.title || tattoo.name}
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

        <div className="mt-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;