import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, UserProfile } from '../types';
import {
  LogIn,
  X,
  Lock,
  UserCheck,
  ShieldCheck,
  Building2,
  MapPin,
  Sparkles,
  Users,
  Stethoscope,
  Briefcase,
  KeyRound,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, usersList, loginAsUser } = useApp();

  const [activeRoleTab, setActiveRoleTab] = useState<string>('ALL');
  const [selectedUserForLogin, setSelectedUserForLogin] = useState<UserProfile>(currentUser);
  const [empIdInput, setEmpIdInput] = useState<string>(currentUser.employeeId);
  const [pinInput, setPinInput] = useState<string>('1234');
  const [loginError, setLoginError] = useState<string>('');

  if (!isOpen) return null;

  const filteredUsers = usersList.filter((u) => {
    if (activeRoleTab === 'ALL') return true;
    return u.role === activeRoleTab;
  });

  const handleSelectUser = (u: UserProfile) => {
    setSelectedUserForLogin(u);
    setEmpIdInput(u.employeeId);
    setLoginError('');
  };

  const handlePerformLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!empIdInput) {
      setLoginError('Please enter a valid Employee ID');
      return;
    }

    const matchedUser = usersList.find(
      (u) => u.employeeId.toLowerCase() === empIdInput.trim().toLowerCase()
    );

    if (!matchedUser) {
      setLoginError(`No active account found for Employee ID: ${empIdInput}`);
      return;
    }

    loginAsUser(matchedUser.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg font-black text-xl ring-2 ring-emerald-400/30">
              <Stethoscope className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl text-white tracking-tight">PharmaPulse Enterprise</h2>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-slate-950">
                  Portal Authentication
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Multi-MR Field Force & Manager Single Sign-On Access
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Current Active User Banner */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 font-black text-sm flex items-center justify-center shrink-0 shadow-2xs">
                {currentUser.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="text-[10px] uppercase font-black tracking-wider text-slate-500">Currently Logged In</div>
                <div className="text-sm font-black text-slate-950 flex items-center gap-2">
                  <span>{currentUser.name}</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                    {currentUser.role}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600 font-medium flex items-center gap-2 mt-0.5">
                  <span className="font-mono font-bold text-emerald-800">{currentUser.employeeId}</span>
                  <span>•</span>
                  <span>{currentUser.hqLocation}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Active Session
              </span>
            </div>
          </div>

          {/* Quick Account Switcher Category Tabs */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Select Account / Role Profile</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-500">Click profile to quick switch</span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'ALL', label: 'All Accounts' },
                { id: 'MR', label: 'Medical Reps (MR)' },
                { id: 'ASM', label: 'Area Managers (ASM)' },
                { id: 'Marketing', label: 'Marketing' },
                { id: 'Admin', label: 'Admin / RSM' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveRoleTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    activeRoleTab === tab.id
                      ? 'bg-slate-900 text-emerald-300 shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Selection Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 max-h-52 overflow-y-auto pr-1">
              {filteredUsers.map((u) => {
                const isSelected = selectedUserForLogin.id === u.id;
                const isCurrentLoggedIn = currentUser.id === u.id;

                return (
                  <div
                    key={u.id}
                    onClick={() => handleSelectUser(u)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/30 shadow-xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-slate-950 shrink-0 ${
                        u.role === 'ASM'
                          ? 'bg-amber-400'
                          : u.role === 'Marketing'
                          ? 'bg-sky-400'
                          : u.role === 'Admin' || u.role === 'RSM'
                          ? 'bg-purple-400'
                          : 'bg-emerald-400'
                      }`}>
                        {u.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <div className="font-extrabold text-xs text-slate-950 truncate flex items-center gap-1">
                          <span className="truncate">{u.name}</span>
                          {isCurrentLoggedIn && (
                            <span className="px-1 py-0.1 text-[8px] font-black bg-emerald-600 text-white rounded">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium truncate">
                          <span className="font-mono font-bold text-emerald-800">{u.employeeId}</span> • {u.designation}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                        u.role === 'ASM'
                          ? 'bg-amber-100 text-amber-900 border border-amber-200'
                          : u.role === 'Marketing'
                          ? 'bg-sky-100 text-sky-900 border border-sky-200'
                          : u.role === 'Admin' || u.role === 'RSM'
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      }`}>
                        {u.role}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Credentials Verification */}
          <form onSubmit={handlePerformLogin} className="space-y-4 border-t border-slate-200 pt-4">
            {loginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-2">
                <X className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Employee ID / Username</label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={empIdInput}
                    onChange={(e) => {
                      setEmpIdInput(e.target.value.toUpperCase());
                      setLoginError('');
                    }}
                    placeholder="e.g. MR-9042"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Security PIN / Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-hidden focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  loginAsUser(selectedUserForLogin.id);
                  onClose();
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <span>1-Click Switch ({selectedUserForLogin.name.split(' ')[0]})</span>
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-emerald-400" />
                <span>Sign In to Field Hub</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
