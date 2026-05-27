import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Compass, MessageSquare, MapPin, Mail, Phone, 
  Send, User, Calendar, RefreshCcw, ArrowRight, ShieldCheck, Heart, 
  Facebook, BookHeart, Quote, MessageCircleCode, CheckCircle2
} from 'lucide-react';
import { BibleVerse, MotivationalQuote, WiseSaying, ViewType } from '../types';
import { 
  getDailyBibleVerse, 
  getDailyMotivationalQuote, 
  getDailyWiseSaying,
  BIBLE_VERSES,
  MOTIVATIONAL_QUOTES,
  WISE_SAYINGS
} from '../data';
import QuoteCard from './QuoteCard';
import Newsletter from './Newsletter';

// ==========================================
// 1. HOME VIEW component
// ==========================================
interface HomeProps {
  onNavigate: (view: ViewType) => void;
  todayDate: Date;
}

export function HomeView({ onNavigate, todayDate }: HomeProps) {
  const currentVerse = getDailyBibleVerse(todayDate);
  const currentMotivate = getDailyMotivationalQuote(todayDate);
  const currentSaying = getDailyWiseSaying(todayDate);

  return (
    <div className="space-y-16 animate-fade-in">
      {/* Pristine Hero Section */}
      <section className="text-center py-12 md:py-20 max-w-3xl mx-auto space-y-6 relative px-4">
        {/* Verification banner element */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-700 py-1.5 px-4 rounded-full text-xs font-semibold hover:scale-105 transition-all">
          <span>Official Verification Hub</span>
          <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-3 h-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2 h-2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-serif text-gray-950 font-extrabold tracking-tight leading-none md:leading-tight">
          Daily inspiration for faith, wisdom and growth
        </h1>
        <p className="text-lg text-gray-500 font-sans max-w-2xl mx-auto leading-relaxed">
          Learn the world with me. Discover carefully chosen scriptures, motivational keys, and wise proverbs centered on peaceful glass aesthetics.
        </p>

        {/* Quick Route Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
          <button 
            onClick={() => onNavigate('bible')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-sm cursor-pointer shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <BookHeart className="w-4 h-4" />
            <span>Read Daily Verse</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => onNavigate('motivation')}
            className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-850 rounded-2xl font-semibold text-sm cursor-pointer border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Motivational Keys</span>
          </button>
        </div>
      </section>

      {/* Grid: Daily highlights summarized */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
        {/* Highlight 1: Bible */}
        <div className="bg-white border border-gray-100/70 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-950">Daily scripture</h3>
            <p className="text-sm font-sans text-gray-500 italic leading-relaxed line-clamp-3">
              "{currentVerse.text}"
            </p>
            <p className="text-xs font-mono font-bold text-blue-600">
              — {currentVerse.reference}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('bible')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore full explanation & save Card</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlight 2: Motivation */}
        <div className="bg-white border border-gray-100/70 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-950">Daily motivation</h3>
            <p className="text-sm font-sans text-gray-500 italic leading-relaxed line-clamp-3">
              "{currentMotivate.text}"
            </p>
            <p className="text-xs font-mono font-bold text-amber-600">
              — {currentMotivate.author}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('motivation')}
            className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore short insight</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Highlight 3: Wisdom */}
        <div className="bg-white border border-gray-100/70 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-bold text-gray-950">Wise Sayings</h3>
            <p className="text-sm font-sans text-gray-500 italic leading-relaxed line-clamp-3">
              "{currentSaying.text}"
            </p>
            <p className="text-xs font-mono font-bold text-indigo-600">
              — {currentSaying.author}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('wisdom')}
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>Read dynamic explanations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* Featured Bible verse focused panel */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-serif font-bold text-gray-950">Today's Faith Center</h2>
          <p className="text-xs text-gray-400">Pristine typographic rendering, ready to save or contemplate.</p>
        </div>
        
        <QuoteCard
          id={currentVerse.id}
          type="bible"
          title="Daily Bible Verse"
          highlightValue={currentVerse.reference}
          quoteText={currentVerse.text}
          bodyExplanation={currentVerse.explanation}
          subtextLabel="REFLECTION"
          subtextContent={currentVerse.reflection}
          accentColor="blue"
        />
      </section>

      {/* Subscription zone */}
      <section className="px-4">
        <Newsletter />
      </section>
    </div>
  );
}

// ==========================================
// 2. BIBLE VIEW component (with manual date picker!)
// ==========================================
export function BibleView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const activeVerse = getDailyBibleVerse(selectedDate);

  // Formats friendly date representations
  const formattedDateString = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const jumpToToday = () => {
    setSelectedDate(new Date());
  };

  const traverseDay = (increment: number) => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + increment);
    setSelectedDate(nextDate);
  };

  return (
    <div className="space-y-12 animate-fade-in px-4 py-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <BookHeart className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 font-bold tracking-tight">
          Daily Scripture Readings
        </h2>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Nourish your soul with timeless scriptures. Choose different calendar dates below to browse verses tailored deterministically for each day.
        </p>
      </div>

      {/* Intuitive date navigator control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold text-gray-800">{formattedDateString}</span>
        </div>

        {/* Action picker controllers */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => traverseDay(-1)}
            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer transition-all active:scale-95"
          >
            ← Previous Day
          </button>
          
          <button
            onClick={jumpToToday}
            className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-100 text-xs font-bold rounded-xl cursor-pointer transition-all active:scale-95 flex items-center gap-1"
          >
            <RefreshCcw className="w-3 h-3" /> Today
          </button>

          <button
            onClick={() => traverseDay(1)}
            className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 text-gray-700 text-xs font-semibold rounded-xl cursor-pointer transition-all active:scale-95"
          >
            Next Day →
          </button>
        </div>
      </div>

      {/* Render QuoteCard */}
      <QuoteCard
        id={activeVerse.id}
        type="bible"
        title="Holy Bible Quote"
        highlightValue={activeVerse.reference}
        quoteText={activeVerse.text}
        bodyExplanation={activeVerse.explanation}
        subtextLabel="DAILY PRAYER / REFLECTION"
        subtextContent={activeVerse.reflection}
        accentColor="blue"
      />

      {/* Grid: Quick list of scriptures in pool for general browsing */}
      <div className="bg-white/50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4">
        <h4 className="text-sm font-mono font-bold tracking-widest text-gray-400 uppercase">
          POOL PREVIEW (31 DISTINCT DAYS)
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {BIBLE_VERSES.slice(0, 12).map((b, i) => (
            <button
              key={b.id}
              onClick={() => {
                const target = new Date();
                // Set the day of month to match card index + 1
                target.setDate(i + 1);
                setSelectedDate(target);
              }}
              className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                activeVerse.id === b.id 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-105' 
                  : 'bg-white border-gray-50 hover:bg-gray-50/50 text-gray-800'
              }`}
            >
              <span className="block text-[9px] font-mono opacity-60">DAY {i + 1}</span>
              <span className="block text-xs font-bold truncate">{b.reference}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-400 text-center font-mono">
          Each day of any given month maps to a unique, curated, stunning citation. Select any day card to read.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 3. MOTIVATION VIEW component
// ==========================================
export function MotivationView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [randomMode, setRandomMode] = useState(false);
  const [randomQuote, setRandomQuote] = useState<MotivationalQuote | null>(null);

  const activeQuote = randomMode && randomQuote 
    ? randomQuote 
    : getDailyMotivationalQuote(selectedDate);

  const triggerRandom = () => {
    const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
    setRandomQuote(MOTIVATIONAL_QUOTES[randomIndex]);
    setRandomMode(true);
  };

  const restoreDaily = () => {
    setRandomMode(false);
    setSelectedDate(new Date());
  };

  return (
    <div className="space-y-12 animate-fade-in px-4 py-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-600 rounded-2xl">
          <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 font-bold tracking-tight">
          Daily Motivation
        </h2>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Ignite your driving force. Browse the daily curated focus key or trigger randomized quotes for immediate professional insights.
        </p>
      </div>

      {/* Switch Controllers */}
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={restoreDaily}
          className={`px-5 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
            !randomMode 
              ? 'bg-amber-600 text-white border-amber-600 shadow-md' 
              : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'
          }`}
        >
          📅 Today's Focus Quote
        </button>

        <button
          onClick={triggerRandom}
          className={`px-5 py-2 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
            randomMode 
              ? 'bg-amber-600 text-white border-amber-600 shadow-md' 
              : 'bg-white text-gray-700 border-gray-100 hover:bg-gray-50'
          }`}
        >
          🎲 Surprise Me (Random)
        </button>
      </div>

      {/* Active Quote Card display */}
      <QuoteCard
        id={activeQuote.id}
        type="motivation"
        title={randomMode ? "Surprise Motivational Quote" : "Daily Motivation Quote"}
        highlightValue={activeQuote.author}
        quoteText={activeQuote.text}
        bodyExplanation={activeQuote.insight}
        accentColor="amber"
      />

      {/* Beautiful Wisdom / Motivation summary list for secondary reading */}
      <div className="bg-white/50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-4">
        <h4 className="text-sm font-mono font-bold tracking-widest text-gray-400 uppercase">
          BROWSE MOTIVATOR QUOTES
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MOTIVATIONAL_QUOTES.slice(0, 6).map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                setRandomQuote(item);
                setRandomMode(true);
              }}
              className="p-4 rounded-2xl bg-white border border-gray-50 hover:border-amber-200 cursor-pointer transition-all hover:shadow-sm"
            >
              <span className="text-xs text-amber-600 font-mono font-semibold">BY {item.author}</span>
              <p className="text-sm italic text-gray-700 line-clamp-2 mt-1">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. WISDOM VIEW component
// ==========================================
export function WisdomView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const activeSaying = getDailyWiseSaying(selectedDate);

  const traverseDay = (increment: number) => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(selectedDate.getDate() + increment);
    setSelectedDate(nextDate);
  };

  return (
    <div className="space-y-12 animate-fade-in px-4 py-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 font-bold tracking-tight">
          Wise Sayings & Life Lessons
        </h2>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Deep, timeless insights. Meditate on ancient wisdom, proverb annotations, and strategic life directions updated daily.
        </p>
      </div>

      {/* Render QuoteCard */}
      <QuoteCard
        id={activeSaying.id}
        type="wisdom"
        title="Timeless Wisdom Saying"
        highlightValue={activeSaying.author}
        quoteText={activeSaying.text}
        bodyExplanation={activeSaying.explanation}
        accentColor="indigo"
      />

      {/* Previous layout browse triggers */}
      <div className="flex justify-between items-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
        <button
          onClick={() => traverseDay(-1)}
          className="text-xs font-semibold text-gray-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
        >
          ← Yesterday's Sayings
        </button>
        <span className="text-xs font-serif italic text-gray-400">
          Wisdom resolves with day changes
        </span>
        <button
          onClick={() => traverseDay(1)}
          className="text-xs font-semibold text-gray-600 hover:text-indigo-600 flex items-center gap-1 cursor-pointer"
        >
          Tomorrow's Proverbs →
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 5. CONTACT VIEW component (With highly functional persistent dispatch inbox!)
// ==========================================
export function ContactView() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [pastSubmissions, setPastSubmissions] = useState<any[]>([]);

  // Load existing contact logs locally
  React.useEffect(() => {
    const saved = localStorage.getItem('learn_with_me_contacts');
    if (saved) {
      try {
        setPastSubmissions(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setIsSending(true);
    // Simulate natural propagation delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newLog = {
      id: `c-${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      ...formData
    };

    const updatedLogs = [newLog, ...pastSubmissions];
    localStorage.setItem('learn_with_me_contacts', JSON.stringify(updatedLogs));
    setPastSubmissions(updatedLogs);

    setIsSending(false);
    setSentSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Clear success state after 5 seconds to invite more queries
    setTimeout(() => {
      setSentSuccess(false);
    }, 5000);
  };

  return (
    <div className="space-y-12 animate-fade-in px-4 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <MessageSquare className="w-6 h-6" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 font-bold tracking-tight">
          Get in Touch
        </h2>
        <p className="text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
          Questions, suggestions, or design partnerships? Reach out directly using our contact coordinate cards or dispatching a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Coordinate Cards */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-lg font-serif font-bold text-gray-950 pb-2 border-b border-gray-50">
            Contact Coordinates
          </h3>

          {/* Email coordinate */}
          <div className="p-6 bg-white border border-gray-100/80 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">EMAIL ADDRESS</p>
              <a 
                href="mailto:drenchstudio1@gmail.com" 
                className="text-base text-gray-900 font-semibold hover:text-blue-600 transition-colors"
              >
                drenchstudio1@gmail.com
              </a>
              <p className="text-xs text-gray-400 mt-1">Response inside 24 hours.</p>
            </div>
          </div>

          {/* Phone coordinate */}
          <div className="p-6 bg-white border border-gray-100/80 rounded-2xl shadow-sm flex items-start gap-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">PHONE NUMBER</p>
              <a 
                href="tel:0592063645" 
                className="text-base text-gray-900 font-semibold hover:text-blue-600 transition-colors pointer-events-auto"
              >
                0592063645
              </a>
              <p className="text-xs text-gray-400 mt-1">Available Mon - Fri, 8AM - 5PM.</p>
            </div>
          </div>

          {/* Drenchack Tech brief card */}
          <div className="p-6 bg-gray-50/50 border border-gray-100 rounded-2xl text-xs space-y-2 text-gray-600">
            <div className="flex items-center gap-1 font-bold text-gray-900">
              <span>Creator Profile</span>
              <span className="bg-blue-500 text-white rounded-full p-0.5 inline-flex items-center justify-center w-3 h-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2.5 h-2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            </div>
            <p className="leading-relaxed font-sans">
              Designed & curated by **Drenchack Tech Company**. We construct highly customized client services centering beautiful, fast, transparent standards.
            </p>
            
            {/* Social Buttons */}
            <div className="pt-2 flex items-center gap-2">
              <a 
                href="https://facebook.com/" 
                target="_blank" 
                rel="noreferrer noopener"
                className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 transition-all"
              >
                <Facebook className="w-3.5 h-3.5" />
                <span>Follow on Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Form */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-sm">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <h3 className="text-xl font-serif font-bold text-gray-950">
              Dispatch a direct Message
            </h3>

            {sentSuccess && (
              <div className="p-4 bg-green-50 text-green-800 border border-green-100 rounded-2xl text-sm flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>Message received! Your queries have been securely logged in this local session.</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase block pl-1">
                FULL NAME
              </label>
              <div className="relative flex items-center rounded-2xl border border-gray-100 bg-gray-50/50 p-2.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
                <User className="w-4 h-4 text-gray-450 mr-2.5 ml-1" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name (Optional)"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-900 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase block pl-1">
                EMAIL ADDRESS *
              </label>
              <div className="relative flex items-center rounded-2xl border border-gray-100 bg-gray-50/50 p-2.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
                <Mail className="w-4 h-4 text-gray-450 mr-2.5 ml-1" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-900 bg-transparent focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono font-bold tracking-widest text-gray-400 uppercase block pl-1">
                MESSAGE DETAILS *
              </label>
              <div className="relative flex items-start rounded-2xl border border-gray-100 bg-gray-50/50 p-2.5 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
                <MessageCircleCode className="w-4 h-4 text-gray-455 mr-2.5 ml-1 mt-1.5" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Message text here..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full text-sm text-gray-900 bg-transparent focus:outline-none resize-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 px-6 rounded-2xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Dispatching Message...' : 'Send Message'}</span>
            </button>
          </form>

          {/* Display locally submitted contacts mock details */}
          {pastSubmissions.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-50 space-y-3">
              <h4 className="text-xs font-mono font-bold text-gray-400 tracking-wider">
                SESSION RECORD BOOK ({pastSubmissions.length} MSGS SENT)
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {pastSubmissions.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-gray-50 text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between font-semibold text-gray-800">
                      <span>{item.name || 'Anonymous'}</span>
                      <span className="text-[9px] font-mono text-gray-400">{item.timestamp}</span>
                    </div>
                    <p className="italic text-gray-550 leading-relaxed">"{item.message}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

// ==========================================
// 6. ABOUT US VIEW component
// ==========================================
export function AboutView() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4 py-8 animate-fade-in">
      <div className="text-center space-y-3">
        <span className="text-xs text-blue-600 font-mono font-semibold tracking-wider">CREATOR VISION</span>
        <h2 className="text-3xl sm:text-4xl font-serif text-gray-950 font-bold">About Our Company</h2>
        <p className="text-sm text-gray-450">Learn With Me by Drenchack Tech Company.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 leading-relaxed text-gray-700">
        <p className="text-lg text-gray-900 font-serif italic text-center border-b border-gray-50 pb-6">
          "Drenchack Tech creates simple and meaningful digital experiences designed to inspire, educate and uplift people through technology."
        </p>

        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-gray-950">Who We Are</h3>
          <p className="text-sm font-sans">
            We are a compact digital lab passionate about providing pristine spaces that filter out daily noise, letting users interact with concepts that matters most. We believe technology should look clean, feel responsive, and focus entirely on human flourishing.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-gray-950">Features of 'Learn With Me'</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans list-none pl-0">
            <li className="p-3 rounded-xl bg-blue-50/20 border border-blue-50 flex items-start gap-2">
              <span className="text-blue-500 font-bold">✓</span>
              <span>Daily Bible Verses with comprehensive contextual explanations.</span>
            </li>
            <li className="p-3 rounded-xl bg-amber-50/20 border border-amber-50 flex items-start gap-2">
              <span className="text-amber-500 font-bold">✓</span>
              <span>Motivational keys to unlock productivity and focus.</span>
            </li>
            <li className="p-3 rounded-xl bg-indigo-50/20 border border-indigo-50 flex items-start gap-2">
              <span className="text-indigo-500 font-bold">✓</span>
              <span>Ancient wise sayings detailed simply for modern implementation.</span>
            </li>
            <li className="p-3 rounded-xl bg-gray-50/20 border border-gray-50 flex items-start gap-2">
              <span className="text-gray-500 font-bold">✓</span>
              <span>Offline-safe architectures with beautiful physical PNG card downloads.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. PRIVACY POLICY VIEW component
// ==========================================
export function PrivacyView() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4 py-8 animate-fade-in">
      <div className="text-center space-y-3">
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">LEGAL SPECIFICATION</span>
        <h2 className="text-3xl font-serif text-gray-950 font-bold">Privacy Policy</h2>
        <p className="text-xs text-gray-400">Effective Date: May 27th, 2026</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 text-sm text-gray-600 leading-relaxed font-sans">
        <div>
          <h3 className="text-base text-gray-900 font-semibold mb-2">1. Data Collected</h3>
          <p>
            We operate the "Get daily inspiration" email newsletter. We collect your email address purely on your active submission request. This information is processed secure and is never traded, leased, or distributed to advertising syndicates. Any local information (messages, subscriptions, calendar picker logs) persists exclusively inside your own device storage using `localStorage` and never leaves your computer.
          </p>
        </div>

        <div>
          <h3 className="text-base text-gray-900 font-semibold mb-2">2. Unsubscribe Actions</h3>
          <p>
            You possess the complete freedom to unsubscribe at any immediate point with a single click. Unsubscribing instantly wipes out your email information from our storage records, restoring complete digital quietness.
          </p>
        </div>

        <div>
          <h3 className="text-base text-gray-900 font-semibold mb-2">3. Security Metrics</h3>
          <p>
            We implement industry-standard encryption protocols. However, no electronic transmission mechanism is 100% immune, and we urge users to adopt safety practices when managing any digital subscriptions.
          </p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 8. TERMS & CONDITIONS VIEW component
// ==========================================
export function TermsView() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 px-4 py-8 animate-fade-in">
      <div className="text-center space-y-3">
        <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase font-bold">LEGAL SPECIFICATION</span>
        <h2 className="text-3xl font-serif text-gray-950 font-bold">Terms & Conditions</h2>
        <p className="text-xs text-gray-400">Effective Date: May 27th, 2026</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6 text-sm text-gray-600 leading-relaxed font-sans">
        <div>
          <h3 className="text-base text-gray-900 font-semibold mb-2">1. Use of Content</h3>
          <p>
            All daily Bible verses, interpretations, motivation insights, and wise sayings presented on **Learn With Me** are compiled strictly for personal, self-educational, and inspiring purposes. You are encouraged to copy, share, download, and distribute the visual PNG cards to lift others up, provided our verified attribution brand identifier remains intact.
          </p>
        </div>

        <div>
          <h3 className="text-base text-gray-900 font-semibold mb-2">2. Website Disclaimer</h3>
          <p>
            Our interpretations and explanation notes are prepared with love by Drenchack Tech and are not intended to substitute for formal translation, historic studies, or physical consultations. All quotations are compiled in good faith.
          </p>
        </div>

        <div>
          <h3 className="text-base text-gray-900 font-semibold mb-2">3. Digital Operations</h3>
          <p>
            We strive to maintain high accessibility and smooth interaction across all responsive devices. However, we are not responsible for temporal breaks in accessibility arising from network glitches, browser incompatibility, or hosting updates.
          </p>
        </div>
      </div>
    </div>
  );
}
