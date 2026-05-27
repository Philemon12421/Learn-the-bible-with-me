import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Compass, MessageSquare, Mail, Phone, 
  Send, User, Calendar, RefreshCcw, ArrowRight,
  Facebook, BookHeart, MessageCircleCode, CheckCircle2
} from 'lucide-react';
import { BibleVerse, MotivationalQuote, WiseSaying, ViewType } from '../types';
import { 
  getDailyBibleVerse, getDailyMotivationalQuote, getDailyWiseSaying,
  BIBLE_VERSES, MOTIVATIONAL_QUOTES, WISE_SAYINGS
} from '../data';
import QuoteCard from './QuoteCard';
import Newsletter from './Newsletter';

// ===================== HOME =====================
interface HomeProps { onNavigate: (view: ViewType) => void; todayDate: Date; }

export function HomeView({ onNavigate, todayDate }: HomeProps) {
  const currentVerse = getDailyBibleVerse(todayDate);
  const currentMotivate = getDailyMotivationalQuote(todayDate);
  const currentSaying = getDailyWiseSaying(todayDate);

  return (
    <div className="space-y-14 animate-fade-in">
      
      {/* HERO */}
      <section className="text-center py-10 md:py-16 max-w-3xl mx-auto space-y-5 px-4">
        <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200/60 text-amber-800 py-1.5 px-4 rounded-full text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Daily Faith · Wisdom · Growth</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-gray-900 font-extrabold tracking-tight leading-tight">
          Daily inspiration for <span className="text-amber-700">faith, wisdom</span> and growth
        </h1>
        <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Discover carefully chosen Bible scriptures, motivational quotes, and timeless proverbs — 
          a new treasure for each day of the month.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button onClick={() => onNavigate('bible')}
            className="px-5 py-3 bg-amber-700 hover:bg-amber-800 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
            <BookHeart className="w-4 h-4" />
            <span>Today's Scripture</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onNavigate('motivation')}
            className="px-5 py-3 bg-white hover:bg-gray-50 text-gray-700 rounded-2xl font-semibold text-sm border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Motivational Quotes</span>
          </button>
        </div>
      </section>

      {/* DAILY HIGHLIGHTS GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 max-w-6xl mx-auto" aria-label="Daily content highlights">
        {[
          {
            icon: <BookOpen className="w-5 h-5" />, bg: 'bg-blue-50', color: 'text-blue-700',
            accentColor: 'blue', title: 'Daily Scripture', view: 'bible' as ViewType,
            text: currentVerse.text, author: currentVerse.reference,
            cta: 'Read full explanation'
          },
          {
            icon: <Sparkles className="w-5 h-5" />, bg: 'bg-amber-50', color: 'text-amber-700',
            accentColor: 'amber', title: 'Daily Motivation', view: 'motivation' as ViewType,
            text: currentMotivate.text, author: currentMotivate.author,
            cta: 'Explore insight'
          },
          {
            icon: <Compass className="w-5 h-5" />, bg: 'bg-indigo-50', color: 'text-indigo-700',
            accentColor: 'indigo', title: 'Wise Saying', view: 'wisdom' as ViewType,
            text: currentSaying.text, author: currentSaying.author,
            cta: 'Read explanation'
          },
        ].map(card => (
          <article key={card.view} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className={`w-9 h-9 ${card.bg} ${card.color} rounded-xl flex items-center justify-center`}>
                {card.icon}
              </div>
              <h3 className="text-base font-serif font-bold text-gray-900">{card.title}</h3>
              <p className="text-sm text-gray-500 italic leading-relaxed line-clamp-3">"{card.text}"</p>
              <p className={`text-xs font-bold font-mono ${card.color}`}>— {card.author}</p>
            </div>
            <button onClick={() => onNavigate(card.view)}
              className={`text-xs font-bold ${card.color} hover:underline flex items-center gap-1.5`}>
              <span>{card.cta}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </article>
        ))}
      </section>

      {/* TODAY'S SCRIPTURE FEATURE */}
      <section className="max-w-3xl mx-auto px-4" aria-label="Featured daily Bible verse">
        <div className="text-center space-y-1.5 mb-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Today's Scripture</h2>
          <p className="text-xs text-gray-400">A new verse selected for every day of the month</p>
        </div>
        <QuoteCard
          id={currentVerse.id} type="bible" title="Daily Bible Verse"
          highlightValue={currentVerse.reference} quoteText={currentVerse.text}
          bodyExplanation={currentVerse.explanation} subtextLabel="REFLECTION"
          subtextContent={currentVerse.reflection} accentColor="blue"
        />
      </section>

      {/* SEO CONTENT SECTION */}
      <section className="max-w-4xl mx-auto px-4 py-8 space-y-4" aria-label="About Learn With Me">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {[
            { num: '31', label: 'Daily Bible Verses', sub: 'One for every day of the month' },
            { num: '31', label: 'Motivational Quotes', sub: 'From world-renowned leaders' },
            { num: '31', label: 'Wise Sayings', sub: 'Ancient proverbs & timeless wisdom' },
          ].map(item => (
            <div key={item.num} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-1">
              <span className="text-3xl font-serif font-extrabold text-amber-700">{item.num}</span>
              <p className="text-sm font-bold text-gray-900">{item.label}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-4 max-w-2xl mx-auto w-full">
        <Newsletter />
      </section>
    </div>
  );
}

// ===================== BIBLE =====================
export function BibleView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const activeVerse = getDailyBibleVerse(selectedDate);

  const formatted = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const jumpToToday = () => setSelectedDate(new Date());
  const traverseDay = (n: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + n);
    setSelectedDate(d);
  };

  return (
    <div className="space-y-10 animate-fade-in px-4 py-4 max-w-3xl mx-auto">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-2xl">
          <BookHeart className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 font-bold">Daily Scripture</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Nourish your soul with timeless Bible verses. A unique scripture is curated for each day of the month.
        </p>
      </header>

      {/* Date navigator */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Calendar className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="truncate">{formatted}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => traverseDay(-1)} className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 text-xs font-semibold rounded-xl transition-all active:scale-95">
            ← Prev
          </button>
          <button onClick={jumpToToday} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 text-xs font-bold rounded-xl transition-all active:scale-95 flex items-center gap-1">
            <RefreshCcw className="w-3 h-3" /> Today
          </button>
          <button onClick={() => traverseDay(1)} className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-gray-700 text-xs font-semibold rounded-xl transition-all active:scale-95">
            Next →
          </button>
        </div>
      </div>

      <QuoteCard
        id={activeVerse.id} type="bible" title="Holy Bible"
        highlightValue={activeVerse.reference} quoteText={activeVerse.text}
        bodyExplanation={activeVerse.explanation} subtextLabel="REFLECTION"
        subtextContent={activeVerse.reflection} accentColor="blue"
      />

      {/* Browse grid */}
      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
        <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">Browse All 31 Verses</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {BIBLE_VERSES.map((b, i) => {
            const target = new Date(); target.setDate(i + 1);
            return (
              <button key={b.id} onClick={() => setSelectedDate(target)}
                className={`p-2.5 rounded-xl border text-left transition-all ${activeVerse.id === b.id ? 'bg-blue-600 border-blue-600 text-white shadow-sm' : 'bg-gray-50 border-gray-100 hover:bg-blue-50 hover:border-blue-200 text-gray-700'}`}>
                <span className="block text-[8px] font-mono opacity-60">Day {i+1}</span>
                <span className="block text-[10px] font-bold leading-tight truncate">{b.reference.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ===================== MOTIVATION =====================
export function MotivationView() {
  const [randomMode, setRandomMode] = useState(false);
  const [randomQuote, setRandomQuote] = useState<MotivationalQuote | null>(null);
  const activeQuote = randomMode && randomQuote ? randomQuote : getDailyMotivationalQuote(new Date());

  const triggerRandom = () => {
    setRandomQuote(MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)]);
    setRandomMode(true);
  };

  return (
    <div className="space-y-10 animate-fade-in px-4 py-4 max-w-3xl mx-auto">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-700 rounded-2xl">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 font-bold">Daily Motivation</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Ignite your drive with curated quotes from world leaders, philosophers, and visionaries.
        </p>
      </header>

      <div className="flex justify-center gap-2.5 flex-wrap">
        <button onClick={() => setRandomMode(false)}
          className={`px-5 py-2 rounded-2xl text-xs font-bold border transition-all ${!randomMode ? 'bg-amber-700 text-white border-amber-700 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
          📅 Today's Quote
        </button>
        <button onClick={triggerRandom}
          className={`px-5 py-2 rounded-2xl text-xs font-bold border transition-all ${randomMode ? 'bg-amber-700 text-white border-amber-700 shadow-md' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>
          🎲 Surprise Me
        </button>
      </div>

      <QuoteCard
        id={activeQuote.id} type="motivation"
        title={randomMode ? 'Random Motivational Quote' : 'Today\'s Motivation'}
        highlightValue={activeQuote.author} quoteText={activeQuote.text}
        bodyExplanation={activeQuote.insight} accentColor="amber"
      />

      <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3">
        <h4 className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">More Quotes</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOTIVATIONAL_QUOTES.slice(0, 8).map(item => (
            <button key={item.id} onClick={() => { setRandomQuote(item); setRandomMode(true); }}
              className="p-4 rounded-xl bg-gray-50 hover:bg-amber-50 border border-gray-100 hover:border-amber-200 text-left transition-all group">
              <span className="text-[10px] text-amber-700 font-bold font-mono">— {item.author}</span>
              <p className="text-xs italic text-gray-600 line-clamp-2 mt-1 leading-relaxed">"{item.text}"</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ===================== WISDOM =====================
export function WisdomView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const activeSaying = getDailyWiseSaying(selectedDate);

  const traverseDay = (n: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + n);
    setSelectedDate(d);
  };

  return (
    <div className="space-y-10 animate-fade-in px-4 py-4 max-w-3xl mx-auto">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-700 rounded-2xl">
          <Compass className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 font-bold">Wise Sayings</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Ancient proverbs and timeless insights from cultures worldwide — updated daily.
        </p>
      </header>

      <QuoteCard
        id={activeSaying.id} type="wisdom" title="Timeless Wisdom"
        highlightValue={activeSaying.author} quoteText={activeSaying.text}
        bodyExplanation={activeSaying.explanation} accentColor="indigo"
      />

      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <button onClick={() => traverseDay(-1)} className="text-xs font-semibold text-gray-500 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          ← Yesterday
        </button>
        <span className="text-xs text-gray-400 font-serif italic hidden sm:inline">Wisdom changes with each day</span>
        <button onClick={() => traverseDay(1)} className="text-xs font-semibold text-gray-500 hover:text-indigo-700 flex items-center gap-1 transition-colors">
          Tomorrow →
        </button>
      </div>
    </div>
  );
}

// ===================== CONTACT =====================
export function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setIsSending(true);
    await new Promise(r => setTimeout(r, 900));
    setIsSending(false);
    setSentSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <div className="space-y-10 animate-fade-in px-4 py-4 max-w-5xl mx-auto">
      <header className="text-center space-y-3">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-2xl">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 font-bold">Get in Touch</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          Questions, partnerships, or feedback? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Contact info */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-serif font-bold text-gray-900">Contact Details</h3>
          
          {[
            { icon: <Mail className="w-4 h-4" />, label: 'EMAIL', value: 'drenchstudio1@gmail.com', href: 'mailto:drenchstudio1@gmail.com', sub: 'Reply within 24 hours' },
            { icon: <Phone className="w-4 h-4" />, label: 'PHONE', value: '0592063645', href: 'tel:0592063645', sub: 'Mon–Fri, 8AM–5PM' },
          ].map(c => (
            <div key={c.label} className="p-5 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-start gap-3">
              <div className="p-2 bg-blue-50 text-blue-700 rounded-xl flex-shrink-0">{c.icon}</div>
              <div>
                <p className="text-[9px] font-mono font-bold text-gray-400 uppercase tracking-widest">{c.label}</p>
                <a href={c.href} className="text-sm text-gray-900 font-semibold hover:text-blue-700 transition-colors">{c.value}</a>
                <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
              </div>
            </div>
          ))}

          <div className="p-5 bg-amber-50/60 border border-amber-100 rounded-2xl space-y-3">
            <p className="text-xs font-bold text-gray-900">Follow Our Community</p>
            <div className="flex flex-col gap-2">
              <a href="https://whatsapp.com/channel/0029VbBYNsGHAdNUPx90se1q" target="_blank" rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-2 transition-all">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                  <path d="M12.004 2c-5.51 0-9.99 4.49-9.99 10 0 1.77.47 3.43 1.29 4.9L2 22l5.25-1.34c1.42.77 3.03 1.21 4.74 1.21 5.51 0 10-4.49 10-10C22.004 6.49 17.514 2 12.004 2zm5.82 14.12c-.25.7-1.42 1.3-1.95 1.38-.49.07-1.12.09-2.73-.55-2.07-.82-3.41-2.91-3.51-3.05-.1-.13-.82-1.07-.82-2.04 0-.97.51-1.44.69-1.63.18-.19.39-.24.52-.24.13 0 .26 0 .37.01.12.01.27-.04.42.32.16.38.54 1.31.59 1.41.05.1.08.22.01.36-.07.14-.15.23-.23.32-.08.09-.17.19-.24.27-.08.08-.16.17-.07.33.09.15.41.67.88 1.09.6.53 1.11.7 1.27.78.16.08.25.07.34-.03.09-.1.39-.45.49-.61.1-.16.2-.13.34-.08.14.05.88.41 1.03.49.15.08.25.12.29.18.04.07.04.4-.21.1z"/>
                </svg>
                <span>WhatsApp Channel</span>
              </a>
              <a href="https://www.facebook.com/share/1EgWqBLG4N/" target="_blank" rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-2 transition-all">
                <Facebook className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-serif font-bold text-gray-900 mb-5">Send a Message</h3>
          
          {sentSuccess && (
            <div className="mb-5 p-4 bg-green-50 text-green-800 border border-green-100 rounded-xl text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Message sent! We'll be in touch soon.</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            {[
              { name: 'name', label: 'FULL NAME', type: 'text', placeholder: 'Your name (optional)', icon: <User className="w-4 h-4 text-gray-400" />, required: false },
              { name: 'email', label: 'EMAIL ADDRESS *', type: 'email', placeholder: 'name@example.com', icon: <Mail className="w-4 h-4 text-gray-400" />, required: true },
            ].map(field => (
              <div key={field.name} className="space-y-1">
                <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">{field.label}</label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus-within:border-blue-300 focus-within:bg-white transition-all">
                  {field.icon}
                  <input type={field.type} name={field.name} placeholder={field.placeholder}
                    value={(formData as any)[field.name]} onChange={handleInputChange}
                    required={field.required}
                    className="w-full text-sm text-gray-900 bg-transparent focus:outline-none" />
                </div>
              </div>
            ))}

            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold tracking-widest text-gray-400 uppercase">MESSAGE *</label>
              <div className="flex items-start gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 focus-within:border-blue-300 focus-within:bg-white transition-all">
                <MessageCircleCode className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <textarea name="message" rows={4} placeholder="Your message..."
                  value={formData.message} onChange={handleInputChange} required
                  className="w-full text-sm text-gray-900 bg-transparent focus:outline-none resize-none" />
              </div>
            </div>

            <button type="submit" disabled={isSending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 px-5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 text-sm">
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ===================== ABOUT =====================
export function AboutView() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 px-4 py-6 animate-fade-in">
      <header className="text-center space-y-3">
        <span className="text-xs text-amber-700 font-bold tracking-wider uppercase">Our Story</span>
        <h1 className="text-2xl sm:text-4xl font-serif text-gray-900 font-bold">About Learn With Me</h1>
        <p className="text-sm text-gray-500">Faith-centered inspiration by Drenchack Tech Company</p>
      </header>

      <div className="bg-white border border-gray-100 rounded-2xl p-7 sm:p-10 shadow-sm space-y-6 text-gray-700">
        <p className="text-base text-gray-800 font-serif italic text-center border-b border-gray-50 pb-6 leading-relaxed">
          "Drenchack Tech creates simple, meaningful digital experiences designed to inspire, educate, and uplift people through technology."
        </p>

        <div className="space-y-3">
          <h2 className="text-base font-serif font-bold text-gray-900">Who We Are</h2>
          <p className="text-sm leading-relaxed">
            We are a focused digital studio passionate about creating pristine, distraction-free spaces for daily spiritual and personal growth. We believe technology should serve human flourishing — clean, fast, and purposeful.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-base font-serif font-bold text-gray-900">What You'll Find Here</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              { color: 'blue', text: '31 unique daily Bible verses with contextual explanations and reflections' },
              { color: 'amber', text: '31 motivational quotes from world leaders, philosophers and visionaries' },
              { color: 'indigo', text: '31 ancient wise sayings with modern application guidance' },
              { color: 'gray', text: 'Peaceful ambient music for a calm, focused reading atmosphere' },
            ].map((f, i) => (
              <div key={i} className={`p-3 rounded-xl bg-${f.color}-50/40 border border-${f.color}-50 flex items-start gap-2`}>
                <span className={`text-${f.color}-600 font-bold mt-0.5 flex-shrink-0`}>✓</span>
                <span className="leading-relaxed">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Built with care by <span className="font-semibold text-gray-700">Drenchack Tech Company</span> · Ghana 🇬🇭
          </p>
        </div>
      </div>
    </div>
  );
}

// ===================== PRIVACY =====================
export function PrivacyView() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 px-4 py-6 animate-fade-in">
      <header className="text-center space-y-2">
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Legal</span>
        <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 font-bold">Privacy Policy</h1>
        <p className="text-xs text-gray-400">Effective Date: May 27th, 2026</p>
      </header>

      <div className="bg-white border border-gray-100 rounded-2xl p-7 sm:p-10 shadow-sm space-y-6 text-sm text-gray-600 leading-relaxed">
        {[
          {
            title: '1. Data Collected',
            body: 'We operate a daily inspiration email newsletter. We collect only your email address upon voluntary submission. This data is never sold, traded, or shared with advertisers. Contact form submissions are processed locally on your device only and are never transmitted to external servers.'
          },
          {
            title: '2. Cookies & Local Storage',
            body: 'We may use browser localStorage to remember your preferences. This data stays entirely on your device and is never transmitted externally. You can clear this at any time through your browser settings.'
          },
          {
            title: '3. Unsubscribe',
            body: 'You may unsubscribe from our newsletter at any time with a single click. Your email will be immediately removed from our records.'
          },
          {
            title: '4. Security',
            body: 'We implement industry-standard practices to protect your data. No electronic transmission is 100% secure, and we encourage safe digital practices when managing subscriptions.'
          },
          {
            title: '5. Contact',
            body: 'For privacy questions, email us at drenchstudio1@gmail.com. We respond within 24 hours.'
          }
        ].map(s => (
          <div key={s.title}>
            <h3 className="text-sm text-gray-900 font-bold mb-2">{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== TERMS =====================
export function TermsView() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 px-4 py-6 animate-fade-in">
      <header className="text-center space-y-2">
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Legal</span>
        <h1 className="text-2xl sm:text-3xl font-serif text-gray-900 font-bold">Terms & Conditions</h1>
        <p className="text-xs text-gray-400">Effective Date: May 27th, 2026</p>
      </header>

      <div className="bg-white border border-gray-100 rounded-2xl p-7 sm:p-10 shadow-sm space-y-6 text-sm text-gray-600 leading-relaxed">
        {[
          {
            title: '1. Use of Content',
            body: 'All Bible verses, motivational quotes, and wise sayings on Learn With Me are compiled for personal, educational, and inspirational use. You may share content freely, provided attribution to Learn With Me remains intact.'
          },
          {
            title: '2. Disclaimer',
            body: 'Our explanations and reflections are prepared with care and are not intended as formal theological translations, medical advice, or professional counseling. They are crafted to inspire and educate.'
          },
          {
            title: '3. Intellectual Property',
            body: 'The Learn With Me brand, logo, design, and original written content are the property of Drenchack Tech Company. Unauthorized reproduction of the platform design is prohibited.'
          },
          {
            title: '4. Availability',
            body: 'We strive for continuous availability across all devices. We are not liable for interruptions caused by network issues, browser incompatibility, or maintenance periods.'
          },
          {
            title: '5. Changes',
            body: 'We may update these terms periodically. Continued use of the site following updates constitutes acceptance of the revised terms.'
          }
        ].map(s => (
          <div key={s.title}>
            <h3 className="text-sm text-gray-900 font-bold mb-2">{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
