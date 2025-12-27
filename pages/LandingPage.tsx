
import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Globe,
  Users,
  CheckCircle2,
  Play
} from 'lucide-react';
import Modal from '../components/Modal';
import { useState } from 'react';

interface Props {
  onEnterApp: () => void;
}



const LandingPage: React.FC<Props> = ({ onEnterApp }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoUrl = "/Nexus_Payroll_Video_Generation.mp4";
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">

      
            // vIDEO
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nexus Payroll">
             <video controls width="1024">
            <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          </Modal>

      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-200">N</div>
            <span className="text-xl font-bold text-sky-950 text-shadow-lg">NexusPay</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Solutions', 'Pricing'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">
                {item}
              </a>
            ))}
          </div>


          <div className="flex items-center gap-4">
            <button onClick={onEnterApp} className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">Login</button>
            <button
              onClick={onEnterApp}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>
          <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-50 rounded-full blur-[100px] opacity-60"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-10 animate-fade-up">
            <Zap size={14} className="fill-indigo-600" />
            Empowering 500+ Global Enterprises
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto mb-8 leading-[1.1] animate-fade-up" style={{ animationDelay: '0.1s' }}>
            The Modern Standard for <span className="text-indigo-600">Payroll Excellence.</span>
          </h1>

          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Automate your payroll, simplify compliance, and give your team the world's most intuitive workspace experience. Built for scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={onEnterApp}
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl text-lg font-bold hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </button>
            <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl text-lg font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <Play size={18} className="fill-slate-900" />
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="py-20 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Total Payouts', val: '$2.4B+' },
            { label: 'Active Users', val: '450k+' },
            { label: 'Uptime', val: '99.99%' },
            { label: 'Jurisdictions', val: '120+' },
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">{stat.val}</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Designed for speed.</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Powerful enough for enterprises, simple enough for startups. NexusPay removes the friction from people operations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Instant Calculation', icon: Zap, desc: 'Execute complex salary runs for thousands of employees in under 60 seconds.' },
              { title: 'Compliance Engine', icon: ShieldCheck, desc: 'Always up-to-date with global tax laws, PF, ESIC and local labor regulations.' },
              { title: 'Time Tracking', icon: Clock, desc: 'Unified attendance management with geolocation and bio-metric integration.' },
              { title: 'Employee Portal', icon: Users, desc: 'A premium self-service experience for tax filing, payslips, and benefit management.' },
              { title: 'Global Multi-Currency', icon: Globe, desc: 'Manage remote teams across 42+ currencies with automated exchange rate tracking.' },
              { title: 'Enterprise Security', icon: CheckCircle2, desc: 'SOC2 Type II compliant with role-based access control and immutable audit trails.' },
            ].map((f, i) => (
              <div key={i} className="p-10 rounded-[2rem] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-50 transition-all bg-white group">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 py-24 text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-xl">N</div>
              <span className="text-xl font-bold tracking-tight">NexusPay</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">The high-performance workspace for modern human resources and payroll departments globally.</p>
          </div>

          <div className="md:col-span-2 col-span-2">
            <h5 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-white/30">Platform</h5>
            <ul className="space-y-4 text-slate-400 text-sm font-semibold">
              <li className="hover:text-white transition-colors cursor-pointer">Engine</li>
              <li className="hover:text-white transition-colors cursor-pointer">Compliance</li>
              <li className="hover:text-white transition-colors cursor-pointer">Attendance</li>
            </ul>
          </div>

          <div className="md:col-span-2 col-span-2">
            <h5 className="font-bold mb-8 uppercase text-xs tracking-[0.2em] text-white/30">Company</h5>
            <ul className="space-y-4 text-slate-400 text-sm font-semibold">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
              <h5 className="font-bold mb-4">Stay ahead of the curve.</h5>
              <p className="text-slate-400 text-sm mb-6">Join 5,000+ HR leaders receiving our monthly newsletter.</p>
              <div className="flex gap-2">
                <input type="text" placeholder="Work email" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <button className="bg-white text-slate-900 px-4 py-2 rounded-xl text-sm font-bold">Join</button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 NEXUSPAY TECHNOLOGIES INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Security</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

