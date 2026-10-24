import React, { useState } from 'react';
import { ArrowLeft, Save, Calendar, Building2, Store, Plus } from 'lucide-react';
import NumberedFormSection from '../common/NumberedFormSection';
import ItemsTable from '../common/ItemsTable';
import FileDropzone from '../common/FileDropzone';
import { useToast } from '../common/Toast';

export default function CreatePurchaseOrderView({ onBack }) {
  const { addToast } = useToast();
  const [poNumber, setPoNumber] = useState('PO-2026-047');
  const [orderDate, setOrderDate] = useState('20 Oct 2026');
  const [deliveryDate, setDeliveryDate] = useState('25 Oct 2026');
  const [project, setProject] = useState('Skyline Residency');
  const [supplier, setSupplier] = useState('UltraTech Cement Ltd.');
  const [reference, setReference] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('30 Days');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [deliveryAddress, setDeliveryAddress] = useState('Site, Skyline Residency, Jaipur, Rajasthan - 302018');
  const [notes, setNotes] = useState('Please ensure timely delivery and proper quality test certificates of materials.');
  const [initialStatus, setInitialStatus] = useState('Draft');
  const [approvalRequired, setApprovalRequired] = useState('Yes');

  const handleSave = (e) => {
    e.preventDefault();
    addToast({
      title: 'Purchase Order Created!',
      message: `${poNumber} has been saved and submitted to the approval center.`,
      type: 'success'
    });
    if (onBack) onBack();
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Breadcrumb & Header (Screen 004) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
            <span onClick={onBack} className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
              <ArrowLeft size={11} /> Purchase Orders
            </span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-800 font-semibold">Create Purchase Order</span>
          </div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Create Purchase Order
          </h1>
          <p className="text-[11px] text-slate-500 font-normal">
            Create a new purchase order for materials or services from your supplier.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Purchase Orders</span>
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all"
          >
            <Plus size={14} />
            <span>Save Purchase Order</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (Sections 1, 2, 3) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Section 1: Order Details */}
          <NumberedFormSection
            stepNumber={1}
            title="Order Details"
            subtitle="Enter basic purchase order information."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">PO Number *</label>
                <input
                  type="text"
                  value={poNumber}
                  readOnly
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Auto-generated (read-only)</span>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Order Date *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none pr-8"
                  />
                  <Calendar size={13} className="absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Expected Delivery Date *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none pr-8"
                  />
                  <Calendar size={13} className="absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Project / Location *</label>
                <select
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Skyline Residency</option>
                  <option>Green Valley Villas</option>
                  <option>City Center Mall</option>
                  <option>Tech Park Phase 1</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Supplier *</label>
                <select
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>UltraTech Cement Ltd.</option>
                  <option>Tata Steel Ltd.</option>
                  <option>Shree Build Mart</option>
                  <option>Asian Paints Dealer</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Reference (Optional)</label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. Quotation No. or Note"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </NumberedFormSection>

          {/* Section 2: Select Materials / Items */}
          <NumberedFormSection
            stepNumber={2}
            title="Select Materials / Items"
            subtitle="Add materials or services to this purchase order."
          >
            <ItemsTable />
          </NumberedFormSection>

          {/* Section 3: Additional Information */}
          <NumberedFormSection
            stepNumber={3}
            title="Additional Information"
            subtitle="Enter payment terms, delivery address and notes."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Payment Terms</label>
                <select
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>30 Days</option>
                  <option>15 Days</option>
                  <option>45 Days</option>
                  <option>Against Delivery / Cash</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Bank Transfer (NEFT/RTGS)</option>
                  <option>Cheque</option>
                  <option>Letter of Credit (LC)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Delivery Address *</label>
                <textarea
                  rows={3}
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none resize-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none resize-none"
                />
              </div>
            </div>
          </NumberedFormSection>

        </div>

        {/* Right Column (Sections 4, 6, 7) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Section 4: Supplier Information */}
          <NumberedFormSection
            stepNumber={4}
            title="Supplier Information"
            subtitle="Selected supplier details."
            actionButton={
              <button
                type="button"
                onClick={() => addToast({ title: 'Select Supplier', message: 'Choose from approved vendors list', type: 'info' })}
                className="text-blue-600 hover:underline font-semibold text-xs"
              >
                Change Supplier
              </button>
            }
          >
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center font-bold text-xs text-orange-600 shrink-0">
                  UltraTech
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{supplier}</h4>
                  <p className="text-[11px] text-slate-500">Category: Cement & Concrete</p>
                </div>
              </div>

              <div className="space-y-1 text-[11px] pt-2 border-t border-slate-200">
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Person:</span>
                  <span className="font-semibold text-slate-800">Rakesh Mehta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-medium text-slate-700">+91 98765 43210</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-medium text-slate-700">rakesh.mehta@ultratech.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">GST Number:</span>
                  <span className="font-semibold text-slate-800">08AABCU9603R1Z5</span>
                </div>
                <div className="pt-1 text-slate-400 text-[10px]">
                  Plot No. 12, Transport Nagar, Jaipur, Rajasthan - 302003
                </div>
              </div>
            </div>
          </NumberedFormSection>

          {/* Section 6: Documents */}
          <NumberedFormSection
            stepNumber={6}
            title="Documents"
            subtitle="Upload quotation, agreements or other documents."
          >
            <FileDropzone />
          </NumberedFormSection>

          {/* Section 7: Approval & Status */}
          <NumberedFormSection
            stepNumber={7}
            title="Approval & Status"
            subtitle="Set initial status and approval settings."
          >
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Initial Status</label>
                <select
                  value={initialStatus}
                  onChange={(e) => setInitialStatus(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Draft</option>
                  <option>Submit for Approval</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Approval Required</label>
                <select
                  value={approvalRequired}
                  onChange={(e) => setApprovalRequired(e.target.value)}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Yes (Purchase & Project Manager)</option>
                  <option>No (Direct Release)</option>
                </select>
              </div>
            </div>
          </NumberedFormSection>

        </div>
      </div>
    </div>
  );
}
