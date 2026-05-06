import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Pencil, Trash2, Save, Copy, Eye, EyeOff } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { MenuItem, Category } from '../types';

export const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState<'MENU' | 'CATEGORIES' | 'SETTINGS' | 'EXPORT'>('MENU');
  
  const { 
    menu, setMenu, 
    categories, setCategories, 
    restaurantInfo, setRestaurantInfo 
  } = useAppData();

  useEffect(() => {
    if (sessionStorage.getItem('elite_admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'elite2025') {
      sessionStorage.setItem('elite_admin_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('elite_admin_auth');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
        <div className="bg-[#1C1C1C] border border-[rgba(244,130,31,0.18)] rounded-[10px] w-full max-w-[380px] p-8">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="font-syne font-extrabold text-[32px] text-braise leading-none">ELITE</span>
            <Lock className="w-[20px] h-[20px] text-braise" />
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.1)] rounded-md px-4 py-3 font-sans text-[14px] text-lumiere focus:border-braise focus:outline-none transition-colors"
              />
            </div>
            {error && <p className="font-sans text-[13px] text-[#C0392B]">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-braise text-[#111111] font-syne font-bold text-[12px] uppercase tracking-[0.1em] h-[48px] rounded-md hover:bg-braise-dark transition-colors"
            >
              Accéder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1C1C1C] font-sans pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-syne font-extrabold text-[24px] text-braise">ELITE</span>
            <span className="font-syne font-bold text-[14px] text-gray-500 uppercase tracking-widest mt-1 hidden sm:block">Admin</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <LogOut className="w-[18px] h-[18px]" />
            <span className="font-sans font-medium text-[14px] hidden sm:block">Déconnexion</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6 flex overflow-x-auto hide-scrollbar border-t border-gray-100">
          {(['MENU', 'CATEGORIES', 'SETTINGS', 'EXPORT'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-syne font-bold text-[12px] uppercase tracking-[0.1em] whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab ? 'border-braise text-braise' : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab === 'SETTINGS' ? 'PARAMÈTRES' : tab}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'MENU' && <MenuTab menu={menu} setMenu={setMenu} categories={categories} />}
        {activeTab === 'CATEGORIES' && <CategoriesTab categories={categories} setCategories={setCategories} menu={menu} />}
        {activeTab === 'SETTINGS' && <SettingsTab info={restaurantInfo} setInfo={setRestaurantInfo} />}
        {activeTab === 'EXPORT' && <ExportTab />}
      </main>
    </div>
  );
};

// --- Sub-components for Tabs ---

const MenuTab = ({ menu, setMenu, categories }: { menu: MenuItem[], setMenu: any, categories: Category[] }) => {
  const toggleAvailable = (id: string) => {
    setMenu(menu.map(m => m.id === id ? { ...m, available: !m.available } : m));
  };

  const deleteItem = (id: string) => {
    if (confirm("Supprimer ce plat ?")) {
      setMenu(menu.filter(m => m.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-syne font-extrabold text-[24px]">Gestion du Menu</h2>
        <button className="bg-braise text-white font-syne font-bold text-[12px] uppercase px-4 py-2 rounded-md hover:bg-braise-dark">
          + Ajouter
        </button>
      </div>

      <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 overflow-hidden">
        {categories.map(cat => {
          const items = menu.filter(m => m.category === cat.id);
          if (items.length === 0) return null;
          return (
            <div key={cat.id} className="border-b border-gray-100 last:border-0">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                <span className="font-syne font-bold text-[14px] text-gray-700 uppercase tracking-wide">{cat.name}</span>
              </div>
              <div className="divide-y divide-gray-100">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex flex-col">
                      <span className={`font-sans font-semibold text-[15px] ${item.available ? 'text-gray-900' : 'text-gray-400'}`}>{item.name}</span>
                      <span className="font-sans text-[13px] text-gray-500">{new Intl.NumberFormat('fr-FR').format(item.price)} FCFA</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => toggleAvailable(item.id)} className={`flex items-center justify-center w-8 h-8 rounded-full ${item.available ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                        {item.available ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteItem(item.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CategoriesTab = ({ categories, setCategories, menu }: { categories: Category[], setCategories: any, menu: MenuItem[] }) => {
  return (
    <div>
      <h2 className="font-syne font-extrabold text-[24px] mb-6">Catégories</h2>
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 overflow-hidden divide-y divide-gray-100">
        {categories.map(cat => (
          <div key={cat.id} className="flex items-center justify-between px-6 py-4">
            <span className="font-sans font-semibold text-[15px] text-gray-900">{cat.name}</span>
            <span className="font-sans text-[13px] text-gray-500">{menu.filter(m => m.category === cat.id).length} plats</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsTab = ({ info, setInfo }: { info: any, setInfo: any }) => {
  const [formData, setFormData] = useState(info);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setInfo(formData);
    alert('Paramètres sauvegardés');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-syne font-extrabold text-[24px]">Paramètres</h2>
        <button onClick={handleSave} className="flex items-center gap-2 bg-braise text-white font-syne font-bold text-[12px] uppercase px-4 py-2 rounded-md hover:bg-braise-dark">
          <Save className="w-4 h-4" /> Sauvegarder
        </button>
      </div>
      
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6 space-y-6">
        <label className="flex items-center gap-3">
          <input type="checkbox" name="isOpen" checked={formData.isOpen} onChange={handleChange} className="w-5 h-5 accent-braise" />
          <span className="font-sans font-semibold text-[15px]">Restaurant Ouvert (accepte les commandes)</span>
        </label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-sans text-[13px] text-gray-500">Nom du restaurant</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 font-sans text-[14px] focus:border-braise focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-sans text-[13px] text-gray-500">Tagline</label>
            <input type="text" name="tagline" value={formData.tagline} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 font-sans text-[14px] focus:border-braise focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-sans text-[13px] text-gray-500">WhatsApp (sans +)</label>
            <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 font-sans text-[14px] focus:border-braise focus:outline-none" />
          </div>
          <div className="space-y-2">
            <label className="font-sans text-[13px] text-gray-500">Instagram</label>
            <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 font-sans text-[14px] focus:border-braise focus:outline-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="font-sans text-[13px] text-gray-500">Adresse</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 font-sans text-[14px] focus:border-braise focus:outline-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="font-sans text-[13px] text-gray-500">Horaires</label>
            <input type="text" name="hours" value={formData.hours} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-4 py-2 font-sans text-[14px] focus:border-braise focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ExportTab = () => {
  const { menu, categories, restaurantInfo } = useAppData();
  
  const handleCopy = () => {
    const data = { menu, categories, restaurantInfo };
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Configuration copiée dans le presse-papier !");
  };

  return (
    <div>
      <h2 className="font-syne font-extrabold text-[24px] mb-6">Export</h2>
      <div className="bg-white rounded-[10px] shadow-sm border border-gray-200 p-6 flex flex-col items-start gap-4">
        <p className="font-sans text-[14px] text-gray-600 max-w-2xl">
          Copiez cette configuration pour la donner à votre développeur ou la sauvegarder localement. 
          Les données ne sont enregistrées que sur cet appareil actuellement.
        </p>
        <button onClick={handleCopy} className="flex items-center gap-2 bg-gray-900 text-white font-syne font-bold text-[12px] uppercase px-6 py-3 rounded-md hover:bg-gray-800 transition-colors">
          <Copy className="w-4 h-4" /> Copier la config JSON
        </button>
      </div>
    </div>
  );
};
