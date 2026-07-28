import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import { UserRole, UserProfile } from '../types';
import { AdminLiveUserMonitor } from './AdminLiveUserMonitor';
import {
  Settings,
  Plus,
  Trash2,
  Stethoscope,
  Award,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
  Tag,
  ShieldCheck,
  UserPlus,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  LogIn,
  Search,
  Check,
  Radio,
  Wifi
} from 'lucide-react';

export const MasterSettingsView: React.FC = () => {
  const {
    specialities,
    addSpeciality,
    deleteSpeciality,
    doctorClasses,
    addDoctorClass,
    deleteDoctorClass,
    chemists,
    addChemist,
    deleteChemist,
    stockists,
    addStockist,
    deleteStockist,
    selectedBeat,
    usersList,
    addUser,
    deleteUser,
    loginAsUser,
    currentUser
  } = useApp();

  const [masterTab, setMasterTab] = useState<'users' | 'live_monitor' | 'speciality' | 'classes' | 'chemists' | 'stockists'>('live_monitor');

  // User / Team Member Form
  const [userName, setUserName] = useState('');
  const [userEmpId, setUserEmpId] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('MR');
  const [userDesignation, setUserDesignation] = useState('Medical Representative');
  const [userHq, setUserHq] = useState('Metro City Central HQ');
  const [userTerritory, setUserTerritory] = useState('Central Beat & Metro Enclave');
  const [userManager, setUserManager] = useState('Rajesh Roy (ASM)');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBeats, setUserBeats] = useState('Central Beat, Metro Enclave');
  const [userFilterRole, setUserFilterRole] = useState<string>('ALL');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Speciality Form
  const [specName, setSpecName] = useState('');
  const [specCode, setSpecCode] = useState('');
  const [specCategory, setSpecCategory] = useState('Speciality');

  // Doctor Class Form
  const [classCode, setClassCode] = useState('');
  const [className, setClassName] = useState('');
  const [classVisits, setClassVisits] = useState<number>(3);
  const [classDesc, setClassDesc] = useState('');

  // Chemist Form
  const [chemName, setChemName] = useState('');
  const [chemContact, setChemContact] = useState('');
  const [chemPhone, setChemPhone] = useState('');
  const [chemAddress, setChemAddress] = useState('');
  const [chemStockist, setChemStockist] = useState('Apex Pharma Distributors');

  // Stockist Form
  const [stName, setStName] = useState('');
  const [stContact, setStContact] = useState('');
  const [stPhone, setStPhone] = useState('');
  const [stLimit, setStLimit] = useState<number>(500000);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddSpeciality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specName) return;
    addSpeciality({
      name: specName,
      code: specCode || specName.substring(0, 4).toUpperCase(),
      category: specCategory,
      color: 'bg-teal-100 text-teal-800 border-teal-200'
    });
    setSpecName('');
    setSpecCode('');
    showToast(`Added new speciality: ${specName}`);
  };

  const handleAddDoctorClass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classCode || !className) return;
    addDoctorClass({
      code: classCode,
      name: className,
      targetVisitsPerMonth: classVisits,
      description: classDesc || `${classVisits} visits required per month`,
      color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
    });
    setClassCode('');
    setClassName('');
    setClassDesc('');
    showToast(`Added doctor class tier: ${classCode}`);
  };

  const handleAddChemist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chemName) return;
    addChemist({
      name: chemName,
      contactPerson: chemContact || 'Store Manager',
      phone: chemPhone || '+91 98000 00000',
      address: chemAddress || 'Market Beat Complex',
      townBeat: selectedBeat,
      mappedStockist: chemStockist,
      pobMonthlyAverage: 15000,
      lastVisitDate: new Date().toISOString().split('T')[0]
    });
    setChemName('');
    setChemContact('');
    setChemPhone('');
    setChemAddress('');
    showToast(`Added Chemist: ${chemName}`);
  };

  const handleAddStockist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!stName) return;
    addStockist({
      name: stName,
      contactPerson: stContact || 'Proprietor',
      phone: stPhone || '+91 98000 00000',
      townBeat: selectedBeat,
      creditLimit: stLimit,
      outstandingAmount: 0
    });
    setStName('');
    setStContact('');
    setStPhone('');
    showToast(`Added Stockist: ${stName}`);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmpId) return;

    const assignedBeatsArr = userBeats
      ? userBeats.split(',').map((b) => b.trim()).filter(Boolean)
      : [selectedBeat];

    addUser({
      name: userName,
      employeeId: userEmpId,
      role: userRole,
      designation: userDesignation || (userRole === 'MR' ? 'Medical Representative' : userRole === 'ASM' ? 'Area Sales Manager' : userRole === 'Marketing' ? 'Marketing Specialist' : 'System Admin'),
      hqLocation: userHq || 'Metro City Central HQ',
      territory: userTerritory || 'Central Beat Zone',
      managerName: userManager || 'Rajesh Roy (ASM)',
      email: userEmail || `${userEmpId.toLowerCase()}@pharmapulse.com`,
      phone: userPhone || '+91 98765 00000',
      assignedBeats: assignedBeatsArr,
      status: 'Active'
    });

    setUserName('');
    setUserEmpId('');
    setUserEmail('');
    setUserPhone('');
    showToast(`Successfully provisioned new ${userRole}: ${userName} (${userEmpId})`);
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesRole = userFilterRole === 'ALL' || u.role === userFilterRole;
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.territory.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      u.hqLocation.toLowerCase().includes(userSearchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Flowing Header (Theme 6: Emerald Emerald Pulse) */}
      <FlowingHeader
        themeIndex={6}
        badgeText="Multi-MR Provisions & Master Entity Configuration"
        title="Team Roster & Master Settings"
        subtitle="Provision Medical Representatives (MRs), Area Sales Managers (ASMs), Marketing Team, and Admin accounts with unique IDs."
        icon={Settings}
        actions={
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'live_monitor', label: '🔴 ADMIN Live Accounts & GPS Monitor', icon: Radio },
              { id: 'users', label: 'Team Provisions & MRs', icon: Users },
              { id: 'speciality', label: 'Specialities', icon: Stethoscope },
              { id: 'classes', label: 'Doctor Classes', icon: Award },
              { id: 'chemists', label: 'Chemists', icon: Building2 },
              { id: 'stockists', label: 'Stockists', icon: Building2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = masterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setMasterTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-950 text-emerald-300 shadow-md border border-emerald-500/30 font-extrabold'
                      : 'bg-white/30 text-slate-900 hover:bg-white/50 border border-slate-300/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        }
      />

      {toastMsg && (
        <div className="p-4 bg-emerald-500 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-3 text-xs animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* TAB 0: LIVE ACCOUNTS & GPS MONITOR */}
      {masterTab === 'live_monitor' && <AdminLiveUserMonitor />}

      {/* TAB 1: TEAM PROVISIONS & MULTI-MR ROSTER */}
      {masterTab === 'users' && (
        <div className="space-y-6">
          {/* Summary Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-[10px] font-extrabold uppercase">
                <span>Medical Reps (MR)</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {usersList.filter((u) => u.role === 'MR').length}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Assigned to Field Beats</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-[10px] font-extrabold uppercase">
                <span>Area Managers (ASM)</span>
                <Briefcase className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {usersList.filter((u) => u.role === 'ASM').length}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Area Sales Supervisors</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-[10px] font-extrabold uppercase">
                <span>Marketing Team</span>
                <Sparkles className="w-4 h-4 text-sky-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {usersList.filter((u) => u.role === 'Marketing').length}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Brand & Campaign Ops</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 text-[10px] font-extrabold uppercase">
                <span>System Admins</span>
                <ShieldCheck className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {usersList.filter((u) => u.role === 'Admin' || u.role === 'RSM').length}
              </div>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Full System Masters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Team Roster List */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-700" />
                  <div>
                    <h3 className="font-black text-slate-950 text-sm">Team Members & Medical Representatives</h3>
                    <p className="text-[11px] text-slate-500 font-medium">Manage unique Employee IDs and territory assignments</p>
                  </div>
                </div>

                {/* Filter and Search controls */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      placeholder="Search ID, Name..."
                      className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold w-36 sm:w-44 focus:outline-hidden"
                    />
                  </div>
                  <select
                    value={userFilterRole}
                    onChange={(e) => setUserFilterRole(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-extrabold text-slate-800"
                  >
                    <option value="ALL">All Roles</option>
                    <option value="MR">MR Only</option>
                    <option value="ASM">ASM Only</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Roster Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredUsers.map((u) => {
                  const isCurrent = currentUser.id === u.id;
                  return (
                    <div
                      key={u.id}
                      className={`p-4 rounded-2xl border transition-all relative flex flex-col justify-between ${
                        isCurrent
                          ? 'bg-slate-900 text-white border-slate-800 shadow-md'
                          : 'bg-slate-50/80 hover:bg-white text-slate-900 border-slate-200/80 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-slate-950 shadow-2xs ${
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
                            <div>
                              <div className="font-black text-xs leading-snug flex items-center gap-1.5">
                                <span>{u.name}</span>
                                {isCurrent && (
                                  <span className="px-1.5 py-0.2 text-[8px] font-black uppercase rounded bg-emerald-500 text-slate-950">
                                    Logged In
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-extrabold opacity-80 flex items-center gap-1 mt-0.5">
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase ${
                                  isCurrent
                                    ? 'bg-slate-800 text-emerald-300'
                                    : u.role === 'ASM'
                                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                    : u.role === 'Marketing'
                                    ? 'bg-sky-100 text-sky-900 border border-sky-200'
                                    : u.role === 'Admin' || u.role === 'RSM'
                                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                                }`}>
                                  {u.role}
                                </span>
                                <span className="font-mono text-emerald-600 font-extrabold">{u.employeeId}</span>
                              </div>
                            </div>
                          </div>

                          {/* Switch User Button */}
                          {!isCurrent && (
                            <button
                              onClick={() => {
                                loginAsUser(u.id);
                                showToast(`Switched active profile to ${u.name} (${u.employeeId})`);
                              }}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-black bg-emerald-600 text-white hover:bg-emerald-700 transition-all cursor-pointer shadow-2xs flex items-center gap-1"
                            >
                              <LogIn className="w-3 h-3" />
                              <span>Login</span>
                            </button>
                          )}
                        </div>

                        <p className={`text-[11px] font-semibold mb-2 ${isCurrent ? 'text-slate-300' : 'text-slate-600'}`}>
                          {u.designation}
                        </p>

                        <div className={`space-y-1 text-[10px] font-medium border-t pt-2 ${
                          isCurrent ? 'border-slate-800 text-slate-300' : 'border-slate-200 text-slate-600'
                        }`}>
                          <div className="flex items-center gap-1.5 truncate">
                            <MapPin className="w-3 h-3 text-teal-500 shrink-0" />
                            <span className="truncate">{u.territory} ({u.hqLocation})</span>
                          </div>
                          <div className="flex items-center gap-1.5 truncate">
                            <Briefcase className="w-3 h-3 text-amber-500 shrink-0" />
                            <span className="truncate">Manager: {u.managerName}</span>
                          </div>
                          {u.assignedBeats && u.assignedBeats.length > 0 && (
                            <div className="flex items-center gap-1.5 truncate">
                              <Tag className="w-3 h-3 text-indigo-500 shrink-0" />
                              <span className="truncate">Beats: {u.assignedBeats.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Delete User */}
                      {usersList.length > 1 && !isCurrent && (
                        <div className="mt-3 pt-2 border-t border-slate-200/60 flex justify-end">
                          <button
                            onClick={() => {
                              deleteUser(u.id);
                              showToast(`Removed user ${u.name} (${u.employeeId})`);
                            }}
                            className="text-[10px] font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove User</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form to Provision New MR / Manager */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-emerald-700" />
                  <span>Provision New User / MR</span>
                </h3>
              </div>

              <form onSubmit={handleAddUser} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Vikram Patel"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Employee ID *</label>
                    <input
                      type="text"
                      required
                      value={userEmpId}
                      onChange={(e) => setUserEmpId(e.target.value.toUpperCase())}
                      placeholder="e.g. MR-9046"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Role *</label>
                    <select
                      value={userRole}
                      onChange={(e) => {
                        const r = e.target.value as UserRole;
                        setUserRole(r);
                        if (r === 'MR') setUserDesignation('Medical Representative');
                        else if (r === 'ASM') setUserDesignation('Area Sales Manager');
                        else if (r === 'Marketing') setUserDesignation('Brand & Marketing Manager');
                        else setUserDesignation('Regional Admin Director');
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
                    >
                      <option value="MR">MR (Medical Representative)</option>
                      <option value="ASM">ASM (Area Sales Manager)</option>
                      <option value="Marketing">Marketing Team</option>
                      <option value="Admin">Admin (System Master)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Designation</label>
                  <input
                    type="text"
                    value={userDesignation}
                    onChange={(e) => setUserDesignation(e.target.value)}
                    placeholder="e.g. Senior Medical Representative"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">HQ Location</label>
                    <input
                      type="text"
                      value={userHq}
                      onChange={(e) => setUserHq(e.target.value)}
                      placeholder="e.g. Metro City HQ"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Reporting Manager</label>
                    <input
                      type="text"
                      value={userManager}
                      onChange={(e) => setUserManager(e.target.value)}
                      placeholder="e.g. Rajesh Roy (ASM)"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Territory & Coverage Zone</label>
                  <input
                    type="text"
                    value={userTerritory}
                    onChange={(e) => setUserTerritory(e.target.value)}
                    placeholder="e.g. Central Beat & Metro Zone"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Beats (comma separated)</label>
                  <input
                    type="text"
                    value={userBeats}
                    onChange={(e) => setUserBeats(e.target.value)}
                    placeholder="e.g. Central Beat, Metro Enclave"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="e.g. mr@pharmapulse.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      placeholder="e.g. +91 98000 12345"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 text-white hover:bg-slate-800 font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>Provision Team Member</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: SPECIALITY MASTER */}
      {masterTab === 'speciality' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Active Medical Specialities ({specialities.length})</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialities.map((spec) => (
                <div key={spec.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-black text-slate-900 text-xs flex items-center gap-2">
                      <span>{spec.name}</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] bg-slate-200 text-slate-700 font-bold">{spec.code}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">{spec.category}</div>
                  </div>
                  <button
                    onClick={() => {
                      deleteSpeciality(spec.id);
                      showToast(`Removed speciality ${spec.name}`);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form to add Speciality */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Add Speciality Class</span>
            </h3>

            <form onSubmit={handleAddSpeciality} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Speciality Name *</label>
                <input
                  type="text"
                  required
                  value={specName}
                  onChange={(e) => setSpecName(e.target.value)}
                  placeholder="e.g. Gastroenterology"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Code Shortform</label>
                <input
                  type="text"
                  value={specCode}
                  onChange={(e) => setSpecCode(e.target.value)}
                  placeholder="e.g. GASTRO"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Classification</label>
                <select
                  value={specCategory}
                  onChange={(e) => setSpecCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  <option value="Super Speciality">Super Speciality</option>
                  <option value="Speciality">Speciality</option>
                  <option value="General">General</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Save Speciality Class
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 2: DOCTOR CLASSES */}
      {masterTab === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-teal-600" />
                <span>Configured Doctor Target Classes ({doctorClasses.length})</span>
              </h3>
            </div>

            <div className="space-y-3">
              {doctorClasses.map((cls) => (
                <div key={cls.id} className="p-4 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-100 text-purple-800 font-extrabold text-xs">
                        {cls.code}
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs">{cls.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{cls.description}</p>
                    <div className="text-[10px] text-teal-700 font-bold mt-1">Target Frequency: {cls.targetVisitsPerMonth} Visits / Month</div>
                  </div>
                  <button
                    onClick={() => {
                      deleteDoctorClass(cls.id);
                      showToast(`Removed doctor class ${cls.code}`);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form to add Doctor Class */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Add Doctor Class Tier</span>
            </h3>

            <form onSubmit={handleAddDoctorClass} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Code *</label>
                <input
                  type="text"
                  required
                  value={classCode}
                  onChange={(e) => setClassCode(e.target.value)}
                  placeholder="e.g. VVIP"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Class Description Title *</label>
                <input
                  type="text"
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="e.g. Ultra Key Opinion Leader"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Target Visits Per Month</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={classVisits}
                  onChange={(e) => setClassVisits(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Save Doctor Class Tier
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 3: CHEMISTS */}
      {masterTab === 'chemists' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-600" />
                <span>Chemist Network Directory ({chemists.length})</span>
              </h3>
            </div>

            <div className="space-y-2">
              {chemists.map((chem) => (
                <div key={chem.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-black text-slate-900">{chem.name}</div>
                    <div className="text-[11px] text-slate-500">Contact: {chem.contactPerson} ({chem.phone}) | Beat: {chem.townBeat}</div>
                    <div className="text-[10px] text-teal-700 font-bold">Mapped Stockist: {chem.mappedStockist}</div>
                  </div>
                  <button
                    onClick={() => {
                      deleteChemist(chem.id);
                      showToast(`Removed chemist ${chem.name}`);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form to add Chemist */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Provision New Chemist</span>
            </h3>

            <form onSubmit={handleAddChemist} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Chemist Store Name *</label>
                <input
                  type="text"
                  required
                  value={chemName}
                  onChange={(e) => setChemName(e.target.value)}
                  placeholder="e.g. Apollo Pharmacy Beat 2"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={chemContact}
                  onChange={(e) => setChemContact(e.target.value)}
                  placeholder="e.g. Mr. Ramesh Kumar"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={chemPhone}
                  onChange={(e) => setChemPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mapped Stockist Distributor</label>
                <select
                  value={chemStockist}
                  onChange={(e) => setChemStockist(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                >
                  {stockists.map((st) => (
                    <option key={st.id} value={st.name}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Save Chemist Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: STOCKISTS */}
      {masterTab === 'stockists' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Stockist & Wholesale Distributors ({stockists.length})</span>
              </h3>
            </div>

            <div className="space-y-2">
              {stockists.map((st) => (
                <div key={st.id} className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-black text-slate-900">{st.name}</div>
                    <div className="text-[11px] text-slate-500">Contact: {st.contactPerson} ({st.phone}) | Beat: {st.townBeat}</div>
                    <div className="text-[10px] text-purple-700 font-bold">Credit Limit: ₹{st.creditLimit.toLocaleString()}</div>
                  </div>
                  <button
                    onClick={() => {
                      deleteStockist(st.id);
                      showToast(`Removed stockist ${st.name}`);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Form to add Stockist */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Plus className="w-4 h-4 text-teal-600" />
              <span>Provision Stockist Distributor</span>
            </h3>

            <form onSubmit={handleAddStockist} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Stockist Agency Name *</label>
                <input
                  type="text"
                  required
                  value={stName}
                  onChange={(e) => setStName(e.target.value)}
                  placeholder="e.g. Apex Medical Agencies"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Person / Proprietor</label>
                <input
                  type="text"
                  value={stContact}
                  onChange={(e) => setStContact(e.target.value)}
                  placeholder="e.g. Mr. Anil Shah"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={stPhone}
                  onChange={(e) => setStPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Approved Credit Limit (₹)</label>
                <input
                  type="number"
                  value={stLimit}
                  onChange={(e) => setStLimit(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Save Stockist Record
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
