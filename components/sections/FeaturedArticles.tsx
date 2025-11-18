'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { getFeaturedArticles, getRecentArticles, initializeSampleData } from '@/lib/services/dataService';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/helpers';

export default function FeaturedArticles() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);

  useEffect(() => {
    initializeSampleData();
    setFeaturedArticles(getFeaturedArticles(2));
    setRecentArticles(getRecentArticles(4));
  }, []);

  if (featuredArticles.length === 0 && recentArticles.length === 0) {
    return null;
  }

  const displayArticles = featuredArticles.length > 0 ? featuredArticles : recentArticles.slice(0, 2);

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Articles
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In-depth analysis and explanations of laws, rights, and legal issues across Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {displayArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="block bg-white rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              <div className="p-6">
                {article.featured && (
                  <Badge variant="primary" className="mb-2">
                    Featured
                  </Badge>
                )}
                <Badge variant="default" className="mb-3">
                  {article.category}
                </Badge>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>By {article.author}</span>
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
                <div className="mt-4 text-primary-600 font-medium">
                  Read full article →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/articles"
            className="inline-block btn-primary"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
