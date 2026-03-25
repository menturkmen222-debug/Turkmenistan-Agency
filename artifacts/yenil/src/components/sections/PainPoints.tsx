import { motion } from 'framer-motion';
import { Snail, EyeOff, Megaphone, TrendingDown, Trophy, Globe } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function PainPoints() {
  const { t } = useTranslation();

  const cards = [
    {
      icon: <Snail className="w-6 h-6 text-gold" />,
      title: "Söwdaňyz haýal geçýärmi?",
      desc: "Köp kärhanalar sanly dünýäde yz galdyryp bilmeýär. Müşderiler sizi tapmasa — bäsdeşleriňiz olary alýar."
    },
    {
      icon: <EyeOff className="w-6 h-6 text-gold" />,
      title: "Müşderiler siz barada maglumat tapmaýarmy?",
      desc: "Häzirki döwürde adamlar hyzmat almak üçin ilki internete girýärler. Saýtsyz iş — görünmeýän iş."
    },
    {
      icon: <Megaphone className="w-6 h-6 text-gold" />,
      title: "Işiňizi tanatmak kynmy?",
      desc: "Habarçylyk çykdajylary artýar, netijesi azdyr. Professional saýt — iň güýçli mahabat guraly."
    },
    {
      icon: <TrendingDown className="w-6 h-6 text-gold" />,
      title: "Girdeji garaşylandan azmy?",
      desc: "Onlaýn huzury bolmadyk kärhanalar ýyllyk 60%-e çenli mümkinçiligi elden berýärler."
    },
    {
      icon: <Trophy className="w-6 h-6 text-gold" />,
      title: "Bäsdeşler öňe geçip barýarmy?",
      desc: "Her gün bäsdeşleriňiz özlerini onlaýnda güýçlendirýärler. Saklaýyn siz hem edilsin."
    },
    {
      icon: <Globe className="w-6 h-6 text-gold" />,
      title: "Diňe ýerli bazar bilen çäklenmek isleýärsiňizmi?",
      desc: "Professioanl saýt bilen Türkmenistandan tutuş dünýä müşderilere ýetip bilersiňiz."
    }
  ];

  return (
    <section className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
            {t('pain.headline')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-2xl group hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(27,107,58,0.3)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              
              <div className="w-12 h-12 rounded-xl bg-surface border border-gold/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 leading-tight">{card.title}</h3>
              <p className="text-muted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-white/80 font-medium mb-2">{t('pain.bridge')}</p>
          <p className="text-3xl md:text-4xl font-display font-bold text-gradient-green drop-shadow-[0_0_15px_rgba(45,158,92,0.5)]">
            {t('pain.bridge_highlight')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
