import type { MetadataRoute } from 'next';
import { getAllProgressions } from '@/lib/progressions';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://piano-chord-progressions.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { 
      url: BASE_URL, 
      lastModified: now, 
      changeFrequency: 'weekly', 
      priority: 1.0 
    },
  ];

  // Individual progression pages
  const progressionPages: MetadataRoute.Sitemap = getAllProgressions().map((progression) => ({
    url: `${BASE_URL}/progression/${progression.id}`,
    lastModified: new Date(progression.createdAt).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...progressionPages,
  ];
}
