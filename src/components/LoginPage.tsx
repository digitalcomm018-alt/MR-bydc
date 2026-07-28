import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';
import { Footer } from './Footer';
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  Users,
  ClipboardList,
  TrendingUp,
  ShieldCheck,
  Building2,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  X,
  Sparkles,
  Briefcase,
  KeyRound,
  LogIn
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { usersList, loginAsUser } = useApp();

  // Pre-fill with admin credentials per user request: ID- admin, Password- 123456
  const [employeeIdInput, setEmployeeIdInput] = useState<string>('admin');
  const [passwordInput, setPasswordInput] = useState<string>('123456');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [matchedUser, setMatchedUser] = useState<UserProfile | null>(null);

  // Modals
  const [showRosterModal, setShowRosterModal] = useState<boolean>(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState<boolean>(false);
  const [showSupportModal, setShowSupportModal] = useState<boolean>(false);

  // Roster Filters
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Automatically lookup user by Employee ID or Email
  useEffect(() => {
    if (!employeeIdInput) {
      setMatchedUser(null);
      return;
    }
    const cleanInput = employeeIdInput.trim().toLowerCase();
    const match = usersList.find(
      (u) =>
        u.employeeId.toLowerCase() === cleanInput ||
        u.email.toLowerCase() === cleanInput ||
        (cleanInput === 'admin' && u.role === 'Admin')
    );
    setMatchedUser(match || null);
    if (match) {
      setErrorMsg('');
    }
  }, [employeeIdInput, usersList]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = employeeIdInput.trim().toLowerCase();

    if (!cleanInput) {
      setErrorMsg('Please enter your Email or MR / Employee ID');
      return;
    }

    // Special admin shortcut matching: ID "admin" and password "123456"
    if (cleanInput === 'admin' && (passwordInput === '123456' || passwordInput === '1234')) {
      const adminAccount = usersList.find((u) => u.role === 'Admin') || usersList[0];
      loginAsUser(adminAccount.id);
      return;
    }

    const found = usersList.find(
      (u) =>
        u.employeeId.toLowerCase() === cleanInput ||
        u.email.toLowerCase() === cleanInput
    );

    if (!found) {
      setErrorMsg(`No account found for ID: "${employeeIdInput}". Demo Admin: ID "admin", Password "123456".`);
      return;
    }

    // Verify Password (accepts user passwordPin or default 1234 / 123456)
    if (
      passwordInput &&
      (passwordInput === found.passwordPin ||
        passwordInput === '123456' ||
        passwordInput === '1234')
    ) {
      loginAsUser(found.id);
    } else {
      setErrorMsg('Invalid Password. Hint: Default password is "123456" or "1234".');
    }
  };

  const handleRosterSelect = (u: UserProfile) => {
    setEmployeeIdInput(u.employeeId);
    setPasswordInput(u.passwordPin || '123456');
    setMatchedUser(u);
    setErrorMsg('');
    setShowRosterModal(false);
  };

  const filteredRoster = usersList.filter((u) => {
    const matchesRole = activeRoleFilter === 'ALL' || u.role === activeRoleFilter;
    const matchesQuery =
      searchQuery === '' ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.hqLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesQuery;
  });

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-sky-50 to-blue-200 text-slate-800 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">
      {/* Background Soft Lighting Circles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Brand Hero & Value Props (Image 1 Color Curved Background) */}
          <div className="lg:col-span-6 relative rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden border-2 border-amber-300/60 bg-[#c2185b] text-white">
            {/* Image 1 Curved Graphic Background SVG */}
            <svg
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 500 650"
            >
              {/* Base Magenta/Purple Background */}
              <rect width="500" height="650" fill="#ad1457" />

              {/* Bottom Left Vector Wave Lines */}
              <g stroke="#e91e63" strokeWidth="1.2" fill="none" opacity="0.4">
                <path d="M-50,650 C80,550 200,620 320,550 C400,500 450,530 500,510" />
                <path d="M-50,620 C80,520 200,590 320,520 C400,470 450,500 500,480" />
                <path d="M-50,590 C80,490 200,560 320,490 C400,440 450,470 500,450" />
                <path d="M-50,560 C80,460 200,530 320,460 C400,410 450,440 500,420" />
                <path d="M-50,530 C80,430 200,500 320,430 C400,380 450,410 500,390" />
              </g>

              {/* Bold Red Curved Stripe */}
              <path
                d="M 0,0 C 120,180 250,400 500,580 L 500,650 L 0,650 Z"
                fill="#d32f2f"
              />

              {/* White Crisp Arc Divider Line */}
              <path
                d="M 120,0 C 230,190 350,380 505,530"
                fill="none"
                stroke="#ffffff"
                strokeWidth="9"
              />

              {/* Top Right Orange Section */}
              <path
                d="M 128,0 C 238,190 358,380 515,530 L 500,0 Z"
                fill="#ff9800"
              />
            </svg>

            {/* Content Container */}
            <div className="relative z-10 space-y-6 sm:space-y-8">
              {/* Top Brand Logo */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center shadow-lg border border-white/40 ring-4 ring-white/20">
                    <Shield className="w-7 h-7 fill-white/30 stroke-[2.2]" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans drop-shadow-md">
                      MR Connect
                    </h1>
                    <p className="text-xs sm:text-sm font-extrabold text-amber-100 tracking-wide drop-shadow-xs">
                      Smarter Visits. Stronger Relationships. Better Outcomes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-lg">
                  Empowering Medical Representatives
                </h2>
                <p className="text-lg sm:text-xl font-black text-amber-200 drop-shadow-md">
                  Driving Healthcare Impact Every Day
                </p>
              </div>

              {/* 4 Feature Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-lg text-center space-y-1.5 hover:scale-[1.02] transition-transform">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-900 mx-auto flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-800" />
                  </div>
                  <div className="text-xs font-black text-slate-950 leading-tight">Plan Visits</div>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-lg text-center space-y-1.5 hover:scale-[1.02] transition-transform">
                  <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-900 mx-auto flex items-center justify-center">
                    <ClipboardList className="w-5 h-5 text-red-800" />
                  </div>
                  <div className="text-xs font-black text-slate-950 leading-tight">Track Activities</div>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-lg text-center space-y-1.5 hover:scale-[1.02] transition-transform">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-900 mx-auto flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-pink-800" />
                  </div>
                  <div className="text-xs font-black text-slate-950 leading-tight">Boost Performance</div>
                </div>

                <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 shadow-lg text-center space-y-1.5 hover:scale-[1.02] transition-transform">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-900 mx-auto flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-800" />
                  </div>
                  <div className="text-xs font-black text-slate-950 leading-tight">Better Outcomes</div>
                </div>
              </div>

              {/* Realistic Medical Bag & Field Work Visual Banner */}
              <div className="relative rounded-2xl bg-slate-950/80 backdrop-blur-md text-white p-5 shadow-2xl border border-amber-300/40 hidden sm:flex items-center justify-between overflow-hidden">
                <div className="space-y-2 z-10 max-w-sm">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/30 text-amber-200 border border-amber-400/50 inline-flex items-center gap-1.5 shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    Smart Field Ops
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-black text-white leading-snug">
                      Building Relationships, Delivering Better Health
                    </p>
                    <p className="text-xs text-amber-200/90 font-medium">
                      Stronger Connections, Healthier Tomorrow
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-200 shadow-inner">
                    <Briefcase className="w-7 h-7 text-amber-300" />
                  </div>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/20 rounded-full blur-xl" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Floating White Login Card */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10 relative">
              
              {/* Header Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100/80 border border-blue-200 flex items-center justify-center text-blue-800 shadow-inner">
                  <Shield className="w-8 h-8 text-blue-800 fill-blue-800/20 stroke-[2.2]" />
                </div>
              </div>

              {/* Title */}
              <div className="text-center space-y-1 mb-6">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  MR Software Login
                </h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Plan. Visit. Impact.
                </p>
              </div>

              {/* Active Admin / User Quick Notice Badge */}
              <div className="mb-5 p-3 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900 space-y-1">
                <div className="flex items-center justify-between font-extrabold text-[11px] text-blue-950">
                  <span className="flex items-center gap-1.5">
                    <KeyRound className="w-3.5 h-3.5 text-blue-700" />
                    Demo Admin Credentials:
                  </span>
                  <span className="bg-blue-600 text-white px-2 py-0.5 rounded-md font-mono text-[10px]">
                    READY
                  </span>
                </div>
                <p className="text-[11px] font-mono font-semibold text-blue-800">
                  ID: <span className="text-blue-950 font-bold">admin</span> | Password: <span className="text-blue-950 font-bold">123456</span>
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                
                {/* Field 1: Email / MR ID */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Email / MR ID
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      value={employeeIdInput}
                      onChange={(e) => {
                        setEmployeeIdInput(e.target.value);
                        setErrorMsg('');
                      }}
                      placeholder="Enter your email or MR ID"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Field 2: Password */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Options Row: Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-semibold selection:bg-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <span>Remember Me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(true)}
                    className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Primary Login Button with Image 1 Light Green background */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#b2f2bb] hover:bg-[#a0ebac] text-slate-950 font-black text-sm shadow-md shadow-emerald-600/20 border border-emerald-400/60 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  <LogIn className="w-4 h-4 stroke-[2.5] text-slate-950" />
                  <span>Login</span>
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  OR
                </span>
              </div>

              {/* Secondary Button: Login with Company / Account Directory */}
              <button
                type="button"
                onClick={() => setShowRosterModal(true)}
                className="w-full py-3 rounded-xl border-2 border-blue-600/80 hover:bg-blue-50 text-blue-700 font-extrabold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Login with Company / Demo Roles</span>
              </button>

              {/* Support Link */}
              <div className="mt-5 text-center">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(true)}
                  className="text-xs text-slate-500 hover:text-blue-600 font-medium cursor-pointer inline-flex items-center gap-1"
                >
                  Need Help? <span className="text-blue-600 font-bold hover:underline">Contact Support</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM EMERALD GREEN FOOTER (IMAGE 1 BACKGROUND) */}
      <Footer />

      {/* ROSTER SELECTION MODAL (COMPANY ACCOUNTS) */}
      {showRosterModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Select Company Account
                </h3>
                <p className="text-xs text-slate-500">1-Click select any configured field force role or Admin</p>
              </div>
              <button
                onClick={() => setShowRosterModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search & Filters */}
            <div className="space-y-2">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search user, ID, territory..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: 'ALL', label: 'All Roles' },
                  { id: 'Admin', label: 'Admin' },
                  { id: 'ASM', label: 'ASM' },
                  { id: 'MR', label: 'Medical Reps' },
                  { id: 'Marketing', label: 'Marketing' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveRoleFilter(tab.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      activeRoleFilter === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Roster List */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-[220px]">
              {filteredRoster.map((u) => (
                <div
                  key={u.id}
                  onClick={() => handleRosterSelect(u)}
                  className="p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                      {u.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-black text-xs text-slate-900 flex items-center gap-2">
                        <span>{u.name}</span>
                        <span className="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded font-bold">
                          {u.employeeId}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500">{u.designation} • {u.hqLocation}</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-700 border border-slate-200">
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Password Recovery
              </h3>
              <button
                onClick={() => setShowForgotPasswordModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                To reset your password or recover your Employee MR ID, please contact your Regional System Administrator or IT helpdesk.
              </p>
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 space-y-1">
                <p className="font-bold text-blue-950">Default Demo Credentials:</p>
                <p>Admin ID: <strong className="font-mono text-blue-700">admin</strong></p>
                <p>Admin Password: <strong className="font-mono text-blue-700">123456</strong></p>
              </div>
            </div>

            <button
              onClick={() => {
                setEmployeeIdInput('admin');
                setPasswordInput('123456');
                setShowForgotPasswordModal(false);
              }}
              className="w-full py-2.5 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              Auto-Fill Admin Credentials (admin / 123456)
            </button>
          </div>
        </div>
      )}

      {/* SUPPORT MODAL */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900">MR Connect Support</h3>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <p className="font-bold text-slate-900">developed by digital communique Private Limited</p>
              <p className="text-slate-500">Smart Solutions for a Healthier Tomorrow</p>
              <div className="pt-2 border-t border-slate-100 space-y-1 font-mono text-[11px]">
                <p>Email: support@digitalcommunique.in</p>
                <p>Helpline: +91 1800 123 4567</p>
              </div>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 bg-slate-900 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
