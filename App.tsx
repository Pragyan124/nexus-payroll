import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SaaSAdminDashboard from './pages/SaaSAdminDashboard';
import CompanyAdminDashboard from './pages/CompanyAdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import CompanyManagement from './pages/CompanyManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import PayrollEngine from './pages/PayrollEngine';
import ComplianceManagement from './pages/ComplianceManagement';
import AllowancesManagement from './pages/AllowancesManagement';
import LoanManagement from './pages/LoanManagement';
import ReportsManagement from './pages/ReportsManagement';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import { Loader2 } from 'lucide-react'; // Import a loader icon

interface AuthUser {
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'login' | 'app'>('landing');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true); // <--- NEW: Loading State

  // --- 1. RESTORE SESSION ON REFRESH ---
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setView('app'); // Skip landing page
      } catch (error) {
        // If data is corrupted, clear it
        console.error("Session restore failed:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false); // Finished checking
  }, []);
  // -------------------------------------

  const handleGoToLogin = () => setView('login');
  
  const handleLoginSuccess = (userData: AuthUser) => {
    // Note: local storage is set inside LoginPage.tsx
    setUser(userData);
    setView('app');
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    // --- 2. CLEAR SESSION ON LOGOUT ---
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // ----------------------------------
    setUser(null);
    setView('landing');
  };

  const renderContent = () => {
    if (!user) return null;

    const companyId = user.companyId || 'c1';

    switch (activeTab) {
      case 'dashboard':
        if (user.role === UserRole.ADMIN) return <SaaSAdminDashboard />;
        if (user.role === UserRole.COMPANY_ADMIN) return <CompanyAdminDashboard companyId={companyId} />;
        return <EmployeeDashboard employeeId="e1" />;
      case 'companies':
        return <CompanyManagement />;
      case 'employees':
        return <EmployeeManagement companyId={companyId} />;
      case 'attendance':
        return <AttendanceManagement companyId={companyId} employeeId="e1" role={user.role} />;
      case 'payroll':
        return <PayrollEngine companyId={companyId} />;
      case 'allowances':
        return <AllowancesManagement companyId={companyId} />;
      case 'loans':
        return <LoanManagement companyId={companyId} employeeId="e1" role={user.role} />;
      case 'compliance':
        return <ComplianceManagement companyId={companyId} />;
      case 'reports':
        return <ReportsManagement companyId={companyId} />;
      case 'profile':
        return <ProfilePage employeeId="e1" />;
      case 'settings':
        return <SettingsPage role={user.role} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 bg-white rounded-[2rem] shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
            <p className="text-slate-500 max-w-xs">The module "{activeTab}" is not accessible in this view.</p>
          </div>
        );
    }
  };

  // --- 3. SHOW LOADER WHILE CHECKING STORAGE ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
      </div>
    );
  }

  if (view === 'landing') {
    return <LandingPage onEnterApp={handleGoToLogin} />;
  }

  if (view === 'login') {
    return <LoginPage onLoginSuccess={handleLoginSuccess} onBack={() => setView('landing')} />;
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar 
        role={user.role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          userName={user.name}
          userRole={user.role} // Now this will be populated from storage!
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto pb-20">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;