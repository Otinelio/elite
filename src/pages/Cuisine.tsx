import React, { useState, useEffect, useRef } from 'react';
import { Bell, ChefHat, CheckCircle, Archive, RefreshCw, ChevronDown } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { Order } from '../types';

export const Cuisine = () => {
  const { orders, setOrders } = useAppData();
  const [activeTab, setActiveTab] = useState<'TOUTES' | 'EN ATTENTE' | 'EN PRÉPARATION' | 'PRÊTES' | 'SERVIES'>('EN ATTENTE');
  const [now, setNow] = useState(new Date());
  const [showArchives, setShowArchives] = useState(false);
  const previousOrdersCountRef = useRef(orders.filter(o => o.status === 'en_attente').length);

  // Time & Polling
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Beep on new orders
  useEffect(() => {
    const currentPendingCount = orders.filter(o => o.status === 'en_attente').length;
    
    if (currentPendingCount > previousOrdersCountRef.current) {
      // New order arrived!
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 880;
        gain.gain.value = 0.25;
        osc.start();
        setTimeout(() => {
          osc.stop();
          ctx.close();
        }, 180);
      } catch (err) {
        console.warn("Audio Context could not be played automatically:", err);
      }
    }
    previousOrdersCountRef.current = currentPendingCount;
  }, [orders]);

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const pendingCount = orders.filter(o => o.status === 'en_attente').length;

  const displayOrders = orders.filter(o => {
    if (activeTab === 'TOUTES') return o.status !== 'servie';
    if (activeTab === 'EN ATTENTE') return o.status === 'en_attente';
    if (activeTab === 'EN PRÉPARATION') return o.status === 'en_preparation';
    if (activeTab === 'PRÊTES') return o.status === 'prete';
    if (activeTab === 'SERVIES') return o.status === 'servie';
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const archivedOrders = orders.filter(o => o.status === 'servie');
  const archivedTotal = archivedOrders.reduce((sum, o) => sum + o.total, 0);

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  const getTimeAgo = (timestamp: string) => {
    const diff = Math.floor((now.getTime() - new Date(timestamp).getTime()) / 60000);
    if (diff < 1) return "À l'instant";
    return `Il y a ${diff} min`;
  };

  return (
    <div className="min-h-screen bg-[#111111] text-lumiere flex flex-col font-sans">
      {/* Header */}
      <header className="bg-[#1C1C1C] border-b border-[rgba(244,130,31,0.15)] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="font-syne font-extrabold text-[24px] md:text-[34px] text-braise leading-none">CUISINE ELITE</h1>
          {pendingCount > 0 && (
            <div className="bg-[#C0392B] text-white font-syne font-bold text-[12px] uppercase px-3 py-1 rounded-[4px] pulsate-badge">
              {pendingCount} en attente
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="font-sans font-normal text-[14px] text-fumee hidden md:block">
            {now.toLocaleTimeString('fr-FR')}
          </span>
          <button onClick={() => window.dispatchEvent(new Event("local-storage"))} className="p-2 text-fumee hover:text-lumiere transition-colors">
            <RefreshCw className="w-[18px] h-[18px]" />
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-[rgba(255,255,255,0.05)] overflow-x-auto hide-scrollbar sticky top-[65px] md:top-[74px] bg-[#111111] z-40">
        <div className="flex px-6 w-max">
          {(['TOUTES', 'EN ATTENTE', 'EN PRÉPARATION', 'PRÊTES', 'SERVIES'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-syne font-bold text-[12px] uppercase tracking-[0.1em] border-b-2 transition-colors ${
                activeTab === tab ? 'border-braise text-braise' : 'border-transparent text-fumee hover:text-lumiere'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-max">
        {displayOrders.map(order => {
          const bgMap = {
            en_attente: "bg-[rgba(244,130,31,0.04)] border-l-4 border-braise",
            en_preparation: "bg-[rgba(244,130,31,0.07)] border-l-4 border-transparent",
            prete: "bg-[rgba(39,174,96,0.07)] border-l-4 border-[#27AE60]",
            servie: "bg-[rgba(255,255,255,0.02)] border-l-4 border-transparent opacity-45"
          };
          const badgeMap = {
            en_attente: { icon: Bell, text: "EN ATTENTE", color: "text-[#C0392B]" },
            en_preparation: { icon: ChefHat, text: "EN PRÉPARATION", color: "text-braise" },
            prete: { icon: CheckCircle, text: "PRÊTE", color: "text-[#27AE60]" },
            servie: { icon: Archive, text: "SERVIE", color: "text-fumee" },
          };

          const statusInfo = badgeMap[order.status];
          const StatusIcon = statusInfo.icon;

          return (
            <div key={order.id} className={`rounded-[8px] border border-[rgba(255,255,255,0.05)] p-5 flex flex-col transition-all duration-300 ${bgMap[order.status]}`}>
              <div className="flex justify-between items-start mb-4 pb-4 border-b border-[rgba(255,255,255,0.05)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-sans text-[12px] text-fumee">{order.id}</span>
                    <span className="font-sans text-[12px] text-fumee">· {getTimeAgo(order.timestamp)}</span>
                  </div>
                  <h3 className="font-syne font-extrabold text-[26px] text-braise leading-none mt-2">
                    TABLE {order.table}
                  </h3>
                </div>
                <div className={`flex flex-col items-end gap-1 ${statusInfo.color}`}>
                  <StatusIcon className="w-[20px] h-[20px]" />
                  <span className="font-syne font-bold text-[10px] uppercase tracking-wide">{statusInfo.text}</span>
                </div>
              </div>

              <div className="flex-1 space-y-3 mb-6">
                {order.items.map(item => (
                  <div key={item.cartItemId} className="flex justify-between items-start">
                    <div className="flex gap-2">
                      <span className="font-sans font-bold text-[15px] text-braise">{item.quantity}x</span>
                      <span className="font-sans font-semibold text-[15px] text-lumiere">{item.name}</span>
                    </div>
                  </div>
                ))}
                {order.note && (
                  <div className="mt-4 p-3 bg-[rgba(255,255,255,0.03)] rounded-[4px] border border-[rgba(255,255,255,0.05)]">
                    <span className="font-sans text-[12px] text-fumee block mb-1">Note client :</span>
                    <p className="font-sans font-normal text-[14px] text-lumiere">{order.note}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <span className="font-syne font-bold text-[20px] text-braise">{formatPrice(order.total)} FCFA</span>
                
                <div className="flex gap-2">
                  {order.status === 'en_attente' && (
                    <button onClick={() => updateOrderStatus(order.id, 'en_preparation')} className="flex items-center gap-2 bg-braise text-[#111111] px-4 py-2 rounded-md hover:bg-braise-dark transition-colors">
                      <ChefHat className="w-4 h-4" />
                      <span className="font-syne font-bold text-[12px] uppercase tracking-wide">Commencer</span>
                    </button>
                  )}
                  {order.status === 'en_preparation' && (
                    <button onClick={() => updateOrderStatus(order.id, 'prete')} className="flex items-center gap-2 bg-[#27AE60] text-white px-4 py-2 rounded-md hover:bg-[#219653] transition-colors">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-syne font-bold text-[12px] uppercase tracking-wide">Prête</span>
                    </button>
                  )}
                  {order.status === 'prete' && (
                    <button onClick={() => updateOrderStatus(order.id, 'servie')} className="flex items-center gap-2 bg-fumee text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors">
                      <Archive className="w-4 h-4" />
                      <span className="font-syne font-bold text-[12px] uppercase tracking-wide">Servie</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {displayOrders.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-fumee opacity-50">
            <ChefHat className="w-[64px] h-[64px] mb-4 opacity-20" />
            <p className="font-syne font-bold text-[18px]">Aucune commande ici</p>
          </div>
        )}
      </main>

      {/* Archives Accordion (only visible on TOUTES or SERVIES tab) */}
      {(activeTab === 'TOUTES' || activeTab === 'SERVIES') && archivedOrders.length > 0 && (
        <div className="px-6 pb-12">
          <button 
            onClick={() => setShowArchives(!showArchives)}
            className="flex items-center gap-3 font-syne font-bold text-[14px] text-fumee uppercase tracking-widest hover:text-lumiere transition-colors mb-4"
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${showArchives ? 'rotate-180' : ''}`} />
            Archives
          </button>
          
          {showArchives && (
            <div className="bg-[#1C1C1C] rounded-[8px] border border-[rgba(255,255,255,0.05)] p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="block font-sans text-[13px] text-fumee mb-1">Commandes servies</span>
                  <span className="font-syne font-extrabold text-[24px] text-lumiere">{archivedOrders.length}</span>
                </div>
                <div>
                  <span className="block font-sans text-[13px] text-fumee mb-1">Total estimé</span>
                  <span className="font-syne font-extrabold text-[24px] text-lumiere">{formatPrice(archivedTotal)} FCFA</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
