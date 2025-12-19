
import React from 'react';
import { TrendingUp, Database, CloudOff, ShieldAlert, Play } from 'lucide-react';
import { ACHIEVEMENTS } from '../constants';

interface DashboardProps {
  vaultHealth: number;
  onQuickScan: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ vaultHealth, onQuickScan }) => {
  const stats = [
    { label: 'Q: Drive Used', value: '4.2 TB', trend: '+12%', icon: Database, color: 'text-blue-600' },
    { label: 'SharePoint Bloat', value: '850 GB', trend: '-5%', icon: CloudOff, color: 'text-orange-600' },
    { label: 'Sync Errors', value: '3 Pending', trend: 'Stable', icon: ShieldAlert, color: 'text-red-600' },
    { label: 'Space Reclaimed', value: '1.2 TB', trend: 'Total', icon: TrendingUp, color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gray-50 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend.startsWith('+') ? 'bg-red-50 text-red-600' : 
                stat.trend.startsWith('-') ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress & Quick Action */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Vault Readiness</h2>
              <p className="text-sm text-gray-500">Institutional memory health & storage compliance</p>
            </div>
            <button 
              onClick={onQuickScan}
              className="flex items-center space-x-2 bg-[#F68B1F] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e07a1b] transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <Play size={18} />
              <span>START HEAVY SCAN</span>
            </button>
          </div>

          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                  Compliance Level
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-orange-600">
                  {vaultHealth}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-4 mb-4 text-xs flex rounded-full bg-orange-100">
              <div 
                style={{ width: `${vaultHealth}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#F68B1F] transition-all duration-1000"
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              * Based on SharePoint version history purging and automated Q: drive archival cycles.
            </p>
          </div>
        </div>

        {/* Gamification / Achievements */}
        <div className="bg-[#48484A] text-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🏆</span> Achievement Badges
          </h3>
          <div className="space-y-4">
            {ACHIEVEMENTS.map((ach) => (
              <div key={ach.id} className={`flex items-center p-3 rounded-xl border transition-all ${
                ach.unlocked ? 'bg-gray-700 border-gray-600' : 'bg-gray-800 border-transparent opacity-50 grayscale'
              }`}>
                <div className="text-2xl mr-4">{ach.icon}</div>
                <div>
                  <h4 className="text-sm font-bold">{ach.title}</h4>
                  <p className="text-xs text-gray-400">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-[#F68B1F] border border-[#F68B1F] rounded-lg hover:bg-[#F68B1F] hover:text-white transition-all">
            VIEW LEADERBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
