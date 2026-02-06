// frontend/src/components/layout/PageLayout.tsx
import React from 'react';
import Navbar from '../navigation/Navbar';
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
    <div className="min-h-screen flex flex-col">
      <Navbar user={isAuthenticated ? user : undefined} onLogout={handleLogout} />

      <div className="flex flex-1">
        <main className="flex-1 p-8">
          {title && (
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{title}</h1>
              {!isAuthenticated && (
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm">
                  You are browsing as a guest. Your tasks will be saved locally in this browser.
                </div>
              )}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;