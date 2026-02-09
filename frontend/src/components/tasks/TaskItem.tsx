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

  if (isEditing) {
    return (
      <div className="p-6 border-b border-gray-100">
        <div className="space-y-4 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue font-semibold"
            placeholder="Task title..."
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue font-semibold"
            placeholder="Task description..."
            rows={3}
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-electric-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            Save
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setTitle(task.title);
              setDescription(task.description || '');
            }}
            className="px-4 py-2 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`group p-6 transition-all duration-200 flex items-start gap-4 ${
      task.completed ? 'bg-gray-50' : 'hover:bg-gray-50'
    }`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task.id)}
        className="h-6 w-6 mt-1 accent-electric-blue cursor-pointer flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold transition-all ${
          task.completed
            ? 'line-through text-gray-500'
            : 'text-gray-800'
        }`}>
          {task.title}
        </h3>

        {task.description && (
          <p className={`text-sm mt-2 transition-all ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-600'
          }`}>
            {task.description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-gray-600 hover:text-electric-blue hover:bg-gray-100 rounded-lg transition-all"
          title="Edit task"
        >
          ✏️
        </button>
        <button
          onClick={() => {
            if (confirm('Delete this task?')) {
              onDelete(task.id);
            }
          }}
          className="p-2 text-gray-600 hover:text-hot-red hover:bg-gray-100 rounded-lg transition-all"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TaskItem;