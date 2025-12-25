
import React, { useState } from 'react';
import { 
  PlayCircle, 
  Lock, 
  History, 
  CheckCircle2,
  Cpu,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { MOCK_EMPLOYEES } from '../store';

interface Props {
  companyId: string;
}

const PayrollEngine: React.FC<Props> = ({ companyId }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const employees = MOCK_EMPLOYEES.filter(e => e.companyId === companyId);

  const startRun = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCompleted(true);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">System Payout Run</h2>
          <p className="text-slate-500 mt-1 font-medium">Verify earnings and initiate automated bank transfers.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-xl bg-white text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
          <History size={18} /> View Run History
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white border border-slate-200 rounded-[2rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-[0.05] text-indigo-600">
                <Cpu size={140} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-5 mb-10">
                   <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                     <Zap size={32} />
                   </div>
                   <div>
                      <h4 className="text-2xl font-bold text-slate-900">Run Configuration</h4>
                      <p className="text-slate-500 text-sm">Validating records for {employees.length} active instances.</p>
                   </div>
                </div>

                {!completed ? (
                  <div className="space-y-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                       <div className="space-y-2">
                          <p className="text-4xl font-black text-slate-900 tracking-tighter">$164,200.00</p>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Net Payout Liability</p>
                       </div>
                       <button 
                        onClick={startRun}
                        disabled={isProcessing}
                        className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3"
                       >
                         {isProcessing ? 'Processing Calculations...' : 'Execute Payment Run'}
                         <PlayCircle size={20} />
                       </button>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div className={`h-full bg-indigo-600 transition-all duration-[3000ms] ${isProcessing ? 'w-full' : 'w-0'}`}></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-6 py-6 animate-fade-up">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-emerald-700 tracking-tight">Cycle Successfully Finalized</h4>
                      <p className="text-slate-500 mt-1">Transactions have been cryptographically signed and archived. Bank files generated.</p>
                    </div>
                  </div>
                )}
              </div>
           </div>

           <div className="bg-white border border-slate-200 rounded-[2rem] shadow-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-6">Employee Identity</th>
                    <th className="px-8 py-6">Pay Structure</th>
                    <th className="px-8 py-6 text-right">Net Payable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {employees.map(emp => (
                    <tr key={emp.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                            {emp.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{emp.name}</p>
                            <p className="text-xs text-slate-500">{emp.role}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-slate-500 font-medium">Standard Salaried</td>
                      <td className="px-8 py-6 text-right font-bold text-slate-900 text-lg">${emp.salary.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <ShieldCheck size={32} className="text-indigo-600 mb-6" />
              <h4 className="text-lg font-bold mb-3 text-slate-900 tracking-tight">Statutory Guard</h4>
              <p className="text-slate-500 text-sm leading-relaxed">System automatically verified all PF, ESIC and Income Tax deductions against latest FY2024 compliance frameworks.</p>
           </div>
           <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <Lock size={32} className="text-slate-300 mb-6" />
              <h4 className="text-lg font-bold mb-3 text-slate-900 tracking-tight">Immutable Records</h4>
              <p className="text-slate-500 text-sm leading-relaxed">Confirmed payouts are locked and archived with end-to-end encryption for audit purposes.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollEngine;
