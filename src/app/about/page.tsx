import { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'LearnPianoChords is a free reference for piano chord progressions across every style and skill level.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="py-4 text-xs text-[var(--color-secondary)]" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[var(--color-foreground)] transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[var(--color-foreground)]">About</span>
      </nav>

      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
        About <span className="text-[var(--color-accent)]">LearnPianoChords</span>
      </h1>

      <div className="space-y-6 text-[var(--color-secondary)] text-lg leading-relaxed">
        <p>
          LearnPianoChords is a free visual reference for piano chord progressions. Every progression shows you exactly where to place your fingers on the keyboard — no music theory degree required.
        </p>

        <p>
          We cover <strong className="text-[var(--color-foreground)]">10 styles</strong> — from pop and jazz to blues, rock, classical, and gospel — across <strong className="text-[var(--color-foreground)]">three skill levels</strong> so you can find progressions that match where you are right now.
        </p>

        <p>
          Each progression includes an interactive keyboard diagram, the full chord sequence, notation, and real song examples so you can hear the progression in context.
        </p>

        <h2 className="text-2xl font-bold text-[var(--color-foreground)] pt-4">
          How to use this site
        </h2>

        <ol className="list-decimal list-inside space-y-3">
          <li><strong className="text-[var(--color-foreground)]">Browse</strong> — Filter by style or skill level on the <Link href="/" className="text-[var(--color-accent)] hover:underline">homepage</Link>.</li>
          <li><strong className="text-[var(--color-foreground)]">Learn</strong> — Open a progression to see every chord on the keyboard.</li>
          <li><strong className="text-[var(--color-foreground)]">Practice</strong> — Play through the chord sequence on your piano or keyboard.</li>
        </ol>

        <h2 className="text-2xl font-bold text-[var(--color-foreground)] pt-4">
          Who is this for?
        </h2>

        <p>
          Anyone who wants to learn piano chords — beginners picking up their first progression, intermediate players expanding their repertoire, or advanced musicians exploring new styles.
        </p>
      </div>
    </div>
  );
}
