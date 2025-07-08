import React from 'react';
import { NavLink } from 'react-router-dom';
import { Briefcase, DollarSign, Building2, Rocket, User, Award, Menu } from 'lucide-react';

export const fundingNav = [
  { label: 'VC', path: '/funding/vc' },
  { label: 'MicroVC', path: '/funding/microvc' },
  { label: 'Incubator', path: '/funding/incubator' },
  { label: 'Accelerator', path: '/funding/accelerator' },
  { label: 'Angel Investor', path: '/funding/angel' },
  { label: 'Govt', path: '/funding/grants' },
];

export const FundingMobileNav: React.FC = () => (
  <div className="md:hidden w-full flex gap-3 px-2 mt-4 overflow-x-auto pb-2">
    {fundingNav.map(item => (
      <NavLink
        key={item.label}
        to={item.path}
        className={({ isActive }) =>
          `flex flex-col items-center min-w-[80px] px-3 py-2 rounded-xl border border-blue-100 shadow-sm bg-white transition-all duration-150
          ${isActive ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-md' : 'hover:bg-blue-50 hover:border-blue-300 text-gray-700'}
          `
        }
        style={{ textDecoration: 'none' }}
      >
        <span className="text-xs font-medium text-center whitespace-nowrap">{item.label}</span>
      </NavLink>
    ))}
  </div>
);

const FundingSidebar: React.FC = () => {
  // Only render on desktop
  return (
    <aside className="hidden md:block w-full md:fixed md:top-24 md:left-0 md:w-64 md:h-[calc(100vh-6rem)] bg-gradient-to-b from-gray-50 via-white to-gray-100 border-r border-blue-200 shadow-md md:z-30 flex flex-col backdrop-blur-xl bg-white/80 animate-fade-in rounded-2xl md:rounded-none md:shadow-md p-2 md:p-0" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'}}>
      <nav className="flex-1 flex flex-col gap-2 px-2 mt-4">
        {fundingNav.map(item => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-4 px-4 py-2 rounded-lg font-medium text-gray-700 transition-all duration-150
              ${isActive ? 'bg-blue-50 border-l-4 border-blue-600 text-blue-700 shadow-md' : 'border-l-4 border-transparent hover:bg-gray-100 hover:border-blue-200 hover:text-blue-700'}
              `
            }
          >
            <span className="text-base font-medium tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default FundingSidebar; 