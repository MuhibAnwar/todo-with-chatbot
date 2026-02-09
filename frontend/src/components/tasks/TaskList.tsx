// frontend/src/components/tasks/TaskList.tsx
import React from 'react';
import { Task } from '../../types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onUpdate: (taskId: string, updatedTask: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onDelete, onUpdate }) => {
  const completedTasks = tasks.filter((t) => t.completed);
  const activeTasks = tasks.filter((t) => !t.completed);
  const completionPercentage = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">No tasks yet</h3>
        <p className="text-gray-600 text-lg">
          Create your first task using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      {tasks.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
            <span className="text-2xl font-black text-electric-blue">
              {completionPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-electric-blue transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="mt-3 flex justify-between text-sm text-gray-600 font-semibold">
            <span>✓ {completedTasks.length} completed</span>
            <span>→ {activeTasks.length} active</span>
          </div>
        </div>
      )}

      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Active Tasks</h3>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {activeTasks.map((task, index) => (
              <div key={task.id} className={index !== activeTasks.length - 1 ? 'border-b border-gray-100' : ''}>
                <TaskItem
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Completed ({completedTasks.length})</h3>
          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden opacity-70">
            {completedTasks.map((task, index) => (
              <div key={task.id} className={index !== completedTasks.length - 1 ? 'border-b border-gray-100' : ''}>
                <TaskItem
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;