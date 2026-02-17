import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProgressionById, getAllProgressions, getSimilarProgressions } from '@/lib/progressions';
import { PianoKeyboard } from '@/components/PianoKeyboard';
import { ProgressionGrid } from '@/components/ProgressionGrid';
import { STYLE_LABELS, COMPLEXITY_LABELS, SITE_URL } from '@/lib/constants';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProgressions().map((progression) => ({ id: progression.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const progression = getProgressionById(id);
  if (!progression) return {};

  return {
    title: `${progression.name} — Piano Chord Progression`,
    description: progression.description,
    openGraph: {
      title: `${progression.name} — Piano Chord Progression`,
      description: progression.description,
      url: `${SITE_URL}/progression/${progression.id}`,
      type: 'article',
    },
    alternates: {
      canonical: `${SITE_URL}/progression/${progression.id}`,
    },
  };
}

export default async function ProgressionPage({ params }: Props) {
  const { id } = await params;
  const progression = getProgressionById(id);
  if (!progression) notFound();

  const similar = getSimilarProgressions(progression, 3);

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: progression.name,
    description: progression.description,
    url: `${SITE_URL}/progression/${progression.id}`,
    datePublished: progression.createdAt,
    dateModified: progression.createdAt,
    author: {
      '@type': 'Organization',
      name: 'LearnPianoChords',
    },
    publisher: {
      '@type': 'Organization',
      name: 'LearnPianoChords',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/progression/${progression.id}`,
    },
    about: {
      '@type': 'Thing',
      name: 'Piano Chord Progression',
      description: `${progression.style} ${progression.complexity} piano chord progression`,
    },
    keywords: progression.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="py-4 text-xs text-[var(--color-secondary)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-foreground)]">{progression.name}</span>
      </nav>

      {/* Header */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold">{progression.name}</h1>
        </div>
        <p className="text-lg text-[var(--color-secondary)] mb-6">{progression.description}</p>

        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-[var(--radius-pill)] bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm">
            {STYLE_LABELS[progression.style]}
          </span>
          <span className="px-3 py-1 rounded-[var(--radius-pill)] bg-[var(--color-border)] text-[var(--color-secondary)] text-sm">
            {COMPLEXITY_LABELS[progression.complexity]}
          </span>
        </div>
      </section>

      {/* Chord Sequence */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Chord Sequence</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {progression.chords.map((chord, index) => (
            <div key={index} className="bg-[var(--color-card)] rounded-[var(--radius-card)] p-4 shadow-[var(--shadow-card)]">
              <div className="text-center mb-2">
                <span className="text-sm text-[var(--color-secondary)]">Chord {index + 1}</span>
              </div>
              <PianoKeyboard chord={chord} showLabels={true} maxWidth="200px" />
            </div>
          ))}
        </div>
      </section>

      {/* Chord Notation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Chord Notation</h2>
        <div className="flex flex-wrap gap-3">
          {progression.chords.map((chord, index) => (
            <div
              key={index}
              className="px-3 py-1.5 rounded bg-[var(--color-background)] border border-[var(--color-border)] font-mono text-base"
            >
              {chord.root}
              {chord.type !== 'major' ? ` ${chord.type}` : ''}
            </div>
          ))}
        </div>
      </section>

      {/* Examples */}
      {progression.examples && progression.examples.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Song Examples</h2>
          <ul className="list-disc list-inside space-y-2 text-[var(--color-secondary)]">
            {progression.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      {progression.tags.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {progression.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-[var(--radius-pill)] bg-[var(--color-background)] border border-[var(--color-border)] text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Similar Progressions */}
      {similar.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Similar Progressions</h2>
          <ProgressionGrid progressions={similar} />
        </section>
      )}
      </div>
    </>
  );
}
