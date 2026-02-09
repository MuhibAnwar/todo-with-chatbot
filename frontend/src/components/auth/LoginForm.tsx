// frontend/src/components/auth/LoginForm.tsx
import React, { useState } from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => void;
  onError?: (error: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onLogin(email, password);
    } catch (error: any) {
      if (onError) {
        onError(error.message || 'Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <span>📧</span>
              <span>Email Address</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-white/30 rounded-xl bg-white/10 text-white placeholder-gray-300 font-semibold focus:outline-none focus:ring-4 focus:ring-electric-blue/40 focus:border-electric-blue transition-all"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <span>🔐</span>
              <span>Password</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-white/30 rounded-xl bg-white/10 text-white placeholder-gray-300 font-semibold focus:outline-none focus:ring-4 focus:ring-electric-blue/40 focus:border-electric-blue transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-8 bg-gradient-to-r from-electric-blue to-cyan-500 text-white font-bold text-lg py-3 px-6 rounded-xl hover:shadow-neon transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
            loading ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Signing in...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>Sign In</span>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-white/60 text-sm font-semibold">OR</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      {/* Guest Mode Link */}
      <div className="text-center">
        <p className="text-white/80 mb-3">
          Don't want to sign in?
        </p>
        <a href="/tasks" className="inline-block px-6 py-3 border-2 border-vivid-cyan text-vivid-cyan font-bold rounded-xl hover:bg-vivid-cyan/10 transition-all">
          Continue as Guest →
        </a>
      </div>
    </div>
  );
};

export default LoginForm;