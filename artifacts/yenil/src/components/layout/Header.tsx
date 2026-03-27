import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (v: boolean) => void;
}

export function Header({ isMobileMenuOpen, setIsMobileMenuOpen }: HeaderProps) {
  const { t, locale, setLocale } = useTranslation();
  const lastScrollY = useRef(0);

  const languages = [
    { code: 'tk', label: 'Türkmen', flag: '🇹🇲' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'uz', label: "O'zbek", flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const navLinks = [
    { href: '#home', label: t('nav.home') },
    { href: '#services', label: t('nav.services') },
    { href: '#how-it-works', label: t('nav.how') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#contact', label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current + 8 && currentY > 80) {
        setIsMobileMenuOpen(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [setIsMobileMenuOpen]);

  return (
    /*
     * The outer element spans the full viewport width but must NOT intercept
     * pointer events in the empty transparent regions — only the concrete
     * children (bar strip and dropdown panel) should be interactive.
     */
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">

      {/* ── Top bar: logo · lang flags · hamburger ─────────────────────── */}
      <div className="pointer-events-auto flex items-center justify-between px-5 py-4 md:px-10">

        {/* Logo */}
        <a href="#home" className="flex-shrink-0">
          <img
            src={`${import.meta.env.BASE_URL}images/yenil-mark-new.png`}
            alt="Ýeňil Logo"
            className="h-12 md:h-14 w-auto"
          />
        </a>

        {/* Right side: language flags + hamburger */}
        <div className="flex items-center gap-2">

          {/* Language flags — always visible */}
          <div className="flex items-center gap-0.5">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code as any)}
                title={lang.label}
                className={`text-lg md:text-xl px-1 py-1 rounded-full border transition-all duration-150 ${
                  locale === lang.code
                    ? 'border-gold bg-gold/15 opacity-100 scale-110'
                    : 'border-transparent opacity-40 hover:opacity-80'
                }`}
              >
                {lang.flag}
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menyu"
            className="w-10 h-10 flex items-center justify-center rounded-xl text-white hover:bg-white/10 transition-colors ml-1"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Dropdown panel ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="pointer-events-auto mx-4 md:mx-10 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10, 26, 15, 0.93)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.55)',
            }}
          >
            {/* Nav links */}
            <div className="px-6 py-5 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.18 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-white/85 hover:text-gold py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA button */}
            <div className="px-6 pb-5">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-primary to-primary-light text-white border border-gold/30 hover:scale-[1.02] transition-transform"
              >
                {t('nav.cta')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
