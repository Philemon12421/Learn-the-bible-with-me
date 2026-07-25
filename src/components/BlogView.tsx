import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string; // used for the <meta name="description"> tag + card excerpt
  category: 'Bible Study' | 'Motivation' | 'Wisdom' | 'Habits';
  readMinutes: number;
  publishedLabel: string; // e.g. "Updated July 2026" — keep evergreen, avoid a hard date that goes stale
  accent: 'blue' | 'amber' | 'indigo';
  // Each paragraph is either plain text or a heading, rendered in order.
  body: Array<{ type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'list'; items: string[] }>;
}

const ACCENT = {
  blue: { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-100', dot: 'bg-blue-500' },
  amber: { text: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-100', dot: 'bg-amber-500' },
  indigo: { text: 'text-indigo-700', bg: 'bg-indigo-50', border: 'border-indigo-100', dot: 'bg-indigo-500' },
};

const POSTS: BlogPost[] = [
  {
    slug: 'daily-bible-reading-habit',
    title: 'How to Build a Daily Bible Reading Habit (Even If You\'re Busy)',
    metaDescription: 'A practical, no-guilt guide to reading the Bible every day — how much time you actually need, what to read first, and how to make the habit stick.',
    category: 'Habits',
    readMinutes: 6,
    publishedLabel: 'Updated July 2026',
    accent: 'amber',
    body: [
      { type: 'p', text: 'Most people don\'t stop reading the Bible daily because they lose their faith — they stop because the habit was never built to survive a busy week. If you\'ve started and restarted a "read the Bible in a year" plan more times than you\'d like to admit, the problem usually isn\'t discipline. It\'s design.' },
      { type: 'h2', text: 'Start smaller than feels productive' },
      { type: 'p', text: 'A single verse, read slowly and actually thought about, will do more for you than three chapters skimmed while half-asleep. If five minutes a day is realistic and thirty minutes isn\'t, build the habit around five. You can always expand it later — but a habit that survives is worth more than an ambitious one that collapses by week two.' },
      { type: 'h2', text: 'Anchor it to something you already do' },
      { type: 'list', items: [
        'Right after you make your morning coffee or tea',
        'During your commute, if you use audio',
        'Right before you check your phone for the first time',
        'At the same moment you already pray or journal',
      ]},
      { type: 'p', text: 'Habits stick when they\'re attached to an existing routine rather than floating freely in your day, hoping you\'ll remember. Pick one anchor point and use it every day for two weeks before judging whether it\'s working.' },
      { type: 'h2', text: 'Where to start if you don\'t know where to start' },
      { type: 'p', text: 'The Psalms are a strong starting point — they cover nearly every human emotion, from despair to celebration, in short, self-contained chapters. Proverbs works well too, since each chapter is a set of standalone sayings rather than a continuous story you need to track. Once the habit itself is stable, move into a Gospel like John to read the story of Jesus in full.' },
      { type: 'h2', text: 'Let a daily verse do the heavy lifting on hard days' },
      { type: 'p', text: 'Some mornings you genuinely don\'t have five minutes. On those days, a single well-chosen verse with a short explanation — the kind you\'ll find on our Bible page — keeps the habit alive without requiring willpower you don\'t have that day. Consistency beats intensity almost every time.' },
    ],
  },
  {
    slug: 'bible-verses-for-anxiety-and-peace',
    title: '15 Bible Verses for Anxiety and Peace, and How to Actually Use Them',
    metaDescription: 'A curated list of Bible verses for anxiety and peace, with context on what each one means and simple ways to return to them when your mind is racing.',
    category: 'Bible Study',
    readMinutes: 7,
    publishedLabel: 'Updated July 2026',
    accent: 'blue',
    body: [
      { type: 'p', text: 'Scripture doesn\'t promise a life free of anxiety — it promises a place to bring it. The difference matters: these verses aren\'t meant to talk you out of how you feel, they\'re meant to give that feeling somewhere to go.' },
      { type: 'h2', text: 'Verses that name the anxiety directly' },
      { type: 'list', items: [
        'Philippians 4:6-7 — the clearest instruction in scripture for what to do with anxious thoughts: bring them to God with gratitude attached, not just complaint.',
        '1 Peter 5:7 — permission to hand over your anxiety rather than carry it quietly because you think you should be able to.',
        'Matthew 6:34 — a direct challenge to the habit of pre-living tomorrow\'s problems today.',
      ]},
      { type: 'h2', text: 'Verses that describe God\'s character when you can\'t feel it' },
      { type: 'p', text: 'Anxiety often distorts how present or capable God feels, even when your beliefs haven\'t changed. Psalm 46:1 calls God "a very present help in trouble" — not a distant observer. Isaiah 41:10 pairs "fear not" with a concrete reason: because God is present and actively strengthening you, not just telling you to calm down.' },
      { type: 'h2', text: 'How to actually use a verse in the moment' },
      { type: 'list', items: [
        'Read it slowly, out loud if you can, rather than skimming it.',
        'Pick one phrase from it and repeat that phrase specifically, not the whole verse.',
        'Say what you\'re anxious about out loud or in writing before reading the verse — naming it first makes the verse land differently.',
        'Keep two or three verses memorized so you\'re not searching for one while already overwhelmed.',
      ]},
      { type: 'p', text: 'If anxiety is a frequent, heavy presence in your life rather than an occasional wave, scripture is a genuine comfort — but it isn\'t a substitute for talking to a doctor or therapist. The two aren\'t in competition with each other.' },
    ],
  },
  {
    slug: 'morning-bible-verses-start-your-day',
    title: 'Morning Bible Verses to Start Your Day With Purpose, Not Panic',
    metaDescription: 'A short list of morning Bible verses to read before you pick up your phone, plus why the order of your first ten minutes matters more than you think.',
    category: 'Bible Study',
    readMinutes: 5,
    publishedLabel: 'Updated July 2026',
    accent: 'amber',
    body: [
      { type: 'p', text: 'The first ten minutes of your day set the tone more than any productivity hack that comes after it. Whatever you feed your mind first — a notification feed, a news cycle, or a single sentence of scripture — becomes the lens for everything that follows.' },
      { type: 'h2', text: 'Why "before the phone" matters' },
      { type: 'p', text: 'It\'s not that phones are evil. It\'s that reacting to other people\'s urgency before you\'ve had a single quiet thought of your own trains your mind to run on borrowed adrenaline all day. Reading one verse before you unlock your phone interrupts that pattern before it starts.' },
      { type: 'h2', text: 'Five verses that work well as a morning anchor' },
      { type: 'list', items: [
        'Lamentations 3:22-23 — a reminder that today is a fresh supply of mercy, not a continuation of yesterday\'s failures.',
        'Psalm 118:24 — a short, almost blunt statement to be glad in the day itself, before you know how it will go.',
        'Psalm 143:8 — a request to hear from God first thing, before decisions start piling up.',
        'Proverbs 3:5-6 — a decision, made early, to not lean entirely on your own read of the day ahead.',
        'Zephaniah 3:17 — a reminder that you\'re not walking into the day unnoticed or alone.',
      ]},
      { type: 'h2', text: 'Make it a two-minute ritual, not a study session' },
      { type: 'p', text: 'Morning scripture works best when it\'s light enough to survive a rushed Tuesday. Read the verse, say one short prayer in your own words, and go. You can go deeper on the weekend. The goal on a weekday morning is simply to start the day pointed in the right direction.' },
    ],
  },
  {
    slug: 'motivational-quotes-vs-bible-verses',
    title: 'Motivational Quotes vs. Bible Verses: What\'s the Real Difference?',
    metaDescription: 'Motivational quotes and Bible verses can sound similar on the surface. Here\'s what actually separates them, and why both have a place in daily life.',
    category: 'Motivation',
    readMinutes: 5,
    publishedLabel: 'Updated July 2026',
    accent: 'indigo',
    body: [
      { type: 'p', text: '"Believe you can and you\'re halfway there" and "I can do all things through Christ who strengthens me" can look similar side by side. Both are short, both are meant to be remembered, and both are meant to change how you approach a hard day. But they\'re not doing the same job.' },
      { type: 'h2', text: 'Where the power is located' },
      { type: 'p', text: 'A motivational quote usually locates the power inside you — your belief, your effort, your mindset. A Bible verse usually locates the power outside you, in God, and invites you to draw from it. Neither framing is wrong; they answer different questions. One asks "how do I access my own strength today?" The other asks "who am I actually depending on?"' },
      { type: 'h2', text: 'Why both are useful, not competing' },
      { type: 'list', items: [
        'Motivational quotes are excellent for execution — getting started, pushing through a slump, reframing a setback as data instead of defeat.',
        'Bible verses are better suited for identity and meaning — why you\'re doing what you\'re doing, and what happens when effort alone isn\'t enough.',
        'Wisdom sayings (Proverbs, and proverbs from other cultures) tend to sit in between — practical, but pointed at character rather than just output.',
      ]},
      { type: 'h2', text: 'A simple way to use both in the same day' },
      { type: 'p', text: 'Many people read scripture in the morning to set direction, then keep a motivational quote in view during the day for the moments that need a push rather than a foundation. There\'s no rule that says you have to choose one lane — they solve different problems.' },
    ],
  },
  {
    slug: 'proverbs-for-everyday-wisdom',
    title: '10 Proverbs for Everyday Decisions, Explained Simply',
    metaDescription: 'Ten short proverbs — biblical and beyond — broken down into plain-language explanations you can actually apply to decisions you\'re facing this week.',
    category: 'Wisdom',
    readMinutes: 8,
    publishedLabel: 'Updated July 2026',
    accent: 'indigo',
    body: [
      { type: 'p', text: 'Proverbs are compressed wisdom — a single sentence doing the work of a much longer lesson. That compression is exactly what makes them easy to skim past without ever actually applying them. Slowing down on just a few at a time is where the real value is.' },
      { type: 'h2', text: 'On patience and timing' },
      { type: 'list', items: [
        'Proverbs 3:5-6 — trust the process even when you can\'t see the whole path; clarity often comes after the step, not before it.',
        'He who fails to plan is planning to fail (Benjamin Franklin) — a reminder that intention without a plan tends to evaporate.',
        'Do not repair your house in the rainy season — the time to build margin is before the crisis, not during it.',
      ]},
      { type: 'h2', text: 'On speech and relationships' },
      { type: 'list', items: [
        'A gentle answer turns away wrath (Proverbs 15:1) — de-escalation is a skill, not a personality trait, and it\'s learnable.',
        'Angry words are like thrown arrows — they cannot be recalled — worth remembering in the ten seconds before you respond, not after.',
        'He who walks with wise men will be wise (Proverbs 13:20) — your environment shapes your standards more than your willpower does.',
      ]},
      { type: 'h2', text: 'On character and consistency' },
      { type: 'list', items: [
        'Character is what you do when nobody is looking (John Wooden) — the most honest measure of who you actually are.',
        'Well begun is half done — a clear, honest start often carries more weight than a burst of effort halfway through.',
        'Measure twice, cut once — patience in preparation is rarely wasted time.',
        'Blessed is the one who finds wisdom (Proverbs 3:13) — a reminder that wisdom is something actively sought, not something that simply arrives.',
      ]},
      { type: 'p', text: 'You don\'t need to apply all ten at once. Pick the one that\'s most relevant to a decision you\'re actually facing this week, and let it sit with you longer than a single read.' },
    ],
  },
  {
    slug: 'how-to-memorize-scripture',
    title: 'How to Memorize Scripture: A Simple Method That Actually Works',
    metaDescription: 'A straightforward method for memorizing Bible verses that relies on repetition and context instead of brute-force cramming — plus which verses to start with.',
    category: 'Habits',
    readMinutes: 6,
    publishedLabel: 'Updated July 2026',
    accent: 'blue',
    body: [
      { type: 'p', text: 'Most attempts at memorizing scripture fail for the same reason cramming for an exam fails — the information goes in fast and leaves just as fast. Real memorization is closer to building a habit than passing a test.' },
      { type: 'h2', text: 'Start with one verse, not a list' },
      { type: 'p', text: 'Trying to memorize five verses in a week almost guarantees you\'ll retain none of them well. Pick one verse that\'s actually meaningful to your current season of life — not the one everyone else memorizes first — and give it the whole week.' },
      { type: 'h2', text: 'Break it into phrases, not words' },
      { type: 'p', text: 'Memorize meaning-based chunks rather than individual words. "The Lord is my shepherd" is one chunk. "I shall not want" is another. Two or three chunks are far easier to hold onto than one long unbroken sentence.' },
      { type: 'h2', text: 'Use the same trigger every day' },
      { type: 'list', items: [
        'Say it once when you wake up, before you\'ve looked at anything else.',
        'Say it again at the same point in your commute or walk each day.',
        'Say it once more before bed, even if you\'re tired and rushing it.',
      ]},
      { type: 'p', text: 'Repetition tied to a fixed moment in your day builds the memory far faster than trying to "find time" for it, which usually means it never happens.' },
      { type: 'h2', text: 'Review old verses on a rotating basis' },
      { type: 'p', text: 'Once you\'ve learned a verse, revisit it once a week rather than never again. A short, rotating list of five or six verses you\'ve already memorized — reviewed briefly but regularly — will stay with you for years. A pile of forty verses crammed once will not.' },
    ],
  },
];

interface BlogViewProps {
  onNavigateHome?: () => void;
}

export default function BlogView({ onNavigateHome }: BlogViewProps) {
  const initialSlug = useMemo(() => {
    const match = window.location.hash.match(/#\/blog\/([a-z0-9-]+)/i);
    return match ? match[1] : null;
  }, []);

  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug);
  const activePost = POSTS.find(p => p.slug === activeSlug) || null;

  // Basic client-side SEO: keep the tab title, meta description, and URL hash
  // in sync with whichever post is open. Note: since this is a client-rendered
  // SPA without server-side rendering, this helps returning visitors, sharing,
  // and crawlers that execute JavaScript — but distinct pre-rendered URLs per
  // post would give stronger search-indexing results if you add that later.
  useEffect(() => {
    const defaultTitle = 'Blog | Learn With Me — Bible, Motivation & Wisdom';
    const defaultDescription = 'Practical, detailed articles on daily Bible reading, scripture memorization, motivation, and everyday wisdom.';

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement('meta');
      descriptionTag.setAttribute('name', 'description');
      document.head.appendChild(descriptionTag);
    }

    if (activePost) {
      document.title = `${activePost.title} | Learn With Me`;
      descriptionTag.setAttribute('content', activePost.metaDescription);
      window.history.replaceState(null, '', `#/blog/${activePost.slug}`);
    } else {
      document.title = defaultTitle;
      descriptionTag.setAttribute('content', defaultDescription);
      if (window.location.hash.startsWith('#/blog/')) {
        window.history.replaceState(null, '', '#/blog');
      }
    }

    return () => {
      document.title = 'Learn With Me — Daily Bible, Motivation & Wisdom';
    };
  }, [activePost]);

  if (activePost) {
    const a = ACCENT[activePost.accent];
    const currentIndex = POSTS.findIndex(p => p.slug === activePost.slug);
    const nextPost = POSTS[(currentIndex + 1) % POSTS.length];

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 animate-fade-in-up">
        <button
          onClick={() => setActiveSlug(null)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to all articles
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className={`text-[10px] font-bold font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${a.bg} ${a.text} ${a.border}`}>
            {activePost.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3.5 h-3.5" /> {activePost.readMinutes} min read
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3.5 h-3.5" /> {activePost.publishedLabel}
          </span>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-6">
          {activePost.title}
        </h1>

        <article className="prose prose-sm sm:prose-base max-w-none space-y-4">
          {activePost.body.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="font-serif text-lg sm:text-xl font-bold text-gray-900 pt-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'list') {
              return (
                <ul key={i} className="space-y-2 list-none pl-0">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className={`mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {block.text}
              </p>
            );
          })}
        </article>

        <div className={`mt-10 p-5 rounded-2xl border ${a.bg} ${a.border} flex items-center justify-between gap-4 flex-wrap`}>
          <div className="flex items-center gap-2 min-w-0">
            <BookOpen className={`w-4 h-4 flex-shrink-0 ${a.text}`} />
            <span className="text-xs font-semibold text-gray-700 truncate">Next up: {nextPost.title}</span>
          </div>
          <button
            onClick={() => setActiveSlug(nextPost.slug)}
            className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl border flex-shrink-0 ${a.text} ${a.border} bg-white hover:bg-gray-50 transition-all active:scale-95`}
          >
            Read next <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 animate-fade-in-up">
      <div className="mb-8 sm:mb-10">
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          The Learn With Me Blog
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl leading-relaxed">
          Longer, more detailed reads on daily Bible reading, motivation, and everyday wisdom —
          for when a single verse isn't quite enough.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {POSTS.map(post => {
          const a = ACCENT[post.accent];
          return (
            <button
              key={post.slug}
              onClick={() => setActiveSlug(post.slug)}
              className="text-left bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-gray-200 transition-all flex flex-col gap-3"
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${a.dot}`} />
                <span className={`text-[10px] font-bold font-mono uppercase tracking-widest ${a.text}`}>
                  {post.category}
                </span>
              </div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-gray-900 leading-snug">
                {post.title}
              </h2>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">
                {post.metaDescription}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-auto pt-1">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readMinutes} min</span>
                <span>{post.publishedLabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
