import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saysthelaw.com';

  // Static pages
  const routes = [
    '',
    '/countries',
    '/topics',
    '/cases',
    '/data',
    '/explainers',
    '/blog',
    '/about',
    '/contact',
    '/disclaimer',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Topic pages
  const topics = [
    'human-rights',
    'police-security',
    'courts-justice',
    'labour-employment',
    'elections-democracy',
    'women-children',
  ].map((topic) => ({
    url: `${baseUrl}/topics/${topic}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...topics];
}
