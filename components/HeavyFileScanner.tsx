
import React, { useState } from 'react';
import { HeavyFile } from '../types';
import { Search, Info, CheckCircle, AlertCircle, FileText, Download, Trash2, Loader2 } from 'lucide-react';

interface HeavyFileScannerProps {
  files: HeavyFile[];
  isScanning: boolean;
  onScan: () => void;
  onArchive: (mb: number) => void;
}

const HeavyFileScanner: React.FC<HeavyFileScannerProps> = ({ files, isScanning, onScan, onArchive }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [archiving, setArchiving] = useState(false);
  const [showLog, setShowLog] = useState(false);

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleArchive = () => {
    if (selectedIds.size === 0) return;
    setArchiving(true);
    
    // Simulate Robocopy /MOV logic
    setTimeout(() => {
      const totalReclaimed = files
        .filter(f => selectedIds.has(f.id))
        .reduce((sum, f) => sum + f.estSpaceSavingsMB, 0);
      
      onArchive(totalReclaimed);
      setArchiving(false);
      setSelectedIds(new Set());
      setShowLog(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="https://rsg.sharepoint.com/sites/Projects..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F68B1F] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Min. Versions:</span>
            <input type="number" defaultValue={10} className="w-16 px-2 py-1 border rounded-lg" />
          </div>
          <button 
            onClick={onScan}
            disabled={isScanning}
            className="bg-[#48484A] text-white px-6 py-2 rounded-xl font-bold hover:bg-black disabled:opacity-50 flex items-center space-x-2 transition-all"
          >
            {isScanning ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            <span>{isScanning ? 'SCANNING...' : 'SCAN SITE'}</span>
          </button>
        </div>

        {selectedIds.size > 0 && (
          <button 
            onClick={handleArchive}
            disabled={archiving}
            className="ml-4 bg-[#F68B1F] text-white px-8 py-2 rounded-xl font-bold hover:bg-[#e07a1b] flex items-center space-x-2 animate-pulse"
          >
            {archiving ? <Loader2 className="animate-spin" size={18} /> : <Trash2 size={18} />}
            <span>{archiving ? 'MOVING...' : `ARCHIVE ${selectedIds.size} FILES`}</span>
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-700 flex items-center">
            <FileText size={18} className="mr-2 text-[#F68B1F]" />
            Scan Results (Targeting Version Bloat)
          </h3>
          <span className="text-xs text-gray-400 italic">Found {files.length} heavy candidates</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase font-bold text-gray-400 bg-gray-50/50">
                <th className="px-6 py-4">Select</th>
                <th className="px-6 py-4">File Name</th>
                <th className="px-6 py-4">Current Size</th>
                <th className="px-6 py-4">Versions</th>
                <th className="px-6 py-4">Est. Reclaim</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {files.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400 italic">
                    {isScanning ? 'Calculating space savings...' : 'No scan active. Enter a site URL to begin.'}
                  </td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className={`hover:bg-orange-50/30 transition-colors ${selectedIds.has(file.id) ? 'bg-orange-50' : ''}`}>
                    <td className="px-6 py-4">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.has(file.id)}
                        onChange={() => toggleSelect(file.id)}
                        className="w-4 h-4 text-[#F68B1F] rounded focus:ring-[#F68B1F]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{file.fileName}</div>
                      <div className="text-xs text-gray-400 truncate max-w-xs">{file.fullPath}</div>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm">{file.currentSizeMB} MB</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        file.versionCount > 100 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {file.versionCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-green-600">{file.estSpaceSavingsMB} MB</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Info size={14} className="text-[#F68B1F]" />
                        <span>Ready to Cut</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showLog && (
        <div className="bg-[#48484A] text-white p-6 rounded-2xl shadow-xl border border-gray-600 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold flex items-center">
              <CheckCircle size={18} className="mr-2 text-green-400" />
              Robocopy Archive Log
            </h3>
            <button 
              onClick={() => setShowLog(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="font-mono text-xs bg-black/30 p-4 rounded-lg space-y-1">
            <p className="text-green-400">SUCCESS: Moved 3 items to Q:\_Archives\ProjectsArchives</p>
            <p>COMMAND: robocopy "SharePointDrive" "Q Drive" /MOV /IF "files.txt" /XF ~$*</p>
            <p className="text-gray-400">----------------------------------------------------</p>
            <p>Total Files: 3</p>
            <p>Total Reclaimed: 17,527 MB</p>
            <p>SharePoint Quota Updated: +17.5 GB Available</p>
          </div>
          <div className="mt-4 flex space-x-3">
            <button className="flex items-center space-x-2 bg-gray-600 px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-500 transition-all">
              <Download size={14} />
              <span>DOWNLOAD CSV SUMMARY</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeavyFileScanner;
