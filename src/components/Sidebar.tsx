import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Info, MapPin, MessageCircle } from 'lucide-react';
import logoImg from '../assets/img/logo.jpg';

export const Sidebar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'HOME' },
    { to: '/menu', icon: UtensilsCrossed, label: 'MENU' },
    { to: '/about', icon: Info, label: 'À PROPOS' },
    { to: '/contact', icon: MapPin, label: 'CONTACT' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[72px] z-50 bg-[rgba(15,15,15,0.95)] backdrop-blur-[16px] border-r border-[rgba(244,130,31,0.10)] flex-col items-center py-6 hidden md:flex">
      {/* Logo */}
      <div className="w-[42px] h-[42px] rounded-full overflow-hidden flex items-center justify-center mb-10 shrink-0 border border-[rgba(244,130,31,0.2)]">
        <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-12 w-full items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative group flex flex-col items-center justify-center w-14 h-14 transition-all duration-200 ease-in-out hover:bg-[rgba(244,130,31,0.08)] hover:rounded-lg hover:scale-[1.04] ${isActive ? 'text-braise' : 'text-fumee'}`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div className="absolute left-[-8px] w-[2px] h-full bg-braise" />
                )}
                <item.icon className={`w-[22px] h-[22px] mb-1.5 ${isActive ? 'text-braise' : 'text-fumee'}`} strokeWidth={1.5} />
                <span className="font-syne font-bold text-[8px] uppercase tracking-[0.1em] text-fumee">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* WhatsApp Bottom */}
      <a
        href="https://wa.me/22893015679"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto w-14 h-14 flex items-center justify-center hover:scale-110 transition-transform duration-150"
      >
        <MessageCircle className="w-[22px] h-[22px] text-[#25D366]" strokeWidth={1.5} />
      </a>
    </aside>
  );
};
