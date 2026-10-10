import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { ShieldAlert, QrCode, Lock, Unlock, Settings2 } from 'lucide-react';

interface HeaderProps {
  onOpenEmergency: () => void;
  onOpenBadge: () => void;
  onOpenEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenEmergency,
  onOpenBadge,
  onOpenEditor
}) => {
  const { profile, isUnlocked, hasPin, lockEditor, isEditMode, setIsEditMode } = useProfile();

  return (
    <header className="sticky top-0 z-30 bg-[#0b0d13]/95 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2 min-w-0">
          <a href="#top" className="text-sm md:text-base font-bold tracking-tight text-white whitespace-nowrap truncate">
            {profile.name} <span className="text-slate-400 font-normal">· Collar Card</span>
          </a>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden sm:flex items-center gap-5 text-xs font-medium text-slate-300">
          <a href="#boundaries" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            Boundaries
          </a>
          <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap shrink-0">
            How to Reach Me
          </a>
        </nav>

        {/* Zone 3: Primary Action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenEmergency}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white shadow-sm shadow-rose-950/40 active:scale-95 transition-all min-h-[40px] whitespace-nowrap"
            title="View safewords and emergency protocols"
          >
            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
            <span>Safewords</span>
          </button>

          <button
            onClick={onOpenBadge}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 active:scale-95 transition-all min-h-[40px] whitespace-nowrap"
            title="View collar QR code badge"
          >
            <QrCode className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            <span className="hidden xs:inline">Collar QR</span>
          </button>

          {/* Edit / Lock control */}
          <button
            onClick={() => {
              if (isUnlocked && isEditMode) {
                if (hasPin) lockEditor();
                else setIsEditMode(false);
              } else {
                onOpenEditor();
              }
            }}
            className={`p-2 rounded-lg text-xs font-medium border active:scale-95 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
              isEditMode
                ? 'bg-amber-950/40 text-amber-300 border-amber-700/60'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title={isEditMode ? 'Exit edit mode' : 'Customize profile (wearer only)'}
          >
            {hasPin && !isUnlocked ? (
              <Lock className="w-4 h-4 text-slate-400" />
            ) : isEditMode ? (
              <Unlock className="w-4 h-4 text-amber-400" />
            ) : (
              <Settings2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
