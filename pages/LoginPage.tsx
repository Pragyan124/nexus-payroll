
import React, { useState } from 'react';
import { UserRole } from '../types';
import {
  Shield,
  Mail,
  Lock,
  ChevronRight,
  ArrowLeft,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { loginUser } from '../services/auth';

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
}

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userData = await loginUser(email, password);
      
      console.log("Backend Response:", userData); // <--- Add this to debug!

     
      const backendRole = userData.roles && userData.roles.length > 0 
                          ? userData.roles[0] 
                          : 'EMPLOYEE';

      onLoginSuccess({
        name: userData.name,
        email: userData.email,
        role: backendRole,
        companyId: userData.companyId
      });
      // ----------------

    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute top-0 left-0 w-full h-[45vh] bg-slate-900 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[120px] -z-10"></div>

      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm z-20"
      >
        <ArrowLeft size={18} />
        Back to Landing
      </button>

      <div className="max-w-md w-full animate-fade-up z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-900 font-black text-3xl shadow-2xl border border-slate-100">N</div>
            <h1 className="text-3xl font-bold text-slate-300 tracking-tight ">NexusPay <span className="text-slate-400 font-medium">Gateway</span></h1>
          </div>
          <p className="text-slate-400 font-medium">Enterprise workforce management portal.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 relative">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em] ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Password</label>
                <button type="button" className="text-[10px] font-bold text-indigo-600 hover:underline uppercase tracking-wider">Forgot?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <p className="text-xs font-bold text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group disabled:bg-slate-300"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Sign In to NexusPay
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>


        </div>

        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-100">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Status: All Operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
