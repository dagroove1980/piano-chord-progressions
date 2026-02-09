export type Note =
  | 'C' | 'C#' | 'Db' | 'D' | 'D#' | 'Eb' | 'E' | 'F'
  | 'F#' | 'Gb' | 'G' | 'G#' | 'Ab' | 'A' | 'A#' | 'Bb' | 'B';

export type ChordType = 'major' | 'minor' | 'diminished' | 'augmented' | 'sus2' | 'sus4' | '7th' | 'maj7' | 'min7' | 'add9';

export interface Chord {
  root: Note;
  type: ChordType;
  notes: Note[]; // The actual notes in the chord (e.g., ['C', 'E', 'G'] for C major)
}

export type Style =
  | 'pop'
  | 'jazz'
  | 'blues'
  | 'rock'
  | 'classical'
  | 'ballad'
  | 'r&b'
  | 'country'
  | 'folk'
  | 'gospel';

export type Complexity = 'beginner' | 'intermediate' | 'advanced';

export interface ChordProgression {
  id: string;
  name: string;
  description: string;
  chords: Chord[]; // Max 8 chords
  style: Style;
  complexity: Complexity;
  tags: string[];
  examples?: string[]; // Song examples that use this progression
  likes: number;
  createdAt: string;
  metadata?: {
    // Other metadata fields can go here
  };
}

export type SortOption = 'popular' | 'new' | 'complexity' | 'alphabetical';

export interface FilterState {
  style: Style | null;
  complexity: Complexity | null;
  sort: SortOption;
}
