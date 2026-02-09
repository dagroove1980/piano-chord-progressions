import { Note, Chord } from '@/types/progression';

/**
 * Get the notes for a chord based on root and type
 */
export function getChordNotes(root: Note, type: string): Note[] {
  const noteOrder: Note[] = ['C', 'C#', 'Db', 'D', 'D#', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B'];
  
  const getRootIndex = (note: Note): number => {
    // Handle enharmonic equivalents
    const map: Record<Note, number> = {
      'C': 0, 'C#': 1, 'Db': 1, 'D': 3, 'D#': 4, 'Eb': 4, 'E': 6,
      'F': 7, 'F#': 8, 'Gb': 8, 'G': 10, 'G#': 11, 'Ab': 11,
      'A': 13, 'A#': 14, 'Bb': 14, 'B': 16
    };
    return map[note];
  };

  const rootIndex = getRootIndex(root);
  
  // Semitone intervals for different chord types
  const intervals: Record<string, number[]> = {
    major: [0, 4, 7],           // Root, Major 3rd, Perfect 5th
    minor: [0, 3, 7],           // Root, Minor 3rd, Perfect 5th
    diminished: [0, 3, 6],      // Root, Minor 3rd, Diminished 5th
    augmented: [0, 4, 8],       // Root, Major 3rd, Augmented 5th
    sus2: [0, 2, 7],            // Root, Major 2nd, Perfect 5th
    sus4: [0, 5, 7],            // Root, Perfect 4th, Perfect 5th
    '7th': [0, 4, 7, 10],       // Dominant 7th
    maj7: [0, 4, 7, 11],        // Major 7th
    min7: [0, 3, 7, 10],        // Minor 7th
    add9: [0, 4, 7, 14],        // Add 9th (2 octaves up)
  };

  const semitones = intervals[type] || intervals.major;
  
  // Convert semitone intervals to note names
  const notes: Note[] = [];
  const chromaticScale: Note[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  semitones.forEach(semitone => {
    const noteIndex = (rootIndex + semitone) % 12;
    notes.push(chromaticScale[noteIndex] as Note);
  });

  return notes;
}

/**
 * Check if a note is a black key (sharp/flat)
 */
export function isBlackKey(note: Note): boolean {
  return note.includes('#') || note.includes('b');
}

/**
 * Get the display name for a note (handles enharmonic equivalents)
 */
export function getNoteDisplayName(note: Note): string {
  return note;
}

/**
 * Get the position of a note on a standard 88-key piano
 * Returns the octave and key position
 */
export function getNotePosition(note: Note, octave: number = 4): { octave: number; keyIndex: number } {
  const noteToSemitone: Record<Note, number> = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
    'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8,
    'A': 9, 'A#': 10, 'Bb': 10, 'B': 11
  };
  
  const semitone = noteToSemitone[note];
  const keyIndex = octave * 12 + semitone;
  
  return { octave, keyIndex };
}
