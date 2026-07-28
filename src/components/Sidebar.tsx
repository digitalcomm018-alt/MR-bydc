import React from 'react';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  ClipboardCheck,
  Users,
  Map,
  Presentation,
  Package,
  Receipt,
  TrendingUp,
  ChevronRight,
  MapPin,
  ShieldCheck,
  FileSpreadsheet,
  Settings
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, dcrLogs, tourPlans, expenses, currentUser } = useApp();

  const pendingApprovalsCount =
    tourPlans.filter((t) => t.status === 'Pending').length +
    expenses.filter((e) => e.status === 'Submitted').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'GPS Attendance', icon: MapPin },
    {
      id: 'dcr',
      label: 'Submit DCR',
      icon: ClipboardCheck,
      badge: dcrLogs.filter((d) => d.date === '2026-07-27').length
    },
    { id: 'crm', label: 'Doctors & Chemists', icon: Users },
    {
      id: 'approvals',
      label: 'Manager Approvals',
      icon: ShieldCheck,
      badge: pendingApprovalsCount
    },
    { id: 'reports', label: 'Reports & Excel', icon: FileSpreadsheet },
    { id: 'master_settings', label: 'Master Settings', icon: Settings },
    { id: 'tourplan', label: 'Tour Planner (TP)', icon: Map },
    { id: 'edetailing', label: 'E-Detailing Vault', icon: Presentation },
    { id: 'inventory', label: 'Sample Inventory', icon: Package },
    { id: 'expenses', label: 'TA / DA Claims', icon: Receipt },
    { id: 'analytics', label: 'Territory Analytics', icon: TrendingUp }
  ];


  return (
    <aside className="w-64 bg-white/95 backdrop-blur-sm border-r border-slate-200/80 shrink-0 hidden md:block min-h-[calc(100vh-4rem)]">
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="px-3 py-2 mb-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Field Operations Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer relative group ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                      : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-700'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isActive
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Territory Status Quick Box - Image 8 Warm Golden Sand Palette */}
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 text-amber-950 border border-amber-300 shadow-sm">
          <div className="flex items-center justify-between text-xs font-black mb-1">
            <span className="text-amber-950">Target Coverage</span>
            <span className="text-emerald-800 font-black">88%</span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-1.5 overflow-hidden my-2 border border-amber-300">
            <div className="bg-amber-800 h-1.5 rounded-full w-[88%]" />
          </div>
          <p className="text-[11px] text-amber-900 leading-relaxed font-bold">
            11/12 Calls completed today. 1 Doctor call remaining in Central Beat.
          </p>
        </div>
      </div>
    </aside>
  );
};
