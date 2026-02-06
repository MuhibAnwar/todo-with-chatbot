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
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet. Add your first task!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TaskList;