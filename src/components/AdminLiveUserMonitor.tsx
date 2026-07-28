import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import { UserProfile, UserRole } from '../types';
import {
  Users,
  Wifi,
  WifiOff,
  MapPin,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  Clock,
  Navigation,
  LogOut,
  LogIn,
  KeyRound,
  Edit2,
  Activity,
  Globe,
  Radio,
  Sparkles,
  Lock,
  UserCheck
} from 'lucide-react';

export const AdminLiveUserMonitor: React.FC = () => {
  const {
    usersList,
    currentUser,
    toggleUserLiveSessionStatus,
    updateUser,
    updateUserLoginPosition
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ONLINE' | 'OFFLINE'>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<UserProfile | null>(null);

  // Edit Credentials Modal State
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editEmpId, setEditEmpId] = useState<string>('');
  const [editPin, setEditPin] = useState<string>('');
  const [editRole, setEditRole] = useState<UserRole>('MR');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const totalUsers = usersList.length;
  const onlineCount = usersList.filter((u) => u.isLoggedIn !== false).length;
  const offlineCount = totalUsers - onlineCount;
  const activeFieldMRs = usersList.filter(
    (u) => u.role === 'MR' && u.isLoggedIn !== false
  ).length;

  const filteredUsers = usersList.filter((u) => {
    const isOnline = u.isLoggedIn !== false;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'ONLINE' && isOnline) ||
      (statusFilter === 'OFFLINE' && !isOnline);

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;

    const matchesQuery =
      searchQuery === '' ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.hqLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.loginPosition?.address || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesRole && matchesQuery;
  });

  const handleOpenEditModal = (u: UserProfile) => {
    setEditingUser(u);
    setEditEmpId(u.employeeId);
    setEditPin(u.passwordPin || '1234');
    setEditRole(u.role);
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated: UserProfile = {
      ...editingUser,
      employeeId: editEmpId.trim().toUpperCase(),
      passwordPin: editPin.trim(),
      role: editRole
    };

    updateUser(updated);
    setEditingUser(null);
    showToast(`Credentials updated for ${updated.name} (${updated.employeeId})`);
  };

  const handleSimulateGPSPing = (u: UserProfile) => {
    const randomLats = [19.0760, 19.1197, 19.0176, 19.0522, 19.0800];
    const randomLngs = [72.8777, 72.9051, 72.8561, 72.9002, 72.8800];
    const idx = Math.floor(Math.random() * randomLats.length);

    const newPos = {
      lat: randomLats[idx],
      lng: randomLngs[idx],
      address: `Updated Live GPS Beat Pin #${Math.floor(Math.random() * 900 + 100)}, ${u.territory}`,
      beat: u.assignedBeats?.[0] || u.territory,
      device: u.loginPosition?.device || 'PharmaPulse Live MR GPS Sensor',
      ip: `103.22.${Math.floor(Math.random() * 50 + 10)}.${Math.floor(Math.random() * 200 + 1)}`
    };

    updateUserLoginPosition(u.id, newPos);
    showToast(`Pings refreshed for ${u.name} - Location verified!`);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-emerald-300 font-extrabold text-xs px-4 py-3 rounded-xl border border-emerald-500/40 shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <FlowingHeader
        themeIndex={7}
        title="Admin Live Accounts & Logged-In Position Command Center"
        subtitle="Real-time multi-user session tracking, GPS field position monitoring, and credential management"
        icon={Radio}
        badgeText="Live Operations Command"
      />

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <FlowingBox themeIndex={7} className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Accounts</span>
            <Users className="w-4 h-4 text-slate-700" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-950">{totalUsers}</span>
            <span className="text-[10px] font-bold text-slate-600">Configured by Admin</span>
          </div>
        </FlowingBox>

        <FlowingBox themeIndex={7} className="p-4 border-emerald-300 bg-emerald-50/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">Online Now</span>
            <Wifi className="w-4 h-4 text-emerald-600 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-emerald-950">{onlineCount}</span>
            <span className="text-[10px] font-extrabold text-emerald-800">Active Live Sessions</span>
          </div>
        </FlowingBox>

        <FlowingBox themeIndex={7} className="p-4 border-teal-300 bg-teal-50/60">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-teal-900 uppercase tracking-wider">Active Field MRs</span>
            <Navigation className="w-4 h-4 text-teal-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-teal-950">{activeFieldMRs}</span>
            <span className="text-[10px] font-extrabold text-teal-800">Punched In Beat Duty</span>
          </div>
        </FlowingBox>

        <FlowingBox themeIndex={7} className="p-4 border-slate-300 bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Offline Accounts</span>
            <WifiOff className="w-4 h-4 text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-700">{offlineCount}</span>
            <span className="text-[10px] font-bold text-slate-500">Not Logged In</span>
          </div>
        </FlowingBox>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <FlowingBox themeIndex={7} className="p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user name, ID, address, territory..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 font-bold focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Status Pills */}
            <div className="flex items-center bg-slate-200/80 p-1 rounded-xl gap-1">
              {(['ALL', 'ONLINE', 'OFFLINE'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    statusFilter === st
                      ? 'bg-slate-950 text-emerald-400 shadow-2xs'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {st === 'ALL' ? 'All Live' : st === 'ONLINE' ? '🟢 Online' : '🔴 Offline'}
                </button>
              ))}
            </div>

            {/* Role Filter */}
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white text-slate-900 border border-slate-300 font-extrabold text-xs rounded-xl px-3 py-1.5 focus:outline-hidden"
            >
              <option value="ALL">All User Roles</option>
              <option value="MR">MR (Medical Reps)</option>
              <option value="ASM">ASM (Area Managers)</option>
              <option value="Marketing">Marketing Managers</option>
              <option value="Admin">Admin / Directors</option>
            </select>
          </div>
        </div>
      </FlowingBox>

      {/* Main Accounts Grid with Live Logged-In Position */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Live Accounts Monitor List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>User Accounts Live Position Roster ({filteredUsers.length})</span>
            </h3>
            <span className="text-xs text-slate-600 font-semibold">
              Live updates active • Admin control enabled
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredUsers.map((u) => {
              const isOnline = u.isLoggedIn !== false;
              const isSelected = selectedUserForDetail?.id === u.id;

              return (
                <FlowingBox
                  key={u.id}
                  themeIndex={7}
                  className={`p-4 transition-all ${
                    isOnline ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-slate-400 opacity-80'
                  } ${isSelected ? 'ring-2 ring-emerald-600 shadow-md' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    
                    {/* User Identity */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-slate-950 shadow-md shrink-0 relative ${
                        u.role === 'ASM'
                          ? 'bg-amber-400'
                          : u.role === 'Marketing'
                          ? 'bg-sky-400'
                          : u.role === 'Admin' || u.role === 'RSM'
                          ? 'bg-purple-400'
                          : 'bg-emerald-400'
                      }`}>
                        {u.name.split(' ').map((n) => n[0]).join('')}
                        {/* Live Online Badge Dot */}
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                          isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                        }`} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm text-slate-950 truncate">{u.name}</h4>
                          <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            {u.employeeId}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                            u.role === 'ASM'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : u.role === 'Marketing'
                              ? 'bg-sky-100 text-sky-900 border border-sky-300'
                              : u.role === 'Admin' || u.role === 'RSM'
                              ? 'bg-purple-100 text-purple-900 border border-purple-300'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}>
                            {u.role}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 font-semibold mt-0.5 truncate">
                          {u.designation} • <span className="text-slate-800 font-bold">{u.hqLocation}</span>
                        </p>
                      </div>
                    </div>

                    {/* Online Status Tag & Remote Session Switcher */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <div className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                        isOnline
                          ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border border-slate-300'
                      }`}>
                        {isOnline ? (
                          <>
                            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Logged In (Online)</span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="w-3.5 h-3.5 text-slate-500" />
                            <span>Logged Out (Offline)</span>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => toggleUserLiveSessionStatus(u.id, !isOnline)}
                        title={isOnline ? 'Force Logout User Session' : 'Activate Live Login Session'}
                        className={`p-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
                          isOnline
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        {isOnline ? <LogOut className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                      </button>
                    </div>

                  </div>

                  {/* LOGGED IN POSITION & GPS DETAILS PANEL */}
                  <div className="mt-3 pt-3 border-t border-slate-200 grid sm:grid-cols-2 gap-3 text-xs bg-slate-50/80 p-3 rounded-xl">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 font-extrabold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>Logged In Position / GPS Address:</span>
                      </div>
                      <p className="text-slate-700 font-medium pl-5 leading-tight">
                        {u.loginPosition?.address || `${u.territory} (Verified)`}
                      </p>
                      {u.loginPosition && (
                        <div className="pl-5 text-[11px] font-mono font-bold text-teal-800">
                          Lat: {u.loginPosition.lat.toFixed(4)}° N, Lng: {u.loginPosition.lng.toFixed(4)}° E
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 font-extrabold">
                        <Smartphone className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                        <span>Live Session & Device Info:</span>
                      </div>
                      <p className="text-slate-700 font-medium pl-5 leading-tight">
                        {u.currentWorkStatus || (isOnline ? 'Punched In Field Duty' : 'Offline')}
                      </p>
                      <div className="pl-5 text-[11px] text-slate-500 font-semibold flex items-center justify-between">
                        <span>Time: {u.lastLoginTimestamp || 'Today'}</span>
                        <span className="font-mono text-slate-600">IP: {u.loginPosition?.ip || '103.22.14.88'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin Quick Actions */}
                  <div className="mt-2 flex items-center justify-between text-xs pt-1">
                    <button
                      onClick={() => handleSimulateGPSPing(u)}
                      className="text-emerald-800 hover:text-emerald-950 font-black flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ping Live GPS Sensor</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEditModal(u)}
                        className="text-slate-700 hover:text-slate-950 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-slate-600" />
                        <span>Edit Credentials (PIN: {u.passwordPin || '1234'})</span>
                      </button>

                      <button
                        onClick={() => setSelectedUserForDetail(isSelected ? null : u)}
                        className="text-teal-800 hover:text-teal-950 font-extrabold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                        <span>{isSelected ? 'Hide Details' : 'View Full Profile'}</span>
                      </button>
                    </div>
                  </div>

                </FlowingBox>
              );
            })}
          </div>
        </div>

        {/* Right: Live Field Map Visualizer & Detail Panel */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Live Position Radar Card */}
          <FlowingBox themeIndex={7} className="p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-700" />
                <span>Live Territory GPS Radar</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-100 text-emerald-900">
                Geofence Active
              </span>
            </div>

            {/* Mock Map Canvas */}
            <div className="w-full h-56 bg-slate-900 rounded-2xl relative overflow-hidden flex flex-col justify-between p-4 border border-slate-800">
              {/* Radar Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <div className="w-48 h-48 rounded-full border border-emerald-400 animate-ping" />
                <div className="w-32 h-32 rounded-full border border-teal-400 absolute" />
                <div className="w-16 h-16 rounded-full border border-cyan-400 absolute" />
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-300 font-mono font-bold">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE POSITION FEED
                </span>
                <span>METRO ZONE</span>
              </div>

              {/* Pins for online users */}
              <div className="relative z-10 my-auto grid grid-cols-2 gap-2">
                {usersList.slice(0, 4).map((usr) => (
                  <div key={usr.id} className="bg-slate-950/80 p-2 rounded-xl border border-slate-800 text-[10px] text-white">
                    <div className="font-extrabold text-emerald-400 truncate">{usr.name}</div>
                    <div className="text-slate-400 text-[9px] truncate">{usr.loginPosition?.beat || usr.territory}</div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 text-[10px] text-slate-400 font-medium flex items-center justify-between pt-2 border-t border-slate-800">
                <span>GPS Accuracy: ± 5 meters</span>
                <span className="text-emerald-400 font-bold">100% Geofenced</span>
              </div>
            </div>

            <div className="text-xs text-slate-600 leading-relaxed font-semibold bg-slate-100 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-950 block mb-0.5">Admin Security Protocol</span>
              All logged-in positions are continuously cross-referenced with assigned beat plans and Doctor DCR check-ins.
            </div>
          </FlowingBox>

          {/* User Detail Inspection */}
          {selectedUserForDetail ? (
            <FlowingBox themeIndex={7} className="p-5 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <h4 className="font-black text-sm text-slate-950">Account Audit Detail</h4>
                <button
                  onClick={() => setSelectedUserForDetail(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Full Name & ID</span>
                  <p className="font-black text-slate-950">{selectedUserForDetail.name} ({selectedUserForDetail.employeeId})</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Designation</span>
                  <p className="font-bold text-slate-800">{selectedUserForDetail.designation}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">HQ Location & Territory</span>
                  <p className="font-bold text-slate-800">{selectedUserForDetail.hqLocation} • {selectedUserForDetail.territory}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Reporting Manager</span>
                  <p className="font-bold text-slate-800">{selectedUserForDetail.managerName}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Email & Phone</span>
                  <p className="font-bold text-slate-800">{selectedUserForDetail.email} | {selectedUserForDetail.phone}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Login Security PIN</span>
                  <p className="font-mono font-black text-emerald-800 bg-emerald-100 inline-block px-2 py-0.5 rounded border border-emerald-300">
                    {selectedUserForDetail.passwordPin || '1234'}
                  </p>
                </div>
              </div>
            </FlowingBox>
          ) : (
            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 text-center font-medium">
              Click "View Full Profile" on any user card to inspect complete account audit info.
            </div>
          )}

        </div>

      </div>

      {/* EDIT CREDENTIALS MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-slate-300 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-700" />
                <h3 className="font-black text-base text-slate-950">
                  Update Admin Login Credentials
                </h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-slate-400 hover:text-slate-700 font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-4">
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  User Account Name
                </label>
                <input
                  type="text"
                  disabled
                  value={editingUser.name}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Employee ID (Login Credential)
                </label>
                <input
                  type="text"
                  required
                  value={editEmpId}
                  onChange={(e) => setEditEmpId(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-black text-slate-950 focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Security PIN / Password
                </label>
                <input
                  type="text"
                  required
                  value={editPin}
                  onChange={(e) => setEditPin(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-black text-slate-950 focus:outline-hidden focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Assigned User Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as UserRole)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-950 focus:outline-hidden"
                >
                  <option value="MR">MR - Medical Representative</option>
                  <option value="ASM">ASM - Area Sales Manager</option>
                  <option value="Marketing">Marketing Manager</option>
                  <option value="Admin">Admin / Regional Director</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-extrabold text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-black text-xs text-white shadow-md cursor-pointer"
                >
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
