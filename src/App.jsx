import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import CommandPalette from './components/common/CommandPalette';
import { ToastProvider } from './components/common/Toast';

// Module Views
import DashboardView from './components/dashboard/DashboardView';
import LeadsView from './components/leads/LeadsView';
import ClientsListView from './components/clients/ClientsListView';
import AddClientView from './components/clients/AddClientView';
import ContactDetailsView from './components/contacts/ContactDetailsView';
import ProjectsView from './components/projects/ProjectsView';
import TasksView from './components/tasks/TasksView';
import SitesView from './components/projects/SitesView';
import MilestonesView from './components/projects/MilestonesView';
import SiteReportsView from './components/projects/SiteReportsView';
import DocumentsView from './components/projects/DocumentsView';
import ContractsView from './components/finance/ContractsView';
import EstimatesView from './components/finance/EstimatesView';
import InvoicesView from './components/finance/InvoicesView';
import ExpensesView from './components/finance/ExpensesView';
import BudgetView from './components/finance/BudgetView';
import LabourAttendanceView from './components/resources/LabourAttendanceView';
import EquipmentView from './components/resources/EquipmentView';
import MaterialsInventoryView from './components/inventory/MaterialsInventoryView';
import PurchaseOrdersListView from './components/inventory/PurchaseOrdersListView';
import CreatePurchaseOrderView from './components/inventory/CreatePurchaseOrderView';
import PODetailsView from './components/inventory/PODetailsView';
import GRNView from './components/inventory/GRNView';
import VendorsView from './components/resources/VendorsView';
import SettingsPlaceholderView from './components/settings/SettingsPlaceholderView';
import GeneralSettingsView from './components/settings/GeneralSettingsView';
import UsersRolesView from './components/settings/UsersRolesView';
import ClaimsAnalyticsView from './components/inventory/ClaimsAnalyticsView';
import CustomReportsView from './components/reports/CustomReportsView';

export default function App() {
  const [activeRoute, setActiveRoute] = useState('dashboard');
  const [subRoute, setSubRoute] = useState(null); // e.g. 'new_client', 'new_po', 'po_details'
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const navigateTo = (route, sub = null) => {
    setActiveRoute(route);
    setSubRoute(sub);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    // Sub-routes take priority
    if (activeRoute === 'clients' && subRoute === 'new') {
      return <AddClientView onBack={() => setSubRoute(null)} />;
    }
    if (activeRoute === 'purchase_orders' && subRoute === 'new') {
      return <CreatePurchaseOrderView onBack={() => setSubRoute(null)} />;
    }
    if (activeRoute === 'purchase_orders' && subRoute === 'details') {
      return <PODetailsView onBack={() => setSubRoute(null)} onNavigate={navigateTo} />;
    }

    switch (activeRoute) {
      case 'dashboard':
      case 'analytics':
      case 'material_analytics':
        return <DashboardView onNavigate={navigateTo} />;

      case 'reports':
      case 'custom_reports':
      case 'inventory_reports':
        return <CustomReportsView onNavigate={navigateTo} />;

      case 'claims_analytics':
        return <ClaimsAnalyticsView onNavigate={navigateTo} />;

      case 'leads':
        return <LeadsView onNavigate={navigateTo} />;

      case 'clients':
        return <ClientsListView onAddNew={() => setSubRoute('new')} onNavigate={navigateTo} />;

      case 'contacts':
        return <ContactDetailsView onNavigate={navigateTo} />;

      case 'projects':
        return <ProjectsView onAddNew={() => setSubRoute('new')} onNavigate={navigateTo} />;

      case 'tasks':
        return <TasksView onAddNew={() => setSubRoute('new')} onNavigate={navigateTo} />;

      case 'site_management':
        return <SitesView onNavigate={navigateTo} />;

      case 'milestones':
        return <MilestonesView onNavigate={navigateTo} />;

      case 'site_reports':
        return <SiteReportsView onNavigate={navigateTo} />;

      case 'documents':
        return <DocumentsView onNavigate={navigateTo} />;

      case 'contracts':
        return <ContractsView onNavigate={navigateTo} />;

      case 'estimates':
        return <EstimatesView onNavigate={navigateTo} />;

      case 'invoices':
        return <InvoicesView onNavigate={navigateTo} />;

      case 'expenses':
        return <ExpensesView onNavigate={navigateTo} />;

      case 'budget':
        return <BudgetView onNavigate={navigateTo} />;

      case 'labour':
        return <LabourAttendanceView onNavigate={navigateTo} />;

      case 'equipment':
        return <EquipmentView onNavigate={navigateTo} />;

      case 'materials':
      case 'stock_management':
      case 'material_requests':
        return <MaterialsInventoryView onAddNew={() => setSubRoute('new')} onNavigate={navigateTo} />;

      case 'purchase_orders':
        return (
          <PurchaseOrdersListView
            onAddNew={() => setSubRoute('new')}
            onSelectPO={() => setSubRoute('details')}
            onNavigate={navigateTo}
          />
        );

      case 'grn':
        return <GRNView onNavigate={navigateTo} />;

      case 'vendors':
      case 'supplier_performance':
        return <VendorsView onNavigate={navigateTo} />;

      case 'company_profile':
        return <SettingsPlaceholderView title="Company Profile" subtitle="Manage registered legal entities, branch offices, and GST registrations." />;

      case 'users_roles':
        return <UsersRolesView onNavigate={navigateTo} />;

      case 'general_settings':
        return <GeneralSettingsView onNavigate={navigateTo} />;

      default:
        return <DashboardView onNavigate={navigateTo} />;
    }
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F4F7FB] flex text-slate-900 font-sans selection:bg-orange-500 selection:text-white">
        {/* Left Collapsible & Mobile Drawer Sidebar */}
        <Sidebar
          activeRoute={activeRoute}
          setActiveRoute={(route) => {
            setActiveRoute(route);
            setSubRoute(null);
          }}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 min-h-screen flex flex-col ${
            isCollapsed ? 'lg:ml-16' : 'lg:ml-60'
          } ml-0 min-w-0 overflow-x-hidden`}
        >
          {/* Top Sticky Header */}
          <Header
            isCollapsed={isCollapsed}
            activeRoute={activeRoute}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          />

          {/* Dynamic Route Content - clean pt-[68px] edge-to-edge */}
          <main className="flex-1 pt-[68px] px-3 sm:px-5 pb-6 w-full min-w-0">
            {renderContent()}
          </main>
        </div>

        {/* Global Ctrl+K Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNavigate={navigateTo}
        />
      </div>
    </ToastProvider>
  );
}
