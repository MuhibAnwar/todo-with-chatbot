// frontend/src/pages/dashboard.tsx
import React from 'react';
import { useAuth } from '../hooks/use-auth';
import PageLayout from '../components/layout/PageLayout';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageLayout title="Dashboard">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user?.email}!</h2>
          <p className="text-gray-600 mb-6">
            This is your personal dashboard. From here you can manage your tasks, update your profile, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/tasks" className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-6 text-center transition-colors">
              <h3 className="text-lg font-semibold text-blue-700">My Tasks</h3>
              <p className="text-gray-600 mt-2">View and manage your tasks</p>
            </Link>

            <Link href="/profile" className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-6 text-center transition-colors">
              <h3 className="text-lg font-semibold text-green-700">Profile</h3>
              <p className="text-gray-600 mt-2">Update your account details</p>
            </Link>

            <Link href="#" className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-6 text-center transition-colors">
              <h3 className="text-lg font-semibold text-purple-700">Settings</h3>
              <p className="text-gray-600 mt-2">Configure app preferences</p>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="text-gray-600">Welcome to the Todo App! Get started by creating your first task.</p>
              <p className="text-xs text-gray-400 mt-1">Just now</p>
            </div>
            <div className="border-l-4 border-gray-300 pl-4 py-1">
              <p className="text-gray-600">Secure authentication enabled for your account</p>
              <p className="text-xs text-gray-400 mt-1">Account created today</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;