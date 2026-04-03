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

type ContactFormValues = {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  selectedTier?: string;
  designStyle?: string;
  message: string;
  existingUrl?: string;
  industry?: string;
  contactMethod?: string[];
  timeline?: string;
};

export function Contact() {
  const { t, locale } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const { mutate, isPending } = useSubmitContactForm();

  const contactSchema = z.object({
    name: z.string().min(2, t('contact.val_name')),
    businessName: z.string().min(2, t('contact.val_business')),
    phone: z.string().min(8, t('contact.val_phone')),
    email: z.string().email(t('contact.val_email')),
    selectedTier: z.string().optional(),
    designStyle: z.string().optional(),
    message: z.string().min(10, t('contact.val_message')),
    existingUrl: z.string().optional(),
    industry: z.string().optional(),
    contactMethod: z.array(z.string()).optional(),
    timeline: z.string().optional(),
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { phone: '+993', contactMethod: [] }
  });

  const selectedTier = watch('selectedTier');
  const selectedStyle = watch('designStyle');

  const INDUSTRIES = Array.from({ length: 9 }, (_, i) => t(`contact.ind_${i}`));
  const CONTACT_METHODS = Array.from({ length: 4 }, (_, i) => t(`contact.method_${i}`));

  const toggleContactMethod = (method: string) => {
    const updated = selectedMethods.includes(method)
      ? selectedMethods.filter(m => m !== method)
      : [...selectedMethods, method];
    setSelectedMethods(updated);
    setValue('contactMethod', updated);
  };

  const onSubmit = (data: ContactFormValues) => {
    mutate({ data: { ...data, locale, contactMethod: selectedMethods } }, {
      onSuccess: () => {
        setIsSuccess(true);
        trackEvent('contact_form_submit', { success: true }, true);
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#D4A843', '#1B6B3A', '#FAFAF8'] });
      },
      onError: () => {
        trackEvent('contact_form_submit', { success: false }, true);
        alert(t('contact.error_alert'));
      }
    });
  };

  const inputClass = "w-full bg-background border border-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all";

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
          <h2 className="text-3xl font-display font-bold text-white mb-4">{t('contact.success_title_full')}</h2>
          <p className="text-muted text-lg mb-8 leading-relaxed">
            {t('contact.success_msg')}
          </p>
          <button onClick={() => setIsSuccess(false)} className="px-8 py-3 rounded-full border border-border text-white hover:bg-white/5 transition-colors">
            {t('contact.new_form')}
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-surface relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{t('contact.headline')}</h2>
          <p className="text-muted text-lg">{t('contact.sub')}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 glass-card p-8 sm:p-12 rounded-3xl">

          {/* Row 1: Name + Business */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('contact.name_label')}</label>
              <input {...register("name")} className={inputClass} placeholder="Ivan" />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('contact.business_label')}</label>
              <input {...register("businessName")} className={inputClass} placeholder="ООО «Компания»" />
              {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName.message}</p>}
            </div>
          </div>

          {/* Row 2: Phone + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('contact.phone_label')}</label>
              <input {...register("phone")} className={inputClass} />
              {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('contact.email_label')}</label>
              <input {...register("email")} className={inputClass} placeholder="mail@example.com" />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>
          </div>

          {/* Row 3: Existing URL + Industry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('contact.url_label')}</label>
              <input {...register("existingUrl")} className={inputClass} placeholder="https://mysite.com" />
              <p className="text-muted/60 text-xs mt-1">{t('contact.url_hint')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">{t('contact.industry_label')}</label>
              <select {...register("industry")} className={inputClass + " appearance-none cursor-pointer"}>
                <option value="" className="bg-background">{t('contact.industry_placeholder')}</option>
                {INDUSTRIES.map((ind, i) => (
                  <option key={i} value={ind} className="bg-background">{ind}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Package */}
          <div>
            <label className="block text-sm font-medium text-white mb-4">{t('contact.package')}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'Starter — $199', label: 'Starter', sub: '$199' },
                { id: 'Professional E-Commerce — $599', label: 'Pro E-Commerce', sub: '$599' },
                { id: 'Enterprise', label: 'Enterprise', sub: t('contact.tier_enterprise_sub') }
              ].map(tier => (
                <div
                  key={tier.id}
                  onClick={() => setValue('selectedTier', tier.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedTier === tier.id ? 'border-gold bg-gold/10' : 'border-border bg-background hover:border-white/30'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`font-medium block ${selectedTier === tier.id ? 'text-gold' : 'text-white'}`}>{tier.label}</span>
                      <span className="text-xs text-muted">{tier.sub}</span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex-shrink-0 ${selectedTier === tier.id ? 'border-gold bg-gold' : 'border-muted'} flex items-center justify-center`}>
                      {selectedTier === tier.id && <div className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Style */}
          <div>
            <label className="block text-sm font-medium text-white mb-4">{t('contact.design_label')}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { id: 'classic', label: t('contact.style_classic'), img: 'style-classic.png' },
                { id: 'modern', label: t('contact.style_modern'), img: 'style-modern.png' },
                { id: 'luxury', label: t('contact.style_luxury'), img: 'style-luxury.png' }
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

          {/* Contact Method checkboxes */}
          <div>
            <label className="block text-sm font-medium text-white mb-4">{t('contact.contact_method_label')}</label>
            <div className="flex flex-wrap gap-3">
              {CONTACT_METHODS.map((method, i) => {
                const active = selectedMethods.includes(method);
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => toggleContactMethod(method)}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${active ? 'border-primary bg-primary/20 text-white' : 'border-border text-muted hover:border-white/40 hover:text-white'}`}
                  >
                    {active && <span className="mr-1">✓</span>}{method}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">{t('contact.timeline_label')}</label>
            <select {...register("timeline")} className={inputClass + " appearance-none cursor-pointer"}>
              <option value="" className="bg-background">{t('contact.timeline_placeholder')}</option>
              {Array.from({ length: 5 }, (_, i) => (
                <option key={i} value={t(`contact.timeline_${i}`)} className="bg-background">
                  {t(`contact.timeline_${i}`)}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">{t('contact.message_label')}</label>
            <textarea
              {...register("message")}
              rows={4}
              className={inputClass + " resize-none"}
              placeholder={t('contact.message_placeholder')}
            />
            {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-lg shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:scale-100 disabled:cursor-not-allowed"
          >
            {isPending ? t('contact.sending') : t('contact.submit')}
            {!isPending && <Send className="w-5 h-5" />}
          </button>

        </form>
      </div>
    </section>
  );
}
