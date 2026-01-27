import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ShoppingCart, LogOut, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { getCartItemCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const cartItemCount = getCartItemCount();
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

  const handleLogout = async () => {
    await logout();
    setShowUserMenu(false);
    navigate('/login');
  };

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
            
            {/* Cart Icon Button */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* User Menu - Desktop */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">
                    {user?.first_name || 'User'}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-dark-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button & Cart Icon - Only on Mobile */}
          {isMobile && (
            <div 
              style={{ 
                position: 'absolute', 
                right: '1rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent'
              }}
            >
              {/* Mobile Cart Icon */}
              <Link
                to="/cart"
                style={{
                  position: 'relative',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#1e293b',
                  border: '1px solid #475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ShoppingCart className="h-5 w-5 text-gray-300" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
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
                  visibility: 'visible',
                  opacity: 1
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
              
              {/* Cart Link in Mobile Menu */}
              <Link
                to="/cart"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === '/cart'
                    ? 'text-primary-600 dark:text-primary-400 bg-gray-200 dark:bg-dark-700'
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-dark-700'
                }`}
              >
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="bg-cyan-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* User Menu in Mobile */}
              {isAuthenticated ? (
                <>
                  <div className="border-t border-gray-200 dark:border-dark-700 mt-2 pt-2">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.first_name} {user?.last_name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-dark-700 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 transition-all text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;