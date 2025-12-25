
import React from 'react';
import { Plus, BadgePercent, Settings, Users, Search, ChevronRight } from 'lucide-react';

interface Props {
  companyId: string;
}

const AllowancesManagement: React.FC<Props> = ({ companyId }) => {
  const allowances = [
    { id: 1, name: 'HRA (House Rent Allowance)', type: 'Fixed Percentage', value: '40% of Basic', category: 'Standard', employees: 'All' },
    { id: 2, name: 'Conveyance Allowance', type: 'Fixed Amount', value: '$200', category: 'Standard', employees: 'Field Staff' },
    { id: 3, name: 'Performance Bonus', type: 'Variable', value: 'Based on Rating', category: 'Incentive', employees: 'All' },
    { id: 4, name: 'Food Subsidy', type: 'Fixed Amount', value: '$100', category: 'Utility', employees: 'On-Site Only' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Allowances & Benefits</h2>
          <p className="text-slate-500 mt-1">Configure recurring and one-time benefit components.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
          <Plus size={20} />
          Add Allowance
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Monthly Benefit Payout', value: '$12,450', icon: BadgePercent, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Active Components', value: '8', icon: Settings, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Beneficiaries', value: '1,420', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search components..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none" />
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-6 py-4">Component Name</th>
              <th className="px-6 py-4">Calculation Type</th>
              <th className="px-6 py-4">Value</th>
              <th className="px-6 py-4">Eligibility</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {allowances.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">{item.name}</td>
                <td className="px-6 py-4 text-slate-600">{item.type}</td>
                <td className="px-6 py-4 font-semibold text-indigo-600">{item.value}</td>
                <td className="px-6 py-4 text-slate-600">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold">{item.employees}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-[10px] font-bold">{item.category}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-900">
                    <ChevronRight size={18} />
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

export default AllowancesManagement;
