// frontend/src/components/navigation/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  user?: any; // In a real app, you'd have a proper User type
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  return (
    <aside className="bg-gray-100 w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Menu</h2>
      </div>
      
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/tasks" className="block py-2 px-4 rounded hover:bg-gray-200">
              My Tasks
            </Link>
          </li>
          <li>
            <Link href="/profile" className="block py-2 px-4 rounded hover:bg-gray-200">
              Profile
            </Link>
          </li>
        </ul>
      </nav>
      
      {user && (
        <div className="mt-8 pt-8 border-t border-gray-300">
          <h3 className="font-medium mb-2">User Info</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;