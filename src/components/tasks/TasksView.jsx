import React, { useState } from 'react';
import {
  CheckSquare,
  Clock,
  AlertCircle,
  Plus,
  List,
  LayoutGrid,
  Calendar as CalendarIcon,
  User,
  Building2,
  Calendar,
  CheckCircle2,
  MoreVertical,
  X
} from 'lucide-react';
import { tasksData } from '../../data/mockData';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import DetailDrawerPanel from '../common/DetailDrawerPanel';
import { StatusBadge, PriorityBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function TasksView({ onAddNew, onNavigate }) {
  const { addToast } = useToast();
  const [tasksList, setTasksList] = useState(tasksData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTask, setSelectedTask] = useState(tasksData[0]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '',
    project: 'Skyline Residency',
    category: 'Civil',
    priority: 'High',
    assignedTo: 'Amit Verma',
    dueDate: '',
    status: 'To Do',
    description: ''
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) {
      addToast({
        title: 'Title Required',
        message: 'Please provide a task title.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `TSK-2026-${String(tasksList.length + 1).padStart(3, '0')}`,
      title: newTask.title.trim(),
      project: newTask.project,
      priority: newTask.priority,
      status: newTask.status,
      assignedTo: newTask.assignedTo,
      assignedAvatar: newTask.assignedTo === 'Neha Singh'
        ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
        : newTask.assignedTo === 'Rohit Jain'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      dueDate: newTask.dueDate || '28 Oct 2026',
      progress: 0,
      category: newTask.category,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?w=200&auto=format&fit=crop&q=80'
    };

    setTasksList([created, ...tasksList]);
    setSelectedTask(created);
    setIsAddModalOpen(false);
    setNewTask({
      title: '',
      project: 'Skyline Residency',
      category: 'Civil',
      priority: 'High',
      assignedTo: 'Amit Verma',
      dueDate: '',
      status: 'To Do',
      description: ''
    });
    addToast({
      title: 'Task Created',
      message: `${created.title} added to ${created.project}.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Tasks', count: tasksList.length },
    { id: 'to do', label: 'To Do', count: tasksList.filter(t => t.status === 'To Do').length },
    { id: 'in progress', label: 'In Progress', count: tasksList.filter(t => t.status === 'In Progress').length },
    { id: 'review', label: 'Under Review', count: tasksList.filter(t => t.status === 'Review').length },
    { id: 'completed', label: 'Completed', count: tasksList.filter(t => t.status === 'Completed').length }
  ];

  const filteredTasks = tasksList.filter(t => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = t.title.toLowerCase().includes(q) ||
                    t.project.toLowerCase().includes(q) ||
                    t.assignedTo.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab !== 'all' && t.status.toLowerCase() !== activeTab) return false;
    return true;
  });

  const columns = [
    {
      header: 'Task Title',
      key: 'title',
      render: (row) => (
        <div className="flex items-center gap-2.5">
          <img src={row.image} alt={row.title} className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 shrink-0 aspect-square" />
          <div>
            <p className="font-bold text-slate-900 leading-tight">{row.title}</p>
            <p className="text-[10px] text-slate-500">{row.id} • {row.category}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Project',
      key: 'project',
      render: (row) => <span className="font-medium text-slate-700">{row.project}</span>
    },
    {
      header: 'Priority',
      key: 'priority',
      render: (row) => <PriorityBadge priority={row.priority} />
    },
    {
      header: 'Assigned To',
      key: 'assignedTo',
      render: (row) => (
        <div className="flex items-center gap-2">
          <img src={row.assignedAvatar} alt={row.assignedTo} className="w-6 h-6 rounded-full object-cover shrink-0 aspect-square ring-1 ring-slate-200" />
          <span className="text-slate-800 font-medium">{row.assignedTo}</span>
        </div>
      )
    },
    {
      header: 'Due Date',
      key: 'dueDate',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.dueDate}</span>
    },
    {
      header: 'Progress',
      key: 'progress',
      render: (row) => (
        <div className="flex items-center gap-2 w-24">
          <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full ${
                row.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'
              }`}
              style={{ width: `${row.progress}%` }}
            ></div>
          </div>
          <span className="text-[10px] font-bold text-slate-700">{row.progress}%</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  const kanbanColumns = ['To Do', 'In Progress', 'Review', 'Completed'];

  return (
    <div className="space-y-4">
      {/* Hero Header (Screen 044) */}
      <HeroBanner
        title="Tasks & Work Orders"
        subtitle="Manage daily construction tasks, work orders, milestones and contractor assignments."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Add Task</span>
          </button>
        }
      />

      {/* 4 StatCards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard
          icon={CheckSquare}
          iconBg="bg-blue-600"
          value={String(tasksList.length)}
          label="Total Tasks"
          delta="18 completed today"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-amber-500"
          value={String(tasksList.filter(t => t.status === 'In Progress').length)}
          label="In Progress"
          delta="Across 8 sites"
          isPositive={true}
        />
        <StatCard
          icon={AlertCircle}
          iconBg="bg-rose-500"
          value="14"
          label="High Priority Tasks"
          delta="Requires immediate action"
          isPositive={false}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value="94%"
          label="On-Time Completion"
          delta="3% vs last week"
          isPositive={true}
        />
      </div>

      {/* Tabs with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <StatusTabs
          tabs={statusTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 text-xs shrink-0">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
              viewMode === 'kanban' ? 'bg-orange-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid size={13} />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-semibold transition-all ${
              viewMode === 'list' ? 'bg-orange-500 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <List size={13} />
            <span>List View</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search task title, project, assignee..."
        onReset={() => setSearchQuery('')}
      />

      {/* Main View: Kanban Board or List */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
          {kanbanColumns.map((colName) => {
            const colTasks = tasksData.filter(t => t.status.toLowerCase() === colName.toLowerCase());
            let colHeaderColor = 'bg-blue-50 border-blue-200 text-blue-800';
            if (colName === 'Completed') colHeaderColor = 'bg-emerald-50 border-emerald-200 text-emerald-800';
            if (colName === 'Review') colHeaderColor = 'bg-purple-50 border-purple-200 text-purple-800';
            if (colName === 'To Do') colHeaderColor = 'bg-slate-100 border-slate-300 text-slate-800';

            return (
              <div key={colName} className="bg-slate-100/70 rounded-xl p-3 border border-slate-200/80 flex flex-col gap-2.5 min-h-[480px]">
                <div className={`p-2 rounded-lg border flex items-center justify-between font-bold text-xs ${colHeaderColor}`}>
                  <span>{colName}</span>
                  <span className="bg-white/90 px-2 py-0.5 rounded-full text-[10px] font-extrabold">{colTasks.length}</span>
                </div>

                <div className="space-y-2.5 flex-1 overflow-y-auto">
                  {colTasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => {
                        setSelectedTask(task);
                        setIsDetailOpen(true);
                      }}
                      className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover-lift cursor-pointer space-y-2.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-semibold text-slate-400">{task.id}</span>
                        <PriorityBadge priority={task.priority} />
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs leading-snug">{task.title}</h4>

                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Building2 size={11} className="text-slate-400 shrink-0" />
                        <span className="truncate">{task.project}</span>
                      </div>

                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            task.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <img src={task.assignedAvatar} alt={task.assignedTo} className="w-5 h-5 rounded-full object-cover shrink-0 aspect-square ring-1 ring-slate-200" />
                          <span>{task.assignedTo}</span>
                        </div>
                        <span className="font-medium text-slate-600">{task.dueDate}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setNewTask({ ...newTask, status: colName });
                    setIsAddModalOpen(true);
                  }}
                  className="w-full py-1.5 border border-dashed border-slate-300 hover:border-blue-400 hover:text-blue-600 rounded-lg text-slate-500 font-semibold text-xs flex items-center justify-center gap-1 bg-white/50 transition-colors cursor-pointer"
                >
                  <Plus size={12} />
                  <span>Add Task</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row items-start gap-4">
          <div className="flex-1 w-full min-w-0">
            <DataTable
              columns={columns}
              data={filteredTasks}
              selectedRowId={selectedTask?.id}
              onRowClick={(row) => {
                setSelectedTask(row);
                setIsDetailOpen(true);
              }}
              entityName="tasks"
            />
          </div>

          {selectedTask && isDetailOpen && (
            <DetailDrawerPanel
              isOpen={isDetailOpen}
              onClose={() => setIsDetailOpen(false)}
              title={selectedTask.title}
              subtitle={`${selectedTask.id} • ${selectedTask.project}`}
              statusBadge={<StatusBadge status={selectedTask.status} />}
              tabs={[
                { id: 'overview', label: 'Details' }
              ]}
            >
              {() => (
                <div className="space-y-3.5 text-xs">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Priority:</span>
                      <PriorityBadge priority={selectedTask.priority} />
                    </div>
                    <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                      <span className="text-slate-400">Assigned To:</span>
                      <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                        <img src={selectedTask.assignedAvatar} alt={selectedTask.assignedTo} className="w-5 h-5 rounded-full object-cover shrink-0 aspect-square ring-1 ring-slate-200" />
                        {selectedTask.assignedTo}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Due Date:</span>
                      <span className="font-semibold text-slate-700">{selectedTask.dueDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Category:</span>
                      <span className="font-semibold text-slate-700">{selectedTask.category}</span>
                    </div>
                  </div>
                </div>
              )}
            </DetailDrawerPanel>
          )}
        </div>
      )}

      {/* Add Task Responsive Modal Dialog */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <CheckSquare size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Create New Task</h3>
                  <p className="text-[11px] text-slate-500">Assign work order and milestone targets</p>
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
            <form onSubmit={handleCreateTask} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pouring slab concrete 4th floor"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project
                  </label>
                  <select
                    value={newTask.project}
                    onChange={(e) => setNewTask({ ...newTask, project: e.target.value })}
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
                    Work Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Civil">Civil Work</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Finishing">Finishing & Paint</option>
                    <option value="Safety">Safety & Quality</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Priority
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Initial Status
                  </label>
                  <select
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Under Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Assigned Engineer / Supervisor
                  </label>
                  <select
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Amit Verma">Amit Verma</option>
                    <option value="Neha Singh">Neha Singh</option>
                    <option value="Rohit Jain">Rohit Jain</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description & Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter work instructions, checklist items, safety requirements..."
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
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
                  <span>Create Task</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
