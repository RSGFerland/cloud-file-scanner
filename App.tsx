
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import HeavyFileScanner from './components/HeavyFileScanner';
import AzureOps from './components/AzureOps';
import VirtualPet from './components/VirtualPet';
import { AppSection, HeavyFile, PetMood } from './types';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.DASHBOARD);
  const [scannedFiles, setScannedFiles] = useState<HeavyFile[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [vaultHealth, setVaultHealth] = useState(65); // 0-100
  const [petMood, setPetMood] = useState<PetMood>({ state: 'neutral', message: 'Ready to optimize, Eric!' });

  // Handle mock scan trigger
  const triggerScan = () => {
    setIsScanning(true);
    setPetMood({ state: 'scanning', message: 'Scanning SharePoint for bloat...' });
    
    setTimeout(() => {
      const mockFiles: HeavyFile[] = [
        {
          id: '1',
          fileName: 'Project_Design_Final_v2.docx',
          fullPath: 'SharePoint/Virginia/191620 NSN/Docs',
          currentSizeMB: 15.5,
          versionCount: 450,
          estSpaceSavingsMB: 6975,
          lastModified: '2023-10-12',
          selected: false
        },
        {
          id: '2',
          fileName: 'Marketing_Assets_2022.zip',
          fullPath: 'SharePoint/Virginia/200793 Chesapeake/Marketing',
          currentSizeMB: 250,
          versionCount: 22,
          estSpaceSavingsMB: 5500,
          lastModified: '2022-05-20',
          selected: false
        },
        {
          id: '3',
          fileName: 'Traffic_Analysis_v9.xlsx',
          fullPath: 'SharePoint/Virginia/20154_ExpressLanes/Data',
          currentSizeMB: 42.1,
          versionCount: 120,
          estSpaceSavingsMB: 5052,
          lastModified: '2024-01-05',
          selected: false
        }
      ];
      setScannedFiles(mockFiles);
      setIsScanning(false);
      setPetMood({ state: 'happy', message: 'Whoa! I found a lot of hidden versions!' });
    }, 2500);
  };

  const handleArchivalComplete = (reclaimedMB: number) => {
    setVaultHealth(prev => Math.min(100, prev + 5));
    setPetMood({ state: 'excited', message: `Great job! You saved ${reclaimedMB}MB!` });
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeSection={activeSection} 
          vaultHealth={vaultHealth}
        />
        
        <main className="flex-1 overflow-y-auto p-6 relative">
          {activeSection === AppSection.DASHBOARD && (
            <Dashboard 
              vaultHealth={vaultHealth} 
              onQuickScan={triggerScan}
            />
          )}
          
          {activeSection === AppSection.SCANNER && (
            <HeavyFileScanner 
              files={scannedFiles} 
              isScanning={isScanning} 
              onScan={triggerScan}
              onArchive={handleArchivalComplete}
            />
          )}

          {activeSection === AppSection.AZURE_OPS && (
            <AzureOps />
          )}

          {/* Persistent Virtual Pet in Corner */}
          <VirtualPet mood={petMood} />
        </main>
      </div>
    </div>
  );
};

export default App;
