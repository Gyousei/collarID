import React from 'react';
import { useProfile } from '../context/ProfileContext';
import { ShieldCheck, MapPin, MessageSquare } from 'lucide-react';

interface ProfileHeroProps {
  onOpenEmergency: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({ onOpenEmergency }) => {
  const { profile } = useProfile();

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/60 mb-6 shadow-2xl">
      {/* Header Banner Image with measured contrast scrim */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
        <img
          src={profile.headerImage || '/src/assets/images/collar_profile_header_1791641773596.jpg'}
          alt="Leather collar aesthetic header"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
        />
        {/* Scrim overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-[#0b0d13]/60 to-transparent" />

        {/* Profile picture inside the profile banner */}
        <div className="absolute bottom-3.5 left-4 sm:left-6 flex items-end gap-3 z-10">
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/25 bg-[#0b0d13] shadow-2xl ring-4 ring-[#0b0d13]/90">
              <img
                src={profile.avatarUrl || '/src/assets/images/valco_headshot_raw.jpg'}
                alt="Valco profile picture"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            {/* Active collar indicator dot */}
            <div className="absolute -bottom-1 -right-1 p-0.5 bg-[#0b0d13] rounded-full">
              <span className="block w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0b0d13]" title="Active Profile" />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="relative px-5 pb-6 pt-3">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            {/* Pronoun and Role clean metadata text (Zero-pill discipline: unboxed text with · separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400 mb-1.5">
              <span className="text-rose-400 font-semibold">{profile.pronouns}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.roles.join(' · ')}</span>
            </div>

            {/* Chosen Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white text-balance">
              {profile.name}
            </h1>

            {profile.venueOrEvent && (
              <p className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{profile.venueOrEvent}</span>
              </p>
            )}
          </div>

          {/* Quick jump actions */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
            <a
              href="#contact"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 active:scale-95 transition-all min-h-[44px]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
              <span>How to Reach Me</span>
            </a>

            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-950/70 hover:bg-rose-900/80 text-rose-200 text-xs font-semibold border border-rose-800/80 active:scale-95 transition-all min-h-[44px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>Safety & Safewords</span>
            </button>
          </div>
        </div>

        {/* Bio statement */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            {profile.shortBio}
          </p>
        </div>
      </div>
    </div>
  );
};
