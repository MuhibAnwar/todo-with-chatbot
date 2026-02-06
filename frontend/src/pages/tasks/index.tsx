// frontend/src/pages/tasks/index.tsx
import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import PageLayout from '../../components/layout/PageLayout';
import TaskForm from '../../components/tasks/TaskForm';
import TaskList from '../../components/tasks/TaskList';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import apiClient from '../../services/api-client';
import { useAuth } from '../../hooks/use-auth';
import {
  getGuestTasks,
  addGuestTask,
  updateGuestTask,
  deleteGuestTask,
  toggleGuestTaskCompletion
} from '../../utils/guest-storage';

const TasksPage: React.FC = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, [user]); // Added user as dependency to refetch when auth status changes

  const fetchTasks = async () => {
    try {
      setLoading(true);

      if (user) {
        // Authenticated user - fetch from backend
        const response = await apiClient.getTasks(user.id);
        setTasks(response.data);
      } else {
        // Guest user - fetch from localStorage using utility
        const storedTasks = getGuestTasks();
        setTasks(storedTasks);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData: { title: string; description?: string }) => {
    try {
      if (user) {
        // Authenticated user - save to backend
        const response = await apiClient.createTask(user.id, taskData.title, taskData.description);
        setTasks([...tasks, response.data]);
      } else {
        // Guest user - save to localStorage using utility
        const newTask = {
          id: Date.now().toString(), // Simple ID generation for guest tasks
          title: taskData.title,
          description: taskData.description || '',
          completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        const updatedTasks = addGuestTask(newTask);
        setTasks(updatedTasks);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId: string, updatedTask: Partial<Task>) => {
    try {
      if (user) {
        // Authenticated user - update on backend
        const response = await apiClient.updateTask(user.id, taskId, updatedTask.title!, updatedTask.description || '');
        setTasks(tasks.map(task => task.id === taskId ? {...response.data} : task));
        setEditingTask(null);
      } else {
        // Guest user - update in localStorage using utility
        const updatedTasks = updateGuestTask(taskId, updatedTask);
        setTasks(updatedTasks);
        setEditingTask(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      if (user) {
        // Authenticated user - toggle on backend
        const response = await apiClient.toggleTaskCompletion(user.id, taskId);
        setTasks(tasks.map(task =>
          task.id === taskId ? {...task, completed: response.data.completed} : task
        ));
      } else {
        // Guest user - toggle in localStorage using utility
        const updatedTasks = toggleGuestTaskCompletion(taskId);
        setTasks(updatedTasks);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        if (user) {
          // Authenticated user - delete from backend
          await apiClient.deleteTask(user.id, taskId);
          setTasks(tasks.filter(task => task.id !== taskId));
        } else {
          // Guest user - delete from localStorage using utility
          const updatedTasks = deleteGuestTask(taskId);
          setTasks(updatedTasks);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <PageLayout title="Loading Tasks...">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="My Tasks">
      <div className="max-w-3xl mx-auto">
        {!user && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
            <p>You are currently using the app as a guest. Your tasks will be saved locally in this browser and will not be accessible from other devices or browsers.</p>
            <p className="mt-2">
              <a href="/login" className="font-medium underline">Sign in</a> or{' '}
              <a href="/register" className="font-medium underline">create an account</a> to save your tasks securely in the cloud.
            </p>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        <div className="mb-8">
          <TaskForm
            onSubmit={handleCreateTask}
            task={editingTask ? { title: editingTask.title, description: editingTask.description } : undefined}
            onCancel={() => setEditingTask(null)}
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Tasks</h2>
          <TaskList
            tasks={tasks}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default TasksPage;