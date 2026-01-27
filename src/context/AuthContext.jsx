import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Check if token exists and is still valid on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      const hasVisited = localStorage.getItem('hasVisited');

      if (!hasVisited) {
        setIsFirstVisit(true);
        localStorage.setItem('hasVisited', 'true');
      }

      if (storedToken) {
        try {
          // Verify token is still valid
          const response = await axios.get(`${API_URL}/auth/verify`, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          if (response.data.valid && response.data.user) {
            setToken(storedToken);
            setUser(response.data.user);
          } else {
            // Token invalid, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        } catch (error) {
          console.log('Token verification failed:', error.message);
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }

      setLoading(false);
    };

    initializeAuth();
  }, []);

  const register = async (firstName, lastName, email, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await axios.post(`${API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });

      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userData', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      setIsFirstVisit(false);

      return { success: true, user: newUser };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return { success: false, error: message };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token: newToken, user: newUser } = response.data;

      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userData', JSON.stringify(newUser));

      setToken(newToken);
      setUser(newUser);
      setIsFirstVisit(false);

      return { success: true, user: newUser };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post(
          `${API_URL}/auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log('Logout error:', error.message);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setToken(null);
      setUser(null);
    }
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        isFirstVisit,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
