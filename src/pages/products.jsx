import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import TattooCard from '../components/TattooCard';

// Data will be fetched from backend

const Portfolio = () => {
  const [selectedTattoo, setSelectedTattoo] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  const { addToCart } = useCart();

  const openModal = (tattoo) => {
    setSelectedTattoo(tattoo);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTattoo(null);
    document.body.style.overflow = 'unset';
  };

  const handleAddToCart = (e, tattoo) => {
    e.stopPropagation();
    
    // Prepare product data for cart
    const productData = {
      id: tattoo.id,
      name: tattoo.title,
      price: tattoo.price,
      image: tattoo.image,
      size: 'Standard' // You can make this dynamic if needed
    };
    
    addToCart(productData);
    setAddedProduct(tattoo.title);
    setShowNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleKeyDown = (e) => {
    if (!selectedTattoo) return;
    
    if (e.key === 'Escape') {
      closeModal();
    }
  };

  React.useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedTattoo]);

  // Fetch products from backend (uses REACT_APP_API_URL or same-origin)
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const url = `${API_BASE}/products`;

    console.log('Fetching from:', url);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (mounted) {
          console.log('Products fetched:', data);
          setProducts(data.products || []);
          setError(null);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        if (mounted) {
          setError(err.message);
          setProducts([]);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-16 min-h-screen bg-white dark:bg-dark-900"
    >
      {/* Success Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center gap-3"
          >
            <CheckCircle className="w-6 h-6" />
            <div>
              <p className="font-semibold">Added to Cart!</p>
              <p className="text-sm">{addedProduct}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-100 to-white dark:from-dark-800 dark:to-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl font-display font-bold text-gray-900 dark:text-white"
            >
              Our <span className="gradient-text">Products</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Discover our complete collection of handcrafted macrame pieces
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <p className="text-center text-gray-500">Loading products...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading && products.length === 0 && !error && <p className="text-center text-gray-500">No products found. Make sure backend is running on port 5000.</p>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p, index) => (
              <motion.div
                key={p.id || index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.03 }}
              >
                <TattooCard
                  tattoo={{
                    id: p.id,
                    title: p.name,
                    description: p.description,
                    price: p.price,
                    image: p.image_url || p.image
                  }}
                  onClick={openModal}
                />

                <div className="p-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleAddToCart(e, { id: p.id, title: p.name, price: p.price, image: p.image_url || p.image })}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedTattoo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 p-2 bg-white/80 dark:bg-dark-800/80 text-gray-900 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-dark-700 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Image */}
              <img
                src={selectedTattoo.image}
                alt={selectedTattoo.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Portfolio;