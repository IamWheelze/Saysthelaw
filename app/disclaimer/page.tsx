import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Disclaimer | Saysthelaw',
  description: 'Important legal disclaimers and terms of use for Saysthelaw.',
  keywords: ['disclaimer', 'legal notice', 'terms of use'],
});

export default function DisclaimerPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Disclaimer</h1>

        <div className="prose prose-lg max-w-none">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">Important Notice</h2>
            <p className="text-gray-700">
              Please read this disclaimer carefully before using Saysthelaw.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Educational Content Only
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Saysthelaw provides educational and informational content about laws,
              legal systems, and legal concepts. <strong>Nothing on this website
              constitutes legal advice.</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mt-2">
              The content is intended to help you understand legal topics in
              general terms. It is not tailored to your specific circumstances and
              should not be relied upon as legal advice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. No Attorney-Client Relationship
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Using this website does not create an attorney-client relationship
              between you and Saysthelaw or any of its contributors. We are not
              your lawyers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Consult a Qualified Lawyer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have a legal problem or question, you should always consult a
              qualified lawyer who is licensed to practice in your jurisdiction.
              Legal matters can be complex and fact-specific.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Accuracy and Updates
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We strive to provide accurate and up-to-date information. However:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>Laws change frequently</li>
              <li>Legal interpretations vary</li>
              <li>Errors may occur</li>
              <li>Content may become outdated</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              We cannot guarantee that all information is current, complete, or
              error-free.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. No Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Saysthelaw and its contributors are not liable for any damages or
              losses arising from your use of this website or reliance on its
              content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Jurisdiction Variations
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Laws vary by country, region, and jurisdiction. Information about one
              country's laws may not apply to another. Always verify information
              with local legal sources.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. External Links
            </h2>
            <p className="text-gray-700 leading-relaxed">
              This website may contain links to external websites. We are not
              responsible for the content, accuracy, or practices of external sites.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. User Responsibility
            </h2>
            <p className="text-gray-700 leading-relaxed">
              By using this website, you acknowledge that:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
              <li>You have read and understood this disclaimer</li>
              <li>You will not rely on this content as legal advice</li>
              <li>You will consult a lawyer for legal matters</li>
              <li>You use this website at your own risk</li>
            </ul>
          </section>

          <div className="bg-primary-50 border-l-4 border-primary-600 p-6 mt-8">
            <h3 className="text-lg font-semibold mb-2">Questions?</h3>
            <p className="text-gray-700">
              If you have questions about this disclaimer, please contact us at
              hello@saysthelaw.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
