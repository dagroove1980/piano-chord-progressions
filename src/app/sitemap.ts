import { MetadataRoute } from 'next';
import { getAllProgressions } from '@/lib/progressions';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const progressions = getAllProgressions();
  const baseUrl = SITE_URL.trim();
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...progressions.map((progression) => ({
      url: `${baseUrl}/progression/${progression.id}`,
      lastModified: new Date(progression.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
