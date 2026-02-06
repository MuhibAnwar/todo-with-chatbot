// frontend/src/components/navigation/Navbar.tsx
import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  user?: any; // In a real app, you'd have a proper User type
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-gradient-to-r from-electric-blue to-vibrant-orange text-pure-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-extrabold tracking-wide">
              Todo App
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="font-semibold">Welcome, {user.email}</span>
                <button
                  onClick={onLogout}
                  className="bg-hot-red hover:bg-red-700 text-pure-white px-4 py-2 rounded-lg font-bold transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <span className="bg-bright-yellow text-near-black px-3 py-1 rounded-full font-bold">
                  Guest Mode
                </span>
                <Link href="/login" className="hover:underline font-bold">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;