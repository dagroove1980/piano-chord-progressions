import { Suspense } from 'react';
import Link from 'next/link';
import { getAllProgressions, getProgressionsByStyleAndComplexity, sortProgressions } from '@/lib/progressions';
import { Style, Complexity, SortOption } from '@/types/progression';
import { ProgressionGrid } from '@/components/ProgressionGrid';
import { FilterBar } from '@/components/FilterBar';
import { SITE_DESCRIPTION, ALL_STYLES, STYLE_LABELS, ALL_COMPLEXITIES, COMPLEXITY_LABELS, STYLE_ICONS } from '@/lib/constants';
import { styleColors, complexityColors } from '@/lib/colors';
import { getIcon } from '@/lib/icons';

interface SearchParams {
  style?: string;
  complexity?: string;
  sort?: SortOption;
}

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const style = (params.style as Style) || null;
  const complexity = (params.complexity as Complexity) || null;
  const sort = (params.sort as SortOption) || 'popular';

  let progressions = getAllProgressions();

  // Apply filters
  if (style || complexity) {
    progressions = getProgressionsByStyleAndComplexity(style, complexity);
  }

  // Apply sorting
  progressions = sortProgressions(progressions, sort);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LearnPianoChords',
    description: SITE_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://learn-piano-chords.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://learn-piano-chords.com'}?style={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const hasFilters = style || complexity;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <section className="py-12 sm:py-16 text-center mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          Piano chord progressions<br />
          <span className="text-[var(--color-accent)]">worth learning.</span>
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto">
          {SITE_DESCRIPTION}
        </p>
      </section>

      {/* Browse by Style */}
      {!hasFilters && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Style</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {ALL_STYLES.map((s) => {
              const sc = styleColors[s] || { bg: '#EEF2FF', text: '#3730A3' };
              const Icon = getIcon(STYLE_ICONS[s]);
              return (
                <Link
                  key={s}
                  href={`/?style=${s}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-[var(--radius-card)] bg-[var(--color-card)] shadow-[var(--shadow-card)] transition-lift"
                >
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                    style={{ backgroundColor: sc.bg, color: sc.text }}
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="font-medium text-sm">{STYLE_LABELS[s]}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Browse by Level */}
      {!hasFilters && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Browse by Level</h2>
          <div className="flex flex-wrap gap-3">
            {ALL_COMPLEXITIES.map((c) => {
              const cc = complexityColors[c] || { bg: '#F3F4F6', text: '#374151' };
              return (
                <Link
                  key={c}
                  href={`/?complexity=${c}`}
                  className="px-5 py-2.5 rounded-[var(--radius-pill)] text-sm font-medium transition-lift"
                  style={{ backgroundColor: cc.bg, color: cc.text }}
                >
                  {COMPLEXITY_LABELS[c]}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Filters */}
      <Suspense fallback={null}>
        <FilterBar selectedStyle={style} selectedComplexity={complexity} />
      </Suspense>

      {/* Progressions Grid */}
      <section className="pb-16">
        <ProgressionGrid progressions={progressions} />
      </section>
      </div>
    </>
  );
}
