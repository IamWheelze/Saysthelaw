import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'African Countries | Saysthelaw',
  description: 'Explore legal systems across Africa. Understand constitutions, laws, and rights in every African country.',
  keywords: ['African law', 'countries', 'legal systems', 'constitutions', 'human rights'],
});

export default function CountriesPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Countries</h1>
        <p className="text-xl text-gray-600 mb-8">
          Explore legal systems, constitutions, and rights across African countries.
        </p>

        <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mb-8">
          <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
          <p className="text-gray-700">
            We're building comprehensive profiles for all 54 African countries.
            Each profile will include:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
            <li>Constitutional overview</li>
            <li>Key laws and rights</li>
            <li>Real-world case studies</li>
            <li>Statistics and data</li>
            <li>Common legal issues</li>
            <li>Recent reforms</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
