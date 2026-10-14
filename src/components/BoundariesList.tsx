import React, { useState, useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { BoundaryItem, BoundaryLevel, BoundaryCategory } from '../types/profile';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Lock,
  Camera,
  Heart,
  Volume2,
  Hand,
  FileSpreadsheet,
  ExternalLink
} from 'lucide-react';

interface BoundariesListProps {
  onOpenFullSheet: () => void;
}

export const BoundariesList: React.FC<BoundariesListProps> = ({ onOpenFullSheet }) => {
  const { profile } = useProfile();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categoryIcons: Record<BoundaryCategory, React.ReactNode> = {
    touch: <Hand className="w-3.5 h-3.5" />,
    verbal: <Volume2 className="w-3.5 h-3.5" />,
    restraints: <Lock className="w-3.5 h-3.5" />,
    impact: <ShieldAlert className="w-3.5 h-3.5" />,
    photo: <Camera className="w-3.5 h-3.5" />,
    aftercare: <Heart className="w-3.5 h-3.5" />
  };

  const categoryLabels: Record<BoundaryCategory, string> = {
    touch: 'Touch and Physical space',
    verbal: 'Verbal and Psychological',
    restraints: 'Bondage and Restraints',
    impact: 'Impact & Sensation',
    photo: 'Photo & Privacy',
    aftercare: 'Aftercare & Decompression'
  };

  const levelDetails: Record<BoundaryLevel, {
    label: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    icon: React.ReactNode;
  }> = {
    hard_limit: {
      label: 'Hard Limit',
      colorClass: 'text-rose-400',
      bgClass: 'bg-rose-950/20',
      borderClass: 'border-rose-900/40',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
    },
    soft_limit: {
      label: 'Soft Limit',
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-950/20',
      borderClass: 'border-amber-900/40',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
    },
    enthusiastic_yes: {
      label: 'Yes',
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-950/20',
      borderClass: 'border-emerald-900/40',
      icon: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
    }
  };

  const categoryOrder: BoundaryCategory[] = ['touch', 'verbal', 'restraints', 'impact', 'photo', 'aftercare'];

  // Group by category in explicit order
  const groupedBoundaries = useMemo(() => {
    const map = new Map<BoundaryCategory, BoundaryItem[]>();
    for (const cat of categoryOrder) {
      const items = profile.boundaries.filter(b => b.category === cat);
      if (items.length > 0) {
        map.set(cat, items);
      }
    }
    return map;
  }, [profile.boundaries]);

  return (
    <section id="boundaries" className="mb-8 scroll-mt-20">
      <div className="mb-4">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Limits & Boundaries
        </h2>
      </div>

      {/* Category Groups */}
      <div className="space-y-6">
        {Array.from(groupedBoundaries.entries()).map(([category, items]) => (
          <div key={category} className="space-y-2.5">
            {/* Category Header */}
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 px-1 pt-1">
              <span className="text-slate-500">{categoryIcons[category]}</span>
              <span>{categoryLabels[category]}</span>
            </div>

            {/* Boundary Cards */}
            <div className="space-y-2">
              {items.map(item => {
                const level = levelDetails[item.level];
                const isExpanded = expandedId === item.id;

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border transition-all ${level.bgClass} ${level.borderClass}`}
                  >
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      className="w-full p-3.5 text-left flex items-start justify-between gap-3 min-h-[56px]"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="pt-0.5">{level.icon}</div>
                        <div className="min-w-0">
                          <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${level.colorClass} bg-slate-950/60`}>
                          {level.label}
                        </span>
                        {item.notes && (
                          isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )
                        )}
                      </div>
                    </button>

                    {/* Expandable detailed nuance */}
                    {isExpanded && item.notes && (
                      <div className="px-3.5 pb-3.5 pt-1 border-t border-white/5 animate-in fade-in duration-150">
                        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 text-xs text-slate-300">
                          <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-sky-400" />
                            <span>Notes:</span>
                          </p>
                          <p className="leading-relaxed text-slate-300">{item.notes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Link to the full sheet below boundaries list */}
      <div className="mt-8 pt-6 border-t border-slate-800/80">
        <button
          onClick={onOpenFullSheet}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-750 hover:border-rose-500/50 shadow-lg text-left flex items-center justify-between gap-4 group transition-all active:scale-[0.99] min-h-[56px]"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-rose-300 transition-colors tracking-tight">
                See the full list here
              </h3>
              <p className="text-xs text-slate-400 truncate">
                Comprehensive 90+ item BDSM checklist with experience ratings & notes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400 group-hover:translate-x-0.5 transition-transform shrink-0">
            <span>View Full Sheet</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </button>
      </div>
    </section>
  );
};
