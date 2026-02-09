// frontend/src/pages/404.tsx
import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';

const NotFoundPage: React.FC = () => {
  return (
    <PageLayout title="">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 */}
          <div className="mb-8 animate-bounce">
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-vibrant-orange mb-4">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-3">
              <span>😕</span>
              <span>Page Not Found</span>
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Oops! The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-gray-500 text-lg">
              Let's get you back to where you need to be
            </p>
          </div>

          {/* Action Buttons */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-electric-blue/30 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/" className="group relative overflow-hidden bg-gradient-to-r from-electric-blue to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-neon transition-all hover:scale-105 flex items-center justify-center space-x-2">
                <span>🏠</span>
                <span>Go to Home</span>
              </Link>
              <Link href="/tasks" className="group relative overflow-hidden bg-gradient-to-r from-electric-green to-emerald-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center space-x-2">
                <span>✓</span>
                <span>View Tasks</span>
              </Link>
            </div>

            <p className="text-gray-600 mt-6 text-sm">
              Can't find what you're looking for?
            </p>
            <Link href="/dashboard" className="inline-block mt-4 text-electric-blue hover:text-vibrant-orange font-bold text-lg transition-colors">
              → Go to Dashboard
            </Link>
          </div>

          {/* Fun Message */}
          <div className="text-6xl">
            🚀 Let's get back on track!
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;