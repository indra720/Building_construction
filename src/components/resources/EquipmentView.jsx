import React, { useState } from 'react';
import { Truck, Fuel, AlertCircle, CheckCircle2, Plus, Eye, Wrench, Calendar, MapPin } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function EquipmentView() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const equipmentList = [
    { id: 'EQ-001', name: 'JCB Excavator 3DX', category: 'Heavy Earthmover', site: 'Skyline Residency', operator: 'Mohan Lal', fuel: 82, hours: '1,420 hrs', status: 'In Use', image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=100&auto=format&fit=crop&q=80' },
    { id: 'EQ-002', name: 'Concrete Mixer 10/7', category: 'Concreting', site: 'Skyline Residency', operator: 'Pawan Kumar', fuel: 65, hours: '840 hrs', status: 'In Use', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&auto=format&fit=crop&q=80' },
    { id: 'EQ-003', name: 'Tower Crane Potain', category: 'Lifting & Hoisting', site: 'City Center Mall', operator: 'Rajeev Sharma', fuel: 95, hours: '2,150 hrs', status: 'In Use', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80' },
    { id: 'EQ-004', name: 'Diesel Generator 125 kVA', category: 'Power Equipment', site: 'Green Valley Villas', operator: 'Suresh Verma', fuel: 45, hours: '620 hrs', status: 'Standby', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&auto=format&fit=crop&q=80' },
    { id: 'EQ-005', name: 'Vibratory Roller 10T', category: 'Compaction', site: 'Tech Park Phase 1', operator: 'Mukesh Sen', fuel: 15, hours: '1,890 hrs', status: 'Under Review', image: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=100&auto=format&fit=crop&q=80' }
  ];

  const [selectedEq, setSelectedEq] = useState(equipmentList[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const statusTabs = [
    { id: 'all', label: 'All Machinery', count: 38 },
    { id: 'in use', label: 'In Operation', count: 28 },
    { id: 'standby', label: 'Standby / Idle', count: 6 },
    { id: 'under review', label: 'Maintenance', count: 4 }
  ];

  const columns = [
    {
      header: 'Machinery & Model',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.image} alt={row.name} className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 shrink-0" />
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-500">{row.id} • {row.category}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Current Site',
      key: 'site',
      render: (row) => <span className="font-medium text-slate-800">{row.site}</span>
    },
    {
      header: 'Assigned Operator',
      key: 'operator',
      render: (row) => <span className="text-slate-700">{row.operator}</span>
    },
    {
      header: 'Fuel Level',
      key: 'fuel',
      render: (row) => (
        <div className="flex items-center gap-2 w-24">
          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className={`h-full rounded-full ${row.fuel < 20 ? 'bg-red-500' : row.fuel < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${row.fuel}%` }}></div>
          </div>
          <span className="text-[10px] font-bold text-slate-700">{row.fuel}%</span>
        </div>
      )
    },
    {
      header: 'Operating Hours',
      key: 'hours',
      render: (row) => <span className="text-slate-600 font-mono text-[11px]">{row.hours}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Header (Screen 007) */}
      <HeroBanner
        title="Equipment & Machinery"
        subtitle="Manage heavy construction plant, operating hours log, diesel consumption and preventive maintenance."
        actionButton={
          <button
            onClick={() => addToast({ title: 'Add Machine', message: 'Opening Add Equipment modal...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Add Machinery</span>
          </button>
        }
      />

      {/* 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={Truck} iconBg="bg-blue-600" value="38" label="Total Fleet Units" delta="6 Owned, 32 Leased" isPositive={true} />
        <StatCard icon={CheckCircle2} iconBg="bg-emerald-600" value="28" label="Active Operating" delta="74% utilization" isPositive={true} />
        <StatCard icon={Fuel} iconBg="bg-amber-500" value="3,480 L" label="Fuel Consumed (Week)" delta="₹3.1 Lakh" isPositive={true} />
        <StatCard icon={Wrench} iconBg="bg-purple-600" value="4" label="Scheduled Service" delta="2 due this weekend" isPositive={false} />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search machinery, operator, site..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={equipmentList}
            selectedRowId={selectedEq?.id}
            onRowClick={(row) => {
              setSelectedEq(row);
              setIsDetailOpen(true);
            }}
            entityName="machinery"
          />
        </div>

        {selectedEq && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedEq.name}
            subtitle={`${selectedEq.id} • ${selectedEq.category}`}
            avatar={selectedEq.image}
            statusBadge={<StatusBadge status={selectedEq.status} />}
            tabs={[{ id: 'overview', label: 'Log & Fuel' }]}
            quickActions={
              <>
                <button
                  onClick={() => addToast({ title: 'Fuel Log', message: `Recording diesel fill for ${selectedEq.name}`, type: 'success' })}
                  className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Fuel size={12} />
                  <span>Log Fuel</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Service Request', message: 'Scheduling maintenance inspection...', type: 'info' })}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Wrench size={12} />
                  <span>Schedule Service</span>
                </button>
              </>
            }
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Deployed Site:</span>
                    <span className="font-bold text-slate-800">{selectedEq.site}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Operator:</span>
                    <span className="font-semibold text-slate-800">{selectedEq.operator}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Run Hours:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedEq.hours}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                    <span className="text-slate-400">Fuel Level:</span>
                    <span className="font-bold text-blue-600">{selectedEq.fuel}%</span>
                  </div>
                </div>
              </div>
            )}
          </DetailDrawerPanel>
        )}
      </div>
    </div>
  );
}
