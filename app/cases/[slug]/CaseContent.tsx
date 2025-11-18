'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { CaseReview } from '@/types';
import { getCaseReviewBySlug, initializeSampleData } from '@/lib/services/dataService';
import Badge from '@/components/ui/Badge';
import SocialShare from '@/components/social/SocialShare';
import Comments from '@/components/social/Comments';
import EmailSignup from '@/components/forms/EmailSignup';
import { formatDate } from '@/lib/utils/helpers';

interface CasePageProps {
  params: {
    slug: string;
  };
}

export default function CasePage({ params }: CasePageProps) {
  const [caseReview, setCaseReview] = useState<CaseReview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeSampleData();
    const found = getCaseReviewBySlug(params.slug);
    if (found) {
      setCaseReview(found);
    }
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!caseReview) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Badge variant="default" className="bg-white/20 text-white mb-4">
              {caseReview.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {caseReview.title}
            </h1>
            <div className="flex items-center gap-4 text-primary-100 mb-6">
              <span>{formatDate(caseReview.date)}</span>
              <span>•</span>
              <span>{caseReview.country}</span>
            </div>
            <SocialShare
              title={caseReview.title}
              description={caseReview.summary}
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Summary */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">
                  Summary
                </h2>
                <p className="text-blue-800">{caseReview.summary}</p>
              </div>

              {/* What Happened */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">What Happened</h2>
                <p className="text-gray-700 leading-relaxed">
                  {caseReview.whatHappened}
                </p>
              </div>

              {/* Laws Applied */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Laws Applied</h2>
                <ul className="space-y-2">
                  {caseReview.lawsApplied.map((law, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2">⚖️</span>
                      <span className="text-gray-700">{law}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Violations */}
              {caseReview.violations && caseReview.violations.length > 0 && (
                <div className="bg-red-50 border-l-4 border-red-500 p-6">
                  <h2 className="text-lg font-semibold text-red-900 mb-3">
                    Violations Identified
                  </h2>
                  <ul className="space-y-2">
                    {caseReview.violations.map((violation, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        <span className="text-red-800">{violation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Consequences */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Consequences & Outcome</h2>
                <p className="text-gray-700 leading-relaxed">
                  {caseReview.consequences}
                </p>
              </div>

              {/* Comparison */}
              {caseReview.comparison && (
                <div className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-bold mb-4">International Comparison</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {caseReview.comparison}
                  </p>
                </div>
              )}

              {/* Sources */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-4">Sources</h2>
                <ul className="space-y-2">
                  {caseReview.sources.map((source, index) => (
                    <li key={index} className="text-gray-700">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:text-primary-700"
                        >
                          {source.name} →
                        </a>
                      ) : (
                        <span>{source.name}</span>
                      )}
                      {source.date && (
                        <span className="text-sm text-gray-500 ml-2">
                          ({source.date})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Comments */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Discussion</h2>
                <Comments pageId={`case-${caseReview.slug}`} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Email Signup */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3">Get Case Updates</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Be notified when new case reviews are published.
                </p>
                <EmailSignup source="case-reviews" />
              </div>

              {/* Quick Facts */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Facts</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="text-gray-600 ml-2">
                      {formatDate(caseReview.date)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Country:</span>
                    <span className="text-gray-600 ml-2">
                      {caseReview.country}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="text-gray-600 ml-2">
                      {caseReview.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
