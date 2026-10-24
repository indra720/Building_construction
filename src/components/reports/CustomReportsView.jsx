import React, { useState } from 'react';
import {
  FileBarChart,
  FileSpreadsheet,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  Building2,
  FileText,
  Clock,
  Printer,
  Share2,
  PieChart,
  Boxes,
  Truck,
  HardHat,
  Receipt
} from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import StatCard from '../common/StatCard';
import DataTable from '../common/DataTable';
import { formatCurrencyINR } from '../../utils/formatters';
import { useToast } from '../common/Toast';

export default function CustomReportsView({ onNavigate }) {
  const { addToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('PDF');
  const [selectedProject, setSelectedProject] = useState('All Projects');
  const [dateRange, setDateRange] = useState('01 Oct 2026 - 31 Oct 2026');
  const [isGenerating, setIsGenerating] = useState(false);

  // Pre-configured Report Templates
  const reportTemplates = [
    {
      id: 'RPT-001',
      title: 'Material Consumption vs BOQ Estimate',
      category: 'Materials & Procurement',
      icon: Boxes,
      iconColor: 'bg-orange-500',
      description: 'Variance analysis comparing actual site material usage against sanctioned Bill of Quantities (BOQ).',
      frequency: 'Weekly',
      lastGenerated: '23 Oct 2026',
      format: 'PDF, Excel'
    },
    {
      id: 'RPT-002',
      title: 'Purchase Order & GRN Reconciliation',
      category: 'Materials & Procurement',
      icon: Receipt,
      iconColor: 'bg-blue-600',
      description: 'Tracks ordered items, partial deliveries, GRN verification status, and pending vendor deliveries.',
      frequency: 'Daily',
      lastGenerated: '24 Oct 2026',
      format: 'PDF, Excel, CSV'
    },
    {
      id: 'RPT-003',
      title: 'Daily Site Labour Muster Roll & Wages',
      category: 'Labour & Workforce',
      icon: HardHat,
      iconColor: 'bg-emerald-600',
      description: 'Daily biometric attendance logs, mason/helper headcounts, overtime hours, and weekly wage disbursements.',
      frequency: 'Daily',
      lastGenerated: '24 Oct 2026',
      format: 'PDF, Excel'
    },
    {
      id: 'RPT-004',
      title: 'Project Cash Flow & Billing Statement',
      category: 'Finance & Contracts',
      icon: FileSpreadsheet,
      iconColor: 'bg-purple-600',
      description: 'Comprehensive cash inflows from client RA bills versus vendor disbursements and site petty cash.',
      frequency: 'Monthly',
      lastGenerated: '20 Oct 2026',
      format: 'PDF, Excel'
    },
    {
      id: 'RPT-005',
      title: 'Equipment Utilization & Diesel Log',
      category: 'Machinery & Equipment',
      icon: Truck,
      iconColor: 'bg-amber-500',
      description: 'Heavy machinery operating hours, idle time penalties, diesel consumption rates, and maintenance logs.',
      frequency: 'Weekly',
      lastGenerated: '22 Oct 2026',
      format: 'PDF, CSV'
    },
    {
      id: 'RPT-006',
      title: 'Vendor Performance & On-Time Delivery',
      category: 'Materials & Procurement',
      icon: PieChart,
      iconColor: 'bg-rose-500',
      description: 'Vendor ratings based on lead time adherence, quality rejection rate, and pricing compliance.',
      frequency: 'Monthly',
      lastGenerated: '15 Oct 2026',
      format: 'PDF, Excel'
    }
  ];

  // Mock generated preview rows
  const previewData = [
    {
      itemCode: 'MAT-CMT-001',
      description: 'UltraTech OPC 53 Grade Cement',
      unit: 'Bags',
      estimatedQty: 2500,
      actualQty: 2620,
      variance: '+120 Bags (+4.8%)',
      rate: 380,
      totalCost: 995600,
      status: 'Within Tolerance'
    },
    {
      itemCode: 'MAT-STL-002',
      description: 'Tata Tiscon 16mm Fe-550D TMT',
      unit: 'MT',
      estimatedQty: 45,
      actualQty: 46.5,
      variance: '+1.5 MT (+3.3%)',
      rate: 62000,
      totalCost: 2883000,
      status: 'Within Tolerance'
    },
    {
      itemCode: 'MAT-AGG-003',
      description: 'Coarse Aggregate (20mm Blue Metal)',
      unit: 'CFT',
      estimatedQty: 8000,
      actualQty: 7850,
      variance: '-150 CFT (-1.8%)',
      rate: 42,
      totalCost: 329700,
      status: 'Optimal'
    },
    {
      itemCode: 'MAT-BRK-004',
      description: 'First Class Clay Bricks (9x4x3)',
      unit: 'Nos',
      estimatedQty: 60000,
      actualQty: 64200,
      variance: '+4200 Nos (+7.0%)',
      rate: 9.5,
      totalCost: 609900,
      status: 'Review Required'
    }
  ];

  const previewColumns = [
    {
      header: 'Item Code',
      key: 'itemCode',
      render: (row) => <span className="font-mono font-bold text-slate-800 whitespace-nowrap">{row.itemCode}</span>
    },
    {
      header: 'Material Description',
      key: 'description',
      render: (row) => <span className="font-semibold text-slate-900 whitespace-nowrap">{row.description}</span>
    },
    {
      header: 'Unit',
      key: 'unit',
      render: (row) => <span className="text-slate-600 whitespace-nowrap">{row.unit}</span>
    },
    {
      header: 'BOQ Estimate',
      key: 'estimatedQty',
      align: 'right',
      render: (row) => <span className="font-medium text-slate-700 whitespace-nowrap">{row.estimatedQty.toLocaleString()}</span>
    },
    {
      header: 'Actual Consumed',
      key: 'actualQty',
      align: 'right',
      render: (row) => <span className="font-bold text-slate-900 whitespace-nowrap">{row.actualQty.toLocaleString()}</span>
    },
    {
      header: 'Variance',
      key: 'variance',
      render: (row) => (
        <span
          className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
            row.variance.startsWith('-')
              ? 'bg-emerald-100 text-emerald-800'
              : row.status === 'Review Required'
              ? 'bg-rose-100 text-rose-800'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {row.variance}
        </span>
      )
    },
    {
      header: 'Total Value (₹)',
      key: 'totalCost',
      align: 'right',
      render: (row) => <span className="font-extrabold text-blue-600 whitespace-nowrap">{formatCurrencyINR(row.totalCost)}</span>
    }
  ];

  const handleGenerateReport = (templateTitle) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      addToast({
        title: 'Report Generated Successfully',
        message: `"${templateTitle}" created in ${selectedFormat} format for ${selectedProject}.`,
        type: 'success'
      });
    }, 700);
  };

  const categories = ['All', 'Materials & Procurement', 'Finance & Contracts', 'Labour & Workforce', 'Machinery & Equipment'];

  const filteredTemplates = reportTemplates.filter((t) => {
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-4 text-xs">
      <HeroBanner
        title="Custom Reports & Audits"
        subtitle="Generate executive MIS reports, material consumption reconciliation, site muster rolls, and cash flow statements."
        actionButton={
          <button
            onClick={() => handleGenerateReport('Material Consumption vs BOQ Estimate')}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>{isGenerating ? 'Compiling Report...' : `Export ${selectedFormat}`}</span>
          </button>
        }
      />

      {/* 4 StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <StatCard
          icon={FileBarChart}
          iconBg="bg-blue-600"
          value="48"
          label="Reports Generated This Month"
          delta="18% increase"
          isPositive={true}
        />
        <StatCard
          icon={Boxes}
          iconBg="bg-orange-500"
          value="6"
          label="Active Standard Templates"
          delta="Pre-approved formats"
          isPositive={true}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-600"
          value="99.4%"
          label="Audit Data Accuracy"
          delta="Zero reconciliation gap"
          isPositive={true}
        />
        <StatCard
          icon={Clock}
          iconBg="bg-purple-600"
          value="Instant"
          label="Real-time Compilation"
          delta="Live database sync"
          isPositive={true}
        />
      </div>

      {/* Query Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-card space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Report Generation Parameters</h3>
          <span className="text-[11px] text-slate-400">Select project scope and export format</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Project Site Scope</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
            >
              <option>All Projects (Consolidated)</option>
              <option>Skyline Residency</option>
              <option>Green Valley Villas</option>
              <option>City Center Mall</option>
              <option>River View Apartments</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Audit Period</label>
            <div className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium">
              <Calendar size={13} className="text-slate-400" />
              <span>{dateRange}</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">Export File Format</label>
            <div className="grid grid-cols-3 gap-1.5">
              {['PDF', 'Excel', 'CSV'].map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedFormat(fmt)}
                  className={`py-2 rounded-lg font-bold text-center transition-all cursor-pointer ${
                    selectedFormat === fmt
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs font-bold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Report Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredTemplates.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <div
              key={tpl.id}
              className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 hover-lift flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className={`w-8 h-8 rounded-lg ${tpl.iconColor} text-white flex items-center justify-center font-bold shrink-0 shadow-xs`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{tpl.frequency}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm leading-tight">{tpl.title}</h4>
                <p className="text-slate-500 text-[11px] mt-1 line-clamp-2 leading-relaxed">{tpl.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Last: {tpl.lastGenerated}</span>
                <button
                  onClick={() => handleGenerateReport(tpl.title)}
                  className="py-1 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
                >
                  <Download size={12} />
                  <span>Generate</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Sample Report Preview Section */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Live Preview
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Material Consumption vs BOQ Estimate</h3>
            </div>
            <p className="text-slate-400 text-[11px] mt-0.5">Project: Skyline Residency • Period: 01 Oct - 31 Oct 2026</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => addToast({ title: 'Print Dispatch', message: 'Sending formatted report to office network printer...', type: 'info' })}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <Printer size={13} />
              <span>Print</span>
            </button>
            <button
              onClick={() => addToast({ title: 'Share Report', message: 'Generating secure 7-day view link for project auditors...', type: 'info' })}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <Share2 size={13} />
              <span>Share Link</span>
            </button>
          </div>
        </div>

        {/* Live Preview Table */}
        <DataTable
          columns={previewColumns}
          data={previewData}
          entityName="material reconciliation records"
        />
      </div>
    </div>
  );
}
