
import React from 'react';
import { AppSection } from '../types';
import { LayoutDashboard, Search, Archive, Cloud, Settings, Vault } from 'lucide-react';

interface SidebarProps {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: AppSection.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: AppSection.SCANNER, label: 'Heavy Scanner', icon: Search },
    { id: AppSection.ARCHIVES, label: 'Archives', icon: Archive },
    { id: AppSection.AZURE_OPS, label: 'Azure Ops', icon: Cloud },
    { id: AppSection.SETTINGS, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-[#48484A] text-white flex flex-col shadow-xl z-20">
      <div className="p-6 flex items-center space-x-3 border-b border-gray-600">
        <div className="p-2 bg-[#F68B1F] rounded-lg">
          <Vault size={24} className="text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">OpsVault</span>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeSection === item.id 
                ? 'bg-[#F68B1F] text-white shadow-lg' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-xs font-bold">
            EF
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Eric Ferland</span>
            <span className="text-xs text-gray-400">Senior IT Ops</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
