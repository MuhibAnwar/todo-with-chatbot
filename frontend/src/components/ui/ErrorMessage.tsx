// frontend/src/components/ui/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-hot-red/10 border-2 border-hot-red text-hot-red px-6 py-4 rounded-xl relative mb-6 flex items-center" role="alert">
      <div className="bg-hot-red rounded-full p-3 mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pure-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <strong className="font-extrabold text-xl">Error: </strong>
        <span className="block mt-1 text-lg">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;