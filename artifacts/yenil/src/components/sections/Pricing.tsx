import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Taslamanyňyz üçin dogry paket saýlaň
          </h2>
          <p className="text-muted text-lg">
            Ähli bahalara goşmaça 19% KDV goşulmaýar. Bahaňyz TMT-de hem hasaplanylyp biler (1$ = 19 TMT).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center">
          
          {/* Card 1: START */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl relative"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-6">
              ⚡ Başlangyç
            </div>
            <div className="mb-6">
              <span className="text-4xl font-mono font-bold text-gold">$150</span>
              <span className="text-muted text-sm ml-2">~dan başlaýar</span>
              <p className="text-muted text-sm mt-1">2 850 TMT~dan</p>
            </div>
            <p className="text-white font-medium mb-8 pb-8 border-b border-border">
              Kiçi kärhanalar we hususy telekeçiler üçin.
            </p>
            <ul className="space-y-4 mb-8">
              {['1 sahypa Landing Page', 'Mobil laýyk dizaýn', 'Öňünden taýýar tema', 'Gysgaça SEO', '1 aý tehniki goldaw'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <Check className="w-5 h-5 text-primary-light flex-shrink-0" /> <span>{f}</span>
                </li>
              ))}
              {['Köp sahypa', 'Ýörite animasiýalar'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-muted">
                  <X className="w-5 h-5 text-muted/50 flex-shrink-0" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="block w-full py-4 rounded-xl border border-white/20 text-white text-center font-bold hover:bg-white/10 transition-colors">
              Bu paketi saýlaň
            </a>
          </motion.div>

          {/* Card 2: PRO (Highlighted) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-surface-2 border border-gold/50 p-8 md:p-10 rounded-3xl relative shadow-[0_0_50px_-15px_rgba(212,168,67,0.3)] md:scale-105 z-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold to-gold-light text-black font-bold px-4 py-1 rounded-full text-sm shadow-lg">
              🏆 Maslahat berilýär
            </div>
            
            <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-bold mb-6 mt-2">
              ÝEŇIL PRO
            </div>
            <div className="mb-6">
              <span className="text-5xl font-mono font-bold text-gold drop-shadow-md">$800</span>
              <span className="text-muted text-sm ml-2">~dan başlaýar</span>
              <p className="text-primary-light text-sm mt-1 font-medium">15 200 TMT~dan</p>
            </div>
            <p className="text-white font-medium mb-8 pb-8 border-b border-white/10">
              Orta we iri kärhanalar üçin doly sanly çözgüt.
            </p>
            <ul className="space-y-4 mb-8">
              {[
                '5-10 sahypa doly saýt', 
                'Özboluşly premium dizaýn', 
                'Animasiýa we interaktiw elementler', 
                'Doly SEO optimizasiýasy', 
                'AI Chat integrasiýasy',
                'CMS (Özüňiz üýtgedip bilersiňiz)',
                '3 aý tehniki goldaw'
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="block w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-center font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
              Bu paketi saýlaň
            </a>
          </motion.div>

          {/* Card 3: ENTERPRISE */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-3xl relative"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-6">
              💎 Premium
            </div>
            <div className="mb-6 h-[88px] flex flex-col justify-center">
              <span className="text-3xl font-mono font-bold text-white">Ylalaşyk esasynda</span>
            </div>
            <p className="text-white font-medium mb-8 pb-8 border-b border-border">
              Iri kärhanalar, Platformalar, Portallar.
            </p>
            <ul className="space-y-4 mb-8">
              {['Çäksiz sahypalar', 'E-commerce we töleg', 'Özboluşly applikasiýa', 'API integrasiýalary', 'Köp dilli (5 dil)', '24/7 tehniki goldaw'].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <Check className="w-5 h-5 text-primary-light flex-shrink-0" /> <span>{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="block w-full py-4 rounded-xl border border-white/20 text-white text-center font-bold hover:bg-white/10 transition-colors">
              Biz bilen habarlaşyň
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
