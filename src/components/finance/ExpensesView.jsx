import React, { useState } from 'react';
import { Wallet, Plus, Tag, Calendar, Building2, Download, X } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import StatusTabs from '../common/StatusTabs';
import FilterBar from '../common/FilterBar';
import DataTable from '../common/DataTable';
import { StatusBadge } from '../common/StatusBadge';
import { useToast } from '../common/Toast';

export default function ExpensesView() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const initialExpenses = [
    { id: 'EXP-2026-142', title: 'Ready Mix Concrete (RMC) M25 Grade', category: 'Materials', project: 'Skyline Residency', vendor: 'UltraTech Cement Ltd.', amount: 485000, date: '22 Oct 2026', paymentMode: 'Bank Transfer', status: 'Approved' },
    { id: 'EXP-2026-141', title: 'Site Labour Weekly Wage Payout', category: 'Labour', project: 'Skyline Residency', vendor: 'Direct Site Payout', amount: 320000, date: '21 Oct 2026', paymentMode: 'Cash / Direct', status: 'Paid' },
    { id: 'EXP-2026-140', title: 'Diesel Fuel for JCB & Generators', category: 'Equipment Fuel', project: 'City Center Mall', vendor: 'Bharat Petroleum Dealer', amount: 84000, date: '20 Oct 2026', paymentMode: 'Fleet Card', status: 'Approved' },
    { id: 'EXP-2026-139', title: 'Structural Safety Audit & Testing Fee', category: 'Professional Fee', project: 'Green Valley Villas', vendor: 'Apex Engineering Labs', amount: 45000, date: '18 Oct 2026', paymentMode: 'NEFT', status: 'Approved' }
  ];

  const [expensesList, setExpensesList] = useState(initialExpenses);

  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'Materials',
    project: 'Skyline Residency',
    vendor: '',
    amount: '',
    paymentMode: 'Bank Transfer',
    date: '',
    notes: ''
  });

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title.trim() || !newExpense.amount) {
      addToast({
        title: 'Missing Fields',
        message: 'Please provide expense title and amount.',
        type: 'error'
      });
      return;
    }

    const created = {
      id: `EXP-2026-${142 + expensesList.length + 1}`,
      title: newExpense.title.trim(),
      category: newExpense.category,
      project: newExpense.project,
      vendor: newExpense.vendor.trim() || 'Vendor / Payee',
      amount: parseFloat(newExpense.amount) || 50000,
      date: newExpense.date || '24 Oct 2026',
      paymentMode: newExpense.paymentMode,
      status: 'Approved'
    };

    setExpensesList([created, ...expensesList]);
    setIsAddModalOpen(false);
    setNewExpense({
      title: '',
      category: 'Materials',
      project: 'Skyline Residency',
      vendor: '',
      amount: '',
      paymentMode: 'Bank Transfer',
      date: '',
      notes: ''
    });
    addToast({
      title: 'Expense Recorded',
      message: `${created.title} (₹${created.amount.toLocaleString('en-IN')}) successfully logged.`,
      type: 'success'
    });
  };

  const statusTabs = [
    { id: 'all', label: 'All Expenses', count: expensesList.length },
    { id: 'approved', label: 'Approved', count: expensesList.filter(e => e.status === 'Approved').length },
    { id: 'paid', label: 'Paid & Settled', count: expensesList.filter(e => e.status === 'Paid').length }
  ];

  const filteredExpenses = expensesList.filter(exp => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = exp.title.toLowerCase().includes(q) ||
                    exp.vendor.toLowerCase().includes(q) ||
                    exp.project.toLowerCase().includes(q) ||
                    exp.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (activeTab === 'approved' && exp.status !== 'Approved') return false;
    if (activeTab === 'paid' && exp.status !== 'Paid') return false;
    return true;
  });

  const columns = [
    {
      header: 'Expense ID & Title',
      key: 'title',
      render: (row) => (
        <div>
          <p className="font-bold text-slate-900 leading-tight">{row.title}</p>
          <p className="text-[10px] text-slate-400">{row.id} • {row.category}</p>
        </div>
      )
    },
    {
      header: 'Project',
      key: 'project',
      render: (row) => <span className="font-medium text-slate-800">{row.project}</span>
    },
    {
      header: 'Payee / Vendor',
      key: 'vendor',
      render: (row) => <span className="text-slate-700">{row.vendor}</span>
    },
    {
      header: 'Expense Date',
      key: 'date',
      render: (row) => <span className="text-slate-600 text-[11px] whitespace-nowrap">{row.date}</span>
    },
    {
      header: 'Payment Mode',
      key: 'paymentMode',
      render: (row) => <span className="text-slate-600 text-[11px]">{row.paymentMode}</span>
    },
    {
      header: 'Amount',
      key: 'amount',
      align: 'right',
      render: (row) => <span className="font-extrabold text-orange-600">{formatCurrencyINR(row.amount)}</span>
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />
    }
  ];

  return (
    <div className="space-y-4">
      {/* Hero Banner (Screen 029) */}
      <HeroBanner
        title="Expenses & Site Petty Cash"
        subtitle="Track site expenditures, petty cash vouchers, contractor invoices and material procurement bills."
        actionButton={
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Plus size={15} />
            <span>Record Expense</span>
          </button>
        }
      />

      {/* 4 StatCards - Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        <StatCard icon={Wallet} iconBg="bg-blue-600" value="₹98.3 Lakh" label="Total Expenses (October)" delta="12% this month" isPositive={false} />
        <StatCard icon={Tag} iconBg="bg-emerald-600" value="₹41.3 Lakh" label="Materials (42%)" delta="Largest cost segment" isPositive={true} />
        <StatCard icon={Calendar} iconBg="bg-purple-600" value="₹25.6 Lakh" label="Site Labour (26%)" delta="142 workers" isPositive={true} />
        <StatCard icon={Building2} iconBg="bg-orange-500" value="₹14.8 Lakh" label="Equipment & Fuel (15%)" delta="Fleet operation" isPositive={true} />
      </div>

      <StatusTabs tabs={statusTabs} activeTab={activeTab} onTabChange={setActiveTab} />
      <FilterBar searchValue={searchQuery} onSearchChange={setSearchQuery} searchPlaceholder="Search expense, vendor, project..." />

      <DataTable columns={columns} data={filteredExpenses} entityName="expenses" />

      {/* Record Expense Responsive Modal Form */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                  <Wallet size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">Record Site Expense</h3>
                  <p className="text-[11px] text-slate-500">Log voucher, contractor payout or material petty cash</p>
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
            <form onSubmit={handleCreateExpense} className="p-5 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expense Title / Particulars *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ready Mix Concrete M25 Grade Pumping"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expense Category
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Materials">Materials & Cement</option>
                    <option value="Labour">Labour Muster Roll</option>
                    <option value="Equipment Fuel">Equipment & Fuel</option>
                    <option value="Subcontractor">Subcontractor Billing</option>
                    <option value="Professional Fee">Professional Fee</option>
                    <option value="Site Admin">Site Admin & Food</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Project Site
                  </label>
                  <select
                    value={newExpense.project}
                    onChange={(e) => setNewExpense({ ...newExpense, project: e.target.value })}
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
                    Payee / Vendor / Contractor
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UltraTech Cement Ltd."
                    value={newExpense.vendor}
                    onChange={(e) => setNewExpense({ ...newExpense, vendor: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Amount (INR) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 485000"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Payment Mode
                  </label>
                  <select
                    value={newExpense.paymentMode}
                    onChange={(e) => setNewExpense({ ...newExpense, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Bank Transfer">Bank Transfer / RTGS</option>
                    <option value="Cash / Direct">Site Petty Cash</option>
                    <option value="UPI">UPI / Mobile Payout</option>
                    <option value="Cheque">Account Payee Cheque</option>
                    <option value="Fleet Card">Fleet Card (Fuel)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Expense Date
                  </label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Voucher / Bill Details & Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter voucher reference number, bill details or site engineer approval note..."
                    value={newExpense.notes}
                    onChange={(e) => setNewExpense({ ...newExpense, notes: e.target.value })}
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
                  <span>Record Expense</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
