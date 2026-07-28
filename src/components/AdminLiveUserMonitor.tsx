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
  UserCheck,
  Trash2,
  UserPlus,
  RefreshCw,
  Mail,
  Phone,
  Briefcase,
  Building2,
  X
} from 'lucide-react';

export const AdminLiveUserMonitor: React.FC = () => {
  const {
    usersList,
    currentUser,
    toggleUserLiveSessionStatus,
    updateUser,
    updateUserLoginPosition,
    deleteUser,
    addUser
  } = useApp();

  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ONLINE' | 'OFFLINE'>('ALL');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<UserProfile | null>(null);

  // Edit Credentials Modal State
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editName, setEditName] = useState<string>('');
  const [editEmpId, setEditEmpId] = useState<string>('');
  const [editPin, setEditPin] = useState<string>('');
  const [editRole, setEditRole] = useState<UserRole>('MR');
  const [editDesignation, setEditDesignation] = useState<string>('');
  const [editHq, setEditHq] = useState<string>('');
  const [editTerritory, setEditTerritory] = useState<string>('');
  const [editEmail, setEditEmail] = useState<string>('');
  const [editPhone, setEditPhone] = useState<string>('');
  const [editManager, setEditManager] = useState<string>('');

  // Confirm Delete State
  const [userToDelete, setUserToDelete] = useState<UserProfile | null>(null);

  // Provision New User Modal
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newEmpId, setNewEmpId] = useState<string>('');
  const [newPin, setNewPin] = useState<string>('123456');
  const [newRole, setNewRole] = useState<UserRole>('MR');
  const [newDesignation, setNewDesignation] = useState<string>('Medical Representative');
  const [newHq, setNewHq] = useState<string>('Metro Central HQ');
  const [newTerritory, setNewTerritory] = useState<string>('Central Beat Zone');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');

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
    setEditName(u.name);
    setEditEmpId(u.employeeId);
    setEditPin(u.passwordPin || '123456');
    setEditRole(u.role);
    setEditDesignation(u.designation || '');
    setEditHq(u.hqLocation || '');
    setEditTerritory(u.territory || '');
    setEditEmail(u.email || '');
    setEditPhone(u.phone || '');
    setEditManager(u.managerName || '');
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated: UserProfile = {
      ...editingUser,
      name: editName.trim(),
      employeeId: editEmpId.trim(),
      passwordPin: editPin.trim(),
      role: editRole,
      designation: editDesignation.trim() || editingUser.designation,
      hqLocation: editHq.trim() || editingUser.hqLocation,
      territory: editTerritory.trim() || editingUser.territory,
      email: editEmail.trim() || editingUser.email,
      phone: editPhone.trim() || editingUser.phone,
      managerName: editManager.trim() || editingUser.managerName
    };

    updateUser(updated);
    setEditingUser(null);
    showToast(`Admin Credentials & Profile updated for ${updated.name} (${updated.employeeId})`);
  };

  const handleConfirmDelete = () => {
    if (!userToDelete) return;
    deleteUser(userToDelete.id);
    showToast(`Deleted account: ${userToDelete.name} (${userToDelete.employeeId})`);
    setUserToDelete(null);
    if (editingUser?.id === userToDelete.id) {
      setEditingUser(null);
    }
  };

  const handleResetPasswordDefault = (u: UserProfile) => {
    const updated: UserProfile = {
      ...u,
      passwordPin: '123456'
    };
    updateUser(updated);
    if (editingUser?.id === u.id) {
      setEditPin('123456');
    }
    showToast(`Password reset to "123456" for ${u.name}`);
  };

  const handleProvisionNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmpId) return;

    addUser({
      name: newName.trim(),
      employeeId: newEmpId.trim(),
      passwordPin: newPin.trim() || '123456',
      role: newRole,
      designation: newDesignation.trim() || (newRole === 'MR' ? 'Medical Representative' : newRole === 'ASM' ? 'Area Sales Manager' : 'Admin Director'),
      hqLocation: newHq.trim() || 'Metro Central HQ',
      territory: newTerritory.trim() || 'Central Beat Zone',
      managerName: 'Board of Directors',
      email: newEmail.trim() || `${newEmpId.toLowerCase()}@pharmapulse.com`,
      phone: newPhone.trim() || '+91 99000 00000',
      status: 'Active',
      isLoggedIn: true,
      lastLoginTimestamp: 'Just Now',
      loginPosition: {
        lat: 19.0760,
        lng: 72.8777,
        address: `${newTerritory.trim() || 'Central Beat Zone'}, HQ Office`,
        beat: 'Central Beat',
        device: 'Admin Provisioned Device',
        ip: '103.22.14.88'
      }
    });

    setNewName('');
    setNewEmpId('');
    setNewPin('123456');
    setShowAddUserModal(false);
    showToast(`Successfully created user: ${newName} (${newEmpId}) with Password: ${newPin || '123456'}`);
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

      {/* ADMIN CONTROL CENTER HEADER */}
      <FlowingHeader
        themeIndex={8}
        badgeText="ADMIN LIVE GPS & CREDENTIAL CONTROL"
        title="Admin User Sessions & Position Monitor"
        subtitle="Manage user credentials, edit or delete accounts, assign login IDs & passwords, and track real-time logged-in positions of all field reps."
        icon={Radio}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Assign / Provision New User</span>
            </button>
          </div>
        }
      />

      {/* 4 STATS METRICS BARS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-extrabold uppercase">
            <span>Total Accounts</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-950 mt-1">{totalUsers}</div>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">Configured Users in System</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-emerald-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-800 text-[10px] font-extrabold uppercase">
            <span>Online (Logged In)</span>
            <Wifi className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-900 mt-1">{onlineCount}</div>
          <p className="text-[10px] text-emerald-700 font-medium mt-0.5">Active Live Portal Sessions</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 text-[10px] font-extrabold uppercase">
            <span>Offline (Logged Out)</span>
            <WifiOff className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-700 mt-1">{offlineCount}</div>
          <p className="text-[10px] text-slate-500 font-medium mt-0.5">Inactive / Out of Field</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-blue-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-blue-800 text-[10px] font-extrabold uppercase">
            <span>Active Field MRs</span>
            <Smartphone className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900 mt-1">{activeFieldMRs}</div>
          <p className="text-[10px] text-blue-700 font-medium mt-0.5">MRs Punched In & Visiting</p>
        </div>
      </div>

      {/* FILTER & CONTROL BAR */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                statusFilter === 'ALL' ? 'bg-white text-slate-950 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Users ({totalUsers})
            </button>
            <button
              onClick={() => setStatusFilter('ONLINE')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === 'ONLINE' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              <Wifi className="w-3 h-3" />
              Online ({onlineCount})
            </button>
            <button
              onClick={() => setStatusFilter('OFFLINE')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
                statusFilter === 'OFFLINE' ? 'bg-slate-800 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <WifiOff className="w-3 h-3" />
              Offline ({offlineCount})
            </button>
          </div>

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden"
          >
            <option value="ALL">All Roles</option>
            <option value="MR">MR Only</option>
            <option value="ASM">ASM Only</option>
            <option value="Marketing">Marketing</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Name, ID, Location..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:border-emerald-600"
          />
        </div>
      </div>

      {/* MAIN MONITOR LIST & AUDIT SIDEBAR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live User Cards & Position Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-sm text-slate-950 flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Configured User Credentials & Live Logged-in Positions</span>
            </h3>
            <span className="text-xs text-slate-600 font-semibold">
              Admin control enabled • Real-time GPS ping
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
                        <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                          isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                        }`} />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-black text-sm text-slate-950 truncate">{u.name}</h4>
                          <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                            ID: {u.employeeId}
                          </span>
                          <span className="font-mono text-xs font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded border border-blue-300">
                            Pass: {u.passwordPin || '123456'}
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

                    {/* Online Status Tag & Session Controls */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <div className={`px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                        isOnline
                          ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                          : 'bg-slate-200 text-slate-700 border border-slate-300'
                      }`}>
                        {isOnline ? (
                          <>
                            <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Logged In</span>
                          </>
                        ) : (
                          <>
                            <WifiOff className="w-3.5 h-3.5 text-slate-500" />
                            <span>Logged Out</span>
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

                  {/* ADMIN ACTION BUTTONS: EDIT CREDENTIALS, RESET PASSWORD, DELETE USER */}
                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => handleSimulateGPSPing(u)}
                      className="text-emerald-800 hover:text-emerald-950 font-black flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ping Live GPS Sensor</span>
                    </button>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button
                        onClick={() => handleOpenEditModal(u)}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100 font-extrabold flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <KeyRound className="w-3.5 h-3.5 text-blue-700" />
                        <span>Edit Credentials / Password</span>
                      </button>

                      <button
                        onClick={() => handleResetPasswordDefault(u)}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 font-extrabold flex items-center gap-1 cursor-pointer transition-all"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
                        <span>Reset Password (123456)</span>
                      </button>

                      {usersList.length > 1 && currentUser.id !== u.id && (
                        <button
                          onClick={() => setUserToDelete(u)}
                          className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 font-extrabold flex items-center gap-1 cursor-pointer transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                          <span>Delete Account</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedUserForDetail(isSelected ? null : u)}
                        className="text-teal-800 hover:text-teal-950 font-extrabold flex items-center gap-1 cursor-pointer hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5 text-teal-700" />
                        <span>{isSelected ? 'Close Details' : 'Full Audit'}</span>
                      </button>
                    </div>
                  </div>
                </FlowingBox>
              );
            })}
          </div>
        </div>

        {/* Right 1 Col: Selected User Audit Details */}
        <div className="space-y-4">
          <h3 className="font-black text-sm text-slate-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Admin Live Account Inspector</span>
          </h3>

          {selectedUserForDetail ? (
            <FlowingBox themeIndex={6} className="p-5 space-y-4 sticky top-20">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400 font-black text-slate-950 flex items-center justify-center text-sm shadow-md">
                  {selectedUserForDetail.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-black text-sm text-slate-950">{selectedUserForDetail.name}</h4>
                  <p className="text-xs text-slate-600 font-bold">{selectedUserForDetail.designation}</p>
                  <span className="font-mono text-xs font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">
                    ID: {selectedUserForDetail.employeeId} | Pass: {selectedUserForDetail.passwordPin || '123456'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Role & Territory</span>
                  <p className="font-bold text-slate-900">{selectedUserForDetail.role} • {selectedUserForDetail.territory}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Headquarters & Manager</span>
                  <p className="font-bold text-slate-900">{selectedUserForDetail.hqLocation} (Reporting: {selectedUserForDetail.managerName})</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Email & Phone</span>
                  <p className="font-bold text-slate-800">{selectedUserForDetail.email} | {selectedUserForDetail.phone}</p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block">Logged In Position</span>
                  <p className="font-extrabold text-emerald-950 bg-emerald-50 p-2 rounded-xl border border-emerald-200 mt-0.5">
                    {selectedUserForDetail.loginPosition?.address || 'Verified Territory Beat'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                <button
                  onClick={() => handleOpenEditModal(selectedUserForDetail)}
                  className="w-full py-2 bg-blue-600 text-white font-extrabold rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer shadow-xs"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Edit Credentials</span>
                </button>
              </div>
            </FlowingBox>
          ) : (
            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs text-slate-600 text-center font-medium space-y-2">
              <p className="font-bold text-slate-800">Select any user card to view live audit info.</p>
              <p className="text-[11px] text-slate-500">
                ADMIN can edit login credentials, change passwords, and track real-time GPS locations for all users.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* EDIT CREDENTIALS & PROFILE MODAL */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-emerald-700" />
                <h3 className="font-black text-base text-slate-950">
                  Edit Credentials & Account Settings
                </h3>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveCredentials} className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-slate-700 mb-1">
                  User Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Employee / MR ID (Login ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editEmpId}
                    onChange={(e) => setEditEmpId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-black text-blue-900 focus:bg-white focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Password / PIN *
                  </label>
                  <input
                    type="text"
                    required
                    value={editPin}
                    onChange={(e) => setEditPin(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-black text-emerald-900 focus:bg-white focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Assigned Role
                  </label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white"
                  >
                    <option value="MR">MR - Medical Representative</option>
                    <option value="ASM">ASM - Area Sales Manager</option>
                    <option value="Marketing">Marketing Specialist</option>
                    <option value="Admin">Admin - System Director</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Official Designation
                  </label>
                  <input
                    type="text"
                    value={editDesignation}
                    onChange={(e) => setEditDesignation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Headquarters Location
                  </label>
                  <input
                    type="text"
                    value={editHq}
                    onChange={(e) => setEditHq(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Assigned Territory
                  </label>
                  <input
                    type="text"
                    value={editTerritory}
                    onChange={(e) => setEditTerritory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 font-black text-xs text-white shadow-md cursor-pointer"
                >
                  Save Account Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PROVISION NEW USER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl border border-slate-300 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-700" />
                <h3 className="font-black text-base text-slate-950">
                  Assign & Provision New User Account
                </h3>
              </div>
              <button
                onClick={() => setShowAddUserModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleProvisionNewUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Assign Login Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmpId}
                    onChange={(e) => setNewEmpId(e.target.value.toUpperCase())}
                    placeholder="e.g. MR-5001 or admin2"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Assign Password / PIN *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="e.g. 123456"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-emerald-900 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Role *
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => {
                      const r = e.target.value as UserRole;
                      setNewRole(r);
                      if (r === 'MR') setNewDesignation('Medical Representative');
                      else if (r === 'ASM') setNewDesignation('Area Sales Manager');
                      else if (r === 'Marketing') setNewDesignation('Marketing Manager');
                      else setNewDesignation('System Admin Director');
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="MR">MR - Medical Representative</option>
                    <option value="ASM">ASM - Area Sales Manager</option>
                    <option value="Marketing">Marketing Specialist</option>
                    <option value="Admin">Admin Director</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Official Designation
                  </label>
                  <input
                    type="text"
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    HQ Location
                  </label>
                  <input
                    type="text"
                    value={newHq}
                    onChange={(e) => setNewHq(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-black text-slate-700 mb-1">
                    Assigned Territory
                  </label>
                  <input
                    type="text"
                    value={newTerritory}
                    onChange={(e) => setNewTerritory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 font-bold text-xs text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 font-black text-xs text-white shadow-md cursor-pointer"
                >
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-sm w-full rounded-2xl p-6 shadow-2xl border border-slate-300 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-base text-slate-950">Confirm Deletion</h3>
                <p className="text-xs text-slate-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-xs text-slate-700 font-medium">
              Are you sure you want to permanently delete user account <strong className="text-slate-950">{userToDelete.name}</strong> ({userToDelete.employeeId})?
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setUserToDelete(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-black text-white shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
