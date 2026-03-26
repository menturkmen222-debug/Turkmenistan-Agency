import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  const languages = [
    { code: 'tk', label: 'Türkmen', flag: '🇹🇲' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#how-it-works', label: t('nav.how') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-header py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center group">
          <img 
            src={`${import.meta.env.BASE_URL}images/yenil-logo.png`} 
            alt="Ýeňil Logo" 
            className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
            style={{ filter: 'hue-rotate(-70deg) saturate(2) brightness(1.8)' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-white px-2 py-1 rounded-md transition-colors"
            >
              <span>{languages.find(l => l.code === locale)?.flag}</span>
              <span className="uppercase">{locale}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full right-0 mt-2 w-40 glass-card rounded-xl shadow-xl overflow-hidden py-2"
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLocale(lang.code as any); setIsLangMenuOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${
                        locale === lang.code ? 'text-gold font-medium' : 'text-white/80'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <a 
            href="#contact"
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 border border-gold/30"
          >
            {t('nav.cta')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col"
          >
            <div className="p-5 flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-20">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-3xl text-white hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 mt-8"
              >
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code as any); setIsMobileMenuOpen(false); }}
                    className={`text-2xl p-2 rounded-full border ${locale === lang.code ? 'border-gold bg-gold/10' : 'border-transparent opacity-50'}`}
                  >
                    {lang.flag}
                  </button>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
