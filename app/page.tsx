import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import FeaturedArticles from '@/components/sections/FeaturedArticles';
import Stats from '@/components/sections/Stats';
import CTA from '@/components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FeaturedArticles />
      <Stats />
      <CTA />
    </>
  );
}
