// frontend/src/components/navigation/Navbar.tsx
import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  user?: any;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
              ⚡
            </div>
            <span className="text-lg font-bold text-gray-800">TodoApp</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className="text-sm font-semibold text-gray-700">
                  {user.email}
                </span>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm font-semibold text-hot-red hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-semibold text-gray-700 hover:text-electric-blue transition-colors">
                  Sign In
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-semibold text-white bg-electric-blue rounded-lg hover:bg-blue-600 transition-colors">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            {user ? (
              <>
                <p className="text-sm font-semibold text-gray-700 px-4 py-2">{user.email}</p>
                <button
                  onClick={onLogout}
                  className="w-full text-left px-4 py-2 text-sm font-semibold text-hot-red hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg">
                  Sign In
                </Link>
                <Link href="/register" className="block px-4 py-2 text-sm font-semibold text-white bg-electric-blue rounded-lg text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;