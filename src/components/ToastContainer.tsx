import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useProfile();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isAlert = toast.type === 'alert';

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-medium border animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto ${
              isAlert
                ? 'bg-rose-950/90 text-rose-200 border-rose-800/80 shadow-rose-950/50'
                : isSuccess
                ? 'bg-emerald-950/90 text-emerald-200 border-emerald-800/80 shadow-emerald-950/50'
                : 'bg-slate-900/90 text-slate-200 border-slate-750 shadow-black/60'
            }`}
          >
            {isAlert ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            ) : isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-sky-400 shrink-0" />
            )}
            <span className="truncate">{toast.message}</span>
          </div>
        );
      })}
    </div>
  );
};
