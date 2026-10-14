import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import {
  UserProfile,
  BoundaryLevel,
  BoundaryContext,
  BoundaryCategory
} from '../types/profile';
import {
  X,
  Lock,
  Unlock,
  Plus,
  Trash2,
  Download,
  Upload,
  RotateCcw,
  KeyRound,
  ShieldAlert,
  User,
  Send,
  Sliders,
  Check
} from 'lucide-react';

interface ProfileEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileEditor: React.FC<ProfileEditorProps> = ({ isOpen, onClose }) => {
  const {
    profile,
    updateProfile,
    addBoundary,
    deleteBoundary,
    resetToDefaults,
    exportProfileJson,
    importProfileJson,
    isUnlocked,
    unlockWithPin,
    hasPin,
    setPin,
    showToast
  } = useProfile();

  const [activeTab, setActiveTab] = useState<'basics' | 'contacts' | 'safety' | 'boundaries' | 'backup'>('basics');
  const [pinInput, setPinInput] = useState('');
  const [newPinValue, setNewPinValue] = useState('');

  // Local draft state for quick editing
  const [formData, setFormData] = useState<UserProfile>(profile);

  // New boundary draft form
  const [newBoundaryTitle, setNewBoundaryTitle] = useState('');
  const [newBoundaryCategory, setNewBoundaryCategory] = useState<BoundaryCategory>('touch');
  const [newBoundaryContext, setNewBoundaryContext] = useState<BoundaryContext>('all');
  const [newBoundaryLevel, setNewBoundaryLevel] = useState<BoundaryLevel>('hard_limit');
  const [newBoundaryDesc, setNewBoundaryDesc] = useState('');
  const [newBoundaryNotes, setNewBoundaryNotes] = useState('');

  // Sync draft when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setFormData(profile);
    }
  }, [isOpen, profile]);

  if (!isOpen) return null;

  // PIN Unlock Screen if locked
  if (hasPin && !isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-750 rounded-3xl p-6 text-center shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Owner Verification</h2>
          <p className="text-xs text-slate-400 mt-1 mb-5">
            This profile is locked by the wearer with a PIN to prevent accidental edits by scanners.
          </p>

          <form
            onSubmit={e => {
              e.preventDefault();
              if (unlockWithPin(pinInput)) {
                setPinInput('');
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              className="w-full text-center text-xl tracking-widest py-3 px-4 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-amber-500"
              autoFocus
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold min-h-[44px]"
              >
                Unlock
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const handleSaveAll = () => {
    updateProfile(formData);
    onClose();
  };

  const handleCreateBoundary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoundaryTitle.trim() || !newBoundaryDesc.trim()) {
      showToast('Please provide a title and short description', 'alert');
      return;
    }

    addBoundary({
      title: newBoundaryTitle.trim(),
      category: newBoundaryCategory,
      context: newBoundaryContext,
      level: newBoundaryLevel,
      description: newBoundaryDesc.trim(),
      notes: newBoundaryNotes.trim() || undefined
    });

    setNewBoundaryTitle('');
    setNewBoundaryDesc('');
    setNewBoundaryNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-750 rounded-3xl shadow-2xl overflow-hidden my-4 sm:my-6 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-800 text-amber-400">
              <Unlock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Profile & Boundary Editor
              </h2>
              <p className="text-xs text-slate-400">
                Customize your identity, contacts, limits, and emergency protocols
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-slate-800 overflow-x-auto text-xs shrink-0">
          {[
            { id: 'basics', label: 'Identity', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'contacts', label: 'Reach Me', icon: <Send className="w-3.5 h-3.5" /> },
            { id: 'safety', label: 'Safety & Safewords', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
            { id: 'boundaries', label: 'Boundaries List', icon: <Sliders className="w-3.5 h-3.5" /> },
            { id: 'backup', label: 'PIN & Backup', icon: <KeyRound className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors min-h-[38px] ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* TAB 1: BASICS */}
          {activeTab === 'basics' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Chosen Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Pronouns</label>
                  <input
                    type="text"
                    value={formData.pronouns}
                    onChange={e => setFormData({ ...formData, pronouns: e.target.value })}
                    placeholder="e.g. it / them"
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Roles / Dynamic (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.roles.join(', ')}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      roles: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                    })
                  }
                  placeholder="Submissive, Rope Bottom, Nonverbal in Scene"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Short Profile Bio</label>
                <textarea
                  rows={2}
                  value={formData.shortBio}
                  onChange={e => setFormData({ ...formData, shortBio: e.target.value })}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Venue / Event Context</label>
                <input
                  type="text"
                  value={formData.venueOrEvent || ''}
                  onChange={e => setFormData({ ...formData, venueOrEvent: e.target.value })}
                  placeholder="e.g. Munches, Private Spaces & Play Venues"
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Profile Picture</label>
                <div className="flex items-start gap-3">
                  {formData.avatarUrl && (
                    <img
                      src={formData.avatarUrl}
                      alt="Avatar preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={formData.avatarUrl || ''}
                      onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
                      placeholder="/src/assets/images/... or image URL"
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono text-[11px]"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium cursor-pointer transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Raw Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = ev => {
                              const result = ev.target?.result as string;
                              if (result) {
                                setFormData({ ...formData, avatarUrl: result });
                                showToast('Raw image file loaded', 'success');
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONTACTS */}
          {activeTab === 'contacts' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-3">
                <h3 className="font-bold text-indigo-300 uppercase tracking-wider text-[11px]">
                  Discord (Primary & Fastest)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-slate-300 block mb-1">Discord Handle</label>
                    <input
                      type="text"
                      value={formData.contacts.discordHandle}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, discordHandle: e.target.value }
                        })
                      }
                      placeholder="@alphawuff"
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-300 block mb-1">Username / Display Name</label>
                    <input
                      type="text"
                      value={formData.contacts.discordUsername}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          contacts: { ...formData.contacts, discordUsername: e.target.value }
                        })
                      }
                      placeholder="Valco"
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-300 block mb-1">Discord Profile Link</label>
                  <input
                    type="url"
                    value={formData.contacts.discordUrl}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, discordUrl: e.target.value }
                      })
                    }
                    placeholder="https://discord.com/users/194568995087712256"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-sky-950/20 border border-sky-900/40 space-y-3">
                <h3 className="font-bold text-sky-300 uppercase tracking-wider text-[11px]">
                  Telegram (Direct Message)
                </h3>
                <div>
                  <label className="font-medium text-slate-300 block mb-1">Telegram Handle</label>
                  <input
                    type="text"
                    value={formData.contacts.telegramHandle}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, telegramHandle: e.target.value }
                      })
                    }
                    placeholder="DigitalWuffer"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
                <div>
                  <label className="font-medium text-slate-300 block mb-1">Telegram Link</label>
                  <input
                    type="url"
                    value={formData.contacts.telegramUrl}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        contacts: { ...formData.contacts, telegramUrl: e.target.value }
                      })
                    }
                    placeholder="https://t.me/digitalwuffer"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SAFETY & EMERGENCY */}
          {activeTab === 'safety' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                <h3 className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                  Emergency Safety Contact / Handler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-slate-300 block mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={formData.emergencyContact.name}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, name: e.target.value }
                        })
                      }
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-300 block mb-1">Role / Dynamic</label>
                    <input
                      type="text"
                      value={formData.emergencyContact.relationship}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, relationship: e.target.value }
                        })
                      }
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-medium text-slate-300 block mb-1">Emergency Phone</label>
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, phone: e.target.value }
                        })
                      }
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-slate-300 block mb-1">Telegram (@handle)</label>
                    <input
                      type="text"
                      value={formData.emergencyContact.telegram || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          emergencyContact: { ...formData.emergencyContact, telegram: e.target.value }
                        })
                      }
                      className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-slate-300 block mb-1">Venue Location Note</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.venueNote || ''}
                    onChange={e =>
                      setFormData({
                        ...formData,
                        emergencyContact: { ...formData.emergencyContact, venueNote: e.target.value }
                      })
                    }
                    placeholder="e.g. Usually by rigging station or safety desk"
                    className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Safeword RED Protocol</label>
                <input
                  type="text"
                  value={formData.safetyProtocols.verbalRed}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      safetyProtocols: { ...formData.safetyProtocols, verbalRed: e.target.value }
                    })
                  }
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Safeword YELLOW Protocol</label>
                <input
                  type="text"
                  value={formData.safetyProtocols.verbalYellow}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      safetyProtocols: { ...formData.safetyProtocols, verbalYellow: e.target.value }
                    })
                  }
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Nonverbal RED (Gesture / Signal)</label>
                <input
                  type="text"
                  value={formData.safetyProtocols.nonverbalRed}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      safetyProtocols: { ...formData.safetyProtocols, nonverbalRed: e.target.value }
                    })
                  }
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Medical & Allergies Warning</label>
                <textarea
                  rows={2}
                  value={formData.safetyProtocols.medicalAllergies}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      safetyProtocols: { ...formData.safetyProtocols, medicalAllergies: e.target.value }
                    })
                  }
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-white"
                />
              </div>
            </div>
          )}

          {/* TAB 4: BOUNDARIES */}
          {activeTab === 'boundaries' && (
            <div className="space-y-5">
              {/* Add New Boundary Box */}
              <form onSubmit={handleCreateBoundary} className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Add New Boundary Item</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Title (e.g. Touching Leash, Wax Play)"
                      value={newBoundaryTitle}
                      onChange={e => setNewBoundaryTitle(e.target.value)}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                    />
                  </div>
                  <div>
                    <select
                      value={newBoundaryLevel}
                      onChange={e => setNewBoundaryLevel(e.target.value as BoundaryLevel)}
                      className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                    >
                      <option value="hard_limit">🛑 Hard Limit (Never)</option>
                      <option value="soft_limit">⚠️ Soft Limit (Ask First)</option>
                      <option value="enthusiastic_yes">🟢 Enthusiastic Yes</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-0.5">Category</label>
                  <select
                    value={newBoundaryCategory}
                    onChange={e => setNewBoundaryCategory(e.target.value as BoundaryCategory)}
                    className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                  >
                    <option value="touch">Touch and Physical space</option>
                    <option value="verbal">Verbal and Psychological</option>
                    <option value="restraints">Bondage and Restraints</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Clear description of the limit..."
                  value={newBoundaryDesc}
                  onChange={e => setNewBoundaryDesc(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                />

                <input
                  type="text"
                  placeholder="Optional exceptions or nuance..."
                  value={newBoundaryNotes}
                  onChange={e => setNewBoundaryNotes(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs"
                />

                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                >
                  Add Boundary Item
                </button>
              </form>

              {/* Manage Existing Items */}
              <div className="space-y-2">
                <p className="font-semibold text-slate-400 text-[11px] uppercase tracking-wider">
                  Existing Boundaries ({profile.boundaries.length})
                </p>
                {profile.boundaries.map(item => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white truncate">{item.title}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            item.level === 'hard_limit'
                              ? 'text-rose-300 bg-rose-950'
                              : item.level === 'soft_limit'
                              ? 'text-amber-300 bg-amber-950'
                              : 'text-emerald-300 bg-emerald-950'
                          }`}
                        >
                          {item.level.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.description}</p>
                    </div>

                    <button
                      onClick={() => deleteBoundary(item.id)}
                      className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-900 rounded-lg transition-colors shrink-0"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP & PIN */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              {/* PIN Code Protection */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <h3 className="font-bold text-white flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  <span>Wearer PIN Protection</span>
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Set a 4-digit PIN so that people who scan your collar QR code can read your boundaries,
                  but cannot edit or delete them.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="password"
                    maxLength={6}
                    value={newPinValue}
                    onChange={e => setNewPinValue(e.target.value)}
                    placeholder={hasPin ? 'Change PIN or leave blank to remove' : 'Enter new PIN'}
                    className="flex-1 p-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-mono"
                  />
                  <button
                    onClick={() => {
                      setPin(newPinValue);
                      setNewPinValue('');
                    }}
                    className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs"
                  >
                    Save PIN
                  </button>
                </div>
              </div>

              {/* JSON Backup Export & Import */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white flex items-center gap-1.5">
                  <Download className="w-4 h-4 text-sky-400" />
                  <span>Backup & Restore Profile</span>
                </h3>
                <p className="text-slate-400 text-[11px]">
                  Download a JSON backup of all your boundaries and contact configs, or import on another phone.
                </p>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      const json = exportProfileJson();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `consent-card-${formData.name.toLowerCase()}.json`;
                      a.click();
                      showToast('Backup JSON downloaded', 'success');
                    }}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export JSON</span>
                  </button>

                  <label className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center justify-center gap-1.5 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span>Import JSON</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = event => {
                            const content = event.target?.result as string;
                            if (content && importProfileJson(content)) {
                              onClose();
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Reset to Defaults */}
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-500 text-[11px]">Want to start fresh?</span>
                <button
                  onClick={() => {
                    if (window.confirm('Reset all boundaries to default template?')) {
                      resetToDefaults();
                      onClose();
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg text-rose-400 hover:bg-rose-950/40 text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs min-h-[44px]"
          >
            Cancel
          </button>

          <button
            onClick={handleSaveAll}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-md active:scale-95 transition-all min-h-[44px]"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
