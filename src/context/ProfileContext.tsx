import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, BoundaryItem } from '../types/profile';
import { defaultProfile } from '../data/defaultProfile';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'alert';
}

interface ProfileContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateBoundary: (boundary: BoundaryItem) => void;
  addBoundary: (boundary: Omit<BoundaryItem, 'id'>) => void;
  deleteBoundary: (id: string) => void;
  resetToDefaults: () => void;
  exportProfileJson: () => string;
  importProfileJson: (json: string) => boolean;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'alert') => void;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isUnlocked: boolean;
  unlockWithPin: (pin: string) => boolean;
  lockEditor: () => void;
  hasPin: boolean;
  setPin: (pin: string) => void;
}

const STORAGE_KEY = 'consent_card_profile_v6';
const PIN_KEY = 'consent_card_pin_v1';

const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return defaultProfile;
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [storedPin, setStoredPin] = useState<string>(() => {
    return localStorage.getItem(PIN_KEY) || '';
  });
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    const existingPin = localStorage.getItem(PIN_KEY);
    return !existingPin; // If no PIN configured, editor is unlocked by default
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  }, [profile]);

  const showToast = (message: string, type: 'success' | 'info' | 'alert' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
    showToast('Profile updated', 'success');
  };

  const updateBoundary = (boundary: BoundaryItem) => {
    setProfile(prev => ({
      ...prev,
      boundaries: prev.boundaries.map(b => (b.id === boundary.id ? boundary : b))
    }));
    showToast('Boundary updated', 'success');
  };

  const addBoundary = (boundary: Omit<BoundaryItem, 'id'>) => {
    const newId = `b-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
    setProfile(prev => ({
      ...prev,
      boundaries: [
        { ...boundary, id: newId },
        ...prev.boundaries
      ]
    }));
    showToast('New boundary added', 'success');
  };

  const deleteBoundary = (id: string) => {
    setProfile(prev => ({
      ...prev,
      boundaries: prev.boundaries.filter(b => b.id !== id)
    }));
    showToast('Boundary removed', 'info');
  };

  const resetToDefaults = () => {
    setProfile(defaultProfile);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Reset to default boundaries', 'info');
  };

  const exportProfileJson = (): string => {
    return JSON.stringify(profile, null, 2);
  };

  const importProfileJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed.name && parsed.boundaries && parsed.safetyProtocols) {
        setProfile(parsed);
        showToast('Profile imported successfully', 'success');
        return true;
      }
    } catch {
      showToast('Invalid profile JSON file', 'alert');
    }
    return false;
  };

  const unlockWithPin = (enteredPin: string): boolean => {
    if (!storedPin || enteredPin === storedPin) {
      setIsUnlocked(true);
      showToast('Edit mode unlocked', 'success');
      return true;
    }
    showToast('Incorrect PIN', 'alert');
    return false;
  };

  const lockEditor = () => {
    if (storedPin) {
      setIsUnlocked(false);
      setIsEditMode(false);
      showToast('Editor locked', 'info');
    }
  };

  const setPin = (newPin: string) => {
    const cleaned = newPin.trim();
    setStoredPin(cleaned);
    if (cleaned) {
      localStorage.setItem(PIN_KEY, cleaned);
      setIsUnlocked(true);
      showToast('Owner PIN set', 'success');
    } else {
      localStorage.removeItem(PIN_KEY);
      setIsUnlocked(true);
      showToast('PIN removed (unlocked)', 'info');
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        updateBoundary,
        addBoundary,
        deleteBoundary,
        resetToDefaults,
        exportProfileJson,
        importProfileJson,
        toasts,
        showToast,
        isEditMode,
        setIsEditMode,
        isUnlocked,
        unlockWithPin,
        lockEditor,
        hasPin: Boolean(storedPin),
        setPin
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
