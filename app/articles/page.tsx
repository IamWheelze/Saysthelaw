'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import { getAllArticles } from '@/lib/services/dataService';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils/helpers';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const allArticles = getAllArticles();
    setArticles(allArticles);
  }, []);

  const categories = [
    'all',
    'Human Rights',
    'Police & Security',
    'Courts & Justice',
    'Labour & Employment',
    'Elections & Democracy',
    'Women & Children',
  ];

  const filteredArticles = filter === 'all'
    ? articles
    : articles.filter(article => article.category === filter);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles & Analysis</h1>
          <p className="text-xl text-primary-100 max-w-3xl">
            In-depth articles explaining laws, rights, and legal issues across Africa.
            Written in clear language with real-world examples.
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white border-b py-6">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Articles' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container-custom">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Articles Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Be the first to create content! Go to the admin dashboard to write your first article.
              </p>
              <Link
                href="/admin"
                className="inline-block btn-primary"
              >
                Go to Admin Dashboard
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
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
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(article.publishedDate)}</span>
                      <span>{article.readTime} min read</span>
                    </div>
                    <div className="mt-4 text-primary-600 font-medium">
                      Read article →
                    </div>
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
