import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  imgClassName?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '', imgClassName = 'h-10 md:h-12 w-auto' }) => {
  return (
    <Link to="/" className={`flex items-center group cursor-pointer ${className}`} style={{ textDecoration: 'none' }}>
      <img src="/Aarly_logo_black (1).png" alt="Aarly Logo" className={imgClassName + ' transition-transform group-hover:scale-110 group-hover:animate-pulse'} />
    </Link>
  );
};

export default Logo;