// frontend/src/components/navigation/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface SidebarProps {
  user?: any;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const isActive = (path: string) => currentPath === path;

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/tasks', label: 'My Tasks', icon: '✓' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen p-6 sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-electric-blue to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            ⚡
          </div>
          <span className="text-xl font-black text-gray-800">TodoApp</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Menu</h3>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-electric-blue/10 text-electric-blue font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <div className="ml-auto w-1 h-6 bg-electric-blue rounded-full"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      {user && (
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric-blue to-cyan-500 flex items-center justify-center text-white font-bold">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{user.email?.split('@')[0]}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm font-semibold text-hot-red hover:bg-red-50 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;