// frontend/src/utils/guest-storage.ts
import { Task } from '../types';

const GUEST_TASKS_KEY = 'guest_tasks';

export const getGuestTasks = (): Task[] => {
  if (typeof window !== 'undefined') {
    const storedTasks = localStorage.getItem(GUEST_TASKS_KEY);
    if (storedTasks) {
      return JSON.parse(storedTasks);
    }
  }
  return [];
};

export const saveGuestTasks = (tasks: Task[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GUEST_TASKS_KEY, JSON.stringify(tasks));
  }
};

export const clearGuestTasks = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(GUEST_TASKS_KEY);
  }
};

export const addGuestTask = (task: Task): Task[] => {
  const tasks = getGuestTasks();
  const updatedTasks = [...tasks, task];
  saveGuestTasks(updatedTasks);
  return updatedTasks;
};

export const updateGuestTask = (taskId: string, updatedTask: Partial<Task>): Task[] => {
  const tasks = getGuestTasks();
  const updatedTasks = tasks.map(task => 
    task.id === taskId 
      ? { 
          ...task, 
          ...updatedTask, 
          updated_at: new Date().toISOString() 
        } 
      : task
  );
  saveGuestTasks(updatedTasks);
  return updatedTasks;
};

export const deleteGuestTask = (taskId: string): Task[] => {
  const tasks = getGuestTasks();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveGuestTasks(updatedTasks);
  return updatedTasks;
};

export const toggleGuestTaskCompletion = (taskId: string): Task[] => {
  const tasks = getGuestTasks();
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? {...task, completed: !task.completed} : task
  );
  saveGuestTasks(updatedTasks);
  return updatedTasks;
};