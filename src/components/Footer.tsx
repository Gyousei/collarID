import React from 'react';
import { useProfile } from '../context/ProfileContext';

interface FooterProps {
  onOpenEmergency: () => void;
  onOpenEditor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenEmergency,
  onOpenEditor
}) => {
  const { profile } = useProfile();

  return (
    <footer className="mt-12 pt-8 pb-20 sm:pb-10 border-t border-slate-850 text-xs text-slate-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-300">{profile.name}</span>
          <span aria-hidden="true">·</span>
          <span>Personal Profile & Boundaries</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
          <button
            onClick={onOpenEmergency}
            className="hover:text-rose-400 transition-colors"
          >
            Emergency Protocols & Safewords
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={onOpenEditor}
            className="hover:text-amber-400 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <p className="mt-3 text-center sm:text-left text-[11px] text-slate-500 leading-relaxed">
        Personal boundaries reference. Always check in and respect consent.
      </p>
    </footer>
  );
};
