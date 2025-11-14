import { Country } from '@/types';

/**
 * Sample country data - demonstrates the data structure
 * This should eventually be replaced with a comprehensive database
 */

export const sampleCountries: Country[] = [
  {
    id: 'ke',
    name: 'Kenya',
    code: 'KE',
    region: 'East Africa',
    flag: '🇰🇪',
    capital: 'Nairobi',
    population: 54000000,
    gdp: 115000000000,
    legalSystem: 'Common Law (British-influenced)',
    constitution: {
      year: 2010,
      url: 'http://www.kenyalaw.org/constitution/',
    },
    summary:
      'Kenya adopted a new constitution in 2010 that includes a comprehensive Bill of Rights and establishes an independent judiciary.',
    slug: 'kenya',
    featured: true,
  },
  {
    id: 'ng',
    name: 'Nigeria',
    code: 'NG',
    region: 'West Africa',
    flag: '🇳🇬',
    capital: 'Abuja',
    population: 223000000,
    gdp: 477000000000,
    legalSystem: 'Mixed (Common Law, Customary Law, Sharia in some states)',
    constitution: {
      year: 1999,
      url: 'https://www.nigeria.gov.ng/constitution',
    },
    summary:
      'Nigeria has a federal system with a constitution that guarantees fundamental human rights, though implementation varies across states.',
    slug: 'nigeria',
    featured: true,
  },
  {
    id: 'za',
    name: 'South Africa',
    code: 'ZA',
    region: 'Southern Africa',
    flag: '🇿🇦',
    capital: 'Pretoria (executive)',
    population: 60000000,
    gdp: 405000000000,
    legalSystem: 'Mixed (Roman-Dutch, Common Law, Customary Law)',
    constitution: {
      year: 1996,
      url: 'https://www.gov.za/documents/constitution',
    },
    summary:
      'South Africa has one of the most progressive constitutions in the world, with strong protections for human rights and equality.',
    slug: 'south-africa',
    featured: true,
  },
  {
    id: 'gh',
    name: 'Ghana',
    code: 'GH',
    region: 'West Africa',
    flag: '🇬🇭',
    capital: 'Accra',
    population: 33000000,
    gdp: 77000000000,
    legalSystem: 'Common Law (British-influenced)',
    constitution: {
      year: 1992,
      url: 'https://www.judicial.gov.gh/constitution',
    },
    summary:
      'Ghana has a stable democratic system with a constitution that protects fundamental human rights and freedoms.',
    slug: 'ghana',
    featured: true,
  },
  {
    id: 'et',
    name: 'Ethiopia',
    code: 'ET',
    region: 'East Africa',
    flag: '🇪🇹',
    capital: 'Addis Ababa',
    population: 123000000,
    gdp: 127000000000,
    legalSystem: 'Civil Law',
    constitution: {
      year: 1995,
      url: 'https://www.constituteproject.org/constitution/Ethiopia_1994',
    },
    summary:
      'Ethiopia has a federal system with regional states that have significant autonomy under the 1995 constitution.',
    slug: 'ethiopia',
    featured: false,
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return sampleCountries.find((country) => country.slug === slug);
}

export function getCountryByCode(code: string): Country | undefined {
  return sampleCountries.find((country) => country.code === code);
}

export function getFeaturedCountries(): Country[] {
  return sampleCountries.filter((country) => country.featured);
}

export function getCountriesByRegion(region: string): Country[] {
  return sampleCountries.filter((country) => country.region === region);
}
