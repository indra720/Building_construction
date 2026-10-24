import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  RotateCw,
  MapPin,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Download,
  Building2,
  Check
} from 'lucide-react';
import NumberedFormSection from '../common/NumberedFormSection';
import { useToast } from '../common/Toast';

export default function AddClientView({ onBack }) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    companyName: 'Agarwal Infra Pvt. Ltd.',
    clientType: 'Company',
    clientCode: 'CL-001',
    industry: 'Real Estate & Infrastructure',
    website: 'www.agarwalinfra.com',
    primaryContact: 'Amit Agarwal',
    designation: 'Director',
    email: 'amit@agarwalinfra.com',
    phone: '98765 43212',
    altPhone: '98765 43299',
    whatsapp: '98765 43212',
    address: 'Plot No. 12, Mansarovar Extension, Jaipur, Rajasthan - 302020',
    city: 'Jaipur',
    state: 'Rajasthan',
    pinCode: '302020',
    country: 'India',
    gstNumber: '08AAGCA1234F1Z5',
    panNumber: 'AAGCA1234F',
    creditLimit: '5000000',
    paymentTerms: '30 Days',
    currency: 'INR (₹)',
    isGovtClient: false,
    description: 'A leading real estate and infrastructure development company with focus on residential and commercial projects.',
    status: 'Active',
    clientSince: '14 Jan 2024',
    defaultPriority: 'Medium',
    sendEmail: true,
    sendWhatsApp: true,
    accountManager: 'Kamlesh Sharma'
  });

  const [tags, setTags] = useState(['Premium', 'Construction', 'Jaipur']);
  const [newTag, setNewTag] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  const [contactsList, setContactsList] = useState([
    { id: 1, name: 'Amit Agarwal', designation: 'Director', email: 'amit@agarwalinfra.com', phone: '98765 43212' },
    { id: 2, name: 'Neha Agarwal', designation: 'Project Manager', email: 'neha@agarwalinfra.com', phone: '98765 43213' },
    { id: 3, name: 'Rajesh Sharma', designation: 'Finance Head', email: 'rajesh@agarwalinfra.com', phone: '98765 43214' }
  ]);

  const [documentsList, setDocumentsList] = useState([
    { id: 1, name: 'GST Certificate.pdf', type: 'Tax Document', date: '14 Jan 2026' },
    { id: 2, name: 'PAN Card.pdf', type: 'Identity Proof', date: '14 Jan 2026' },
    { id: 3, name: 'Company Profile.pdf', type: 'Company Document', date: '15 Jan 2026' }
  ]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setShowAddTag(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSave = (e) => {
    e.preventDefault();
    addToast({
      title: 'Client Saved Successfully!',
      message: `${formData.companyName} (${formData.clientCode}) has been registered in BuildPro.`,
      type: 'success'
    });
    if (onBack) onBack();
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Top Breadcrumb & Header (Screen 050) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
            <span onClick={onBack} className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
              <ArrowLeft size={11} /> Clients
            </span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500">Client Management</span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-800 font-semibold">Add New Client</span>
          </div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Add New Client
          </h1>
          <p className="text-[11px] text-slate-500 font-normal">
            Create a new client and add all relevant details to manage their projects, contacts and communications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <ArrowLeft size={13} />
            <span>Back to Clients</span>
          </button>
          
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all"
          >
            <Save size={13} />
            <span>Save Client</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Form Layout (Left: Sections 1-4, Right: Sections 5-8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* Left Column (Sections 1-4) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Section 1: Basic Information */}
          <NumberedFormSection
            stepNumber={1}
            title="Basic Information"
            subtitle="Enter the basic details of the client."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-1">
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Company Name *</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Client Type *</label>
                <select
                  value={formData.clientType}
                  onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Company</option>
                  <option>Enterprise</option>
                  <option>Individual</option>
                  <option>Government</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Client Code *</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.clientCode}
                    readOnly
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold pr-7"
                  />
                  <button type="button" className="absolute right-2 top-2.5 text-blue-600 hover:text-blue-800" title="Auto-generate">
                    <RotateCw size={12} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Industry *</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Real Estate & Infrastructure</option>
                  <option>Commercial Construction</option>
                  <option>Residential Construction</option>
                  <option>Industrial Engineering</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Website</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Primary Contact Person *</label>
                <input
                  type="text"
                  value={formData.primaryContact}
                  onChange={(e) => setFormData({ ...formData, primaryContact: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Designation *</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Phone *</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Alternate Phone</label>
                <input
                  type="text"
                  value={formData.altPhone}
                  onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">WhatsApp</label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
            </div>
          </NumberedFormSection>

          {/* Section 2: Address Information */}
          <NumberedFormSection
            stepNumber={2}
            title="Address Information"
            subtitle="Enter the client's registered address details."
          >
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Address *</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none resize-none"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">City *</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Jaipur</option>
                  <option>Udaipur</option>
                  <option>Ajmer</option>
                  <option>Jodhpur</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">State *</label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Rajasthan</option>
                  <option>Delhi</option>
                  <option>Gujarat</option>
                  <option>Maharashtra</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">PIN Code *</label>
                <input
                  type="text"
                  value={formData.pinCode}
                  onChange={(e) => setFormData({ ...formData, pinCode: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>India</option>
                  <option>UAE</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addToast({ title: 'Location Detected', message: 'Lat: 26.8520, Lng: 75.7680 (Mansarovar, Jaipur)', type: 'info' })}
              className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-xs mt-1"
            >
              <MapPin size={13} />
              <span>Get Location Coordinates</span>
            </button>
          </NumberedFormSection>

          {/* Section 3: Financial Details */}
          <NumberedFormSection
            stepNumber={3}
            title="Financial Details"
            subtitle="Enter tax and payment related information."
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">GST Number</label>
                <input
                  type="text"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">PAN Number</label>
                <input
                  type="text"
                  value={formData.panNumber}
                  onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Credit Limit (₹)</label>
                <input
                  type="text"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Payment Terms</label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>30 Days</option>
                  <option>15 Days</option>
                  <option>45 Days</option>
                  <option>Immediate / Advance</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>INR (₹)</option>
                  <option>USD ($)</option>
                </select>
              </div>
              <div className="pt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="govToggle"
                  checked={formData.isGovtClient}
                  onChange={(e) => setFormData({ ...formData, isGovtClient: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300"
                />
                <label htmlFor="govToggle" className="font-semibold text-slate-700 text-xs cursor-pointer">
                  Is Government Client?
                </label>
              </div>
            </div>
          </NumberedFormSection>

          {/* Section 4: Additional Details */}
          <NumberedFormSection
            stepNumber={4}
            title="Additional Details"
            subtitle="Add tags, notes and other relevant information."
          >
            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1.5">Tags</label>
              <div className="flex flex-wrap items-center gap-2">
                {tags.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/80 font-semibold text-xs">
                    <span>{t}</span>
                    <button type="button" onClick={() => handleRemoveTag(t)} className="text-blue-400 hover:text-blue-700">✕</button>
                  </span>
                ))}
                {showAddTag ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Tag name"
                      className="px-2 py-1 border border-slate-200 rounded text-xs w-24 outline-none"
                    />
                    <button type="button" onClick={handleAddTag} className="px-2 py-1 bg-blue-600 text-white rounded font-bold text-xs">Add</button>
                    <button type="button" onClick={() => setShowAddTag(false)} className="px-1 text-slate-400">✕</button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowAddTag(true)}
                    className="px-2.5 py-1 rounded-lg border border-dashed border-slate-300 text-slate-600 hover:text-blue-600 hover:border-blue-400 text-xs font-semibold flex items-center gap-1"
                  >
                    <Plus size={12} />
                    <span>Add Tag</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Description</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none resize-none"
              />
            </div>
          </NumberedFormSection>

        </div>

        {/* Right Column (Sections 5-8) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Section 5: Company Logo */}
          <NumberedFormSection
            stepNumber={5}
            title="Company Logo"
            subtitle="Upload company logo (optional)."
          >
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="w-24 h-24 rounded-xl bg-white border border-slate-200 p-2 shadow-xs flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=160&auto=format&fit=crop&q=80"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-slate-900 text-xs">AGARWAL INFRA</p>
                <p className="text-[9px] text-slate-400 tracking-wider mt-0.5">BUILDING A BETTER TOMORROW</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Upload Logo', message: 'Select image file (PNG/JPG up to 2MB)', type: 'info' })}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Upload size={13} />
                  <span>Upload Logo</span>
                </button>
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Logo Removed', message: 'Company logo cleared', type: 'info' })}
                  className="px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold text-xs"
                >
                  Remove
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                Recommended size: 500 x 500 px • Max size: 2 MB (JPG, PNG, SVG)
              </p>
            </div>
          </NumberedFormSection>

          {/* Section 6: Contacts */}
          <NumberedFormSection
            stepNumber={6}
            title="Contacts"
            subtitle="Add initial contact persons for this client."
            actionButton={
              <button
                type="button"
                onClick={() => addToast({ title: 'New Contact', message: 'Add contact person modal', type: 'info' })}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
              >
                <Plus size={11} />
                <span>Add Contact</span>
              </button>
            }
          >
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase">
                    <th className="p-2 w-6 text-center">#</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Designation</th>
                    <th className="p-2">Phone</th>
                    <th className="p-2 w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {contactsList.map((c, i) => (
                    <tr key={c.id}>
                      <td className="p-2 text-center text-slate-400">{i + 1}</td>
                      <td className="p-2 font-semibold text-slate-800">{c.name}</td>
                      <td className="p-2 text-slate-500 text-[11px]">{c.designation}</td>
                      <td className="p-2 text-slate-700 text-[11px]">{c.phone}</td>
                      <td className="p-2 text-center">
                        <button type="button" className="text-slate-400 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NumberedFormSection>

          {/* Section 7: Documents */}
          <NumberedFormSection
            stepNumber={7}
            title="Documents"
            subtitle="Upload important client documents."
            actionButton={
              <button
                type="button"
                onClick={() => addToast({ title: 'Upload Document', message: 'Select file to upload', type: 'info' })}
                className="flex items-center gap-1 px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
              >
                <Plus size={11} />
                <span>Upload Document</span>
              </button>
            }
          >
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[10px] uppercase">
                    <th className="p-2 w-6 text-center">#</th>
                    <th className="p-2">Document Name</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Date</th>
                    <th className="p-2 w-12 text-center"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {documentsList.map((d, i) => (
                    <tr key={d.id}>
                      <td className="p-2 text-center text-slate-400">{i + 1}</td>
                      <td className="p-2 font-semibold text-slate-800">{d.name}</td>
                      <td className="p-2 text-slate-500 text-[11px]">{d.type}</td>
                      <td className="p-2 text-slate-400 text-[10px]">{d.date}</td>
                      <td className="p-2 text-center">
                        <button type="button" className="text-slate-400 hover:text-red-600">
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </NumberedFormSection>

          {/* Section 8: Status & Settings */}
          <NumberedFormSection
            stepNumber={8}
            title="Status & Settings"
            subtitle="Set client status and notification preferences."
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>Active</option>
                  <option>Under Review</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Default Priority</label>
                <select
                  value={formData.defaultPriority}
                  onChange={(e) => setFormData({ ...formData, defaultPriority: e.target.value })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendEmail}
                  onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300"
                />
                <span className="text-slate-700 font-medium text-xs">Send Email Notifications for Project Milestones</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendWhatsApp}
                  onChange={(e) => setFormData({ ...formData, sendWhatsApp: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300"
                />
                <span className="text-slate-700 font-medium text-xs">Send WhatsApp Updates for Invoices & Payments</span>
              </label>
            </div>

            <div className="pt-2">
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Assign to Account Manager</label>
              <select
                value={formData.accountManager}
                onChange={(e) => setFormData({ ...formData, accountManager: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-medium focus:border-blue-500 outline-none cursor-pointer"
              >
                <option>Kamlesh Sharma (Admin)</option>
                <option>Amit Verma (Project Manager)</option>
                <option>Rohit Jain (Sales Lead)</option>
              </select>
            </div>
          </NumberedFormSection>

        </div>

      </div>
    </div>
  );
}
