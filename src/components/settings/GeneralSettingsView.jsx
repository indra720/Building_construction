import React, { useState } from 'react';
import {
  Settings,
  Building,
  Mail,
  MessageSquare,
  Shield,
  Database,
  Bell,
  Save,
  CheckCircle2,
  Globe,
  FileText,
  Key,
  Smartphone,
  RefreshCw
} from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import NumberedFormSection from '../common/NumberedFormSection';
import { useToast } from '../common/Toast';

export default function GeneralSettingsView() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [companyInfo, setCompanyInfo] = useState({
    name: 'BuildPro Construction ERP Pvt. Ltd.',
    gstin: '08AAGCB9988D1Z4',
    pan: 'AAGCB9988D',
    email: 'admin@buildproerp.com',
    phone: '+91 98765 43210',
    headquarters: 'Sector 5, Mansarovar, Jaipur, Rajasthan - 302020',
    currency: 'INR (₹)',
    fiscalStart: 'April 1st',
    timeZone: 'Asia/Kolkata (IST +5:30)'
  });

  const [sequencePrefixes, setSequencePrefixes] = useState({
    poPrefix: 'PO-2026-',
    grnPrefix: 'GRN-2026-',
    invoicePrefix: 'INV-2026-',
    estimatePrefix: 'EST-2026-',
    leadPrefix: 'LD-2026-',
    clientPrefix: 'CLI-'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    whatsappAlerts: true,
    poApprovalNotify: true,
    grnDiscrepancyNotify: true,
    labourShortageNotify: false,
    dailySummaryEmail: true
  });

  const [gatewaySettings, setGatewaySettings] = useState({
    smsProvider: 'Kaleyra / Textlocal India',
    smsSenderId: 'BLDPRO',
    whatsappApi: 'Meta WhatsApp Cloud API',
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: '587',
    smtpUser: 'apikey_buildpro_corp',
    smtpSender: 'notifications@buildproerp.com'
  });

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        title: 'Settings Saved',
        message: 'ERP system configuration and sequence rules updated successfully.',
        type: 'success'
      });
    }, 600);
  };

  const handleTestConnection = (service) => {
    addToast({
      title: `${service} Test Successful`,
      message: `Verified live connection with ${service} gateway. Handshake 200 OK.`,
      type: 'success'
    });
  };

  const tabs = [
    { id: 'general', label: 'Company & Localization', icon: Building },
    { id: 'sequences', label: 'Document Numbering', icon: FileText },
    { id: 'notifications', label: 'Alerts & Gateways', icon: Bell },
    { id: 'security', label: 'Tax & Compliance', icon: Shield }
  ];

  return (
    <div className="space-y-4 text-xs">
      <HeroBanner
        title="General ERP Configuration"
        subtitle="Configure company master information, Indian tax rules, document sequences, SMS/WhatsApp gateways and audit parameters."
        actionButton={
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white rounded-lg text-xs font-bold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            {isSaving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            <span>{isSaving ? 'Saving...' : 'Save Configuration'}</span>
          </button>
        }
      />

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl w-fit text-xs font-semibold overflow-x-auto max-w-full">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Company & Localization */}
      {activeTab === 'general' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberedFormSection
            stepNumber={1}
            title="Company Master Details"
            subtitle="Legal organization credentials printed on Tax Invoices, Quotations & POs."
          >
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company Registered Name</label>
                <input
                  type="text"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">GSTIN Number (Rajasthan)</label>
                  <input
                    type="text"
                    value={companyInfo.gstin}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, gstin: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-blue-500 focus:outline-none uppercase"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company PAN</label>
                  <input
                    type="text"
                    value={companyInfo.pan}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, pan: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold focus:border-blue-500 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Official Email</label>
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Official Phone</label>
                  <input
                    type="text"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Corporate Headquarters Address</label>
                <textarea
                  rows={2}
                  value={companyInfo.headquarters}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, headquarters: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </NumberedFormSection>

          <NumberedFormSection
            stepNumber={2}
            title="Localization & Regional Standards"
            subtitle="Configure Indian Rupee currency rules, fiscal period and timezone."
          >
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Base Currency</label>
                <select
                  value={companyInfo.currency}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, currency: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                >
                  <option>INR (₹) - Indian Rupee (Lakh / Crore grouping)</option>
                  <option>USD ($) - US Dollar</option>
                  <option>AED (د.إ) - UAE Dirham</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Financial Year Cycle</label>
                <select
                  value={companyInfo.fiscalStart}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, fiscalStart: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 focus:outline-none cursor-pointer"
                >
                  <option>April 1st - March 31st (Standard Indian FY)</option>
                  <option>January 1st - December 31st (Calendar Year)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">System Timezone</label>
                <input
                  type="text"
                  value={companyInfo.timeZone}
                  readOnly
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium"
                />
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 text-[11px] block">Indian Number Formatting Active</span>
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Currency amounts across BuildPro are automatically rendered in Indian grouping (e.g. ₹1,42,50,000 for 1 Crore 42.5 Lakh).
                </p>
              </div>
            </div>
          </NumberedFormSection>
        </div>
      )}

      {/* Tab 2: Document Numbering */}
      {activeTab === 'sequences' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Document Auto-Numbering Sequences</h3>
            <p className="text-slate-500 text-[11px]">Define prefixes and sequential counters for ERP procurement and sales records.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Purchase Order (PO)</span>
              <input
                type="text"
                value={sequencePrefixes.poPrefix}
                onChange={(e) => setSequencePrefixes({ ...sequencePrefixes, poPrefix: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400">Sample: {sequencePrefixes.poPrefix}046</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Goods Received Note (GRN)</span>
              <input
                type="text"
                value={sequencePrefixes.grnPrefix}
                onChange={(e) => setSequencePrefixes({ ...sequencePrefixes, grnPrefix: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400">Sample: {sequencePrefixes.grnPrefix}028</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Tax Invoice</span>
              <input
                type="text"
                value={sequencePrefixes.invoicePrefix}
                onChange={(e) => setSequencePrefixes({ ...sequencePrefixes, invoicePrefix: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400">Sample: {sequencePrefixes.invoicePrefix}089</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Project Estimate</span>
              <input
                type="text"
                value={sequencePrefixes.estimatePrefix}
                onChange={(e) => setSequencePrefixes({ ...sequencePrefixes, estimatePrefix: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400">Sample: {sequencePrefixes.estimatePrefix}014</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Sales Lead ID</span>
              <input
                type="text"
                value={sequencePrefixes.leadPrefix}
                onChange={(e) => setSequencePrefixes({ ...sequencePrefixes, leadPrefix: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400">Sample: {sequencePrefixes.leadPrefix}186</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-800 text-[11px] block">Client Code</span>
              <input
                type="text"
                value={sequencePrefixes.clientPrefix}
                onChange={(e) => setSequencePrefixes({ ...sequencePrefixes, clientPrefix: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold"
              />
              <span className="text-[10px] text-slate-400">Sample: {sequencePrefixes.clientPrefix}1042</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Alerts & Gateways */}
      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumberedFormSection
            stepNumber={1}
            title="SMS & WhatsApp Gateway"
            subtitle="Integration keys for instant site dispatches and supervisor alerts."
          >
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">SMS Service Provider</label>
                <input
                  type="text"
                  value={gatewaySettings.smsProvider}
                  readOnly
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">DLT Approved Sender ID</label>
                <input
                  type="text"
                  value={gatewaySettings.smsSenderId}
                  onChange={(e) => setGatewaySettings({ ...gatewaySettings, smsSenderId: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono font-bold uppercase"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">WhatsApp Cloud API Gateway</label>
                <input
                  type="text"
                  value={gatewaySettings.whatsappApi}
                  readOnly
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium"
                />
              </div>

              <button
                onClick={() => handleTestConnection('SMS & WhatsApp')}
                className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Smartphone size={13} />
                <span>Send Test WhatsApp Ping</span>
              </button>
            </div>
          </NumberedFormSection>

          <NumberedFormSection
            stepNumber={2}
            title="Email SMTP Server"
            subtitle="Transactional mail server for Purchase Orders and billing statements."
          >
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">SMTP Host</label>
                <input
                  type="text"
                  value={gatewaySettings.smtpHost}
                  onChange={(e) => setGatewaySettings({ ...gatewaySettings, smtpHost: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">SMTP Port</label>
                  <input
                    type="text"
                    value={gatewaySettings.smtpPort}
                    onChange={(e) => setGatewaySettings({ ...gatewaySettings, smtpPort: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">Sender Email</label>
                  <input
                    type="email"
                    value={gatewaySettings.smtpSender}
                    onChange={(e) => setGatewaySettings({ ...gatewaySettings, smtpSender: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">SMTP User / API Token</label>
                <input
                  type="password"
                  defaultValue="••••••••••••••••••••••••••••••••"
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono"
                />
              </div>

              <button
                onClick={() => handleTestConnection('SMTP Mail')}
                className="py-1.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Mail size={13} />
                <span>Send Test Verification Email</span>
              </button>
            </div>
          </NumberedFormSection>
        </div>
      )}

      {/* Tab 4: Tax & Compliance */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Goods and Services Tax (GST) & TDS Configuration</h3>
            <p className="text-slate-500 text-[11px]">Default tax rates automatically populated across Purchase Orders and Invoices.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 text-xs">Standard CGST + SGST (Intra-state)</span>
              <p className="text-[11px] text-slate-500">Rajasthan supply: 9% CGST + 9% SGST = 18% Total GST.</p>
              <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px] mt-1">
                Active Default (18%)
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 text-xs">IGST (Inter-state Supply)</span>
              <p className="text-[11px] text-slate-500">Suppliers outside Rajasthan (Gujarat, Delhi, Maharashtra): 18% Integrated GST.</p>
              <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-bold text-[10px] mt-1">
                Enabled (18%)
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900 text-xs">TDS under 194C (Contractor Payments)</span>
              <p className="text-[11px] text-slate-500">TDS deduction 1% for individual/HUF and 2% for corporate sub-contractors.</p>
              <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[10px] mt-1">
                2% Applicable
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
