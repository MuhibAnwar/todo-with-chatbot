// frontend/src/pages/profile.tsx
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '../hooks/use-auth';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <PageLayout title="Your Profile">
      <div className="max-w-3xl mx-auto">
        <div className="card p-8">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-vibrant-orange mb-8">Profile Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-electric-blue mb-6 pb-2 border-b border-blue-100">Personal Information</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">Email</label>
                  <p className="mt-1 text-xl text-gray-900 bg-blue-50 py-3 px-4 rounded-lg">{user?.email}</p>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">Account Created</label>
                  <p className="mt-1 text-xl text-gray-900 bg-blue-50 py-3 px-4 rounded-lg">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-vibrant-orange mb-6 pb-2 border-b border-orange-100">Security</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">Password</label>
                  <p className="mt-1 text-xl text-gray-900 bg-orange-50 py-3 px-4 rounded-lg">••••••••</p>
                  <button className="mt-3 btn-primary text-base py-2 px-4">
                    Change Password
                  </button>
                </div>

                <div>
                  <label className="block text-lg font-bold text-gray-700 mb-2">Two-Factor Authentication</label>
                  <p className="mt-1 text-xl text-gray-900 bg-orange-50 py-3 px-4 rounded-lg">Disabled</p>
                  <button className="mt-3 btn-secondary text-base py-2 px-4">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <h3 className="text-2xl font-bold text-electric-green mb-6 pb-2 border-b border-green-100">Account Actions</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn-primary text-lg py-3 px-6">
                Update Profile
              </button>
              <button className="btn-warning text-lg py-3 px-6">
                Download Data
              </button>
              <button className="btn-danger text-lg py-3 px-6">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;