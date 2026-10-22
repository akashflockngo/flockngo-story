/**
 * Central Brand Configuration for FlocknGo Cinematic Brand Storytelling
 * Strict adherence to Phase 3 design guidelines and official assets.
 */

export interface NavLink {
  id: string
  label: string
  href: string
  external?: boolean
}

export interface PillarItem {
  key: string
  title: string
  tagline: string
  description: string
  detail: string
}

export const BRAND_CONFIG = {
  name: 'FlocknGo',
  tagline: 'Experience Together',
  manifesto: 'Build Communities. Drive Engagement. Grow Your Business.',
  officialSiteUrl: 'https://flockngo.com/',
  primaryCtaUrl: 'https://new.flockngo.com/',
  
  // Official social and contact destinations (verified from live production)
  links: {
    primaryCta: 'https://new.flockngo.com/',
    officialSite: 'https://flockngo.com/',
    eventsHub: 'https://events.flockngo.com/',
    whatsappSupport: 'https://wa.me/919607476642?text=Hi%20FlocknGo%20Support%2C%20I%20want%20to%20learn%20more.',
    linkedIn: 'https://www.linkedin.com/company/flockngo',
    youtube: 'https://www.youtube.com/@flockngo5875',
    googlePlay: 'https://play.google.com/store/apps/details?id=com.flockngo',
    appStore: 'https://apps.apple.com/app/flockngo',
  },

  // Centralized Color Tokens (Provisional + Verified)
  colors: {
    // Signature Orange (used sparingly for emphasis, action states & motion accents)
    signatureOrange: '#F47721',
    flameOrange: '#E74728',
    marigoldOrange: '#EF7F23',

    // Contrasting Chapters
    charcoalDark: '#111111',
    charcoalVoid: '#0A0D14',
    charcoalSurface: '#161B26',

    // Warm Light Chapters
    warmWhite: '#FFFCF8',
    warmPeach: '#FFF0E6',
    warmHighlight: '#FFF4EB',
    warmBorder: '#F3E5D8',
    subtleDivider: '#EAE0D5',

    // Typography Ink
    inkPrimaryDark: '#111111',
    inkBodyDark: '#3A3A3A',
    inkMutedDark: '#6B7280',
    inkPrimaryLight: '#F9FAFB',
    inkBodyLight: '#94A3B8',

    // Accents
    whatsappGreen: '#25D366',
    statusEmerald: '#10B981',
  },

  // Asset References
  assets: {
    video: '/media/flockngo-story.mp4',
    videoPoster: '/images/story/video-poster-cinematic.webp',
    logo: '/images/flockngo-logo.webp',
    logoFallback: '/images/flockngo-logo.png',
    favicon: '/favicon.png',
    
    // Premium Story Campaign Assets (WebP, optimized)
    heroBrand: '/images/story/hero-brand.webp',
    community: '/images/story/community.webp',
    activityCreation: '/images/story/activity-creation.webp',
    activityParticipation: '/images/story/activity-participation.webp',
    whatsappInvitation: '/images/story/whatsapp-invitation.webp',
    registrationPayment: '/images/story/registration-payment.webp',
    pollsAnnouncements: '/images/story/polls-announcements.webp',
    communityMemories: '/images/story/community-memories.webp',
    closingBrand: '/images/story/closing-brand.webp',

    // Store Badges
    googlePlay: '/images/google-play.png',
    appStore: '/images/app-store.png',
  },

  // Refined Brand Storytelling Navigation
  navigation: [
    { id: 'story', label: 'Story', href: '#story' },
    { id: 'film', label: 'The Film', href: '#film' },
    { id: 'community', label: 'Community', href: '#community' },
    { id: 'activities', label: 'Activities', href: '#activities' },
    { id: 'whatsapp', label: 'WhatsApp', href: '#whatsapp' },
    { id: 'payments', label: 'Payments', href: '#payments' },
    { id: 'engagement', label: 'Hub & Media', href: '#engagement' },
  ] as NavLink[],

  // Three Pillars (Strictly per Phase 3 specifications)
  pillars: [
    {
      key: 'action',
      title: 'ACTION',
      tagline: 'Turn plans into participation.',
      description:
        'Create activities, share invitations, manage sign-ups and bring the details of each experience into one seamless flow.',
      detail: '01 / PARTICIPATION',
    },
    {
      key: 'information',
      title: 'INFORMATION',
      tagline: 'Keep the details and memories in one place.',
      description:
        'Keep useful announcements, polls, photos, videos and shared resources connected to the experiences your members care about.',
      detail: '02 / ARCHIVE',
    },
    {
      key: 'communication',
      title: 'COMMUNICATION',
      tagline: 'Make important updates easier to reach.',
      description:
        'Reach members through direct WhatsApp updates and action links, helping important invitations and information stand out from busy group chats.',
      detail: '03 / REACH',
    },
  ] as PillarItem[],
} as const
