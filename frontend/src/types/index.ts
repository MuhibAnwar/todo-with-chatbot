// frontend/src/types/index.ts

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at?: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
}