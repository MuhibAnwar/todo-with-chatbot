// frontend/src/components/tasks/TaskForm.tsx
import React, { useState } from 'react';
import { TaskFormData } from '../../types';

interface TaskFormProps {
  task?: TaskFormData;
  onSubmit: (formData: TaskFormData) => void;
  onCancel?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title, description });
      if (!task) {
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-6">
          {task ? 'Edit Task' : 'Add New Task'}
        </h3>

        <div className="space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Task Title <span className="text-hot-red">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all font-semibold ${
                errors.title
                  ? 'border-hot-red focus:ring-hot-red/30 bg-red-50'
                  : 'border-gray-300 focus:ring-electric-blue/30 focus:border-electric-blue'
              }`}
              placeholder="What needs to be done?"
            />
            {errors.title && <p className="text-hot-red text-sm mt-1 font-semibold">{errors.title}</p>}
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue transition-all font-semibold"
              placeholder="Add more details..."
              rows={3}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-electric-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-all"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;