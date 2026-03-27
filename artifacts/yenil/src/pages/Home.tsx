import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { Services } from '@/components/sections/Services';
import { Stats } from '@/components/sections/Stats';
import { Showcase } from '@/components/sections/Showcase';
import { Pricing } from '@/components/sections/Pricing';
import { Contact } from '@/components/sections/Contact';
import { AIChatWidget } from '@/components/AIChatWidget';
import { CustomCursor } from '@/components/CustomCursor';
import { useAnalytics } from '@/hooks/use-analytics';

export default function Home() {
  const { trackEvent } = useAnalytics();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          trackEvent('section_view', { section: entry.target.id });
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('section[id]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [trackEvent]);

  return (
    <div className="relative selection:bg-gold selection:text-black">
      <CustomCursor />
      <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />

      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Stats />
        <Showcase />
        <Pricing />
        <Contact />
      </main>

      <Footer />
      <AIChatWidget isMobileMenuOpen={isMobileMenuOpen} />
    </div>
  );
}
