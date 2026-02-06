// frontend/src/pages/tasks/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Task } from '../../types';
import PageLayout from '../../components/layout/PageLayout';
import TaskForm from '../../components/tasks/TaskForm';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import apiClient from '../../services/api-client';
import { useAuth } from '../../hooks/use-auth';

const TaskDetailPage: React.FC = () => {
  const router = useRouter();
  const { id: taskId } = router.query;
  const { user } = useAuth();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (taskId && user) {
      fetchTask();
    }
  }, [taskId, user]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      if (taskId && user) {
        const response = await apiClient.getTaskById(user.id, Array.isArray(taskId) ? taskId[0] : taskId);
        setTask(response.data);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch task');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: { title: string; description?: string }) => {
    try {
      if (task && user) {
        const response = await apiClient.updateTask(user.id, task.id, taskData.title, taskData.description);
        setTask(response.data);
        setIsEditing(false);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleToggleComplete = async () => {
    try {
      if (task && user) {
        const response = await apiClient.toggleTaskCompletion(user.id, task.id);
        setTask({ ...task, completed: response.data.completed });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        if (task && user) {
          await apiClient.deleteTask(user.id, task.id);
          router.push('/tasks'); // Redirect to tasks list after deletion
        }
      } catch (err: any) {
        setError(err.message || 'Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <PageLayout title="Loading Task...">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      </PageLayout>
    );
  }

  if (!task) {
    return (
      <PageLayout title="Task Not Found">
        <div className="max-w-3xl mx-auto">
          <ErrorMessage message="The requested task could not be found." />
          <button 
            onClick={() => router.push('/tasks')}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Back to Tasks
          </button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={task.title}>
      <div className="max-w-3xl mx-auto">
        {error && <ErrorMessage message={error} />}

        {isEditing ? (
          <TaskForm
            task={{ title: task.title, description: task.description }}
            onSubmit={handleUpdateTask}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start mb-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={handleToggleComplete}
                className="mt-1 mr-3 h-5 w-5"
              />
              <h2 className={`text-2xl font-bold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                {task.title}
              </h2>
            </div>

            {task.description && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Description</h3>
                <p className={`whitespace-pre-wrap ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'}`}>
                  {task.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
              <div>
                <span className="font-medium">Created:</span>{' '}
                {new Date(task.created_at).toLocaleString()}
              </div>
              <div>
                <span className="font-medium">Status:</span>{' '}
                <span className={task.completed ? 'text-green-600' : 'text-yellow-600'}>
                  {task.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              >
                Edit Task
              </button>

              <button
                onClick={handleToggleComplete}
                className={`${
                  task.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
                } text-white py-2 px-4 rounded`}
              >
                {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
              </button>

              <button
                onClick={handleDeleteTask}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete Task
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push('/tasks')}
          className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
        >
          Back to Tasks
        </button>
      </div>
    </PageLayout>
  );
};

export default TaskDetailPage;