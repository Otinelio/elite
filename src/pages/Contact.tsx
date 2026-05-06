import React from 'react';
import { MapPin, Phone, MessageCircle, Clock, Camera } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';

export const Contact = () => {
  const { restaurantInfo } = useAppData();

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Bloc 1: Où nous trouver (Surface) */}
      <section className="bg-surface py-20 px-6 md:px-12 flex flex-col items-center text-center">
        <MapPin className="w-[32px] h-[32px] text-braise mb-6" />
        <h2 className="font-syne font-extrabold text-[34px] text-lumiere mb-4">
          OÙ NOUS TROUVER
        </h2>
        <p className="font-sans font-normal text-[15px] text-fumee max-w-lg mb-8">
          {restaurantInfo.address}
        </p>
        <a 
          href="https://maps.google.com/?q=6.16358,1.21476" 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-8 py-3 border border-braise text-braise font-syne font-bold text-[12px] uppercase tracking-[0.1em] hover:bg-[rgba(244,130,31,0.08)] transition-colors duration-200"
        >
          Ouvrir dans Maps
        </a>
      </section>

      {/* Bloc 2: Appelez-nous (Braise) */}
      <section className="bg-braise py-20 px-6 md:px-12 flex flex-col items-center text-center">
        <Phone className="w-[32px] h-[32px] text-[#111111] mb-6" fill="currentColor" />
        <h2 className="font-syne font-extrabold text-[34px] text-[#111111] mb-2">
          APPELEZ-NOUS
        </h2>
        <div className="font-syne font-extrabold text-[40px] md:text-[54px] text-[#111111] mb-6 tracking-tight">
          {restaurantInfo.whatsapp.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, '+$1 $2 $3 $4')}
        </div>
        <div className="flex items-center gap-2 text-[#111111]">
          <MessageCircle className="w-[22px] h-[22px]" strokeWidth={1.5} />
          <span className="font-sans font-normal text-[14px]">WhatsApp disponible</span>
        </div>
      </section>

      {/* Bloc 3: Horaires (Charbon) */}
      <section className="bg-charbon py-20 px-6 md:px-12 flex flex-col items-center text-center">
        <Clock className="w-[32px] h-[32px] text-braise mb-6" />
        <h2 className="font-syne font-extrabold text-[34px] text-lumiere mb-4">
          HORAIRES
        </h2>
        <div className="font-syne font-extrabold text-[32px] md:text-[46px] text-braise mb-8 text-center max-w-xl leading-tight">
          {restaurantInfo.hours}
        </div>
        
        {restaurantInfo.instagram && (
          <a 
            href={`https://instagram.com/${restaurantInfo.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
          >
            <Camera className="w-[20px] h-[20px] text-lumiere group-hover:text-braise transition-colors duration-200" />
            <span className="font-sans font-normal text-[14px] text-lumiere group-hover:text-braise transition-colors duration-200">
              @{restaurantInfo.instagram}
            </span>
          </a>
        )}
      </section>

      {/* Map Embed */}
      <div className="w-full h-[280px] bg-surface">
        <iframe 
          title="Google Maps Elite Pizza Burger"
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          src="https://maps.google.com/maps?q=6.16358,1.21476&hl=fr&z=16&output=embed"
        ></iframe>
      </div>
    </div>
  );
};
