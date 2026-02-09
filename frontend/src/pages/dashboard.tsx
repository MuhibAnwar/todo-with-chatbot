// frontend/src/pages/dashboard.tsx
import React from 'react';
import { useAuth } from '../hooks/use-auth';
import PageLayout from '../components/layout/PageLayout';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageLayout title="Dashboard">
      <div className="max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-12">
          <p className="text-gray-600 text-lg mb-6">
            Good morning, <span className="font-semibold text-gray-800">{user?.email?.split('@')[0]} 👋</span>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Card 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Total Tasks</p>
                  <p className="text-4xl font-black text-electric-blue">0</p>
                </div>
                <span className="text-4xl">📋</span>
              </div>
            </div>

            {/* Stats Card 2 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">Completed</p>
                  <p className="text-4xl font-black text-electric-green">0</p>
                </div>
                <span className="text-4xl">✓</span>
              </div>
            </div>

            {/* Stats Card 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">In Progress</p>
                  <p className="text-4xl font-black text-vibrant-orange">0</p>
                </div>
                <span className="text-4xl">→</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/tasks"
              className="group relative overflow-hidden bg-white border-2 border-electric-blue/30 rounded-xl p-6 hover:border-electric-blue hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">✓</span>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-electric-blue transition-colors">
                    View All Tasks
                  </h3>
                  <p className="text-sm text-gray-600">Manage your tasks</p>
                </div>
              </div>
            </Link>

            <Link
              href="/profile"
              className="group relative overflow-hidden bg-white border-2 border-vibrant-orange/30 rounded-xl p-6 hover:border-vibrant-orange hover:shadow-lg transition-all"
            >
              <div className="flex items-center space-x-4">
                <span className="text-4xl">👤</span>
                <div>
                  <h3 className="font-bold text-gray-800 group-hover:text-vibrant-orange transition-colors">
                    Edit Profile
                  </h3>
                  <p className="text-sm text-gray-600">Update your information</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Updates</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="divide-y">
              <div className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">✨</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Account Created</h4>
                    <p className="text-sm text-gray-600 mt-1">Welcome to TodoApp!</p>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">Today</span>
                </div>
              </div>

              <div className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🔒</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Account Secured</h4>
                    <p className="text-sm text-gray-600 mt-1">Your account is protected with encryption</p>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">Today</span>
                </div>
              </div>

              <div className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🚀</span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Ready to Get Started</h4>
                    <p className="text-sm text-gray-600 mt-1">Create your first task to begin</p>
                  </div>
                  <span className="text-xs text-gray-400 font-semibold">Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;