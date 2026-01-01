import React, { useEffect, useState } from 'react';
import { fetchCompanies } from '@/services/api'; // Ensure this matches your API file export
import { ExternalLink, Settings, Shield, Package } from 'lucide-react';


// Define Interface for Type Safety (Optional but recommended)
interface Company {
  id: string;
  name: string;
  industry: string;
  adminEmail: string; // Backend sends 'adminEmail'
  pricingTier: string;
  enabledModules: string[]; // Backend sends 'enabledModules'
  status: string;
}

const CompanyManagement: React.FC = () => {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        // FIX 1: Use the correct imported function name
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (err) {
        setError("Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="py-20 text-center text-slate-500">Loading companies...</div>;
  if (error) return <div className="py-20 text-center text-red-600 font-medium">{error}</div>;

  const getPlanBadge = (tier: string) => {
  switch (tier?.toLowerCase()) {
    case 'growth':
      return <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200 uppercase tracking-wide">Growth Plan</span>;
    case 'scale':
      return <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200 uppercase tracking-wide">Scale Plan</span>;
    case 'custom':
      return <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200 uppercase tracking-wide">Enterprise Plan</span>;
    default:
      return <span className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-bold rounded-full border border-slate-200 uppercase tracking-wide">Basic Plan</span>;
  }
};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Company Management</h2>
          <p className="text-slate-500 mt-1">Configure workspace isolation and global module activations for all clients.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {companies.map(company => (
          <div key={company.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100">
              <div className="flex items-center justify-between mb-6">
                {/* FIX 4: Use UI-Avatars for dynamic logo since backend doesn't have images yet */}
                <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(company.name)}&background=random&color=fff`} 
                    alt={company.name} 
                    className="w-16 h-16 rounded-2xl border border-slate-100 object-cover" 
                />
                
                <div className="flex gap-2">
                  <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100">
                    <Settings size={20} />
                  </button>
                  <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900">{company.name}</h3>
              {/* FIX 3: Use 'adminEmail' instead of 'email' */}
              <p className="text-slate-500 font-medium mb-6">{company.adminEmail || "No email provided"}</p>
              
              <div className="flex flex-wrap gap-2">
               {getPlanBadge(company.pricingTier)}
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-100 bg-slate-50/50">
              <div className="p-6 flex flex-col items-center text-center">
                <Shield size={20} className="text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">KYC Status</p>
                {/* Fallback status if missing */}
                <p className="text-sm font-bold text-emerald-600 mt-1">{company.status || "PENDING"}</p>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <Package size={20} className="text-slate-400 mb-2" />
                <p className="text-xs font-bold text-slate-500 uppercase">Industry</p>
                {/* Displaying Industry instead of hardcoded 'Enterprise Plan' */}
                <p className="text-sm font-bold text-slate-900 mt-1">{company.industry || "General"}</p>
              </div>
            </div>

            
            <div className="p-4 bg-slate-100/30">
              <div className="flex justify-between items-center text-xs font-medium text-slate-400 mb-2">
                <span>Workspace Usage</span>
                <span>85% Capacity</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div> 
          </div>

        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;
