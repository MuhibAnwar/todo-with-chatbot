import React from 'react';

const ErrorDisplay = ({ error, onClose }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="error-display">
      <div className="error-content">
        <h3>Error</h3>
        <p>{error.message || error}</p>
        {onClose && (
          <button onClick={onClose}>Close</button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;