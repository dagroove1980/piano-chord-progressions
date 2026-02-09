import { MetadataRoute } from 'next';
import { getAllProgressions } from '@/lib/progressions';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const progressions = getAllProgressions();
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    ...progressions.map((progression) => ({
      url: `${SITE_URL}/progression/${progression.id}`,
      lastModified: new Date(progression.createdAt),
    })),
  ];
}
