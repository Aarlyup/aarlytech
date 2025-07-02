import React from 'react';
import { NavLink } from 'react-router-dom';
import { Briefcase, DollarSign, Building2, Rocket, User, Award } from 'lucide-react';

const fundingNav = [
  { label: 'VC', path: '/funding/vc', icon: <Briefcase size={22} className="min-w-[22px]" /> },
  { label: 'MicroVC', path: '/funding/microvc', icon: <DollarSign size={22} className="min-w-[22px]" /> },
  { label: 'Incubator', path: '/funding/incubator', icon: <Building2 size={22} className="min-w-[22px]" /> },
  { label: 'Accelerator', path: '/funding/accelerator', icon: <Rocket size={22} className="min-w-[22px]" /> },
  { label: 'Angel Investor', path: '/funding/angel', icon: <User size={22} className="min-w-[22px]" /> },
  { label: 'Govt Grants & Schemes', path: '/funding/grants', icon: <Award size={22} className="min-w-[22px]" /> },
];

const FundingSidebar: React.FC = () => (
  <aside className="w-full md:fixed md:top-24 md:left-0 md:w-64 md:h-[calc(100vh-6rem)] bg-gradient-to-b from-gray-50 via-white to-gray-100 border-r border-blue-200 shadow-md md:z-30 flex flex-col backdrop-blur-xl bg-white/80 animate-fade-in rounded-2xl md:rounded-none md:shadow-md p-2 md:p-0" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'}}>
    <nav className="flex-1 flex flex-col gap-1 px-2 mt-4">
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
          {React.cloneElement(item.icon, { className: 'min-w-[22px] transition-transform group-hover:scale-110 group-hover:animate-pulse' })}
          <span className="text-base font-medium tracking-tight">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default FundingSidebar; 