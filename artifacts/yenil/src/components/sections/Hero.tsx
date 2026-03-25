import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
          alt="Luxury background" 
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        <div className="absolute inset-0 bg-mesh opacity-40 animate-gradient-x" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold-light text-sm font-medium backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {t('hero.headline_1')} <br className="hidden sm:block" />
          <span className="text-gradient-gold italic pr-2">{t('hero.headline_2')}</span>
        </motion.h1>

        <motion.p 
          className="max-w-2xl text-lg sm:text-xl text-muted-foreground mb-10 font-medium leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {t('hero.subheadline')}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.1, type: "spring" }}
        >
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-bold text-lg shadow-[0_0_40px_-10px_rgba(45,158,92,0.5)] hover:shadow-[0_0_60px_-10px_rgba(212,168,67,0.4)] border border-transparent hover:border-gold/50 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            {t('hero.cta_primary')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#services" 
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all duration-300"
          >
            {t('hero.cta_secondary')}
          </a>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm sm:text-base font-medium text-white/70"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <span className="flex items-center gap-2">✦ {t('hero.stats.projects')}</span>
          <span className="flex items-center gap-2">✦ {t('hero.stats.support')}</span>
          <span className="hidden sm:flex items-center gap-2">✦ {t('hero.stats.languages')}</span>
          <span className="hidden md:flex items-center gap-2">✦ {t('hero.stats.guarantee')}</span>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>

      {/* Decorative wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
