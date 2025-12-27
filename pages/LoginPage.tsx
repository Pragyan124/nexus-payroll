
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Shield, Mail, Lock, ChevronRight, Building2, UserCircle, ShieldAlert, ArrowLeft } from 'lucide-react';

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
}

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      id: UserRole.ADMIN,
      title: 'Platform Administrator',
      desc: 'Full system control, company orchestration, and global analytics.',
      icon: ShieldAlert,
      color: 'bg-slate-900',
      textColor: 'text-slate-900',
      email: 'admin@nexuspay.com',
      name: 'Alexander Pierce'
    },
    {
      id: UserRole.COMPANY_ADMIN,
      title: 'Company Manager',
      desc: 'Manage payroll cycles, employee data, and compliance for your org.',
      icon: Building2,
      color: 'bg-indigo-600',
      textColor: 'text-indigo-600',
      email: 'hr@techflow.io',
      name: 'Sarah Connor',
      companyId: 'c1'
    },
    {
      id: UserRole.EMPLOYEE,
      title: 'Team Member',
      desc: 'View payslips, track attendance, and manage personal benefits.',
      icon: UserCircle,
      color: 'bg-emerald-600',
      textColor: 'text-emerald-600',
      email: 'john@techflow.io',
      name: 'John Miller',
      companyId: 'c1'
    }
  ];

  const handleLogin = (roleData: typeof roles[0]) => {
    setLoading(true);
    // Simulate a brief authentication delay
    setTimeout(() => {
      onLoginSuccess({
        name: roleData.name,
        email: roleData.email,
        role: roleData.id,
        companyId: roleData.companyId
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-900 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] -z-10"></div>

      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm"
      >
        <ArrowLeft size={18} />
        Back to Landing
      </button>

      <div className="max-w-4xl w-full animate-fade-up">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 font-black text-2xl shadow-xl">N</div>
            <h1 className="text-3xl font-bold text-slate-400 tracking-tight">NexusPay <span className="text-slate-400 font-medium">Gateway</span></h1>
          </div>
          <p className="text-slate-400 font-medium max-w-md mx-auto">Select your access identity to enter the high-performance workspace.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleLogin(role)}
              disabled={loading}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-left group hover:border-indigo-400 hover:shadow-2xl transition-all flex flex-col h-full relative overflow-hidden disabled:opacity-50"
            >
              <div className={`${role.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-lg transition-transform group-hover:scale-110`}>
                <role.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{role.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-1">{role.desc}</p>
              
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure Access</span>
                <div className={`${role.textColor} group-hover:translate-x-2 transition-transform`}>
                  <ChevronRight size={20} />
                </div>
              </div>

              {loading && selectedRole === role.id && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
            <Lock size={12} /> Military Grade 256-bit Encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
