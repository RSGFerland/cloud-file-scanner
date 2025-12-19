
import React from 'react';
import { PetMood } from '../types';

interface VirtualPetProps {
  mood: PetMood;
}

const VirtualPet: React.FC<VirtualPetProps> = ({ mood }) => {
  const getEmoji = () => {
    switch (mood.state) {
      case 'happy': return '😺';
      case 'excited': return '😸';
      case 'scanning': return '🧐';
      default: return '🐱';
    }
  };

  const getAnimation = () => {
    switch (mood.state) {
      case 'excited': return 'animate-bounce';
      case 'scanning': return 'animate-pulse';
      default: return 'animate-none';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="absolute bottom-full right-0 mb-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-[#48484A] text-white px-4 py-2 rounded-2xl shadow-xl text-xs font-medium relative whitespace-nowrap">
          {mood.message}
          <div className="absolute top-full right-4 w-3 h-3 bg-[#48484A] transform rotate-45 -translate-y-1/2"></div>
        </div>
      </div>
      
      <div className={`w-16 h-16 bg-white border-2 border-[#F68B1F] rounded-full shadow-2xl flex items-center justify-center text-4xl cursor-pointer hover:scale-110 transition-transform ${getAnimation()}`}>
        {getEmoji()}
      </div>

      <div className="absolute -top-1 -left-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
  );
};

export default VirtualPet;
