"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '@/src/lib/api';
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
      console.log('Initializing auth context...');

      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user_data');

        console.log('Stored auth data:', {
          hasToken: !!storedToken,
          hasUser: !!storedUser,
          tokenLength: storedToken?.length
        });

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify token is still valid by fetching profile
          try {
            console.log('Verifying token with profile fetch...');
            const profileResponse = await authApi.getProfile();
            console.log('Profile response:', profileResponse);

            // Handle the nested response structure from backend
            const userData = profileResponse.user || profileResponse.data || profileResponse;

            // Merge with stored user data to preserve all fields
            const mergedUser = {
              ...JSON.parse(storedUser),
              ...userData,
              // Ensure we have the required fields
              first_name: userData.first_name || JSON.parse(storedUser).first_name || '',
              last_name: userData.last_name || JSON.parse(storedUser).last_name || ''
            };

            setUser(mergedUser);
            // Update localStorage with fresh data
            localStorage.setItem('user_data', JSON.stringify(mergedUser));
            console.log('Auth initialization successful with profile verification');
          } catch (error) {
            console.warn('Profile verification failed:', error);

            // Check if it's a network error (backend not running)
            if (!error?.response) {
              console.log('Network error - backend might not be running. Keeping stored user data for offline mode.');
              // Keep the user logged in with stored data if it's a network error
              toast({
                title: "Connection Issue",
                description: "Unable to verify authentication with server. Using offline mode.",
                variant: "destructive",
              });
            } else if (error?.response?.status === 401 || error?.response?.status === 403) {
              console.log('Token is invalid, clearing auth data');
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_data');
              setToken(null);
              setUser(null);
              toast({
                title: "Session Expired",
                description: "Please log in again.",
                variant: "destructive",
              });
            } else {
              console.log('Server error during profile verification, keeping stored user data');
              // For other server errors (500, etc.), keep the user logged in
              toast({
                title: "Server Issue",
                description: "Authentication server is having issues. Using cached data.",
                variant: "destructive",
              });
            }
          }
        } else {
          console.log('No stored auth data found');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        setToken(null);
        setUser(null);
      } finally {
        console.log('Auth initialization complete, setting loading to false');
        setIsLoading(false);
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn('Auth initialization timeout, forcing loading to false');
      setIsLoading(false);
    }, 10000); // 10 second timeout

    initializeAuth().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Starting login process for:', email);

      const response = await authApi.login({ email, password });
      console.log('Login response received:', response);

      if (response.success) {
        const { token: authToken, user: userData } = response.data;

        console.log('Login successful, storing token and user data:', {
          tokenLength: authToken?.length,
          userData: userData
        });

        // Store in localStorage
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(userData));

        // Update state
        setToken(authToken);
        setUser(userData);

        console.log('Auth state updated successfully');

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
