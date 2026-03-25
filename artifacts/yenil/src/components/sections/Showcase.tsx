import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export function Showcase() {
  const testimonials = [
    {
      name: "Oraz Durdyýew",
      business: "Durdyýew Market",
      city: "Aşgabat",
      rating: 5,
      text: "Ýeňil toparyna ynanmak dogry karar boldy. Saýtymyz taýýar bolandan soň, müşderilerimiz 3 esse artdy. Hil we tizlik babatda hiç hili şikaýatymyz ýok."
    },
    {
      name: "Maýa Nurlyýewa",
      business: "Nur Güzellik Salony",
      city: "Mary",
      rating: 5,
      text: "Başda saýt gerek bolarmyka diýip çekinýärdim. Indi bolsa müşderilerimiň 70%-i saýt arkaly gelýär. Ýeňil ulgamyna tüýs ýürekden minnetdarlyk bildirýärin!"
    },
    {
      name: "Begenç Ataýew",
      business: "Ataýew Transport",
      city: "Türkmenbaşy",
      rating: 5,
      text: "Professional, çalt we ygtybarly. Saýtymyzy gysga wagtyň içinde döretdiler we häzir hem tehniki goldaw berýärler."
    },
    {
      name: "Gülälek Hojamyradowa",
      business: "Sweet Cake",
      city: "Aşgabat",
      rating: 5,
      text: "Önümlerimi görkezýän saýt ýaşaýşymy üýtgetdi. Indi sosial mediýa görä has köp sargyt alýaryn. Ýeňil ulgamy örän sabyrly."
    },
    {
      name: "Serdar Berdimyradow",
      business: "TM Logistics",
      city: "Daşoguz",
      rating: 5,
      text: "Köp şereket bilen gürleşdik, ýöne Ýeňil iň gowy hili iň amatly bahada hödürledi. Taslamany wagtynda teslim edildiler."
    }
  ];

  const technologies = [
    "React", "Next.js", "Vue.js", "Node.js", "Python", 
    "PostgreSQL", "Tailwind CSS", "Framer Motion", 
    "Vercel", "Figma", "React Native"
  ];

  return (
    <section className="py-32 bg-surface-2 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-20 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
          Müşderilerimiz Näme Diýýär?
        </h2>
      </div>

      {/* Testimonials Carousel (Horizontal Scroll Snap) */}
      <div className="w-full flex overflow-x-auto snap-x snap-mandatory pb-16 pt-8 no-scrollbar px-4 sm:px-8 md:px-20 lg:px-32 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ delay: i * 0.1 }}
            className="flex-none w-[85vw] sm:w-[400px] snap-center glass-card p-8 rounded-3xl"
          >
            <div className="flex gap-1 mb-6">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold drop-shadow-[0_0_5px_rgba(212,168,67,0.5)]" />
              ))}
            </div>
            <p className="text-lg text-white mb-8 italic">"{t.text}"</p>
            <div className="flex items-center gap-4 border-t border-white/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                {t.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-white font-bold">{t.name}</h4>
                <p className="text-muted text-sm">{t.business}, {t.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="max-w-5xl mx-auto px-4 mt-20 text-center relative z-10">
        <h3 className="text-2xl font-bold text-white mb-10">Haýsy tehnologiýalar bilen işleýäris?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white font-mono text-sm shadow-lg hover:bg-white/10 hover:border-gold/50 cursor-default transition-colors"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
