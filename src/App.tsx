import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { LoginPage } from './components/LoginPage';
import { DashboardView } from './components/DashboardView';
import { DCRView } from './components/DCRView';
import { DoctorCRMView } from './components/DoctorCRMView';
import { TourPlannerView } from './components/TourPlannerView';
import { EDetailingView } from './components/EDetailingView';
import { SampleInventoryView } from './components/SampleInventoryView';
import { ExpenseClaimView } from './components/ExpenseClaimView';
import { AnalyticsView } from './components/AnalyticsView';
import { GPSAttendanceView } from './components/GPSAttendanceView';
import { ManagerApprovalsView } from './components/ManagerApprovalsView';
import { ReportsAndDataView } from './components/ReportsAndDataView';
import { MasterSettingsView } from './components/MasterSettingsView';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-w-0">
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'attendance' && <GPSAttendanceView />}
      {activeTab === 'dcr' && <DCRView />}
      {activeTab === 'crm' && <DoctorCRMView />}
      {activeTab === 'approvals' && <ManagerApprovalsView />}
      {activeTab === 'reports' && <ReportsAndDataView />}
      {activeTab === 'master_settings' && <MasterSettingsView />}
      {activeTab === 'tourplan' && <TourPlannerView />}
      {activeTab === 'edetailing' && <EDetailingView />}
      {activeTab === 'inventory' && <SampleInventoryView />}
      {activeTab === 'expenses' && <ExpenseClaimView />}
      {activeTab === 'analytics' && <AnalyticsView />}
    </main>
  );
};

const AppShell: React.FC = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <MainContent />
      </div>
      <MobileNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
