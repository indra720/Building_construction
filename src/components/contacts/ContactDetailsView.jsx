import React, { useState } from 'react';
import {
  ArrowLeft,
  Pencil,
  Plus,
  Phone,
  Mail,
  MessageCircle,
  Building2,
  MapPin,
  User,
  Globe,
  Calendar,
  Clock,
  CalendarClock,
  FileText,
  UserCheck,
  MoreHorizontal,
  LayoutDashboard,
  MessageSquare,
  FolderGit2,
  Folder,
  CheckSquare,
  History,
  Eye,
  Download
} from 'lucide-react';
import { contactData } from '../../data/mockData';

export default function ContactDetailsView() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'communication', label: 'Communication (12)', icon: MessageSquare },
    { id: 'projects', label: 'Projects (4)', icon: FolderGit2 },
    { id: 'documents', label: 'Documents (18)', icon: Folder },
    { id: 'tasks', label: 'Tasks (6)', icon: CheckSquare },
    { id: 'notes', label: 'Notes (5)', icon: FileText },
    { id: 'meetings', label: 'Meetings (8)', icon: Calendar },
    { id: 'activity', label: 'Activity Log', icon: History },
  ];

  return (
    <div className="space-y-3.5 w-full">
      {/* Breadcrumb & Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mb-1">
            <span className="text-blue-600 hover:underline cursor-pointer flex items-center gap-1 font-semibold">
              <ArrowLeft size={11} /> Contacts
            </span>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-700 font-semibold">Contact Details</span>
          </div>
          <h1 className="text-[22px] font-extrabold text-slate-900 tracking-tight leading-tight">
            Contact Details
          </h1>
          <p className="text-[11px] text-slate-500 font-normal">
            View and manage complete contact information, communication history, related projects and documents.
          </p>
        </div>

        {/* Action Buttons Top Right */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors">
            <ArrowLeft size={13} />
            <span>Back to Contacts</span>
          </button>
          
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-blue-600 text-xs font-semibold shadow-xs transition-colors">
            <Pencil size={12} />
            <span>Edit Contact</span>
          </button>

          <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#ff5a1f] hover:bg-[#ea470c] text-white text-xs font-semibold shadow-sm shadow-orange-500/30 transition-all">
            <Plus size={14} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Hero Contact Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Profile Photo & Info */}
          <div className="lg:col-span-4 flex items-center gap-3.5">
            <div className="relative shrink-0">
              <img
                src={contactData.avatar}
                alt={contactData.name}
                className="w-19 h-19 rounded-full object-cover ring-4 ring-slate-100 shadow-xs"
              />
              <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-extrabold text-slate-900 leading-none">
                  {contactData.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
              
              <p className="text-xs font-semibold text-slate-700">
                {contactData.designation}
              </p>
              
              <p className="text-xs text-slate-500">
                {contactData.company}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#fff8eb] text-[#b45309] border border-[#fde68a]">
                  Key Contact
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
                  Decision Maker
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#faf5ff] text-[#7e22ce] border border-[#e9d5ff]">
                  Premium Client
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details Meta Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs border-y lg:border-y-0 lg:border-x border-slate-100 py-2.5 lg:py-0 lg:px-4">
            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2 text-[11px]">
                <Phone size={13} className="text-blue-600 shrink-0" />
                <span className="font-semibold text-slate-800">{contactData.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Mail size={13} className="text-blue-600 shrink-0" />
                <span className="font-medium text-blue-600 hover:underline cursor-pointer truncate">
                  {contactData.email}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                  <Phone size={8} />
                </div>
                <span className="font-semibold text-slate-800">{contactData.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Building2 size={13} className="text-blue-600 shrink-0" />
                <span className="font-medium text-slate-700 truncate">{contactData.company}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-slate-600">
              <div className="flex items-center gap-2 text-[11px]">
                <MapPin size={13} className="text-blue-600 shrink-0" />
                <span className="text-slate-700 truncate">{contactData.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <User size={13} className="text-blue-600 shrink-0" />
                <span className="text-slate-700 truncate">{contactData.designation}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Globe size={13} className="text-blue-600 shrink-0" />
                <span className="text-blue-600 hover:underline cursor-pointer truncate">{contactData.website}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Calendar size={13} className="text-blue-600 shrink-0" />
                <span className="text-slate-500">Added on {contactData.addedOn}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <Clock size={13} className="text-blue-600 shrink-0" />
                <span className="text-slate-500">Last Contact: {contactData.lastContact}</span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons Grid Top Right */}
          <div className="lg:col-span-3 flex flex-col gap-1.5">
            <div className="grid grid-cols-3 gap-1.5">
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors">
                <Phone size={12} />
                <span>Call</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#eff6ff] hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-semibold shadow-xs transition-colors">
                <Mail size={12} />
                <span>Email</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-[#16a34a] hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors">
                <MessageCircle size={12} />
                <span>WhatsApp</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs transition-colors">
                <CalendarClock size={12} />
                <span className="truncate">Schedule Meeting</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs transition-colors">
                <Pencil size={12} />
                <span>Add Note</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs transition-colors">
                <UserCheck size={12} />
                <span>Assign Task</span>
              </button>
              <button className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-medium shadow-2xs transition-colors">
                <MoreHorizontal size={13} />
                <span>More Actions</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Tabs Navigation Bar - Exact Solid Blue Active Pill as in Original */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-1.5 flex items-center gap-1 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#1d64e8] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* ROW 1: EQUAL LEVEL TOP ROW CARDS                          */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">

        {/* COLUMN 1: Basic Information (col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Basic Information
              </h3>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                <Pencil size={11} /> Edit
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Full Name</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.name}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Designation</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.designation}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Company</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.company}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Contact Type</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.contactType}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Phone</span>
                <span className="col-span-2 font-semibold text-slate-800 text-[11px]">{contactData.phone}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Alternate Phone</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.alternatePhone}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Email</span>
                <span className="col-span-2 font-medium text-blue-600 hover:underline cursor-pointer truncate text-[11px]">
                  {contactData.email}
                </span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Alternate Email</span>
                <span className="col-span-2 font-medium text-blue-600 hover:underline cursor-pointer truncate text-[11px]">
                  {contactData.alternateEmail}
                </span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Website</span>
                <span className="col-span-2 font-medium text-blue-600 hover:underline cursor-pointer truncate text-[11px]">
                  {contactData.website}
                </span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Date of Birth</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.dob}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Language</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.language}</span>
              </div>
              <div className="grid grid-cols-3 py-0.5">
                <span className="text-slate-400 text-[11px]">Source</span>
                <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.source}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 pt-2 mt-2 border-t border-slate-100 items-center">
            <span className="text-slate-400 text-[11px]">Tags</span>
            <div className="col-span-2 flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#fff8eb] text-[#b45309] border border-[#fde68a]">
                Key Contact
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#faf5ff] text-[#7e22ce] border border-[#e9d5ff]">
                Premium
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]">
                Jaipur
              </span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Address Information + Company Information (col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 justify-between">
          
          {/* Address Information Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Address Information
              </h3>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                <Pencil size={11} /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-7 space-y-1.5 text-xs">
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Address</span>
                  <span className="col-span-2 font-medium text-slate-800 leading-snug text-[11px]">
                    {contactData.address}
                  </span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">City</span>
                  <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.city}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">State</span>
                  <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.state}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">PIN Code</span>
                  <span className="col-span-2 font-semibold text-slate-800 text-[11px]">{contactData.pinCode}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Country</span>
                  <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.country}</span>
                </div>
              </div>

              {/* Mini Map Box */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-2.5 rounded-lg border border-slate-200 bg-slate-50 relative overflow-hidden">
                <div className="w-full h-18 bg-blue-50/70 rounded border border-slate-200/80 flex flex-col items-center justify-center relative">
                  <MapPin size={20} className="text-red-500 drop-shadow animate-bounce" />
                  <p className="text-[10px] font-bold text-slate-700 mt-1 text-center px-1 leading-tight">
                    Mansarovar Extension<br/>Jaipur, Rajasthan
                  </p>
                </div>
                <button className="mt-2 text-[10px] font-semibold text-blue-600 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1 rounded shadow-2xs transition-colors">
                  View on Map
                </button>
              </div>
            </div>
          </div>

          {/* Company Information Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Company Information
              </h3>
              <button className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                <Pencil size={11} /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-7 space-y-1.5 text-xs">
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Company Name</span>
                  <span className="col-span-2 font-bold text-slate-900 text-[11px]">{contactData.companyInfo.name}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Industry</span>
                  <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.companyInfo.industry}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Company Size</span>
                  <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.companyInfo.size}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">GST Number</span>
                  <span className="col-span-2 font-semibold text-slate-800 font-mono text-[10px]">{contactData.companyInfo.gst}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">PAN Number</span>
                  <span className="col-span-2 font-semibold text-slate-800 font-mono text-[10px]">{contactData.companyInfo.pan}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Client Since</span>
                  <span className="col-span-2 font-medium text-slate-800 text-[11px]">{contactData.companyInfo.clientSince}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Total Projects</span>
                  <span className="col-span-2 font-bold text-blue-600 text-[11px]">{contactData.companyInfo.totalProjects}</span>
                </div>
                <div className="grid grid-cols-3 py-0.5">
                  <span className="text-slate-400 text-[11px]">Total Project Value</span>
                  <span className="col-span-2 font-extrabold text-emerald-700 text-xs">{contactData.companyInfo.totalProjectValue}</span>
                </div>
              </div>

              {/* Company Logo Display Card */}
              <div className="md:col-span-5 flex flex-col items-center justify-center p-3.5 rounded-lg border border-amber-200/60 bg-gradient-to-b from-amber-50/40 to-white text-center shadow-2xs">
                <div className="flex items-end justify-center gap-1 h-10 mb-1.5">
                  <div className="w-2.5 h-6 bg-amber-500 rounded-2xs"></div>
                  <div className="w-2.5 h-10 bg-amber-600 rounded-2xs"></div>
                  <div className="w-2.5 h-8 bg-slate-800 rounded-2xs"></div>
                  <div className="w-2.5 h-5.5 bg-amber-700 rounded-2xs"></div>
                </div>
                <h4 className="font-extrabold text-slate-900 text-xs tracking-wider leading-none">
                  AGARWAL INFRA
                </h4>
                <p className="text-[8.5px] font-semibold text-amber-700 tracking-tight mt-1 leading-none">
                  BUILDING A BETTER TOMORROW
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* COLUMN 3: Recent Communication + Upcoming Activities (col-span-3) */}
        <div className="lg:col-span-3 flex flex-col gap-3.5 justify-between">
          
          {/* Recent Communication Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Recent Communication
              </h3>
              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">
                View All &rarr;
              </button>
            </div>

            <div className="space-y-2.5">
              {contactData.recentCommunication.map(item => {
                const iconColor = {
                  call: 'bg-blue-600 text-white',
                  email: 'bg-blue-500 text-white',
                  whatsapp: 'bg-emerald-500 text-white',
                  meeting: 'bg-blue-600 text-white',
                  note: 'bg-amber-500 text-white',
                }[item.type] || 'bg-slate-600 text-white';

                const IconComponent = {
                  call: Phone,
                  email: Mail,
                  whatsapp: MessageCircle,
                  meeting: Calendar,
                  note: FileText,
                }[item.type] || MessageSquare;

                return (
                  <div key={item.id} className="flex items-start gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${iconColor} shadow-2xs`}>
                      <IconComponent size={11} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-[11px] font-semibold text-slate-900 truncate">
                          {item.title}
                        </p>
                        <span className="text-[9px] text-slate-400 whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Activities Card */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex-1">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Upcoming Activities
              </h3>
              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">
                View All &rarr;
              </button>
            </div>

            <div className="space-y-2">
              {contactData.upcomingActivities.map(act => {
                const iconColor = {
                  meeting: 'bg-blue-600 text-white',
                  call: 'bg-blue-600 text-white',
                  proposal: 'bg-emerald-600 text-white',
                }[act.type] || 'bg-slate-600 text-white';

                const IconComponent = {
                  meeting: Calendar,
                  call: Phone,
                  proposal: FileText,
                }[act.type] || Calendar;

                return (
                  <div key={act.id} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${iconColor}`}>
                      <IconComponent size={12} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-900 truncate">
                        {act.title}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {act.desc}
                      </p>
                      <p className="text-[9px] font-semibold text-blue-600">
                        {act.date} {act.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* ROW 2: EQUAL LEVEL BOTTOM ROW CARDS (STARTS HORIZONTALLY) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">

        {/* BOTTOM COLUMN 1: Related Projects (col-span-4) */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Related Projects (4)
              </h3>
              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">
                View All &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-1.5 font-medium">#</th>
                    <th className="pb-1.5 font-medium">Project Name</th>
                    <th className="pb-1.5 font-medium">Type</th>
                    <th className="pb-1.5 font-medium">Status</th>
                    <th className="pb-1.5 font-medium">Value (₹)</th>
                    <th className="pb-1.5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contactData.projects.map((proj) => {
                    const statusStyles = {
                      Ongoing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      Planning: 'bg-blue-50 text-blue-700 border-blue-200',
                      Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      'On Hold': 'bg-amber-50 text-amber-800 border-amber-200',
                    }[proj.status] || 'bg-slate-50 text-slate-700 border-slate-200';

                    return (
                      <tr key={proj.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2 text-[11px] text-slate-400">{proj.id}</td>
                        <td className="py-2 text-[11px] font-medium text-blue-600 hover:underline cursor-pointer">
                          {proj.name}
                        </td>
                        <td className="py-2 text-[11px] text-slate-500">{proj.type}</td>
                        <td className="py-2">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-medium border ${statusStyles}`}>
                            <span className="w-1 h-1 rounded-full bg-current"></span>
                            {proj.status}
                          </span>
                        </td>
                        <td className="py-2 text-[11px] font-semibold text-slate-800">{proj.value}</td>
                        <td className="py-2 text-right">
                          <button className="p-1 rounded-full text-blue-600 hover:bg-blue-50">
                            <Eye size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM COLUMN 2: Documents (col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Documents (18)
              </h3>
              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">
                View All &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider border-b border-slate-100">
                    <th className="pb-1.5 font-medium">#</th>
                    <th className="pb-1.5 font-medium">Document Name</th>
                    <th className="pb-1.5 font-medium">Type</th>
                    <th className="pb-1.5 font-medium">Upload Date</th>
                    <th className="pb-1.5 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contactData.documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2 text-[11px] text-slate-400">{doc.id}</td>
                      <td className="py-2 text-[11px] font-medium text-blue-600 hover:underline cursor-pointer flex items-center gap-1.5">
                        <FileText size={13} className="text-red-500 shrink-0" />
                        <span className="truncate max-w-[150px]">{doc.name}</span>
                      </td>
                      <td className="py-2 text-[11px] text-slate-500">{doc.type}</td>
                      <td className="py-2 text-[11px] text-slate-500 whitespace-nowrap">{doc.uploadDate}</td>
                      <td className="py-2 text-right">
                        <button className="p-1 rounded-full text-blue-600 hover:bg-blue-50">
                          <Download size={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* BOTTOM COLUMN 3: Notes (col-span-3) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">
                Notes (5)
              </h3>
              <button className="text-[10px] font-semibold text-blue-600 hover:text-blue-700">
                View All &rarr;
              </button>
            </div>

            <div className="space-y-2.5">
              {contactData.notes.map(note => (
                <div key={note.id} className="flex items-start gap-2 pb-2 border-b border-slate-100 last:border-0 last:pb-0">
                  <img
                    src={note.avatar}
                    alt={note.author}
                    className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-bold text-slate-900 truncate">
                        {note.author}
                      </span>
                      <span className="text-[9px] text-slate-400 whitespace-nowrap">
                        {note.time}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-600 leading-snug mt-0.5">
                      {note.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
