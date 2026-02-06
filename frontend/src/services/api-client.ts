// frontend/src/services/api-client.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ApiClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include JWT token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle 401 errors
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Check if we're on a tasks page (which could be accessed by guests)
          const currentPath = window.location.pathname;
          if (currentPath.startsWith('/tasks')) {
            // For tasks pages, don't redirect - let the component handle the error
            // This allows guest functionality to work properly
            return Promise.reject(error);
          } else {
            // For other pages, remove token and redirect to login
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication endpoints
  async register(email: string, password: string) {
    return this.client.post('/auth/register', { email, password });
  }

  async login(email: string, password: string) {
    return this.client.post('/auth/login', { email, password });
  }

  async logout() {
    // Remove token from localStorage
    localStorage.removeItem('access_token');
    return { message: 'Logged out successfully' };
  }

  // Task endpoints
  async getTasks(userId: string) {
    return this.client.get(`/api/${userId}/tasks`);
  }

  async createTask(userId: string, title: string, description?: string) {
    return this.client.post(`/api/${userId}/tasks`, { title, description });
  }

  async getTaskById(userId: string, taskId: string) {
    return this.client.get(`/api/${userId}/tasks/${taskId}`);
  }

  async updateTask(userId: string, taskId: string, title: string, description?: string) {
    return this.client.put(`/api/${userId}/tasks/${taskId}`, { title, description });
  }

  async deleteTask(userId: string, taskId: string) {
    return this.client.delete(`/api/${userId}/tasks/${taskId}`);
  }

  async toggleTaskCompletion(userId: string, taskId: string) {
    return this.client.patch(`/api/${userId}/tasks/${taskId}/complete`);
  }
}

export default new ApiClient();