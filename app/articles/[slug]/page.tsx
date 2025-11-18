import ArticleContent from './ArticleContent';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Required for static export - provides sample article paths
export async function generateStaticParams() {
  return [
    { slug: 'understanding-freedom-of-expression-kenya' },
    { slug: 'what-to-do-if-arrested-know-your-rights' },
  ];
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return <ArticleContent params={params} />;
}
