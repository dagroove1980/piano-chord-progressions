'use client';

import Link from 'next/link';
import { ChordProgression } from '@/types/progression';
import { STYLE_LABELS, COMPLEXITY_LABELS } from '@/lib/constants';
import { PianoKeyboard } from './PianoKeyboard';

interface ProgressionCardProps {
  progression: ChordProgression;
}

export function ProgressionCard({ progression }: ProgressionCardProps) {
  // Show first chord as preview
  const previewChord = progression.chords[0];

  return (
    <article className="rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-lift overflow-hidden">
      <Link href={`/progression/${progression.id}`} className="block">
        {/* Preview Section */}
        <div className="py-8 bg-gradient-to-br from-[var(--color-background)] to-[var(--color-card)]">
          <div className="px-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{progression.name}</h3>
                <div className="flex gap-2 flex-wrap">
                  <span className="text-xs px-2 py-1 rounded-[var(--radius-pill)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    {STYLE_LABELS[progression.style]}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-[var(--radius-pill)] bg-[var(--color-border)] text-[var(--color-secondary)]">
                    {COMPLEXITY_LABELS[progression.complexity]}
                  </span>
                </div>
              </div>
            </div>
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

      {/* Info Section */}
      <div className="px-4 py-3 border-t border-[var(--color-border)]">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-[var(--color-secondary)] line-clamp-2">
              {progression.description}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--color-secondary)] shrink-0">
            <svg className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
            <span>{progression.likes.toLocaleString()}</span>
          </div>
        </div>

        {/* Tags */}
        {progression.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {progression.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-[var(--radius-pill)] bg-[var(--color-background)] text-[var(--color-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
