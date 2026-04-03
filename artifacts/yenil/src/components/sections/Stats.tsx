import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Diamond } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function Stats() {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div id="how-it-works" className="relative">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
            {t('stats.why_headline')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <Diamond className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('stats.why_1_title')}</h3>
              <p className="text-muted leading-relaxed">
                {t('stats.why_1_desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-primary border border-primary-light p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(27,107,58,0.5)] transform md:-translate-y-4"
            >
              <Zap className="w-10 h-10 text-white mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('stats.why_2_title')}</h3>
              <p className="text-white/90 leading-relaxed">
                {t('stats.why_2_desc')}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 rounded-2xl"
            >
              <ShieldCheck className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{t('stats.why_3_title')}</h3>
              <p className="text-muted leading-relaxed">
                {t('stats.why_3_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
