import { Metadata } from 'next';
import { SEOMetadata } from '@/types';

export const siteConfig = {
  name: 'Saysthelaw',
  description: 'The law in real life — explained clearly, simply, and with evidence.',
  url: 'https://saysthelaw.com',
  ogImage: '/images/og-image.png',
  links: {
    twitter: 'https://twitter.com/saysthelaw',
    github: 'https://github.com/saysthelaw',
  },
};

export function generateMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: seo.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || siteConfig.ogImage],
      creator: '@saysthelaw',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export const defaultSEO: SEOMetadata = {
  title: 'Saysthelaw | African Laws Explained Simply',
  description: 'Understanding African and global laws through clear explanations, real-world cases, and data. The law in real life.',
  keywords: [
    'African law',
    'legal rights',
    'human rights',
    'constitutional law',
    'legal education',
    'law explained',
    'citizen rights',
    'legal reform',
  ],
  canonicalUrl: siteConfig.url,
};
