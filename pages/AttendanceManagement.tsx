
import React from 'react';
import { Calendar, CheckCircle, Clock, MapPin, MoreHorizontal, User } from 'lucide-react';

interface Props {
  companyId: string;
  employeeId: string;
  role: string;
}

const AttendanceManagement: React.FC<Props> = ({ companyId, employeeId, role }) => {
  const isAdmin = role === 'COMPANY_ADMIN';

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Attendance Tracking</h2>
          <p className="text-slate-500 mt-1">Real-time monitoring of workforce clock-in/out activities.</p>
        </div>
        {isAdmin && (
          <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
            Manual Entry
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">On Time</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Currently Present</p>
          <h3 className="text-3xl font-bold text-slate-900">42 / 45</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock size={24} />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">+12 Today</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Overtime Hours</p>
          <h3 className="text-3xl font-bold text-slate-900">124.5h</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex justify-between mb-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
              <User size={24} />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">Action Required</span>
          </div>
          <p className="text-slate-500 text-sm font-medium">Absence Rate</p>
          <h3 className="text-3xl font-bold text-slate-900">6.7%</h3>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h3 className="font-bold text-slate-900">Daily Log: May 15, 2024</h3>
          <div className="flex gap-2">
            <input type="date" className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Marketing</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">In Time</th>
                <th className="px-6 py-4">Out Time</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { name: 'Sarah Connor', in: '09:02 AM', out: '06:15 PM', hours: '9h 13m', loc: 'HQ - New York', status: 'Present' },
                { name: 'John Miller', in: '08:55 AM', out: '-', hours: '-', loc: 'Remote', status: 'In Office' },
                { name: 'Kyle Reese', in: '10:15 AM', out: '-', hours: '-', loc: 'Site-A', status: 'Late' },
                { name: 'T-800 Arnie', in: '08:00 AM', out: '11:00 PM', hours: '15h 00m', loc: 'Factory', status: 'Overtime' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                        {row.name.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-600">{row.in}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{row.out}</td>
                  <td className="px-6 py-4 text-slate-500">{row.hours}</td>
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} /> {row.loc}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      row.status === 'Present' || row.status === 'In Office' ? 'bg-emerald-100 text-emerald-700' : 
                      row.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceManagement;
