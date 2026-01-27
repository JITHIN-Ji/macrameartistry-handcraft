import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initialization
    const savedCart = localStorage.getItem('macrameCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch cart from backend when user is authenticated
  useEffect(() => {
    if (user && token) {
      fetchCartFromBackend();
    }
  }, [user, token]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('macrameCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const fetchCartFromBackend = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Transform cart items to flat structure
      const transformedItems = (response.data.items || []).map(item => ({
        id: item.id,
        cart_id: item.cart_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price || (item.product?.price || 0),
        name: item.product?.name,
        image: item.product?.image_url || item.product?.image, // Use image_url from DB
        description: item.product?.description,
        category: item.product?.category,
        size: item.product?.size,
        featured: item.product?.featured
      }));
      
      setCartItems(transformedItems);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product) => {
    try {
      // If user is logged in, add to database
      if (user && token) {
        // Check if item already exists
        const existingItem = cartItems.find(item => item.product_id === product.id);
        
        await axios.post(
          `${API_URL}/cart/add`,
          {
            productId: product.id,
            quantity: existingItem ? 1 : 1,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        // Fetch updated cart from backend
        await fetchCartFromBackend();
      } else {
        // Use localStorage for non-authenticated users
        setCartItems((prevItems) => {
          const existingItem = prevItems.find(item => item.id === product.id);
          
          if (existingItem) {
            return prevItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          } else {
            return [...prevItems, { ...product, quantity: 1 }];
          }
        });
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (user && token) {
        // Find the cart item id for deletion
        const cartItem = cartItems.find(item => item.product_id === productId);
        
        if (cartItem) {
          await axios.delete(
            `${API_URL}/cart/remove/${cartItem.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          // Fetch updated cart from backend
          await fetchCartFromBackend();
        }
      } else {
        // Use localStorage for non-authenticated users
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    }
  };

  const updateQuantity = async (productId, change) => {
    try {
      if (user && token) {
        const cartItem = cartItems.find(item => item.product_id === productId);
        
        if (cartItem) {
          const newQuantity = Math.max(1, cartItem.quantity + change);
          
          await axios.put(
            `${API_URL}/cart/update/${cartItem.id}`,
            { quantity: newQuantity },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          
          // Fetch updated cart from backend
          await fetchCartFromBackend();
        }
      } else {
        // Use localStorage for non-authenticated users
        setCartItems((prevItems) =>
          prevItems.map(item => {
            if (item.id === productId) {
              const newQuantity = Math.max(1, item.quantity + change);
              return { ...item, quantity: newQuantity };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  };

  const clearCart = async () => {
    try {
      if (user && token && cartItems.length > 0) {
        // Find cart id and clear all items
        await axios.delete(
          `${API_URL}/cart/clear/${cartItems[0]?.cart_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price || item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isLoading,
        fetchCartFromBackend
      }}
    >
      {children}
    </CartContext.Provider>
  );
};