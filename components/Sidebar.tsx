
import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Clock, 
  Wallet, 
  BadgePercent, 
  Landmark, 
  FileText,
  UserCircle,
  ShieldCheck,
  Settings,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE] },
    { id: 'companies', label: 'Workspaces', icon: Building2, roles: [UserRole.ADMIN] },
    { id: 'employees', label: 'Employee Hub', icon: Users, roles: [UserRole.COMPANY_ADMIN] },
    { id: 'attendance', label: 'Attendance', icon: Clock, roles: [UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE] },
    { id: 'payroll', label: 'Payroll Engine', icon: Wallet, roles: [UserRole.COMPANY_ADMIN] },
    { id: 'allowances', label: 'Benefits', icon: BadgePercent, roles: [UserRole.COMPANY_ADMIN] },
    { id: 'loans', label: 'Loans & Capital', icon: Landmark, roles: [UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE] },
    { id: 'compliance', label: 'Compliance', icon: ShieldCheck, roles: [UserRole.ADMIN, UserRole.COMPANY_ADMIN] },
    { id: 'reports', label: 'Analytics', icon: FileText, roles: [UserRole.COMPANY_ADMIN] },
    { id: 'profile', label: 'My Identity', icon: UserCircle, roles: [UserRole.EMPLOYEE] },
    { id: 'settings', label: 'Settings', icon: Settings, roles: [UserRole.ADMIN, UserRole.COMPANY_ADMIN] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <aside className="w-64 lg:w-72 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-indigo-500/20">N</div>
          <h1 className="text-xl font-bold text-white tracking-tight">NexusPay</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {filteredItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
              activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
              AP
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Alexander P.</p>
              <p className="text-xs text-slate-500 truncate">{role.replace('_', ' ')}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
