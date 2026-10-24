import React, { useState } from 'react';
import {
  FolderGit2,
  Hammer,
  CheckCircle2,
  PauseCircle,
  Clock,
  Plus,
  Eye,
  Edit2,
  MoreVertical,
  Calendar,
  Building2,
  MapPin,
  CheckSquare,
  FileText,
  Upload,
  User,
  LayoutGrid,
  List,
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
import { projectsData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function ProjectsView({ onAddNew, onNavigate }) {
  const { addToast } = useToast();
  const [projectsList, setProjectsList] = useState(projectsData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
  const [searchQuery, setSearchQuery] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedProject, setSelectedProject] = useState(projectsData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    type: 'Residential',
    location: '',
    budget: '',
    startDate: '',
    endDate: '',
    manager: 'Rajesh Sharma',
    notes: ''
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim() || !newProject.client.trim()) {
      addToast({
        title: 'Required Fields Missing',
        message: 'Please provide both Project Name and Client Name.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `PRJ-${String(projectsList.length + 1).padStart(3, '0')}`,
      code: `BLD-2026-${String(projectsList.length + 1).padStart(3, '0')}`,
      name: newProject.name.trim(),
      client: newProject.client.trim(),
      type: newProject.type,
      location: newProject.location.trim() || 'Jaipur, Rajasthan',
      startDate: newProject.startDate || '01 Nov 2026',
      endDate: newProject.endDate || '31 Dec 2027',
      budget: parseFloat(newProject.budget) || 25000000,
      spent: 0,
      progress: 0,
      status: 'Planning',
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=200&auto=format&fit=crop&q=80',
      manager: newProject.manager
    };

    setProjectsList([created, ...projectsList]);
    setSelectedProject(created);
    setIsAddModalOpen(false);
    setNewProject({
      name: '',
      client: '',
      type: 'Residential',
      location: '',
      budget: '',
      startDate: '',
      endDate: '',
      manager: 'Rajesh Sharma',
      notes: ''
    });
    addToast({
      title: 'Project Added Successfully',
      message: `${created.name} (${created.code}) created and added to pipeline.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Projects', count: 24 },
    { id: 'ongoing', label: 'Ongoing', count: 12 },
    { id: 'planning', label: 'Planning', count: 4 },
    { id: 'completed', label: 'Completed', count: 8 },
    { id: 'on hold', label: 'On Hold', count: 3 },
    { id: 'delayed', label: 'Delayed', count: 1 }
  ];

  const filterConfigs = [
    {
      id: 'client',
      label: 'Client',
      options: ['RK Constructions', 'Mehta Developers', 'Sharma Builders', 'Green Infra Pvt Ltd', 'Skyline Projects']
    },
    {
      id: 'type',
      label: 'Project Type',
      options: ['Residential', 'Commercial', 'Industrial', 'Hospitality']
    },
    {
      id: 'location',
      label: 'Location',
      options: ['Jaipur', 'Tonk', 'Ajmer', 'Udaipur', 'Kishangarh']
    }
  ];

  const filteredProjects = projectsList.filter(p => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = p.name.toLowerCase().includes(q) ||
                    p.code.toLowerCase().includes(q) ||
                    p.client.toLowerCase().includes(q) ||
                    p.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab !== 'all' && p.status.toLowerCase() !== activeTab) return false;
    if (clientFilter && p.client !== clientFilter) return false;
    if (typeFilter && p.type !== typeFilter) return false;
    if (locationFilter && !p.location.includes(locationFilter)) return false;
    return true;
  });

  const columns = [
    {
      header: 'Project Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.image} alt={row.name} className="w-9 h-9 rounded-lg object-cover ring-1 ring-slate-200 shrink-0" />
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-500">{row.code}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Client',
      key: 'client',
      render: (row) => <span className="text-slate-700 font-medium">{row.client}</span>
    },
    {
      header: 'Type',
      key: 'type',
      render: (row) => <span className="text-slate-600 font-medium">{row.type}</span>
    },
    {
      header: 'Location',
      key: 'location',
      render: (row) => (
        <div className="flex items-center gap-1 text-slate-600">
          <MapPin size={11} className="text-slate-400 shrink-0" />
          <span className="truncate max-w-[100px]">{row.location}</span>
        </div>
      )
    },
    {
      header: 'Start Date',
      key: 'startDate',
      render: (row) => <span className="text-[11px] text-slate-600 whitespace-nowrap">{row.startDate}</span>
    },
    {
      header: 'End Date',
      key: 'endDate',
      render: (row) => <span className="text-[11px] text-slate-600 whitespace-nowrap">{row.endDate}</span>
    },
    {
      header: 'Budget',
      key: 'budget',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-900">{formatCurrencyINR(row.budget, true)}</span>
    },
    {
      header: 'Progress',
      key: 'progress',
      render: (row) => (
        <div className="flex items-center gap-2 w-28">
          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.progress >= 100 ? 'bg-emerald-500' : row.progress > 50 ? 'bg-blue-600' : 'bg-orange-500'
              }`}
              style={{ width: `${row.progress}%` }}
            ></div>
          </div>
          <span className="text-[11px] font-bold text-slate-700 w-7 text-right">{row.progress}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProject(row);
              setIsDetailOpen(true);
            }}
            className="p-1 hover:text-blue-600 rounded"
            title="View Details"
          >
            <Eye size={13} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddNew();
            }}
            className="p-1 hover:text-slate-800 rounded"
            title="Edit Project"
          >
            <Edit2 size={13} />
          </button>
        </div>
      )
    }
  ];

  // Charts data for Screen 048 bottom row
  const typeDistribution = [
    { name: 'Residential', value: 42, color: '#1D5DF0' },
    { name: 'Commercial', value: 25, color: '#F97316' },
    { name: 'Industrial', value: 17, color: '#16A34A' },
    { name: 'Hospitality', value: 8, color: '#7C3AED' },
    { name: 'Infrastructure', value: 4, color: '#0EA5E9' },
    { name: 'Others', value: 4, color: '#94A3B8' }
  ];

  const statusOverview = [
    { status: 'Ongoing', count: 12, fill: '#1D5DF0' },
    { status: 'Planning', count: 4, fill: '#7C3AED' },
    { status: 'Completed', count: 8, fill: '#16A34A' },
    { status: 'On Hold', count: 3, fill: '#F97316' },
    { status: 'Delayed', count: 1, fill: '#DC2626' }
  ];

  const monthlyProgress = [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 4 },
    { month: 'Mar', count: 7 },
    { month: 'Apr', count: 10 },
    { month: 'May', count: 11 },
    { month: 'Jun', count: 13 },
    { month: 'Jul', count: 14 },
    { month: 'Aug', count: 18 },
    { month: 'Sep', count: 20 },
    { month: 'Oct', count: 24 }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Header (Screen 048) */}
      <HeroBanner
        title="Projects"
        subtitle="Plan, track and manage all your construction projects from one central dashboard."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Project</span>
          </button>
        }
      />

      {/* 5 KPI Stat Cards - Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={FolderGit2}
          iconBg="bg-orange-500"
          value={String(projectsList.length)}
          label="Total Projects"
          delta="20% this month"
          isPositive={true}
        />
        <StatCard
          icon={Hammer}
          iconBg="bg-blue-600"
          value="12"
          label="Ongoing Projects"
          delta="33% this month"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value="8"
          label="Completed Projects"
          delta="14% this month"
          isPositive={true}
        />
        <StatCard
          icon={PauseCircle}
          iconBg="bg-rose-500"
          value="3"
          label="On Hold Projects"
          delta="25% this month"
          isPositive={false}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-purple-600"
          value="1"
          label="Delayed Project"
          delta="0% this month"
          isPositive={true}
          className="col-span-2 sm:col-span-1"
        />
      </div>

      {/* Status Tabs with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <StatusTabs
          tabs={statusTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs shrink-0">
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
              viewMode === 'list' ? 'bg-orange-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List size={13} />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
              viewMode === 'kanban' ? 'bg-orange-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={13} />
            <span>Kanban View</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search projects, client, location..."
        filters={filterConfigs}
        filterValues={{ client: clientFilter, type: typeFilter, location: locationFilter }}
        onFilterChange={(key, val) => {
          if (key === 'client') setClientFilter(val);
          if (key === 'type') setTypeFilter(val);
          if (key === 'location') setLocationFilter(val);
        }}
        onReset={() => {
          setSearchQuery('');
          setClientFilter('');
          setTypeFilter('');
          setLocationFilter('');
        }}
        onExport={() => addToast({ title: 'Exporting Projects', message: 'Downloading projects report in Excel format...', type: 'info' })}
      />

      {/* Main Content: List or Kanban */}
      {viewMode === 'list' ? (
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="flex-1 w-full min-w-0">
            <DataTable
              columns={columns}
              data={filteredProjects}
              selectedRowId={selectedProject?.id}
              onRowClick={(row) => {
                setSelectedProject(row);
                setIsDetailOpen(true);
              }}
              entityName="projects"
            />
          </div>

          {/* Right Detail Panel (Screen 048 signature pattern) */}
          {selectedProject && isDetailOpen && (
            <DetailDrawerPanel
              isOpen={isDetailOpen}
              onClose={() => setIsDetailOpen(false)}
              title={selectedProject.name}
              subtitle={`${selectedProject.code} | ${selectedProject.type} Project`}
              avatar={selectedProject.image}
              statusBadge={<StatusBadge status={selectedProject.status} />}
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'tasks', label: 'Tasks (12)' },
                { id: 'milestones', label: 'Milestones (8)' },
                { id: 'documents', label: 'Documents (24)' },
                { id: 'team', label: 'Team (6)' }
              ]}
              quickActions={
                <>
                  <button
                    onClick={() => {
                      addToast({ title: 'Add Task', message: `Opening new task for ${selectedProject.name}`, type: 'info' });
                      onNavigate('tasks');
                    }}
                    className="py-2 px-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Plus size={12} />
                    <span>Add Task</span>
                  </button>
                  <button
                    onClick={() => onNavigate('milestones')}
                    className="py-2 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <CheckSquare size={12} />
                    <span>Add Milestone</span>
                  </button>
                  <button
                    onClick={() => addToast({ title: 'Upload Document', message: 'Select project blueprint / drawing', type: 'info' })}
                    className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <Upload size={12} />
                    <span>Upload Document</span>
                  </button>
                  <button
                    onClick={() => addToast({ title: 'Work Order', message: `Creating site work order for ${selectedProject.name}`, type: 'info' })}
                    className="py-2 px-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                  >
                    <FileText size={12} />
                    <span>Create Work Order</span>
                  </button>
                </>
              }
            >
              {(currentTab) => (
                <div className="space-y-4">
                  {/* Hero Thumbnail in Drawer */}
                  <div className="w-full h-32 rounded-xl overflow-hidden relative shadow-xs">
                    <img src={selectedProject.image} alt={selectedProject.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-2.5">
                      <div className="text-white">
                        <p className="font-bold text-xs">{selectedProject.name}</p>
                        <p className="text-[10px] text-slate-300 flex items-center gap-1">
                          <MapPin size={10} /> {selectedProject.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Project Progress Card */}
                  <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/90 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">Project Progress</span>
                      <span className="font-extrabold text-blue-600 text-sm">{selectedProject.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedProject.progress}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>Started: {selectedProject.startDate}</span>
                      <span>Target: {selectedProject.endDate}</span>
                    </div>
                  </div>

                  {/* Financial Mini Strip */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 bg-white border border-slate-200 rounded-lg shadow-2xs">
                      <p className="text-[10px] text-slate-400">Budget</p>
                      <p className="font-bold text-slate-900 mt-0.5">{formatCurrencyINR(selectedProject.budget, true)}</p>
                    </div>
                    <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-[10px] text-orange-600">Spent</p>
                      <p className="font-bold text-orange-700 mt-0.5">{formatCurrencyINR(selectedProject.spent, true)}</p>
                    </div>
                    <div className="p-2 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-[10px] text-blue-600">Remaining</p>
                      <p className="font-bold text-blue-700 mt-0.5">{formatCurrencyINR(selectedProject.remaining, true)}</p>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="space-y-2 bg-white border border-slate-200 rounded-xl p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project Information</span>
                      <button onClick={onAddNew} className="text-[10px] text-blue-600 font-semibold hover:underline">Edit</button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Client</span>
                        <span className="font-semibold text-slate-800">{selectedProject.client}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Project Manager</span>
                        <span className="font-semibold text-slate-800 flex items-center gap-1">
                          <User size={10} className="text-blue-600" /> {selectedProject.projectManager}
                        </span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 pt-1.5 border-t border-slate-100">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Upcoming Milestones */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Upcoming Milestones</span>
                      <span onClick={() => onNavigate('milestones')} className="text-[10px] text-blue-600 cursor-pointer hover:underline font-semibold">View All &rarr;</span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                          <div>
                            <p className="font-bold text-slate-800 text-[11px]">Structure Completion - Tower A</p>
                            <p className="text-[10px] text-slate-400">14 Oct 2026</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">In 3 Days</span>
                      </div>

                      <div className="p-2 rounded-lg border border-slate-200 bg-white flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <div>
                            <p className="font-bold text-slate-800 text-[11px]">Foundation Work - Phase 2</p>
                            <p className="text-[10px] text-slate-400">20 Oct 2026</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">In 9 Days</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DetailDrawerPanel>
          )}
        </div>
      ) : (
        /* Kanban View (Screen 048 alternate) */
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Planning', 'Ongoing', 'On Hold', 'Completed'].map((columnStatus) => {
            const colProjects = projectsData.filter(p => p.status.toLowerCase() === columnStatus.toLowerCase());
            let headerBg = 'bg-blue-50 border-blue-200 text-blue-800';
            if (columnStatus === 'Completed') headerBg = 'bg-emerald-50 border-emerald-200 text-emerald-800';
            if (columnStatus === 'On Hold') headerBg = 'bg-orange-50 border-orange-200 text-orange-800';
            if (columnStatus === 'Planning') headerBg = 'bg-purple-50 border-purple-200 text-purple-800';

            return (
              <div key={columnStatus} className="bg-slate-100/70 rounded-xl p-3 border border-slate-200/80 flex flex-col gap-2.5 min-h-[500px]">
                <div className={`p-2 rounded-lg border flex items-center justify-between font-bold text-xs ${headerBg}`}>
                  <span>{columnStatus}</span>
                  <span className="bg-white/80 px-2 py-0.5 rounded-full text-[10px] font-extrabold">{colProjects.length}</span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {colProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProject(p);
                        setIsDetailOpen(true);
                        setViewMode('list');
                      }}
                      className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover-lift cursor-pointer space-y-2"
                    >
                      <img src={p.image} alt={p.name} className="w-full h-24 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-900 text-xs leading-tight">{p.name}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">{p.client}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-extrabold text-blue-600">{formatCurrencyINR(p.budget, true)}</span>
                        <span className="text-[10px] font-bold text-slate-600">{p.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Charts Row (Screen 048) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Project Type Distribution Donut */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Project Type Distribution</h3>
          <div className="relative h-40 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={typeDistribution} innerRadius={48} outerRadius={68} paddingAngle={2} dataKey="value">
                  {typeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-base font-extrabold text-slate-900 leading-none">24</span>
              <span className="text-[9px] text-slate-400 font-medium">Projects</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] pt-1 border-t border-slate-100">
            {typeDistribution.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </span>
                <span className="font-semibold text-slate-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Status Overview Bars */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <h3 className="font-bold text-slate-800 text-sm mb-1">Project Status Overview</h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusOverview} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="status" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} label={{ position: 'top', fill: '#0f172a', fontSize: 10, fontWeight: 'bold' }}>
                  {statusOverview.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Project Progress Line */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-800 text-sm">Monthly Project Progress</h3>
            <span className="text-[10px] text-slate-400 font-semibold">Active Timeline</span>
          </div>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProgress} margin={{ top: 15, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#1D5DF0" strokeWidth={2.5} dot={{ r: 4, fill: '#1D5DF0' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Add Project Responsive Modal Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <FolderGit2 size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Create New Project</h3>
                  <p className="text-[11px] text-slate-500">Add a new construction site and project scope</p>
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
            <form onSubmit={handleCreateProject} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Palms Residency Phase II"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. RK Constructions"
                    value={newProject.client}
                    onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Type
                  </label>
                  <select
                    value={newProject.type}
                    onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="Infrastructure">Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Estimated Budget (INR)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 25000000"
                    value={newProject.budget}
                    onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Site Location / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mansarovar, Jaipur"
                    value={newProject.location}
                    onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newProject.startDate}
                    onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Completion Date
                  </label>
                  <input
                    type="date"
                    value={newProject.endDate}
                    onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Manager
                  </label>
                  <select
                    value={newProject.manager}
                    onChange={(e) => setNewProject({ ...newProject, manager: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Rajesh Sharma">Rajesh Sharma (Sr. Project Manager)</option>
                    <option value="Amit Verma">Amit Verma (Civil Engineer)</option>
                    <option value="Neha Singh">Neha Singh (Architectural Lead)</option>
                    <option value="Rohit Jain">Rohit Jain (Operations Lead)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Scope of Work & Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter project specifications, initial permits, structural details..."
                    value={newProject.notes}
                    onChange={(e) => setNewProject({ ...newProject, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                  />
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
                  <span>Create Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
