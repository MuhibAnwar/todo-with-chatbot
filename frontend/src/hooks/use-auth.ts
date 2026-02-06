// frontend/src/hooks/use-auth.ts
import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import authService, { UserCredentials } from '../services/auth-service';

interface AuthContextType {
  user: any; // In a real app, you'd have a proper User type
  login: (credentials: UserCredentials) => Promise<void>;
  register: (credentials: UserCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuthStatus = async () => {
      if (authService.isAuthenticated()) {
        setIsAuthenticated(true);
        // In a real app, you might fetch user details here
        // setUser(fetchedUserDetails);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = async (credentials: UserCredentials) => {
    setLoading(true);
    try {
      const data = await authService.login(credentials);
      setIsAuthenticated(true);
      // In a real app, you might fetch user details here
      // setUser(fetchedUserDetails);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: UserCredentials) => {
    setLoading(true);
    try {
      const data = await authService.register(credentials);
      // After registration, user might need to log in or be logged in automatically
      // depending on your requirements
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated
  };

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};