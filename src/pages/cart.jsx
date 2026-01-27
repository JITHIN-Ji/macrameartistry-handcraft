import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [completedOrders] = useState([
    {
      id: 'ORD-2024-001',
      date: 'January 15, 2024',
      items: 3,
      total: 234.50,
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80'
    },
    {
      id: 'ORD-2024-002',
      date: 'January 8, 2024',
      items: 2,
      total: 159.99,
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80'
    },
    {
      id: 'ORD-2023-045',
      date: 'December 20, 2023',
      items: 5,
      total: 389.75,
      status: 'Delivered',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&q=80'
    }
  ]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateQuantity = (itemId, change) => {
    updateQuantity(itemId, change);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  // Helper function to get product data from item (handles both database and localStorage items)
  const getProductData = (item) => {
    // Both database and localStorage items now have a flat structure
    return item;
  };

  // Helper function to get the product ID for update/delete operations
  const getProductId = (item) => {
    return item.product_id || item.id;
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const productData = getProductData(item);
    const price = item.price || productData?.price || 0;
    return sum + (price * item.quantity);
  }, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

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
            <span className="text-gray-900">Shopping </span>
            <span className="text-cyan-500">Cart</span>
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-600"
          >
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </motion.p>
        </div>
      </motion.section>

      {/* Cart Items Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-50 rounded-xl p-12 text-center"
                >
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Add some beautiful macrame pieces to get started!</p>
                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
                  >
                    Browse Products
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              ) : (
                cartItems.map((item, index) => {
                  const productData = getProductData(item);
                  const productId = getProductId(item);
                  const itemId = item.id; // Cart item ID for updates/deletes
                  
                  return (
                    <motion.div
                      key={itemId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex gap-6">
                        <img
                          src={productData?.image}
                          alt={productData?.name}
                          className="w-32 h-32 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{productData?.name}</h3>
                              <p className="text-gray-600">Size: {productData?.size}</p>
                            </div>
                            <button
                              onClick={() => handleRemoveItem(productId)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
                              <button
                                onClick={() => handleUpdateQuantity(productId, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => handleUpdateQuantity(productId, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-white rounded hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                              ${((item.price || productData?.price || 0) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          
                          {/* Buy Now Button for Individual Item */}
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => {
                                navigate('/checkout', {
                                  state: {
                                    items: [item],
                                    type: 'single'
                                  }
                                });
                              }}
                              className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors duration-300 flex items-center justify-center gap-2"
                            >
                              <ShoppingBag className="w-5 h-5" />
                              Buy This Now
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl p-8 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {shipping > 0 && (
                  <div className="bg-cyan-100 border border-cyan-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-cyan-800">
                      Add <strong>${(100 - subtotal).toFixed(2)}</strong> more to get FREE shipping!
                    </p>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={cartItems.length === 0}
                  onClick={() => {
                    navigate('/checkout', {
                      state: {
                        items: cartItems,
                        type: 'all'
                      }
                    });
                  }}
                  className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Checkout All Items
                </motion.button>

                <p className="text-center text-sm text-gray-600 mt-2">
                  Or buy individual items separately
                </p>

                <Link
                  to="/products"
                  className="block text-center mt-4 text-cyan-600 hover:text-cyan-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Completed Orders Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-gray-900">Completed </span>
              <span className="text-cyan-500">Orders</span>
            </h2>
            <p className="text-xl text-gray-600">
              Your order history and past purchases
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={order.image}
                    alt={`Order ${order.id}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {order.status}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="w-5 h-5" />
                      <span className="font-mono text-sm">{order.id}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-700">
                      <span>Date:</span>
                      <span className="font-semibold">{order.date}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Items:</span>
                      <span className="font-semibold">{order.items}</span>
                    </div>
                    <div className="flex justify-between text-gray-900 text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 bg-cyan-500 text-white py-2 rounded-lg font-medium hover:bg-cyan-600 transition-colors">
                      Buy Again
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {completedOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-12 text-center"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-600">Start shopping to see your orders here!</p>
            </motion.div>
          )}
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
            Discover More Products
          </motion.h2>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-white/95 mb-12"
          >
            Explore our full collection of handcrafted macrame pieces
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
              Browse All Products
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Cart;