import React, { useState, useEffect } from 'react';
import { HardHat, Clock, CheckCircle2, UserCheck, Plus, ArrowRight, Calendar, Users, DollarSign, X } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function LabourAttendanceView() {
  const { addToast } = useToast();
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const initialWorkers = [
    { id: 'LBR-001', name: 'Rameshwar Lal', trade: 'Head Mason', site: 'Skyline Residency', checkIn: '08:02 AM', checkOut: '--:--', wage: 850, ot: '1.5 hrs', status: 'Present' },
    { id: 'LBR-002', name: 'Mukesh Kumar', trade: 'Carpenter', site: 'Skyline Residency', checkIn: '08:15 AM', checkOut: '--:--', wage: 750, ot: '0 hrs', status: 'Present' },
    { id: 'LBR-003', name: 'Sohan Singh', trade: 'Bar Bender', site: 'Green Valley Villas', checkIn: '08:45 AM', checkOut: '--:--', wage: 750, ot: '0 hrs', status: 'Late' },
    { id: 'LBR-004', name: 'Gopal Meena', trade: 'Helper', site: 'Skyline Residency', checkIn: '07:55 AM', checkOut: '--:--', wage: 500, ot: '2.0 hrs', status: 'Present' },
    { id: 'LBR-005', name: 'Kailash Chand', trade: 'Electrician', site: 'City Center Mall', checkIn: '08:05 AM', checkOut: '--:--', wage: 800, ot: '1.0 hrs', status: 'Present' },
    { id: 'LBR-006', name: 'Dinesh Yadav', trade: 'Plumber', site: 'River View Apartments', checkIn: '--:--', checkOut: '--:--', wage: 750, ot: '0 hrs', status: 'Absent' }
  ];

  const [workersList, setWorkersList] = useState(initialWorkers);

  const [newWorker, setNewWorker] = useState({
    name: '',
    trade: 'Head Mason',
    site: 'Skyline Residency',
    wage: '',
    phone: '',
    aadhaar: '',
    shift: 'Shift 1 (08:00 - 17:00)'
  });

  const handleCreateWorker = (e) => {
    e.preventDefault();
    if (!newWorker.name.trim()) {
      addToast({
        title: 'Name Required',
        message: 'Please provide worker name.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `LBR-${String(workersList.length + 1).padStart(3, '0')}`,
      name: newWorker.name.trim(),
      trade: newWorker.trade,
      site: newWorker.site,
      checkIn: '08:00 AM',
      checkOut: '--:--',
      wage: parseFloat(newWorker.wage) || 750,
      ot: '0 hrs',
      status: 'Present'
    };

    setWorkersList([created, ...workersList]);
    setIsAddModalOpen(false);
    setNewWorker({
      name: '',
      trade: 'Head Mason',
      site: 'Skyline Residency',
      wage: '',
      phone: '',
      aadhaar: '',
      shift: 'Shift 1 (08:00 - 17:00)'
    });
    addToast({
      title: 'Worker Registered',
      message: `${created.name} (${created.trade}) enrolled and added to muster roll.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Workers', count: workersList.length },
    { id: 'present', label: 'Present', count: workersList.filter(w => w.status === 'Present').length },
    { id: 'late', label: 'Late', count: workersList.filter(w => w.status === 'Late').length },
    { id: 'absent', label: 'Absent', count: workersList.filter(w => w.status === 'Absent').length }
  ];

  const columns = [
    {
      header: 'Worker Name & ID',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0 aspect-square ring-1 ring-slate-200">
            {row.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-400">{row.id} • {row.trade}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Assigned Project Site',
      key: 'site',
      render: (row) => <span className="font-medium text-slate-800">{row.site}</span>
    },
    {
      header: 'Check-in Time',
      key: 'checkIn',
      render: (row) => (
        <span className={`font-mono text-xs font-semibold ${row.checkIn === '--:--' ? 'text-slate-400' : 'text-slate-700'}`}>
          {row.checkIn}
        </span>
      )
    },
    {
      header: 'Daily Wage Rate',
      key: 'wage',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-900">{formatCurrencyINR(row.wage)}/day</span>
    },
    {
      header: 'Overtime (OT)',
      key: 'ot',
      align: 'center',
      render: (row) => (
        <span className={`text-[11px] font-semibold ${row.ot !== '0 hrs' ? 'text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full' : 'text-slate-400'}`}>
          {row.ot}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  const filteredWorkers = workersList.filter(w => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = w.name.toLowerCase().includes(q) ||
                    w.id.toLowerCase().includes(q) ||
                    w.trade.toLowerCase().includes(q) ||
                    w.site.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab === 'present' && w.status !== 'Present') return false;
    if (activeTab === 'late' && w.status !== 'Late') return false;
    if (activeTab === 'absent' && w.status !== 'Absent') return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 021) */}
      <HeroBanner
        title="Labour & Daily Attendance"
        subtitle="Real-time site biometric/mobile check-in, daily muster roll, skill allocation and wage calculations."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Labour</span>
          </button>
        }
      />

      {/* Top 4 KPI Cards + Live Check-in Card (Screen 021) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
          <StatCard icon={HardHat} iconBg="bg-blue-600" value={String(workersList.length)} label="Total Muster Roll" delta="94% attendance" isPositive={true} />
          <StatCard icon={UserCheck} iconBg="bg-emerald-600" value={String(workersList.filter(w => w.status === 'Present').length)} label="Present on Site" delta="92 skilled" isPositive={true} />
          <StatCard icon={Clock} iconBg="bg-amber-500" value={String(workersList.filter(w => w.status === 'Late').length)} label="Late Check-ins" delta="Avg 15 mins late" isPositive={false} />
          <StatCard icon={DollarSign} iconBg="bg-purple-600" value="₹98,400" label="Today's Wage Cost" delta="Incl. 14.5 hrs OT" isPositive={true} />
        </div>

        {/* Live Clock & Quick Check-in Card (Screen 021 signature) */}
        <div className="md:col-span-4 bg-gradient-to-br from-slate-900 to-[#0F2347] text-white rounded-xl p-4 flex flex-col justify-between shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Time Clock</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <div className="my-2">
            <p className="text-2xl font-mono font-extrabold text-orange-400">{time}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Saturday, 24 Oct 2026 • Shift 1 (08:00 - 17:00)</p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => addToast({ title: 'Attendance Marked', message: 'Quick scan attendance logged for Skyline Residency', type: 'success' })}
              className="flex-1 py-1.5 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-xs shadow-xs text-center transition-colors cursor-pointer"
            >
              Scan QR / Face ID
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="py-1.5 px-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
            >
              Manual
            </button>
          </div>
        </div>
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search worker name, ID, trade, site..." />

      <DataTable columns={columns} data={filteredWorkers} entityName="workers" />

      {/* Add Worker Responsive Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <HardHat size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Enroll Site Labour</h3>
                  <p className="text-[11px] text-slate-500">Add worker to muster roll and wage schedule</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleCreateWorker} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Worker Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rameshwar Lal Sharma"
                    value={newWorker.name}
                    onChange={(e) => setNewWorker({ ...newWorker, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Skill Trade / Specialization
                  </label>
                  <select
                    value={newWorker.trade}
                    onChange={(e) => setNewWorker({ ...newWorker, trade: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Head Mason">Head Mason (Mistri)</option>
                    <option value="Carpenter">Carpenter / Shuttering</option>
                    <option value="Bar Bender">Bar Bender (Rebar)</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Helper">Unskilled Helper / Beldar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Assigned Project Site
                  </label>
                  <select
                    value={newWorker.site}
                    onChange={(e) => setNewWorker({ ...newWorker, site: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Skyline Residency">Skyline Residency</option>
                    <option value="City Center Mall">City Center Mall</option>
                    <option value="Green Valley Villas">Green Valley Villas</option>
                    <option value="Highway Interchange Phase 1">Highway Interchange Phase 1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Daily Wage Rate (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 750"
                    value={newWorker.wage}
                    onChange={(e) => setNewWorker({ ...newWorker, wage: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98290 54321"
                    value={newWorker.phone}
                    onChange={(e) => setNewWorker({ ...newWorker, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Aadhaar / National ID
                  </label>
                  <input
                    type="text"
                    placeholder="XXXX-XXXX-XXXX"
                    value={newWorker.aadhaar}
                    onChange={(e) => setNewWorker({ ...newWorker, aadhaar: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Work Shift
                  </label>
                  <select
                    value={newWorker.shift}
                    onChange={(e) => setNewWorker({ ...newWorker, shift: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Shift 1 (08:00 - 17:00)">Shift 1 (08:00 - 17:00)</option>
                    <option value="Shift 2 (17:00 - 02:00)">Shift 2 (17:00 - 02:00)</option>
                    <option value="Night Shift (20:00 - 05:00)">Night Concrete Shift (20:00 - 05:00)</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-lg shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Enroll Worker</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
