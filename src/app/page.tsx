import { Suspense } from 'react';
import { getAllProgressions, getProgressionsByStyleAndComplexity, sortProgressions } from '@/lib/progressions';
import { Style, Complexity, SortOption } from '@/types/progression';
import { ProgressionGrid } from '@/components/ProgressionGrid';
import { FilterBar } from '@/components/FilterBar';
import { SITE_DESCRIPTION } from '@/lib/constants';

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
          LearnPianoChords
        </h1>
        <p className="text-lg sm:text-xl text-[var(--color-secondary)] max-w-2xl mx-auto">
          {SITE_DESCRIPTION}
        </p>
      </section>

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
