import React, { useState } from 'react';
import { Compass, MapPin, Users, HardHat, AlertTriangle, CheckCircle2, ShieldCheck, Eye, Plus } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function SitesView({ onNavigate }) {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const sites = [
    { id: 'SITE-01', name: 'Skyline Residency - Sector A', project: 'Skyline Residency', location: 'Mansarovar Extension, Jaipur', engineer: 'Vikram Patel', labourCount: 48, safetyScore: '98%', status: 'Active' },
    { id: 'SITE-02', name: 'Green Valley Villas - East Wing', project: 'Green Valley Villas', location: 'Tonk Road, Jaipur', engineer: 'Amit Verma', labourCount: 32, safetyScore: '96%', status: 'Active' },
    { id: 'SITE-03', name: 'City Center Mall - Main Core', project: 'City Center Mall', location: 'Ajmer Road, Jaipur', engineer: 'Vikram Patel', labourCount: 42, safetyScore: '94%', status: 'Active' },
    { id: 'SITE-04', name: 'Tech Park Tower 1', project: 'Tech Park Phase 1', location: 'Sitapura, Jaipur', engineer: 'Rakesh Kumar', labourCount: 20, safetyScore: '99%', status: 'Active' }
  ];

  const [selectedSite, setSelectedSite] = useState(sites[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(true);

  const columns = [
    {
      header: 'Site Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
            <Compass size={14} />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-400">{row.id} • {row.project}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Location Address',
      key: 'location',
      render: (row) => (
        <div className="flex items-center gap-1 text-slate-600">
          <MapPin size={11} className="text-blue-600 shrink-0" />
          <span>{row.location}</span>
        </div>
      )
    },
    {
      header: 'Site Engineer',
      key: 'engineer',
      render: (row) => <span className="font-medium text-slate-800">{row.engineer}</span>
    },
    {
      header: 'Active Labour',
      key: 'labourCount',
      align: 'center',
      render: (row) => <span className="font-bold text-slate-800">{row.labourCount} Workers</span>
    },
    {
      header: 'Safety Score',
      key: 'safetyScore',
      align: 'center',
      render: (row) => (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] border border-emerald-200">
          <ShieldCheck size={11} /> {row.safetyScore}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 046 / 068) */}
      <HeroBanner
        title="Site Management"
        subtitle="Live monitoring of active construction yards, site engineer logs, material stocks and safety inspections."
        actionButton={
          <button
            onClick={() => addToast({ title: 'New Site', message: 'Opening Add Site modal...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Add Site</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={Compass} iconBg="bg-blue-600" value="8" label="Active Construction Sites" delta="Jaipur & Rajasthan" isPositive={true} />
        <StatCard icon={HardHat} iconBg="bg-emerald-600" value="142" label="Labour Deployed Today" delta="94% attendance" isPositive={true} />
        <StatCard icon={ShieldCheck} iconBg="bg-purple-600" value="97.2%" label="Safety Compliance Index" delta="Zero lost time injuries" isPositive={true} />
        <StatCard icon={AlertTriangle} iconBg="bg-amber-500" value="2" label="Pending Site Inspections" delta="Scheduled for today" isPositive={false} />
      </div>

      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search site name, location, engineer..." />

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={sites}
            selectedRowId={selectedSite?.id}
            onRowClick={(row) => {
              setSelectedSite(row);
              setIsDetailOpen(true);
            }}
            entityName="sites"
          />
        </div>

        {selectedSite && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedSite.name}
            subtitle={selectedSite.project}
            statusBadge={<StatusBadge status={selectedSite.status} />}
            tabs={[{ id: 'overview', label: 'Site Overview' }]}
          >
            {() => (
              <div className="space-y-3.5 text-xs">
                {/* Map snippet */}
                <div className="w-full h-36 rounded-xl overflow-hidden relative border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&auto=format&fit=crop&q=80"
                    alt="Map"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                    <div className="bg-white/95 px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 text-slate-800 font-bold text-xs">
                      <MapPin size={13} className="text-red-500" />
                      <span>{selectedSite.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Site Engineer:</span>
                    <span className="font-semibold text-slate-800">{selectedSite.engineer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Labour Strength:</span>
                    <span className="font-semibold text-slate-800">{selectedSite.labourCount} Workers</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Safety Index:</span>
                    <span className="font-bold text-emerald-600">{selectedSite.safetyScore}</span>
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
