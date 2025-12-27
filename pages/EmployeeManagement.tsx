
import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../store';
import { Plus, Search, Filter, Mail, Phone, MoreVertical, ShieldCheck, Landmark } from 'lucide-react';
import Modal from '../components/Modal';

interface Props {
  companyId: string;
}

const EmployeeManagement: React.FC<Props> = ({ companyId }) => {
  const employees = MOCK_EMPLOYEES.filter(e => e.companyId === companyId);
  const [view, setView] = useState<'grid' | 'table'>('table');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Employees</h2>
          <p className="text-slate-500 mt-1">Manage workforce details, KYC documents, and bank info.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={20} />
          Onboard Employee
        </button>
      </div>

      {/* Onboard Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard New Employee">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Department</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option>Engineering</option>
                <option>Product</option>
                <option>Marketing</option>
                <option>HR</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Designation</label>
              <input type="text" placeholder="Senior Engineer" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Annual Salary ($)</label>
            <input type="number" placeholder="85000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
          </div>
          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100">Create Identity</button>
          </div>
        </form>
      </Modal>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, department..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 flex items-center gap-2 hover:bg-slate-50">
              <Filter size={16} /> Filters
            </button>
            <div className="bg-slate-100 p-1 rounded-xl flex gap-1">
              <button 
                onClick={() => setView('table')}
                className={`p-1.5 rounded-lg transition-all ${view === 'table' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="h-0.5 w-full bg-current"></div>
                  <div className="h-0.5 w-full bg-current"></div>
                  <div className="h-0.5 w-full bg-current"></div>
                </div>
              </button>
              <button 
                onClick={() => setView('grid')}
                className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                  <div className="bg-current"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Salary</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Compliance</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                      {emp.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-900">{emp.department}</p>
                  <p className="text-xs text-slate-500">{emp.designation}</p>
                </td>
                <td className="px-6 py-4 font-bold text-slate-900">
                  ${emp.salary.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    emp.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {emp.status.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <Landmark size={16} className="text-indigo-500" />
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;
