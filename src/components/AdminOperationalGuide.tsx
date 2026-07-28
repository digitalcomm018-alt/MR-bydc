import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import { UserProfile, UserRole } from '../types';
import {
  BookOpen,
  Users,
  Shield,
  KeyRound,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Copy,
  Briefcase,
  Building2,
  UserCheck,
  Search,
  Filter,
  Activity,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  RefreshCw,
  Edit2,
  Trash2,
  LogOut,
  LogIn
} from 'lucide-react';

export const AdminOperationalGuide: React.FC = () => {
  const {
    usersList,
    currentUser,
    toggleUserLiveSessionStatus,
    updateUser,
    deleteUser
  } = useApp();

  const [activeRoleTab, setActiveRoleTab] = useState<'ALL' | 'Admin' | 'ASM' | 'MR' | 'Marketing'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Filtered Users Roster
  const filteredRoster = usersList.filter((u) => {
    const matchesRole = activeRoleTab === 'ALL' || u.role === activeRoleTab;
    const matchesQuery =
      searchQuery === '' ||
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.hqLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.designation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesQuery;
  });

  // Handle Copy Roster Data to Clipboard
  const handleCopyRosterSummary = () => {
    const textSummary = usersList
      .map(
        (u) =>
          `[${u.role}] ${u.name} | ID: ${u.employeeId} | Pass: ${u.passwordPin || '123456'} | Desig: ${u.designation} | HQ: ${u.hqLocation} | Territory: ${u.territory} | Contact: ${u.phone} (${u.email})`
      )
      .join('\n');

    navigator.clipboard.writeText(
      `=====================================================\nMRCONNECT ADMIN OPERATIONAL USER ROSTER & MANUAL\n=====================================================\nTotal Configured Accounts: ${usersList.length}\n\n` +
        textSummary
    );

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  // Handle Print Operational Manual
  const handlePrintManual = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-emerald-300 font-extrabold text-xs px-4 py-3 rounded-xl border border-emerald-500/40 shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Operational User Guide copied to clipboard!</span>
        </div>
      )}

      {/* HEADER */}
      <FlowingHeader
        themeIndex={9}
        badgeText="ADMIN OPERATIONAL MANUAL & USER ROSTER"
        title="Field Force Operational Guide & Credentials Roster"
        subtitle="Standard operating procedures (SOPs), role guidelines, login credentials, and operational matrix for all configured system users."
        icon={BookOpen}
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyRosterSummary}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Operational Roster</span>
            </button>
            <button
              onClick={handlePrintManual}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Operational Manual</span>
            </button>
          </div>
        }
      />

      {/* SECTION 1: ROLE-BY-ROLE OPERATIONAL STANDARD OPERATING PROCEDURES (SOPS) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-base text-slate-950 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>Standard Operating Procedures (SOPs) by User Role</span>
          </h3>
          <span className="text-xs text-slate-500 font-bold">
            4 Core Field Hierarchy Levels Defined
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Admin SOP */}
          <div className="bg-white p-5 rounded-2xl border-2 border-purple-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-purple-100 text-purple-900 border border-purple-300">
                ADMIN ROLE
              </span>
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-950">System Operations & Governance</h4>
              <p className="text-[11px] text-slate-500 font-medium">Headquarters Operational Director</p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium border-t border-slate-100 pt-3">
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>Assign & edit user IDs, names & passwords.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>Track real-time GPS locations of all field reps.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>Manage master doctor list, beats, and product pricing.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                <span>Audit monthly DTR logs & expense claims.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: ASM SOP */}
          <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-amber-100 text-amber-900 border border-amber-300">
                ASM ROLE
              </span>
              <Briefcase className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-950">Area Sales Management</h4>
              <p className="text-[11px] text-slate-500 font-medium">Regional Field Manager</p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium border-t border-slate-100 pt-3">
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Conduct joint work with MRs on key doctor calls.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Review & approve monthly Tour Programs (TP).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Monitor territory coverage & stockist orders.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>Resolve doctor queries & track regional sales targets.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: MR SOP */}
          <div className="bg-white p-5 rounded-2xl border-2 border-emerald-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                MR ROLE
              </span>
              <UserCheck className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-950">Medical Representative Field Duty</h4>
              <p className="text-[11px] text-slate-500 font-medium">Primary Doctor & Chemist Representative</p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium border-t border-slate-100 pt-3">
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Punch in daily at beat location with GPS.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Complete minimum 10 Doctor & 5 Chemist calls daily.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Present e-Detailing visual aids & log sample inputs.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Book POB orders and submit Daily Tour Reports (DTR).</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Marketing SOP */}
          <div className="bg-white p-5 rounded-2xl border-2 border-sky-200 shadow-xs space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-sky-100 text-sky-900 border border-sky-300">
                MARKETING ROLE
              </span>
              <Sparkles className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-950">Brand & Promotional Strategy</h4>
              <p className="text-[11px] text-slate-500 font-medium">Product & Input Specialist</p>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 font-medium border-t border-slate-100 pt-3">
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>Deploy interactive digital e-Detailing visual aids.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>Allocate promotional samples & gifts to territories.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>Analyze brand adoption & doctor feedback metrics.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                <span>Organize CMEs (Continuing Medical Education) events.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* SECTION 2: OPERATIONAL USER ROSTER & CREDENTIALS MATRIX TABLE */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-black text-base text-slate-950 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>Operational Matrix & Credentials Guide of All Users</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Complete directory of all {usersList.length} configured system users with login credentials & active positions
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {['ALL', 'Admin', 'ASM', 'MR', 'Marketing'].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRoleTab(r as any)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    activeRoleTab === r
                      ? 'bg-blue-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r === 'ALL' ? 'All Roles' : r}
                </button>
              ))}
            </div>

            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roster..."
                className="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:outline-hidden focus:border-blue-600"
              />
            </div>
          </div>
        </div>

        {/* ROSTER TABLE */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">User Name & ID</th>
                  <th className="py-3 px-4">Assigned Login Password</th>
                  <th className="py-3 px-4">Role & Designation</th>
                  <th className="py-3 px-4">HQ & Assigned Territory</th>
                  <th className="py-3 px-4">Contact Info</th>
                  <th className="py-3 px-4">Live Position / Status</th>
                  <th className="py-3 px-4 text-right">Session Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {filteredRoster.map((u) => {
                  const isOnline = u.isLoggedIn !== false;

                  return (
                    <tr key={u.id} className="hover:bg-blue-50/50 transition-all">
                      
                      {/* Name & ID */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-xl font-black text-xs text-slate-950 flex items-center justify-center shrink-0 ${
                              u.role === 'ASM'
                                ? 'bg-amber-400'
                                : u.role === 'Marketing'
                                ? 'bg-sky-400'
                                : u.role === 'Admin' || u.role === 'RSM'
                                ? 'bg-purple-400'
                                : 'bg-emerald-400'
                            }`}
                          >
                            {u.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-black text-slate-950 text-xs">{u.name}</div>
                            <div className="font-mono text-[10px] text-blue-700 font-bold">
                              ID: {u.employeeId}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Password PIN */}
                      <td className="py-3 px-4">
                        <span className="font-mono font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          {u.passwordPin || '123456'}
                        </span>
                      </td>

                      {/* Role & Designation */}
                      <td className="py-3 px-4">
                        <div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                              u.role === 'ASM'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : u.role === 'Marketing'
                                ? 'bg-sky-100 text-sky-900 border border-sky-300'
                                : u.role === 'Admin' || u.role === 'RSM'
                                ? 'bg-purple-100 text-purple-900 border border-purple-300'
                                : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}
                          >
                            {u.role}
                          </span>
                          <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                            {u.designation}
                          </p>
                        </div>
                      </td>

                      {/* HQ & Territory */}
                      <td className="py-3 px-4">
                        <div className="text-xs font-bold text-slate-900">{u.hqLocation}</div>
                        <div className="text-[11px] text-slate-500">{u.territory}</div>
                      </td>

                      {/* Contact */}
                      <td className="py-3 px-4">
                        <div className="text-[11px] font-bold text-slate-800">{u.phone}</div>
                        <div className="text-[10px] text-slate-500 font-mono truncate max-w-[140px]">{u.email}</div>
                      </td>

                      {/* Live Position / Status */}
                      <td className="py-3 px-4">
                        <div className="space-y-0.5">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                              isOnline
                                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-slate-400'
                              }`}
                            />
                            {isOnline ? 'Active Session' : 'Logged Out'}
                          </span>
                          <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">
                            {u.loginPosition?.address || u.territory}
                          </p>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => toggleUserLiveSessionStatus(u.id, !isOnline)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold border cursor-pointer transition-all ${
                            isOnline
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'
                          }`}
                        >
                          {isOnline ? 'Logout' : 'Login'}
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between font-bold">
            <span>Displaying {filteredRoster.length} of {usersList.length} configured users</span>
            <span>Default Demo Admin ID: <strong className="font-mono text-blue-700">admin</strong> | Password: <strong className="font-mono text-blue-700">123456</strong></span>
          </div>
        </div>
      </div>

      {/* SECTION 3: SYSTEM SECURITY & COMPLIANCE PROTOCOLS */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 rounded-2xl border border-blue-900/60 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <h4 className="font-black text-sm text-white">System Security & Access Governance</h4>
          </div>
          <span className="text-xs text-blue-300 font-mono font-bold">MR CONNECT v4.2 SECURITY</span>
        </div>

        <p className="text-xs text-blue-200/90 leading-relaxed font-medium">
          Admin personnel possess master override credentials to assign, edit, or reset passwords for any field representative or manager. All user login events log device IP addresses and real-time GPS coordinates for compliance auditing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-800/40 space-y-1">
            <span className="text-emerald-300 font-extrabold block">Credential Encryption</span>
            <p className="text-blue-200 text-[11px]">All PINs and Employee IDs are stored with local session caching and admin privileges.</p>
          </div>

          <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-800/40 space-y-1">
            <span className="text-sky-300 font-extrabold block">Live GPS Telemetry</span>
            <p className="text-blue-200 text-[11px]">Automatic location pings match assigned doctor beats with field representative check-ins.</p>
          </div>

          <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-800/40 space-y-1">
            <span className="text-amber-300 font-extrabold block">Single-Device Session</span>
            <p className="text-blue-200 text-[11px]">Admins can remotely terminate sessions or trigger forced logouts across all mobile devices.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
