import React, { useState, useEffect } from 'react';
import { Hash } from 'lucide-react';
import { Menu } from './Menu';
import { useAppData } from '../context/AppDataContext';

export const ScanMenu = () => {
  const { tableNumber, setTableNumber } = useAppData();
  const [showModal, setShowModal] = useState(false);
  const [inputTable, setInputTable] = useState('');

  useEffect(() => {
    // We check if tableNumber is valid. 
    // Wait for the next tick to prevent flashing if value is already there
    if (!tableNumber) {
      setShowModal(true);
    }
  }, [tableNumber]);

  const handleConfirm = () => {
    const num = parseInt(inputTable, 10);
    if (!isNaN(num) && num > 0 && num <= 30) {
      setTableNumber(num.toString());
      setShowModal(false);
    } else {
      alert("Veuillez entrer un numéro de table valide (1 à 30).");
    }
  };

  return (
    <>
      <Menu scanMode={true} />

      {tableNumber && (
        <div className="fixed top-4 right-20 z-[60] bg-[rgba(244,130,31,0.9)] px-3 py-1.5 rounded-[4px] flex items-center gap-1.5">
          <Hash className="w-[14px] h-[14px] text-[#111111]" strokeWidth={2.5} />
          <span className="font-syne font-bold text-[13px] text-[#111111] leading-none">Table {tableNumber}</span>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111111]" />
          <div className="relative bg-[#1C1C1C] rounded-[10px] w-full max-w-[400px] p-8 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <Hash className="w-[40px] h-[40px] text-braise mb-6" />
            <h2 className="font-syne font-extrabold text-[30px] text-lumiere mb-2 leading-tight">
              Votre numéro de table ?
            </h2>
            <p className="font-sans font-normal text-[14px] text-fumee mb-8">
              Entrez le numéro pour accéder au menu
            </p>
            <input 
              type="number"
              value={inputTable}
              onChange={(e) => setInputTable(e.target.value)}
              placeholder="ex : 7"
              className="h-[52px] w-full bg-[rgba(255,255,255,0.04)] border-2 border-[rgba(244,130,31,0.28)] rounded-md text-center font-syne font-bold text-[24px] text-lumiere placeholder:text-[rgba(255,255,255,0.15)] focus:border-braise focus:outline-none transition-colors mb-6"
            />
            <button 
              onClick={handleConfirm}
              disabled={!inputTable}
              className={`w-full h-[52px] bg-braise text-[#111111] font-syne font-bold text-[13px] uppercase tracking-[0.1em] rounded-md transition-opacity duration-200 ${!inputTable ? 'opacity-35' : 'opacity-100 hover:bg-braise-dark'}`}
            >
              Confirmer
            </button>
          </div>
        </div>
      )}
    </>
  );
};
