import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { BottomBar } from '../components/BottomBar';
import { useAppData } from '../context/AppDataContext';

export const MainLayout = () => {
  const { restaurantInfo } = useAppData();

  return (
    <div className="min-h-screen bg-charbon text-lumiere flex flex-col md:flex-row relative">
      {!restaurantInfo.isOpen && (
        <div className="fixed top-0 left-0 right-0 z-[100] bg-rouge-alerte text-white text-center py-2 font-syne font-bold text-sm uppercase tracking-wide">
          RESTAURANT ACTUELLEMENT FERMÉ
        </div>
      )}
      <Sidebar />
      <main className={`flex-1 ${!restaurantInfo.isOpen ? 'mt-9' : ''} md:ml-[72px] pb-[80px] md:pb-0 relative min-h-screen overflow-x-hidden`}>
        <Outlet />
      </main>
      <BottomBar />
    </div>
  );
};
