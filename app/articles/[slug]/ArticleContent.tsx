'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Article } from '@/types';
import { getArticleBySlug, getRecentArticles, getAllArticles, initializeSampleData } from '@/lib/services/dataService';
import Badge from '@/components/ui/Badge';
import SocialShare from '@/components/social/SocialShare';
import Comments from '@/components/social/Comments';
import EmailSignup from '@/components/forms/EmailSignup';
import { formatDate } from '@/lib/utils/helpers';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [article, setArticle] = useState<Article | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize sample data if needed
    initializeSampleData();

    // Load article
    const foundArticle = getArticleBySlug(params.slug);
    if (foundArticle) {
      setArticle(foundArticle);
      setRecentArticles(getRecentArticles(3).filter(a => a.id !== foundArticle.id));
    }
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!article) {
    notFound();
  }

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Badge variant="default" className="bg-white/20 text-white mb-4">
              {article.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {article.title}
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              {article.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-primary-100">
              <span>By {article.author}</span>
              <span>•</span>
              <span>{formatDate(article.publishedDate)}</span>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
            <div className="mt-6">
              <SocialShare
                title={article.title}
                description={article.description}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-8 mb-8">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: article.content.replace(/\n/g, '<br />'),
                  }}
                />
              </div>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold mb-6">Discussion</h2>
                <Comments pageId={`article-${article.slug}`} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Email Signup */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get notified about new articles on {article.category}.
                </p>
                <EmailSignup source={`article-${article.category}`} />
              </div>

              {/* Recent Articles */}
              {recentArticles.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4">Recent Articles</h3>
                  <div className="space-y-4">
                    {recentArticles.map((recentArticle) => (
                      <Link
                        key={recentArticle.id}
                        href={`/articles/${recentArticle.slug}`}
                        className="block group"
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                          {recentArticle.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {formatDate(recentArticle.publishedDate)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Topics */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Explore Topics</h3>
                <div className="space-y-2">
                  {['Human Rights', 'Police & Security', 'Courts & Justice', 'Labour & Employment'].map((topic) => (
                    <Link
                      key={topic}
                      href={`/topics/${topic.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                      className="block text-primary-600 hover:text-primary-700 text-sm"
                    >
                      {topic} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
