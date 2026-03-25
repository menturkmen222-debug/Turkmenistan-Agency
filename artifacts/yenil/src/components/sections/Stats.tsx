import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Diamond } from 'lucide-react';

export function Stats() {
  const stats = [
    { num: "50+", label: "Taslama Tamamlanan" },
    { num: "24", label: "Sagat Goldaw" },
    { num: "5", label: "Dil Goldawy" },
    { num: "100%", label: "Kepillik Hili" }
  ];

  return (
    <section className="py-24 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring" }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-mono font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(212,168,67,0.3)]">
                {stat.num}
              </div>
              <div className="text-sm md:text-base text-gold font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Us */}
        <div id="how-it-works" className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary-light text-sm font-medium mb-6">
            🌍 Global Hilli, Ýerli Dilli
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-12">
            Näme üçin Ýeňil?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 rounded-2xl"
            >
              <Diamond className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Premium Hil</h3>
              <p className="text-muted leading-relaxed">
                Dünýäniň iň ösen tehnologiýalary bilen gurýarys — Türkmenistana laýyk bahada. Her bir piksel we her bir setir kod iň ýokary standartlara laýyk gelýär.
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
              <h3 className="text-2xl font-bold text-white mb-4">Çalt Eltip Berýäris</h3>
              <p className="text-white/90 leading-relaxed">
                Adaty saýt 7-14 günde taýýar. Wagt — iň gymmatly baýlyk. Biz muny gowy bilýäris we taslamalaryňyzy wada berlen möhletde gowşurýarys.
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
              <h3 className="text-2xl font-bold text-white mb-4">Kepillik</h3>
              <p className="text-muted leading-relaxed">
                Ähli taslamalarymyz üçin üýtgedip düzetmek kepilligi we tehniki goldaw berýäris. Işiňizi tabşyranyňyzdan soň hem sizi ýeke goýamzok.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
