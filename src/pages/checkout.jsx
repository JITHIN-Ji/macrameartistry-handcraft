import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Lock,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Save
} from 'lucide-react';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [shippingLoading, setShippingLoading] = useState(false);
  const [shippingError, setShippingError] = useState('');
  const [shippingSaved, setShippingSaved] = useState(false);
  const [isShippingUpdated, setIsShippingUpdated] = useState(false);

  // Get items from navigation state
  const checkoutItems = location.state?.items || [];

  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Delivery Method
    deliveryMethod: 'standard',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Billing Address
    sameAsShipping: true,
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    
    // Additional
    orderNotes: ''
  });

  const [errors, setErrors] = useState({});

  const fetchShippingInfo = useCallback(async () => {
    try {
      setShippingLoading(true);
      const response = await axios.get(`${API_URL}/users/shipping`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const shippingData = response.data;
      setFormData(prev => ({
        ...prev,
        phone: shippingData.phone || '',
        address: shippingData.street || '',
        city: shippingData.city || '',
        state: shippingData.state || '',
        zipCode: shippingData.zip_code || '',
        country: shippingData.country || 'United States'
      }));
      setShippingError('');
    } catch (error) {
      console.error('Failed to fetch shipping info:', error);
      setShippingError('Could not load saved shipping address');
    } finally {
      setShippingLoading(false);
    }
  }, [API_URL, token]);

  // Fetch user shipping information on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect if no items
    if (checkoutItems.length === 0) {
      navigate('/cart');
    }

    // Pre-fill user data from auth and fetch shipping info
    if (user && token) {
      setFormData(prev => ({
        ...prev,
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || ''
      }));

      // Fetch shipping address
      fetchShippingInfo();
    }
  }, [checkoutItems, fetchShippingInfo, navigate, user, token]);

  const saveShippingInfo = async (e) => {
    e.preventDefault();
    
    if (!user || !token) {
      setShippingError('You must be logged in to save shipping address');
      return;
    }

    try {
      setShippingLoading(true);
      await axios.put(
        `${API_URL}/users/shipping`,
        {
          phone: formData.phone,
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          country: formData.country
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShippingSaved(true);
      setIsShippingUpdated(true);
      setTimeout(() => setShippingSaved(false), 3000);
      setShippingError('');
    } catch (error) {
      console.error('Failed to save shipping info:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to save shipping address';
      setShippingError(errorMessage);
    } finally {
      setShippingLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Delivery',
      time: '5-7 Business Days',
      price: 0,
      description: 'Free shipping on orders over $100'
    },
    {
      id: 'express',
      name: 'Express Delivery',
      time: '2-3 Business Days',
      price: 15,
      description: 'Fast delivery to your doorstep'
    },
    {
      id: 'overnight',
      name: 'Overnight Delivery',
      time: '1 Business Day',
      price: 30,
      description: 'Next day delivery guaranteed'
    }
  ];

  // Calculate totals
  const subtotal = checkoutItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const selectedDelivery = deliveryOptions.find(opt => opt.id === formData.deliveryMethod);
  const shippingCost = subtotal > 100 && formData.deliveryMethod === 'standard' ? 0 : selectedDelivery.price;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const validateForm = () => {
    const newErrors = {};
    
    // Shipping validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Payment validation
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Generate order ID
      const newOrderId = `ORD-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      setOrderId(newOrderId);
      setOrderPlaced(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Scroll to first error
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderId}</p>
            </div>
            
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Order Confirmation</p>
                  <p className="text-gray-600 text-sm">You'll receive a confirmation email at {formData.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Estimated Delivery</p>
                  <p className="text-gray-600 text-sm">{selectedDelivery.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">Shipping Address</p>
                  <p className="text-gray-600 text-sm">
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Link
                to="/cart"
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Back to Cart
              </Link>
              <Link
                to="/products"
                className="flex-1 bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Cart
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            <span className="text-gray-900">Secure </span>
            <span className="text-cyan-500">Checkout</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Complete your order in a few simple steps
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Shipping Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="John"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Apartment, Suite, etc. (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Apt 4B"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="New York"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="NY"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="10001"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.zipCode}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Country *
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                {/* Save Shipping Button */}
                {user && token && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    {shippingError && (
                      <p className="text-red-500 text-sm mb-3 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {shippingError}
                      </p>
                    )}
                    {shippingSaved && (
                      <p className="text-green-500 text-sm mb-3 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Shipping address saved successfully!
                      </p>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={saveShippingInfo}
                      disabled={shippingLoading}
                      className={`w-full text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
                        isShippingUpdated 
                          ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600' 
                          : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                      }`}
                    >
                      <Save className="w-5 h-5" />
                      {shippingLoading ? (isShippingUpdated ? 'Updating...' : 'Saving...') : (isShippingUpdated ? 'Update Shipping Address' : 'Save Shipping Address')}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>

              {/* Delivery Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Method</h2>
                
                <div className="space-y-4">
                  {deliveryOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.deliveryMethod === option.id
                          ? 'border-cyan-500 bg-cyan-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value={option.id}
                          checked={formData.deliveryMethod === option.id}
                          onChange={handleInputChange}
                          className="w-5 h-5 text-cyan-500"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">{option.name}</p>
                          <p className="text-sm text-gray-600">{option.time}</p>
                          <p className="text-xs text-gray-500">{option.description}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">
                        {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                      </p>
                    </label>
                  ))}
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-cyan-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900">Secure Payment</p>
                    <p className="text-xs text-blue-700">Your payment information is encrypted and secure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className={`w-full pl-10 pr-4 py-3 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.cardNumber}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                      placeholder="John Doe"
                    />
                    {errors.cardName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" /> {errors.cardName}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.expiryDate}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent`}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cvv && (
                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> {errors.cvv}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="sameAsShipping"
                      checked={formData.sameAsShipping}
                      onChange={handleInputChange}
                      className="w-5 h-5 mt-0.5 text-cyan-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">
                      Billing address is the same as shipping address
                    </span>
                  </label>
                </div>
              </motion.div>

              {/* Order Notes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Notes (Optional)</h2>
                <textarea
                  name="orderNotes"
                  value={formData.orderNotes}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
                  placeholder="Add any special instructions for your order..."
                />
              </motion.div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-8 sticky top-24"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping ({selectedDelivery.name})</span>
                    <span className="font-semibold">
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-4 rounded-lg font-semibold hover:from-cyan-600 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Place Order - ${total.toFixed(2)}
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing your order, you agree to our Terms of Service and Privacy Policy
                </p>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;