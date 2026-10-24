import React, { useState } from 'react';
import { Folder, FileText, Download, Eye, Plus, FolderOpen, Tag, Calendar } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import { useToast } from '../common/Toast';

export default function DocumentsView() {
  const { addToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');

  const folders = [
    { name: 'All Documents', count: 184 },
    { name: 'Architectural Drawings', count: 48 },
    { name: 'Structural Blueprints', count: 36 },
    { name: 'MEP & Services', count: 24 },
    { name: 'Quality Test Certificates', count: 52 },
    { name: 'Legal & Permits', count: 24 }
  ];

  const documents = [
    { id: 'DOC-01', name: 'Skyline_Residency_TowerA_Structural_G+12.dwg.pdf', category: 'Structural Blueprints', project: 'Skyline Residency', size: '14.8 MB', date: '15 Oct 2026', version: 'v3.2' },
    { id: 'DOC-02', name: 'GreenValley_Villa12_Architectural_Plan.pdf', category: 'Architectural Drawings', project: 'Green Valley Villas', size: '8.4 MB', date: '18 Oct 2026', version: 'v2.0' },
    { id: 'DOC-03', name: 'UltraTech_Cement_Batch_7_Days_Compressive_Test.pdf', category: 'Quality Test Certificates', project: 'Skyline Residency', size: '1.2 MB', date: '22 Oct 2026', version: 'v1.0' },
    { id: 'DOC-04', name: 'Jaipur_Development_Authority_Building_Permit.pdf', category: 'Legal & Permits', project: 'City Center Mall', size: '4.5 MB', date: '01 Feb 2026', version: 'Final' }
  ];

  const columns = [
    {
      header: 'Document Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-red-50 text-red-600 flex items-center justify-center font-bold text-[9px] shrink-0">
            PDF
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight truncate max-w-sm">{row.name}</p>
            <p className="text-[10px] text-slate-400">{row.id} • {row.version} • {row.size}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
      render: (row) => <span className="font-medium text-slate-700">{row.category}</span>
    },
    {
      header: 'Project',
      key: 'project',
      render: (row) => <span className="text-slate-700">{row.project}</span>
    },
    {
      header: 'Uploaded Date',
      key: 'date',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.date}</span>
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <button
            onClick={() => addToast({ title: 'Viewing Document', message: `Previewing ${row.name}`, type: 'info' })}
            className="p-1 hover:text-blue-600 rounded"
            title="Preview"
          >
            <Eye size={13} />
          </button>
          <button
            onClick={() => addToast({ title: 'Downloading', message: `Starting download: ${row.name}`, type: 'success' })}
            className="p-1 hover:text-slate-800 rounded"
            title="Download"
          >
            <Download size={13} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 056 / 072) */}
      <HeroBanner
        title="Project Documents & Engineering Drawings"
        subtitle="Centralized drawing management, revision versioning, CAD/PDF blueprints and quality test reports."
        actionButton={
          <button
            onClick={() => addToast({ title: 'Upload Document', message: 'Select blueprint or document file...', type: 'info' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
          >
            <Plus size={15} />
            <span>Upload Document</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard icon={Folder} iconBg="bg-blue-600" value="184" label="Total Files in Vault" delta="Organized in 12 folders" isPositive={true} />
        <StatCard icon={FileText} iconBg="bg-emerald-600" value="84" label="Approved Working Drawings" delta="Latest revisions" isPositive={true} />
        <StatCard icon={Tag} iconBg="bg-purple-600" value="52" label="Lab Test Certificates" delta="Cement, steel, cube tests" isPositive={true} />
        <StatCard icon={Calendar} iconBg="bg-amber-500" value="14" label="Updated This Month" delta="New architectural revisions" isPositive={true} />
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Left Folder Tree (Screen 056 signature) */}
        <div className="w-full lg:w-60 bg-white rounded-xl border border-slate-200 p-3 shrink-0 shadow-xs space-y-1 text-xs">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">Document Folders</p>
          {folders.map(f => (
            <button
              key={f.name}
              onClick={() => setSelectedFolder(f.name)}
              className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors font-medium ${
                selectedFolder === f.name ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <FolderOpen size={13} className={selectedFolder === f.name ? 'text-blue-600' : 'text-slate-400'} />
                <span className="truncate">{f.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-bold">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Right Table */}
        <div className="flex-1 w-full min-w-0">
          <DataTable columns={columns} data={documents} entityName="documents" />
        </div>
      </div>
    </div>
  );
}
