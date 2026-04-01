import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Locale = 'tk' | 'tr' | 'uz' | 'ru' | 'en';

type Translations = Record<string, any>;

const tk: Translations = {
  nav: {
    home: "Baş Sahypa",
    services: "Hyzmatlar",
    how: "Nähili Işleýäris",
    portfolio: "Portfolio",
    pricing: "Bahalar",
    contact: "Habarlaşmak",
    cta: "Habarlaş"
  },
  hero: {
    badge: "Türkmenistanyň №1 Web Agentligi",
    headline_1: "Işiňizi sanly",
    headline_2: "dünýäde çozduryň.",
    subheadline: "Biz diňe saýt döredemzok — müşderileriňizi özüne çekýän, ynamly we girdeji getirýän sanly tejribe döredýäris.",
    cta_primary: "Taslamaňyzy Başlaň",
    cta_secondary: "Portfoliony Gör",
    stats: {
      projects: "50+ Taslama",
      support: "24 Sagat Goldaw",
      languages: "5 Dil",
      guarantee: "100% Kepillik"
    }
  },
  pain: {
    headline: "Sizi näme narahat edýär?",
    bridge: "Bularyň hemmesine bir çözgüt bar.",
    bridge_highlight: "Ýeňil — ýeňil ýol bilen uly netije."
  },
  services: {
    headline: "Nähili hyzmat hödürleýäris?",
    sub: "Landing page döretmekden başlap, doly korporatiw portalara çenli — ählisini ederis."
  },
  stats: {
    headline: "Sanlar bilen gürlärlik",
    projects: "Taslama Tamamlanan",
    support: "Sagat Goldaw",
    languages: "Dil Goldawy",
    guarantee: "Kepillik Hili",
    why_badge: "Global Hilli, Ýerli Dilli",
    why_headline: "Näme üçin Ýeňil?",
    why_1_title: "Premium Hil",
    why_1_desc: "Dünýäniň iň ösen tehnologiýalary bilen gurýarys — Türkmenistana laýyk bahada.",
    why_2_title: "Çalt Eltip Berýäris",
    why_2_desc: "Adaty saýt 7-14 günde taýýar. Wagt — iň gymmatly baýlyk. Biz muny gowy bilýäris.",
    why_3_title: "Kepillik",
    why_3_desc: "Ähli taslamalarymyz üçin üýtgedip düzetmek kepilligi we tehniki goldaw berýäris."
  },
  showcase: {
    testimonials_headline: "Müşderilerimiz näme diýýär?",
    tech_headline: "Haýsy tehnologiýalar bilen işleýäris?"
  },
  portfolio: {
    badge: "Janly Demo Saýtlar",
    headline: "Hakyky Işlerimize Göz Aýlaň",
    sub: "Aşakdaky demo saýtlary biz tarapymyzdan döredilendir. Şuňa meňzeş saýt sargyt edip bilersiňiz.",
    cat_fitness: "Fitnes & Sport",
    cat_flowers: "Gül Dükan",
    cat_wedding: "Toý Salon",
    title_fitness: "Fitnes Club",
    title_flowers: "Gül Dükany",
    title_wedding: "Toý Mekan",
    desc_fitness: "Fitnes zaly üçin döredilen premium landing page. Sapaklary, bahalar bölümini, synlary we hasaba alyş formuny öz içine alýar.",
    desc_flowers: "Gül dükany üçin owadan we ykjam satuw saýty. Önümler katalogy, bron ulgamy we WhatsApp integrasiýasy bilen.",
    desc_wedding: "Toý mekan üçin luksus derejedäki saýt. Salon galereýasy, baha tablisasy we onlaýn goýum ulgamy.",
    fitness_feat1: "Sapak tertibi we baha sanawy",
    fitness_feat2: "Onlaýn hasaba alyş formy",
    fitness_feat3: "Tälimçiler we müşderi synlary",
    flowers_feat1: "Gül katalogy we süzgüç",
    flowers_feat2: "WhatsApp sargyt ulgamy",
    flowers_feat3: "Eltip bermek bölümi",
    wedding_feat1: "Premium galereýa we görüş zaly",
    wedding_feat2: "Meýilnama we baha tablisasy",
    wedding_feat3: "Onlaýn goýum we bron",
    starting_from: "Takmynan baha",
    usd: "dollar",
    view_demo: "Demo Saýty Gör",
    order_similar: "Şuňa meňzeşi Sargyt Et",
  },
  pricing: {
    headline: "Taslamaňyz üçin dogry paket saýlaň",
    sub: "Ähli bahalara 19% KDV goşulmaýar. Bahaňyz TMT-de hem hasaplanylyp biler (1$ = 19 TMT)",
    note: "1$ = 19 TMT hasaby bilen",
    popular: "Maslahat berilýär",
    cta_start: "Bu paketi saýlaň",
    cta_enterprise: "Biz bilen habarlaşyň",
    timeline: "Möhlet",
    included: "Goşulan",
    not_included: "Goşulmaýan",
    styles_headline: "Dizaýn stillerini saýlaň"
  },
  contact: {
    headline: "Taslamaňyzy başlalyň",
    sub: "Formy dolduryň — 6 sagadyň içinde jogap bereris",
    name: "Adyňyz",
    business: "Biznesingiziň ady",
    phone: "Telefon belgiňiz",
    email: "E-poçtaňyz",
    package: "Haýsy paket gyzyklandyrýar?",
    design_style: "Haýsy dizaýn stilini isleýärsiňiz?",
    existing_url: "Saýtyňyz bar bolsa, URL-ini ýazyň",
    industry: "Iş pudagyňyz",
    contact_method: "Habarlaşmak ýoly",
    message: "Taslamaňyz barada gysgaça ýazyň",
    message_placeholder: "Meselem: Restoran menýusy we bron ulgamy bolan saýt...",
    timeline_label: "Taslamaňyzyň takmynan möhleti",
    submit: "Habarlaşmak Talapnamasyny Iberiň",
    success_title: "Üstünlikli Iberildi!",
    success_msg: "Siziň ýüzlenmäňiz üstünlikli alyndy! Biz 6 sagadyň içinde siz bilen habarlaşarys.",
    error_msg: "Habar iberilende ýalňyşlyk ýüze çykdy. Gaýtadan synanşyň."
  },
  footer: {
    tagline: "Sanly dünýäde ýeňil ädim.",
    rights: "Ähli hukuklar goragly.",
    links: "Baglanyşyklar",
    social: "Sosial Ulgamlar",
    address: "Aşgabat, Türkmenistan"
  }
};

const tr: Translations = {
  nav: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    how: "Nasıl Çalışırız",
    pricing: "Fiyatlar",
    contact: "İletişim",
    cta: "İletişime Geç"
  },
  hero: {
    badge: "Türkmenistan'ın #1 Web Ajansı",
    headline_1: "İşinizi dijital",
    headline_2: "dünyada patlatın.",
    subheadline: "Sadece web sitesi yapmıyoruz — müşterilerinizi çeken, güven veren ve gelir getiren dijital deneyimler yaratıyoruz.",
    cta_primary: "Projenizi Başlatın",
    cta_secondary: "Portföyü Görün",
    stats: {
      projects: "50+ Proje",
      support: "24 Saat Destek",
      languages: "5 Dil",
      guarantee: "100% Garanti"
    }
  },
  pain: {
    headline: "Sizi ne rahatsız ediyor?",
    bridge: "Bunların hepsine tek bir çözüm var.",
    bridge_highlight: "Ýeňil — kolay yoldan büyük sonuçlar."
  },
  services: { headline: "Ne tür hizmet sunuyoruz?", sub: "Landing page'den kurumsal portallara kadar — hepsini yaparız." },
  stats: { headline: "Rakamlarla konuşalım", projects: "Tamamlanan Proje", support: "Saat Destek", languages: "Dil Desteği", guarantee: "Kalite Garantisi", why_badge: "Global Kalite, Yerel Dil", why_headline: "Neden Ýeňil?", why_1_title: "Premium Kalite", why_1_desc: "Dünyanın en gelişmiş teknolojileriyle Türkmenistan'a uygun fiyatlarla inşa ediyoruz.", why_2_title: "Hızlı Teslimat", why_2_desc: "Normal site 7-14 günde hazır. Zaman — en değerli varlık. Bunu çok iyi biliyoruz.", why_3_title: "Garanti", why_3_desc: "Tüm projelerimiz için revizyon garantisi ve teknik destek sunuyoruz." },
  showcase: { testimonials_headline: "Müşterilerimiz ne diyor?", tech_headline: "Hangi teknolojilerle çalışıyoruz?" },
  portfolio: { badge: "Canlı Demo Siteler", headline: "Gerçek İşlerimize Göz Atın", sub: "Aşağıdaki demo siteler tarafımızca oluşturulmuştur. Benzer bir site sipariş edebilirsiniz.", cat_fitness: "Fitness & Spor", cat_flowers: "Çiçekçi", cat_wedding: "Düğün Salonu", title_fitness: "Fitness Club", title_flowers: "Çiçek Dükkanı", title_wedding: "Düğün Mekanı", desc_fitness: "Spor salonu için premium landing page. Ders programı, fiyatlar, yorumlar ve kayıt formu içerir.", desc_flowers: "Çiçek dükkanı için şık ve hızlı satış sitesi. Ürün kataloğu, rezervasyon ve WhatsApp entegrasyonu.", desc_wedding: "Düğün mekanı için lüks web sitesi. Galeri, fiyat tablosu ve çevrimiçi rezervasyon.", fitness_feat1: "Ders programı ve fiyat listesi", fitness_feat2: "Çevrimiçi kayıt formu", fitness_feat3: "Antrenörler ve müşteri yorumları", flowers_feat1: "Çiçek kataloğu ve filtre", flowers_feat2: "WhatsApp sipariş sistemi", flowers_feat3: "Teslimat bölümü", wedding_feat1: "Premium galeri ve görsel tur", wedding_feat2: "Plan ve fiyat tablosu", wedding_feat3: "Çevrimiçi ön ödeme ve rezervasyon", starting_from: "Tahmini fiyat", usd: "dolar", view_demo: "Demo Siteyi Gör", order_similar: "Benzerini Sipariş Et" },
  pricing: { headline: "Projeniz için doğru paketi seçin", sub: "Tüm fiyatlara KDV dahil değildir. Fiyatınız TMT cinsinden de hesaplanabilir (1$ = 19 TMT)", note: "1$ = 19 TMT hesabıyla", popular: "Önerilir", cta_start: "Bu paketi seçin", cta_enterprise: "Bizimle iletişime geçin", timeline: "Süre", included: "Dahil", not_included: "Dahil Değil", styles_headline: "Tasarım stillerini seçin" },
  contact: { headline: "Projenizi başlatalım", sub: "Formu doldurun — 6 saat içinde yanıt vereceğiz", name: "Adınız", business: "İşletme adınız", phone: "Telefon numaranız", email: "E-postanız", package: "Hangi paket ilginizi çekiyor?", design_style: "Hangi tasarım stilini istiyorsunuz?", existing_url: "Siteniz varsa URL'ini yazın", industry: "İş sektörünüz", contact_method: "İletişim yöntemi", message: "Projeniz hakkında kısaca yazın", message_placeholder: "Örn: Restoran menüsü ve rezervasyon sistemi olan site...", timeline_label: "Projenizin tahmini süresi", submit: "İletişim Talebini Gönder", success_title: "Başarıyla Gönderildi!", success_msg: "Talebiniz başarıyla alındı! 6 saat içinde sizinle iletişime geçeceğiz.", error_msg: "Mesaj gönderilirken hata oluştu. Lütfen tekrar deneyin." },
  footer: { tagline: "Dijital dünyada kolay adım.", rights: "Tüm hakları saklıdır.", links: "Bağlantılar", social: "Sosyal Medya", address: "Aşgabat, Türkmenistan" }
};

const uz: Translations = {
  nav: { home: "Asosiy", services: "Xizmatlar", how: "Qanday Ishlaymiz", pricing: "Narxlar", contact: "Bog'lanish", cta: "Bog'laning" },
  hero: {
    badge: "Turkmanistonning №1 Web Agentligi",
    headline_1: "Biznesingizni raqamli",
    headline_2: "dunyoda portlating.",
    subheadline: "Biz faqat sayt yaratmaymiz — mijozlaringizni jalb qiladigan, ishonch va daromad keltiradigan raqamli tajriba yaratamiz.",
    cta_primary: "Loyihani Boshlang",
    cta_secondary: "Portfelni Ko'ring",
    stats: { projects: "50+ Loyiha", support: "24 Soat Qo'llab-quvvatlash", languages: "5 Til", guarantee: "100% Kafolat" }
  },
  pain: { headline: "Sizni nima bezovta qilmoqda?", bridge: "Bularning hammasiga bitta yechim bor.", bridge_highlight: "Ýeňil — oson yo'l bilan katta natijalar." },
  services: { headline: "Qanday xizmatlar taqdim etamiz?", sub: "Landing page dan to korporativ portallargacha — barchasini qilamiz." },
  stats: { headline: "Raqamlar bilan gaplashaylik", projects: "Tugallangan Loyiha", support: "Soat Qo'llab-quvvatlash", languages: "Til Qo'llab-quvvatlashi", guarantee: "Sifat Kafolati", why_badge: "Global Sifat, Mahalliy Til", why_headline: "Nima uchun Ýeňil?", why_1_title: "Premium Sifat", why_1_desc: "Dunyoning eng ilg'or texnologiyalari bilan quramiz — Turkmanistonga mos narxda.", why_2_title: "Tez Yetkazib Berish", why_2_desc: "Oddiy sayt 7-14 kunda tayyor. Vaqt — eng qimmatli boylik. Biz buni yaxshi bilamiz.", why_3_title: "Kafolat", why_3_desc: "Barcha loyihalar uchun tahrir kafolati va texnik yordam beramiz." },
  showcase: { testimonials_headline: "Mijozlarimiz nima deydi?", tech_headline: "Qanday texnologiyalar bilan ishlaymiz?" },
  portfolio: { badge: "Jonli Demo Saytlar", headline: "Haqiqiy Ishlarimizga Nazar Soling", sub: "Quyidagi demo saytlar bizning tomonimizdan yaratilgan. Shunga o'xshash sayt buyurtma qilishingiz mumkin.", cat_fitness: "Fitnes & Sport", cat_flowers: "Gul Do'koni", cat_wedding: "To'y Salon", title_fitness: "Fitnes Club", title_flowers: "Gul Do'koni", title_wedding: "To'y Makon", desc_fitness: "Sport zali uchun premium landing page. Dars jadvali, narxlar, sharhlar va ro'yxatdan o'tish formasi.", desc_flowers: "Gul do'koni uchun chiroyli va tez savdo sayti. Mahsulotlar katalogi, bron tizimi va WhatsApp integratsiyasi.", desc_wedding: "To'y makon uchun hashamatli sayt. Galereya, narx jadvali va onlayn to'lov tizimi.", fitness_feat1: "Dars jadvali va narx ro'yxati", fitness_feat2: "Onlayn ro'yxatdan o'tish formasi", fitness_feat3: "Murabbiylar va mijoz sharhlari", flowers_feat1: "Gul katalogi va filtr", flowers_feat2: "WhatsApp buyurtma tizimi", flowers_feat3: "Yetkazib berish bo'limi", wedding_feat1: "Premium galereya va ko'rgazma", wedding_feat2: "Reja va narx jadvali", wedding_feat3: "Onlayn oldindan to'lov va bron", starting_from: "Taxminiy narx", usd: "dollar", view_demo: "Demo Saytni Ko'ring", order_similar: "Shunga O'xshashini Buyurtma Qiling" },
  pricing: { headline: "Loyihangiz uchun to'g'ri paketni tanlang", sub: "Barcha narxlarga QQS qo'shilmaydi. Narxingizni TMT da ham hisoblash mumkin (1$ = 19 TMT)", note: "1$ = 19 TMT hisobi bilan", popular: "Tavsiya Etiladi", cta_start: "Bu paketni tanlang", cta_enterprise: "Biz bilan bog'laning", timeline: "Muddat", included: "Kiritilgan", not_included: "Kiritilmagan", styles_headline: "Dizayn uslublarini tanlang" },
  contact: { headline: "Loyihangizni boshlaymiz", sub: "Shaklni to'ldiring — 6 soat ichida javob beramiz", name: "Ismingiz", business: "Biznes nomingiz", phone: "Telefon raqamingiz", email: "E-pochtangiz", package: "Qaysi paket qiziqtiradi?", design_style: "Qaysi dizayn uslubini xohlaysiz?", existing_url: "Saytingiz bo'lsa, URL ni yozing", industry: "Ish sohangiz", contact_method: "Bog'lanish usuli", message: "Loyihangiz haqida qisqacha yozing", message_placeholder: "Masalan: Restoran menyusi va bron tizimi bo'lgan sayt...", timeline_label: "Loyihangizning taxminiy muddati", submit: "Murojaat Yuborish", success_title: "Muvaffaqiyatli Yuborildi!", success_msg: "Murojaatingiz muvaffaqiyatli qabul qilindi! 6 soat ichida siz bilan bog'lanamiz.", error_msg: "Xabar yuborishda xato yuz berdi. Qayta urinib ko'ring." },
  footer: { tagline: "Raqamli dunyoda oson qadam.", rights: "Barcha huquqlar himoyalangan.", links: "Havolalar", social: "Ijtimoiy Tarmoqlar", address: "Ashxobod, Turkmaniston" }
};

const ru: Translations = {
  nav: { home: "Главная", services: "Услуги", how: "Как мы работаем", pricing: "Цены", contact: "Контакты", cta: "Связаться" },
  hero: {
    badge: "Веб-агентство №1 в Туркменистане",
    headline_1: "Покорите цифровой",
    headline_2: "мир с нами.",
    subheadline: "Мы не просто создаём сайты — мы создаём цифровой опыт, который привлекает клиентов, вызывает доверие и приносит доход.",
    cta_primary: "Начать проект",
    cta_secondary: "Посмотреть портфолио",
    stats: { projects: "50+ проектов", support: "24 часа поддержки", languages: "5 языков", guarantee: "100% гарантия" }
  },
  pain: { headline: "Что вас беспокоит?", bridge: "Для всего этого есть одно решение.", bridge_highlight: "Ýeňil — большие результаты простым путём." },
  services: { headline: "Какие услуги мы предлагаем?", sub: "От лендингов до корпоративных порталов — сделаем всё." },
  stats: { headline: "Говорим цифрами", projects: "Завершённых проектов", support: "Часов поддержки", languages: "Языков поддержки", guarantee: "Гарантия качества", why_badge: "Глобальное качество, местный язык", why_headline: "Почему Ýeňil?", why_1_title: "Премиум качество", why_1_desc: "Строим с использованием самых передовых технологий мира — по ценам, доступным в Туркменистане.", why_2_title: "Быстрая доставка", why_2_desc: "Обычный сайт готов за 7-14 дней. Время — самый ценный ресурс. Мы это знаем.", why_3_title: "Гарантия", why_3_desc: "Для всех проектов предоставляем гарантию доработок и техническую поддержку." },
  showcase: { testimonials_headline: "Что говорят наши клиенты?", tech_headline: "С какими технологиями мы работаем?" },
  portfolio: { badge: "Живые Демо Сайты", headline: "Посмотрите Наши Реальные Работы", sub: "Демо-сайты ниже созданы нами. Вы можете заказать похожий сайт для своего бизнеса.", cat_fitness: "Фитнес & Спорт", cat_flowers: "Цветочный магазин", cat_wedding: "Свадебный салон", title_fitness: "Фитнес Клуб", title_flowers: "Цветочный магазин", title_wedding: "Свадебный зал", desc_fitness: "Премиум лендинг для спортзала. Расписание занятий, прайс, отзывы и форма записи.", desc_flowers: "Красивый интернет-магазин для цветочного бизнеса. Каталог, бронирование и интеграция с WhatsApp.", desc_wedding: "Люксовый сайт для свадебного зала. Галерея, прайс и онлайн бронирование.", fitness_feat1: "Расписание и прайс-лист", fitness_feat2: "Онлайн форма записи", fitness_feat3: "Тренеры и отзывы клиентов", flowers_feat1: "Каталог цветов и фильтры", flowers_feat2: "Система заказов через WhatsApp", flowers_feat3: "Раздел с доставкой", wedding_feat1: "Премиум галерея и тур", wedding_feat2: "План зала и прайс", wedding_feat3: "Онлайн предоплата и бронь", starting_from: "Примерная стоимость", usd: "долларов", view_demo: "Посмотреть демо", order_similar: "Заказать похожий" },
  pricing: { headline: "Выберите подходящий пакет для вашего проекта", sub: "Все цены без НДС. Цена также может быть рассчитана в TMT (1$ = 19 TMT)", note: "По курсу 1$ = 19 TMT", popular: "Рекомендуется", cta_start: "Выбрать этот пакет", cta_enterprise: "Связаться с нами", timeline: "Сроки", included: "Включено", not_included: "Не включено", styles_headline: "Выберите стиль дизайна" },
  contact: { headline: "Начнём ваш проект", sub: "Заполните форму — ответим в течение 6 часов", name: "Ваше имя", business: "Название бизнеса", phone: "Номер телефона", email: "Электронная почта", package: "Какой пакет вас интересует?", design_style: "Какой стиль дизайна хотите?", existing_url: "Если есть сайт, укажите URL", industry: "Сфера деятельности", contact_method: "Способ связи", message: "Кратко опишите ваш проект", message_placeholder: "Например: Сайт с меню ресторана и системой бронирования...", timeline_label: "Примерные сроки проекта", submit: "Отправить заявку", success_title: "Успешно отправлено!", success_msg: "Ваша заявка успешно получена! Мы свяжемся с вами в течение 6 часов.", error_msg: "Ошибка при отправке сообщения. Пожалуйста, попробуйте снова." },
  footer: { tagline: "Лёгкий шаг в цифровой мир.", rights: "Все права защищены.", links: "Ссылки", social: "Социальные сети", address: "Ашхабад, Туркменистан" }
};

const en: Translations = {
  nav: { home: "Home", services: "Services", how: "How We Work", pricing: "Pricing", contact: "Contact", cta: "Contact Us" },
  hero: {
    badge: "Turkmenistan's #1 Web Agency",
    headline_1: "Dominate the",
    headline_2: "digital world.",
    subheadline: "We don't just build websites — we create digital experiences that attract clients, build trust, and drive revenue.",
    cta_primary: "Start Your Project",
    cta_secondary: "View Portfolio",
    stats: { projects: "50+ Projects", support: "24h Support", languages: "5 Languages", guarantee: "100% Guarantee" }
  },
  pain: { headline: "What's holding you back?", bridge: "There is one solution to all of this.", bridge_highlight: "Ýeňil — big results the easy way." },
  services: { headline: "What services do we offer?", sub: "From landing pages to full corporate portals — we do it all." },
  stats: { headline: "Let the numbers speak", projects: "Projects Completed", support: "Hour Support", languages: "Language Support", guarantee: "Quality Guarantee", why_badge: "Global Quality, Local Language", why_headline: "Why Ýeňil?", why_1_title: "Premium Quality", why_1_desc: "We build with the world's most advanced technologies — at prices that make sense for Turkmenistan.", why_2_title: "Fast Delivery", why_2_desc: "A standard site is ready in 7-14 days. Time is the most valuable asset. We know this well.", why_3_title: "Guarantee", why_3_desc: "All projects come with a revision guarantee and ongoing technical support." },
  showcase: { testimonials_headline: "What our clients say?", tech_headline: "What technologies do we work with?" },
  portfolio: { badge: "Live Demo Sites", headline: "See Our Real Work", sub: "The demo sites below were built by us. You can order a similar site for your business.", cat_fitness: "Fitness & Sport", cat_flowers: "Flower Shop", cat_wedding: "Wedding Venue", title_fitness: "Fitness Club", title_flowers: "Flower Shop", title_wedding: "Wedding Venue", desc_fitness: "Premium landing page for a gym. Includes class schedule, pricing, reviews and registration form.", desc_flowers: "Beautiful e-commerce site for a flower business. Product catalogue, booking and WhatsApp integration.", desc_wedding: "Luxury website for a wedding hall. Gallery, pricing table and online reservation system.", fitness_feat1: "Class schedule and pricing list", fitness_feat2: "Online registration form", fitness_feat3: "Trainers and client reviews", flowers_feat1: "Flower catalogue with filters", flowers_feat2: "WhatsApp order system", flowers_feat3: "Delivery section", wedding_feat1: "Premium gallery and visual tour", wedding_feat2: "Hall plan and pricing table", wedding_feat3: "Online deposit and reservation", starting_from: "Starting from", usd: "USD", view_demo: "View Live Demo", order_similar: "Order a Similar One" },
  pricing: { headline: "Choose the right package for your project", sub: "All prices exclude VAT. Price can also be calculated in TMT (1$ = 19 TMT)", note: "At 1$ = 19 TMT", popular: "Recommended", cta_start: "Choose this package", cta_enterprise: "Contact us", timeline: "Timeline", included: "Included", not_included: "Not included", styles_headline: "Choose a design style" },
  contact: { headline: "Let's start your project", sub: "Fill the form — we'll respond within 6 hours", name: "Your name", business: "Business name", phone: "Phone number", email: "Email address", package: "Which package interests you?", design_style: "Which design style do you want?", existing_url: "If you have a site, enter URL", industry: "Your industry", contact_method: "Contact method", message: "Briefly describe your project", message_placeholder: "E.g.: A site with a restaurant menu and booking system...", timeline_label: "Estimated project timeline", submit: "Send Contact Request", success_title: "Successfully Sent!", success_msg: "Your request has been successfully received! We'll contact you within 6 hours.", error_msg: "Error sending message. Please try again." },
  footer: { tagline: "An easy step into the digital world.", rights: "All rights reserved.", links: "Links", social: "Social Media", address: "Ashgabat, Turkmenistan" }
};

const translations: Record<Locale, Translations> = { tk, tr, uz, ru, en };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('tk');

  useEffect(() => {
    const saved = localStorage.getItem('yenil_locale') as Locale;
    if (saved && Object.keys(translations).includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('yenil_locale', newLocale);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[locale] || translations.tk;
    for (const key of keys) {
      if (current === undefined || current === null) break;
      if (current[key] === undefined) {
        let fallback: any = translations.tk;
        for (const fbKey of keys) {
          if (fallback === undefined || fallback === null) return path;
          fallback = fallback[fbKey];
        }
        return typeof fallback === 'string' ? fallback : path;
      }
      current = current[key];
    }
    return typeof current === 'string' ? current : path;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useTranslation must be used within an I18nProvider");
  return context;
}
