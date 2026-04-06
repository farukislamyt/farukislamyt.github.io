'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import CustomCursor from '@/components/portfolio/CustomCursor';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import Navbar from '@/components/portfolio/Navbar';
import Hero from '@/components/portfolio/Hero';
import ClientLogos from '@/components/portfolio/ClientLogos';
import About from '@/components/portfolio/About';
import Stack from '@/components/portfolio/Stack';
import Projects from '@/components/portfolio/Projects';
import FloatingButtons from '@/components/portfolio/FloatingButtons';
import CVModal from '@/components/portfolio/CVModal';
import SectionSkeleton from '@/components/portfolio/SectionSkeleton';

// Lazy-load below-fold sections for performance with loading skeletons
const Services = dynamic(() => import('@/components/portfolio/Services'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const Experience = dynamic(() => import('@/components/portfolio/Experience'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const CertificationsAndTestimonials = dynamic(() => import('@/components/portfolio/CertificationsAndTestimonials'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const GitHubSection = dynamic(() => import('@/components/portfolio/GitHubSection'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const Blog = dynamic(() => import('@/components/portfolio/Blog'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const Contact = dynamic(() => import('@/components/portfolio/Contact'), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});
const Footer = dynamic(() => import('@/components/portfolio/Footer'), {
  ssr: false,
  loading: () => (
    <footer className="py-12 border-t border-border" aria-hidden="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="skeleton-shimmer h-5 w-24 rounded" />
              <div className="skeleton-shimmer h-3 w-full rounded" />
              <div className="skeleton-shimmer h-3 w-3/4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  ),
});

export default function PortfolioClient() {
  const [showCV, setShowCV] = useState(false);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'bn' : 'en'));
  }, []);

  const openCV = useCallback(() => setShowCV(true), []);
  const closeCV = useCallback(() => setShowCV(false), []);

  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <Hero onShowCV={openCV} lang={lang} />

      {/* Language switcher */}
      <div className="fixed top-20 right-4 z-[9996]">
        <button
          onClick={toggleLang}
          className="p-2 rounded-lg glass-card text-xs font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
          aria-label="Switch language"
        >
          {lang === 'en' ? 'বাং' : 'EN'}
        </button>
      </div>

      <ClientLogos />
      <About />
      <Stack />
      <Projects />
      <Services />
      <Experience />
      <CertificationsAndTestimonials />
      <GitHubSection />
      <Blog />
      <Contact />
      <Footer />

      <FloatingButtons />
      <CVModal isOpen={showCV} onClose={closeCV} />
    </main>
  );
}
