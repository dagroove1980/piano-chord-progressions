import { ChordProgression, SortOption, Style, Complexity } from '@/types/progression';
import progressionsData from '../../data/progressions.json';

const progressions: ChordProgression[] = progressionsData as ChordProgression[];

export function getAllProgressions(): ChordProgression[] {
  return progressions;
}

export function getProgressionById(id: string): ChordProgression | undefined {
  return progressions.find((p) => p.id === id);
}

export function getProgressionsByStyle(style: Style): ChordProgression[] {
  return progressions.filter((p) => p.style === style);
}

export function getProgressionsByComplexity(complexity: Complexity): ChordProgression[] {
  return progressions.filter((p) => p.complexity === complexity);
}

export function getProgressionsByStyleAndComplexity(
  style: Style | null,
  complexity: Complexity | null
): ChordProgression[] {
  return progressions.filter((p) => {
    if (style && p.style !== style) return false;
    if (complexity && p.complexity !== complexity) return false;
    return true;
  });
}

export function sortProgressions(
  progressionList: ChordProgression[],
  sort: SortOption
): ChordProgression[] {
  switch (sort) {
    case 'popular':
      return [...progressionList].sort((a, b) => b.likes - a.likes);
    case 'new':
      return [...progressionList].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'complexity':
      const complexityOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      return [...progressionList].sort(
        (a, b) => complexityOrder[a.complexity] - complexityOrder[b.complexity]
      );
    case 'alphabetical':
      return [...progressionList].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return progressionList;
  }
}

export function getSimilarProgressions(
  progression: ChordProgression,
  count: number = 4
): ChordProgression[] {
  const others = progressions.filter((p) => p.id !== progression.id);

  const scored = others.map((p) => {
    let score = 0;
    // Same style
    if (p.style === progression.style) score += 5;
    // Same complexity
    if (p.complexity === progression.complexity) score += 3;
    // Shared tags
    for (const tag of p.tags) {
      if (progression.tags.includes(tag)) score += 2;
    }
    return { progression: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.progression);
}

export function getAllStyles(): Style[] {
  const styles = new Set<Style>();
  for (const p of progressions) {
    styles.add(p.style);
  }
  return Array.from(styles).sort();
}

export function getAllComplexities(): Complexity[] {
  return ['beginner', 'intermediate', 'advanced'];
}
