import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            The Law in Real Life
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            African and global laws explained clearly, simply, and with evidence.
          </p>
          <p className="text-lg text-gray-700 mb-10 max-w-2xl mx-auto">
            Understanding your rights shouldn't require a law degree. We break down
            complex legal systems into plain language, backed by real cases and data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/countries">
              <Button size="lg">Explore Countries</Button>
            </Link>
            <Link href="/topics">
              <Button variant="outline" size="lg">
                Browse Topics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
