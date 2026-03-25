import { Send } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.82a8.16 8.16 0 004.77 1.52V6.89a4.85 4.85 0 01-1-.2z" />
    </svg>
  );
}

function ImoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 12c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" fillOpacity="0.4" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-surface-2 to-background border-t border-gold/20 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Brand */}
          <div className="flex flex-col items-start">
            <a href="#" className="flex items-center gap-2 mb-4">
              <img src={`${import.meta.env.BASE_URL}images/logo-mark.png`} alt="Logo" className="w-10 h-10 object-contain" />
              <span className="font-display font-bold text-3xl text-white">Ýeňil<span className="text-gold">.</span></span>
            </a>
            <p className="text-muted max-w-sm mb-6 font-medium">
              Sanly dünýäde ýeňil ädim. Biz biznesiňizi ösdürmek üçin innowasiýa we dizaýny birleşdirýäris.
            </p>
            <div className="flex gap-3">
              <a
                href="https://t.me/yenil_ru"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram: @yenil_ru"
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@yenil.ru"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok: @yenil.ru"
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://s.imoim.net/DNCXX6"
                target="_blank"
                rel="noopener noreferrer"
                title="IMO: @yenil.ru"
                className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"
              >
                <ImoIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold mb-2 uppercase tracking-wider text-sm">Menýu</h4>
            <a href="#home" className="text-muted hover:text-white transition-colors">{t('nav.home')}</a>
            <a href="#services" className="text-muted hover:text-white transition-colors">{t('nav.services')}</a>
            <a href="#how-it-works" className="text-muted hover:text-white transition-colors">{t('nav.how')}</a>
            <a href="#pricing" className="text-muted hover:text-white transition-colors">{t('nav.pricing')}</a>
            <a href="#contact" className="text-muted hover:text-white transition-colors">{t('nav.contact')}</a>
          </div>

          {/* Contact */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-white font-bold mb-2 uppercase tracking-wider text-sm">Habarlaşyň</h4>
            <a href="tel:+99371789091" className="text-gold font-mono text-lg hover:text-gold-light transition-colors">
              +993 71 78-90-91
            </a>
            <a href="mailto:yenil.ru.tkm@gmail.com" className="text-muted hover:text-white transition-colors">
              yenil.ru.tkm@gmail.com
            </a>
            <p className="text-muted">Aşgabat, Türkmenistan</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted/60 text-sm">© {new Date().getFullYear()} Ýeňil. Ähli hukuklar goragly.</p>
          <div className="flex gap-6 text-sm text-muted/60">
            <a href="#" className="hover:text-white transition-colors">Gizlinlik syýasaty</a>
            <a href="#" className="hover:text-white transition-colors">Şertler we Düzgünler</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
