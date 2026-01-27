import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full relative overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          {/* Dark overlay for better text readability */}
        </div>

       <div className="absolute inset-0 bg-gradient-to-b from-dark-900/30 via-dark-900/20 to-dark-900/50" />

      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Heading */}
          <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight"
        >
          Handcrafted Macrame Art
        </motion.h1>


          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed"
          >
            Discover the beauty of artisanal macrame designs
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center items-center"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg px-10 py-4 rounded-md font-semibold transition-colors"
              >
                Shop Now
              </motion.button>
            </Link>

          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
    </section>
  );
};

export default HeroSection;