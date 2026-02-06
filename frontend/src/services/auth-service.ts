// frontend/src/services/auth-service.ts
import apiClient from './api-client';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface RegisterResponse {
  message: string;
  user_id: string;
}

class AuthService {
  async register(credentials: UserCredentials): Promise<RegisterResponse> {
    try {
      const response = await apiClient.register(credentials.email, credentials.password);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Registration failed');
    }
  }

  async login(credentials: UserCredentials): Promise<AuthResponse> {
    try {
      const response = await apiClient.login(credentials.email, credentials.password);
      
      // Store the token in localStorage
      if (response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  }

  async logout(): Promise<{ message: string }> {
    try {
      const response = await apiClient.logout();
      return response;
    } catch (error: any) {
      // Even if the logout API call fails, we should still clear the local token
      localStorage.removeItem('access_token');
      return { message: 'Logged out successfully' };
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}

export default new AuthService();