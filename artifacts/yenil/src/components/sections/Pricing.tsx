import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';

interface ModalProps {
  tier: 'starter' | 'pro' | null;
  onClose: () => void;
}

function PricingModal({ tier, onClose }: ModalProps) {
  if (!tier) return null;

  const content = tier === 'starter' ? {
    headline: "Hiliň Binýady",
    badge: "Başlangyç — $199",
    points: [
      { icon: "✅", text: "1-3 sahypa Premium Landing Page — ýokary hilli kod" },
      { icon: "✅", text: "Mobil ekrana doly maslaşan dizaýn (100% responsive)" },
      { icon: "✅", text: "Esasy SEO we ýokary tizlik — Google/Yandex üçin" },
      { icon: "✅", text: "Müşderi sargyt formasy — müşderiler siziň bilen göni habarlaşar" },
      { icon: "✅", text: "1 aý mugt tehniki goldaw" },
      { icon: "⚠️", text: "Domen we Hosting bu baha degişli däl (aýratyn tölenýär)" },
    ],
    note: "Domen we Hosting bu baha degişli däl.",
    elif: "Biz size dünýä derejesinde saýt gurup berýäris. Emma saýtyň internet ady (domen) we saklanýan ýeri (hosting) — bu sizin maýaňyz, ony öziňiz saýlap, aýratyn töleýärsiňiz.",
    vision: "Domen ady — markaňyzyň sanly dünýädäki ömürlik salgysydyr. Ol 3-10 ýyl üçin alynýar. Arzan domen hem ýok — ýöne gymmat hem däl, ortaça ýylda $10-15.",
    why: "Bu baha — dünýä derejesindäki kod we dizaýn üçin. Bazarda $30-50-a 'saýt' bar, ýöne ol saýt müşderi getirmeýär. Biz bolsa siziň üçin 24 sagat işleýän satuwçy gurýarys.",
  } : {
    headline: "Hemme Zat Taýýar — Açary Eline Al",
    badge: "PRO ONLAÝN DÜKAN — $599",
    points: [
      { icon: "✅", text: "5-10 sahypaly Premium E-Commerce (Onlaýn dükan)" },
      { icon: "✅", text: "CMS dolandyryş paneli — özüňiz aňsat üýtgedip bilersiňiz" },
      { icon: "✅", text: "AI Chatbot integrasiýasy — 24/7 awtomat satuw" },
      { icon: "✅", text: "Premium animasiýalar we interaktiw dizaýn" },
      { icon: "✅", text: "Doly SEO we Ýokary tizlik (99% Performance)" },
      { icon: "✅", text: "3 aý VIP tehniki goldaw" },
      { icon: "🎁", text: "3 ýyllyk MUGT domen — sowgat!" },
      { icon: "🎁", text: "Professional Logo dizaýny — sowgat!" },
      { icon: "✅", text: "Hosting we Google/Yandex indeksirleme — hemme zat içinde" },
    ],
    note: "Hiç hili goşmaça töleg ýok. Domen + Hosting + Logo = SOWGAT.",
    elif: "Size taýýar açary berlen biznes ulgamyny hödürleýäris. Bir gezek tölärsiňiz — hemme zat işe girýär. Domen, hosting, logo, AI — hemmesi goşulan.",
    vision: "Ilkinji günden satmaga taýýar. Siz diňe haryt we müşderileriňize üns beriň — galanyny biz edýäris.",
    why: "Bu diňe saýt däl — bu awtomatlaşdyrylan biznes ulgamy. AI chatbot gijäniň yarynda hem müşderi kabul edýär. Logo bilen professional görünşiňiz bolar. Domen bilen ömürlik salgyňyz bolar. $599 = $800 gymmatlygy + $201 tygşytlamak.",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-[#0e1a12]/95 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden"
        >
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold mb-3">{content.badge}</span>
            <h3 className="text-2xl font-display font-bold text-white">{content.headline}</h3>
          </div>

          {/* Body */}
          <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <ul className="space-y-3">
              {content.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90 text-sm">
                  <span className="text-base flex-shrink-0 mt-0.5">{p.icon}</span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
              <p className="text-amber-300 text-sm font-medium mb-1">⚠️ {content.note}</p>
              <p className="text-white/70 text-sm">{content.elif}</p>
            </div>

            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4">
              <p className="text-primary-light text-sm font-medium mb-1">💡 Näme üçin?</p>
              <p className="text-white/70 text-sm">{content.vision}</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-gold text-sm font-bold mb-2">🤔 NÄME ÜÇIN BU ARZAN DÄL?</p>
              <p className="text-white/70 text-sm leading-relaxed">
                {content.why}
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                Siz diňe saýt däl, eýsem 24/7 işleýän satuwçy alýarsyňyz. Arzan zatlar soňy bilen has gymmada düşýär (düzedişler, haýal işlemek). Biz bolsa ömürlik hili kepillendirýäris.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 pt-4 flex gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-sm text-center hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
            >
              Bu paketi saýlaň
            </a>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-white/10 text-muted hover:text-white hover:border-white/30 transition-colors text-sm"
            >
              Ýap
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Pricing() {
  const [modal, setModal] = useState<'starter' | 'pro' | null>(null);

  return (
    <section id="pricing" className="py-24 bg-background relative">
      <PricingModal tier={modal} onClose={() => setModal(null)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Taslamanyňyz üçin dogry paket saýlaň
          </h2>
          <p className="text-muted text-lg">
            Saýlaň. Sargyt beriň. Üstünlik gazanyň.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-center">

          {/* TIER 1: STARTER */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-3xl relative flex flex-col"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-6 self-start">
              ⚡ Başlangyç
            </div>

            <div className="mb-2">
              <span className="text-lg text-muted line-through font-mono">$250</span>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-mono font-bold text-emerald-400">$199</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 font-bold">
                $51 tygşytla
              </span>
            </div>
            <p className="text-muted text-sm mb-1">≈ 3 781 TMT</p>

            <p className="text-white font-medium my-6 pb-6 border-b border-border">
              Kiçi kärhanalar we hususy telekeçiler üçin.
            </p>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                '1-3 sahypa Premium Landing Page',
                'Mobil ekrana doly maslaşan dizaýn',
                'Esasy SEO we ýokary tizlik',
                'Müşderi sargyt formasy',
                '1 aý tehniki goldaw',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                  <Check className="w-4 h-4 text-primary-light flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModal('starter')}
              className="w-full py-3 rounded-xl border border-white/20 text-white/80 text-center text-sm font-semibold hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 mb-3"
            >
              <Info className="w-4 h-4" /> Doly maglumat
            </button>
            <a href="#contact" className="block w-full py-3 rounded-xl border border-white/20 text-white text-center font-bold hover:bg-white/10 transition-colors text-sm">
              Bu paketi saýlaň
            </a>
          </motion.div>

          {/* TIER 2: PRO — MOST POPULAR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative flex flex-col rounded-3xl md:scale-105 z-10"
            style={{
              background: 'linear-gradient(135deg, #0f2218 0%, #142d1e 100%)',
              boxShadow: '0 0 0 1.5px rgba(212,168,67,0.6), 0 0 60px -10px rgba(212,168,67,0.25)',
            }}
          >
            {/* Glowing border overlay */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(212,168,67,0.05)' }} />

            {/* MOST POPULAR badge */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold to-gold-light text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-xl shadow-gold/30 whitespace-nowrap">
              🏆 EŇ KÖP SAÝLANÝAN
            </div>

            <div className="p-8 md:p-10 flex flex-col flex-1">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-bold mb-6 mt-3 self-start">
                PRO ONLAÝN DÜKAN
              </div>

              <div className="mb-2">
                <span className="text-lg text-muted line-through font-mono">$800</span>
              </div>
              <div className="mb-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-5xl font-mono font-bold text-gold drop-shadow-md">$599</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold font-bold whitespace-nowrap">
                  $201 tygşytla · Çäklendirilen
                </span>
              </div>
              <p className="text-primary-light text-sm mb-1">≈ 11 381 TMT</p>

              {/* Gift badges */}
              <div className="flex flex-wrap gap-2 my-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  🎁 3 ýyllyk MUGT domen!
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
                  🎁 Professional Logo — SOWGAT!
                </span>
              </div>

              <p className="text-white font-medium my-4 pb-6 border-b border-white/10">
                Orta we iri kärhanalar üçin doly sanly çözgüt.
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {[
                  '5-10 sahypaly Premium E-Commerce',
                  'CMS dolandyryş paneli (Özüňiz aňsat üýtgedip bilersiňiz)',
                  'AI Chatbot integrasiýasy (24/7 awtomat satuw)',
                  'Premium animasiýalar we interaktiw dizaýn',
                  'Doly SEO we Ýokary tizlik (99% Performance)',
                  '3 aý VIP tehniki goldaw',
                ].map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setModal('pro')}
                className="w-full py-3 rounded-xl border border-gold/30 text-gold/80 text-center text-sm font-semibold hover:bg-gold/10 hover:text-gold transition-all flex items-center justify-center gap-2 mb-3"
              >
                <Info className="w-4 h-4" /> Doly maglumat
              </button>
              <a href="#contact" className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-center font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-sm">
                Bu paketi saýlaň
              </a>
            </div>
          </motion.div>

          {/* TIER 3: ENTERPRISE */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-3xl relative flex flex-col"
          >
            <div className="inline-flex px-3 py-1 rounded-full bg-white/10 text-white text-sm font-bold mb-6 self-start">
              💎 Enterprise
            </div>

            <div className="mb-6 flex flex-col justify-center">
              <span className="text-2xl font-display font-bold text-white leading-tight">
                Ylalaşyk esasynda
              </span>
              <p className="text-muted text-sm mt-1">Individual baha kesgitlenýär</p>
            </div>

            <p className="text-white font-medium mb-6 pb-6 border-b border-border">
              Iri kärhanalar, Platformalar, Portallar.
            </p>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                'Çäksiz sahypalar we aýratyn funksionallyk',
                'PWA (Telefona gurnalýan web-applikasiýa)',
                'Kämil API we Töleg ulgamlarynyň integrasiýasy',
                'Işlän dilli ulgam we Kämil AI Agent',
                'Şahsy (Dedicated) Server we CDN',
                '24/7 Premium tehniki goldaw',
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                  <Check className="w-4 h-4 text-primary-light flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <a href="#contact" className="block w-full py-3 rounded-xl border border-white/20 text-white text-center font-bold hover:bg-white/10 transition-colors text-sm">
              Biz bilen habarlaşyň
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
