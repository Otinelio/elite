import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useCart } from '../context/CartContext';
import { CartDrawer } from '../components/CartDrawer';
import burgerHeroImg from '../assets/img/burger_hero.png';
import pizzaImg from '../assets/img/pizza_gourmet.png';
import friedChickenImg from '../assets/img/fried_chicken.png';

interface MenuPageProps {
  scanMode?: boolean;
}

export const Menu = ({ scanMode = false }: MenuPageProps) => {
  const { menu, categories } = useAppData();
  const { addToCart, cartItemCount } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  const filteredMenu = activeCategory === 'ALL' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  // Group menu by categories for display if ALL is selected
  const displayCategories = activeCategory === 'ALL' 
    ? categories.filter(cat => menu.some(m => m.category === cat.id)) 
    : categories.filter(cat => cat.id === activeCategory);

  return (
    <div className="flex flex-col min-h-screen bg-charbon w-full">
      {/* Sticky Header */}
      {!scanMode && (
        <div className="sticky top-0 z-40 bg-[#111111]/80 backdrop-blur-[8px] border-b border-[rgba(244,130,31,0.12)] h-[56px] flex items-center justify-between px-6">
          <h1 className="font-syne font-extrabold text-[24px] md:text-[30px] text-lumiere">NOTRE MENU</h1>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="w-[22px] h-[22px] text-lumiere" strokeWidth={1.5} />
            {cartItemCount > 0 && (
              <span className="bg-braise text-[#111111] font-sans font-semibold text-[11px] w-[20px] h-[20px] rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Categories Navigation */}
      <div className={`${scanMode ? 'sticky top-[56px]' : 'sticky top-[56px]'} z-30 bg-[#111111] border-b border-[rgba(255,255,255,0.05)] overflow-x-auto hide-scrollbar`}>
        <div className="flex px-6 py-4 gap-3">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`whitespace-nowrap px-4 py-1.5 rounded-[5px] font-syne font-bold text-[10px] uppercase tracking-[0.14em] transition-colors duration-150 border ${
              activeCategory === 'ALL' 
                ? 'bg-braise text-[#111111] border-transparent' 
                : 'bg-transparent text-fumee border-[rgba(255,255,255,0.08)] hover:text-lumiere'
            }`}
          >
            TOUS
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-[5px] font-syne font-bold text-[10px] uppercase tracking-[0.14em] transition-colors duration-150 border ${
                activeCategory === cat.id 
                  ? 'bg-braise text-[#111111] border-transparent' 
                  : 'bg-transparent text-fumee border-[rgba(255,255,255,0.08)] hover:text-lumiere'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <div className="flex-1 px-6 pb-24 md:pb-12 pt-6">
        {displayCategories.map(cat => {
          const catItems = menu.filter(m => m.category === cat.id);
          if (catItems.length === 0) return null;

          return (
            <div key={cat.id} className="mb-12">
              <div className="mb-6">
                <h2 className="font-syne font-extrabold text-[36px] md:text-[46px] text-lumiere inline-block transform -rotate-[0.4deg] pt-8 pb-4">
                  {cat.name}
                </h2>
                <div className="h-[1px] w-[60px] md:w-[100px] bg-braise" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
                {catItems.map(item => (
                  <div 
                    key={item.id} 
                    className="flex items-center py-4 border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.025)] transition-colors duration-140 group"
                  >
                    <div className="w-[80px] h-[80px] shrink-0 bg-[rgba(255,255,255,0.05)] rounded-[5px] overflow-hidden mr-4 relative">
                      <img 
                        src={item.imageUrl || (item.category === 'cat_burgers' ? burgerHeroImg : item.category === 'cat_pizzas' ? pizzaImg : friedChickenImg)} 
                        alt={item.name} 
                        className="w-full h-full object-cover contrast-[1.06]" 
                      />
                      {!item.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[1px]">
                          <span className="bg-[#C0392B] text-white font-syne font-bold text-[9px] px-1.5 py-0.5 uppercase">Indisponible</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0 pr-4">
                      <h3 className={`font-sans font-semibold text-[15px] mb-1 truncate ${!item.available ? 'text-fumee' : 'text-lumiere'}`}>
                        {item.name}
                      </h3>
                      <p className="font-sans font-normal text-[13px] text-fumee line-clamp-2">
                        {item.description || "Ingrédients frais et préparation minute."}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3 shrink-0">
                      <span className={`font-syne font-bold text-[20px] ${!item.available ? 'text-fumee' : 'text-braise'}`}>
                        {formatPrice(item.price)}
                      </span>
                      <button
                        onClick={() => item.available && addToCart(item)}
                        disabled={!item.available}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 ${
                          item.available ? 'bg-braise text-[#111111]' : 'bg-[#1C1C1C] text-fumee opacity-30 cursor-not-allowed'
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (Cart) */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className={`fixed z-40 bg-braise rounded-[14px] w-[56px] h-[56px] flex items-center justify-center shadow-lg hover:bg-braise-dark transition-colors duration-200
          ${scanMode ? 'bottom-6 right-6 md:bottom-8 md:right-8' : 'bottom-[84px] right-6 md:bottom-8 md:right-8'}
        `}
      >
        <ShoppingCart className="w-6 h-6 text-white" fill="currentColor" />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#C0392B] text-white font-sans font-bold text-[11px] w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-md animate-bounce-subtle">
            {cartItemCount}
          </span>
        )}
      </button>

      {/* Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} isScanMode={scanMode} />
    </div>
  );
};
