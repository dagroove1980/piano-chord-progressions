export const SITE_NAME = 'Piano Chord Progressions';
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'https://piano-chord-progressions.vercel.app';
export const SITE_DESCRIPTION = 'Discover the most famous piano chord progressions by style and complexity. Learn where to place your fingers on the keyboard.';

export const ALL_STYLES = [
  'pop',
  'jazz',
  'blues',
  'rock',
  'classical',
  'ballad',
  'r&b',
  'country',
  'folk',
  'gospel',
] as const;

export const ALL_COMPLEXITIES = ['beginner', 'intermediate', 'advanced'] as const;

export const STYLE_LABELS: Record<string, string> = {
  pop: 'Pop',
  jazz: 'Jazz',
  blues: 'Blues',
  rock: 'Rock',
  classical: 'Classical',
  ballad: 'Ballad',
  'r&b': 'R&B',
  country: 'Country',
  folk: 'Folk',
  gospel: 'Gospel',
};

export const COMPLEXITY_LABELS: Record<string, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

// AdSense Configuration (optional)
export const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID || '';
export const AD_SLOT_IDS = {
  HOMEPAGE_LEADERBOARD: process.env.NEXT_PUBLIC_ADSENSE_HOMEPAGE_SLOT_ID || '',
  DETAIL_PAGE: process.env.NEXT_PUBLIC_ADSENSE_DETAIL_SLOT_ID || '',
  IN_GRID: process.env.NEXT_PUBLIC_ADSENSE_INGRID_SLOT_ID || '',
} as const;
