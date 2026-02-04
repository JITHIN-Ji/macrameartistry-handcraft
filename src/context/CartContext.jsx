import React from 'react';

// Cart system removed. Provide minimal no-op hook/provider to avoid breaking imports.
export const useCart = () => ({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
});

export const CartProvider = ({ children }) => children;