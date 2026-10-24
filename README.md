# BuildPro – Construction CRM & ERP (Frontend)

A modern, pixel-faithful web application for construction companies to manage leads, clients, projects, sites, tasks, materials & inventory, purchase orders, vendors, finance, documents, labour, equipment and reports.

Built from the ground up matching the 90 high-fidelity UI specifications in `BuildPro_All_Available_UI_Screens-3.pdf`.

---

## 🚀 Quick Start: How to Run the Project

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Launch

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at: **`http://localhost:5173/`**

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview the production build**:
   ```bash
   npm run preview
   ```

---

## 🎨 Tech Stack & Design Tokens

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS with custom BuildPro theme tokens
- **Typography**: Inter (`400`, `500`, `600`, `700`, `800`)
- **Icons**: `lucide-react`
- **Charts**: `recharts` (Area charts, grouped bar charts, donut charts with center KPI)
- **Currency & Dates**: Indian Rupee (`₹1,42,50,000`, `₹1.2 Cr`, `₹80 Lakh`), Indian date format (`24 Oct 2026`)

### Theme Color Tokens
| Token | Hex | Usage |
|---|---|---|
| Sidebar Gradient | `#0B1A33` → `#0F2347` | Collapsible Left Sidebar |
| Page Background | `#F4F7FB` | App background |
| Primary Action | `#1D5DF0` | Save, Approve, Download |
| Accent / Active Nav | `#F97316` | Active menu pill, + Add buttons |
| Success | `#16A34A` / tint `#DCFCE7` | Active, Approved, Received, Passed QI |
| Warning | `#F59E0B` / tint `#FEF3C7` | Pending, Low Stock, Under Review |
| Danger | `#DC2626` / tint `#FEE2E2` | Overdue, Rejected, Out of Stock |
| Purple | `#7C3AED` / tint `#F3E8FF` | Planning, Qualified, Special stats |

---

## 🏢 Business Flow & PDF Screen Checklist

The screens follow the real-world construction business lifecycle:

1. **Lead Enters**:
   - `Leads & Enquiries` (**Screen 010**) → Hero banner, 5 KPI cards, status tabs, DataTable, right-side Detail Drawer Panel with contact info, project details, follow-up timeline, and "Convert to Client" action.
2. **Client & Contact Created**:
   - `Clients List & Management` (**Screen 047, 057, 060**) → Portfolio metrics, client status tabs, industry breakdown chart.
   - `Add New Client` (**Screen 050**) → 8 Numbered Form Sections (Basic Info, Address, Financials/GST/PAN, Additional/Tags, Company Logo, Contacts table, Documents table, Status & Settings).
   - `Contact Details` (**Screen 001, 076**) → Hero contact profile, quick communication actions (Call/WhatsApp), tabbed projects, documents, meetings, and activity log.
3. **Project Planning & Execution**:
   - `Projects Dashboard` (**Screen 048, 063**) → Progress tracking, dual **List View / Kanban View** toggle, right project drawer with financial breakdown, milestone progress, and budget vs actuals.
   - `Tasks & Work Orders` (**Screen 044, 081, 086**) → Interactive 4-column **Kanban Board** (To Do, In Progress, Review, Completed) and List View with priority badges.
   - `Site Management` (**Screen 046, 068**) → Live site map coordinates, active site engineers, deployed labour strength, and safety compliance indices.
   - `Project Milestones` (**Screen 022, 035**) → Target dates, progress bars, and weightage distribution.
   - `Daily Site Reports (DPR)` (**Screen 045, 083**) → Concrete pour logs, weather, labour deployed, and site engineer work descriptions.
   - `Documents Vault` (**Screen 056, 072**) → Folder tree (Architectural, Structural, MEP, Test Certificates), document versions, previews, and downloads.
4. **Materials & Procurement Lifecycle**:
   - `Materials & Inventory` (**Screen 085, 078, 003**) → Stock register, unit rates, min-max thresholds, low-stock alerts.
   - `Purchase Orders List` (**Screen 002, 042, 069, 082**) → Status tabs, PO register, supplier tracking.
   - `Create Purchase Order` (**Screen 004, 017**) → Numbered sections, **editable live-calculating line items grid** (Quantity × Rate + GST = Total), document dropzone.
   - `PO Details & Approval` (**Screen 006, 064**) → Full approval stepper workflow, interactive Approve / Reject confirmation modals with optimistic state updates, live supplier chatbox.
   - `Goods Received Notes (GRN)` (**Screen 009, 090**) → Warehouse stock-in challans and 4-point Quality Inspection (QI) checklist.
5. **Resources & Finance**:
   - `Labour & Attendance` (**Screen 021**) → Daily muster roll, live clock, QR/face scan trigger, overtime tracking, and daily wage cost.
   - `Equipment & Machinery` (**Screen 007**) → Fleet tracker, fuel level indicators, operating hours, and operator logs.
   - `Vendors & Suppliers` (**Screen 062, 087**) → Vendor ratings, GSTINs, and total procurement spend.
   - `Contracts & Finance` (**Screen 025**) → Signed legal contracts, validity periods, and retention money tracking.
   - `Estimates & Quotations` (**Screen 058**) → BOQ quotations, client validity, and "Convert to Project" action.
   - `Invoices & Payments` (**Screen 024**) → Client milestone invoices, payment receipts, and aging balances.
   - `Budget Management` (**Screen 053**) → Project budget utilization bars, actual vs budget variance flags.
   - `Expenses` (**Screen 029**) → Site petty cash, materials/labour breakdown, and payment mode logs.
6. **Analytics & Global Tools**:
   - `Analytics Dashboard` (**Screen 043**) → Multi-metric Recharts (Revenue vs Expenses, Project Status distribution donut, Top Projects by Revenue, Expense Breakdown, Team Productivity), right-side Analytics Filters panel.
   - `Global Command Palette` (**Ctrl + K**) → Accessible anywhere to search across projects, clients, leads, materials, and POs.
   - `Interactive Toasts` → Real-time feedback on all actions (approvals, conversions, file uploads, filters).

---

## 🧩 Reusable Component Library (`src/components/common/`)

- **`StatCard`**: Rounded square icon badge + big number + delta indicator + optional donut chart.
- **`StatusBadge` & `PriorityBadge`**: Centralized status-to-color mapping (Emerald for Active/Completed/Passed, Amber for Pending/Low Stock, Blue for In Progress/In Transit, Red for Overdue/Rejected).
- **`DataTable`**: Checkbox column, sorting, pagination, row click handler, row hover, and selected-row highlight.
- **`FilterBar`**: Search input + dynamic select filters + date-range display + Filter & Reset buttons.
- **`StatusTabs`**: Count badges with active solid orange pill indicator.
- **`DetailDrawerPanel`**: Signature 370px right sticky drawer for deep inspection of any row without leaving the list.
- **`NumberedFormSection`**: Blue numbered badge (1, 2, 3...) with title, subtitle, and responsive form grid.
- **`ApprovalWorkflowTimeline`**: Vertical stepper with checkmarks, pending pulsing dots, timestamps, and Approve/Reject triggers.
- **`ItemsTable`**: Real-time line-items grid recalculating Subtotal, GST (0%, 5%, 12%, 18%, 28%), and Grand Total ₹.
- **`FileDropzone`**: Drag & drop zone with file chips, file size check, and "+ Add More" functionality.
- **`CommandPalette`**: Global keyboard-accessible `Ctrl+K` command menu.
- **`ConfirmDialog`**: Action confirmation modal with primary/danger/success variants.
- **`ToastProvider` / `useToast`**: Modern notification system.

---

## 🔌 Swapping Mock Data for Real Backend APIs

The entire application relies on typed data models structured in `src/data/mockData.js`. To connect to a live backend:

1. Replace mock collections with standard React Query hooks (`useQuery`, `useMutation`).
2. Point API endpoints to your backend routes (e.g. `GET /api/v1/projects`, `POST /api/v1/purchase-orders`).
3. The component props (`DataTable`, `DetailDrawerPanel`, `FilterBar`, `ItemsTable`) are already decoupled from data fetching, ensuring zero UI rewrites when plugging in real APIs.
