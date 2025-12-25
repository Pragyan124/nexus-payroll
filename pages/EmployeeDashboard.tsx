
import React, { useState } from 'react';
import { Clock, Download, Landmark, BadgeCheck, FileText, ChevronRight } from 'lucide-react';

interface Props {
  employeeId: string;
}

const EmployeeDashboard: React.FC<Props> = ({ employeeId }) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [lastActionTime, setLastActionTime] = useState('09:00 AM');

  const handleAttendance = () => {
    setIsCheckedIn(!isCheckedIn);
    setLastActionTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-20 -mt-20 opacity-50 z-0"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-200">
              SC
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Hello, Sarah Connor</h2>
              <p className="text-slate-500 font-medium">Senior Lead • Engineering</p>
              <div className="flex gap-2 mt-2">
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">Active</span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">On-Site</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 min-w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Clock size={16} /> Current Session
              </span>
              <span className="text-xs font-bold text-slate-400">May 15, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-bold tracking-tighter">Status</p>
                <p className={`text-lg font-bold ${isCheckedIn ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isCheckedIn ? 'Checked In' : 'Checked Out'}
                </p>
              </div>
              <button 
                onClick={handleAttendance}
                className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${
                  isCheckedIn 
                    ? 'bg-rose-500 text-white shadow-rose-200 hover:bg-rose-600' 
                    : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700'
                }`}
              >
                {isCheckedIn ? 'Check Out' : 'Check In'}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 text-center">Last updated: {lastActionTime}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
              <FileText size={20} />
            </div>
            <button className="text-xs font-bold text-indigo-600">View History</button>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Latest Payslip</h4>
          <div className="flex items-end justify-between mt-1">
            <h3 className="text-2xl font-bold text-slate-900">April 2024</h3>
            <button className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
              <Download size={18} />
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
              <BadgeCheck size={20} />
            </div>
            <button className="text-xs font-bold text-emerald-600">Request Leave</button>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Leave Balance</h4>
          <div className="flex items-end justify-between mt-1">
            <h3 className="text-2xl font-bold text-slate-900">14 Days</h3>
            <span className="text-xs font-bold text-slate-400 pb-1">Annual Quota</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
              <Landmark size={20} />
            </div>
            <button className="text-xs font-bold text-purple-600">New Request</button>
          </div>
          <h4 className="text-slate-500 text-sm font-medium">Active Loans</h4>
          <div className="flex items-end justify-between mt-1">
            <h3 className="text-2xl font-bold text-slate-900">$0.00</h3>
            <span className="text-xs font-bold text-emerald-500 pb-1">No Dues</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900">Recent Attendance Logs</h3>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">In</th>
                <th className="px-6 py-4">Out</th>
                <th className="px-6 py-4">Hours</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: 'May 14', in: '09:02 AM', out: '06:15 PM', hours: '9h 13m', status: 'Present' },
                { date: 'May 13', in: '08:55 AM', out: '06:40 PM', hours: '9h 45m', status: 'Present' },
                { date: 'May 12', in: '-', out: '-', hours: '0h', status: 'Weekly Off' },
                { date: 'May 11', in: '09:10 AM', out: '06:05 PM', hours: '8h 55m', status: 'Present' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-900">{row.date}</td>
                  <td className="px-6 py-4 text-slate-600">{row.in}</td>
                  <td className="px-6 py-4 text-slate-600">{row.out}</td>
                  <td className="px-6 py-4 text-slate-600">{row.hours}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      row.status === 'Present' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Quick Actions</h3>
          <div className="flex-1 space-y-3">
            {[
              { label: 'Update Bank Details', icon: Landmark },
              { label: 'KYC Document Center', icon: BadgeCheck },
              { label: 'Reimbursement Claim', icon: BadgePercent },
              { label: 'View Tax Declarations', icon: FileText },
            ].map((action, i) => (
              <button key={i} className="w-full group flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                <div className="flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-lg text-slate-500 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                    <action.icon size={18} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700">{action.label}</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BadgePercent = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="14.31" y1="8" x2="20.05" y2="17.94" />
    <line x1="9.69" y1="8" x2="21.17" y2="8" />
    <line x1="7.38" y1="12" x2="13.12" y2="2.06" />
    <line x1="9.69" y1="16" x2="3.95" y2="6.06" />
    <line x1="14.31" y1="16" x2="2.83" y2="16" />
    <line x1="16.62" y1="12" x2="10.88" y2="21.94" />
  </svg>
);

export default EmployeeDashboard;
