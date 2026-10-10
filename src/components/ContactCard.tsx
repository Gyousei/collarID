import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { MessageSquare, Send, Copy, Check, ExternalLink } from 'lucide-react';

export const ContactCard: React.FC = () => {
  const { profile, showToast } = useProfile();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, label: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      showToast(`${label} copied to clipboard!`, 'success');
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      showToast(`Could not copy automatically: ${text}`, 'info');
    }
  };

  const discord = profile.contacts;

  return (
    <section id="contact" className="mb-8 scroll-mt-20">
      <div className="mb-3.5">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          How to reach me
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* 1. Discord Card (First & Fastest) */}
        <div className="rounded-2xl p-4 bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Discord
                  </h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-white tracking-tight font-mono">
                      {discord.discordHandle || '@alphawuff'}
                    </span>
                    {discord.discordUsername && (
                      <span className="text-xs text-slate-400 font-medium">
                        ({discord.discordUsername})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 rounded-md">
                Fastest Turnaround
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              The fastest way to get a hold of me for questions, chats, or games.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <a
              href={discord.discordUrl || 'https://discord.com/users/194568995087712256'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all active:scale-95 min-h-[44px]"
            >
              <span>Open Discord Profile</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <button
              onClick={() =>
                copyToClipboard(
                  discord.discordHandle || '@alphawuff',
                  'Discord handle',
                  'discord'
                )
              }
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all active:scale-95 min-h-[44px]"
              title="Copy handle"
            >
              {copiedKey === 'discord' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. Telegram Card (Second) */}
        <div className="rounded-2xl p-4 bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                  <Send className="w-4 h-4 -rotate-12 translate-x-0.5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Telegram
                  </h3>
                  <p className="text-sm font-bold text-white tracking-tight font-mono">
                    @{discord.telegramHandle?.replace(/^@/, '') || 'digitalwuffer'}
                  </p>
                </div>
              </div>

              <span className="text-[11px] font-medium text-sky-300 bg-sky-950/60 border border-sky-900/60 px-2 py-0.5 rounded-md">
                Direct Message
              </span>
            </div>

            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Want to discuss a scene or scenario? This is where to reach out.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
            <a
              href={discord.telegramUrl || 'https://t.me/digitalwuffer'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold transition-all active:scale-95 min-h-[44px]"
            >
              <span>Open in Telegram</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <button
              onClick={() =>
                copyToClipboard(
                  discord.telegramHandle || 'digitalwuffer',
                  'Telegram handle',
                  'tg'
                )
              }
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all active:scale-95 min-h-[44px]"
              title="Copy Telegram username"
            >
              {copiedKey === 'tg' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
