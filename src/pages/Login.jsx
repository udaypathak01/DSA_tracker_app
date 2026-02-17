import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { Helmet } from 'react-helmet-async';

/**
 * Login Page Component
 * Modern authentication page with Google and GitHub login options
 * Redirects to dashboard if already logged in
 */
const Login = () => {
  const { user, loading, loginWithGoogle, loginWithGithub, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!loading && user) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [user, loading, navigate, location]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoggingIn(true);
      setSelectedProvider('google');
      await loginWithGoogle();
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoggingIn(false);
      setSelectedProvider(null);
    }
  };

  const handleGithubLogin = async () => {
    try {
      setIsLoggingIn(true);
      setSelectedProvider('github');
      await loginWithGithub();
    } catch (error) {
      console.error('GitHub login error:', error);
    } finally {
      setIsLoggingIn(false);
      setSelectedProvider(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - DSAOrbit</title>
        <meta name="description" content="Login to DSAOrbit to track your DSA progress" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        {/* Login card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
              >
                <div className="inline-block bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </motion.div>

              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                DSAOrbit
              </h1>
              <p className="text-slate-300 text-sm">
                Master Data Structures & Algorithms with Confidence
              </p>
            </div>

            {/* Error message */}
            {authError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6"
              >
                <p className="text-red-400 text-sm">{authError}</p>
              </motion.div>
            )}

            {/* Login buttons */}
            <div className="space-y-3">
              {/* Google login button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold text-white transition-all ${
                  selectedProvider === 'google'
                    ? 'bg-gradient-to-r from-red-500 to-red-600'
                    : 'bg-slate-700 hover:bg-slate-600'
                } disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600 hover:border-slate-500`}
              >
                {isLoggingIn && selectedProvider === 'google' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-slate-300 border-t-white rounded-full"
                    />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </motion.button>

              {/* GitHub login button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGithubLogin}
                disabled={isLoggingIn}
                className={`w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-semibold text-white transition-all ${
                  selectedProvider === 'github'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800'
                    : 'bg-slate-700 hover:bg-slate-600'
                } disabled:opacity-50 disabled:cursor-not-allowed border border-slate-600 hover:border-slate-500`}
              >
                {isLoggingIn && selectedProvider === 'github' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-slate-300 border-t-white rounded-full"
                    />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Continue with GitHub</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-700"></div>
              <span className="text-slate-500 text-sm">or</span>
              <div className="flex-1 h-px bg-slate-700"></div>
            </div>

            {/* Guest access info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-blue-300 text-sm">
                💡 <strong>New to DSAOrbit?</strong> Create a free account with Google or GitHub to save your progress and track your learning journey.
              </p>
            </div>

            {/* Footer link */}
            <p className="text-center text-slate-400 text-xs mt-6">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
};

export default Login;
