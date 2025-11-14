import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateMetadata as generateSEO } from '@/lib/seo/metadata';
import { getCountryBySlug, sampleCountries } from '@/data/countries/sample-countries';
import { getLawsByCountry } from '@/data/laws/sample-laws';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import SocialShare from '@/components/social/SocialShare';
import EmailSignup from '@/components/forms/EmailSignup';
import Comments from '@/components/social/Comments';

interface CountryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CountryPageProps): Promise<Metadata> {
  const country = getCountryBySlug(params.slug);

  if (!country) {
    return {};
  }

  return generateSEO({
    title: `${country.name} Legal System & Laws | Saysthelaw`,
    description: `Complete guide to ${country.name}'s legal system, constitution, key laws, and citizen rights. ${country.summary}`,
    keywords: [`${country.name} law`, `${country.name} constitution`, 'legal system', 'citizen rights', 'African law'],
  });
}

export async function generateStaticParams() {
  return sampleCountries.map((country) => ({
    slug: country.slug,
  }));
}

export default function CountryPage({ params }: CountryPageProps) {
  const country = getCountryBySlug(params.slug);

  if (!country) {
    notFound();
  }

  const laws = getLawsByCountry(country.code);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <Badge variant="default" className="bg-white/20 text-white mb-2">
                {country.region}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">{country.name}</h1>
            </div>
          </div>
          <p className="text-xl text-primary-100 max-w-3xl">
            {country.summary}
          </p>

          {/* Social Share */}
          <div className="mt-6">
            <SocialShare
              title={`${country.name} Legal System | Saysthelaw`}
              description={country.summary}
            />
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="bg-white py-8 border-b">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-sm text-gray-500 mb-1">Capital</div>
              <div className="font-semibold text-gray-900">{country.capital}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Population</div>
              <div className="font-semibold text-gray-900">
                {(country.population / 1000000).toFixed(1)}M
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Legal System</div>
              <div className="font-semibold text-gray-900">{country.legalSystem}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Constitution</div>
              <div className="font-semibold text-gray-900">
                {country.constitution.year}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Legal System Overview */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Legal System Overview</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {country.name} operates under a {country.legalSystem} legal system.
                  The current constitution was adopted in {country.constitution.year}.
                </p>
                {country.constitution.url && (
                  <a
                    href={country.constitution.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    View Full Constitution →
                  </a>
                )}
              </div>

              {/* Key Laws */}
              {laws.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-6">Key Laws & Rights</h2>
                  <div className="space-y-6">
                    {laws.map((law) => (
                      <div key={law.id} className="border-l-4 border-primary-600 pl-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {law.title}
                          </h3>
                          <Badge variant="primary">{law.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">
                          Enacted: {law.yearEnacted}
                          {law.yearAmended && ` | Amended: ${law.yearAmended}`}
                        </p>
                        <p className="text-gray-700 mb-3">{law.summary}</p>
                        <div className="bg-gray-50 rounded p-3 mb-3">
                          <h4 className="text-sm font-semibold mb-2">Key Provisions:</h4>
                          <ul className="text-sm text-gray-700 space-y-1">
                            {law.keyProvisions.slice(0, 3).map((provision, idx) => (
                              <li key={idx}>• {provision}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-yellow-50 rounded p-3">
                          <h4 className="text-sm font-semibold mb-1">Real-World Impact:</h4>
                          <p className="text-sm text-gray-700">{law.realWorldImpact}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* What Citizens Should Know */}
              <div className="bg-primary-50 rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-4">What Citizens Should Know</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <p className="text-gray-700">
                      You have the right to access your constitution and laws
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <p className="text-gray-700">
                      Understanding your rights empowers you to demand accountability
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <p className="text-gray-700">
                      Laws on paper don't always match reality - stay informed
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Discussion</h2>
                <Comments pageId={`country-${country.slug}`} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Email Signup */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified when we publish new content about {country.name}.
                </p>
                <EmailSignup source={`country-${country.slug}`} />
              </div>

              {/* Related Topics */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Explore Topics</h3>
                <div className="space-y-2">
                  {['Human Rights', 'Police & Security', 'Courts & Justice', 'Labour & Employment'].map((topic) => (
                    <a
                      key={topic}
                      href={`/topics/${topic.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                      className="block text-primary-600 hover:text-primary-700 text-sm"
                    >
                      {topic} →
                    </a>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <div className="space-y-3 text-sm">
                  {country.constitution.url && (
                    <a
                      href={country.constitution.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-gray-700 hover:text-primary-600"
                    >
                      📜 Full Constitution
                    </a>
                  )}
                  <a href="#" className="block text-gray-700 hover:text-primary-600">
                    ⚖️ Court System
                  </a>
                  <a href="#" className="block text-gray-700 hover:text-primary-600">
                    📊 Legal Statistics
                  </a>
                  <a href="#" className="block text-gray-700 hover:text-primary-600">
                    📰 Recent News
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
