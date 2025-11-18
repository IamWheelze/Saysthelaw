'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CaseReview } from '@/types';
import { getAllCaseReviews, initializeSampleData } from '@/lib/services/dataService';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/helpers';

export default function CasesPage() {
  const [cases, setCases] = useState<CaseReview[]>([]);

  useEffect(() => {
    initializeSampleData();
    setCases(getAllCaseReviews());
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Case Reviews</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            Real-world cases that show how laws work in practice. Learn from actual events,
            court decisions, and their consequences.
          </p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-12">
        <div className="container-custom">
          {cases.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Case Reviews Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Case reviews are coming soon. Check back later for in-depth analysis of real legal cases.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cases.map((caseReview) => (
                <Link
                  key={caseReview.id}
                  href={`/cases/${caseReview.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-1">
                      <Badge variant="primary" className="mb-2">
                        {caseReview.category}
                      </Badge>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {caseReview.title}
                      </h2>
                    </div>
                    <div className="text-3xl">
                      {caseReview.country === 'KE' ? '🇰🇪' :
                       caseReview.country === 'NG' ? '🇳🇬' :
                       caseReview.country === 'ZA' ? '🇿🇦' :
                       caseReview.country === 'GH' ? '🇬🇭' : '⚖️'}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {caseReview.summary}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {formatDate(caseReview.date)}
                    </span>
                    <span className="text-primary-600 font-medium">
                      Read case review →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
