import { UserProfile } from '../types/profile';

export const defaultProfile: UserProfile = {
  name: 'Valco',
  pronouns: 'it / them',
  roles: ['Submissive', 'Puppy Play', 'Nonverbal in Scene'],
  shortBio: 'Hi. If you scanned this, I may currently be nonverbal, restrained, or in subspace. Please read my boundaries and contact info below before engaging.',
  venueOrEvent: 'Munches, Private Spaces & Play Venues',
  headerImage: '/src/assets/images/collar_profile_header_1791641773596.jpg',
  contacts: {
    discordHandle: '@alphawuff',
    discordUsername: 'Valco',
    discordUrl: 'https://discord.com/users/194568995087712256',
    telegramHandle: 'DigitalWuffer',
    telegramUrl: 'https://t.me/digitalwuffer',
    customNote: 'Discord is the fastest turnaround contact method to reach me, followed by Telegram.'
  },
  emergencyContact: {
    name: 'Morgan (Primary Safety Partner / Handler)',
    relationship: 'Primary Safety Partner & Scene Monitor',
    phone: '+1 (555) 234-8901',
    telegram: '@morgan_safety',
    venueNote: 'Usually located by the rigging station or dungeon front safety desk.'
  },
  safetyProtocols: {
    verbalRed: 'RED — Immediate total freeze and complete release of all bonds/pressure.',
    verbalYellow: 'YELLOW — Pause immediately, check breathing/nerve sensation, slow down tempo.',
    verbalGreen: 'GREEN — Enthusiastic consent to continue and hold current intensity.',
    nonverbalRed: 'Drop held handkerchief/token, 3 hard consecutive taps with hand or foot, or vigorous head shakes.',
    nonverbalYellow: '2 distinct taps with finger/hand, or holding one open palm toward partner.',
    gaggedProtocol: 'If gagged, use 3 taps or drop safety token. Do not assume muffled grunts mean agreement.',
    restraintSafety: 'Always keep safety shears within arm\'s reach. Check capillary blood refill in fingers/toes every 10 minutes. If tingling occurs, loosen immediately.',
    medicalAllergies: 'Severe Latex Allergy (Nitrile only). Mild asthma (inhaler kept in coat pocket). Avoid vomiting triggers (ball crushing can trigger nausea).'
  },
  boundaries: [
    // 1. Touch and Physical space
    {
      id: 'b-touch-collar',
      title: 'Touching collar or leash',
      category: 'touch',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Highly encouraged.',
      notes: 'Touching collar or leash is green/yes and highly encouraged in public and scene spaces.'
    },
    {
      id: 'b-touch-petting',
      title: 'Petting, stroking, and teasing',
      category: 'touch',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Highly encouraged.',
      notes: 'Welcomed tactile stroking, petting, ear scratching, and physical teasing.'
    },
    {
      id: 'b-touch-kissing',
      title: 'Kissing',
      category: 'touch',
      context: 'all',
      level: 'hard_limit',
      description: 'Very uncomfortable, will pull me out of headspace.',
      notes: 'Absolute hard limit under all circumstances.'
    },

    // 2. Verbal and Psychological
    {
      id: 'b-verbal-puppy-play',
      title: 'Puppy play/transformation',
      category: 'verbal',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Primarily nonverbal.',
      notes: 'Puppy play and psychological transformation into headspace; primarily nonverbal.'
    },
    {
      id: 'b-verbal-hypnosis',
      title: 'Hypnosis and Reprogramming/Dronification',
      category: 'verbal',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Primarily with audio files, video rarely has as much of an impact while in headspace.',
      notes: 'Enthusiastic yes. Audio files work best; video rarely has an impact while in headspace.'
    },
    {
      id: 'b-verbal-humiliation',
      title: 'Humiliation and bullying',
      category: 'verbal',
      context: 'all',
      level: 'soft_limit',
      description: 'Enjoyable, but with moderation. Check in before doing extended sessions.',
      notes: 'Soft limit. Enjoyable with moderation; check in before doing extended sessions.'
    },

    // 3. Bondage and Restraints
    {
      id: 'b-restraints-gags-muzzles',
      title: 'Gags and muzzles',
      category: 'restraints',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Cloth gags, muzzles, and mouth bits.',
      notes: 'Green / yes. Highly enjoyable, especially cloth jockstrap muzzles and pup hoods.'
    },
    {
      id: 'b-restraints-sensory-dep',
      title: 'Sensory deprivation (blindfolds, earplugs, etc)',
      category: 'restraints',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Blindfolds, earplugs, hoods, and sensory reduction.',
      notes: 'Green / yes. Deepens headspace immersion.'
    },
    {
      id: 'b-restraints-chains-heavy',
      title: 'Chains and Heavy Bondage',
      category: 'restraints',
      context: 'all',
      level: 'enthusiastic_yes',
      description: 'Silicone, rubber, biothane, or leather cuffs only, no metal.',
      notes: 'Green / yes. Soft cuffs only (silicone, rubber, biothane, or leather). No rigid metal cuffs on wrists.'
    }
  ],
  quickCards: []
};
