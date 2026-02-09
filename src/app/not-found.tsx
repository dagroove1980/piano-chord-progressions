import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-[var(--color-secondary)] mb-8">
        The chord progression you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-white hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
