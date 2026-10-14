import React from 'react';
import { ShieldAlert, ListChecks, MessageSquare } from 'lucide-react';

interface BottomNavProps {
  onOpenEmergency: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onOpenEmergency }) => {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0b0d13]/95 backdrop-blur-md border-t border-slate-800/90 px-3 py-1.5 pb-safe shadow-2xl"
    >
      <div className="grid grid-cols-3 items-center gap-2 max-w-md mx-auto">
        <button
          onClick={onOpenEmergency}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-rose-400 hover:bg-rose-950/40 active:scale-95 transition-all min-h-[44px]"
        >
          <ShieldAlert className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Safewords</span>
        </button>

        <a
          href="#boundaries"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 active:scale-95 transition-all min-h-[44px]"
        >
          <ListChecks className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Boundaries</span>
        </a>

        <a
          href="#contact"
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/40 active:scale-95 transition-all min-h-[44px]"
        >
          <MessageSquare className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-medium tracking-tight">Reach Me</span>
        </a>
      </div>
    </nav>
  );
};
