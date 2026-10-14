export type BoundaryLevel = 'hard_limit' | 'soft_limit' | 'enthusiastic_yes';
export type BoundaryContext = 'all' | 'public_only' | 'scene_only';
export type BoundaryCategory = 'touch' | 'restraints' | 'impact' | 'verbal' | 'photo' | 'aftercare';

export interface BoundaryItem {
  id: string;
  title: string;
  category: BoundaryCategory;
  context: BoundaryContext;
  level: BoundaryLevel;
  description: string;
  notes?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  telegram?: string;
  venueNote?: string;
}

export interface SafetyProtocols {
  verbalRed: string;
  verbalYellow: string;
  verbalGreen: string;
  nonverbalRed: string;
  nonverbalYellow: string;
  gaggedProtocol: string;
  restraintSafety: string;
  medicalAllergies: string;
}

export interface ContactInfo {
  discordHandle: string;
  discordUsername: string;
  discordUrl: string;
  telegramHandle: string;
  telegramUrl: string;
  customNote?: string;
}

export interface QuickCard {
  id: string;
  title: string;
  speakText: string;
  type: 'urgent' | 'comfort' | 'checkin' | 'basic';
  iconName: string;
}

export interface UserProfile {
  name: string;
  pronouns: string;
  roles: string[];
  shortBio: string;
  venueOrEvent?: string;
  avatarUrl?: string;
  headerImage?: string;
  contacts: ContactInfo;
  emergencyContact: EmergencyContact;
  safetyProtocols: SafetyProtocols;
  boundaries: BoundaryItem[];
  quickCards: QuickCard[];
  pinCode?: string; // Optional 4-digit PIN for wearer to unlock editing
}
