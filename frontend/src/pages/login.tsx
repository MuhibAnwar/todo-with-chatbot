// frontend/src/pages/login.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../components/layout/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useAuth } from '../hooks/use-auth';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleLogin = async (email: string, password: string) => {
    try {
      await login({ email, password });
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <AuthLayout title="Login to Your Account">
      {error && <ErrorMessage message={error} />}
      <LoginForm onLogin={handleLogin} onError={handleError} />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Register here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;