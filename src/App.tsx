import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppDataProvider } from './context/AppDataContext';
import { CartProvider } from './context/CartContext';

import { MainLayout } from './layouts/MainLayout';
import { ScanLayout } from './layouts/ScanLayout';

import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { ScanMenu } from './pages/ScanMenu';
import { Cuisine } from './pages/Cuisine';

function App() {
  return (
    <AppDataProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes - MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu scanMode={false} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>

            {/* Scan Mode Route - Isolated ScanLayout */}
            <Route element={<ScanLayout />}>
              <Route path="/menu/scan" element={<ScanMenu />} />
            </Route>

            {/* Admin Route - Isolated */}
            <Route path="/admin" element={<Admin />} />

            {/* Cuisine Route - Isolated */}
            <Route path="/cuisine" element={<Cuisine />} />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AppDataProvider>
  );
}

export default App;
