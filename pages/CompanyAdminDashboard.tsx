
import React from 'react';
import { 
  Users, 
  Calendar, 
  Wallet, 
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { MOCK_COMPANIES, MOCK_EMPLOYEES, MOCK_PAYROLLS } from '../store';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip,
  CartesianGrid 
} from 'recharts';

interface Props {
  companyId: string;
}

const data = [
  { name: '01', val: 400 },
  { name: '05', val: 300 },
  { name: '10', val: 600 },
  { name: '15', val: 800 },
  { name: '20', val: 500 },
  { name: '25', val: 900 },
  { name: '30', val: 1100 },
];

const CompanyAdminDashboard: React.FC<Props> = ({ companyId }) => {
  const company = MOCK_COMPANIES.find(c => c.id === companyId);
  const employeeCount = MOCK_EMPLOYEES.filter(e => e.companyId === companyId).length;
  const lastPayroll = MOCK_PAYROLLS.find(p => p.companyId === companyId);

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">{company?.name} Workspace</h2>
          <p className="text-slate-500 mt-1 font-medium">Monitoring payroll health and workforce analytics.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200">
           <Activity size={20} className="text-indigo-600" />
           <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Next Pay Date</p>
              <p className="text-sm font-bold text-slate-900">June 01, 2024</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Employees', value: employeeCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Action Items', value: '04', icon: Calendar, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Payroll Payout', value: `$${lastPayroll?.totalPayout.toLocaleString()}`, icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Health Score', value: '98%', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className={`${item.bg} ${item.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
              <item.icon size={24} />
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1">{item.label}</p>
            <h4 className="text-2xl font-extrabold text-slate-900">{item.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <h4 className="text-lg font-bold text-slate-900">Monthly Payout Velocity</h4>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
              <TrendingUp size={14} /> +12.4% vs prev
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="val" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-6">
           <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-100 flex flex-col justify-between h-full group cursor-pointer hover:bg-indigo-700 transition-all">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-white/60 mb-8">Fast Action</h4>
                <h3 className="text-3xl font-bold leading-tight">Start Payroll Cycle</h3>
                <p className="mt-4 text-white/70 text-sm leading-relaxed">Initiate bulk computation and verification for the current month.</p>
              </div>
              <div className="mt-10 flex items-center justify-between">
                 <span className="text-sm font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">Ready for Q2</span>
                 <div className="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center transition-transform group-hover:translate-x-2">
                    <ArrowUpRight size={24} />
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;
