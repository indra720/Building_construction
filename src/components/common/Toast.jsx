import React, { createContext, useContext, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = ({ title, message, type = 'success', duration = 3500 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, message, type }]);

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast floating container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          let bg = 'bg-white border-slate-200 text-slate-800';
          let icon = <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />;

          if (toast.type === 'error') {
            bg = 'bg-rose-50 border-rose-200 text-rose-900';
            icon = <AlertCircle size={16} className="text-rose-600 shrink-0" />;
          } else if (toast.type === 'info') {
            bg = 'bg-blue-50 border-blue-200 text-blue-900';
            icon = <Info size={16} className="text-blue-600 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-3.5 rounded-xl border shadow-lg flex items-start gap-3 transition-all animate-in slide-in-from-bottom-3 duration-200 ${bg}`}
            >
              {icon}
              <div className="flex-1 text-xs">
                {toast.title && <p className="font-bold leading-tight">{toast.title}</p>}
                {toast.message && <p className="text-[11px] opacity-90 mt-0.5">{toast.message}</p>}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="opacity-60 hover:opacity-100 text-slate-500 transition-opacity"
              >
                <X size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      addToast: ({ title, message }) => console.log(`Toast: ${title} - ${message}`)
    };
  }
  return context;
}
