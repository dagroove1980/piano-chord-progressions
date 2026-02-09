'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Style, Complexity } from '@/types/progression';
import { STYLE_LABELS, COMPLEXITY_LABELS, ALL_STYLES, ALL_COMPLEXITIES } from '@/lib/constants';

interface FilterBarProps {
  selectedStyle: Style | null;
  selectedComplexity: Complexity | null;
}

export function FilterBar({ selectedStyle, selectedComplexity }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Style Filters */}
      <div>
        <label className="text-sm font-medium mb-2 block text-[var(--color-foreground)]">
          Style
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('style', null)}
            className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm transition-colors ${
              !selectedStyle
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]'
            }`}
          >
            All
          </button>
          {ALL_STYLES.map((style) => (
            <button
              key={style}
              onClick={() => updateFilter('style', selectedStyle === style ? null : style)}
              className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm transition-colors ${
                selectedStyle === style
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]'
              }`}
            >
              {STYLE_LABELS[style]}
            </button>
          ))}
        </div>
      </div>

      {/* Complexity Filters */}
      <div>
        <label className="text-sm font-medium mb-2 block text-[var(--color-foreground)]">
          Complexity
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter('complexity', null)}
            className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm transition-colors ${
              !selectedComplexity
                ? 'bg-[var(--color-accent)] text-white'
                : 'bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]'
            }`}
          >
            All
          </button>
          {ALL_COMPLEXITIES.map((complexity) => (
            <button
              key={complexity}
              onClick={() => updateFilter('complexity', selectedComplexity === complexity ? null : complexity)}
              className={`px-4 py-2 rounded-[var(--radius-pill)] text-sm transition-colors ${
                selectedComplexity === complexity
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-background)] text-[var(--color-foreground)] hover:bg-[var(--color-border)]'
              }`}
            >
              {COMPLEXITY_LABELS[complexity]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
