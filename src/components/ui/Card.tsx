import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick
}) => {
  return (
    <div 
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100
        transition-transform hover:scale-105 hover:shadow-2xl
        ${hover ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;