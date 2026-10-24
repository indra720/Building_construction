import React, { useState } from 'react';
import {
  Users,
  ShieldCheck,
  UserPlus,
  Key,
  Check,
  X,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  Lock,
  Edit2
} from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function UsersRolesView() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Initial mock users list
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
      name: 'Kamlesh Sharma',
      email: 'kamlesh.sharma@buildproerp.com',
      phone: '+91 98765 43210',
      role: 'Super Admin',
      department: 'Executive Management',
      status: 'Active',
      lastLogin: '24 Oct 2026 05:45 PM',
      assignedSites: 'All Sites (Corporate)',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'USR-002',
      name: 'Amit Verma',
      email: 'amit.verma@buildproerp.com',
      phone: '+91 98765 43211',
      role: 'Project Manager',
      department: 'Civil Engineering',
      status: 'Active',
      lastLogin: '24 Oct 2026 04:30 PM',
      assignedSites: 'Skyline Residency',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'USR-003',
      name: 'Neha Singh',
      email: 'neha.singh@buildproerp.com',
      phone: '+91 98765 43212',
      role: 'Project Manager',
      department: 'Planning & Estimation',
      status: 'Active',
      lastLogin: '24 Oct 2026 03:15 PM',
      assignedSites: 'Green Valley Villas',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'USR-004',
      name: 'Rohit Jain',
      email: 'rohit.jain@buildproerp.com',
      phone: '+91 98765 43213',
      role: 'Store Keeper',
      department: 'Materials & Procurement',
      status: 'Active',
      lastLogin: '24 Oct 2026 01:20 PM',
      assignedSites: 'City Center Mall',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'USR-005',
      name: 'Pooja Mehta',
      email: 'pooja.mehta@buildproerp.com',
      phone: '+91 98765 43214',
      role: 'Senior Accountant',
      department: 'Finance & Taxation',
      status: 'Active',
      lastLogin: '24 Oct 2026 11:50 AM',
      assignedSites: 'All Sites (Corporate)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 'USR-006',
      name: 'Vikram Joshi',
      email: 'vikram.joshi@buildproerp.com',
      phone: '+91 98765 43215',
      role: 'Site Engineer',
      department: 'Field Supervision',
      status: 'Inactive',
      lastLogin: '18 Oct 2026 06:10 PM',
      assignedSites: 'River View Apts',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80'
    }
  ]);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Project Manager',
    assignedSites: 'Skyline Residency'
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) {
      addToast({ title: 'Validation Error', message: 'Please provide user name and email.', type: 'error' });
      return;
    }
    const created = {
      id: `USR-00${users.length + 1}`,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone || '+91 98765 00000',
      role: newUser.role,
      department: newUser.role === 'Project Manager' ? 'Operations' : 'Site Operations',
      status: 'Active',
      lastLogin: 'Never logged in',
      assignedSites: newUser.assignedSites,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
    };
    setUsers([created, ...users]);
    setIsInviteModalOpen(false);
    setNewUser({ name: '', email: '', phone: '', role: 'Project Manager', assignedSites: 'Skyline Residency' });
    addToast({
      title: 'User Invited!',
      message: `Invitation email with temporary credentials sent to ${created.email}`,
      type: 'success'
    });
  };

  const filteredUsers = users.filter((u) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (roleFilter !== 'All Roles' && u.role !== roleFilter) return false;
    return true;
  });

  const columns = [
    {
      header: 'User Name',
      key: 'name',
      render: (row) => (
        <div className="flex items-center gap-2.5 whitespace-nowrap">
          <img src={row.avatar} alt={row.name} className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200" />
          <div className="whitespace-nowrap">
            <p className="font-bold text-slate-900 leading-tight">{row.name}</p>
            <p className="text-[10px] text-slate-400">{row.id}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Contact Info',
      key: 'email',
      render: (row) => (
        <div className="whitespace-nowrap">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Mail size={10} className="text-slate-400 shrink-0" />
            <span>{row.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mt-0.5">
            <Phone size={10} className="text-slate-400 shrink-0" />
            <span>{row.phone}</span>
          </div>
        </div>
      )
    },
    {
      header: 'System Role',
      key: 'role',
      render: (row) => {
        const roleColors = {
          'Super Admin': 'bg-purple-100 text-purple-800 border-purple-200',
          'Project Manager': 'bg-blue-100 text-blue-800 border-blue-200',
          'Store Keeper': 'bg-orange-100 text-orange-800 border-orange-200',
          'Senior Accountant': 'bg-emerald-100 text-emerald-800 border-emerald-200',
          'Site Engineer': 'bg-amber-100 text-amber-800 border-amber-200'
        };
        const cls = roleColors[row.role] || 'bg-slate-100 text-slate-700 border-slate-200';
        return (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-bold text-[10px] border whitespace-nowrap ${cls}`}>
            <ShieldCheck size={11} />
            <span>{row.role}</span>
          </span>
        );
      }
    },
    {
      header: 'Assigned Site',
      key: 'assignedSites',
      render: (row) => (
        <div className="flex items-center gap-1.5 text-slate-700 whitespace-nowrap">
          <Building size={11} className="text-slate-400 shrink-0" />
          <span>{row.assignedSites}</span>
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    },
    {
      header: 'Last Login',
      key: 'lastLogin',
      render: (row) => <span className="text-slate-500 text-[11px] whitespace-nowrap">{row.lastLogin}</span>
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'center',
      render: (row) => (
        <div className="flex items-center justify-center gap-1.5 text-slate-400">
          <button
            onClick={() => addToast({ title: 'Edit User Permissions', message: `Opening permissions dialog for ${row.name}`, type: 'info' })}
            className="p-1 hover:text-blue-600 hover:bg-slate-100 rounded transition-colors"
            title="Edit Permissions"
          >
            <Edit2 size={13} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4 text-xs">
      <HeroBanner
        title="Users & Roles Permissions"
        subtitle="Manage ERP user accounts, role-based access control (RBAC), and site assignment permissions."
        actionButton={
          <button
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <UserPlus size={14} />
            <span>Invite New User</span>
          </button>
        }
      />

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={Users}
          iconBg="bg-blue-600"
          value="24"
          label="Total System Users"
          delta="3 invited this month"
          isPositive={true}
        />
        <StatCard
          icon={ShieldCheck}
          iconBg="bg-purple-600"
          value="4"
          label="Super Admins"
          delta="Full control"
          isPositive={true}
        />
        <StatCard
          icon={Building}
          iconBg="bg-emerald-600"
          value="8"
          label="Project Managers"
          delta="Site supervisors"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-amber-500"
          value="18"
          label="Active Sessions Today"
          delta="High engagement"
          isPositive={true}
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-3.5 py-1.5 rounded-lg transition-all ${
            activeTab === 'users'
              ? 'bg-orange-500 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          User Roster ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-3.5 py-1.5 rounded-lg transition-all ${
            activeTab === 'matrix'
              ? 'bg-orange-500 text-white shadow-xs font-bold'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          Role Permissions Matrix
        </button>
      </div>

      {/* Tab 1: User Roster */}
      {activeTab === 'users' && (
        <div className="space-y-3">
          {/* Filter Bar */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/90 shadow-card flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search user, email or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="py-1.5 px-3 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs font-medium focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option>All Roles</option>
                <option>Super Admin</option>
                <option>Project Manager</option>
                <option>Store Keeper</option>
                <option>Senior Accountant</option>
                <option>Site Engineer</option>
              </select>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredUsers}
            entityName="system users"
          />
        </div>
      )}

      {/* Tab 2: Role Permissions Matrix */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">RBAC Role Permissions Matrix</h3>
            <p className="text-slate-500 text-[11px]">Granular privileges per module for each organizational role.</p>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full min-w-[750px] text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-3">ERP Module</th>
                  <th className="py-2.5 px-3 text-center">Super Admin</th>
                  <th className="py-2.5 px-3 text-center">Project Manager</th>
                  <th className="py-2.5 px-3 text-center">Store Keeper</th>
                  <th className="py-2.5 px-3 text-center">Accountant</th>
                  <th className="py-2.5 px-3 text-center">Site Engineer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {[
                  { module: 'Projects & Work Orders', sa: 'Full Access', pm: 'Create / Edit', sk: 'View Only', acc: 'View Only', se: 'View / Status' },
                  { module: 'Purchase Orders (PO)', sa: 'Full / Approve', pm: 'Create / Approve', sk: 'Create / View', acc: 'View / Audit', se: 'No Access' },
                  { module: 'Goods Received (GRN)', sa: 'Full Access', pm: 'Approve', sk: 'Create / Verify', acc: 'View Only', se: 'Verify Only' },
                  { module: 'Invoices & Client Billing', sa: 'Full Access', pm: 'View Only', sk: 'No Access', acc: 'Full Access', se: 'No Access' },
                  { module: 'Labour Muster Roll & Wages', sa: 'Full Access', pm: 'Approve Roll', sk: 'No Access', acc: 'Disburse Pay', se: 'Mark Attendance' },
                  { module: 'Equipment & Machinery', sa: 'Full Access', pm: 'Assign Site', sk: 'Log Fuel', acc: 'Audit Assets', se: 'Log Fuel' },
                  { module: 'System Configurations', sa: 'Full Access', pm: 'No Access', sk: 'No Access', acc: 'No Access', se: 'No Access' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-bold text-slate-800">{row.module}</td>
                    <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold text-[10px]">{row.sa}</span></td>
                    <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">{row.pm}</span></td>
                    <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-bold text-[10px]">{row.sk}</span></td>
                    <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">{row.acc}</span></td>
                    <td className="py-2.5 px-3 text-center"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[10px]">{row.se}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite User Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md p-5 space-y-4 animate-in fade-in-50 zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <UserPlus size={16} className="text-orange-500" />
                <span>Invite New ERP User</span>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="e.g. rahul.sharma@buildproerp.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91 98765 XXXXX"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Assign Role</label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option>Project Manager</option>
                    <option>Store Keeper</option>
                    <option>Senior Accountant</option>
                    <option>Site Engineer</option>
                    <option>Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Assigned Site</label>
                  <select
                    value={newUser.assignedSites}
                    onChange={(e) => setNewUser({ ...newUser, assignedSites: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 text-xs font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                  >
                    <option>Skyline Residency</option>
                    <option>Green Valley Villas</option>
                    <option>City Center Mall</option>
                    <option>River View Apts</option>
                    <option>All Sites (Corporate)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="py-1.5 px-3 rounded-lg border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-1.5 px-4 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
