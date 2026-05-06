import React from 'react';
import { Flame, Users, Clock } from 'lucide-react';
import { useAppData } from '../context/AppDataContext';
import restaurantImg from '../assets/img/restaurant_interior.png';

export const About = () => {
  const { restaurantInfo } = useAppData();

  return (
    <div className="flex flex-col min-h-screen bg-charbon w-full">
      {/* Header */}
      <header className="bg-braise pt-24 pb-16 px-6 md:px-12 lg:px-20 text-center md:text-left">
        <h1 className="font-syne font-extrabold text-[48px] md:text-[68px] text-white leading-tight">
          NOTRE HISTOIRE
        </h1>
      </header>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start mb-24">
          <div className="w-full lg:w-1/2 aspect-[4/3] rounded-[6px] border-[1.5px] border-[rgba(244,130,31,0.28)] overflow-hidden shrink-0 relative">
            <img 
              src={restaurantImg} 
              alt="Restaurant Elite Pizza Burger" 
              className="w-full h-full object-cover contrast-[1.08] saturate-[1.1]"
            />
            <div className="absolute inset-0 bg-[rgba(17,17,17,0.2)]"></div>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="font-syne font-extrabold text-[32px] md:text-[38px] text-lumiere mb-6 leading-tight">
              L'Elite depuis le premier jour
            </h2>
            <div className="font-sans font-normal text-[15px] text-fumee leading-[1.8] space-y-4">
              <p>
                Sur le {restaurantInfo.address.split('·')[0]}, à deux pas de l'IAEC, {restaurantInfo.name} s'est imposé comme le fast-food de référence du quartier.
              </p>
              <p>
                Pas de chichi — des burgers généreux, des pizzas simples et des chicken croustillants à des prix que les étudiants et les jeunes actifs de Lomé peuvent se permettre tous les jours. 
              </p>
              <p>
                Ouvert 7 jours sur 7 de 11h à 22h, Elite c'est l'endroit où la faim n'a aucune chance. Notre mission est de vous servir rapidement avec un goût qui ne déçoit jamais.
              </p>
            </div>
          </div>
        </div>

        {/* Valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col gap-4">
            <Flame className="w-[32px] h-[32px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Saveur</h3>
            <p className="font-sans font-normal text-[14px] text-fumee">
              Des recettes simples, perfectionnées. Le burger que tu reviens commander.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Users className="w-[32px] h-[32px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Communauté</h3>
            <p className="font-sans font-normal text-[14px] text-fumee">
              Le spot du quartier IAEC. Pour les étudiants, les actifs, tout Lomé.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Clock className="w-[32px] h-[32px] text-braise" />
            <h3 className="font-syne font-extrabold text-[22px] text-lumiere">Disponibilité</h3>
            <p className="font-sans font-normal text-[14px] text-fumee">
              11h à 22h, 7 jours sur 7. Même le dimanche, même les jours fériés.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
