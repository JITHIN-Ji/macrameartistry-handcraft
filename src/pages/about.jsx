import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const About = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-white py-20 px-6 mt-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900">About </span>
            <span className="text-cyan-500">Us</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600"
          >
            Discover the story behind our handcrafted macrame pieces
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Macrame Artistry was born from a passion for traditional fiber arts and sustainable living. Founded in 2015, our journey began with a simple belief: that handcrafted macrame pieces can transform any space into a sanctuary of warmth and beauty.
                </p>
                <p>
                  Each knot, each weave tells a story of dedication and love. Our artisans spend countless hours perfecting their craft, using only the finest natural materials to create pieces that are not just beautiful, but also built to last.
                </p>
                <p>
                  What started as a small home-based studio has grown into a thriving business, but our commitment to quality and artistry remains unchanged. We believe in slow fashion, sustainable practices, and creating products that matter.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80"
                alt="Macrame artisan at work"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              To create beautiful, handcrafted macrame pieces that bring joy and artistry into homes around the world, while supporting sustainable practices and fair labor standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Artistry',
                description: 'We celebrate the beauty of handmade craftsmanship and traditional fiber arts techniques.'
              },
              {
                icon: '🌿',
                title: 'Sustainability',
                description: 'All our materials are natural, renewable, and sourced responsibly from ethical suppliers.'
              },
              {
                icon: '💚',
                title: 'Quality',
                description: 'Every piece is crafted with meticulous attention to detail and quality assurance.'
              },
              {
                icon: '🤝',
                title: 'Community',
                description: 'We support fair wages and create employment opportunities for artisans globally.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Macrame Artistry?</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '100%',
                label: 'Handmade',
                description: 'Every single piece is crafted by hand with love and attention to detail.',
                image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&q=80'
              },
              {
                number: 'Natural',
                label: 'Materials',
                description: 'We use only organic cotton, jute, and sustainable fibers in our creations.',
                image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80'
              },
              {
                number: 'Eco',
                label: 'Friendly',
                description: 'Our production process minimizes waste and supports environmental conservation.',
                image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80'
              },
              {
                number: 'Lifetime',
                label: 'Support',
                description: 'We stand behind our products and provide lifetime care and maintenance advice.',
                image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&q=80'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                </div>
                <div className="relative z-10 p-8 h-[320px] flex flex-col justify-end text-white">
                  <div className="text-4xl font-bold mb-2">{item.number}</div>
                  <div className="text-2xl font-semibold mb-3">{item.label}</div>
                  <p className="text-white/90 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-24 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0369A1 0%, #0284C7 50%, #0EA5E9 100%)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Explore Our Collection
          </motion.h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-white/95 mb-12"
          >
            Start your journey with Macrame Artistry today
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-white text-sky-600 px-10 py-5 rounded-lg text-lg font-semibold hover:bg-sky-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Shop Now
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;