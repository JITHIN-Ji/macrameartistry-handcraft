import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 shadow-lg backdrop-blur-md" style={{ isolation: 'isolate' }}>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-16">
          {/* Logo */}
          <Link to="/" className="absolute left-4 sm:left-0 lg:left-0 top-1/2 transform -translate-y-1/2 flex items-center space-x-2 flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <img
                src="/MACRA ERA-02.png"
                alt="Macra Era Logo"
                className="h-8 sm:h-10 w-auto"
              />
              <span className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white">
                Macrame Artistry
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation - Moved to Right */}
          <div className={`${!isMobile ? 'flex' : 'hidden'} items-center space-x-4 lg:space-x-8 absolute right-4 top-1/2 transform -translate-y-1/2`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-2 lg:px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            
          </div>

          {/* Mobile Menu Button & Cart Icon - Only on Mobile */}
          {isMobile && (
            <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10000 }}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                  position: 'relative',
                  zIndex: 10002,
                  WebkitTapHighlightColor: 'transparent',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-gray-300" style={{ pointerEvents: 'none' }} />
                ) : (
                  <Menu className="h-6 w-6 text-gray-300" style={{ pointerEvents: 'none' }} />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-dark-800 rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary-600 dark:text-primary-400 bg-gray-200 dark:bg-dark-700'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile user menu removed */}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;