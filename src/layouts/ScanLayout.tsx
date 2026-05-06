import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAppData } from '../context/AppDataContext';

export const ScanLayout = () => {
  const { cartItemCount } = useCart();
  const { restaurantInfo } = useAppData();

  return (
    <div className="min-h-screen bg-charbon text-lumiere flex flex-col relative">
      {!restaurantInfo.isOpen && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-rouge-alerte text-white text-center py-2 font-syne font-bold text-sm uppercase tracking-wide">
          RESTAURANT ACTUELLEMENT FERMÉ
        </div>
      )}
      
      {/* Strict Minimalist Header */}
      <header className={`fixed ${!restaurantInfo.isOpen ? 'top-9' : 'top-0'} left-0 right-0 h-[56px] bg-[#111111]/80 backdrop-blur-[8px] border-b border-[rgba(244,130,31,0.15)] z-50 flex items-center justify-between px-4`}>
        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-[38px] h-[38px] rounded-full bg-[rgba(244,130,31,0.1)] flex items-center justify-center">
            <span className="font-syne font-extrabold text-[28px] text-braise leading-none -mt-1">E</span>
          </div>
          <span className="font-syne font-extrabold text-[20px] text-braise">ELITE</span>
        </div>

        {/* RIGHT: Cart */}
        <div className="relative">
          <div className="w-10 h-10 flex items-center justify-center bg-[rgba(244,130,31,0.05)] rounded-full">
             <ShoppingCart className="w-[22px] h-[22px] text-lumiere" strokeWidth={1.5} />
          </div>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-braise text-[#111111] font-sans font-bold text-[11px] w-[18px] h-[18px] rounded-full flex items-center justify-center animate-bounce-subtle">
              {cartItemCount}
            </span>
          )}
        </div>
      </header>

      {/* Main content, padding top for the header */}
      <main className={`flex-1 pt-[56px] ${!restaurantInfo.isOpen ? 'mt-9' : ''} relative overflow-x-hidden pb-10`}>
        <Outlet />
      </main>
    </div>
  );
};
