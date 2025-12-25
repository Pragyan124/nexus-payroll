
import React, { useState } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
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

const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.COMPANY_ADMIN);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCompanyId, setSelectedCompanyId] = useState('c1');
  const [view, setView] = useState<'landing' | 'app'>('landing');

  const handleLogin = () => setView('app');
  const handleLogout = () => setView('landing');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (currentRole === UserRole.ADMIN) return <SaaSAdminDashboard />;
        if (currentRole === UserRole.COMPANY_ADMIN) return <CompanyAdminDashboard companyId={selectedCompanyId} />;
        return <EmployeeDashboard employeeId="e1" />;
      case 'companies':
        return <CompanyManagement />;
      case 'employees':
        return <EmployeeManagement companyId={selectedCompanyId} />;
      case 'attendance':
        return <AttendanceManagement companyId={selectedCompanyId} employeeId="e1" role={currentRole} />;
      case 'payroll':
        return <PayrollEngine companyId={selectedCompanyId} />;
      case 'allowances':
        return <AllowancesManagement companyId={selectedCompanyId} />;
      case 'loans':
        return <LoanManagement companyId={selectedCompanyId} employeeId="e1" role={currentRole} />;
      case 'compliance':
        return <ComplianceManagement companyId={selectedCompanyId} />;
      case 'reports':
        return <ReportsManagement companyId={selectedCompanyId} />;
      case 'profile':
        return <ProfilePage employeeId="e1" />;
      case 'settings':
        return <SettingsPage role={currentRole} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-12 bg-white rounded-[2rem] shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h2>
            <p className="text-slate-500 max-w-xs">The module "{activeTab}" is not accessible in this view.</p>
          </div>
        );
    }
  };

  if (view === 'landing') {
    return <LandingPage onEnterApp={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar 
        role={currentRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          role={currentRole} 
          setRole={setCurrentRole} 
          companyId={selectedCompanyId}
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
