'use client';

import { Chord, Note } from '@/types/progression';
import { isBlackKey } from '@/lib/chords';

interface PianoKeyboardProps {
  chord: Chord;
  octave?: number; // Which octave to display (default: middle C octave)
  showLabels?: boolean;
  className?: string;
  maxWidth?: string; // Custom max-width (e.g., '448px', '420px')
}

/**
 * Piano Keyboard Component
 * Displays a chord on a simplified piano keyboard
 */
export function PianoKeyboard({ chord, octave = 4, showLabels = true, className = '', maxWidth = '448px' }: PianoKeyboardProps) {
  // Standard piano layout: C, C#, D, D#, E, F, F#, G, G#, A, A#, B
  const whiteKeys: Note[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys: Note[] = ['C#', 'D#', 'F#', 'G#', 'A#'];

  // Map black key positions relative to white keys
  const blackKeyPositions: Record<string, number> = {
    'C#': 1, // Between C and D
    'D#': 2, // Between D and E
    'F#': 4, // Between F and G
    'G#': 5, // Between G and A
    'A#': 6, // Between A and B
  };

  // Handle enharmonic equivalents
  const normalizeNote = (note: Note): Note => {
    const enharmonicMap: Record<string, Note> = {
      'Db': 'C#',
      'Eb': 'D#',
      'Gb': 'F#',
      'Ab': 'G#',
      'Bb': 'A#',
    };
    return enharmonicMap[note] || note;
  };

  const chordNotes = chord.notes.map(normalizeNote);

  // Check if a note is in the chord
  const isNoteInChord = (note: Note): boolean => {
    const normalized = normalizeNote(note);
    return chordNotes.includes(normalized);
  };

  // Get the actual label to display for a note (respecting chord's enharmonic names)
  const getNoteLabel = (note: Note): string => {
    const normalized = normalizeNote(note);
    const matchingNote = chord.notes.find(n => normalizeNote(n) === normalized);
    return matchingNote || note;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Chord Name */}
      <div className="text-center mb-3">
        <span className="text-lg font-bold text-[var(--color-accent)]">
          {chord.root}
          {chord.type !== 'major' ? ` ${chord.type}` : ''}
        </span>
      </div>

      {/* Keyboard Container */}
      <div className="relative mx-auto" style={{ maxWidth, width: maxWidth }}>
        {/* White Keys */}
        <div className="relative flex" style={{ height: '120px' }}>
          {whiteKeys.map((note, index) => {
            const isPressed = isNoteInChord(note);
            // All pressed keys should have red extending to the top (between black keys or full height)
            // This makes the red visible between black keys for keys that have them
            const extendsToTop = isPressed;

            return (
              <div
                key={note}
                className="relative flex-1 bg-white rounded-b"
                style={{
                  marginLeft: index === 0 ? 0 : '0',
                  borderLeft: index === 0 ? 'none' : '1px solid #c8c8c8',
                  borderRight: 'none',
                  borderBottom: '1px solid #e0e0e0',
                }}
              >
                {/* Red highlight - extends to top for all pressed keys */}
                {isPressed && (
                  <div
                    className="absolute left-0 right-0 bg-[var(--color-accent)]"
                    style={{
                      top: '0',
                      height: '120px',
                      borderLeft: '1px solid rgba(0,0,0,0.1)',
                      borderRight: '1px solid rgba(0,0,0,0.1)',
                      borderRadius: '0 0 4px 4px',
                    }}
                  >
                    {showLabels && (
                      <div className="absolute bottom-4 left-0 right-0 text-center text-base font-bold text-white uppercase">
                        {getNoteLabel(note)}
                      </div>
                    )}
                  </div>
                )}

                {/* Label for unpressed keys */}
                {!isPressed && showLabels && (
                  <div className="absolute bottom-4 left-0 right-0 text-center text-base font-medium text-[var(--color-foreground)] uppercase">
                    {getNoteLabel(note)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Black Keys - Positioned above white keys */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: '56px' }}>
          {blackKeys.map((blackNote) => {
            const isPressed = isNoteInChord(blackNote);
            const position = blackKeyPositions[blackNote];
            const whiteKeyWidth = 100 / 7;

            return (
              <div
                key={blackNote}
                className="absolute"
                style={{
                  left: `${position * whiteKeyWidth}%`,
                  width: `${whiteKeyWidth * 0.6}%`,
                  marginLeft: `-${whiteKeyWidth * 0.3}%`,
                }}
              >
                <div
                  className={`h-16 rounded-b ${isPressed
                    ? 'bg-[var(--color-accent)] text-white z-20'
                    : 'bg-[#1a1a1a] text-white'
                    }`}
                >
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notes List */}
      <div className="mt-3 text-center">
        <div className="text-xs text-[var(--color-secondary)]">
          Notes: {chord.notes.join(', ')}
        </div>
      </div>
    </div>
  );
}
