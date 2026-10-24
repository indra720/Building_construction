import React, { useState } from 'react';
import { Search, MapPin, Bell, ChevronDown, Check, User, Settings, LogOut, ExternalLink, Menu } from 'lucide-react';
import { currentUser } from '../../data/mockData';

export default function Header({
  isCollapsed,
  activeRoute = 'dashboard',
  onOpenCommandPalette,
  onToggleMobileSidebar
}) {
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Jaipur, Rajasthan');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const locations = [
    'Jaipur, Rajasthan',
    'Tonk Road, Jaipur',
    'Ajmer Road, Jaipur',
    'Udaipur, Rajasthan',
    'Kishangarh, Rajasthan'
  ];

  const searchPlaceholders = {
    dashboard: 'Search analytics, projects, clients, revenue, expenses...',
    leads: 'Search leads, clients, project enquiries...',
    clients: 'Search client companies, contacts, GSTIN...',
    contacts: 'Search contacts, designations, phone numbers...',
    projects: 'Search projects, locations, managers, budgets...',
    tasks: 'Search tasks, work orders, assignees, priorities...',
    materials: 'Search materials, SKU, categories, inventory...',
    purchase_orders: 'Search purchase orders, suppliers, PO numbers...',
    invoices: 'Search invoices, payments, client billing...'
  };

  const placeholder = searchPlaceholders[activeRoute] || 'Search clients, projects, contacts, documents...';

  return (
    <header
      className={`fixed top-0 right-0 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/90 z-20 flex items-center justify-between px-3 sm:px-6 transition-all duration-300 ${
        isCollapsed ? 'lg:left-16' : 'lg:left-60'
      } left-0`}
    >
      {/* Mobile Hamburger Toggle & Global Search Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-1 min-w-0 max-w-xs sm:max-w-md">
        <button
          onClick={onToggleMobileSidebar}
          className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden shrink-0 transition-colors"
          title="Toggle Sidebar"
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full min-w-0">
          <button
            onClick={onOpenCommandPalette}
            className="w-full flex items-center justify-between pl-8 sm:pl-9 pr-2 py-1.5 bg-slate-50/80 hover:bg-slate-100/80 text-left text-xs rounded-lg border border-slate-200/90 text-slate-400 hover:text-slate-600 transition-all cursor-pointer shadow-2xs"
          >
            <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-slate-400">
              <Search size={14} />
            </div>
            <span className="truncate pr-1 text-[11px] sm:text-xs">{placeholder}</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-semibold text-slate-500 bg-white border border-slate-200 rounded shrink-0 shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Location Selector (Hidden on mobile & small tablet to prevent header cramping) */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowLocationMenu(!showLocationMenu)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 shadow-2xs"
          >
            <MapPin size={13} className="text-blue-600 shrink-0" />
            <span className="max-w-[120px] truncate">{selectedLocation}</span>
            <ChevronDown size={13} className="text-slate-400 ml-0.5" />
          </button>

          {showLocationMenu && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-dropdown border border-slate-200 py-1 z-30 text-xs animate-in fade-in-50 duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select Site Location
              </div>
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setShowLocationMenu(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 font-medium text-slate-700"
                >
                  <span>{loc}</span>
                  {selectedLocation === loc && <Check size={13} className="text-blue-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 transition-colors"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
              {currentUser.notificationsCount}
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-1.5 w-72 sm:w-80 bg-white rounded-xl shadow-dropdown border border-slate-200 py-2 z-30 text-xs animate-in fade-in-50 duration-100">
              <div className="px-3.5 py-1.5 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">Notifications</span>
                <span className="text-[10px] font-semibold text-blue-600 cursor-pointer hover:underline">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                  <p className="font-semibold text-slate-800 leading-tight">New PO-2026-046 pending approval</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">UltraTech Cement • ₹8,20,040</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                  <p className="font-semibold text-slate-800 leading-tight">Low stock alert: RCC Pipe (4 inch)</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Current stock is below reorder threshold</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer transition-colors">
                  <p className="font-semibold text-slate-800 leading-tight">Lead converted: Rajesh Kumar</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">RK Constructions residential inquiry</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">3 hours ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Chip - Avatar always visible, Name shown only on XL desktop screen */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1.5 sm:gap-2 pl-1.5 sm:pl-2 border-l border-slate-200 cursor-pointer py-1 text-left"
            title={`${currentUser.name} (${currentUser.role})`}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-blue-500/20 aspect-square shrink-0"
            />
            {/* Hidden on md/tablet, shown only on XL */}
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-900 leading-none">
                {currentUser.name}
              </span>
              <span className="text-[10px] font-semibold text-blue-600 mt-0.5">
                {currentUser.role}
              </span>
            </div>
            <ChevronDown size={13} className="hidden xl:block text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-dropdown border border-slate-200 py-1.5 z-30 text-xs animate-in fade-in-50 duration-100">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-[11px] text-slate-500">Admin Account</p>
              </div>
              <button className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium">
                <User size={14} className="text-slate-400" />
                <span>My Profile</span>
              </button>
              <button className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium">
                <Settings size={14} className="text-slate-400" />
                <span>Account Settings</span>
              </button>
              <div className="border-t border-slate-100 my-1"></div>
              <button className="w-full flex items-center gap-2 px-3.5 py-2 hover:bg-rose-50 text-rose-600 font-medium">
                <LogOut size={14} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
