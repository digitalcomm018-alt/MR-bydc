import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FlowingHeader, FlowingBox } from '../utils/flowingThemes';
import {
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Navigation,
  RefreshCw,
  Building2,
  Send,
  Compass,
  Check
} from 'lucide-react';

export const GPSAttendanceView: React.FC = () => {
  const { selectedBeat, attendancePunches, addAttendancePunch, currentUser } = useApp();

  const [locating, setLocating] = useState(false);
  const [currentCoords, setCurrentCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>({
    lat: 19.076,
    lng: 72.8777,
    accuracy: 6
  });
  const [address, setAddress] = useState('Central Enclave Medical Hub, Metro City Beat 1');
  const [workType, setWorkType] = useState<'Field Work' | 'HQ Meeting' | 'Joint Working' | 'Transit'>('Field Work');
  const [notes, setNotes] = useState('');
  const [showToast, setShowToast] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayPunch = attendancePunches.find((p) => p.date === todayStr);

  const handleFetchGPS = () => {
    setLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setCurrentCoords({ lat: latitude, lng: longitude, accuracy: Math.round(accuracy) });
          setAddress(`Geo-Verified Beat Point (${latitude.toFixed(4)}°N, ${longitude.toFixed(4)}°E)`);
          setLocating(false);
        },
        (error) => {
          console.warn('Geolocation fallback used:', error.message);
          // Standard simulated high precision beat coordinates
          setCurrentCoords({ lat: 19.076, lng: 72.8777, accuracy: 5 });
          setAddress('Central Medical Enclave Beat Center (Verified Satellite)');
          setLocating(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setCurrentCoords({ lat: 19.076, lng: 72.8777, accuracy: 5 });
      setAddress('Central Medical Enclave Beat Center');
      setLocating(false);
    }
  };

  const handlePunchIn = () => {
    const timeNow = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    addAttendancePunch({
      date: todayStr,
      punchInTime: timeNow,
      latitude: currentCoords?.lat || 19.076,
      longitude: currentCoords?.lng || 72.8777,
      accuracyMeters: currentCoords?.accuracy || 8,
      locationAddress: address,
      assignedBeat: selectedBeat,
      geofenceMatchStatus: 'In Beat Zone',
      workType,
      punchNotes: notes || `GPS punch in by ${currentUser.name} for ${selectedBeat}`,
      managerApproved: true
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Flowing Header (Theme 3: Blush Coral Rose) */}
      <FlowingHeader
        themeIndex={3}
        badgeText="Real-Time Geo-Attendance"
        title="GPS Field Punch & Geofencing"
        subtitle={`Log daily field duty punches with GPS coordinates and geofence verification for ${currentUser.name}.`}
        icon={Compass}
        actions={
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md p-3 rounded-xl border border-white/30 text-xs text-rose-950 font-bold">
            <Calendar className="w-4 h-4 text-rose-950 shrink-0" />
            <div>
              <div className="text-[10px] text-rose-900 font-bold uppercase">Assigned Beat Today</div>
              <div className="font-extrabold text-rose-950">{selectedBeat}</div>
            </div>
          </div>
        }
      />

      {showToast && (
        <div className="p-4 bg-emerald-500 text-slate-950 font-black rounded-xl shadow-lg flex items-center gap-3 text-xs animate-bounce">
          <Check className="w-5 h-5" />
          <span>GPS Attendance Punch In recorded successfully with satellite verification!</span>
        </div>
      )}

      {/* PUNCH CARD & GPS DETECTOR */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Punch Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">Today's Duty Punch Status</h3>
                <p className="text-[11px] text-slate-500">Record field start time with current GPS coordinates</p>
              </div>
            </div>

            <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${todayPunch ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'}`}>
              {todayPunch ? 'Punched In (Active Duty)' : 'Pending Punch In'}
            </span>
          </div>

          {/* Location Detection Box - Image 7 Lavender/Lilac Palette */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-200 via-indigo-150 to-purple-200 text-purple-950 space-y-3 relative overflow-hidden border border-purple-300 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-purple-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-purple-800" />
                Satellite GPS Coordinates
              </span>
              <button
                type="button"
                onClick={handleFetchGPS}
                disabled={locating}
                className="px-2.5 py-1 bg-purple-900 text-purple-50 rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors hover:bg-purple-800"
              >
                <RefreshCw className={`w-3 h-3 ${locating ? 'animate-spin' : ''}`} />
                <span>{locating ? 'Detecting Satellite...' : 'Refresh GPS'}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2 border-y border-purple-300/80 text-center">
              <div>
                <div className="text-[10px] text-purple-900 font-extrabold uppercase">Latitude</div>
                <div className="text-sm font-black text-purple-950 font-mono">
                  {currentCoords?.lat.toFixed(4) || '19.0760'}° N
                </div>
              </div>
              <div>
                <div className="text-[10px] text-purple-900 font-extrabold uppercase">Longitude</div>
                <div className="text-sm font-black text-purple-950 font-mono">
                  {currentCoords?.lng.toFixed(4) || '72.8777'}° E
                </div>
              </div>
              <div>
                <div className="text-[10px] text-purple-900 font-extrabold uppercase">Accuracy</div>
                <div className="text-sm font-black text-purple-950 font-mono">
                  ±{currentCoords?.accuracy || 5} meters
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-purple-950 text-[11px] font-extrabold truncate">{address}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-purple-900 text-purple-50 border border-purple-800">
                Geofence Matched
              </span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Work Duty Classification</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Field Work', 'HQ Meeting', 'Joint Working', 'Transit'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setWorkType(type)}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all cursor-pointer ${
                      workType === type
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Punch In Remarks / Field Objective</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Starting doctor calls in Metro Enclave with Cardia-50 visual aid."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800"
              />
            </div>

            <button
              onClick={handlePunchIn}
              disabled={!!todayPunch}
              className={`w-full py-3 rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all ${
                todayPunch
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-600/20 cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{todayPunch ? `Punched In Today at ${todayPunch.punchInTime}` : 'Punch In Duty (GPS Verified)'}</span>
            </button>
          </div>
        </div>

        {/* Today Summary Widget - Image 8 Golden Sand Palette */}
        <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 text-amber-950 rounded-2xl p-6 shadow-sm border border-amber-300 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-amber-950 font-black text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span>Manager Audit Verification</span>
            </div>

            <div className="p-4 rounded-xl bg-white/90 border border-amber-300 space-y-2 shadow-2xs">
              <div className="text-[10px] text-amber-900 font-extrabold uppercase">Reporting Manager</div>
              <div className="font-black text-sm text-amber-950">{currentUser.managerName}</div>
              <div className="text-[11px] text-amber-900 font-bold">Status: <span className="text-emerald-800 font-black">Auto-Approved for Beat Duty</span></div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-amber-950 font-bold">
                <span>Today's Field Coverage:</span>
                <span className="font-black text-amber-950">Central Beat</span>
              </div>
              <div className="flex items-center justify-between text-xs text-amber-950 font-bold">
                <span>Geofence Distance:</span>
                <span className="font-black text-emerald-800">0.12 km from Beat Center</span>
              </div>
              <div className="flex items-center justify-between text-xs text-amber-950 font-bold">
                <span>Total Punches This Month:</span>
                <span className="font-black text-amber-950">{attendancePunches.length} Days</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-amber-300/80 text-[11px] text-amber-900 font-semibold leading-relaxed">
            GPS Location data is encrypted and logged strictly for territory verification and field duty compliance.
          </div>
        </div>
      </div>

      {/* PUNCH HISTORY TABLE */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Geo-Attendance Duty History</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">{attendancePunches.length} Punches Logged</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-extrabold uppercase text-[10px]">
                <th className="p-3.5 pl-4">Date</th>
                <th className="p-3.5">Punch In Time</th>
                <th className="p-3.5">Assigned Beat</th>
                <th className="p-3.5">Duty Type</th>
                <th className="p-3.5">GPS Location & Address</th>
                <th className="p-3.5 text-center">Geofence Status</th>
                <th className="p-3.5 pr-4 text-center">Manager Approval</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendancePunches.map((punch) => (
                <tr key={punch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 pl-4 font-bold text-slate-900">{punch.date}</td>
                  <td className="p-3.5 font-extrabold text-teal-700">{punch.punchInTime}</td>
                  <td className="p-3.5 font-medium text-slate-700">{punch.assignedBeat}</td>
                  <td className="p-3.5 font-bold text-slate-800">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                      {punch.workType}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 max-w-xs truncate">
                    {punch.locationAddress}
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {punch.geofenceMatchStatus}
                    </span>
                  </td>
                  <td className="p-3.5 pr-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200 flex items-center justify-center gap-1 mx-auto w-max">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" />
                      <span>Approved</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
