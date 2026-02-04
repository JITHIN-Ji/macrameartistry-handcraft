import React from 'react';

// Auth system removed. Provide a minimal no-op provider and hook so leftover imports won't break builds.
export const useAuth = () => ({ isAuthenticated: false });
export const AuthProvider = ({ children }) => children;
