import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Dumbbell, Flower2, Heart } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const demos = [
  {
    key: 'fitness',
    url: 'https://fitnes.yenil.ru/',
    icon: Dumbbell,
    color: 'from-emerald-500/20 to-green-600/10',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    glowColor: 'rgba(16,185,129,0.15)',
    price: 250,
    category_key: 'portfolio.cat_fitness',
    title_key: 'portfolio.title_fitness',
    desc_key: 'portfolio.desc_fitness',
  },
  {
    key: 'flowers',
    url: 'https://flowers.yenil.ru/',
    icon: Flower2,
    color: 'from-pink-500/20 to-rose-600/10',
    iconColor: 'text-pink-400',
    borderColor: 'border-pink-500/30',
    glowColor: 'rgba(236,72,153,0.15)',
    price: 300,
    category_key: 'portfolio.cat_flowers',
    title_key: 'portfolio.title_flowers',
    desc_key: 'portfolio.desc_flowers',
  },
  {
    key: 'wedding',
    url: 'https://wedding.yenil.ru/',
    icon: Heart,
    color: 'from-amber-500/20 to-yellow-600/10',
    iconColor: 'text-gold',
    borderColor: 'border-gold/30',
    glowColor: 'rgba(212,168,67,0.15)',
    price: 400,
    category_key: 'portfolio.cat_wedding',
    title_key: 'portfolio.title_wedding',
    desc_key: 'portfolio.desc_wedding',
  },
];

export function Portfolio() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const current = demos[active];
  const Icon = current.icon;

  return (
    <section id="portfolio" className="py-32 bg-surface-1 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-700"
        style={{ background: current.glowColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-gold/30 text-gold bg-gold/5 mb-6">
            {t('portfolio.badge')}
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-5">
            {t('portfolio.headline')}
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t('portfolio.sub')}
          </p>
        </motion.div>

        {/* Tab selector */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {demos.map((demo, i) => {
            const TabIcon = demo.icon;
            return (
              <button
                key={demo.key}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  active === i
                    ? `bg-gradient-to-r ${demo.color} ${demo.borderColor} ${demo.iconColor} text-white scale-105 shadow-lg`
                    : 'border-white/10 text-white/50 hover:text-white/80 hover:border-white/20 bg-white/3'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${active === i ? demo.iconColor : ''}`} />
                {t(demo.title_key)}
              </button>
            );
          })}
        </div>

        {/* Main showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-5 gap-8 items-start"
          >
            {/* Browser mockup preview — takes 3 of 5 columns */}
            <div className="lg:col-span-3">
              <div
                className={`rounded-2xl overflow-hidden border ${current.borderColor} shadow-2xl`}
                style={{ background: 'rgba(10,26,15,0.6)', backdropFilter: 'blur(12px)' }}
              >
                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <span className="w-3 h-3 rounded-full bg-red-500/70" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <span className="w-3 h-3 rounded-full bg-green-500/70" />
                  <div className="flex-1 mx-3 bg-white/5 rounded-md px-3 py-1 text-xs text-white/30 font-mono truncate">
                    {current.url}
                  </div>
                  <a
                    href={current.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${current.iconColor} hover:opacity-70 transition-opacity`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Iframe preview */}
                <div className="relative w-full" style={{ height: '420px' }}>
                  <iframe
                    src={current.url}
                    title={t(current.title_key)}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    style={{ pointerEvents: 'none' }}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                  />
                  {/* Transparent overlay to keep pointer events on our card */}
                  <div className="absolute inset-0" />
                </div>
              </div>
            </div>

            {/* Info panel — takes 2 of 5 columns */}
            <div className="lg:col-span-2 flex flex-col justify-center gap-6">
              {/* Category chip */}
              <div className={`inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border ${current.borderColor} bg-gradient-to-r ${current.color}`}>
                <Icon className={`w-4 h-4 ${current.iconColor}`} />
                <span className={`text-xs font-bold uppercase tracking-wider ${current.iconColor}`}>
                  {t(current.category_key)}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                {t(current.title_key)}
              </h3>

              {/* Description */}
              <p className="text-muted text-base leading-relaxed">
                {t(current.desc_key)}
              </p>

              {/* Features list */}
              <ul className="space-y-2">
                {(['feat1', 'feat2', 'feat3'] as const).map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${current.iconColor.replace('text-', 'bg-')}`} />
                    {t(`portfolio.${current.key}_${f}`)}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div
                className={`rounded-2xl p-5 border ${current.borderColor} bg-gradient-to-br ${current.color}`}
              >
                <p className="text-white/50 text-sm mb-1">{t('portfolio.starting_from')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-white">${current.price}</span>
                  <span className="text-white/40 text-sm">{t('portfolio.usd')}</span>
                </div>
                <p className="text-white/30 text-xs mt-1">
                  ≈ {(current.price * 19).toLocaleString()} TMT
                </p>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 flex-wrap">
                <a
                  href={current.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border ${current.borderColor} bg-gradient-to-r ${current.color} text-white hover:scale-105 transition-transform shadow-lg`}
                >
                  <ExternalLink className="w-4 h-4" />
                  {t('portfolio.view_demo')}
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border border-white/10 text-white/70 hover:text-white hover:border-white/25 transition-all"
                >
                  {t('portfolio.order_similar')}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom mini cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          {demos.map((demo, i) => {
            const CardIcon = demo.icon;
            return (
              <motion.button
                key={demo.key}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`text-left p-5 rounded-2xl border transition-all duration-300 ${
                  active === i
                    ? `${demo.borderColor} bg-gradient-to-br ${demo.color}`
                    : 'border-white/8 bg-white/3 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <CardIcon className={`w-5 h-5 ${active === i ? demo.iconColor : 'text-white/30'}`} />
                  <span className={`text-lg font-bold ${active === i ? 'text-white' : 'text-white/40'}`}>
                    ${demo.price}
                  </span>
                </div>
                <p className={`text-sm font-semibold ${active === i ? 'text-white' : 'text-white/50'}`}>
                  {t(demo.title_key)}
                </p>
                <p className={`text-xs mt-1 ${active === i ? demo.iconColor : 'text-white/25'}`}>
                  {t(demo.category_key)}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
