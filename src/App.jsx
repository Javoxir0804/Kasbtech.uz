import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  UserCheck,
  ShieldAlert,
  Send,
  Phone,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  GraduationCap,
  Shield,
  Zap,
  Target,
  Users,
  FileCheck,
  Building2,
  X,
  Maximize2,
  Check,
  Sparkle,
  Gift,
  FileText,
  AlertTriangle,
  Info,
  Menu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Modal states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('AI "VIBE CODING" (14 kun)');
  const [lightboxImage, setLightboxImage] = useState(null);

  // Hero Course Carousel States
  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userCategory, setUserCategory] = useState('unemployed'); // unemployed, student, other
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculator states
  const [calcStatus, setCalcStatus] = useState('unemployed');
  const [calcCourse, setCalcCourse] = useState('vibe');

  // Countdown timer for Grant seats
  const [timeLeft, setTimeLeft] = useState({ hours: 18, minutes: 42, seconds: 15 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate Hero Carousel every 3.5 seconds (pauses on hover/touch)
  useEffect(() => {
    if (isCarouselPaused) return;
    const carouselInterval = setInterval(() => {
      setHeroCarouselIndex(prev => (prev + 1) % coursesList.length);
    }, 3500);
    return () => clearInterval(carouselInterval);
  }, [isCarouselPaused]);

  // Open modal pre-selected course
  const handleOpenRegister = (courseName) => {
    if (courseName) setSelectedCourse(courseName);
    setFormSubmitted(false);
    setIsRegisterModalOpen(true);
  };

  // Submit registration form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Format text for Telegram message
    const categoryText =
      userCategory === 'unemployed'
        ? 'Band bo\'lmagan fuqaro (100% TEKIN Grant)'
        : userCategory === 'student'
        ? 'Talaba / O\'quvchi (20% Chegirma)'
        : 'Boshqa';

    const timeString = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

    const rawMessage =
      `🚀 <b>KASBTECH AKADEMIYASI - YANGI ARIZA!</b>\n\n` +
      `👤 <b>Ism:</b> ${fullName}\n` +
      `📞 <b>Telefon:</b> ${phoneNumber}\n` +
      `📚 <b>Tanlangan Kurs:</b> ${selectedCourse}\n` +
      `🎓 <b>Maqomi:</b> ${categoryText}\n` +
      `⏰ <b>Vaqt:</b> ${timeString}`;

    // Telegram Bot Integration (@Kasbtechlidbot)
    const BOT_TOKEN = '8617319521:AAHSEZcxPr_ffUMIY3EuAMwq2MSCeMC_-hc';
    const CHAT_IDS = [
      '-1004429735550', // Kasbtech Akademiyasi hodimlari group
      '6331803768',     // Javoxir Aliyev
      '8309099086',     // Kasbtech Admin
      import.meta.env.VITE_TELEGRAM_CHAT_ID
    ].filter(Boolean);

    // Send lead to Telegram Bot API (All chats simultaneously in background)
    for (const chatId of CHAT_IDS) {
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: rawMessage,
            parse_mode: 'HTML'
          })
        });
      } catch (err) {
        console.error('Telegram bot send error:', err);
      }
    }
  };

  const coursesList = [
    {
      id: 'marketing',
      title: 'AI + Digital Marketing',
      duration: '30 kun',
      badge: 'SOTUVLARNI PORTLATISH',
      mentor: 'Javoxir Aliyev',
      mentorRole: 'Kasbtech Akademiyasi Direktori & Lead Marketing Mentor',
      grantEligible: true,
      poster: '/ai_marketing_poster.jpg',
      detailUrl: 'https://t.me/kasbtech_akademiyasi/21',
      description: '"Targeting" va zamonaviy reklama strategiyalari hamda AI neyrotarmoqlari yordamida biznesda sotuvlarni oshirish sirlari!',
      highlights: [
        '"Targeting" va zamonaviy reklama strategiyalari',
        'AI neyrotarmoqlari yordamida target va kontent yaratish',
        'Sotuv voronkalari (sales funnel) va avtomatlashtirish',
        '30 kunlik faqat amaliyotga asoslangan darslar'
      ],
      color: 'from-amber-500 to-red-600'
    },
    {
      id: 'vibe',
      title: 'AI (Sun’iy Intellekt) & Vibe Coding',
      duration: '14 kun',
      badge: '100% AI YORDAMIDA',
      mentor: 'Javoxir Aliyev',
      mentorRole: 'Kasbtech Akademiyasi Direktori & Lead AI Mentor',
      grantEligible: true,
      poster: '/vibe_coding_poster.jpg',
      detailUrl: null,
      description: 'Kuchli sun’iy intellekt vositalaridan foydalanish hamda dasturlashni bilmasdan turib AI orqali dasturlar va vebsaytlar yaratish!',
      highlights: [
        'Kuchli sun’iy intellekt vositalaridan foydalanish',
        'To\'g\'ridan-to\'g\'ri AI bilan vebsayt & app yaratish',
        'Frontend va backendni no-code/vibe coding orqali qurish',
        '14 kunlik intensiv amaliy mashg\'ulotlar'
      ],
      color: 'from-rose-600 to-red-700'
    },
    {
      id: 'smm',
      title: 'SMM (Social Media Marketing)',
      duration: '30 kun',
      badge: 'SAMARALI MARKETING',
      mentor: 'Kasbtech SMM Team',
      mentorRole: 'Ijtimoiy Tarmoqlar Bo\'yicha Mutaxassislar',
      grantEligible: true,
      poster: null,
      detailUrl: null,
      description: 'Ijtimoiy tarmoqlarda (Instagram, Telegram, TikTok) samarali marketing va brendlarni organik rivojlantirish.',
      highlights: [
        'Ijtimoiy tarmoqlarda samarali marketing',
        'Mobilografiya va visual kontent yaratish',
        'Kopirayting va jalb qiluvchi postlar tayyorlash',
        'Kanal va sahifalarni o\'stirish strategiyasi'
      ],
      color: 'from-purple-600 to-pink-600'
    },
    {
      id: 'cyber',
      title: 'Kiberxavfsizlik',
      duration: '6 oy',
      badge: 'ENG TALABGIR SOHA',
      mentor: 'Kasbtech Cyber Security Team',
      mentorRole: 'Xalqaro Darajadagi Kiberxavfsizlik Ekspertlari',
      grantEligible: true,
      poster: null,
      detailUrl: null,
      description: 'Ma\'lumotlarni himoya qilish, kiberhujumlardan saqlanish va xavfsizlik tizimlarini professional ta\'minlash.',
      highlights: [
        'Ma\'lumotlarni himoya qilish va xavfsizlik tizimlari',
        'Tizimlar va tarmoqlar xavfsizligini audit qilish',
        'Etik hakerlik (Ethical Hacking) va zaifliklarni topish',
        '6 oylik to\'liq professional tayyorgarlik'
      ],
      color: 'from-blue-600 to-indigo-700'
    },
    {
      id: 'comp',
      title: 'Kompyuter Savodxonligi',
      duration: '30 kun',
      badge: 'MUSTAHKAM BAZA',
      mentor: 'Isoqov Atham',
      mentorRole: 'Kompyuter Savodxonligi Bo\'yicha Katta Ustoz',
      grantEligible: true,
      poster: null,
      detailUrl: null,
      description: 'Zamonaviy texnologiyalarni chuqur o‘zlashtirish, Windows, MS Office, AI vositalari va internet xavfsizligini noldan o\'rganish.',
      highlights: [
        'Zamonaviy texnologiyalarni chuqur o‘zlashtirish',
        'MS Word, Excel, PowerPoint mukammal o\'rganish',
        'Internetda samarali va xavfsiz ishlash ko\'nikmalari',
        '30 kunlik noldan boshlanuvchi darslar'
      ],
      color: 'from-emerald-600 to-teal-700'
    }
  ];

  const faqs = [
    {
      q: 'Davlat granti (100% BEPUL) asosida o\'qish shartlari qanday?',
      a: 'Rasmiy band bo\'lmagan fuqarolar uchun barcha kurslarimiz Davlat granti asosida 100% TEKIN. Buning uchun ro\'yxatdan o\'tib, mezonlarga mosligingizni tasdiqlashingiz yetarli.'
    },
    {
      q: 'Talaba yoki o\'quvchi bo\'lsam, chegirma bormi?',
      a: 'Ha! Barcha maktab o\'quvchilari hamda OTM talabalariga 20% maxsus chegirma taqdim etiladi.'
    },
    {
      q: 'Darslar qanday tartibda o\'tiladi?',
      a: 'Darslarimiz haftada 6 kun, intensiv tartibda va 100% amaliyotga yo\'naltirilgan holda olib boriladi.'
    },
    {
      q: 'Kurs yakunida nima beriladi?',
      a: 'Kursni muvaffaqiyatli tamomlagach, rasmiy Sertifikat taqdim etiladi hamda ish topishingizga amaliy ko\'mak beriladi.'
    },
    {
      q: 'Dasturlash bilimi bo\'lmaganlar AI "VIBE CODING" kursida o\'qiy oladimi?',
      a: 'Ha! "VIBE CODING" kursi aynan kod yozishni bilmaydiganlar uchun mo\'ljallangan. Sun\'iy intellekt sizga kodni o\'zi yozib beradi, siz esa uni boshqarishni o\'rganasiz.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 relative">

      {/* 3D BACKGROUND GLOW DECORATIONS & MESH */}
      <div className="fixed inset-0 grid-3d-mesh opacity-20 pointer-events-none z-0" />
      <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[550px] h-[550px] bg-red-600/15 rounded-full blur-[140px] floating-3d-orb pointer-events-none z-0" />
      <div className="fixed top-1/3 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] floating-3d-orb pointer-events-none z-0" />
      <div className="fixed bottom-10 left-1/3 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[180px] floating-3d-orb pointer-events-none z-0" />

      {/* STICKY HEADER & NAVBAR CONTAINER */}
      <header className="sticky top-0 z-50 glass-nav transition-all duration-300 shadow-2xl shadow-black/80">
        
        {/* TOP ANNOUNCEMENT BAR */}
        <div className="bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 text-white text-[11px] sm:text-xs font-semibold py-1 sm:py-1.5 px-2 sm:px-3 text-center shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-1.5 sm:gap-2 leading-tight">
            <span className="bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs uppercase tracking-wider font-extrabold animate-pulse shrink-0">🔥 QABUL OCHIQ</span>
            <span className="font-medium hidden sm:inline">Rasmiy band bo'lmagan fuqarolarga 100% DAVLAT GRANTI!</span>
            <span className="font-medium sm:hidden text-[10px]">100% DAVLAT GRANTI!</span>
            <span className="hidden md:inline-block text-white/50">•</span>
            <span className="text-amber-200 font-medium hidden sm:inline-block">Kvotalar cheklangan:</span>
            <div className="inline-flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md font-mono text-amber-300 text-[10px] sm:text-[11px] border border-amber-500/30 shrink-0">
              <span>{String(timeLeft.hours).padStart(2, '0')}h</span>:
              <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>:
              <span>{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>

        {/* MAIN NAVBAR */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20 gap-2">
            
            {/* LOGO */}
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1">
                  <span className="font-black text-sm sm:text-lg tracking-tight text-white">KASBTECH</span>
                  <span className="text-[8px] sm:text-[10px] px-1 py-0.5 rounded bg-red-950/90 text-rose-400 border border-red-800/60 font-bold uppercase tracking-wider shrink-0">AKADEMIYASI</span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium hidden sm:block">Zamonaviy Kasblar Akademiyasi</span>
              </div>
            </a>

            {/* NAV LINKS (Visible on LG viewports 1024px+) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-semibold text-slate-300 shrink-0">
              <a href="#kurslar" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">Kurslarimiz</a>
              <a href="#grant" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-rose-400 transition-all flex items-center gap-1">
                <span>Davlat Granti</span>
                <span className="px-1.5 py-0.2 rounded bg-red-950 text-rose-400 text-[9px] font-bold border border-red-800/60">100%</span>
              </a>
              <a href="#vaucher" className="px-3 py-1.5 rounded-lg hover:bg-emerald-950/50 text-emerald-400 font-bold flex items-center gap-1.5 transition-all">
                <FileText className="w-3.5 h-3.5" />
                <span>Vaucher Qo'llanmasi</span>
              </a>
              <a href="#afzalliklar" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">Nima Uchun Biz?</a>
              <a href="#ustozlar" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">Ustozlar</a>
              <a href="#faq" className="px-3 py-1.5 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all">FAQ</a>
            </nav>

            {/* HEADER ACTIONS */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href="tel:+998872647171"
                className="hidden 2xl:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 border border-emerald-800/80 text-xs font-bold text-emerald-400 transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+998-87-264-71-71</span>
              </a>

              <a
                href="https://t.me/kasbtech_akademiyasi"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-xs font-semibold text-sky-400 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden md:inline">Telegram</span>
              </a>

              <button
                onClick={() => handleOpenRegister()}
                className="flex items-center gap-1 px-2.5 py-1.5 sm:px-4 sm:py-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-[11px] sm:text-xs shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shimmer-btn shrink-0"
              >
                <span className="hidden xs:inline sm:inline">Ro'yxatdan O'tish</span>
                <span className="xs:hidden sm:hidden">Yozilish</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </button>

              {/* HAMBURGER BUTTON FOR SCREENS < 1024px (lg:hidden) */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700 transition-colors shrink-0"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE & TABLET NAVIGATION DRAWER */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#090d16]/98 border-t border-slate-800/90 px-4 pt-4 pb-6 space-y-4 animate-slide-down shadow-2xl backdrop-blur-2xl">
            <nav className="flex flex-col space-y-2 font-semibold text-slate-200 text-sm">
              <a
                href="#kurslar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>📚 Kurslarimiz</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href="#grant"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between text-rose-300 font-bold"
              >
                <span className="flex items-center gap-2">🎁 Davlat Granti <span className="text-[10px] bg-red-950 text-rose-400 px-2 py-0.5 rounded border border-red-800">100% BEPUL</span></span>
                <ChevronRight className="w-4 h-4 text-rose-400" />
              </a>

              <a
                href="#vaucher"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 font-bold hover:bg-emerald-950/60 transition-colors flex items-center justify-between"
              >
                <span className="flex items-center gap-2"><FileText className="w-4 h-4" /> 📌 Vaucher Qo'llanmasi</span>
                <ChevronRight className="w-4 h-4 text-emerald-500" />
              </a>

              <a
                href="#afzalliklar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>🌟 Nima Uchun Biz?</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href="#ustozlar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>👨‍🏫 Ustozlarimiz</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>

              <a
                href="#faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <span>❓ FAQ (Savollar)</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            </nav>

            <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
              <a
                href="tel:+998872647171"
                className="w-full py-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+998-87-264-71-71 (Qo'ng'iroq qilish)</span>
              </a>

              <a
                href="https://t.me/kasbtech_akademiyasi"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-sky-950/80 border border-sky-800 text-sky-400 font-bold text-xs flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram Kanal (@kasbtech_akademiyasi)</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenRegister();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30 shimmer-btn"
              >
                <span>Ro'yxatdan O'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 md:pt-20 md:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* HERO LEFT TEXT */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-card border-red-500/30 text-rose-300 text-[11px] sm:text-xs md:text-sm font-semibold max-w-full">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping shrink-0" />
                <span className="truncate">🎉 KASBTECH AKADEMIYASIDAN AJOYIB IMKONIYAT!</span>
              </div>

              <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.2] sm:leading-[1.15]">
                Kasbtech Akademiyasidan <br />
                <span className="gradient-text-red">Ajoyib Imkoniyat!</span> 🎁
              </h1>

              <p className="text-slate-200 text-sm sm:text-xl font-medium leading-relaxed max-w-2xl">
                Agar siz rasmiy band bo‘lmasangiz, <span className="gradient-text-gold font-extrabold text-lg sm:text-2xl">50% dan 100% gacha</span> bo‘lgan grantga ega bo‘lishingiz mumkin!
              </p>

              {/* QUICK KEY BENEFITS BULLETS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-slate-800">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">100% Davlat Granti</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400">Band bo'lmagan fuqarolarga tekin</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-slate-800">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Haftada 6 Kun Intensiv</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400">Faqat amaliyot va loyihalar</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-slate-800">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Rasmiy Sertifikat</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400">Natija kafolati beriladi</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 glass-card p-3 rounded-xl border-slate-800">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                    <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">Ishga Joylashishga Yordam</h4>
                    <p className="text-[10px] sm:text-xs text-slate-400">Amaliy ko'mak beriladi</p>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={() => handleOpenRegister()}
                  className="shimmer-btn px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-red-600/40 hover:shadow-red-600/60 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 animate-spin-slow shrink-0" />
                  <span>HOZIR RO'YXATDAN O'TING</span>
                </button>

                <a
                  href="https://t.me/kasbtech_admin"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl glass-card hover:bg-slate-800/80 border-slate-700 text-slate-200 font-bold text-xs sm:text-base hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0" />
                  <span> Telegram Admin (@kasbtech_admin)</span>
                </a>
              </div>

            </div>

            {/* HERO RIGHT CARD / AUTO-ROTATING SWIPEABLE CAROUSEL */}
            <div className="lg:col-span-5">
              <div 
                onMouseEnter={() => setIsCarouselPaused(true)}
                onMouseLeave={() => setIsCarouselPaused(false)}
                onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                onTouchEnd={(e) => {
                  if (!touchStartX) return;
                  const endX = e.changedTouches[0].clientX;
                  const diff = touchStartX - endX;
                  // Only treat as swipe if user dragged finger more than 40px
                  if (diff > 40) {
                    setHeroCarouselIndex((prev) => (prev + 1) % coursesList.length);
                  } else if (diff < -40) {
                    setHeroCarouselIndex((prev) => (prev - 1 + coursesList.length) % coursesList.length);
                  }
                  setTouchStartX(0);
                }}
                className="relative glass-card p-4 sm:p-6 rounded-3xl border-red-500/30 shadow-2xl shadow-red-950/50 gradient-border-red tilt-card-3d glowing-border-animated select-none"
              >
                
                {/* FLOATING 3D BADGE */}
                <div className="absolute -top-3.5 right-2 sm:-right-2 bg-gradient-to-r from-amber-400 via-amber-500 to-red-600 text-slate-950 font-black text-[10px] sm:text-xs px-3 py-1 sm:px-4 sm:py-1.5 rounded-full shadow-xl transform rotate-2 sm:rotate-3 flex items-center gap-1 floating-3d-orb z-20 pointer-events-none">
                  <Gift className="w-3.5 h-3.5 text-slate-950 animate-bounce" />
                  <span>100% DAVLAT GRANTI</span>
                </div>

                <div className="space-y-4">
                  
                  {/* CAROUSEL HEADER */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Top Kurslarimiz</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-800 text-red-400 border border-slate-700">
                        {heroCarouselIndex + 1} / {coursesList.length}
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs bg-red-950 text-red-400 px-2.5 py-1 rounded-full border border-red-800/50 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span>2026 Qabul</span>
                    </span>
                  </div>

                  {/* CAROUSEL ACTIVE SLIDE DISPLAY */}
                  {(() => {
                    const current = coursesList[heroCarouselIndex];
                    return (
                      <div className="relative group rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-xl transition-all flex flex-col justify-between">
                        
                        {/* PREV MANUAL ARROW BUTTON */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setHeroCarouselIndex((prev) => (prev - 1 + coursesList.length) % coursesList.length);
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setHeroCarouselIndex((prev) => (prev - 1 + coursesList.length) % coursesList.length);
                          }}
                          className="absolute left-2.5 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-red-600 text-white backdrop-blur-lg border border-slate-700/80 transition-all opacity-95 hover:opacity-100 hover:scale-110 active:scale-90 shadow-2xl cursor-pointer"
                          aria-label="Oldingi kurs"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* NEXT MANUAL ARROW BUTTON */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setHeroCarouselIndex((prev) => (prev + 1) % coursesList.length);
                          }}
                          onTouchEnd={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setHeroCarouselIndex((prev) => (prev + 1) % coursesList.length);
                          }}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3 rounded-full bg-slate-900/90 hover:bg-red-600 text-white backdrop-blur-lg border border-slate-700/80 transition-all opacity-95 hover:opacity-100 hover:scale-110 active:scale-90 shadow-2xl cursor-pointer"
                          aria-label="Keyingi kurs"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* POSTER IMAGE OR CUSTOM HIGH-TECH GRAPHIC CARD */}
                        {current.poster ? (
                          <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-950 flex items-center justify-center p-2">
                            <img
                              src={current.poster}
                              alt={current.title}
                              className="w-full h-full object-contain rounded-xl shadow-lg"
                            />
                            
                            {/* DEDICATED ZOOM LIGHTBOX BUTTON */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setLightboxImage(current.poster);
                              }}
                              className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-red-600 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-lg"
                              title="Kattalashtirib ko'rish"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Kattalashtirish</span>
                            </button>

                            <div className="absolute bottom-2 left-2 right-2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent p-3 rounded-b-xl flex items-center justify-between pointer-events-none">
                              <span className="text-[10px] font-black bg-red-600 text-white px-2.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                                {current.badge}
                              </span>
                              <span className="text-xs text-amber-400 font-extrabold bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-md">
                                ⏳ {current.duration}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div 
                            className={`w-full h-[320px] sm:h-[380px] p-6 flex flex-col justify-between bg-gradient-to-br ${current.color} relative overflow-hidden group/card rounded-2xl`}
                          >
                            <div className="absolute inset-0 grid-3d-mesh opacity-30 pointer-events-none" />
                            <div className="relative z-10 space-y-3 pointer-events-none">
                              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-xs font-extrabold text-white border border-white/20 uppercase tracking-wider">
                                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                <span>{current.badge}</span>
                              </div>
                              <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
                                {current.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                                {current.description}
                              </p>
                            </div>

                            <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between">
                              <div>
                                <span className="text-[10px] text-white/80 uppercase tracking-wider block">Davomiyligi:</span>
                                <span className="text-base font-black text-amber-300">{current.duration}</span>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenRegister(current.title);
                                }}
                                className="px-4 py-2 rounded-xl bg-white text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                              >
                                Kursga Yozilish →
                              </button>
                            </div>
                          </div>
                        )}

                      </div>
                    );
                  })()}

                  {/* CAROUSEL PAGINATION DOT INDICATORS */}
                  <div className="flex items-center justify-center gap-1.5 pt-1">
                    {coursesList.map((course, idx) => (
                      <button
                        key={course.id}
                        type="button"
                        onClick={() => setHeroCarouselIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === heroCarouselIndex
                            ? 'w-7 bg-gradient-to-r from-red-500 to-rose-600 shadow-md shadow-red-500/50'
                            : 'w-2 bg-slate-800 hover:bg-slate-700'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* ACTIVE COURSE QUICK STATS */}
                  {(() => {
                    const activeCourse = coursesList[heroCarouselIndex];
                    return (
                      <div className="bg-slate-900/90 p-3.5 sm:p-4 rounded-2xl border border-slate-800/80 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Tanlangan Kurs:</span>
                          <span className="font-extrabold text-white truncate max-w-[200px]">{activeCourse.title}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Dars Formati:</span>
                          <span className="font-bold text-white">Haftada 6 Kun (Intensiv)</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Band Fuqarolarga:</span>
                          <span className="font-extrabold text-emerald-400">100% TEKIN (Grant)</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Talaba / O'quvchilarga:</span>
                          <span className="font-extrabold text-amber-400">20% CHEGIRMA</span>
                        </div>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => handleOpenRegister(coursesList[heroCarouselIndex].title)}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{coursesList[heroCarouselIndex].title} Joyni Band Qilish</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="py-10 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-rose-500">100%</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Davlat Granti</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-amber-400">6 KUN</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Haftalik Intensiv Darslar</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-sky-400">20%</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Talabalar Chegirmasi</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">KAFOLAT</p>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Sertifikat & Ishga Ko'mak</p>
            </div>

          </div>
        </div>
      </section>

      {/* GRANT & DISCOUNT CALCULATOR WIDGET */}
      <section id="grant" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-rose-950 border border-rose-800/60 text-rose-400 text-xs font-bold uppercase tracking-wider">
              🎁 Imtiyoz Tekshirish
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Sizga Qanday <span className="gradient-text-red">Imtiyoz</span> Tog'ri Keladi?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
              Maqomingizni tanlang va Davlat granti yoki chegirmangiz miqdorini darhol aniqlang.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-10 rounded-3xl border-slate-800 space-y-8 shadow-2xl">
            
            {/* QUESTION 1 */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">1</span>
                <span>Hozirgi bandlik holatingiz:</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setCalcStatus('unemployed')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    calcStatus === 'unemployed'
                      ? 'bg-red-950/70 border-red-500 text-white shadow-lg shadow-red-950/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Rasmiy Band Emasman</span>
                    {calcStatus === 'unemployed' && <Check className="w-4 h-4 text-red-500" />}
                  </div>
                  <span className="text-xs text-slate-400">Ishsiz / Rasmiy ish joyiga ega bo'lmagan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcStatus('student')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    calcStatus === 'student'
                      ? 'bg-amber-950/70 border-amber-500 text-white shadow-lg shadow-amber-950/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Talaba / O'quvchi</span>
                    {calcStatus === 'student' && <Check className="w-4 h-4 text-amber-500" />}
                  </div>
                  <span className="text-xs text-slate-400">OTM talabasi yoki maktab/litsey o'quvchisi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCalcStatus('other')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    calcStatus === 'other'
                      ? 'bg-blue-950/70 border-blue-500 text-white shadow-lg shadow-blue-950/50'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm">Boshqa</span>
                    {calcStatus === 'other' && <Check className="w-4 h-4 text-blue-500" />}
                  </div>
                  <span className="text-xs text-slate-400">Rasmiy ishlayman / Biznes egasiman</span>
                </button>
              </div>
            </div>

            {/* QUESTION 2 */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-black">2</span>
                <span>Sizni qaysi kurs ko'proq qiziqtiradi?</span>
              </label>

              <select
                value={calcCourse}
                onChange={(e) => setCalcCourse(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white font-medium focus:border-red-500 focus:outline-none"
              >
                <option value="vibe">🚀 AI "VIBE CODING" (14 kun)</option>
                <option value="marketing">📈 AI + Digital Marketing (30 kun)</option>
                <option value="cyber">🛡️ Kiberxavfsizlik (6 oy)</option>
                <option value="comp">💻 Kompyuter Savodxonligi (30 kun)</option>
              </select>
            </div>

            {/* GRANT ELIGIBILITY CRITERIA CHECKLIST */}
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-4 text-left">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-red-500" />
                <span>🎯 Grant Kimlarga Beriladi? (50% dan 100% gacha TEKIN)</span>
              </h3>
              <p className="text-xs text-slate-300">
                Quyidagi shartlarga javob beradigan fuqarolar grantdan foydalanish huquqiga ega va xohlagan kursimizni <strong className="text-emerald-400">MUTLAQO BEPUL</strong> o'rganishi mumkin:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Yosh chegarasi:</strong> 18–50 yosh oralig‘ida bo‘lish.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Bandlik holati:</strong> Rasmiy band bo‘lmaslik.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Davlat xizmati:</strong> Davlat ishida ishlamaslik.
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Talaba holati:</strong> O‘quvchi/talaba bo'lmaslik (Talabalarga <span className="text-amber-400 font-bold">20% chegirma</span>).
                  </div>
                </div>
              </div>
            </div>

            {/* CALCULATED RESULT BOX */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 text-center space-y-4">
              {calcStatus === 'unemployed' ? (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-xs">
                    🎉 TABRIKLAYMIZ! ELIGIBLE FOR 100% GRANT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Siz <span className="text-emerald-400">100% DAVLAT GRANTI</span> Asosida TEKIN O'qiysiz!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    Rasmiy band bo'lmagan fuqaro sifatida Kasbtech Akademiyasining Davlat granti kvotasidan to'liq bepul foydalanishingiz mumkin.
                  </p>
                </>
              ) : calcStatus === 'student' ? (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 border border-amber-800 text-amber-400 font-bold text-xs">
                    🎓 TALABA CHEGIRMASI
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Sizga <span className="text-amber-400">20% MAXSUS CHEGIRMA</span> Beriladi!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    O'quvchi hamda talabalar uchun maxsus rag'batlantiruvchi chegirma bilan sifatli ta'lim oling.
                  </p>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-blue-400 font-bold text-xs">
                    🚀 STANDART QABUL
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Zamonaviy Kasb Egasiga Aylaning!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                    Kasbtech Akademiyasida intensiv 6 kunlik amaliy darslar orqali daromadingizni oshiring.
                  </p>
                </>
              )}

              <button
                onClick={() => {
                  const courseObj = coursesList.find(c => c.id === calcCourse);
                  setUserCategory(calcStatus);
                  handleOpenRegister(courseObj ? courseObj.title : 'AI "VIBE CODING" (14 kun)');
                }}
                className="mt-4 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-sm shadow-xl shadow-red-600/30 transition-all inline-flex items-center gap-2"
              >
                <span>Imtiyoz Bilan Ro'yxatdan O'tish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* VOUCHER GUIDE SECTION (ecosys.mehnat.uz) */}
      <section id="vaucher" className="py-20 relative bg-slate-950/90 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-950 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
              <FileText className="w-4 h-4" /> 📌 RASMIY QO'LLANMA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Vaucher Olish Uchun <span className="gradient-text-gold">Onlayn Ariza</span> Topshirish
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Davlat granti vaucherini <a href="https://ecosys.mehnat.uz/service/87" target="_blank" rel="noreferrer" className="text-emerald-400 font-bold underline hover:text-emerald-300">ecosys.mehnat.uz</a> portali orqali olish tartibi va bosqichlari.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-10 rounded-3xl border-emerald-500/30 shadow-2xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* STEPS TIMELINE GRID */}
            <div className="space-y-6">
              <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">⌛️</span>
                <span>Ariza Topshirish Bosqichlari (5 qadam):</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 relative hover:border-emerald-500/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center">1</div>
                  <h4 className="font-bold text-sm text-white">1. Saytga kirish</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <a href="https://ecosys.mehnat.uz" target="_blank" rel="noreferrer" className="text-emerald-400 underline font-semibold">ecosys.mehnat.uz</a> portali sahifasiga kiring.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 relative hover:border-emerald-500/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center">2</div>
                  <h4 className="font-bold text-sm text-white">2. Bo'limni tanlash</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    "Kasbiy ta’lim tizimini rivojlantirish" bo‘limiga o'ting.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 relative hover:border-emerald-500/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center">3</div>
                  <h4 className="font-bold text-sm text-white">3. Xizmatni ochish</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    “Vaucher olish uchun ariza” xizmatida “Xizmatdan foydalanish”ni bosing.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 relative hover:border-emerald-500/50 transition-all">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center">4</div>
                  <h4 className="font-bold text-sm text-white">4. Yo'nalish tanlash</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Doimiy yashash joyi hamda o'quv yo‘nalishini tanlang.
                  </p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-3 relative hover:border-emerald-500/50 transition-all sm:col-span-2 lg:col-span-1">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center">5</div>
                  <h4 className="font-bold text-sm text-white">5. Arizani yuborish</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Oferta talablariga roziman bandini belgilab, arizani yuboring.
                  </p>
                </div>

              </div>
            </div>

            {/* IMPORTANT WARNING & NOTES BOX */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
              
              <div className="bg-red-950/40 border border-red-800/60 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>⚠️ Muhim Eslatma (Cheklovlar)</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Quyidagi holatlarda tizim ariza yuborishni cheklaydi:
                </p>
                <ul className="space-y-2 text-xs text-rose-200">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">❌</span> Fuqaroning rasmiy bandligi aniqlansa
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400 font-bold">❌</span> Yashash hududi Bandlik bo‘limi smetasida mablag‘ yetarli bo‘lmasa
                  </li>
                </ul>
              </div>

              <div className="bg-sky-950/40 border border-sky-800/60 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                  <Info className="w-5 h-5 shrink-0" />
                  <span>💻 Avtomatik Tekshiruv & Natija</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400">👉</span>
                    <span>Tekshiruvlar tizim tomonidan avtomatik amalga oshiriladi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-400">👉</span>
                    <span>Ariza holati shaxsiy kabinet orqali kuzatiladi.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">👉</span>
                    <span className="text-white font-bold">Tasdiqlangach, vaucherni yuklab olish mumkin.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* CALL TO ACTION BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 text-center sm:text-left">
                💬 Savollar bo‘lsa, hududingizdagi <strong className="text-slate-200">Bandlik bo‘limiga</strong> murojaat qilishingiz mumkin.
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <a
                  href="https://ecosys.mehnat.uz/service/87"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-slate-950 font-black text-sm shadow-lg shadow-emerald-600/30 transition-all inline-flex items-center gap-2"
                >
                  <span>ecosys.mehnat.uz Saytiga O'tish</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* COURSES CATALOG SECTION */}
      <section id="kurslar" className="py-20 bg-slate-950/80 border-t border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-red-950 border border-red-800/60 text-red-400 text-xs font-bold uppercase tracking-wider">
              📚 O'quv Dasturlarimiz
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Barcha <span className="gradient-text-red">Kurslarimiz</span> Bilan Tanishib Chiqing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Har bir kurs noldan boshlovchilar uchun ham tushunarli va 100% amaliyotga yo'naltirilgan.
            </p>
          </div>

          {/* COURSES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coursesList.map((course) => (
              <div
                key={course.id}
                className="glass-card glass-card-hover tilt-card-3d rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-slate-800 relative overflow-hidden group"
              >
                {/* HEADER ACCENT BAR */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${course.color}`} />

                <div className="space-y-6">
                  
                  {/* BADGES & DURATION */}
                  <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-red-950/80 text-rose-400 border border-red-800/60 text-xs font-extrabold uppercase tracking-wider">
                      {course.badge}
                    </span>
                    <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold bg-amber-950/50 border border-amber-800/40 px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      Ustoz: <strong className="text-slate-200">{course.mentor}</strong> ({course.mentorRole})
                    </p>
                  </div>

                  {/* POSTER PREVIEW IF AVAILABLE */}
                  {course.poster && (
                    <div
                      onClick={() => setLightboxImage(course.poster)}
                      className="relative w-full rounded-2xl overflow-hidden cursor-pointer border border-slate-700/60 bg-slate-900 group/poster shadow-md"
                    >
                      <img
                        src={course.poster}
                        alt={course.title}
                        className="w-full h-auto max-h-96 object-contain rounded-2xl group-hover/poster:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover/poster:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="bg-red-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-xl">
                          <Maximize2 className="w-4 h-4" />
                          <span>Poster ko'rish</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* DESCRIPTION */}
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {course.description}
                  </p>

                  {/* HIGHLIGHTS */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    {course.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* CARD FOOTER CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Davlat Granti:</span>
                    <span className="text-xs font-extrabold text-emerald-400">100% BEPUL (Band bo'lmaganlarga)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {course.detailUrl && (
                      <a
                        href={course.detailUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs border border-slate-700 transition-all flex items-center gap-1"
                      >
                        <span>Batafsil..</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={() => handleOpenRegister(course.title)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <span>Yozilish</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY KASBTECH? ADVANTAGES */}
      <section id="afzalliklar" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-amber-950 border border-amber-800/60 text-amber-400 text-xs font-bold uppercase tracking-wider">
              🌟 Bizning Ustunliklarimiz
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Nima Uchun Aynan <span className="gradient-text-gold">Kasbtech Akademiyasi</span>?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Talabalarga ta'lim sifatini va natijani kafolatlaydigan 4 ta asosiy ustunligimiz:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card tilt-card-3d p-6 rounded-3xl border-slate-800 space-y-4 text-left hover:border-red-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-rose-400">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Haftada 6 Kun Dars</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Darslar haftada 6 kun, intensiv tarzda faqat amaliyot va real loyihalar ustida ishlash bilan o'tkaziladi.
              </p>
            </div>

            <div className="glass-card tilt-card-3d p-6 rounded-3xl border-slate-800 space-y-4 text-left hover:border-amber-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">100% Davlat Granti</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rasmiy band bo'lmagan fuqarolar uchun barcha intensiv IT va marketing kurslarimiz mutlaqo TEKIN!
              </p>
            </div>

            <div className="glass-card tilt-card-3d p-6 rounded-3xl border-slate-800 space-y-4 text-left hover:border-sky-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-600/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">20% Talaba Chegirmasi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Talabalar va maktab o'quvchilari uchun maxsus chegirma beriladi, kelajak sarmoyasi hamyonbop.
              </p>
            </div>

            <div className="glass-card tilt-card-3d p-6 rounded-3xl border-slate-800 space-y-4 text-left hover:border-emerald-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Sertifikat va Ishga Yordam</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kursni muvaffaqiyatli tugatganingizdan so'ng sertifikat beriladi hamda darhol ish topishingizga ko'maklashiladi.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* MENTORS & LEADERSHIP SHOWCASE */}
      <section id="ustozlar" className="py-20 bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-950 border border-blue-800/60 text-blue-400 text-xs font-bold uppercase tracking-wider">
              👨‍🏫 Bizning Mentorlar
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              Tajribali <span className="gradient-text-blue">Ustozlarimiz</span> Bilan Tanishing
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Har bir yo'nalish sohaga doir real amaliy tajribaga ega bo'lgan kuchli mutaxassislar tomonidan o'rgatiladi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* DIRECTOR & LEAD MENTOR: JAVOXIR ALIYEV */}
            <div className="glass-card tilt-card-3d p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left hover:border-red-500/50 transition-all">
              <div className="relative shrink-0 group">
                <img
                  src="/javoxir_aliyev.jpg"
                  alt="Javoxir Aliyev - Kasbtech Akademiyasi Direktori"
                  className="w-32 h-40 sm:w-44 sm:h-52 rounded-2xl object-cover object-top border-2 border-red-500/60 shadow-xl shadow-red-950/60 group-hover:scale-[1.03] transition-transform duration-300"
                />
                <span className="absolute -bottom-2.5 -right-2 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg border border-red-400/40">
                  👑 DIREKTOR
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Javoxir Aliyev</h3>
                  <p className="text-xs text-rose-400 font-semibold">Kasbtech Akademiyasi Direktori</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center justify-center sm:justify-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span><strong>AI VIBE CODING</strong> kursi bosh ustoz</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-1.5">
                    <Target className="w-3.5 h-3.5 text-rose-400" />
                    <span><strong>AI + Digital Marketing</strong> kursi bosh ustoz</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed italic pt-1">
                  "Maqsadingiz – yillab nazariya o'rganish emas, balki eng so'nggi AI texnologiyalari bilan tezda natijaga chiqish va real daromad olishdir!"
                </p>
              </div>
            </div>

            {/* COMPUTER LITERACY MENTOR: ISOQOV ATHAM */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-slate-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 border-2 border-emerald-500/50 flex flex-col items-center justify-center text-emerald-400 shrink-0 shadow-xl">
                <Laptop className="w-12 h-12 mb-2" />
                <span className="text-xs font-extrabold text-white">ISOQOV ATHAM</span>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">Isoqov Atham</h3>
                  <p className="text-xs text-emerald-400 font-semibold">Kompyuter Savodxonligi Bosh Mentor</p>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="flex items-center justify-center sm:justify-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span><strong>Kompyuter Savodxonligi (30 kun)</strong> bosqichma-bosqich o'rgatadi</span>
                  </p>
                  <p className="flex items-center justify-center sm:justify-start gap-1.5">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    <span>100+ o'quvchilarga bazaviy savodxonlikni noldan o'rgatgan</span>
                  </p>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed italic pt-1">
                  "Har bir zamonaviy inson uchun kompyuter savodxonligi va raqamli ko'nikmalar – muvaffaqiyat poydevoridir."
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TELEGRAM BANNER */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 sm:p-12 border-sky-500/30 bg-gradient-to-r from-slate-950 via-sky-950/40 to-slate-950 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="space-y-3 text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-sky-950 border border-sky-800 text-sky-400 text-xs font-bold uppercase tracking-wider">
                ✈️ RASMIY TELEGRAM KANAL
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white">
                Barcha Yangiliklar va Dars Jadvallari Telegramda!
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                Rasmiy kanalimizga a'zo bo'ling hamda savollaringiz bo'lsa to'g'ridan-to'g'ri Telegram admindan javob oling.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="https://t.me/kasbtech_akademiyasi"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kanalga Qo'shilish</span>
              </a>

              <a
                href="https://t.me/kasbtech_admin"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl glass-card hover:bg-slate-800 text-white font-bold text-sm border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-sky-400" />
                <span>Admin Bilan Bog'lanish</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-950/80 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider">
              ❓ Ko'p Beriladigan Savollar
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Savollaringizga <span className="gradient-text-red">Javoblar</span>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="glass-card rounded-2xl p-5 border-slate-800 group cursor-pointer"
              >
                <summary className="font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 list-none">
                  <span>{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-red-500 group-open:rotate-180 transition-transform shrink-0" />
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/60">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-lg">
                K
              </div>
              <div>
                <span className="font-extrabold text-white text-base">KASBTECH AKADEMIYASI</span>
                <p className="text-[11px] text-slate-400">Zamonaviy IT va AI Yo'nalishlari Markazi</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-medium">
              <a href="tel:+998872647171" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg">
                <Phone className="w-3.5 h-3.5" />
                <span>+998-87-264-71-71</span>
              </a>
              <a href="https://t.me/kasbtech_akademiyasi" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors flex items-center gap-1 text-slate-300">
                <Send className="w-3.5 h-3.5 text-sky-400" />
                <span>@kasbtech_akademiyasi</span>
              </a>
              <a href="https://instagram.com/kasbtech_akademiyasi" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-colors flex items-center gap-1 text-slate-300">
                <span>Instagram</span>
              </a>
              <a href="#grant" className="hover:text-red-400 transition-colors text-slate-300">Davlat Granti</a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>© 2026 Kasbtech Akademiyasi. Barcha huquqlar himoyalangan.</p>
            <p className="text-slate-400">Rasmiy band bo'lmagan fuqarolarga 100% TEKIN Davlat granti asosida.</p>
          </div>

        </div>
      </footer>

      {/* REGISTRATION MODAL */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-lg rounded-3xl p-6 sm:p-8 border-red-500/40 relative shadow-2xl animate-scale-up max-h-[90vh] overflow-y-auto">
            
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsRegisterModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!formSubmitted ? (
              <div className="space-y-6">
                
                <div>
                  <span className="px-3 py-1 rounded-full bg-red-950 text-rose-400 border border-red-800 text-[11px] font-bold uppercase tracking-wider">
                    📝 HOZIR RO'YXATDAN O'TING
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Joyingizni Band Qiling
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Davlat granti kvotalari cheklangan. Ma'lumotlaringizni qoldiring va admin bilan bog'laning.
                  </p>
                </div>

                <form onSubmit={handleSubmitForm} className="space-y-4">
                  
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-300">F.I.SH (Ismingiz va Familiyangiz):</label>
                    <input
                      type="text"
                      required
                      placeholder="Masalan: Jasur Rahimov"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-300">Telefon raqamingiz:</label>
                    <input
                      type="tel"
                      required
                      placeholder="+998 90 123 45 67"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-300">Tanlangan Kurs:</label>
                    <select
                      value={selectedCourse}
                      onChange={(e) => setSelectedCourse(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    >
                      {coursesList.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title} ({c.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-300">Maqomingiz:</label>
                    <select
                      value={userCategory}
                      onChange={(e) => setUserCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-red-500 focus:outline-none"
                    >
                      <option value="unemployed">🔥 Band bo'lmagan fuqaro (100% TEKIN Grant)</option>
                      <option value="student">🎓 Talaba / Maktab o'quvchisi (20% Chegirma)</option>
                      <option value="other">💼 Boshqa</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Arizani Yuborish</span>
                  </button>

                </form>

              </div>
            ) : (
              <div className="space-y-5 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">🎉 Arizangiz Muvaffaqiyatli Qabul Qilindi!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-sm mx-auto leading-relaxed">
                    Ma'lumotlaringiz qabul qilindi. Mutaxassislarimiz tez orada siz bilan bog'lanishadi.
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <a
                    href={`https://t.me/kasbtech_admin?text=${encodeURIComponent(`Salom, men ${fullName}. Kasbtech Akademiyasining ${selectedCourse} kursiga ariza qoldirdim.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Admin Bilan Bog'lanish (@kasbtech_admin)</span>
                  </a>

                  <a
                    href="https://t.me/kasbtech_akademiyasi"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 font-extrabold text-xs sm:text-sm border border-slate-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Telegram Kanalimizga A'zo Bo'lish</span>
                  </a>

                  <button
                    onClick={() => setIsRegisterModalOpen(false)}
                    className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold text-xs border border-slate-800 transition-all"
                  >
                    Oynani Yopish
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL FOR POSTERS */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out animate-fade-in"
        >
          <div className="relative max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Kasbtech poster full view"
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM QUICK DOCK (Android & Mobile Devices) */}
      <div className="fixed bottom-3 left-3 right-3 z-40 md:hidden glass-nav p-2 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center gap-2 backdrop-blur-xl">
        <a
          href="tel:+998872647171"
          className="flex-1 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-extrabold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Qo'ng'iroq</span>
        </a>

        <button
          onClick={() => handleOpenRegister()}
          className="flex-[1.5] py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white font-black text-xs shadow-lg shadow-red-600/40 flex items-center justify-center gap-1.5 active:scale-95 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ro'yxatdan O'tish</span>
        </button>
      </div>

    </div>
  );
}
