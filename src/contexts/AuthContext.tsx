"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/lib/api';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'teacher' | 'student' | 'parent';
  profile_picture?: string;
  phone?: string;
  address?: string;
  date_of_birth?: string;
  gender?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user && !!token;

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user_data');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          
          // Verify token is still valid by fetching profile
          try {
            const profile = await authApi.getProfile();
            setUser(profile);
          } catch (error) {
            // Token is invalid, clear auth state
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.login({ email, password });
      
      if (response.success) {
        const { token: authToken, user: userData } = response.data;
        
        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        // Update state
        setToken(authToken);
        setUser(userData);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${userData.first_name}!`,
        });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast({
        title: "Login Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      const response = await authApi.register(userData);
      
      if (response.success) {
        const { token: authToken, user: newUser } = response.data;
        
        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(newUser));
        
        // Update state
        setToken(authToken);
        setUser(newUser);
        
        toast({
          title: "Registration Successful",
          description: `Welcome, ${newUser.first_name}!`,
        });
      }
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast({
        title: "Registration Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Call logout API
      await authApi.logout();
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API error:', error);
    } finally {
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      
      // Clear state
      setToken(null);
      setUser(null);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const updatedUser = await authApi.updateProfile(data);
      
      // Update localStorage
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
      
      // Update state
      setUser(updatedUser);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Profile update failed';
      toast({
        title: "Update Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authApi.forgotPassword(email);
      toast({
        title: "Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to send reset email';
      toast({
        title: "Reset Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authApi.resetPassword(token, password);
      toast({
        title: "Password Reset",
        description: "Your password has been successfully reset.",
      });
    } catch (error: any) {
      const message = error.response?.data?.message || 'Password reset failed';
      toast({
        title: "Reset Failed",
        description: message,
        variant: "destructive",
      });
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
