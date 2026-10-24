import React, { useState } from 'react';
import {
  LayoutDashboard,
  UserPlus,
  Building2,
  Users,
  FolderGit2,
  CheckSquare,
  Compass,
  Milestone,
  FileSpreadsheet,
  Folder,
  FileCheck,
  Calculator,
  Receipt,
  Wallet,
  PieChart,
  FileBarChart,
  TrendingUp,
  Settings2,
  HardHat,
  Truck,
  Boxes,
  Store,
  Building,
  ShieldCheck,
  Settings,
  Headphones,
  ChevronRight,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  PackageCheck,
  BarChart3,
  AlertTriangle,
  RotateCcw,
  X
} from 'lucide-react';

export default function Sidebar({
  activeRoute,
  setActiveRoute,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen = false,
  setIsMobileOpen
}) {
  const [openSections, setOpenSections] = useState({
    projectManagement: true,
    contractsFinance: false,
    reportsAnalytics: false,
    resources: true,
    inventorySubmenu: true,
    settings: false,
  });

  const handleNavigate = (routeId) => {
    setActiveRoute(routeId);
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const menuSections = [
    {
      group: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'leads', label: 'Leads & Enquiries', icon: UserPlus },
        { id: 'clients', label: 'Clients', icon: Building2 },
        { id: 'contacts', label: 'Contacts', icon: Users },
      ]
    },
    {
      group: 'PROJECT MANAGEMENT',
      title: 'Project Management',
      key: 'projectManagement',
      items: [
        { id: 'projects', label: 'Projects', icon: FolderGit2 },
        { id: 'tasks', label: 'Tasks & Work Orders', icon: CheckSquare },
        { id: 'site_management', label: 'Site Management', icon: Compass },
        { id: 'milestones', label: 'Milestones', icon: Milestone },
        { id: 'site_reports', label: 'Site Reports', icon: FileSpreadsheet },
        { id: 'documents', label: 'Documents', icon: Folder },
      ]
    },
    {
      group: 'CONTRACTS & FINANCE',
      title: 'Contracts & Finance',
      key: 'contractsFinance',
      items: [
        { id: 'contracts', label: 'Contracts', icon: FileCheck },
        { id: 'estimates', label: 'Estimates & Quotations', icon: Calculator },
        { id: 'invoices', label: 'Invoices & Payments', icon: Receipt },
        { id: 'expenses', label: 'Expenses', icon: Wallet },
        { id: 'budget', label: 'Budget Management', icon: PieChart },
      ]
    },
    {
      group: 'REPORTS & ANALYTICS',
      title: 'Reports & Analytics',
      key: 'reportsAnalytics',
      items: [
        { id: 'reports', label: 'Reports', icon: FileBarChart },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'custom_reports', label: 'Custom Reports', icon: Settings2 },
      ]
    },
    {
      group: 'RESOURCES',
      title: 'Resources',
      key: 'resources',
      items: [
        { id: 'labour', label: 'Labour & Attendance', icon: HardHat },
        { id: 'equipment', label: 'Equipment & Machinery', icon: Truck },
        {
          id: 'materials_parent',
          label: 'Materials & Inventory',
          icon: Boxes,
          isSubmenu: true,
          submenuKey: 'inventorySubmenu',
          subItems: [
            { id: 'materials', label: 'Materials', icon: Boxes },
            { id: 'purchase_orders', label: 'Purchase Orders', icon: Receipt },
            { id: 'grn', label: 'Goods Received (GRN)', icon: PackageCheck },
            { id: 'stock_management', label: 'Stock Management', icon: ClipboardList },
            { id: 'material_requests', label: 'Material Requests', icon: ClipboardList },
            { id: 'supplier_performance', label: 'Supplier Performance', icon: BarChart3 },
            { id: 'material_analytics', label: 'Material Analytics', icon: TrendingUp },
            { id: 'claims_analytics', label: 'Claims Analytics', icon: AlertTriangle },
            { id: 'custom_reports', label: 'Custom Reports', icon: Settings2 },
          ]
        },
        { id: 'vendors', label: 'Vendors & Suppliers', icon: Store },
      ]
    },
    {
      group: 'SETTINGS',
      title: 'Settings',
      key: 'settings',
      items: [
        { id: 'company_profile', label: 'Company Profile', icon: Building },
        { id: 'users_roles', label: 'Users & Roles', icon: ShieldCheck },
        { id: 'general_settings', label: 'General Settings', icon: Settings },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside 
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#0B1A33] to-[#0F2347] text-slate-300 flex flex-col z-50 lg:z-30 transition-all duration-300 ease-in-out border-r border-[#162847] ${
          isMobileOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-16' : 'lg:w-60'}`}
      >
        {/* Brand Header */}
        <div className="h-14 px-3.5 flex items-center justify-between border-b border-[#162847] bg-[#0B1A33] shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-md shadow-orange-500/25 shrink-0">
              <div className="flex items-end gap-[2.5px] h-4">
                <span className="w-1.5 h-2.5 bg-white/90 rounded-xs"></span>
                <span className="w-1.5 h-4 bg-white rounded-xs"></span>
                <span className="w-1.5 h-3 bg-white/80 rounded-xs"></span>
              </div>
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-[15px] tracking-tight leading-none">
                  BuildPro
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider mt-0.5">
                  Construction CRM
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {/* Mobile close button */}
            <button
              onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
              className="lg:hidden p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title="Close navigation"
            >
              <X size={17} />
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:block p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
            </button>
          </div>
        </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5 text-xs font-medium scrollbar-thin">
        {menuSections.map((section, idx) => {
          if (section.group === 'MAIN') {
            return (
              <div key={idx} className="space-y-0.5">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeRoute === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'sidebar-active-gradient text-white'
                          : 'text-slate-300 hover:text-white hover:bg-[#142749]'
                      }`}
                      title={item.label}
                    >
                      <Icon size={16} className="shrink-0" />
                      {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            );
          }

          const isOpen = openSections[section.key];
          return (
            <div key={idx} className="pt-0.5">
              {(!isCollapsed || isMobileOpen) && (
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[10px] tracking-wider font-bold text-slate-400 uppercase hover:text-slate-200 transition-colors"
                >
                  <span>{section.title}</span>
                  {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                </button>
              )}
              {(isOpen || (isCollapsed && !isMobileOpen)) && (
                <div className="mt-0.5 space-y-0.5">
                  {section.items.map(item => {
                    const Icon = item.icon;
                    if (item.isSubmenu) {
                      const isSubmenuOpen = openSections[item.submenuKey];
                      const isAnySubActive = item.subItems.some(sub => sub.id === activeRoute);

                      return (
                        <div key={item.id}>
                          <button
                            onClick={() => toggleSection(item.submenuKey)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              isAnySubActive && isCollapsed && !isMobileOpen
                                ? 'sidebar-active-gradient text-white'
                                : 'text-slate-300 hover:text-white hover:bg-[#142749]'
                            }`}
                            title={item.label}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon size={16} className="shrink-0" />
                              {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
                            </div>
                            {(!isCollapsed || isMobileOpen) && (
                              isSubmenuOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />
                            )}
                          </button>

                          {(!isCollapsed || isMobileOpen) && isSubmenuOpen && (
                            <div className="pl-6 pr-1 py-1 space-y-0.5 border-l border-slate-700/60 ml-4 my-0.5">
                              {item.subItems.map(subItem => {
                                const SubIcon = subItem.icon;
                                const isSubActive = activeRoute === subItem.id;
                                return (
                                  <button
                                    key={subItem.id}
                                    onClick={() => handleNavigate(subItem.id)}
                                    className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all ${
                                      isSubActive
                                        ? 'bg-orange-500 text-white font-bold shadow-xs'
                                        : 'text-slate-400 hover:text-white hover:bg-[#172c54]'
                                    }`}
                                  >
                                    <SubIcon size={13} className="shrink-0" />
                                    <span className="truncate">{subItem.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    const isActive = activeRoute === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigate(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive
                            ? 'sidebar-active-gradient text-white font-bold'
                            : 'text-slate-300 hover:text-white hover:bg-[#142749]'
                        }`}
                        title={item.label}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon size={15} className="shrink-0" />
                          {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
                        </div>
                        {(!isCollapsed || isMobileOpen) && !isActive && (
                          <ChevronRight size={12} className="text-slate-500 opacity-60" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Support / Help Card pinned at bottom */}
      {(!isCollapsed || isMobileOpen) && (
        <div className="p-2.5 m-2.5 rounded-xl bg-[#0f2142] border border-slate-800 shrink-0 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/15 text-orange-400 flex items-center justify-center shrink-0">
              <Headphones size={15} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-tight">Need Help?</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Chat with our support team</p>
            </div>
          </div>
        </div>
      )}
    </aside>
    </>
  );
}
