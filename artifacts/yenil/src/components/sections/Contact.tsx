import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSubmitContactForm } from '@workspace/api-client-react';
import { useTranslation } from '@/lib/i18n';
import { useAnalytics } from '@/hooks/use-analytics';

const contactSchema = z.object({
  name: z.string().min(2, "Adyňyz hökmany"),
  businessName: z.string().min(2, "Biznesiň ady hökmany"),
  phone: z.string().min(8, "Telefon belgisi nädogry"),
  email: z.string().email("Nädogry e-poçta"),
  selectedTier: z.string().optional(),
  designStyle: z.string().optional(),
  message: z.string().min(10, "Gysgaça maglumat ýazyň"),
  timeline: z.string().optional()
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function Contact() {
  const { t, locale } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate, isPending } = useSubmitContactForm();

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { phone: '+993' }
  });

  const selectedTier = watch('selectedTier');
  const selectedStyle = watch('designStyle');

  const onSubmit = (data: ContactFormValues) => {
    const payload = {
      ...data,
      locale,
    };
    
    mutate({ data: payload }, {
      onSuccess: () => {
        setIsSuccess(true);
        trackEvent('contact_form_submit', { success: true }, true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4A843', '#1B6B3A', '#FAFAF8']
        });
      },
      onError: () => {
        trackEvent('contact_form_submit', { success: false }, true);
        alert("Näsazlyk ýüze çykdy. Gaýtadan synanşyň.");
      }
    });
  };

  if (isSuccess) {
    return (
      <section id="contact" className="py-24 bg-surface relative min-h-[600px] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-lg mx-auto rounded-3xl"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">✨ ÜSTÜNLIKLI IBERILDI! ✨</h2>
          <p className="text-muted text-lg mb-8 leading-relaxed">
            Siziň ýüzlenmäňiz alyndy! Biz 6 sagadyň içinde siz bilen habarlaşarys. Taslamaňyza höwes bilen garaşýarys! 🚀
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="px-8 py-3 rounded-full border border-border text-white hover:bg-white/5 transition-colors"
          >
            Täze form iber
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-surface relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Taslamaňyzy başlalyň</h2>
          <p className="text-muted text-lg">Formy dolduryň — 6 sagadyň içinde jogap bereris</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 glass-card p-8 sm:p-12 rounded-3xl">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Adyňyz *</label>
              <input 
                {...register("name")}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="Maksat"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Biznesingiziň ady *</label>
              <input 
                {...register("businessName")}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="Ýeňil HJ"
              />
              {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Telefon *</label>
              <input 
                {...register("phone")}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
              />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">E-poçta *</label>
              <input 
                {...register("email")}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all"
                placeholder="mail@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-4">Haýsy paket gyzyklandyrýar?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['Ýeňil Start', 'Ýeňil Pro', 'Enterprise'].map(tier => (
                <div 
                  key={tier}
                  onClick={() => setValue('selectedTier', tier)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedTier === tier ? 'border-gold bg-gold/10' : 'border-border bg-background hover:border-white/30'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${selectedTier === tier ? 'text-gold' : 'text-white'}`}>{tier}</span>
                    <div className={`w-4 h-4 rounded-full border ${selectedTier === tier ? 'border-gold bg-gold' : 'border-muted'} flex items-center justify-center`}>
                      {selectedTier === tier && <div className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-4">Dizaýn Stili</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'classic', label: 'Klassik & Ynamdar', img: 'style-classic.png' },
                { id: 'modern', label: 'Döwrebap & Dinamik', img: 'style-modern.png' },
                { id: 'luxury', label: 'Lýuks & Premium', img: 'style-luxury.png' }
              ].map(style => (
                <div 
                  key={style.id}
                  onClick={() => setValue('designStyle', style.id)}
                  className={`rounded-xl border cursor-pointer overflow-hidden transition-all group ${selectedStyle === style.id ? 'border-primary ring-2 ring-primary/30' : 'border-border'}`}
                >
                  <div className="h-24 w-full relative overflow-hidden">
                    <img src={`${import.meta.env.BASE_URL}images/${style.img}`} alt={style.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {selectedStyle === style.id && <div className="absolute inset-0 bg-primary/20" />}
                  </div>
                  <div className={`p-3 text-sm text-center font-medium ${selectedStyle === style.id ? 'bg-primary/10 text-white' : 'bg-background text-muted'}`}>
                    {style.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Taslamaňyz barada gysgaça *</label>
            <textarea 
              {...register("message")}
              rows={4}
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all resize-none"
              placeholder="Meselem: Restoran menýusy we bron ulgamy bolan saýt..."
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button 
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isPending ? "Iberilýär..." : "Habarlaşmak Talapnamasyny Iberiň"}
            {!isPending && <Send className="w-5 h-5" />}
          </button>
          
        </form>
      </div>
    </section>
  );
}
