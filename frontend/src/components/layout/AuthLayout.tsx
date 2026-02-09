// frontend/src/components/layout/AuthLayout.tsx
import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  const { loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-near-black to-dark-bg">
        <div className="animate-spin">
          <div className="w-16 h-16 border-4 border-electric-blue border-t-vibrant-orange rounded-full"></div>
        </div>
      </div>
    );
  }

  // Don't render anything if redirecting
  if (isAuthenticated && !loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-near-black via-deep-indigo to-dark-bg flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-electric-blue rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-vibrant-orange rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyber-purple rounded-full blur-3xl"></div>
      </div>

      {/* Back to Home Link */}
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <Link href="/" className="flex items-center space-x-2 text-electric-blue hover:text-vibrant-orange transition-colors font-semibold">
          <span>←</span>
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-vibrant-orange inline-block">
            Todo App
          </Link>
        </div>
        {title && (
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            {title}
          </h2>
        )}
        <p className="mt-2 text-center text-sm text-gray-300">
          {router.pathname === '/login' ? (
            <>
              Don't have an account?{' '}
              <Link href="/register" className="font-medium text-electric-blue hover:text-vibrant-orange transition-colors">
                Create one now
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-electric-blue hover:text-vibrant-orange transition-colors">
                Sign in here
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/20">
          {children}
        </div>
      </div>

      {/* Decorative Bottom Text */}
      <div className="mt-12 text-center relative z-10">
        <p className="text-gray-400 text-sm">
          🔒 Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;