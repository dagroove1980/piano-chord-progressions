'use client';

import Link from 'next/link';
import { ChordProgression } from '@/types/progression';
import { STYLE_LABELS, COMPLEXITY_LABELS } from '@/lib/constants';
import { styleColors, complexityColors } from '@/lib/colors';
import { PianoKeyboard } from './PianoKeyboard';

interface ProgressionCardProps {
  progression: ChordProgression;
}

export function ProgressionCard({ progression }: ProgressionCardProps) {
  const previewChord = progression.chords[0];
  const sc = styleColors[progression.style] || { bg: '#EEF2FF', text: '#3730A3' };
  const cc = complexityColors[progression.complexity] || { bg: '#F3F4F6', text: '#374151' };

  return (
    <article className="rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-lift overflow-hidden">
      <Link href={`/progression/${progression.id}`} className="block">
        <div className="py-8 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-card)]">
          <div className="px-6">
            <h3 className="text-xl font-bold mb-2">{progression.name}</h3>
            <div className="flex gap-2 flex-wrap mb-3">
              <span
                className="text-xs px-2 py-1 rounded-[var(--radius-pill)]"
                style={{ backgroundColor: sc.bg, color: sc.text }}
              >
                {STYLE_LABELS[progression.style]}
              </span>
              <span
                className="text-xs px-2 py-1 rounded-[var(--radius-pill)]"
                style={{ backgroundColor: cc.bg, color: cc.text }}
              >
                {COMPLEXITY_LABELS[progression.complexity]}
              </span>
            </div>
            <p className="text-sm text-[var(--color-secondary)] line-clamp-2 mb-4">
              {progression.description}
            </p>
          </div>

          {/* Keyboard Preview */}
          <div className="flex justify-center px-4">
            <PianoKeyboard chord={previewChord} showLabels={true} maxWidth="270px" />
          </div>

          <div className="px-6 mt-4">
            {/* Chord Sequence Preview */}
            <div className="flex gap-2 flex-wrap">
              {progression.chords.slice(0, 4).map((chord, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 rounded bg-[var(--color-background)] text-[var(--color-foreground)] font-mono"
                >
                  {chord.root}
                  {chord.type !== 'major' ? chord.type.charAt(0) : ''}
                </span>
              ))}
              {progression.chords.length > 4 && (
                <span className="text-xs px-2 py-1 text-[var(--color-secondary)]">
                  +{progression.chords.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
