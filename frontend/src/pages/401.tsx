// frontend/src/pages/401.tsx
import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';

const UnauthorizedPage: React.FC = () => {
  return (
    <PageLayout title="">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 401 */}
          <div className="mb-8">
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-hot-red to-vibrant-orange mb-4">
              401
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
              <span>🔒</span>
              <span>Access Denied</span>
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Sorry, you don't have permission to access this page.
            </p>
            <p className="text-gray-500 text-lg">
              Please sign in or contact support for assistance
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 border-2 border-hot-red/20 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-4">This usually happens when:</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-semibold text-gray-800">Your session has expired</p>
                  <p className="text-gray-600 text-sm">Please sign in again to continue</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">⛔</span>
                <div>
                  <p className="font-semibold text-gray-800">Insufficient permissions</p>
                  <p className="text-gray-600 text-sm">You don't have access to this resource</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <span className="text-2xl">🗑️</span>
                <div>
                  <p className="font-semibold text-gray-800">Resource not available</p>
                  <p className="text-gray-600 text-sm">The resource has been moved or deleted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Link href="/login" className="group relative overflow-hidden bg-gradient-to-r from-hot-red to-orange-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-neon-orange transition-all hover:scale-105 flex items-center justify-center space-x-2">
              <span>🔑</span>
              <span>Sign In Again</span>
            </Link>
            <Link href="/" className="group relative overflow-hidden bg-gradient-to-r from-electric-blue to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-neon transition-all hover:scale-105 flex items-center justify-center space-x-2">
              <span>🏠</span>
              <span>Return Home</span>
            </Link>
          </div>

          {/* Support Link */}
          <p className="text-gray-600">
            Need help?{' '}
            <a href="#" className="text-electric-blue hover:text-vibrant-orange font-bold transition-colors">
              Contact our support team →
            </a>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default UnauthorizedPage;

export default UnauthorizedPage;