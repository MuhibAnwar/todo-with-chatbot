// frontend/src/components/layout/AuthLayout.tsx
import React from 'react';
import { useAuth } from '../../hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  // Don't render anything if redirecting
  if (isAuthenticated && !loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {title && <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;