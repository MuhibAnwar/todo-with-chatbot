// frontend/src/pages/index.tsx
import React from 'react';
import Link from 'next/link';
import PageLayout from '../components/layout/PageLayout';
import ChatComponent from '../components/ChatComponent';

const HomePage: React.FC = () => {
  return (
    <PageLayout title="Welcome to Todo App">
      {/* Hero Section with Bold Gradient Background */}
      <div className="relative overflow-hidden bg-gradient-to-br from-near-black via-deep-indigo to-dark-bg">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-electric-blue rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-vibrant-orange rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyber-purple rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="mb-8 inline-block">
            <span className="inline-block px-4 py-2 bg-electric-blue/20 border border-electric-blue rounded-full text-electric-blue font-semibold text-sm">
              ✨ Introducing Smart Task Management
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-electric-blue via-neon-pink to-vibrant-orange">
            Manage Your Tasks With Power
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience the future of productivity. An AI-powered todo app that helps you stay organized, focused, and ahead of the game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/register" className="group relative px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-electric-blue to-cyan-500 rounded-xl hover:shadow-neon transition-all duration-300 transform hover:scale-105">
              Get Started Now
              <span className="absolute inset-0 bg-gradient-to-r from-electric-blue to-cyan-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </Link>
            <Link href="/login" className="px-8 py-4 text-lg font-bold text-white border-2 border-vibrant-orange bg-transparent hover:bg-vibrant-orange/10 rounded-xl transition-all duration-300 transform hover:scale-105">
              Sign In
            </Link>
            <Link href="/tasks" className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-electric-green to-vivid-cyan rounded-xl hover:shadow-neon-green transition-all duration-300 transform hover:scale-105">
              Try as Guest
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section with Modern Cards */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-vibrant-orange">
            Powerful Features
          </h2>
          <p className="text-gray-600 text-lg">Everything you need to boost your productivity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {/* Feature 1 */}
          <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-blue-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/0 to-electric-blue/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold mb-3 text-electric-blue">Lightning Fast</h3>
              <p className="text-gray-700">
                Create and manage tasks instantly with our responsive interface.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-orange-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-vibrant-orange/0 to-vibrant-orange/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold mb-3 text-vibrant-orange">AI Powered</h3>
              <p className="text-gray-700">
                Get intelligent suggestions and automation for your tasks.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-green-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-electric-green/0 to-electric-green/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold mb-3 text-electric-green">Secure & Private</h3>
              <p className="text-gray-700">
                Your data is encrypted and protected with industry standards.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group relative bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-purple-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/0 to-cyber-purple/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-3 text-cyber-purple">Responsive Design</h3>
              <p className="text-gray-700">
                Works seamlessly on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-pink-200 overflow-hidden">
            <div className="relative z-10">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3 text-neon-pink">Smart Prioritization</h3>
              <p className="text-gray-700">
                Set priorities and deadlines to focus on what matters most.
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-cyan-200 overflow-hidden">
            <div className="relative z-10">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-vivid-cyan">Track Progress</h3>
              <p className="text-gray-700">
                Visualize your achievement and track productivity metrics.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Assistant Section */}
      <div className="bg-gradient-to-r from-electric-blue/10 via-purple-500/10 to-vibrant-orange/10 py-20 border-y-2 border-electric-blue/20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-vibrant-orange">
              Chat with Your AI Assistant
            </h2>
            <p className="text-gray-600 text-lg">Get intelligent help managing your tasks</p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-electric-blue/20">
            <ChatComponent />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-r from-electric-blue via-cyber-purple to-vibrant-orange rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Productivity?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have already revolutionized their task management
          </p>
          <Link href="/register" className="inline-block px-10 py-4 bg-white text-electric-blue font-bold text-lg rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
            Start Your Journey Today
          </Link>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;