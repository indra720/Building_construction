import React from 'react';
import { AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "primary", // 'primary', 'danger', 'success'
  children
}) {
  if (!isOpen) return null;

  let btnColor = "bg-blue-600 hover:bg-blue-700 text-white";
  let icon = <AlertTriangle className="text-blue-600" size={20} />;

  if (type === "danger") {
    btnColor = "bg-red-600 hover:bg-red-700 text-white";
    icon = <AlertTriangle className="text-red-600" size={20} />;
  } else if (type === "success") {
    btnColor = "bg-emerald-600 hover:bg-emerald-700 text-white";
    icon = <CheckCircle className="text-emerald-600" size={20} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 sm:p-5">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm">
                {title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {message}
              </p>
              {children && <div className="mt-3">{children}</div>}
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="bg-slate-50 px-4 py-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-colors ${btnColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
