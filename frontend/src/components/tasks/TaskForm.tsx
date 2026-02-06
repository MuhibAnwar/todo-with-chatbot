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
        // Reset form only for new tasks
        setTitle('');
        setDescription('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 card p-6">
      <div className="mb-6">
        <label htmlFor="title" className="block text-xl font-extrabold text-electric-blue mb-3">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-4 py-3 text-lg border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 ${
            errors.title 
              ? 'border-hot-red focus:border-hot-red' 
              : 'border-gray-300 focus:border-electric-blue'
          }`}
          placeholder="Enter task title..."
        />
        {errors.title && <p className="text-hot-red text-base italic mt-2 font-bold">{errors.title}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="description" className="block text-xl font-extrabold text-vibrant-orange mb-3">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-vibrant-orange transition-all duration-300"
          placeholder="Enter task description (optional)..."
          rows={4}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <button
          type="submit"
          className="btn-primary text-lg py-3 px-8"
        >
          {task ? 'Update Task' : 'Add Task'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-danger text-lg py-3 px-8"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;