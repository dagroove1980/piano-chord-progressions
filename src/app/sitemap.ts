import { MetadataRoute } from 'next';
import { getAllProgressions } from '@/lib/progressions';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
  ];

  const progressionPages: MetadataRoute.Sitemap = getAllProgressions().map((progression) => ({
    url: `${SITE_URL}/progression/${progression.id}`,
    lastModified: progression.createdAt,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticPages, ...progressionPages];
}
