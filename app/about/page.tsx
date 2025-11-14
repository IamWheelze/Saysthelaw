import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'About Saysthelaw | Our Mission',
  description: 'Learn about Saysthelaw - making African and global laws accessible through clear explanations and evidence.',
  keywords: ['about', 'mission', 'legal education', 'transparency', 'accessibility'],
});

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Saysthelaw</h1>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Saysthelaw exists to make the law accessible to everyone. We believe
              that understanding your rights shouldn't require a law degree or
              expensive legal advice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We explain African and global laws in clear, simple language —
              backed by real cases, data, and evidence. No jargon. No assumptions.
              Just the truth about how law works in real life.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">📚</span>
                <span>Break down complex legal systems into plain language</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">⚖️</span>
                <span>Analyze real cases to show how laws work in practice</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📊</span>
                <span>Provide data and statistics to support understanding</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🌍</span>
                <span>Cover legal systems across Africa and beyond</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🔄</span>
                <span>Track legal reforms and developments</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Principles</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Clarity</h3>
                <p className="text-gray-700">
                  We explain complex legal concepts in simple, accessible language.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">2. Evidence</h3>
                <p className="text-gray-700">
                  Every claim is backed by verifiable sources, real cases, and data.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">3. Neutrality</h3>
                <p className="text-gray-700">
                  We present facts objectively, without political bias.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">4. Education</h3>
                <p className="text-gray-700">
                  Our goal is to inform, not to provide legal advice.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-yellow-50 border-l-4 border-yellow-400 p-6">
            <h3 className="text-lg font-semibold mb-2">Important Disclaimer</h3>
            <p className="text-gray-700">
              Saysthelaw provides educational content only. Nothing on this site
              constitutes legal advice. Always consult a qualified lawyer for
              specific legal matters.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
