import React from 'react';

export default function HeroBanner({
  title,
  subtitle,
  actionButton = null,
  extraRight = null,
  breadcrumbs = null,
}) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-card p-5 hero-banner-bg mb-4">
      {breadcrumbs && (
        <div className="mb-2 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
          {breadcrumbs}
        </div>
      )}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] sm:text-[26px] font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-[13px] text-slate-500 font-normal mt-1 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {extraRight}
          {actionButton}
        </div>
      </div>
    </div>
  );
}
