// frontend/src/components/tasks/TaskItem.tsx
import React, { useState } from 'react';
import { Task } from '../../types';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');

  const handleSave = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  return (
    <div className="border-b border-gray-200 py-4">
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(task.title);
                setDescription(task.description || '');
              }}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 mr-3 h-5 w-5"
          />
          <div className="flex-1">
            <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-600'} mt-1`}>
                {task.description}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(task.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;