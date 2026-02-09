// frontend/src/components/layout/PageLayout.tsx
import React from 'react';
import Navbar from '../navigation/Navbar';
import Sidebar from '../navigation/Sidebar';
import { useAuth } from '../../hooks/use-auth';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar user={isAuthenticated ? user : undefined} onLogout={handleLogout} />

      <div className="flex flex-1 overflow-hidden">
        {isAuthenticated && <Sidebar user={user} onLogout={handleLogout} />}
        
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {title && (
              <div className="flex justify-between items-start mb-8">
                <h1 className="text-4xl font-black text-gray-800">
                  {title}
                </h1>
                {!isAuthenticated && (
                  <div className="bg-gradient-to-r from-bright-yellow to-orange-300 text-gray-900 px-4 py-3 rounded-xl text-sm font-semibold shadow-lg">
                    <span className="flex items-center space-x-2">
                      <span>👤</span>
                      <span>Guest Mode - Data saved locally</span>
                    </span>
                  </div>
                )}
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PageLayout;