// frontend/src/pages/index.tsx
import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';

const HomePage: React.FC = () => {
  return (
    <PageLayout title="Welcome to Todo App">
      <div className="max-w-3xl mx-auto">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Manage Your Tasks Efficiently</h1>
          <p className="text-xl text-gray-600 mb-8">
            A secure, full-featured todo application to help you stay organized and productive.
          </p>
          <div className="space-x-4">
            <Link href="/register" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg">
              Get Started
            </Link>
            <Link href="/login" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg">
              Login
            </Link>
            <Link href="/tasks" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg">
              Continue as Guest
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Task Management</h2>
            <p className="text-gray-600">
              Create, update, and organize your tasks with ease. Mark tasks as complete when done.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Secure Access</h2>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures and authentication.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Sync Across Devices</h2>
            <p className="text-gray-600">
              Access your tasks from any device with internet connection.
            </p>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-6">
            Join thousands of users who trust our platform to manage their daily tasks and productivity.
          </p>
          <Link href="/register" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
            Create Your Account
          </Link>
        </section>
      </div>
    </PageLayout>
  );
};

export default HomePage;