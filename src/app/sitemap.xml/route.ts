import { NextResponse } from 'next/server';
import { getAllProgressions } from '@/lib/progressions';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://piano-chord-progressions.vercel.app';

export async function GET() {
  const progressions = getAllProgressions();
  const baseUrl = SITE_URL.trim();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${baseUrl}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
${progressions.map((progression) => 
  `<url><loc>${baseUrl}/progression/${progression.id}</loc><lastmod>${new Date(progression.createdAt).toISOString()}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
