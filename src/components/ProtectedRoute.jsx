import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { motion } from 'framer-motion';

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 * Shows loading state while auth state is being determined
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render if authenticated
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full"
        />
      </div>
    );
  }

  // If user is authenticated, render children
  if (user) {
    return children;
  }

  // If not authenticated, redirect to login with return URL
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;
