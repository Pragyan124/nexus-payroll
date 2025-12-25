
import React from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Landmark, ShieldCheck, Edit3 } from 'lucide-react';

interface Props {
  employeeId: string;
}

const ProfilePage: React.FC<Props> = ({ employeeId }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="h-36 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-3xl mb-12"></div>
        <div className="absolute bottom-2 left-8 flex items-end gap-6">
          <div className="w-24 h-24 bg-white p-1 rounded-3xl shadow-xl">
             <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-600 border border-slate-100">
               SC
             </div>
          </div>
          <div className="pb-4">
            <h2 className="text-2xl font-bold text-slate-900">Sarah Connor</h2>
            <p className="text-slate-400 font-medium">Senior Lead Software Engineer</p>
          </div>
        </div>
        <button className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50">
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <User size={20} className="text-indigo-600" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Full Name', value: 'Sarah J. Connor', icon: User },
                { label: 'Email Address', value: 'sarah@techflow.io', icon: Mail },
                { label: 'Phone Number', value: '+1 (555) 902-1044', icon: Phone },
                { label: 'Location', value: 'Brooklyn, NY', icon: MapPin },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Landmark size={20} className="text-indigo-600" /> Bank & Statutory Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: 'Bank Name', value: 'HDFC Bank Ltd.' },
                { label: 'Account Number', value: '**** 5678 9021' },
                { label: 'IFSC Code', value: 'HDFC0001234' },
                { label: 'Tax ID (PAN)', value: 'ABCDE1234F' },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-xs font-bold text-slate-400 uppercase mb-1">{item.label}</p>
                  <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-600" /> Employment
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Employee ID</span>
                <span className="text-sm font-bold">EMP-1042</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-50">
                <span className="text-sm text-slate-500">Joining Date</span>
                <span className="text-sm font-bold">Oct 12, 2022</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-slate-500">Reports To</span>
                <span className="text-sm font-bold text-indigo-600 underline">Kyle Reese</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl">
             <h3 className="font-bold mb-4 flex items-center gap-2">
               <ShieldCheck size={18} className="text-emerald-400" /> Compliance Status
             </h3>
             <div className="space-y-3">
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                 <span className="text-xs font-medium">KYC Docs Verified</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                 <span className="text-xs font-medium">Digital Signature Active</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                 <span className="text-xs font-medium text-white/70">Update PAN requested</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
