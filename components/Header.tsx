
import React from 'react';
import { Bell, Search, LogOut, ChevronDown, UserCircle } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  companyId: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, setRole, companyId, onLogout }) => {
  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 shadow-sm shadow-slate-200/50">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-8">
        <div className="hidden lg:flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          {[UserRole.ADMIN, UserRole.COMPANY_ADMIN, UserRole.EMPLOYEE].map(r => (
            <button 
              key={r}
              onClick={() => setRole(r)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                role === r ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {r.split('_').pop()?.charAt(0) + r.split('_').pop()?.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <button className="relative p-2.5 text-slate-500 hover:bg-slate-100 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 lg:pl-8 border-l border-slate-200">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">Alexander P.</p>
            <button 
              onClick={onLogout}
              className="text-xs font-bold text-slate-400 mt-1 hover:text-red-500 transition-colors flex items-center gap-1 ml-auto"
            >
              <LogOut size={12} /> Logout
            </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
            AP
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
