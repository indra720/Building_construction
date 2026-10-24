import React from 'react';

export function StatusBadge({ status, showDot = true, className = '' }) {
  if (!status) return null;

  const normalized = String(status).toLowerCase().trim();

  let colors = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-500';

  if (['active', 'completed', 'delivered', 'received', 'approved', 'in stock', 'passed quality'].includes(normalized)) {
    colors = 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    dotColor = 'bg-emerald-500';
  } else if (['pending', 'low stock', 'partially received', 'under review', 'draft', 'pending approval', 'contacted', 'proposal'].includes(normalized)) {
    colors = 'bg-amber-50 text-amber-700 border-amber-200/80';
    dotColor = 'bg-amber-500';
  } else if (['in progress', 'in transit', 'ongoing', 'sent', 'new'].includes(normalized)) {
    colors = 'bg-blue-50 text-blue-700 border-blue-200/80';
    dotColor = 'bg-blue-500';
  } else if (['cancelled', 'rejected', 'out of stock', 'overdue', 'critical', 'delayed', 'lost'].includes(normalized)) {
    colors = 'bg-rose-50 text-rose-700 border-rose-200/80';
    dotColor = 'bg-rose-500';
  } else if (['on hold'].includes(normalized)) {
    colors = 'bg-orange-50 text-orange-700 border-orange-200/80';
    dotColor = 'bg-orange-500';
  } else if (['planning', 'qualified', 'negotiation', 'review'].includes(normalized)) {
    colors = 'bg-purple-50 text-purple-700 border-purple-200/80';
    dotColor = 'bg-purple-500';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${colors} ${className}`}>
      {showDot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`}></span>}
      <span>{status}</span>
    </span>
  );
}

export function PriorityBadge({ priority }) {
  if (!priority) return null;
  const p = String(priority).toLowerCase();

  let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
  if (p === 'high' || p === 'urgent') {
    badgeClass = 'bg-red-50 text-red-700 border-red-200';
  } else if (p === 'medium') {
    badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
  } else if (p === 'low') {
    badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${badgeClass}`}>
      {priority}
    </span>
  );
}
