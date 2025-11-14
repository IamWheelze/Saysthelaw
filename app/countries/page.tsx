import { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo/metadata';
import { sampleCountries, getCountriesByRegion } from '@/data/countries/sample-countries';
import { groupBy } from '@/lib/utils/helpers';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export const metadata: Metadata = generateMetadata({
  title: 'African Countries | Saysthelaw',
  description: 'Explore legal systems across Africa. Understand constitutions, laws, and rights in every African country.',
  keywords: ['African law', 'countries', 'legal systems', 'constitutions', 'human rights'],
});

export default function CountriesPage() {
  const groupedCountries = groupBy(sampleCountries, 'region');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Countries</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Explore legal systems, constitutions, and rights across African countries.
            Click on any country to learn about their laws, recent cases, and what citizens should know.
          </p>
        </div>
      </section>

      {/* Country Listings */}
      <section className="py-12">
        <div className="container-custom">
          {Object.entries(groupedCountries).map(([region, countries]) => (
            <div key={region} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{region}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {countries.map((country) => (
                  <Link
                    key={country.id}
                    href={`/countries/${country.slug}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-4xl">{country.flag}</span>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {country.name}
                          </h3>
                          <p className="text-sm text-gray-500">{country.capital}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {country.summary}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Constitution: {country.constitution.year}
                        </div>
                        {country.featured && (
                          <Badge variant="primary" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-primary-600 font-medium">
                          View legal profile →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Coming Soon */}
          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-8">
            <h3 className="text-lg font-semibold mb-2">More Countries Coming Soon</h3>
            <p className="text-gray-700">
              We're building comprehensive profiles for all 54 African countries.
              Each profile will include:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Constitutional overview and key provisions</li>
              <li>Fundamental rights and freedoms</li>
              <li>Major laws and their real-world impact</li>
              <li>Recent court cases and precedents</li>
              <li>Statistics, data, and comparisons</li>
              <li>Common legal issues and reforms</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Want to see a specific country? Contact us at hello@saysthelaw.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
