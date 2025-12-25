
import React from 'react';
import { Settings, Shield, Bell, Lock, Globe, Cpu, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface Props {
  role: UserRole;
}

const SettingsPage: React.FC<Props> = ({ role }) => {
  const sections = [
    { title: 'General Settings', icon: Globe, description: 'Organization name, logo, and time zones.' },
    { title: 'Payroll Configuration', icon: Cpu, description: 'Pay cycles, cut-off dates, and holiday rules.' },
    { title: 'Security & Privacy', icon: Shield, description: 'Two-factor authentication and data encryption.' },
    { title: 'Notifications', icon: Bell, description: 'Email and SMS alerts for payroll events.' },
    { title: 'Access Control', icon: Lock, description: 'Role-based permissions and user management.' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-1">Manage your workspace preferences and system behavior.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-4xl">
        <div className="divide-y divide-slate-100">
          {sections.map((section, i) => (
            <button key={i} className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-5">
                <div className="p-3 bg-slate-50 text-slate-500 group-hover:bg-white group-hover:text-indigo-600 rounded-2xl transition-all shadow-sm group-hover:shadow">
                  <section.icon size={22} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-slate-900">{section.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{section.description}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 max-w-4xl">
         <div className="flex gap-4">
           <div className="p-2 bg-white rounded-lg text-indigo-600 h-fit">
             <Settings size={20} />
           </div>
           <div>
             <h4 className="font-bold text-indigo-900">Experimental Features</h4>
             <p className="text-sm text-indigo-700/70 mt-1">You currently have access to our Beta AI-driven payroll forecasting tool.</p>
             <button className="mt-4 text-sm font-bold text-indigo-600 hover:underline">Learn more about the roadmap</button>
           </div>
         </div>
      </div>
    </div>
  );
};

export default SettingsPage;
