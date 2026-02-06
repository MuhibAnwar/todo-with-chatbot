// frontend/src/pages/register.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AuthLayout from '../components/layout/AuthLayout';
import RegisterForm from '../components/auth/RegisterForm';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useAuth } from '../hooks/use-auth';

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState('');

  const handleRegister = async (email: string, password: string) => {
    try {
      await register({ email, password });
      // Redirect to login after successful registration
      router.push('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <AuthLayout title="Create Your Account">
      {error && <ErrorMessage message={error} />}
      <RegisterForm onRegister={handleRegister} onError={handleError} />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;