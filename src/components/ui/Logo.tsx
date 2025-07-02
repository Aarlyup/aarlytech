import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', imgClassName = 'h-8 w-auto', textClassName = 'text-2xl font-bold text-gray-900 ml-2' }) => {
  return (
    <Link to="/" className={`flex items-center group cursor-pointer ${className}`} style={{ textDecoration: 'none' }}>
      <img src="/Screenshot 2025-06-29 140116.png" alt="Aarly Logo" className={imgClassName + ' transition-transform group-hover:scale-110 group-hover:animate-pulse'} />
      <span className={textClassName + ' transition-transform group-hover:scale-110 group-hover:animate-pulse'} style={{ fontFamily: 'inherit', letterSpacing: '-0.02em' }}>arly</span>
    </Link>
  );
};

export default Logo;