import { MetadataRoute } from 'next';
import { getAllProgressions } from '@/lib/progressions';
import { SITE_URL } from '@/lib/constants';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: 'weekly',
      priority: 1
    },
  ];

  const progressionPages: MetadataRoute.Sitemap = getAllProgressions().map((progression) => ({
    url: `${SITE_URL}/progression/${progression.id}`,
    lastModified: new Date(progression.createdAt).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  return [...staticPages, ...progressionPages];
}
