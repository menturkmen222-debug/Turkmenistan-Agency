import { useEffect } from 'react';
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

  // Basic intersection observer to track section views
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
      <Header />
      
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
      <AIChatWidget />
    </div>
  );
}
