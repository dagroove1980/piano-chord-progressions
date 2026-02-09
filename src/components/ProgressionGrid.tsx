import { ChordProgression } from '@/types/progression';
import { ProgressionCard } from './ProgressionCard';

interface ProgressionGridProps {
  progressions: ChordProgression[];
}

export function ProgressionGrid({ progressions }: ProgressionGridProps) {
  if (progressions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-secondary)]">No progressions found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {progressions.map((progression) => (
        <ProgressionCard key={progression.id} progression={progression} />
      ))}
    </div>
  );
}
