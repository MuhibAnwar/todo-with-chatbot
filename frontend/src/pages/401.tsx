// frontend/src/pages/401.tsx
import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';

const UnauthorizedPage: React.FC = () => {
  return (
    <PageLayout title="Access Denied">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-500 mb-4">401</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, you don't have permission to access this page.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <p className="text-gray-600 mb-6">
            This error usually occurs when:
          </p>
          <ul className="list-disc list-inside text-left max-w-md mx-auto space-y-2 text-gray-600 mb-8">
            <li>Your session has expired</li>
            <li>You don't have the required permissions</li>
            <li>The resource has been moved or deleted</li>
          </ul>

          <div className="space-y-4">
            <Link href="/login" className="block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Login Again
            </Link>
            <Link href="/" className="block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default UnauthorizedPage;