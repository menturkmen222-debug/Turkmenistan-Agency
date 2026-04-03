import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface ModalProps {
  tier: 'starter' | 'pro' | null;
  onClose: () => void;
}

function PricingModal({ tier, onClose }: ModalProps) {
  const { t } = useTranslation();
  if (!tier) return null;

  const isStarter = tier === 'starter';

  const points = isStarter
    ? Array.from({ length: 6 }, (_, i) => t(`pricing.starter_modal_point_${i}`))
    : Array.from({ length: 9 }, (_, i) => t(`pricing.pro_modal_point_${i}`));

  const headline = isStarter ? t('pricing.starter_modal_headline') : t('pricing.pro_modal_headline');
  const badge = isStarter ? t('pricing.starter_modal_badge') : t('pricing.pro_modal_badge');
  const note = isStarter ? t('pricing.starter_modal_note') : t('pricing.pro_modal_note');
  const elif = isStarter ? t('pricing.starter_modal_elif') : t('pricing.pro_modal_elif');
  const vision = isStarter ? t('pricing.starter_modal_vision') : t('pricing.pro_modal_vision');
  const why = isStarter ? t('pricing.starter_modal_why') : t('pricing.pro_modal_why');

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
          <div className="px-8 pt-8 pb-6 border-b border-white/10">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold mb-3">{badge}</span>
            <h3 className="text-2xl font-display font-bold text-white">{headline}</h3>
          </div>

          <div className="px-8 py-6 space-y-6 max-h-[60vh] overflow-y-auto">
            <ul className="space-y-3">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90 text-sm">
                  <span className="text-base flex-shrink-0 mt-0.5">{p.slice(0, 2)}</span>
                  <span>{p.slice(2).trim()}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
              <p className="text-amber-300 text-sm font-medium mb-1">⚠️ {note}</p>
              <p className="text-white/70 text-sm">{elif}</p>
            </div>

            <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4">
              <p className="text-primary-light text-sm font-medium mb-1">{t('pricing.why_label')}</p>
              <p className="text-white/70 text-sm">{vision}</p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-gold text-sm font-bold mb-2">{t('pricing.why_not_cheap_label')}</p>
              <p className="text-white/70 text-sm leading-relaxed">
                {why}
              </p>
              <p className="text-white/70 text-sm leading-relaxed mt-2">
                {t('pricing.why_not_cheap_extra')}
              </p>
            </div>
          </div>

          <div className="px-8 pb-8 pt-4 flex gap-3">
            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-sm text-center hover:scale-[1.02] transition-transform shadow-lg shadow-primary/20"
            >
              {t('pricing.cta_start')}
            </a>
            <button
              onClick={onClose}
              className="px-4 py-3 rounded-xl border border-white/10 text-muted hover:text-white hover:border-white/30 transition-colors text-sm"
            >
              {t('pricing.close')}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function Pricing() {
  const [modal, setModal] = useState<'starter' | 'pro' | null>(null);
  const { t } = useTranslation();

  const starterFeatures = Array.from({ length: 5 }, (_, i) => t(`pricing.starter_feat_${i}`));
  const proFeatures = Array.from({ length: 6 }, (_, i) => t(`pricing.pro_feat_${i}`));
  const enterpriseFeatures = Array.from({ length: 6 }, (_, i) => t(`pricing.enterprise_feat_${i}`));

  return (
    <section id="pricing" className="py-24 bg-background relative">
      <PricingModal tier={modal} onClose={() => setModal(null)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {t('pricing.headline')}
          </h2>
          <p className="text-muted text-lg">
            {t('pricing.sub')}
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
              {t('pricing.starter_badge_label')}
            </div>

            <div className="mb-2">
              <span className="text-lg text-muted line-through font-mono">$250</span>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-mono font-bold text-emerald-400">$199</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-400 font-bold">
                {t('pricing.starter_save_label')}
              </span>
            </div>
            <p className="text-muted text-sm mb-1">≈ 3 781 TMT</p>

            <p className="text-white font-medium my-6 pb-6 border-b border-border">
              {t('pricing.starter_for')}
            </p>

            <ul className="space-y-3 mb-6 flex-1">
              {starterFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                  <Check className="w-4 h-4 text-primary-light flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => setModal('starter')}
              className="w-full py-3 rounded-xl border border-white/20 text-white/80 text-center text-sm font-semibold hover:bg-white/5 hover:text-white transition-all flex items-center justify-center gap-2 mb-3"
            >
              <Info className="w-4 h-4" /> {t('pricing.more_info')}
            </button>
            <a href="#contact" className="block w-full py-3 rounded-xl border border-white/20 text-white text-center font-bold hover:bg-white/10 transition-colors text-sm">
              {t('pricing.cta_start')}
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
            <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ boxShadow: 'inset 0 0 30px rgba(212,168,67,0.05)' }} />

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold to-gold-light text-black font-bold px-5 py-1.5 rounded-full text-xs shadow-xl shadow-gold/30 whitespace-nowrap">
              {t('pricing.most_popular_label')}
            </div>

            <div className="p-8 md:p-10 flex flex-col flex-1">
              <div className="inline-flex px-3 py-1 rounded-full bg-primary/20 text-primary-light text-sm font-bold mb-6 mt-3 self-start">
                {t('pricing.pro_badge_label')}
              </div>

              <div className="mb-2">
                <span className="text-lg text-muted line-through font-mono">$800</span>
              </div>
              <div className="mb-2 flex items-baseline gap-2 flex-wrap">
                <span className="text-5xl font-mono font-bold text-gold drop-shadow-md">$599</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold font-bold whitespace-nowrap">
                  {t('pricing.pro_save_label')}
                </span>
              </div>
              <p className="text-primary-light text-sm mb-1">≈ 11 381 TMT</p>

              <div className="flex flex-wrap gap-2 my-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  {t('pricing.gift_domain')}
                </span>
                <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold">
                  {t('pricing.gift_logo')}
                </span>
              </div>

              <p className="text-white font-medium my-4 pb-6 border-b border-white/10">
                {t('pricing.pro_for')}
              </p>

              <ul className="space-y-3 mb-6 flex-1">
                {proFeatures.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-white text-sm">
                    <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setModal('pro')}
                className="w-full py-3 rounded-xl border border-gold/30 text-gold/80 text-center text-sm font-semibold hover:bg-gold/10 hover:text-gold transition-all flex items-center justify-center gap-2 mb-3"
              >
                <Info className="w-4 h-4" /> {t('pricing.more_info')}
              </button>
              <a href="#contact" className="block w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white text-center font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform text-sm">
                {t('pricing.cta_start')}
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
              {t('pricing.enterprise_label')}
            </div>

            <div className="mb-6 flex flex-col justify-center">
              <span className="text-2xl font-display font-bold text-white leading-tight">
                {t('pricing.enterprise_price_label')}
              </span>
              <p className="text-muted text-sm mt-1">{t('pricing.enterprise_individual')}</p>
            </div>

            <p className="text-white font-medium mb-6 pb-6 border-b border-border">
              {t('pricing.enterprise_for')}
            </p>

            <ul className="space-y-3 mb-6 flex-1">
              {enterpriseFeatures.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90 text-sm">
                  <Check className="w-4 h-4 text-primary-light flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>

            <a href="#contact" className="block w-full py-3 rounded-xl border border-white/20 text-white text-center font-bold hover:bg-white/10 transition-colors text-sm">
              {t('pricing.cta_enterprise')}
            </a>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
