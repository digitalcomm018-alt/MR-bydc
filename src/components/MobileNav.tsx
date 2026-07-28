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
  MapPin,
  ShieldCheck,
  FileSpreadsheet,
  Settings
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'attendance', label: 'GPS Punch', icon: MapPin },
    { id: 'dcr', label: 'DCR', icon: ClipboardCheck },
    { id: 'crm', label: 'Doctors', icon: Users },
    { id: 'approvals', label: 'Approvals', icon: ShieldCheck },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet },
    { id: 'master_settings', label: 'Master', icon: Settings },
    { id: 'tourplan', label: 'Tour Plan', icon: Map },
    { id: 'edetailing', label: 'E-Detail', icon: Presentation },
    { id: 'inventory', label: 'Stock', icon: Package },
    { id: 'expenses', label: 'Expenses', icon: Receipt },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];


  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 z-40 px-2 py-1.5 shadow-2xl overflow-x-auto scrollbar-none">
      <div className="flex items-center justify-between min-w-[500px] max-w-full mx-auto px-2 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-2.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'text-emerald-300 bg-emerald-500/15 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
