import {
  Music,
  Sparkles,
  Moon,
  Flame,
  Crown,
  Heart,
  Star,
  Sun,
  Trees,
  Zap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  music: Music,
  sparkles: Sparkles,
  moon: Moon,
  flame: Flame,
  crown: Crown,
  heart: Heart,
  star: Star,
  sun: Sun,
  trees: Trees,
  zap: Zap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Sparkles;
}
