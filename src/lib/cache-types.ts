export const CachedFiles = ['schedule', 'teams'] as const;
export const CachedScheduleFiles = [
  'hof',
  'prewk1',
  'prewk2',
  'prewk3',
  'week1',
  'week2',
  'week3',
  'week4',
  'week5',
  'week6',
  'week7',
  'week8',
  'week9',
  'week10',
  'week11',
  'week12',
  'week13',
  'week14',
  'week15',
  'week16',
  'week17',
  'week18',
  'wildcard',
  'divrd',
  'confchamp',
  'probowl',
  'superbowl',
] as const;

export interface CalendarWeek {
  name: string;
  dates: string;
  start: string;
  end: string;
  league: string;
  season: string;
  slug: typeof CachedScheduleFiles[number];
}

export interface TeamData {
  sport: string;
  league: string;
  id: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  name: string;
  nickname: string;
  location: string;
  color1: string;
  color2: string;
  isActive: boolean;
  logoUrl: string;
  clubhouseUrl: string;
  rosterUrl: string;
}

export interface GameData {
  id: string;
  date: string;
  name: string;
  shortName: string;
  home_id: string;
  home_score: string;
  away_id: string;
  away_score: string;
  supportingData: any;
}
