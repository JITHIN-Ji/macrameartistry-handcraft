import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { getImagePublicUrl } from '../utils/supabaseStorage';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    let mounted = true;
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const url = `${API_BASE}/products/${productId}`;

    console.log('Fetching product from:', url);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: Product not found`);
        return res.json();
      })
      .then(data => {
        if (mounted) {
          // Backend returns product directly, not wrapped in .product
          const productData = data.product || data;
          console.log('Product data received:', productData);
          setProduct(productData);
          setError(null);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        if (mounted) {
          setError(`Failed to load product: ${err.message}`);
          setProduct(null);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false };
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p className="text-gray-500">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16 bg-white dark:bg-dark-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Product not found'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Get images array - handle both single image and multiple images (new and legacy formats)
  const images = (product.image_paths && Array.isArray(product.image_paths) && product.image_paths.length > 0)
    ? product.image_paths 
    : (product.images && Array.isArray(product.images) && product.images.length > 0)
    ? product.images 
    : [product.image_path || product.image_url || product.image || '/pic-placeholder.jpg'];
  
  const currentImage = getImagePublicUrl(images[currentImageIndex] || images[0]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWhatsApp = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const productUrl = `${origin}/products/${product.id}`;
    const text = `Hi, I'm interested in "${product.name}". Price: $${product.price}. ${productUrl}`;
    const encoded = encodeURIComponent(text);
    const waNumber = process.env.REACT_APP_WHATSAPP_NUMBER || '';
    const normalized = (waNumber || '').replace(/[^0-9]/g, '');
    const link = normalized ? `https://wa.me/${normalized}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(link, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 min-h-screen bg-white dark:bg-dark-900"
    >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Products
        </button>
      </div>

      {/* Product Details Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-dark-800 flex items-center justify-center">
              <img
                src={currentImage}
                alt={`${product.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Left and Right Arrows Overlay */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-3 transition-colors z-10 shadow-lg"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-900 rounded-full p-3 transition-colors z-10 shadow-lg"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Image Counter and Dots */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Side - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                {product.category && (
                  <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                    {product.category}
                  </p>
                )}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  ${product.price}
                </span>
                {product.stock !== undefined && (
                  <span className={`text-lg font-semibold ${
                    product.stock > 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="border-t border-b border-gray-200 dark:border-dark-700 py-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base whitespace-pre-wrap">
                  {product.description}
                </p>
              </div>

              {/* WhatsApp Button Below Description */}
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 .1 4.86.1 11.27c0 1.99.52 3.95 1.5 5.66L0 24l7.34-1.92A11.9 11.9 0 0 0 12 22.55c6.63 0 11.9-4.86 11.9-11.27 0-3.01-1.23-5.82-3.38-7.8zM12 20.2c-1.2 0-2.37-.33-3.38-.95l-.24-.15-4.36 1.14 1.17-3.97-.16-.26A8.54 8.54 0 0 1 3.4 11.3c0-4.66 4.01-8.45 8.6-8.45 4.58 0 8.59 3.79 8.59 8.45 0 4.66-4.01 8.45-8.59 8.45z" />
                  <path d="M17.52 14.3c-.28-.14-1.65-.81-1.9-.91-.26-.1-.45-.14-.64.14-.2.28-.78.91-.96 1.1-.18.2-.36.22-.66.08-.3-.15-1.27-.47-2.42-1.48-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.6.13-.12.3-.33.45-.5.15-.17.2-.28.3-.47.1-.2.05-.37-.02-.51-.08-.14-.64-1.53-.88-2.08-.23-.54-.47-.47-.64-.48l-.55-.01c-.18 0-.47.07-.72.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.12 2.86.13.18 1.93 2.95 4.68 4.14 3.26 1.4 3.26.93 3.84.87.59-.06 1.92-.78 2.19-1.53.26-.75.26-1.39.18-1.53-.08-.13-.28-.2-.56-.34z" />
                </svg>
                Contact on WhatsApp
              </button>

              {/* Additional Details */}
              <div className="space-y-4">
                {product.material && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Material:</span>
                    <span className="text-gray-900 dark:text-white">{product.material}</span>
                  </div>
                )}
                {product.featured && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">Featured:</span>
                    <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
