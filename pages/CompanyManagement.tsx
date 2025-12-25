
import React from 'react';
import { MOCK_COMPANIES } from '../store';
import { ExternalLink, Settings, Shield, Package } from 'lucide-react';

const CompanyManagement: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Company Management</h2>
          <p className="text-slate-500 mt-1">Configure workspace isolation and global module activations.</p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
          Onboard New Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {MOCK_COMPANIES.map(company => (
          <div key={company.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-2xl border border-slate-100 object-cover" />
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100">
                    <Settings size={20} />
                  </button>
                  <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{company.name}</h3>
              <p className="text-slate-500 font-medium mb-6">{company.email}</p>
              
              <div className="flex flex-wrap gap-2">
                {company.modules.map(mod => (
                  <span key={mod} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-widest border border-slate-200">
                    {mod}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100 bg-slate-50/50">
              <div className="p-6 flex flex-col items-center text-center">
                <Shield size={20} className="text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">KYC Status</p>
                <p className="text-sm font-bold text-emerald-600 mt-1">Verified</p>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <Package size={20} className="text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">Subscription</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Enterprise Plan</p>
              </div>
            </div>

            <div className="p-4 bg-slate-100/30">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-2">
                <span>Workspace Usage</span>
                <span>85% Capacity</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;
