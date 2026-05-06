import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, ChevronDown, Plus, Zap, Banknote, Flame, Bike, MapPin, Clock, Phone } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import { useCart } from '../context/CartContext';
import burgerHeroImg from '../assets/img/burger_hero.png';
import pizzaImg from '../assets/img/pizza_gourmet.png';
import friedChickenImg from '../assets/img/fried_chicken.png';
import heroBgImg from '../assets/img/hero_bg.png';

export const Home = () => {
  const { menu, restaurantInfo } = useAppData();
  const { addToCart } = useCart();

  // Find featured items based on prompt specifics
  const featuredIds = ["m1", "m6", "m11"]; // Cheese Burger, Margherita, Bucket 6 pièces
  const featuredItems = menu.filter(m => featuredIds.includes(m.id));

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION */}
      <section 
        className="relative h-screen min-h-[600px] w-full flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroBgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-[#111111]/70 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-6 md:px-12 w-full max-w-4xl">
          <div className="inline-block px-3 py-1.5 bg-[rgba(244,130,31,0.15)] border border-[rgba(244,130,31,0.3)] rounded-full mb-6 md:mb-8">
            <span className="font-sans font-medium text-[11px] text-braise uppercase tracking-wide">
              Feu rouge IAEC · Bd de la Kara · Lomé
            </span>
          </div>
          
          <h1 className="font-syne font-extrabold text-[64px] md:text-[120px] text-lumiere leading-[0.9] tracking-[-0.03em] drop-shadow-xl">
            ELITE
          </h1>
          <h2 className="font-syne font-bold text-[28px] md:text-[48px] text-braise leading-tight mb-6 drop-shadow-md">
            PIZZA BURGER
          </h2>
          <p className="font-sans font-normal text-[18px] text-white/90 italic mb-10 max-w-lg drop-shadow-md">
            {restaurantInfo.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/menu" className="flex items-center justify-center gap-2 bg-braise text-charbon h-[52px] px-8 rounded-md hover:bg-braise-dark hover:scale-[1.03] transition-all duration-200 shadow-lg">
              <span className="font-syne font-bold text-[13px] uppercase tracking-[0.12em]">Voir le menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`https://wa.me/${restaurantInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border-2 border-[rgba(255,255,255,0.2)] text-white h-[52px] px-8 rounded-md hover:border-braise hover:bg-[rgba(244,130,31,0.1)] transition-all duration-200">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              <span className="font-syne font-bold text-[13px] uppercase tracking-[0.12em]">Commander</span>
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 flex z-10">
          <ChevronDown className="w-8 h-8 text-white/50 animate-bounce-subtle" />
        </div>
      </section>

      {/* MARQUEE SECTION */}
      <section className="h-[54px] bg-braise flex items-center overflow-hidden whitespace-nowrap">
        <div className="flex items-center marquee-content">
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-syne font-bold text-[14px] text-white uppercase tracking-[0.06em] mx-3">
                BURGERS
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-3 opacity-80" />
              <span className="font-syne font-bold text-[14px] text-white uppercase tracking-[0.06em] mx-3">
                PIZZAS
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-3 opacity-80" />
              <span className="font-syne font-bold text-[14px] text-white uppercase tracking-[0.06em] mx-3">
                CHICKEN CROUSTILLANT
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-3 opacity-80" />
              <span className="font-syne font-bold text-[14px] text-white uppercase tracking-[0.06em] mx-3">
                FRITES MAISON
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-3 opacity-80" />
              <span className="font-syne font-bold text-[14px] text-white uppercase tracking-[0.06em] mx-3">
                SERVICE RAPIDE
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-3 opacity-80" />
              <span className="font-syne font-bold text-[14px] text-white uppercase tracking-[0.06em] mx-3">
                BD DE LA KARA
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-white mx-3 opacity-80" />
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* NOS PLATS SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-charbon">
        <h2 className="font-syne font-extrabold text-[34px] md:text-[52px] text-lumiere mb-2">
          NOS PLATS
        </h2>
        <p className="font-sans font-normal text-[14px] text-fumee mb-12">
          Burgers · Pizzas · Chicken — simple, rapide, bon.
        </p>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x snap-mandatory hide-scrollbar">
          {featuredItems.map(item => {
            const getBg = (cat: string) => {
              if (cat === 'cat_burgers') return burgerHeroImg;
              if (cat === 'cat_pizzas') return pizzaImg;
              return friedChickenImg;
            };

            return (
              <div key={item.id} className="min-w-[280px] md:min-w-0 snap-center group flex flex-col bg-surface border border-[rgba(244,130,31,0.08)] rounded-[10px] overflow-hidden transition-all duration-240 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-video w-full overflow-hidden">
                  <img src={getBg(item.category)} alt={item.name} className="w-full h-full object-cover contrast-[1.08] saturate-[1.1] transition-all duration-220 group-hover:contrast-[1.14]" />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[rgba(17,17,17,0.68)] to-transparent" />
                  <div className="absolute top-3 right-3 bg-[rgba(244,130,31,0.88)] px-2 py-1 rounded-[3px]">
                    <span className="font-syne font-bold text-[9px] text-white uppercase tracking-wider">
                      {item.category.replace('cat_', '')}
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-sans font-semibold text-[16px] text-lumiere mb-1">{item.name}</h3>
                  <p className="font-sans font-normal text-[13px] text-fumee line-clamp-2 mb-4">
                    {item.description || "Une recette classique et généreuse, préparée à la commande."}
                  </p>
                  <div className="mt-auto">
                    <div className="font-syne font-bold text-[20px] text-braise mb-4">
                      {new Intl.NumberFormat('fr-FR').format(item.price)} FCFA
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full bg-[rgba(244,130,31,0.08)] border-t border-[rgba(244,130,31,0.12)] py-3 flex items-center justify-center gap-2 transition-colors duration-180 hover:bg-braise group/btn"
                >
                  <Plus className="w-[14px] h-[14px] text-braise group-hover/btn:text-charbon" />
                  <span className="font-syne font-bold text-[11px] text-braise uppercase tracking-widest group-hover/btn:text-charbon">
                    Ajouter
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 bg-[#0D0D0D]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <Zap className="w-[36px] h-[36px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Rapide</h3>
            <p className="font-sans text-[14px] text-fumee max-w-sm">Commandé, préparé, prêt. Pas de jargon.</p>
          </div>
          <div className="flex flex-col gap-4">
            <Banknote className="w-[36px] h-[36px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Accessible</h3>
            <p className="font-sans text-[14px] text-fumee max-w-sm">De 2 000 à 5 000 FCFA. Fait pour les étudiants.</p>
          </div>
          <div className="flex flex-col gap-4">
            <Flame className="w-[36px] h-[36px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Savoureux</h3>
            <p className="font-sans text-[14px] text-fumee max-w-sm">Recettes simples. Ingrédients frais. Résultat constant.</p>
          </div>
          <div className="flex flex-col gap-4">
            <Bike className="w-[36px] h-[36px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Livraison</h3>
            <p className="font-sans text-[14px] text-fumee max-w-sm">Zone Bd de la Kara. Appelle ou commande via WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* CTA TELEPHONE */}
      <section className="py-24 px-6 bg-braise flex flex-col items-center text-center">
        <span className="font-syne font-bold text-[14px] text-[#111111] uppercase tracking-widest mb-6">
          Commande Directe
        </span>
        <div className="flex items-center gap-4 mb-8">
          <Phone className="w-[44px] h-[44px] text-[#111111]" fill="currentColor" />
          <span className="font-syne font-extrabold text-[36px] md:text-[64px] text-[#111111] tracking-tight">
            93 01 56 79
          </span>
        </div>
        <a 
          href="tel:+22893015679"
          className="bg-white text-braise font-syne font-bold text-[12px] uppercase tracking-[0.12em] px-8 py-4 rounded-md hover:scale-[1.03] active:scale-[0.96] transition-transform duration-120"
        >
          Appeler Maintenant
        </a>
      </section>

      {/* INFOS PRATIQUES */}
      <section className="py-16 px-6 md:px-12 lg:px-20 bg-surface grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex items-start gap-5">
          <Clock className="w-[24px] h-[24px] text-braise shrink-0 mt-1" />
          <h3 className="font-syne font-bold text-[26px] text-lumiere leading-tight">
            Tous les jours<br/>11h00 – 22h00
          </h3>
        </div>
        <div className="flex items-start gap-5">
          <MapPin className="w-[24px] h-[24px] text-braise shrink-0 mt-1" />
          <h3 className="font-syne font-bold text-[20px] text-lumiere leading-tight">
            Bd de la Kara<br/>Feu rouge IAEC<br/>Tokoin Doumasséssé<br/>Lomé
          </h3>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0A0A0A] py-[60px] px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Col 1 */}
          <div className="flex flex-col">
            <span className="font-syne font-extrabold text-[54px] text-braise leading-none mb-1">ELITE</span>
            <span className="font-syne font-bold text-[22px] text-fumee mb-4">PIZZA BURGER</span>
            <p className="font-sans text-[13px] text-fumee">Fast-food de quartier · Lomé, Togo</p>
          </div>
          {/* Col 2 */}
          <div className="flex flex-col gap-4">
            <span className="font-syne font-bold text-[10px] text-fumee uppercase tracking-[0.16em] mb-2">NAVIGATION</span>
            <Link to="/" className="font-sans text-[14px] text-lumiere hover:text-braise transition-colors duration-150">Home</Link>
            <Link to="/menu" className="font-sans text-[14px] text-lumiere hover:text-braise transition-colors duration-150">Menu</Link>
            <Link to="/about" className="font-sans text-[14px] text-lumiere hover:text-braise transition-colors duration-150">À propos</Link>
            <Link to="/contact" className="font-sans text-[14px] text-lumiere hover:text-braise transition-colors duration-150">Contact</Link>
          </div>
          {/* Col 3 */}
          <div className="flex flex-col gap-4">
            <span className="font-syne font-bold text-[10px] text-fumee uppercase tracking-[0.16em] mb-2 opacity-0 hidden md:block">CONTACT</span>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-fumee" />
              <span className="font-sans text-[14px] text-fumee">Bd de la Kara · Lomé</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-fumee" />
              <span className="font-sans text-[14px] text-fumee">11h00 – 22h00 · 7J/7</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-fumee" />
              <span className="font-sans text-[14px] text-lumiere">{restaurantInfo.whatsapp.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '+$1 $2 $3 $4')}</span>
            </div>
            <a href={`https://instagram.com/${restaurantInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mt-2 group">
              <span className="font-sans text-[14px] text-fumee group-hover:text-braise transition-colors duration-150">@{restaurantInfo.instagram}</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-6">
          <p className="font-sans text-[11px] text-fumee text-center md:text-left">
            © 2025 Elite Pizza Burger · Lomé, Togo · Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};
