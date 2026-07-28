import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Shield,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  KeyRound,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  LogOut,
  Users,
  Award
} from 'lucide-react';

export const LoggedInUserProfileHeader: React.FC = () => {
  const { currentUser, logout, setActiveTab, usersList } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'Admin' || currentUser.role === 'RSM';

  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-b border-blue-900/60 shadow-lg relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Left: User Identity & Core Badges */}
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Avatar */}
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm text-slate-950 shadow-md shrink-0 ring-2 ring-white/20 ${
                currentUser.role === 'ASM'
                  ? 'bg-amber-400'
                  : currentUser.role === 'Marketing'
                  ? 'bg-sky-400'
                  : isAdmin
                  ? 'bg-purple-400'
                  : 'bg-emerald-400'
              }`}
            >
              {currentUser.name.split(' ').map((n) => n[0]).join('')}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
                  Logged In Profile
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    currentUser.role === 'ASM'
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : currentUser.role === 'Marketing'
                      ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30'
                      : isAdmin
                      ? 'bg-purple-400/20 text-purple-300 border border-purple-400/30'
                      : 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30'
                  }`}
                >
                  {currentUser.role}
                </span>
                <span className="font-mono text-xs font-bold text-blue-200 bg-blue-900/60 px-2 py-0.5 rounded border border-blue-700/50">
                  ID: {currentUser.employeeId}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-0.5">
                <h2 className="font-black text-base text-white tracking-tight truncate">
                  {currentUser.name}
                </h2>
                <span className="text-xs text-blue-200 font-medium hidden md:inline">
                  • {currentUser.designation}
                </span>
              </div>
            </div>
          </div>

          {/* Right Controls: Expand Details + Admin Credentials Button + Logout */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            {isAdmin && (
              <button
                onClick={() => setActiveTab('master_settings')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin User & Credential Control</span>
              </button>
            )}

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3 py-1.5 rounded-xl bg-blue-900/50 hover:bg-blue-800/80 text-blue-100 border border-blue-700/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-blue-300" />
              <span>{isExpanded ? 'Hide Details' : 'View Profile Card'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={logout}
              title="Logout from Account"
              className="p-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* EXPANDED DETAILED PROFILE CARD */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-blue-900/60 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-blue-950/60 p-4 rounded-2xl border border-blue-800/50 animate-fadeIn">
            
            {/* Box 1: Designation & Role Info */}
            <div className="space-y-1.5 bg-blue-900/30 p-3 rounded-xl border border-blue-800/30">
              <div className="flex items-center gap-1.5 text-blue-300 font-extrabold">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>Designation & Role</span>
              </div>
              <p className="font-bold text-white text-sm">{currentUser.designation}</p>
              <p className="text-blue-200 font-medium">Reporting Manager: <strong className="text-white">{currentUser.managerName || 'Corporate HQ'}</strong></p>
              <p className="text-blue-300 font-mono text-[11px]">Security PIN: <strong className="text-emerald-300">{currentUser.passwordPin || '123456'}</strong></p>
            </div>

            {/* Box 2: Territory & HQ Location */}
            <div className="space-y-1.5 bg-blue-900/30 p-3 rounded-xl border border-blue-800/30">
              <div className="flex items-center gap-1.5 text-blue-300 font-extrabold">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Territory & Beat Location</span>
              </div>
              <p className="font-bold text-white">{currentUser.territory || 'Central Beat Zone'}</p>
              <p className="text-blue-200 font-medium">HQ: <strong className="text-white">{currentUser.hqLocation}</strong></p>
              {currentUser.loginPosition && (
                <p className="text-emerald-300 font-mono text-[11px]">
                  GPS: {currentUser.loginPosition.address}
                </p>
              )}
            </div>

            {/* Box 3: Contact & Account Status */}
            <div className="space-y-1.5 bg-blue-900/30 p-3 rounded-xl border border-blue-800/30">
              <div className="flex items-center gap-1.5 text-blue-300 font-extrabold">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>Contact Details & Status</span>
              </div>
              <p className="font-bold text-white flex items-center gap-1">
                <Mail className="w-3 h-3 text-blue-400" /> {currentUser.email}
              </p>
              <p className="text-blue-200 font-medium flex items-center gap-1">
                <Phone className="w-3 h-3 text-emerald-400" /> {currentUser.phone}
              </p>
              <p className="text-emerald-300 font-extrabold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {currentUser.currentWorkStatus || 'Punched In • Active Duty'}
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
