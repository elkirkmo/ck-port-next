import type { MetadataRoute } from 'next';
import { siteUrl } from './siteConfig';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/live`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
