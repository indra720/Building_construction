import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

export default function ApprovalWorkflowTimeline({
  steps = [],
  onApprove = null,
  onReject = null,
  isActionable = true
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-card p-4 text-xs">
      <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
        <h4 className="font-bold text-slate-800 text-xs">
          Approval Workflow
        </h4>
        <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
          In Review
        </span>
      </div>

      <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200 before:top-3 before:bottom-3">
        {steps.map((step, idx) => {
          const isDone = step.done;
          const isPending = step.pending;

          return (
            <div key={idx} className="relative flex items-start gap-3 pl-1">
              {/* Dot icon */}
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 z-10 ring-2 ring-white ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isPending
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-slate-200 text-slate-400'
                }`}
              >
                {isDone ? (
                  <Check size={11} strokeWidth={3} />
                ) : isPending ? (
                  <Clock size={11} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                )}
              </div>

              {/* Step info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-slate-800 text-xs leading-none">
                    {step.step}
                  </p>
                  {isPending && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                      Pending
                    </span>
                  )}
                </div>
                {step.user && (
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    by <span className="font-medium text-slate-700">{step.user}</span>
                  </p>
                )}
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {step.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {isActionable && (onApprove || onReject) && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          {onApprove && (
            <button
              onClick={onApprove}
              className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-colors"
            >
              Approve
            </button>
          )}
          {onReject && (
            <button
              onClick={onReject}
              className="flex-1 py-1.5 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-xs shadow-xs transition-colors"
            >
              Reject
            </button>
          )}
        </div>
      )}
    </div>
  );
}
