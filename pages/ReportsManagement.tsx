
import React from 'react';
import { FileText, Download, BarChart3, Clock, Users, Shield, FileSpreadsheet } from 'lucide-react';

interface Props {
  companyId: string;
}

const ReportsManagement: React.FC<Props> = ({ companyId }) => {
  const reports = [
    { title: 'Monthly Salary Register', category: 'Payroll', description: 'Complete breakdown of earnings and deductions.', icon: BarChart3, type: 'PDF/Excel' },
    { title: 'Bank Transfer Statement', category: 'Payroll', description: 'Net payable amounts for direct bank uploads.', icon: FileSpreadsheet, type: 'Excel' },
    { title: 'Employee Master Roll', category: 'Attendance', description: 'Monthly attendance summaries per department.', icon: Users, type: 'PDF' },
    { title: 'PF ECR & ESIC Reports', category: 'Statutory', description: 'Government format files for portal upload.', icon: Shield, type: 'Text/Excel' },
    { title: 'Leave Balance Report', category: 'Attendance', description: 'Pending leaves and accruals per employee.', icon: Clock, type: 'PDF' },
    { title: 'Income Tax Projections', category: 'Taxation', description: 'TDS calculations and investment declarations.', icon: FileText, type: 'PDF' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Analytics & Reports</h2>
        <p className="text-slate-500 mt-1">Export data for audits, compliance, and management review.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all p-6 group">
            <div className="flex items-start justify-between mb-6">
              <div className="p-3 bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 rounded-xl transition-colors">
                <report.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded uppercase">{report.category}</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-2">{report.title}</h4>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">{report.description}</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <span className="text-[10px] font-bold text-slate-400">FORMAT: {report.type}</span>
              <button className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700">
                <Download size={14} />
                Generate
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsManagement;
