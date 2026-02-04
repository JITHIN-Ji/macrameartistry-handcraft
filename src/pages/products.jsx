import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ProductCard from '../components/productcard';

// Data will be fetched from backend

const Portfolio = () => {
  const [selectedTattoo, setSelectedTattoo] = useState(null);

  const openModal = (tattoo) => {
    setSelectedTattoo(tattoo);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedTattoo(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const onKeyDown = (e) => {
      if (!selectedTattoo) return;
      if (e.key === 'Escape') {
        setSelectedTattoo(null);
        document.body.style.overflow = 'unset';
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
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
      {/* (Cart/notification removed) */}

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
                <ProductCard
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
                  {/* Cart removed - products are displayed only */}
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