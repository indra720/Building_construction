import React, { useState } from 'react';
import {
  UserPlus,
  Users,
  Target,
  CheckCircle2,
  Percent,
  Phone,
  Mail,
  MapPin,
  Building2,
  Calendar,
  Plus,
  MoreVertical,
  MessageCircle,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  FolderGit2,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { leadsData, teamMembers } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';
import ConfirmDialog from '../common/ConfirmDialog';

export default function LeadsView({ onNavigate }) {
  const { addToast } = useToast();
  const [leadsList, setLeadsList] = useState(leadsData);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValues, setFilterValues] = useState({
    projectType: '',
    source: '',
    status: '',
    assignedTo: ''
  });
  const [selectedLead, setSelectedLead] = useState(leadsData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
  const [isAddLeadModalOpen, setIsAddLeadModalOpen] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState({
    clientName: '',
    company: '',
    phone: '',
    email: '',
    projectType: 'Residential',
    budget: '',
    source: 'Website',
    assignedTo: 'Amit Verma',
    location: 'Jaipur, Rajasthan',
    expectedStart: '15 Nov 2026',
    notes: ''
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.clientName || !newLead.phone) {
      addToast({ title: 'Validation Error', message: 'Client name and phone number are required.', type: 'error' });
      return;
    }
    const created = {
      id: `LD-${Date.now()}`,
      clientName: newLead.clientName,
      company: newLead.company || 'Direct Client',
      phone: newLead.phone,
      email: newLead.email || 'client@example.com',
      projectType: newLead.projectType,
      budget: Number(newLead.budget) || 4500000,
      source: newLead.source,
      status: 'New',
      assignedTo: newLead.assignedTo,
      assignedAvatar: teamMembers.find(t => t.name === newLead.assignedTo)?.avatar || teamMembers[0].avatar,
      followUp: 'Tomorrow 10:00 AM',
      location: newLead.location,
      expectedStart: newLead.expectedStart || 'Next Month'
    };
    setLeadsList([created, ...leadsList]);
    setSelectedLead(created);
    setIsAddLeadModalOpen(false);
    setNewLead({
      clientName: '',
      company: '',
      phone: '',
      email: '',
      projectType: 'Residential',
      budget: '',
      source: 'Website',
      assignedTo: 'Amit Verma',
      location: 'Jaipur, Rajasthan',
      expectedStart: '15 Nov 2026',
      notes: ''
    });
    addToast({
      title: 'Lead Created!',
      message: `${created.clientName} (${created.company}) has been added to active pipeline.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Leads', count: 186 },
    { id: 'new', label: 'New', count: 42 },
    { id: 'contacted', label: 'Contacted', count: 38 },
    { id: 'qualified', label: 'Qualified', count: 28 },
    { id: 'proposal', label: 'Proposal', count: 22 },
    { id: 'negotiation', label: 'Negotiation', count: 12 },
    { id: 'converted', label: 'Converted', count: 18 },
    { id: 'lost', label: 'Lost', count: 26 },
  ];

  const filterConfigs = [
    {
      id: 'projectType',
      label: 'Project Type',
      options: ['Residential', 'Commercial', 'Industrial', 'Renovation', 'Interior Fit-out']
    },
    {
      id: 'source',
      label: 'Lead Source',
      options: ['Website', 'Referral', 'Google Ads', 'Instagram', 'Direct Call', 'LinkedIn', 'Facebook']
    },
    {
      id: 'status',
      label: 'Status',
      options: ['New', 'Qualified', 'Contacted', 'Proposal', 'Negotiation', 'Lost']
    },
    {
      id: 'assignedTo',
      label: 'Assigned To',
      options: ['Amit Verma', 'Neha Singh', 'Rohit Jain', 'Pooja Mehta']
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilterValues(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilterValues({ projectType: '', source: '', status: '', assignedTo: '' });
    setSearchQuery('');
  };

  // Filtered leads
  const filteredLeads = leadsList.filter(lead => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = lead.clientName.toLowerCase().includes(q) ||
                    lead.company.toLowerCase().includes(q) ||
                    lead.email.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab !== 'all' && lead.status.toLowerCase() !== activeTab) {
      return false;
    }
    if (filterValues.projectType && lead.projectType !== filterValues.projectType) return false;
    if (filterValues.source && lead.source !== filterValues.source) return false;
    if (filterValues.status && lead.status !== filterValues.status) return false;
    if (filterValues.assignedTo && lead.assignedTo !== filterValues.assignedTo) return false;
    return true;
  });

  const columns = [
    {
      header: 'Client Name',
      key: 'clientName',
      render: (row) => {
        const initials = row.clientName.split(' ').map(n => n[0]).join('').slice(0, 2);
        const bgColors = ['bg-purple-600', 'bg-blue-600', 'bg-orange-500', 'bg-emerald-600', 'bg-rose-500'];
        const color = bgColors[Math.abs(row.clientName.length) % bgColors.length];
        return (
          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <div className={`w-7 h-7 rounded-full ${color} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}>
              {initials}
            </div>
            <div className="whitespace-nowrap">
              <p className="font-bold text-slate-900 leading-tight">{row.clientName}</p>
              <p className="text-[10px] text-slate-500">{row.company}</p>
            </div>
          </div>
        );
      }
    },
    {
      header: 'Contact Details',
      key: 'phone',
      render: (row) => (
        <div className="whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Phone size={10} className="text-slate-400 shrink-0" />
            <span>{row.phone}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mt-0.5">
            <Mail size={10} className="text-slate-400 shrink-0" />
            <span>{row.email}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Project Type',
      key: 'projectType',
      render: (row) => <span className="font-medium text-slate-700 whitespace-nowrap">{row.projectType}</span>
    },
    {
      header: 'Budget',
      key: 'budget',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-900">{formatCurrencyINR(row.budget, true)}</span>
    },
    {
      header: 'Source',
      key: 'source',
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
          <span className="text-slate-600 font-medium">{row.source}</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Assigned To',
      key: 'assignedTo',
      render: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <img
            src={row.assignedAvatar}
            alt={row.assignedTo}
            className="w-6 h-6 rounded-full object-cover shrink-0 aspect-square ring-1 ring-slate-200"
          />
          <span className="text-slate-800 font-medium whitespace-nowrap">{row.assignedTo}</span>
        </div>
      )
    },
    {
      header: 'Follow Up',
      key: 'followUp',
      render: (row) => <span className="text-[11px] text-slate-600 whitespace-nowrap">{row.followUp}</span>
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToast({ title: 'Calling Lead', message: `Initiating call to ${row.clientName} (${row.phone})`, type: 'info' });
            }}
            className="p-1 hover:text-blue-600 hover:bg-slate-100 rounded"
            title="Call"
          >
            <Phone size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedLead(row);
              setIsDetailOpen(true);
            }}
            className="p-1 hover:text-slate-700 hover:bg-slate-100 rounded"
            title="More Options"
          >
            <MoreVertical size={13} />
          </button>
        </div>
      )
    }
  ];

  // Charts mock datasets for Screen 010 bottom row
  const leadSourcesData = [
    { name: 'Website', value: 28, color: '#1D5DF0' },
    { name: 'Google Ads', value: 22, color: '#F97316' },
    { name: 'Referral', value: 18, color: '#16A34A' },
    { name: 'Social Media', value: 15, color: '#7C3AED' },
    { name: 'Direct Call', value: 12, color: '#0EA5E9' },
    { name: 'Others', value: 5, color: '#94A3B8' }
  ];

  const projectTypeDist = [
    { type: 'Residential', value: 32 },
    { type: 'Commercial', value: 28 },
    { type: 'Industrial', value: 12 },
    { type: 'Renovation', value: 10 },
    { type: 'Interior', value: 10 },
    { type: 'Other', value: 8 }
  ];

  const monthlyLeadsTrend = [
    { month: 'Jan', leads: 20 },
    { month: 'Feb', leads: 28 },
    { month: 'Mar', leads: 40 },
    { month: 'Apr', leads: 62 },
    { month: 'May', leads: 55 },
    { month: 'Jun', leads: 70 }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 010) */}
      <HeroBanner
        title="Leads & Enquiries"
        subtitle="Manage and track all your construction project enquiries from first contact to client conversion."
        actionButton={
          <button
            onClick={() => setIsAddLeadModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/30 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Lead</span>
          </button>
        }
        extraRight={
          <div className="hidden sm:flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-slate-800 leading-tight">Convert More Leads</p>
              <p className="text-[10px] text-slate-400">Turn enquiries into successful projects</p>
            </div>
          </div>
        }
      />

      {/* 5 KPI Stat Cards - Responsive 2-col on mobile, 3-col on tablet, 5-col on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={UserPlus}
          iconBg="bg-orange-500"
          value="186"
          label="Total Enquiries"
          delta="12% this month"
          isPositive={true}
        />
        <StatCard
          icon={Users}
          iconBg="bg-blue-600"
          value="42"
          label="New Leads"
          delta="8% this month"
          isPositive={true}
        />
        <StatCard
          icon={Target}
          iconBg="bg-purple-600"
          value="28"
          label="Qualified Leads"
          delta="16% this month"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value="18"
          label="Converted to Clients"
          delta="24% this month"
          isPositive={true}
        />
        <StatCard
          icon={Percent}
          iconBg="bg-amber-500"
          value="25%"
          label="Conversion Rate"
          delta="6% increase"
          isPositive={true}
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* Status Tabs */}
      <StatusTabs
        tabs={statusTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search leads, clients, company..."
        filters={filterConfigs}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Main Grid: Data Table + Detail Drawer Panel */}
      <div className="flex flex-col lg:flex-row items-start gap-4">
        {/* Table Area */}
        <div className="flex-1 w-full min-w-0">
          <DataTable
            columns={columns}
            data={filteredLeads}
            selectedRowId={selectedLead?.id}
            onRowClick={(row) => {
              setSelectedLead(row);
              setIsDetailOpen(true);
            }}
            entityName="leads"
          />
        </div>

        {/* Right Sticky Detail Panel (Screen 010 signature pattern) */}
        {selectedLead && isDetailOpen && (
          <DetailDrawerPanel
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            title={selectedLead.clientName}
            subtitle={selectedLead.company}
            statusBadge={<StatusBadge status={selectedLead.status} />}
            tabs={[
              { id: 'overview', label: 'Overview' },
              { id: 'followups', label: 'Follow Ups' },
              { id: 'notes', label: 'Notes' },
              { id: 'documents', label: 'Documents' }
            ]}
            quickActions={
              <>
                <button
                  onClick={() => setIsConvertModalOpen(true)}
                  className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Users size={12} />
                  <span>Convert to Client</span>
                </button>
                <button
                  onClick={() => {
                    addToast({ title: 'Create Project', message: `Creating project from lead: ${selectedLead.clientName}`, type: 'success' });
                    onNavigate('projects');
                  }}
                  className="py-2 px-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <FolderGit2 size={12} />
                  <span>Create Project</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Quotation', message: `Generating quotation for ${selectedLead.clientName}...`, type: 'info' })}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <FileText size={12} />
                  <span>Create Quotation</span>
                </button>
                <button
                  onClick={() => addToast({ title: 'Schedule Meeting', message: `Opening meeting calendar with ${selectedLead.clientName}`, type: 'info' })}
                  className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Calendar size={12} />
                  <span>Schedule Meeting</span>
                </button>
              </>
            }
          >
            {(currentTab) => {
              if (currentTab === 'overview') {
                return (
                  <div className="space-y-4">
                    {/* Contact Info Card */}
                    <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Contact Information</h4>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => addToast({ title: 'WhatsApp', message: `Opening WhatsApp chat with ${selectedLead.phone}`, type: 'success' })}
                            className="p-1 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            title="WhatsApp"
                          >
                            <MessageCircle size={13} />
                          </button>
                          <button
                            onClick={() => addToast({ title: 'Calling Lead', message: `Calling ${selectedLead.phone}`, type: 'info' })}
                            className="p-1 rounded bg-blue-50 text-blue-600 hover:bg-blue-100"
                            title="Call"
                          >
                            <Phone size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-slate-700">
                          <Phone size={12} className="text-slate-400" />
                          <span>{selectedLead.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Mail size={12} className="text-slate-400" />
                          <span>{selectedLead.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <MapPin size={12} className="text-slate-400" />
                          <span>{selectedLead.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700">
                          <Building2 size={12} className="text-slate-400" />
                          <span>{selectedLead.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Project Details</h4>
                      <div className="grid grid-cols-2 gap-2 bg-white border border-slate-200 rounded-lg p-2.5 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block">Project Type</span>
                          <span className="font-semibold text-slate-800">{selectedLead.projectType}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block">Estimated Budget</span>
                          <span className="font-bold text-blue-600">{formatCurrencyINR(selectedLead.budget, true)}</span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Expected Start Date</span>
                          <span className="font-semibold text-slate-700">{selectedLead.expectedStart}</span>
                        </div>
                        <div className="pt-1.5 border-t border-slate-100">
                          <span className="text-[10px] text-slate-400 block">Source</span>
                          <span className="font-semibold text-slate-700">{selectedLead.source}</span>
                        </div>
                      </div>
                    </div>

                    {/* Follow Up Timeline */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Follow Up Timeline</h4>
                        <button
                          onClick={() => addToast({ title: 'Add Follow-up', message: 'Scheduling new follow-up reminder...', type: 'info' })}
                          className="text-[10px] text-blue-600 hover:underline font-semibold"
                        >
                          + Add Follow Up
                        </button>
                      </div>

                      <div className="space-y-3 relative before:absolute before:inset-0 before:left-2 before:w-0.5 before:bg-slate-200 before:top-2 before:bottom-2">
                        <div className="relative flex items-start gap-2.5 pl-1">
                          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-white z-10 shrink-0 mt-0.5"></div>
                          <div>
                            <p className="font-semibold text-slate-800 text-[11px]">Initial Enquiry Received</p>
                            <p className="text-[10px] text-slate-400">from Website • 15 Oct 2026 10:30 AM</p>
                          </div>
                        </div>

                        <div className="relative flex items-start gap-2.5 pl-1">
                          <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white z-10 shrink-0 mt-0.5"></div>
                          <div>
                            <p className="font-semibold text-slate-800 text-[11px]">Call with Client</p>
                            <p className="text-[10px] text-slate-400">Discussed requirements • 16 Oct 2026 02:15 PM</p>
                          </div>
                        </div>

                        <div className="relative flex items-start gap-2.5 pl-1">
                          <div className="w-3.5 h-3.5 rounded-full bg-orange-500 ring-2 ring-white z-10 shrink-0 mt-0.5"></div>
                          <div>
                            <p className="font-semibold text-slate-800 text-[11px]">Site Visit Scheduled</p>
                            <p className="text-[10px] text-slate-400">Client visit planned • 19 Oct 2026 10:00 AM</p>
                          </div>
                        </div>

                        <div className="relative flex items-start gap-2.5 pl-1">
                          <div className="w-3.5 h-3.5 rounded-full bg-slate-300 ring-2 ring-white z-10 shrink-0 mt-0.5"></div>
                          <div>
                            <p className="font-semibold text-slate-700 text-[11px]">Proposal to be sent</p>
                            <p className="text-[10px] text-slate-400">Send detailed quotation • 21 Oct 2026 11:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div className="text-center py-8 text-slate-400">
                  <p>Viewing {currentTab} for {selectedLead.clientName}</p>
                </div>
              );
            }}
          </DetailDrawerPanel>
        )}
      </div>

      {/* Bottom Charts Row (Screen 010) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Lead Sources Donut */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Lead Sources</h3>
          <div className="relative h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadSourcesData} innerRadius={48} outerRadius={68} paddingAngle={2} dataKey="value">
                  {leadSourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-extrabold text-slate-900 leading-none">186</span>
              <span className="text-[9px] text-slate-400 font-medium">Total Leads</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] pt-1 border-t border-slate-100">
            {leadSourcesData.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></span>
                  {s.name}
                </span>
                <span className="font-semibold text-slate-800">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Type Distribution Bars */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Project Type Distribution</h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTypeDist} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="type" tick={{ fontSize: 9, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#1D5DF0" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#0f172a', fontSize: 10, fontWeight: 'bold' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Leads Trend */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-800 text-sm">Monthly Leads Trend</h3>
            <span className="text-[10px] text-slate-400 font-semibold">This Year</span>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyLeadsTrend} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke="#F97316" strokeWidth={2.5} dot={{ r: 4, fill: '#F97316' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Convert to Client Confirmation Modal */}
      <ConfirmDialog
        isOpen={isConvertModalOpen}
        onClose={() => setIsConvertModalOpen(false)}
        onConfirm={() => {
          addToast({
            title: 'Lead Converted!',
            message: `${selectedLead?.clientName} (${selectedLead?.company}) has been converted into an Active Client.`,
            type: 'success'
          });
          onNavigate('clients');
        }}
        title="Convert Lead to Client"
        message={`Are you sure you want to convert "${selectedLead?.clientName}" from "${selectedLead?.company}" to a Client record? This will create an active client account and client code.`}
        confirmText="Convert to Client"
        type="success"
      />

      {/* Add Lead Responsive Popup Modal */}
      {isAddLeadModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl p-4 sm:p-5 space-y-4 my-auto animate-in fade-in-50 zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center">
                  <UserPlus size={16} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Create New Project Lead</h3>
                  <p className="text-[11px] text-slate-500">Record an inbound enquiry into the CRM pipeline</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddLeadModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Client Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Agarwal"
                    value={newLead.clientName}
                    onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Agarwal Builders & Infra"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Phone Number (+91) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 XXXXX"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="client@company.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Project Type
                  </label>
                  <select
                    value={newLead.projectType}
                    onChange={(e) => setNewLead({ ...newLead, projectType: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Industrial</option>
                    <option>Renovation</option>
                    <option>Interior Fit-out</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Estimated Budget (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 5000000"
                    value={newLead.budget}
                    onChange={(e) => setNewLead({ ...newLead, budget: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Lead Source
                  </label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option>Website</option>
                    <option>Google Ads</option>
                    <option>Referral</option>
                    <option>Instagram</option>
                    <option>Direct Call</option>
                    <option>LinkedIn</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Assign Project Manager
                  </label>
                  <select
                    value={newLead.assignedTo}
                    onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option>Amit Verma</option>
                    <option>Neha Singh</option>
                    <option>Rohit Jain</option>
                    <option>Pooja Mehta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Project Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mansarovar, Jaipur"
                    value={newLead.location}
                    onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Target Start Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 15 Nov 2026"
                    value={newLead.expectedStart}
                    onChange={(e) => setNewLead({ ...newLead, expectedStart: e.target.value })}
                    className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Scope of Work & Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Client requirements, architectural specifications, or site survey notes..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full p-2 bg-slate-50/50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-blue-500 focus:outline-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddLeadModalOpen(false)}
                  className="py-1.5 px-3.5 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Save & Create Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
