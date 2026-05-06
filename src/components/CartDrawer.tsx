import React from 'react';
import { ShoppingCart, X, Minus, Plus, Trash2, MessageCircle, ChefHat } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAppData } from '../context/AppDataContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isScanMode?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, isScanMode }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { restaurantInfo, tableNumber, setOrders } = useAppData();
  const [note, setNote] = React.useState('');

  const formatPrice = (price: number) => new Intl.NumberFormat('fr-FR').format(price);

  const handleWhatsAppOrder = () => {
    const messageLines = [
      "Commande — Elite Pizza Burger :",
      "",
      ...cart.map(item => `- ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)} FCFA`),
      "",
      `Total : ${formatPrice(cartTotal)} FCFA`,
      "",
    ];

    if (note.trim()) {
      messageLines.push(`Note : ${note.trim()}`, "");
    }

    messageLines.push("Merci de confirmer ma commande.");

    const text = encodeURIComponent(messageLines.join("\n"));
    window.open(`https://wa.me/${restaurantInfo.whatsapp}?text=${text}`, "_blank");
  };

  const handleKitchenOrder = () => {
    const newOrder = {
      id: `CMD-${Date.now()}`,
      table: Number(tableNumber) || 0,
      items: [...cart],
      note: note.trim(),
      status: "en_attente" as const,
      timestamp: new Date().toISOString(),
      total: cartTotal
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setNote('');
    onClose();
    
    // Create success overlay animation element
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[999] bg-[#27AE60] flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 pointer-events-none';
    overlay.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <h2 class="font-syne font-bold text-white text-2xl mt-4">Commande Envoyée !</h2>
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => { overlay.style.opacity = '0.85'; }, 10);
    setTimeout(() => { overlay.style.opacity = '0'; }, 1200);
    setTimeout(() => { document.body.removeChild(overlay); }, 1500);
  };

  if (!isOpen && cart.length === 0) return null; // Small optimization

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/65 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div 
        className={`fixed z-[101] bg-[#1C1C1C] flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.32,0.72,0,1)]
          md:top-0 md:right-0 md:bottom-0 md:w-[420px] md:border-l md:border-[rgba(244,130,31,0.12)]
          bottom-0 left-0 right-0 max-h-[85vh] md:max-h-screen rounded-t-[20px] md:rounded-none
          ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-full md:translate-y-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[rgba(244,130,31,0.12)] shrink-0">
          <h2 className="font-syne font-extrabold text-[18px] text-lumiere">MA COMMANDE</h2>
          <button onClick={onClose} className="p-2 -mr-2 text-fumee hover:text-lumiere transition-colors">
            <X className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full opacity-50 py-10">
              <ShoppingCart className="w-[48px] h-[48px] text-fumee opacity-25 mb-4" />
              <p className="font-sans italic font-normal text-[14px] text-fumee">
                Rien encore... ajoute quelque chose !
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.cartItemId} className="flex justify-between items-start">
                <div className="flex flex-col gap-1 w-2/3">
                  <span className="font-sans font-semibold text-[15px] text-lumiere">{item.name}</span>
                  <span className="font-syne font-bold text-[18px] text-braise">{formatPrice(item.price * item.quantity)}</span>
                </div>
                <div className="flex items-center gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[6px] p-1">
                  {item.quantity > 1 ? (
                    <button onClick={() => updateQuantity(item.cartItemId, -1)} className="p-1 text-fumee hover:text-lumiere transition-colors">
                      <Minus className="w-[16px] h-[16px]" />
                    </button>
                  ) : (
                    <button onClick={() => removeFromCart(item.cartItemId)} className="p-1 text-[#C0392B] hover:text-[#E74C3C] transition-colors">
                      <Trash2 className="w-[16px] h-[16px]" />
                    </button>
                  )}
                  <span className="font-sans font-semibold text-[14px] w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartItemId, 1)} className="p-1 text-fumee hover:text-lumiere transition-colors">
                    <Plus className="w-[16px] h-[16px]" />
                  </button>
                </div>
              </div>
            ))
          )}

          {cart.length > 0 && (
            <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Note pour la cuisine..."
                className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-md p-3 font-sans text-[13px] text-lumiere placeholder:text-fumee focus:border-braise focus:outline-none resize-none h-20"
              />
            </div>
          )}
        </div>

        {/* Footer Checkout */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#111111] border-t border-[rgba(244,130,31,0.12)] shrink-0">
            <div className="flex justify-between items-end mb-6">
              <span className="font-sans font-semibold text-[15px] text-fumee">Total</span>
              <span className="font-syne font-extrabold text-[24px] text-braise leading-none">
                {formatPrice(cartTotal)} <span className="text-[16px]">FCFA</span>
              </span>
            </div>
            
            {isScanMode ? (
              <button 
                onClick={handleKitchenOrder}
                className="w-full flex items-center justify-center gap-2 bg-braise text-[#111111] h-[52px] rounded-md hover:bg-braise-dark transition-colors duration-150"
              >
                <ChefHat className="w-[16px] h-[16px]" />
                <span className="font-syne font-bold text-[13px] uppercase tracking-[0.1em]">Envoyer en cuisine</span>
              </button>
            ) : (
              <button 
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white h-[52px] rounded-md hover:bg-[#1EA452] transition-colors duration-150"
              >
                <MessageCircle className="w-[16px] h-[16px]" />
                <span className="font-syne font-bold text-[13px] uppercase tracking-[0.1em]">Commander via WhatsApp</span>
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};
