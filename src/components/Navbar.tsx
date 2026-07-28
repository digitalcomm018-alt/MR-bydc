import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LoginModal } from './LoginModal';
import {
  Stethoscope,
  Calendar,
  MapPin,
  Bell,
  Sparkles,
  RefreshCw,
  UserCheck,
  Filter,
  Users,
  Shield,
  Briefcase,
  LogIn,
  LogOut
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    selectedBeat,
    setSelectedBeat,
    resetToDefaults,
    dcrLogs,
    currentUser,
    usersList,
    loginAsUser,
    logout,
    selectedMRFilter,
    setSelectedMRFilter,
    setActiveTab
  } = useApp();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const todayDCRCount = dcrLogs.filter(
    (d) => d.date === new Date().toISOString().split('T')[0] || d.date === '2026-07-27'
  ).length;

  const isManagerOrAdmin = ['ASM', 'RSM', 'Marketing', 'Admin'].includes(currentUser.role);
  const mrUsers = usersList.filter((u) => u.role === 'MR');
  const asmUsers = usersList.filter((u) => u.role === 'ASM');
  const mktUsers = usersList.filter((u) => u.role === 'Marketing');
  const adminUsers = usersList.filter((u) => u.role === 'Admin' || u.role === 'RSM');

  return (
    <header className="bg-slate-200/95 backdrop-blur-md border-b border-slate-300 text-slate-900 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-400 shadow-md font-bold ring-1 ring-slate-800">
            <Stethoscope className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-950">
                PharmaPulse
              </span>
              <span className="px-2 py-0.5 text-[9px] uppercase font-extrabold tracking-wider bg-emerald-800 text-emerald-50 rounded-full shadow-2xs">
                Multi-MR Enterprise
              </span>
            </div>
            <p className="text-[10px] text-slate-600 font-semibold hidden md:block">
              Field Force Effectiveness & Territory Intelligence
            </p>
          </div>
        </div>

        {/* Center: Selected Beat Selector & Date */}
        <div className="hidden lg:flex items-center gap-3 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-300 shadow-2xs">
          <div className="flex items-center gap-1 text-xs text-slate-700 border-r border-slate-300 pr-2.5">
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-bold text-slate-800 text-[11px]">{todayStr}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span className="text-slate-600 font-bold text-[11px]">Beat:</span>
            <select
              value={selectedBeat}
              onChange={(e) => setSelectedBeat(e.target.value)}
              className="bg-transparent text-emerald-950 font-black focus:outline-hidden cursor-pointer text-xs"
            >
              <option value="Central Beat" className="bg-white text-slate-900">
                Central Beat (Metro Enclave)
              </option>
              <option value="Suburb North Beat" className="bg-white text-slate-900">
                Suburb North Beat (Hospital Zone)
              </option>
              <option value="South Industrial Beat" className="bg-white text-slate-900">
                South Industrial Beat (Civic Zone)
              </option>
            </select>
          </div>
        </div>

        {/* Right User Profile, Role Badge, Switcher */}
        <div className="flex items-center gap-2">
          {/* Manager / Admin MR Filter */}
          {isManagerOrAdmin && (
            <div className="hidden md:flex items-center gap-1.5 bg-slate-900 text-slate-100 px-2.5 py-1 rounded-xl text-xs shadow-xs border border-slate-800">
              <Filter className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="text-[10px] font-bold text-slate-300 uppercase">Target MR:</span>
              <select
                value={selectedMRFilter}
                onChange={(e) => setSelectedMRFilter(e.target.value)}
                className="bg-slate-800 text-emerald-300 font-bold focus:outline-hidden cursor-pointer text-xs rounded-lg px-2 py-0.5 border border-slate-700"
              >
                <option value="all">All Medical Representatives</option>
                {mrUsers.map((mr) => (
                  <option key={mr.id} value={mr.employeeId}>
                    {mr.name} [{mr.employeeId}]
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* DCR Bell Badge */}
          <div className="relative">
            <div
              onClick={() => setActiveTab('dcr')}
              title="Daily Call Reports"
              className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-950 hover:bg-slate-50 cursor-pointer transition-all shadow-2xs"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {todayDCRCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
                  {todayDCRCount}
                </span>
              )}
            </div>
          </div>

          {/* Team Roster Quick Access */}
          <button
            onClick={() => setActiveTab('master_settings')}
            title="Manage Multi-MR Provisions & Team Roster"
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-2xs"
          >
            <Users className="w-4 h-4 text-slate-700" />
          </button>

          {/* Reset button */}
          <button
            onClick={resetToDefaults}
            title="Reset to Demo Data"
            className="w-8 h-8 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          {/* Logout / Switch Account Button */}
          <button
            onClick={logout}
            title="Logout & Return to MR Pharma Login Page"
            className="px-2.5 py-1.5 rounded-xl bg-rose-900/90 hover:bg-rose-800 text-rose-100 border border-rose-800 font-extrabold text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* User Profile & Active Role Selector */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-300">
            <div
              onClick={() => setIsLoginModalOpen(true)}
              title="Click to open Login Portal"
              className={`w-8 h-8 rounded-xl flex items-center justify-center text-slate-950 font-black text-xs ring-2 shadow-xs shrink-0 cursor-pointer ${
              currentUser.role === 'ASM'
                ? 'bg-amber-400 ring-amber-400/40'
                : currentUser.role === 'Marketing'
                ? 'bg-sky-400 ring-sky-400/40'
                : currentUser.role === 'Admin' || currentUser.role === 'RSM'
                ? 'bg-purple-400 ring-purple-400/40'
                : 'bg-emerald-400 ring-emerald-400/40'
            }`}>
              {currentUser.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div className="text-left">
              <div className="text-xs font-black text-slate-950 leading-none flex items-center gap-1">
                <span className="truncate max-w-[100px] sm:max-w-[130px]">{currentUser.name}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                  currentUser.role === 'ASM'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : currentUser.role === 'Marketing'
                    ? 'bg-sky-100 text-sky-900 border border-sky-300'
                    : currentUser.role === 'Admin' || currentUser.role === 'RSM'
                    ? 'bg-purple-100 text-purple-900 border border-purple-300'
                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}>
                  {currentUser.role}
                </span>
              </div>

              <div className="text-[10px] text-slate-600 leading-tight mt-0.5 flex items-center gap-1 font-bold">
                <select
                  value={currentUser.id}
                  onChange={(e) => loginAsUser(e.target.value)}
                  className="bg-transparent text-emerald-950 font-extrabold focus:outline-hidden cursor-pointer text-[10px]"
                >
                  <optgroup label="--- Medical Representatives ---">
                    {mrUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        [MR] {u.name} ({u.employeeId})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="--- Area Sales Managers ---">
                    {asmUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        [ASM] {u.name} ({u.employeeId})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="--- Marketing Team ---">
                    {mktUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        [MKT] {u.name} ({u.employeeId})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="--- Admin & Regional Directors ---">
                    {adminUsers.map((u) => (
                      <option key={u.id} value={u.id}>
                        [ADMIN] {u.name} ({u.employeeId})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Login & Profile Switcher Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </header>
  );
};
