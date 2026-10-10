import React, { useState, useMemo } from 'react';
import { useProfile } from '../context/ProfileContext';
import { BoundaryItem, BoundaryLevel, BoundaryContext, BoundaryCategory } from '../types/profile';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Sparkles,
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
  const [selectedContext, setSelectedContext] = useState<BoundaryContext>('all');
  const [selectedLevel, setSelectedLevel] = useState<BoundaryLevel | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categoryIcons: Record<BoundaryCategory, React.ReactNode> = {
    touch: <Hand className="w-3.5 h-3.5" />,
    restraints: <Lock className="w-3.5 h-3.5" />,
    impact: <ShieldAlert className="w-3.5 h-3.5" />,
    verbal: <Volume2 className="w-3.5 h-3.5" />,
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
    sublabel: string;
    colorClass: string;
    bgClass: string;
    borderClass: string;
    icon: React.ReactNode;
  }> = {
    hard_limit: {
      label: 'Hard Limit',
      sublabel: 'Absolute No · Non-negotiable',
      colorClass: 'text-rose-400',
      bgClass: 'bg-rose-950/20',
      borderClass: 'border-rose-900/40',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
    },
    soft_limit: {
      label: 'Soft Limit',
      sublabel: 'Conditional · Ask & Negotiate First',
      colorClass: 'text-amber-400',
      bgClass: 'bg-amber-950/20',
      borderClass: 'border-amber-900/40',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
    },
    enthusiastic_yes: {
      label: 'Enthusiastic Yes',
      sublabel: 'Welcomed · Desired Activity',
      colorClass: 'text-emerald-400',
      bgClass: 'bg-emerald-950/20',
      borderClass: 'border-emerald-900/40',
      icon: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
    }
  };

  // Filter boundaries
  const filteredBoundaries = useMemo(() => {
    return profile.boundaries.filter(item => {
      // Context filter
      if (selectedContext === 'public_only') {
        if (item.context !== 'public_only' && item.context !== 'all') return false;
      } else if (selectedContext === 'scene_only') {
        if (item.context !== 'scene_only' && item.context !== 'all') return false;
      }

      // Level filter
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchNotes = item.notes?.toLowerCase().includes(query) ?? false;
        const matchCat = categoryLabels[item.category]?.toLowerCase().includes(query) ?? false;
        return matchTitle || matchDesc || matchNotes || matchCat;
      }

      return true;
    });
  }, [profile.boundaries, selectedContext, selectedLevel, searchQuery]);

  const categoryOrder: BoundaryCategory[] = ['touch', 'verbal', 'restraints', 'impact', 'photo', 'aftercare'];

  // Group by category in explicit order
  const groupedBoundaries = useMemo(() => {
    const map = new Map<BoundaryCategory, BoundaryItem[]>();
    for (const cat of categoryOrder) {
      const items = filteredBoundaries.filter(b => b.category === cat);
      if (items.length > 0) {
        map.set(cat, items);
      }
    }
    return map;
  }, [filteredBoundaries]);

  // Counts
  const counts = useMemo(() => {
    const hard = profile.boundaries.filter(b => b.level === 'hard_limit').length;
    const soft = profile.boundaries.filter(b => b.level === 'soft_limit').length;
    const yes = profile.boundaries.filter(b => b.level === 'enthusiastic_yes').length;
    return { hard, soft, yes, total: profile.boundaries.length };
  }, [profile.boundaries]);

  return (
    <section id="boundaries" className="mb-8 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Boundaries & Consent Guide
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Quick overview · Refer to the full document below for complete details
          </p>
        </div>

        {/* Unboxed metric counts with clean typographic separators */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
          <span className="text-rose-400 font-semibold">{counts.hard} Hard</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400 font-semibold">{counts.soft} Soft</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-400 font-semibold">{counts.yes} Yes</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-2xl p-3 bg-slate-900/60 border border-slate-800 mb-4 space-y-3">
        {/* Context Selector (Public vs Scene vs All) */}
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Space Context
          </div>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedContext('all')}
              className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] whitespace-nowrap ${
                selectedContext === 'all'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Spaces
            </button>
            <button
              onClick={() => setSelectedContext('public_only')}
              className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] whitespace-nowrap ${
                selectedContext === 'public_only'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              In Public / Event
            </button>
            <button
              onClick={() => setSelectedContext('scene_only')}
              className={`py-2 px-2 text-xs font-semibold rounded-lg transition-all min-h-[40px] whitespace-nowrap ${
                selectedContext === 'scene_only'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              In Scene / Play
            </button>
          </div>
        </div>

        {/* Level Selector buttons */}
        <div>
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
            Consent Level
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-4 gap-1.5">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`py-2 px-2.5 text-xs font-medium rounded-xl border transition-all min-h-[42px] whitespace-nowrap ${
                selectedLevel === 'all'
                  ? 'bg-slate-800 border-slate-650 text-white shadow-sm'
                  : 'bg-slate-950/50 border-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({counts.total})
            </button>
            <button
              onClick={() => setSelectedLevel('hard_limit')}
              className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-all min-h-[42px] whitespace-nowrap flex items-center justify-center gap-1.5 ${
                selectedLevel === 'hard_limit'
                  ? 'bg-rose-950/60 border-rose-700 text-rose-200 shadow-sm'
                  : 'bg-slate-950/50 border-slate-850 text-rose-400/80 hover:text-rose-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Hard ({counts.hard})</span>
            </button>
            <button
              onClick={() => setSelectedLevel('soft_limit')}
              className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-all min-h-[42px] whitespace-nowrap flex items-center justify-center gap-1.5 ${
                selectedLevel === 'soft_limit'
                  ? 'bg-amber-950/60 border-amber-700 text-amber-200 shadow-sm'
                  : 'bg-slate-950/50 border-slate-850 text-amber-400/80 hover:text-amber-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Soft ({counts.soft})</span>
            </button>
            <button
              onClick={() => setSelectedLevel('enthusiastic_yes')}
              className={`py-2 px-2.5 text-xs font-semibold rounded-xl border transition-all min-h-[42px] whitespace-nowrap flex items-center justify-center gap-1.5 ${
                selectedLevel === 'enthusiastic_yes'
                  ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200 shadow-sm'
                  : 'bg-slate-950/50 border-slate-850 text-emerald-400/80 hover:text-emerald-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Yes ({counts.yes})</span>
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search boundaries (e.g. collar, rope, photo, praise)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors min-h-[42px]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Boundary Items List */}
      {filteredBoundaries.length === 0 ? (
        <div className="p-8 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
          <p className="font-medium text-slate-300">No boundaries match your filter</p>
          <p className="mt-1">Try resetting the search query or selecting "All Levels".</p>
          <button
            onClick={() => {
              setSelectedContext('all');
              setSelectedLevel('all');
              setSearchQuery('');
            }}
            className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs hover:bg-slate-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {Array.from(groupedBoundaries.entries()).map(([category, items]) => (
            <div key={category} className="space-y-2.5">
              {/* Category section header */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 px-1 pt-1">
                <span className="text-slate-500">{categoryIcons[category]}</span>
                <span>{categoryLabels[category]}</span>
                <span className="text-slate-600 font-mono text-[11px] font-normal">
                  ({items.length})
                </span>
              </div>

              {/* Items in this category */}
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
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                                {item.title}
                              </h3>
                              <span className="text-[11px] font-medium text-slate-400">
                                · {item.context === 'public_only' ? 'Public Spaces' : item.context === 'scene_only' ? 'Scene Only' : 'All Spaces'}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded ${level.colorClass} bg-slate-950/60`}>
                            {level.label}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </button>

                      {/* Expandable detailed nuance */}
                      {isExpanded && item.notes && (
                        <div className="px-3.5 pb-3.5 pt-1 border-t border-white/5 animate-in fade-in duration-150">
                          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 text-xs text-slate-300">
                            <p className="font-semibold text-slate-200 mb-1 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-sky-400" />
                              <span>Specific Nuances & Exceptions:</span>
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
      )}

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
