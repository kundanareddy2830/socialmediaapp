
import React from 'react';

interface LiveIndicatorProps {
  isOnline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ isOnline = false, size = 'sm' }) => {
  if (!isOnline) return null;

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={`${sizeClasses[size]} bg-green-500 rounded-full animate-pulse relative`}>
      <div className={`absolute inset-0 ${sizeClasses[size]} bg-green-500 rounded-full animate-ping opacity-75`} />
    </div>
  );
};

export default LiveIndicator;
