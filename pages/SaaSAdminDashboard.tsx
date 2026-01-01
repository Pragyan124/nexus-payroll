
import React, { useState } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  PlusCircle,
  FileUp
} from 'lucide-react';
import {
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis
} from 'recharts';
import Modal from '../components/Modal';
import DomainChecker from '@/components/DomainChecker';
import { createCompany } from '@/services/api';


const data = [
  { name: 'Jan', companies: 12, revenue: 4000 },
  { name: 'Feb', companies: 15, revenue: 5200 },
  { name: 'Mar', companies: 18, revenue: 6100 },
  { name: 'Apr', companies: 24, revenue: 8400 },
  { name: 'May', companies: 30, revenue: 11000 },
];

const SaaSAdminDashboard: React.FC = () => {
 // UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data State
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [industry, setIndustry] = useState("Technology");
  const [selectedTier, setSelectedTier] = useState("");
  const [adminEmail, setAdminEmail] = useState("");

  const allModules = [
  "Employee Management",
  "Attendance Management",
  "Allowance Management",
  "Payroll Engine",
  "Custom Deduction Management",
  "Incentives and Bonus Module",
  "Loan / Advance Management",
  "Reliver Management",
  "Reports and PDF Generation",
  "Compliance Management",
  "Payment Gateway Integration",
  "Storage and Document Management",
];

  const tierModules = {
  growth: [
    "Employee Management",
    "Attendance Management",
    "Allowance Management",
    "Payroll Engine",
  ],
  scale: [
    "Employee Management",
    "Attendance Management",
    "Allowance Management",
    "Payroll Engine",
    "Custom Deduction Management",
    "Incentives and Bonus Module",
    "Loan / Advance Management",
    "Reliver Management",
    "Reports and PDF Generation",
  ],
  custom: allModules,
};

const includedModules =
    selectedTier ? tierModules[selectedTier as keyof typeof tierModules] : [];

const handleDomainValid = (validDomain: string) => {
  setDomain(validDomain);
};


// --- THE NEW SUBMIT LOGIC ---
  const handleDeployWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!companyName || !domain || !selectedTier) {
        alert("Please fill in all required fields.");
        return;
    }

    setIsSubmitting(true);
    const companyData = {
        companyName: companyName,     // api.ts looks for .companyName
        domain: domain,               // api.ts looks for .domain
        industry: industry,           // api.ts looks for .industry
        adminEmail: adminEmail,       // api.ts looks for .adminEmail
        pricingTier: selectedTier,    // api.ts looks for .pricingTier
        moduleIds: includedModules    // api.ts looks for .moduleIds
    };
    

    try {
        console.log("Sending Payload:", companyData);
        
        // 2. Call API
        await createCompany(companyData);
        
        // 3. Success Handler
        alert("Workspace Deployed Successfully!");
        setIsModalOpen(false);
        
        // Reset Form
        setCompanyName("");
        setDomain("");
        setSelectedTier("");
        setAdminEmail("");
        
    } catch (error) {
        console.error("Deploy failed", error);
        alert("Failed to deploy workspace. Check console.");
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Platform Overview</h2>
          <p className="text-slate-500 mt-1">Monitoring global NexusPay metrics across all 30 companies.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <PlusCircle size={20} />
          Create New Company
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard Global Client">
        {/* <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); handleDeployWorkspace }}> */}
        <form className="space-y-6" onSubmit={handleDeployWorkspace}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g., OmniCorp Industries"  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
          </div>
          <DomainChecker onDomainChange={handleDomainValid} />
          {/* <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Website</label>
            <input type="text" placeholder="e.g., omnicorp.in" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
          </div> */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Industry</label>
              <select  value={industry}
  onChange={(e) => setIndustry(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option>Technology</option>
                <option>Manufacturing</option>
                <option>Logistics</option>
                <option>Healthcare</option>
                <option>Retail & Consumer Goods</option>
                <option>Hospitality & Tourism</option>
                <option>Construction & Real Estate</option>
                <option>Financial Services</option>
                <option>Education & Training</option>
                <option>Public Sector & Government</option>
                <option>Agriculture, Forestry & Fisheries</option>
                <option>Energy & Utilities</option>
                <option>Professional & Business Services</option>
                <option>Nonprofit & NGOs</option>
                <option>Media & Creative Industries</option>
                <option>Aerospace & Defense</option>

              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing Tier</label>
              <select 
              value={selectedTier} onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                <option value="">Select Tier</option>
                <option value="growth">Growth ($499/mo)</option>
                <option value="scale">Scale ($1,299/mo)</option>
                <option value ="custom">Enterprise (Custom)</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Contact Email</label>
            <input type="email" value={adminEmail} onChange={(e) =>  setAdminEmail(e.target.value)} placeholder="admin@omnicorp.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" required />
          </div>
            {selectedTier && (
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase">
                Module Activations
              </label>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {allModules.map((module) => {
                  const isIncluded = includedModules.includes(module);
                  const isCustom = selectedTier === "custom";

                  return (
                    <label
                      key={module}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg
                        ${isIncluded ? "bg-indigo-50" : "bg-slate-50"}
                        ${!isCustom && isIncluded ? "opacity-80 cursor-not-allowed" : "hover:bg-slate-100"}
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={isIncluded}
                        disabled={!isCustom && isIncluded}
                        readOnly
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        {module}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
            <button type="submit" disabled={isSubmitting}className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100"> {isSubmitting ? "Deploying..." : "Deploy Workspace"} </button>
          </div>
        </form>
      </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Companies', value: '30', icon: Building2, color: 'bg-blue-500', trend: '+12%' },
          { label: 'Total Employees', value: '1,420', icon: Users, color: 'bg-indigo-500', trend: '+5.4%' },
          { label: 'Monthly Revenue', value: '$11,000', icon: CreditCard, color: 'bg-emerald-500', trend: '+18%' },
          { label: 'Platform Health', value: '99.9%', icon: TrendingUp, color: 'bg-purple-500', trend: 'Stable' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-xl text-white`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Revenue Growth</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dx={-10} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Companies</h3>
          <div className="flex-1 space-y-4">
            {[
              { name: 'Meta Dynamics', industry: 'Logistics', status: 'Active' },
              { name: 'Eco Build Ltd', industry: 'Construction', status: 'Pending KYC' },
              { name: 'Spark Creative', industry: 'Design', status: 'Active' },
              { name: 'Velocity Motors', industry: 'Retail', status: 'Active' },
            ].map((company, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{company.name}</p>
                    <p className="text-xs text-slate-500">{company.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${company.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                  <span className="text-xs font-medium text-slate-600">{company.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
            View All Companies
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaaSAdminDashboard;


// import React, { useState, useEffect } from 'react';
// import {
//   Building2,
//   Users,
//   CreditCard,
//   TrendingUp,
//   PlusCircle,
//   Loader2, // Added for loading state
//   CheckCircle2,
//   AlertCircle
// } from 'lucide-react';
// import {
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis
// } from 'recharts';
// import Modal from '../components/Modal';
// import DomainChecker from '@/components/DomainChecker';
// import { createCompany } from '@/services/api';

// // --- Types ---
// interface CompanyPayload {
//   companyName: string;
//   domain: string;
//   industry: string;
//   adminEmail: string;
//   pricingTier: string;
//   moduleIds: string[];
// }

// // --- Constants ---
// const ALL_MODULES = [
//   "Employee Management",
//   "Attendance Management",
//   "Allowance Management",
//   "Payroll Engine",
//   "Custom Deduction Management",
//   "Incentives and Bonus Module",
//   "Loan / Advance Management",
//   "Reliver Management",
//   "Reports and PDF Generation",
//   "Compliance Management",
//   "Payment Gateway Integration",
//   "Storage and Document Management",
// ];

// const TIER_DEFAULTS = {
//   GROWTH: [
//     "Employee Management",
//     "Attendance Management",
//     "Allowance Management",
//     "Payroll Engine",
//   ],
//   SCALE: [
//     "Employee Management",
//     "Attendance Management",
//     "Allowance Management",
//     "Payroll Engine",
//     "Custom Deduction Management",
//     "Incentives and Bonus Module",
//     "Loan / Advance Management",
//     "Reliver Management",
//     "Reports and PDF Generation",
//   ],
//   CUSTOM: ALL_MODULES, // Default to all, but allows unchecking
// };

// const CHART_DATA = [
//   { name: 'Jan', companies: 12, revenue: 4000 },
//   { name: 'Feb', companies: 15, revenue: 5200 },
//   { name: 'Mar', companies: 18, revenue: 6100 },
//   { name: 'Apr', companies: 24, revenue: 8400 },
//   { name: 'May', companies: 30, revenue: 11000 },
// ];

// const SaaSAdminDashboard: React.FC = () => {
//   // UI State
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Form Data State
//   const [companyName, setCompanyName] = useState("");
//   const [domain, setDomain] = useState("");
//   const [industry, setIndustry] = useState("Technology");
//   const [selectedTier, setSelectedTier] = useState("");
//   const [adminEmail, setAdminEmail] = useState("");
  
//   // FIX: Manage modules as state, not just derived variable
//   const [selectedModules, setSelectedModules] = useState<string[]>([]);

//   // Effect: Update modules when Tier changes
//   useEffect(() => {
//     if (!selectedTier) {
//       setSelectedModules([]);
//       return;
//     }
//     const defaults = TIER_DEFAULTS[selectedTier as keyof typeof TIER_DEFAULTS] || [];
//     setSelectedModules(defaults);
//   }, [selectedTier]);

//   // Handler: Toggle individual modules (Only for Custom tier)
//   const toggleModule = (module: string) => {
//     if (selectedTier !== 'CUSTOM') return;

//     setSelectedModules(prev => 
//       prev.includes(module) 
//         ? prev.filter(m => m !== module) 
//         : [...prev, module]
//     );
//   };

//   const handleDomainValid = (validDomain: string) => {
//     setDomain(validDomain);
//   };

//   const handleDeployWorkspace = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!companyName || !domain || !selectedTier || !adminEmail) {
//         // You should use a toast library here ideally
//         alert("Please fill in all required fields.");
//         return;
//     }

//     setIsSubmitting(true);

//     const payload: CompanyPayload = {
//         companyName,
//         domain,
//         industry,
//         adminEmail,
//         pricingTier: selectedTier,
//         moduleIds: selectedModules
//     };

//     try {
//         console.log("Sending Payload:", payload);
//         await createCompany(payload);
        
//         alert("Workspace Deployed Successfully!");
//         setIsModalOpen(false);
        
//         // Reset Form
//         setCompanyName("");
//         setDomain("");
//         setSelectedTier("");
//         setAdminEmail("");
//         setSelectedModules([]);
        
//     } catch (error) {
//         console.error("Deploy failed", error);
//         alert("Failed to deploy workspace. Check console.");
//     } finally {
//         setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500 p-6 bg-slate-50/50 min-h-screen">
      
//       {/* --- Header Section --- */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h2 className="text-3xl font-bold text-slate-900">Platform Overview</h2>
//           <p className="text-slate-500 mt-1">Monitoring global NexusPay metrics across all 30 companies.</p>
//         </div>
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
//         >
//           <PlusCircle size={20} />
//           Create New Company
//         </button>
//       </div>

//       {/* --- Stats Grid --- */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {[
//           { label: 'Active Companies', value: '30', icon: Building2, color: 'bg-blue-500', trend: '+12%' },
//           { label: 'Total Employees', value: '1,420', icon: Users, color: 'bg-indigo-500', trend: '+5.4%' },
//           { label: 'Monthly Revenue', value: '$11,000', icon: CreditCard, color: 'bg-emerald-500', trend: '+18%' },
//           { label: 'Platform Health', value: '99.9%', icon: TrendingUp, color: 'bg-purple-500', trend: 'Stable' },
//         ].map((stat, i) => (
//           <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
//             <div className="flex justify-between items-start mb-4">
//               <div className={`${stat.color} p-3 rounded-xl text-white shadow-sm`}>
//                 <stat.icon size={24} />
//               </div>
//               <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
//                 {stat.trend}
//               </span>
//             </div>
//             <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
//             <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
//           </div>
//         ))}
//       </div>

//       {/* --- Charts & Lists --- */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Chart Area */}
//         <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
//           <div className="flex items-center justify-between mb-8">
//             <h3 className="text-lg font-bold text-slate-900">Revenue Growth</h3>
//             <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer">
//               <option>Last 6 months</option>
//               <option>Last year</option>
//             </select>
//           </div>
//           <div className="h-[300px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <AreaChart data={CHART_DATA}>
//                 <defs>
//                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
//                     <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
//                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
//                 <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dx={-10} />
//                 <Tooltip
//                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
//                   cursor={{ stroke: '#6366f1', strokeWidth: 1 }}
//                 />
//                 <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Recent Companies */}
//         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
//           <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Companies</h3>
//           <div className="flex-1 space-y-4">
//             {[
//               { name: 'Meta Dynamics', industry: 'Logistics', status: 'Active' },
//               { name: 'Eco Build Ltd', industry: 'Construction', status: 'Pending KYC' },
//               { name: 'Spark Creative', industry: 'Design', status: 'Active' },
//               { name: 'Velocity Motors', industry: 'Retail', status: 'Active' },
//             ].map((company, i) => (
//               <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
//                     {company.name.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="text-sm font-semibold text-slate-900">{company.name}</p>
//                     <p className="text-xs text-slate-500">{company.industry}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className={`w-2 h-2 rounded-full ${company.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
//                   <span className="text-xs font-medium text-slate-600">{company.status}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <button className="w-full mt-6 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
//             View All Companies
//           </button>
//         </div>
//       </div>

//       {/* --- Modal --- */}
//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard Global Client">
//         <form className="space-y-6" onSubmit={handleDeployWorkspace}>
          
//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
//             <input 
//               type="text" 
//               value={companyName} 
//               onChange={(e) => setCompanyName(e.target.value)} 
//               placeholder="e.g., OmniCorp Industries"  
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
//               required 
//             />
//           </div>

//           <DomainChecker onDomainChange={handleDomainValid} />
          
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Industry</label>
//               <select 
//                 value={industry}
//                 onChange={(e) => setIndustry(e.target.value)} 
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//               >
//                 <option>Technology</option>
//                 <option>Manufacturing</option>
//                 <option>Logistics</option>
//                 <option>Healthcare</option>
//                 <option>Retail & Consumer Goods</option>
//                 <option>Financial Services</option>
//                 <option>Education & Training</option>
//               </select>
//             </div>
//             <div className="space-y-2">
//               <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pricing Tier</label>
//               <select 
//                 value={selectedTier} 
//                 onChange={(e) => setSelectedTier(e.target.value)}
//                 className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 required
//               >
//                 <option value="">Select Tier</option>
//                 <option value="growth">Growth ($499/mo)</option>
//                 <option value="scale">Scale ($1,299/mo)</option>
//                 <option value="custom">Enterprise (Custom)</option>
//               </select>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Contact Email</label>
//             <input 
//               type="email" 
//               value={adminEmail} 
//               onChange={(e) => setAdminEmail(e.target.value)} 
//               placeholder="admin@omnicorp.com" 
//               className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" 
//               required 
//             />
//           </div>

//           {selectedTier && (
//             <div className="animate-in fade-in slide-in-from-top-4 duration-300">
//               <div className="flex items-center justify-between mb-2">
//                 <label className="text-xs font-bold text-slate-400 uppercase">Module Activations</label>
//                 {selectedTier === "custom" && <span className="text-xs text-indigo-600 font-medium">Custom Selection Active</span>}
//               </div>

//               <div className="grid grid-cols-2 gap-2 h-48 overflow-y-auto pr-2 custom-scrollbar">
//                 {ALL_MODULES.map((module) => {
//                   const isIncluded = selectedModules.includes(module);
//                   const isCustom = selectedTier === "custom";

//                   return (
//                     <label
//                       key={module}
//                       className={`
//                         flex items-center gap-2 px-3 py-2 rounded-lg border transition-all select-none
//                         ${isIncluded 
//                             ? "bg-indigo-50 border-indigo-100 text-indigo-900" 
//                             : "bg-slate-50 border-transparent text-slate-500"
//                         }
//                         ${isCustom ? "cursor-pointer hover:border-indigo-200" : "cursor-not-allowed opacity-80"}
//                       `}
//                     >
//                       <div className={`
//                         w-4 h-4 rounded border flex items-center justify-center transition-colors
//                         ${isIncluded ? "bg-indigo-600 border-indigo-600" : "bg-white border-slate-300"}
//                       `}>
//                          {isIncluded && <CheckCircle2 size={10} className="text-white" />}
//                       </div>
                      
//                       {/* Hidden actual checkbox to handle logic */}
//                       <input
//                         type="checkbox"
//                         className="hidden"
//                         checked={isIncluded}
//                         onChange={() => toggleModule(module)}
//                         disabled={!isCustom}
//                       />
//                       <span className="text-xs font-semibold">
//                         {module}
//                       </span>
//                     </label>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           <div className="pt-6 border-t border-slate-100 flex gap-4">
//             <button 
//               type="button" 
//               onClick={() => setIsModalOpen(false)} 
//               className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors"
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               disabled={isSubmitting}
//               className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
//             > 
//               {isSubmitting ? <><Loader2 className="animate-spin" size={20}/> Deploying...</> : "Deploy Workspace"} 
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default SaaSAdminDashboard;