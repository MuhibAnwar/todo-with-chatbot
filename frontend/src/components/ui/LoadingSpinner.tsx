// frontend/src/components/ui/LoadingSpinner.tsx
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: 'electric-blue' | 'vibrant-orange' | 'electric-green' | 'bright-yellow' | 'hot-red';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', color = 'electric-blue' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const borderSize = {
    small: 'border-2',
    medium: 'border-4',
    large: 'border-4'
  };

  // Map color prop to actual Tailwind classes
  const colorClass = {
    'electric-blue': 'border-electric-blue',
    'vibrant-orange': 'border-vibrant-orange',
    'electric-green': 'border-electric-green',
    'bright-yellow': 'border-bright-yellow',
    'hot-red': 'border-hot-red'
  }[color] || 'border-electric-blue';

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${borderSize[size]} ${colorClass} border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;