import { Law } from '@/types';

/**
 * Sample law data - demonstrates the data structure
 * This should eventually be replaced with a comprehensive database
 */

export const sampleLaws: Law[] = [
  {
    id: 'ke-constitution-2010',
    title: 'Constitution of Kenya 2010',
    country: 'KE',
    category: 'Human Rights',
    yearEnacted: 2010,
    summary:
      'Kenya\'s constitution establishes a comprehensive Bill of Rights and independent institutions.',
    keyProvisions: [
      'Bill of Rights (Chapter 4)',
      'Right to life, equality, and human dignity',
      'Freedom of expression and media',
      'Right to fair trial and access to justice',
      'Economic and social rights',
      'Independent judiciary and commissions',
    ],
    realWorldImpact:
      'The 2010 constitution has been cited in landmark cases protecting freedom of expression, LGBTQ+ rights, and challenging government overreach. However, implementation of economic and social rights remains limited.',
    sourceUrl: 'http://www.kenyalaw.org/constitution/',
    slug: 'kenya-constitution-2010',
  },
  {
    id: 'ng-freedom-of-information-act',
    title: 'Freedom of Information Act 2011',
    country: 'NG',
    category: 'Human Rights',
    yearEnacted: 2011,
    summary:
      'Guarantees citizens the right to access government information and records.',
    keyProvisions: [
      'Right to access public records',
      'Government duty to disclose information',
      'Exemptions for national security and privacy',
      'Penalties for non-compliance',
    ],
    realWorldImpact:
      'While the law exists, enforcement is weak. Many government agencies refuse to comply with information requests, and few penalties have been imposed.',
    sourceUrl: 'https://www.icnl.org/resources/civic-freedom-monitor/nigeria',
    slug: 'nigeria-foi-act-2011',
  },
  {
    id: 'za-promotion-of-equality-act',
    title: 'Promotion of Equality and Prevention of Unfair Discrimination Act',
    country: 'ZA',
    category: 'Human Rights',
    yearEnacted: 2000,
    summary:
      'Implements the constitutional right to equality and prohibits unfair discrimination.',
    keyProvisions: [
      'Prohibits discrimination based on race, gender, disability, etc.',
      'Establishes Equality Courts',
      'Provides remedies for victims of discrimination',
      'Criminalizes hate speech',
    ],
    realWorldImpact:
      'The Act has been used in important cases challenging discrimination, though implementation at lower levels remains inconsistent.',
    sourceUrl: 'https://www.justice.gov.za/legislation/',
    slug: 'south-africa-equality-act-2000',
  },
  {
    id: 'ke-national-police-service-act',
    title: 'National Police Service Act 2011',
    country: 'KE',
    category: 'Police & Security',
    yearEnacted: 2011,
    yearAmended: 2015,
    summary:
      'Establishes the framework for police operations, accountability, and oversight in Kenya.',
    keyProvisions: [
      'Creates Independent Policing Oversight Authority (IPOA)',
      'Police Service Commission for hiring and discipline',
      'Prohibits torture and excessive force',
      'Community policing requirements',
      'Complaints mechanism',
    ],
    realWorldImpact:
      'Despite the law, police brutality remains a serious problem. IPOA has documented hundreds of extrajudicial killings, but prosecutions are rare.',
    sourceUrl: 'http://www.kenyalaw.org/',
    slug: 'kenya-police-service-act-2011',
  },
  {
    id: 'gh-labour-act',
    title: 'Labour Act 2003',
    country: 'GH',
    category: 'Labour & Employment',
    yearEnacted: 2003,
    summary:
      'Governs employment relationships, workers\' rights, and labour disputes in Ghana.',
    keyProvisions: [
      'Right to fair wages and working conditions',
      'Maximum 8-hour workday, 40-hour week',
      'Paid annual leave (15 working days minimum)',
      'Protection against unfair dismissal',
      'Right to form and join trade unions',
      'Occupational health and safety standards',
    ],
    realWorldImpact:
      'The Act provides strong protections on paper, but enforcement is weak in the informal sector where most Ghanaians work.',
    sourceUrl: 'https://www.ilo.org/dyn/natlex/',
    slug: 'ghana-labour-act-2003',
  },
];

export function getLawsByCountry(countryCode: string): Law[] {
  return sampleLaws.filter((law) => law.country === countryCode);
}

export function getLawsByCategory(category: string): Law[] {
  return sampleLaws.filter((law) => law.category === category);
}

export function getLawBySlug(slug: string): Law | undefined {
  return sampleLaws.find((law) => law.slug === slug);
}
