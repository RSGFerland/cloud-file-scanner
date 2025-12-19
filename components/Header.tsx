
import React from 'react';
import { AppSection } from '../types';
import { Bell, User, Zap } from 'lucide-react';

interface HeaderProps {
  activeSection: AppSection;
  vaultHealth: number;
}

const Header: React.FC<HeaderProps> = ({ activeSection, vaultHealth }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm z-10">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {activeSection.replace('_', ' ')}
        </h2>
        <div className="h-4 w-px bg-gray-300"></div>
        <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
          <Zap size={14} className="text-[#F68B1F]" />
          <span className="text-xs font-bold text-[#F68B1F]">VAULT HEALTH: {vaultHealth}%</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative">
          <Bell size={20} className="text-gray-500 cursor-pointer hover:text-[#F68B1F]" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#F68B1F] rounded-full border-2 border-white"></span>
        </div>
        <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-[#F68B1F] transition-colors">
          <span>Azure AD Secure</span>
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <User size={18} className="text-gray-500" />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;
