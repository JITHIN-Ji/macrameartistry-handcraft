import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Components
import HeroSection from '../components/HeroSection';
import ProductCard from '../components/productcard';

// Data
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [email, setEmail] = useState('');
  const [featured, setFeatured] = useState([]);
  

  useEffect(() => {
    let mounted = true;
    fetch(`${API_BASE}/products`)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
        if (!mounted) return;
        setFeatured((data.products || []).slice(0, 6));
      })
      .catch(() => {
        if (!mounted) return;
        setFeatured([]);
      });
    return () => { mounted = false };
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Collection */}
      <section className="py-16 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Featured Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
              Explore our finest handwoven pieces
            </p>
          </motion.div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {featured.map((p) => (
              <ProductCard key={p.id} tattoo={{ id: p.id, title: p.name, description: p.description, price: p.price, image_path: p.image_path, image_paths: p.image_paths, image: p.image_url || p.image }} />
            ))}
          </motion.div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 mx-auto"
              >
                <span>View All Products</span>
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Handmade */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-dark-700"
            >
              <div className="text-5xl mb-6">✋</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Handmade
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Each piece is carefully handcrafted with love and attention to detail
              </p>
            </motion.div>

            {/* Natural Materials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-dark-700"
            >
              <div className="text-5xl mb-6">🌿</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Natural Materials
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We use 100% natural cotton and jute rope for sustainable products
              </p>
            </motion.div>

            {/* Quality Assured */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-dark-800 rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-dark-700"
            >
              <div className="text-5xl mb-6">⭐</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Quality Assured
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every product undergoes strict quality checks before shipping
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
              Stay Updated
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Subscribe to get updates on new collections and special offers
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-white text-primary-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;