import { Instagram, Send, Video, Youtube } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

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
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"><Send className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"><Video className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center text-muted hover:text-gold hover:border-gold transition-colors"><Youtube className="w-4 h-4" /></a>
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
            <a href="tel:+99365000000" className="text-gold font-mono text-lg hover:text-gold-light transition-colors">+993 65 XX-XX-XX</a>
            <a href="mailto:info@yenil.com.tm" className="text-muted hover:text-white transition-colors">info@yenil.com.tm</a>
            <p className="text-muted">Aşgabat, Türkmenistan<br/>Bitarap Türkmenistan şaýoly</p>
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
