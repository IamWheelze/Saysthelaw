import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Learning About Your Rights
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands discovering how the law works in real life. No legal
            jargon. Just clear, evidence-based explanations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/countries">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-gray-100"
              >
                Browse Countries
              </Button>
            </Link>
            <Link href="/explainers">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-primary-500"
              >
                Read Explainers
              </Button>
            </Link>
          </div>

          <div className="mt-12 pt-12 border-t border-primary-500">
            <p className="text-sm text-primary-100">
              <strong>Important:</strong> Saysthelaw provides educational content
              only. This is not legal advice. Always consult a qualified lawyer for
              specific legal matters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
