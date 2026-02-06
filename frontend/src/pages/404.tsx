// frontend/src/pages/404.tsx
import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';

const NotFoundPage: React.FC = () => {
  return (
    <PageLayout title="Page Not Found">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-6">
            Here are some helpful links to get you back on track:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Home Page
            </Link>
            <Link href="/tasks" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">
              My Tasks
            </Link>
          </div>

          <div className="mt-6">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 underline">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;