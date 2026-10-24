import React, { useState } from 'react';
import {
  ArrowLeft,
  Edit2,
  Download,
  Printer,
  CheckCircle,
  XCircle,
  Building2,
  Calendar,
  Store,
  MapPin,
  Clock,
  Send,
  Paperclip,
  FileText,
  Copy,
  RotateCcw,
  PackageCheck
} from 'lucide-react';
import { purchaseOrdersData } from '../../data/mockData';
import { formatCurrencyINR } from '../../utils/formatters';
import { StatusBadge } from '../common/StatusBadge';
import ApprovalWorkflowTimeline from '../common/ApprovalWorkflowTimeline';
import ConfirmDialog from '../common/ConfirmDialog';
import { useToast } from '../common/Toast';

export default function PODetailsView({ onBack, onNavigate }) {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [poStatus, setPoStatus] = useState('Pending Approval');
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Kamlesh Sharma",
      avatar: "KS",
      time: "26 Oct 2026, 12:20 PM",
      text: "PO has been submitted for approval. Please keep the materials ready as per delivery schedule."
    },
    {
      id: 2,
      sender: "Rakesh Mehta (UltraTech)",
      avatar: "RM",
      time: "26 Oct 2026, 01:10 PM",
      text: "We have received the PO. We will confirm the delivery schedule soon."
    }
  ]);

  const po = purchaseOrdersData[0]; // PO-2026-046

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: "Kamlesh Sharma (Admin)",
      avatar: "KS",
      time: "Just now",
      text: newMessage.trim()
    };
    setMessages([...messages, msg]);
    setNewMessage('');
    addToast({ title: 'Message Sent', message: 'Supplier notified via BuildPro portal.', type: 'info' });
  };

  const handleApprove = () => {
    setPoStatus('Approved');
    addToast({
      title: 'Purchase Order Approved!',
      message: `${po.poNumber} has been officially approved and issued to UltraTech Cement Ltd.`,
      type: 'success'
    });
  };

  const handleReject = () => {
    setPoStatus('Rejected');
    addToast({
      title: 'Purchase Order Rejected',
      message: `${po.poNumber} was rejected with revision request.`,
      type: 'error'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'items', label: 'Items & Pricing' },
    { id: 'approval', label: 'Approval Workflow' },
    { id: 'supplier', label: 'Supplier Communication' },
    { id: 'grn', label: 'Delivery & GRN' },
    { id: 'documents', label: 'Related Documents' },
    { id: 'activity', label: 'Activity Log' }
  ];

  return (
    <div className="space-y-4 text-xs">
      {/* Breadcrumb & Top Page Header (Screen 006) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
            <span onClick={onBack} className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
              <ArrowLeft size={11} /> Purchase Orders
            </span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500">{po.poNumber}</span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-800 font-semibold">Details & Approval</span>
          </div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Purchase Order Details & Approval
          </h1>
          <p className="text-[11px] text-slate-500 font-normal">
            View complete purchase order details, track approval status, download documents and manage supplier communication.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs"
          >
            <ArrowLeft size={13} />
            <span>Back to List</span>
          </button>
          
          <button
            onClick={() => addToast({ title: 'Edit PO', message: 'Opening PO editor...', type: 'info' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs"
          >
            <Edit2 size={12} />
            <span>Edit PO</span>
          </button>

          <button
            onClick={() => addToast({ title: 'PDF Download', message: `Generating PDF for ${po.poNumber}...`, type: 'info' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs"
          >
            <Download size={13} />
            <span>Download PDF</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
            title="Print"
          >
            <Printer size={14} />
          </button>

          <button
            onClick={() => setIsApproveOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition-all"
          >
            <CheckCircle size={14} />
            <span>Approve</span>
          </button>

          <button
            onClick={() => setIsRejectOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-sm shadow-red-500/20 transition-all"
          >
            <XCircle size={14} />
            <span>Reject</span>
          </button>
        </div>
      </div>

      {/* PO Identity & KPI Strip */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          <div className="col-span-2 md:col-span-2 flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
              <FileText size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 text-base">{po.poNumber}</h3>
                <StatusBadge status={poStatus} />
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Order Type: Material Purchase • Reference No: REF-2026-021
              </p>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block font-medium">PO Date</span>
            <span className="font-bold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
              <Calendar size={11} className="text-blue-600" /> {po.orderDate}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Expected Delivery</span>
            <span className="font-bold text-slate-800 text-xs flex items-center gap-1 mt-0.5">
              <Calendar size={11} className="text-orange-500" /> {po.expectedDelivery}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 block font-medium">Total Amount</span>
            <span className="font-extrabold text-blue-600 text-sm mt-0.5 block">
              {formatCurrencyINR(po.totalAmount)}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto text-xs font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-3.5 border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* 3 Info Cards: Supplier, Project/Site, Order Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Supplier Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Store size={13} className="text-blue-600" /> Supplier
                </span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View Supplier</span>
              </div>
              <p className="font-bold text-slate-900 text-xs">{po.supplier}</p>
              <div className="space-y-1 text-[11px] text-slate-600">
                <p>Contact: Rakesh Mehta</p>
                <p>Mobile: +91 98765 43210</p>
                <p>GST: 08AABCU9603R1Z5</p>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">Transport Nagar, Jaipur</p>
              </div>
            </div>

            {/* Project / Site Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Building2 size={13} className="text-orange-500" /> Site Info
                </span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View Project</span>
              </div>
              <p className="font-bold text-slate-900 text-xs">{po.project} (Site A)</p>
              <div className="space-y-1 text-[11px] text-slate-600">
                <p>Site Manager: Amit Sharma</p>
                <p>Contact: +91 87654 32109</p>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">Ajmer Road, Jaipur - 302026</p>
              </div>
            </div>

            {/* Order Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                  <Clock size={13} className="text-purple-600" /> Order Status
                </span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  Pending
                </span>
              </div>
              <div className="space-y-1 text-[11px] text-slate-600">
                <p><span className="text-slate-400">Current Stage:</span> {po.stage}</p>
                <p><span className="text-slate-400">Priority:</span> {po.priority}</p>
                <p><span className="text-slate-400">Created By:</span> {po.createdBy}</p>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">Created: {po.createdOn}</p>
              </div>
            </div>
          </div>

          {/* Purchase Order Items Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-card p-4 space-y-3">
            <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
              Purchase Order Items
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase">
                    <th className="p-2.5 w-6 text-center">#</th>
                    <th className="p-2.5">Material Name</th>
                    <th className="p-2.5">SKU</th>
                    <th className="p-2.5">Unit</th>
                    <th className="p-2.5 text-right">Quantity</th>
                    <th className="p-2.5 text-right">Rate (₹)</th>
                    <th className="p-2.5 text-center">GST %</th>
                    <th className="p-2.5 text-right">Amount (₹)</th>
                    <th className="p-2.5">Delivery Date</th>
                    <th className="p-2.5">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {po.items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/70">
                      <td className="p-2.5 text-center text-slate-400 font-medium">{idx + 1}</td>
                      <td className="p-2.5 font-bold text-slate-900">{item.name}</td>
                      <td className="p-2.5 text-slate-500 font-mono text-[10px]">{item.sku}</td>
                      <td className="p-2.5 text-slate-600">{item.unit}</td>
                      <td className="p-2.5 text-right font-medium text-slate-800">{item.qty}</td>
                      <td className="p-2.5 text-right text-slate-700">{formatCurrencyINR(item.rate)}</td>
                      <td className="p-2.5 text-center text-slate-600">{item.gst}%</td>
                      <td className="p-2.5 text-right font-bold text-slate-900">{formatCurrencyINR(item.amount)}</td>
                      <td className="p-2.5 text-slate-500 text-[11px] whitespace-nowrap">{item.deliveryDate}</td>
                      <td className="p-2.5 text-slate-400 text-[11px]">{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Summary Financial Breakdown */}
            <div className="flex justify-end pt-2">
              <div className="w-72 bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{formatCurrencyINR(po.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Discount</span>
                  <span className="font-semibold text-slate-800">₹0</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxable Amount</span>
                  <span className="font-semibold text-slate-800">{formatCurrencyINR(po.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST Amount (₹)</span>
                  <span className="font-semibold text-slate-800">{formatCurrencyINR(po.gstAmount)}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-extrabold text-sm text-slate-900">
                  <span>Total Amount (₹)</span>
                  <span className="text-blue-600">{formatCurrencyINR(po.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Terms & Conditions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg">
              <div>
                <span className="text-[10px] text-slate-400 block">Payment Terms</span>
                <span className="font-semibold text-slate-800">30 Days Credit</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Delivery Terms</span>
                <span className="font-semibold text-slate-800">At Site (FOR)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Price Validity</span>
                <span className="font-semibold text-slate-800">30 Days</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Warranty</span>
                <span className="font-semibold text-slate-800">As per manufacturer</span>
              </div>
            </div>
            <ol className="list-decimal list-inside text-[11px] text-slate-600 space-y-1">
              <li>Materials must be as per approved specifications and BIS standards.</li>
              <li>Quality test certificate to be provided with delivery.</li>
              <li>Any damaged/short material will be replaced by supplier at no extra cost.</li>
              <li>Payment will be released after successful GRN and quality inspection verification.</li>
            </ol>
          </div>

        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Approval Workflow Stepper (Screen 006) */}
          <ApprovalWorkflowTimeline
            steps={po.timeline}
            onApprove={() => setIsApproveOpen(true)}
            onReject={() => setIsRejectOpen(true)}
            isActionable={poStatus === 'Pending Approval'}
          />

          {/* Quick Actions Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-2.5">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addToast({ title: 'Sent to Supplier', message: 'PO PDF emailed to supplier contact', type: 'success' })}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold text-xs text-slate-700 flex items-center gap-1.5"
              >
                <Send size={12} className="text-blue-600" />
                <span>Send to Supplier</span>
              </button>
              <button
                onClick={() => addToast({ title: 'Follow-up Created', message: 'Delivery reminder scheduled', type: 'info' })}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold text-xs text-slate-700 flex items-center gap-1.5"
              >
                <Clock size={12} className="text-orange-500" />
                <span>Create Follow-up</span>
              </button>
              <button
                onClick={() => onNavigate('grn')}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold text-xs text-slate-700 flex items-center gap-1.5"
              >
                <PackageCheck size={12} className="text-emerald-600" />
                <span>Create GRN</span>
              </button>
              <button
                onClick={() => addToast({ title: 'Return Gate Pass', message: 'Opening return gate pass form', type: 'info' })}
                className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold text-xs text-slate-700 flex items-center gap-1.5"
              >
                <RotateCcw size={12} className="text-red-500" />
                <span>Create Return</span>
              </button>
            </div>
          </div>

          {/* Live Communication with Supplier (Screen 006) */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">Communication with Supplier</h4>
              <span className="text-[10px] text-blue-600 font-semibold cursor-pointer hover:underline">View All</span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto">
              {messages.map((m) => (
                <div key={m.id} className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-[11px]">{m.sender}</span>
                    <span className="text-[9px] text-slate-400">{m.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{m.text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 pt-1">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:bg-white focus:border-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="Send"
              >
                <Send size={13} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Approve Confirmation Modal */}
      <ConfirmDialog
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        onConfirm={handleApprove}
        title="Approve Purchase Order"
        message={`Are you sure you want to approve Purchase Order ${po.poNumber} for ₹8,20,040 to UltraTech Cement Ltd.?`}
        confirmText="Confirm Approval"
        type="primary"
      />

      {/* Reject Confirmation Modal */}
      <ConfirmDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        onConfirm={handleReject}
        title="Reject Purchase Order"
        message={`Please confirm rejection of ${po.poNumber}. This will notify the creator to submit a revised order.`}
        confirmText="Reject Order"
        type="danger"
      />
    </div>
  );
}
