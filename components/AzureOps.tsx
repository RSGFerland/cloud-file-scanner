
import React from 'react';
import { Cloud, Server, ShieldCheck, Activity, Terminal, ExternalLink, RefreshCw } from 'lucide-react';

const AzureOps: React.FC = () => {
  const resources = [
    { name: 'OpsVault-Web', type: 'Static Web App', status: 'Healthy', region: 'East US', tier: 'Free' },
    { name: 'OpsVault-API', type: 'Function App', status: 'Healthy', region: 'East US', tier: 'Consumption' },
    { name: 'RSG-Auth', type: 'Azure AD', status: 'Secured', region: 'Global', tier: 'Standard' },
    { name: 'Vault-Monitor', type: 'Application Insights', status: 'Active', region: 'East US', tier: 'Free' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-3xl text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Azure Cloud Infrastructure</h2>
          <p className="text-blue-100 mb-6 max-w-xl">
            OpsVault runs entirely in Azure to offload heavy processing from user machines. 
            All scans and archival movements are handled by secured serverless functions.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-blue-700 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center space-x-2">
              <Activity size={18} />
              <span>LIVE LOGS</span>
            </button>
            <button className="bg-blue-500/30 backdrop-blur-sm text-white border border-blue-400 px-6 py-2 rounded-xl font-bold hover:bg-blue-500/50 transition-all flex items-center space-x-2">
              <RefreshCw size={18} />
              <span>DEPLOY REFRESH</span>
            </button>
          </div>
        </div>
        <Cloud size={180} className="absolute -right-10 -bottom-10 text-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((res, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <Server size={20} />
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                {res.tier}
              </span>
            </div>
            <h4 className="font-bold text-gray-900 truncate">{res.name}</h4>
            <p className="text-xs text-gray-500 mb-4">{res.type}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-600">{res.status}</span>
              </div>
              <span className="text-xs text-gray-400">{res.region}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <ShieldCheck size={20} className="mr-2 text-green-600" />
          Security & Access Compliance
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Terminal size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-bold">Azure AD Conditional Access</p>
                <p className="text-xs text-gray-500">MFA Required for all archival operations</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">ENFORCED</span>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <ExternalLink size={18} className="text-gray-600" />
              </div>
              <div>
                <p className="text-sm font-bold">API Access Tokens</p>
                <p className="text-xs text-gray-500">Short-lived JWT tokens used for Backend-to-SharePoint</p>
              </div>
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AzureOps;
