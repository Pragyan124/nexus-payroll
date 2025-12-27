
import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Landmark, ShieldCheck, Edit3 } from 'lucide-react';
import Modal from '../components/Modal';

interface Props {
  employeeId: string;
}

const ProfilePage: React.FC<Props> = ({ employeeId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-900 rounded-3xl mb-12"></div>
        <div className="absolute -bottom-8 left-8 flex items-end gap-6">
          <div className="w-24 h-24 bg-white p-1 rounded-3xl shadow-xl">
             <div className="w-full h-full bg-slate-100 rounded-2xl flex items-center justify-center text-3xl font-bold text-indigo-600 border border-slate-100">
               SC
             </div>
          </div>
          <div className="pb-4">
            <h2 className="text-2xl font-bold text-slate-900">Sarah Connor</h2>
            <p className="text-slate-500 font-medium">Senior Lead Software Engineer</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50"
        >
          <Edit3 size={16} /> Edit Profile
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Personal Information">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
              <input type="text" defaultValue="Sarah J. Connor" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact Phone</label>
              <input type="text" defaultValue="+1 (555) 902-1044" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Location</label>
            <input type="text" defaultValue="Brooklyn, NY" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
          </div>
          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200">Cancel</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100">Update Profile</button>
          </div>
        </form>
      </Modal>

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
