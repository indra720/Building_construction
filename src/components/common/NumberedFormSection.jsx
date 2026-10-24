import React from 'react';

export default function NumberedFormSection({
  stepNumber,
  title,
  subtitle,
  children,
  actionButton = null,
  className = ''
}) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200/90 shadow-card p-4 sm:p-5 ${className}`}>
      {/* Section Header with Number Badge */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm shadow-blue-500/30">
            {stepNumber}
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm leading-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-[11px] text-slate-500 font-normal mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actionButton && (
          <div className="shrink-0">
            {actionButton}
          </div>
        )}
      </div>

      {/* Form Fields / Content */}
      <div className="space-y-3.5">
        {children}
      </div>
    </div>
  );
}
