import CaseContent from './CaseContent';

interface CasePageProps {
  params: {
    slug: string;
  };
}

// Required for static export - provides sample case paths
export async function generateStaticParams() {
  return [
    { slug: 'blogger-arrested-government-criticism-kenya-2018' },
  ];
}

export default function CasePage({ params }: CasePageProps) {
  return <CaseContent params={params} />;
}
