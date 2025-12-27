
import React, { useState } from 'react';
import { Landmark, Calendar, Info, Clock, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import Modal from '../components/Modal';

interface Props {
  companyId: string;
  employeeId: string;
  role: string;
}

const LoanManagement: React.FC<Props> = ({ companyId, employeeId, role }) => {
  const isAdmin = role === 'COMPANY_ADMIN';
  const [activeTab, setActiveTab] = useState(isAdmin ? 'approvals' : 'my-loans');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loans = [
    { id: 'L1', employee: 'Sarah Connor', amount: 5000, type: 'Personal Loan', status: 'Approved', repaid: 1200, nextEmi: 'June 01', interest: '5%' },
    { id: 'L2', employee: 'John Miller', amount: 2000, type: 'Salary Advance', status: 'Pending', repaid: 0, nextEmi: '-', interest: '0%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Loans & Advances</h2>
          <p className="text-slate-500 mt-1">Manage employee financial assistance and EMI deductions.</p>
        </div>
        {!isAdmin && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            <Plus size={20} />
            Apply for Loan
          </button>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Loan Application">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loan Type</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Salary Advance (Interest Free)</option>
              <option>Personal Loan (5% APR)</option>
              <option>Emergency Medical Loan</option>
              <option>Education Support</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Requested Amount ($)</label>
            <input type="number" placeholder="e.g., 2000" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
            <p className="text-[10px] text-slate-400 italic">Maximum eligible amount: $12,400</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Repayment Tenure (Months)</label>
            <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>3 Months</option>
              <option>6 Months</option>
              <option>12 Months</option>
              <option>24 Months</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reason for Application</label>
            <textarea placeholder="Please describe the purpose of the loan..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 min-h-[100px]" required></textarea>
          </div>
          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100">Submit Application</button>
          </div>
        </form>
      </Modal>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('approvals')}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'approvals' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
          >
            Pending Approvals
          </button>
        )}
        <button 
          onClick={() => setActiveTab('my-loans')}
          className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'my-loans' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
        >
          {isAdmin ? 'Active Loans' : 'My Loans'}
        </button>
      </div>

      {activeTab === 'my-loans' && !isAdmin && (
        <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Landmark size={120} />
          </div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">Total Borrowed</p>
              <h3 className="text-4xl font-bold mt-1">$0.00</h3>
              <p className="text-indigo-300 text-xs mt-4">You have no active loans or advances at the moment.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <Info size={16} className="text-indigo-300" />
                <span className="text-sm font-bold">Eligibility</span>
              </div>
              <p className="text-xs text-indigo-100 leading-relaxed">Based on your 2 years of service, you are eligible for up to 3x your monthly basic salary.</p>
            </div>
            <div className="flex items-center justify-end">
               <button onClick={() => setIsModalOpen(true)} className="px-6 py-3 bg-white text-indigo-900 rounded-xl font-bold hover:bg-indigo-50 transition-all">
                 Apply Now
               </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4">Reference</th>
              {isAdmin && <th className="px-6 py-4">Employee</th>}
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Repayment Status</th>
              <th className="px-6 py-4">Next EMI</th>
              <th className="px-6 py-4">Status</th>
              {isAdmin && <th className="px-6 py-4"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loans.map((loan) => (
              <tr key={loan.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-500">{loan.id}</td>
                {isAdmin && <td className="px-6 py-4 font-bold text-slate-900">{loan.employee}</td>}
                <td className="px-6 py-4 font-bold text-slate-900">${loan.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-slate-600">{loan.type}</td>
                <td className="px-6 py-4">
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-indigo-600 h-full" style={{ width: `${(loan.repaid/loan.amount)*100}%` }}></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 font-bold">${loan.repaid} repaid</p>
                </td>
                <td className="px-6 py-4 font-medium text-slate-600">{loan.nextEmi}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 w-fit ${
                    loan.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {loan.status === 'Approved' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {loan.status.toUpperCase()}
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <button className="text-indigo-600 font-bold hover:underline">Manage</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanManagement;
