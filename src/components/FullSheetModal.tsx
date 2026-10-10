import React, { useState, useMemo } from 'react';
import { checklistData, ChecklistRow } from '../data/checklistSheetData';
import {
  X,
  Search,
  FileSpreadsheet,
  Download,
  ShieldAlert,
  Heart,
  ThumbsUp,
  Sparkles,
  HelpCircle,
  MessageCircle
} from 'lucide-react';

interface FullSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FullSheetModal: React.FC<FullSheetModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const categories = useMemo(() => {
    return Array.from(new Set(checklistData.map(r => r.category)));
  }, []);

  const filteredData = useMemo(() => {
    return checklistData.filter(row => {
      if (selectedCategory !== 'all' && row.category !== selectedCategory) {
        return false;
      }
      if (selectedLevel !== 'all' && row.level !== selectedLevel) {
        return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase();
        const mAct = row.activity.toLowerCase().includes(q);
        const mCat = row.category.toLowerCase().includes(q);
        const mCom = row.comment?.toLowerCase().includes(q) ?? false;
        return mAct || mCat || mCom;
      }
      return true;
    });
  }, [selectedCategory, selectedLevel, search]);

  const levelBadges: Record<ChecklistRow['level'], { label: string; bg: string; text: string; icon: React.ReactNode }> = {
    hard_limit: {
      label: 'Hard Limit (0)',
      bg: 'bg-rose-950/70 border-rose-800',
      text: 'text-rose-300',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
    },
    love_it: {
      label: 'Love It (5)',
      bg: 'bg-emerald-950/70 border-emerald-800',
      text: 'text-emerald-300',
      icon: <Heart className="w-3.5 h-3.5 text-emerald-400" />
    },
    like_it: {
      label: 'Like It (4)',
      bg: 'bg-teal-950/60 border-teal-800',
      text: 'text-teal-300',
      icon: <ThumbsUp className="w-3.5 h-3.5 text-teal-400" />
    },
    want_to_try: {
      label: 'Want to Try (3)',
      bg: 'bg-indigo-950/60 border-indigo-800',
      text: 'text-indigo-300',
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
    },
    conditional: {
      label: 'For Partner (2)',
      bg: 'bg-amber-950/60 border-amber-800',
      text: 'text-amber-300',
      icon: <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
    },
    uninterested: {
      label: 'Ambivalent (1)',
      bg: 'bg-slate-900 border-slate-800',
      text: 'text-slate-400',
      icon: <span className="w-2 h-2 rounded-full bg-slate-600 inline-block" />
    }
  };

  const handleExportCsv = () => {
    const headers = 'Category,Activity,Experience,Limits/Interest,Comments\n';
    const rows = checklistData
      .map(
        r =>
          `"${r.category}","${r.activity}","${r.experience}","${r.interest}","${r.comment || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'valco-bdsm-checklist.csv';
    link.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden my-3 sm:my-6 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-rose-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Valco's Full BDSM Checklist & Interests
              </h2>
              <p className="text-xs text-slate-400">
                Complete reference sheet ({checklistData.length} activities rated)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
              title="Download CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Search */}
        <div className="p-3 sm:p-4 bg-slate-950/70 border-b border-slate-800 space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search all activities, categories, or notes (e.g. muzzle, chains, watersports, breath play)..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 min-h-[40px]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Level Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap transition-colors ${
                selectedLevel === 'all'
                  ? 'bg-slate-800 border-slate-700 text-white'
                  : 'bg-slate-950/50 border-slate-850 text-slate-400 hover:text-slate-200'
              }`}
            >
              All Levels
            </button>
            <button
              onClick={() => setSelectedLevel('hard_limit')}
              className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedLevel === 'hard_limit'
                  ? 'bg-rose-950 border-rose-700 text-rose-200'
                  : 'bg-slate-950/50 border-slate-850 text-rose-400 hover:text-rose-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Hard Limits</span>
            </button>
            <button
              onClick={() => setSelectedLevel('love_it')}
              className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedLevel === 'love_it'
                  ? 'bg-emerald-950 border-emerald-700 text-emerald-200'
                  : 'bg-slate-950/50 border-slate-850 text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Love It (5)</span>
            </button>
            <button
              onClick={() => setSelectedLevel('like_it')}
              className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedLevel === 'like_it'
                  ? 'bg-teal-950 border-teal-700 text-teal-200'
                  : 'bg-slate-950/50 border-slate-850 text-teal-400 hover:text-teal-300'
              }`}
            >
              <span>Like It (4)</span>
            </button>
            <button
              onClick={() => setSelectedLevel('want_to_try')}
              className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedLevel === 'want_to_try'
                  ? 'bg-indigo-950 border-indigo-700 text-indigo-200'
                  : 'bg-slate-950/50 border-slate-850 text-indigo-400 hover:text-indigo-300'
              }`}
            >
              <span>Want to Try (3)</span>
            </button>
            <button
              onClick={() => setSelectedLevel('conditional')}
              className={`px-2.5 py-1 rounded-lg border font-medium whitespace-nowrap flex items-center gap-1 transition-colors ${
                selectedLevel === 'conditional'
                  ? 'bg-amber-950 border-amber-700 text-amber-200'
                  : 'bg-slate-950/50 border-slate-850 text-amber-400 hover:text-amber-300'
              }`}
            >
              <span>For Partner (2)</span>
            </button>
          </div>

          {/* Category Filter Selector */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider shrink-0">Category:</span>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-slate-700 truncate flex-1"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table / Cards Content */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-2">
          {filteredData.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              <p className="font-semibold text-slate-300">No matching activities found</p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                }}
                className="mt-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs hover:bg-slate-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredData.map((row, idx) => {
              const badge = levelBadges[row.level];
              return (
                <div
                  key={`${row.category}-${row.activity}-${idx}`}
                  className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-750 transition-colors text-xs space-y-1.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block mb-0.5">
                        {row.category}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {row.activity}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {row.experience}
                      </span>
                      <span
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-md border text-[11px] font-semibold ${badge.bg} ${badge.text}`}
                      >
                        {badge.icon}
                        <span>{badge.label}</span>
                      </span>
                    </div>
                  </div>

                  {row.comment && (
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-[11px] flex items-start gap-2 mt-1">
                      <MessageCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="italic leading-relaxed">"{row.comment}"</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            Showing {filteredData.length} of {checklistData.length} entries
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors min-h-[40px]"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
};
