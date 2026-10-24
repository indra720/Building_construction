import React, { useState, useEffect } from 'react';
import { Search, X, FolderGit2, Users, Building2, Boxes, Receipt, UserPlus, ArrowRight } from 'lucide-react';
import { projectsData, clientsData, leadsData, materialsData, purchaseOrdersData } from '../../data/mockData';

export default function CommandPalette({ isOpen, onClose, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.toLowerCase().trim();

  const filteredProjects = projectsData.filter(p => p.name.toLowerCase().includes(normalized) || p.code.toLowerCase().includes(normalized)).slice(0, 3);
  const filteredClients = clientsData.filter(c => c.name.toLowerCase().includes(normalized) || c.contactPerson.toLowerCase().includes(normalized)).slice(0, 3);
  const filteredLeads = leadsData.filter(l => l.clientName.toLowerCase().includes(normalized) || l.company.toLowerCase().includes(normalized)).slice(0, 3);
  const filteredMaterials = materialsData.filter(m => m.name.toLowerCase().includes(normalized) || m.sku.toLowerCase().includes(normalized)).slice(0, 3);
  const filteredPOs = purchaseOrdersData.filter(po => po.poNumber.toLowerCase().includes(normalized) || po.supplier.toLowerCase().includes(normalized)).slice(0, 3);

  const handleSelect = (route) => {
    onNavigate(route);
    onClose();
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 gap-3">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, clients, leads, materials, POs..."
            className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-3 text-xs">
          {/* Quick shortcuts if query is empty */}
          {!query && (
            <div className="px-3 py-2 text-slate-400 font-medium">
              <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Quick Navigation</p>
              <div className="grid grid-cols-2 gap-1.5 mt-2">
                <button onClick={() => handleSelect('dashboard')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 text-left font-medium">
                  <div className="w-6 h-6 rounded bg-blue-50 text-blue-600 flex items-center justify-center"><FolderGit2 size={13} /></div>
                  <span>Dashboard</span>
                </button>
                <button onClick={() => handleSelect('leads')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 text-left font-medium">
                  <div className="w-6 h-6 rounded bg-orange-50 text-orange-600 flex items-center justify-center"><UserPlus size={13} /></div>
                  <span>Leads & Enquiries</span>
                </button>
                <button onClick={() => handleSelect('projects')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 text-left font-medium">
                  <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center"><FolderGit2 size={13} /></div>
                  <span>Projects</span>
                </button>
                <button onClick={() => handleSelect('materials')} className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 text-left font-medium">
                  <div className="w-6 h-6 rounded bg-purple-50 text-purple-600 flex items-center justify-center"><Boxes size={13} /></div>
                  <span>Materials & Inventory</span>
                </button>
              </div>
            </div>
          )}

          {/* Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Projects</p>
              {filteredProjects.map(p => (
                <button
                  key={p.id}
                  onClick={() => handleSelect('projects')}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-blue-50 text-slate-800 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                      P
                    </div>
                    <div>
                      <p className="font-semibold text-xs leading-none">{p.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{p.code} • {p.client}</p>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* Leads */}
          {filteredLeads.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Leads & Enquiries</p>
              {filteredLeads.map(l => (
                <button
                  key={l.id}
                  onClick={() => handleSelect('leads')}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 text-slate-800 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-[10px]">
                      L
                    </div>
                    <div>
                      <p className="font-semibold text-xs leading-none">{l.clientName}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{l.company} • {l.projectType}</p>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
              ))}
            </div>
          )}

          {/* Materials */}
          {filteredMaterials.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">Materials</p>
              {filteredMaterials.map(m => (
                <button
                  key={m.id}
                  onClick={() => handleSelect('materials')}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-purple-50 text-slate-800 text-left transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                      M
                    </div>
                    <div>
                      <p className="font-semibold text-xs leading-none">{m.name}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{m.sku} • {m.stock} {m.unit} in stock</p>
                    </div>
                  </div>
                  <ArrowRight size={13} className="text-slate-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
