import React from 'react';
import { Star } from 'lucide-react';

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
    <div className="relative bg-white rounded-2xl shadow-md border border-blue-100 p-6">
      {/* Star (Save) Icon */}
      <button
        className="absolute top-4 left-4 bg-white rounded-full p-1 shadow hover:bg-yellow-100 transition-colors"
        title="Save this card"
        type="button"
        tabIndex={0}
      >
        <Star className="w-5 h-5 text-yellow-400" fill="none" />
      </button>
      {children}
    </div>
  );
};

export default Card;