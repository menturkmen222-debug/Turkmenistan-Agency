import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}

export function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();
  const lastScrollY = useRef(0);

  const languages = [
    { code: 'tk', label: 'Türkmen', flag: '🇹🇲' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'uz', label: 'O\'zbek', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 20);
      // Close mobile menu when scrolling down
      if (currentY > lastScrollY.current + 8 && currentY > 80) {
        setIsMobileMenuOpen(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsMobileMenuOpen]);

  // Close lang menu when clicking outside
  useEffect(() => {
    if (!isLangMenuOpen) return;
    const handler = () => setIsLangMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [isLangMenuOpen]);

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#how-it-works', label: t('nav.how') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'glass-header py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo — only visible when at top, hidden when scrolled */}
          <a href="#" className="flex items-center group">
            <AnimatePresence initial={false}>
              {!isScrolled && !isMobileMenuOpen && (
                <motion.img
                  key="logo"
                  src={`${import.meta.env.BASE_URL}images/yenil-mark-new.png`}
                  alt="Ýeňil Logo"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="h-12 md:h-14 w-auto"
                />
              )}
            </AnimatePresence>
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
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <div className="relative" onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setIsLangMenuOpen(v => !v)}
                className="flex items-center gap-2 text-sm text-white/80 hover:text-white px-2 py-1 rounded-md transition-colors"
              >
                <span>{languages.find(l => l.code === locale)?.flag}</span>
                <span className="uppercase">{locale}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
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

          {/* Mobile Toggle — always visible, just the icon */}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            aria-label={isMobileMenuOpen ? 'Menyuny yap' : 'Menyuny och'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Dropdown — compact panel below the header bar, no full-screen overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="px-4 py-6 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-semibold text-white/90 hover:text-gold py-3 px-2 rounded-lg hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  {/* Language picker */}
                  <div className="flex items-center gap-2">
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLocale(lang.code as any); setIsMobileMenuOpen(false); }}
                        className={`text-xl p-1.5 rounded-full border transition-all ${
                          locale === lang.code
                            ? 'border-gold bg-gold/10 opacity-100'
                            : 'border-transparent opacity-40 hover:opacity-70'
                        }`}
                      >
                        {lang.flag}
                      </button>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-primary to-primary-light text-white border border-gold/30"
                  >
                    {t('nav.cta')}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
