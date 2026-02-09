// frontend/src/pages/profile.tsx
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../hooks/use-auth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageLayout title="👤 Your Profile">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-electric-blue/10 via-cyber-purple/10 to-vibrant-orange/10 rounded-2xl p-8 border-2 border-electric-blue/30 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-electric-blue to-cyan-500 flex items-center justify-center text-4xl">
              👤
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{user?.email?.split('@')[0] || 'User'}</h2>
              <p className="text-gray-600 font-semibold flex items-center space-x-2">
                <span>📧</span>
                <span>{user?.email}</span>
              </p>
              <p className="text-green-600 font-semibold mt-2 flex items-center space-x-2">
                <span>✓</span>
                <span>Account Verified</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Personal Information Card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-electric-blue/20 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <span>ℹ️</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-cyan-500">
                Personal Information
              </span>
            </h3>

            <div className="space-y-5">
              <div className="bg-blue-50 rounded-xl p-4 border border-electric-blue/20">
                <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Email Address</label>
                <p className="text-xl font-bold text-electric-blue">{user?.email}</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-electric-blue/20">
                <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Account Created</label>
                <p className="text-xl font-bold text-gray-800">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'N/A'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ({user?.created_at ? Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)) : 0} days ago)
                </p>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-2xl p-8 border-2 border-vibrant-orange/20 shadow-lg hover:shadow-xl transition-all">
            <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <span>🔒</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-orange to-pink-500">
                Security Settings
              </span>
            </h3>

            <div className="space-y-5">
              <div className="bg-orange-50 rounded-xl p-4 border border-vibrant-orange/20">
                <label className="block text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Password</label>
                <p className="text-lg font-bold text-gray-800 mb-4">••••••••••••</p>
                <button className="w-full bg-gradient-to-r from-vibrant-orange to-orange-400 text-white font-bold py-2 px-4 rounded-lg hover:shadow-neon-orange transition-all">
                  🔑 Change Password
                </button>
              </div>

              <div className="bg-orange-50 rounded-xl p-4 border border-vibrant-orange/20">
                <label className="block text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">Two-Factor Authentication</label>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">🔓 Disabled</span>
                  <button className="bg-gradient-to-r from-electric-blue to-cyan-500 text-white font-bold py-2 px-4 rounded-lg hover:shadow-neon transition-all">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-near-black to-deep-indigo rounded-2xl p-8 text-white mb-8 border border-electric-blue/30">
          <h3 className="text-2xl font-bold mb-6">📊 Account Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-black mb-2 text-electric-blue">0</div>
              <div className="text-gray-300 font-semibold">Total Tasks</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-black mb-2 text-electric-green">0</div>
              <div className="text-gray-300 font-semibold">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
              <div className="text-4xl font-black mb-2 text-vibrant-orange">0</div>
              <div className="text-gray-300 font-semibold">In Progress</div>
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <span>⚙️</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple to-pink-500">
              Account Actions
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group relative overflow-hidden bg-gradient-to-r from-electric-blue to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-neon transition-all hover:scale-105">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>✏️</span>
                <span>Update Profile</span>
              </span>
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-r from-bright-yellow to-amber-400 text-near-black font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all hover:scale-105">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>📥</span>
                <span>Export Data</span>
              </span>
            </button>

            <button className="group relative overflow-hidden bg-gradient-to-r from-hot-red to-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all hover:scale-105">
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>🗑️</span>
                <span>Delete Account</span>
              </span>
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            ⚠️ Deleting your account is permanent and cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;