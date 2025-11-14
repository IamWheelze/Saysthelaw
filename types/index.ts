// Core type definitions for Saysthelaw platform

export interface Country {
  id: string;
  name: string;
  code: string; // ISO 3166-1 alpha-2
  region: 'East Africa' | 'West Africa' | 'North Africa' | 'Southern Africa' | 'Central Africa' | 'Other';
  flag: string;
  capital: string;
  population: number;
  gdp?: number;
  legalSystem: string;
  constitution: {
    year: number;
    url?: string;
  };
  summary: string;
  slug: string;
  featured?: boolean;
}

export interface Law {
  id: string;
  title: string;
  country: string; // Country code
  category: LawCategory;
  yearEnacted: number;
  yearAmended?: number;
  summary: string;
  fullText?: string;
  sourceUrl?: string;
  keyProvisions: string[];
  realWorldImpact: string;
  slug: string;
}

export type LawCategory =
  | 'Human Rights'
  | 'Police & Security'
  | 'Courts & Justice'
  | 'Labour & Employment'
  | 'Elections & Democracy'
  | 'Women & Children'
  | 'Environment'
  | 'Business & Commerce'
  | 'Health'
  | 'Education'
  | 'Land & Property'
  | 'Other';

export interface Topic {
  id: string;
  title: string;
  category: LawCategory;
  description: string;
  slug: string;
  icon?: string;
  relatedLaws: string[]; // Law IDs
  articles: string[]; // Article IDs
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  category: LawCategory;
  tags: string[];
  countries: string[]; // Country codes
  featured?: boolean;
  readTime: number; // minutes
  seo: SEOMetadata;
}

export interface CaseReview {
  id: string;
  title: string;
  slug: string;
  country: string;
  date: string;
  summary: string;
  whatHappened: string;
  lawsApplied: string[];
  violations?: string[];
  consequences: string;
  comparison?: string;
  sources: Source[];
  category: LawCategory;
  seo: SEOMetadata;
}

export interface DataPoint {
  id: string;
  title: string;
  description: string;
  category: string;
  country?: string;
  region?: string;
  year: number;
  value: number | string;
  unit?: string;
  source: Source;
  visualization?: 'chart' | 'map' | 'table' | 'infographic';
}

export interface Source {
  name: string;
  url?: string;
  date?: string;
  type: 'government' | 'international' | 'ngo' | 'news' | 'academic' | 'other';
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface MenuItem {
  label: string;
  href: string;
  children?: MenuItem[];
}

export interface CountryProfile extends Country {
  keyLaws: Law[];
  recentCases: CaseReview[];
  statistics: DataPoint[];
  articles: Article[];
  systemOverview: string;
  keyRights: string[];
  commonProblems: string[];
  progressAndReforms: string;
  whatCitizensShouldKnow: string[];
}
