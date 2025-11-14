import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import Card from '@/components/ui/Card';

export const metadata: Metadata = generateMetadata({
  title: 'Legal Topics | Saysthelaw',
  description: 'Explore law by topic: Human Rights, Police, Courts, Labour, Elections, Women & Children, and more.',
  keywords: ['legal topics', 'human rights', 'police law', 'courts', 'labour law', 'elections'],
});

const topics = [
  {
    title: 'Human Rights',
    description: 'Freedom of speech, assembly, fair trial, and fundamental rights.',
    href: '/topics/human-rights',
    icon: '✊',
  },
  {
    title: 'Police & Security',
    description: 'Police powers, arrest procedures, detention rights, and accountability.',
    href: '/topics/police-security',
    icon: '👮',
  },
  {
    title: 'Courts & Justice',
    description: 'Court systems, legal procedures, access to justice, and judicial independence.',
    href: '/topics/courts-justice',
    icon: '⚖️',
  },
  {
    title: 'Labour & Employment',
    description: 'Worker rights, employment contracts, workplace safety, and labour disputes.',
    href: '/topics/labour-employment',
    icon: '💼',
  },
  {
    title: 'Elections & Democracy',
    description: 'Electoral laws, voting rights, political participation, and democratic processes.',
    href: '/topics/elections-democracy',
    icon: '🗳️',
  },
  {
    title: 'Women & Children',
    description: 'Gender equality, child rights, protection laws, and family law.',
    href: '/topics/women-children',
    icon: '👨‍👩‍👧‍👦',
  },
];

export default function TopicsPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Legal Topics</h1>
        <p className="text-xl text-gray-600 mb-12">
          Explore law by theme. Each topic covers laws across multiple countries
          with real-world examples and data.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <div
              key={topic.href}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
            >
              <div className="text-4xl mb-4">{topic.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
              <p className="text-gray-600 mb-4">{topic.description}</p>
              <a
                href={topic.href}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Explore →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
