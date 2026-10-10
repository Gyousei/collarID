import React from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  ShieldAlert,
  Phone,
  Send,
  AlertTriangle,
  Heart,
  X,
  MapPin,
  Clock,
  Sparkles,
  VolumeX,
  FileText
} from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  const { profile } = useProfile();

  if (!isOpen) return null;

  const { emergencyContact, safetyProtocols } = profile;
  const cleanTelegram = emergencyContact.telegram?.replace(/^@/, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden my-6">
        {/* Urgent Header */}
        <div className="bg-rose-950/80 border-b border-rose-900/60 p-4 sm:p-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-600 text-white shadow-lg shadow-rose-950/50">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
                Safety Protocol & Safewords
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Emergency Response Sheet
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 active:scale-95 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Primary Safewords */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              1. Verbal Safewords
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-xs">
                <span className="font-bold text-rose-300">RED: </span>
                <span className="text-slate-200">{safetyProtocols.verbalRed}</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-900/40 text-xs">
                <span className="font-bold text-amber-300">YELLOW: </span>
                <span className="text-slate-200">{safetyProtocols.verbalYellow}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs">
                <span className="font-bold text-emerald-300">GREEN: </span>
                <span className="text-slate-200">{safetyProtocols.verbalGreen}</span>
              </div>
            </div>
          </div>

          {/* Nonverbal & Restrained Protocol */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <VolumeX className="w-4 h-4 text-rose-400" />
              <span>2. Nonverbal & Restrained Signals</span>
            </h3>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div>
                <span className="font-semibold text-rose-400">Nonverbal RED (Stop): </span>
                <span className="text-slate-300">{safetyProtocols.nonverbalRed}</span>
              </div>
              <div className="pt-2 border-t border-slate-850">
                <span className="font-semibold text-amber-400">Nonverbal YELLOW (Slow): </span>
                <span className="text-slate-300">{safetyProtocols.nonverbalYellow}</span>
              </div>
              <div className="pt-2 border-t border-slate-850">
                <span className="font-semibold text-sky-400">If Gagged: </span>
                <span className="text-slate-300">{safetyProtocols.gaggedProtocol}</span>
              </div>
              <div className="pt-2 border-t border-slate-850 text-slate-400">
                <span className="font-semibold text-slate-300">Restraint Check: </span>
                <span>{safetyProtocols.restraintSafety}</span>
              </div>
            </div>
          </div>

          {/* Emergency Safety Partner / Handler */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              3. Primary Safety Contact / Handler
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-white tracking-tight">
                  {emergencyContact.name}
                </p>
                <p className="text-xs text-rose-300 font-medium">
                  {emergencyContact.relationship}
                </p>
                {emergencyContact.venueNote && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{emergencyContact.venueNote}</span>
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                {emergencyContact.phone && (
                  <a
                    href={`tel:${emergencyContact.phone}`}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all min-h-[44px]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </a>
                )}

                {cleanTelegram && (
                  <a
                    href={`https://t.me/${cleanTelegram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all min-h-[44px]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Medical Alerts & Physical Considerations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>4. Medical & Physical Alerts</span>
            </h3>
            <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/40 text-xs text-slate-200 leading-relaxed">
              {safetyProtocols.medicalAllergies}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors min-h-[44px]"
          >
            Close Safety Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
