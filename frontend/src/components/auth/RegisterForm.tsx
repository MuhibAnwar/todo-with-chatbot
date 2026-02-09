// frontend/src/components/auth/RegisterForm.tsx
import React, { useState } from 'react';

interface RegisterFormProps {
  onRegister: (email: string, password: string) => void;
  onError?: (error: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onError }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      if (onError) {
        onError('Passwords do not match');
      }
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      if (onError) {
        onError('Password must be at least 8 characters long');
      }
      return;
    }

    setLoading(true);

    try {
      await onRegister(email, password);
    } catch (error: any) {
      setError(error.message || 'Registration failed');
      if (onError) {
        onError(error.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = password.length > 0
    ? password.length < 8
      ? 'weak'
      : password.length < 12
      ? 'medium'
      : 'strong'
    : null;

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
            <div className="relative mb-2">
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
            {password && (
              <div className="text-sm font-semibold flex items-center space-x-2">
                <div className="flex-1 h-1 rounded-full bg-gray-700 overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      passwordStrength === 'weak'
                        ? 'w-1/3 bg-hot-red'
                        : passwordStrength === 'medium'
                        ? 'w-2/3 bg-bright-yellow'
                        : 'w-full bg-electric-green'
                    }`}
                  ></div>
                </div>
                <span className={
                  passwordStrength === 'weak'
                    ? 'text-hot-red'
                    : passwordStrength === 'medium'
                    ? 'text-bright-yellow'
                    : 'text-electric-green'
                }>
                  {passwordStrength === 'weak' ? '⚠️ Weak' : passwordStrength === 'medium' ? '⚡ Medium' : '✓ Strong'}
                </span>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-lg font-bold text-white mb-3 flex items-center space-x-2">
              <span>🔄</span>
              <span>Confirm Password</span>
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-white/30 rounded-xl bg-white/10 text-white placeholder-gray-300 font-semibold focus:outline-none focus:ring-4 focus:ring-electric-blue/40 focus:border-electric-blue transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {confirmPassword && password === confirmPassword && (
              <p className="text-electric-green text-sm font-semibold mt-2">✓ Passwords match</p>
            )}
            {confirmPassword && password !== confirmPassword && (
              <p className="text-hot-red text-sm font-semibold mt-2">✕ Passwords don't match</p>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-hot-red/20 border-2 border-hot-red rounded-xl flex items-center space-x-3">
            <span>⚠️</span>
            <p className="text-hot-red font-semibold">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !email || !password || password !== confirmPassword}
          className={`w-full mt-8 bg-gradient-to-r from-electric-green to-emerald-500 text-near-black font-bold text-lg py-3 px-6 rounded-xl hover:shadow-neon-green transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 ${
            loading || !email || !password || password !== confirmPassword
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>🎉</span>
              <span>Create Account</span>
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
          Want to explore first?
        </p>
        <a href="/tasks" className="inline-block px-6 py-3 border-2 border-vivid-cyan text-vivid-cyan font-bold rounded-xl hover:bg-vivid-cyan/10 transition-all">
          Try as Guest →
        </a>
      </div>
    </div>
  );
};

export default RegisterForm;