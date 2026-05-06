import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, UtensilsCrossed, Info, MapPin } from 'lucide-react';

export const BottomBar = () => {
  const navItems = [
    { to: '/', icon: Home },
    { to: '/menu', icon: UtensilsCrossed },
    { to: '/about', icon: Info },
    { to: '/contact', icon: MapPin }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[64px] bg-[#111111] border-t border-[rgba(244,130,31,0.12)] z-50 flex justify-around items-center pb-[env(safe-area-inset-bottom)] md:hidden">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `relative flex flex-col items-center justify-center w-16 h-full transition-transform duration-100 active:scale-[0.92] ${isActive ? 'text-braise' : 'text-fumee'}`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon className="w-[22px] h-[22px]" strokeWidth={1.5} />
              {isActive && (
                <div className="absolute bottom-2 w-1 h-1 rounded-full bg-braise" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
