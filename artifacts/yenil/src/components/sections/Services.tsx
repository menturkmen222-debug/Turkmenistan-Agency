import { motion } from 'framer-motion';
import { Monitor, Building2, ShoppingCart, Layout, Zap } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

function PwaIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
      <rect x="7" y="1" width="18" height="30" rx="3" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="4" width="12" height="18" rx="1" fill="currentColor" fillOpacity="0.15" />
      <circle cx="16" cy="26" r="1.5" fill="currentColor" />
      <path d="M13 10 L16 7 L19 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 7 L16 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 13 L16 16 L19 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1" />
    </svg>
  );
}

export function Services() {
  const { t } = useTranslation();

  const icons = [
    <Monitor className="w-8 h-8" />,
    <Building2 className="w-8 h-8" />,
    <ShoppingCart className="w-8 h-8" />,
    <PwaIcon />,
    <Layout className="w-8 h-8" />,
    <Zap className="w-8 h-8" />,
  ];

  const services = icons.map((icon, i) => ({
    icon,
    title: t(`services.item_${i}_title`),
    desc: t(`services.item_${i}_desc`),
  }));

  return (
    <section id="services" className="py-24 bg-surface relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSg0NSwgMTU4LCA5MiwgMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-white mb-4"
          >
            {t('services.headline')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted max-w-2xl"
          >
            {t('services.sub')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="flex flex-col h-full">
                <div className="text-primary-light mb-6 group-hover:text-gold transition-colors duration-300 group-hover:-translate-y-2 transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary-light transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted leading-relaxed">{service.desc}</p>
                <div className="mt-6 w-0 h-0.5 bg-gradient-to-r from-primary to-transparent group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
