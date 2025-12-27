
import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertTriangle, FileUp } from 'lucide-react';
import Modal from '../components/Modal';

interface Props {
  companyId: string;
}

const ComplianceManagement: React.FC<Props> = ({ companyId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Compliance Center</h2>
          <p className="text-slate-500 mt-1">PF, ESIC, PT Challans and statutory registers.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all"
        >
          <Upload size={18} />
          Upload New Challan
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Upload Statutory Filing">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Filing Type</label>
              <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option>EPF Monthly ECR</option>
                <option>ESIC Monthly Contribution</option>
                <option>Professional Tax (PT)</option>
                <option>Income Tax (TDS)</option>
                <option>Labour Law Compliance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reporting Period</label>
              <input type="month" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" defaultValue="2024-04" required />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction Reference #</label>
            <input type="text" placeholder="e.g., TXN99283401" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document Upload</label>
            <div className="border-2 border-dashed border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
              <FileUp size={40} className="text-slate-300 group-hover:text-indigo-500 transition-colors mb-4" />
              <p className="text-sm font-bold text-slate-500">Drop PDF/Excel or click to browse</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest">Max file size: 10MB</p>
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100">Submit Filing</button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Statutory Documents</h3>
              <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm font-semibold focus:outline-none">
                <option>FY 2023-24</option>
                <option>FY 2024-25</option>
              </select>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                { title: 'EPF ECR - April 2024', date: 'May 10, 2024', status: 'Verified', type: 'PF' },
                { title: 'ESIC Contribution - April 2024', date: 'May 12, 2024', status: 'Pending Verification', type: 'ESIC' },
                { title: 'Wage Register - April 2024', date: 'May 02, 2024', status: 'Verified', type: 'WR' },
                { title: 'Professional Tax - Q1', date: 'April 30, 2024', status: 'Verified', type: 'PT' },
              ].map((doc, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{doc.title}</h4>
                      <p className="text-xs text-slate-500">Uploaded on {doc.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {doc.status.toUpperCase()}
                    </span>
                    <button className="p-2 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50">
                      <Download size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100">
            <h3 className="font-bold mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="text-center bg-white/20 p-2 rounded-lg h-fit">
                  <p className="text-xs font-bold leading-none">MAY</p>
                  <p className="text-lg font-bold">15</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm">PF Challan Payment</h4>
                  <p className="text-xs text-white/60">Last date for submission</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
                <div className="text-center bg-white/20 p-2 rounded-lg h-fit">
                  <p className="text-xs font-bold leading-none">MAY</p>
                  <p className="text-lg font-bold">21</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm">ESIC Filing</h4>
                  <p className="text-xs text-white/60">Monthly contribution filing</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Risk Analytics</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                <CheckCircle size={18} />
                <span className="text-sm font-bold">94% Compliant</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-100">
                <AlertTriangle size={18} />
                <span className="text-sm font-bold">Missing Annual Return</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceManagement;
