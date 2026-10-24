import React from 'react';
import { Settings, ShieldCheck, Building, AlertCircle, Save } from 'lucide-react';
import HeroBanner from '../common/HeroBanner';
import NumberedFormSection from '../common/NumberedFormSection';
import { useToast } from '../common/Toast';

export default function SettingsPlaceholderView({ title = "Company Settings", subtitle = "Configure company settings and preferences." }) {
  const { addToast } = useToast();

  return (
    <div className="space-y-4 text-xs">
      {/* TODO Design Pending Banner as explicitly mandated in Section 4.7 */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2.5 text-amber-800 text-xs shadow-2xs">
        <AlertCircle size={16} className="text-amber-600 shrink-0" />
        <div>
          <span className="font-bold">TODO: Design pending in mockups.</span>
          <span className="text-amber-700 ml-1">
            Using standard BuildPro reusable NumberedFormSection and shell components as specified in architecture prompt.
          </span>
        </div>
      </div>

      <HeroBanner
        title={title}
        subtitle={subtitle}
        actionButton={
          <button
            onClick={() => addToast({ title: 'Settings Saved', message: 'Preferences updated successfully.', type: 'success' })}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            <Save size={14} />
            <span>Save Settings</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NumberedFormSection
          stepNumber={1}
          title="Organization Information"
          subtitle="Basic company details displayed on invoices and reports."
        >
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company Registered Name</label>
              <input type="text" defaultValue="BuildPro Construction ERP Pvt. Ltd." className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">GSTIN Number</label>
              <input type="text" defaultValue="08AAGCB9988D1Z4" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono" />
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Headquarters Location</label>
              <input type="text" defaultValue="Jaipur, Rajasthan - 302020" className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            </div>
          </div>
        </NumberedFormSection>

        <NumberedFormSection
          stepNumber={2}
          title="System Preferences & Currency"
          subtitle="Default localization, date formats, and number grouping."
        >
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Default Currency</label>
              <select className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium">
                <option>INR (₹) - Indian Rupee (Lakh / Crore grouping)</option>
                <option>USD ($)</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Fiscal Year Starts</label>
              <select className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium">
                <option>April 1st (Indian Standard)</option>
                <option>January 1st</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Date Format</label>
              <input type="text" defaultValue="DD MMM YYYY (e.g. 24 Oct 2026)" readOnly className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700" />
            </div>
          </div>
        </NumberedFormSection>
      </div>
    </div>
  );
}
