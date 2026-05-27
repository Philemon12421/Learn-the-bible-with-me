import { BibleVerse, MotivationalQuote, WiseSaying } from './types';

// 31 Daily Bible verses with references, premium text, explanations, and reflections (one for each day of the month)
export const BIBLE_VERSES: BibleVerse[] = [
  {
    id: 'b1',
    reference: 'Philippians 4:13',
    text: 'I can do all things through Christ who strengthens me.',
    explanation: 'This verse is a powerful declaration of spiritual empowerment. It reminds us that our strength does not originate from our own limited resources, but is an active, continuous gift from God. In times of trials or when taking on bold endeavors, we are invited to lean into divine resilience.',
    reflection: 'Father, today I surrender my self-reliance and ask for Your spirit to dwell in me. Let my speech, actions, and decisions be fueled by Your supernatural strength, especially when I feel overwhelmed.'
  },
  {
    id: 'b2',
    reference: 'Psalm 23:1',
    text: 'The Lord is my shepherd; I shall not want.',
    explanation: 'A shepherd provides, guides, shields, and cares for his sheep. By declaring the Lord as our shepherd, we find peace in the promise that all our core spiritual, emotional, and physical needs are fully anticipated and met by a loving Protector.',
    reflection: 'Lord, guide me to green pastures and quiet waters today. Restore my soul, and help me walk with absolute trust that You are leading my path even through unknown valleys.'
  },
  {
    id: 'b3',
    reference: 'Proverbs 3:5-6',
    text: 'Trust in the Lord with all your heart, and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.',
    explanation: 'Human logic is limited by our perspective. When we place our ultimate confidence in God and invite Him into every daily decision, He aligns our circumstances and clarifies our path, carrying us beyond our own analytical limits.',
    reflection: 'Dear God, I yield my need to control and analyze every outcome. I trust Your perfect perspective. Open the doors You want opened today and close those that are not meant for my journey.'
  },
  {
    id: 'b4',
    reference: 'Joshua 1:9',
    text: 'Have I not commanded you? Be strong and of good courage; do not be afraid, nor be dismayed, for the Lord your God is with you wherever you go.',
    explanation: 'Courage is not the absence of fear, but the conviction that God is greater than the obstacle. Joshua was about to lead an entire nation into battles, yet God gave him a command to be courageous because the Divine Presence goes with him.',
    reflection: 'Heavenly Father, remove any spirit of fear within me. Let the quiet assurance of Your constant presence give me the bravery to take steps of faith today.'
  },
  {
    id: 'b5',
    reference: 'Romans 8:28',
    text: 'And we know that all things work together for good to those who love God, to those who are the called according to His purpose.',
    explanation: 'This verse is an anchor of hope. It doesn\'t say all things that happen are good, but that God possesses the sovereign creative ability to weave even our struggles, pain, and setbacks into a grand tapestry that ultimately benefits us.',
    reflection: 'Sovereign God, help me view life\'s disruptions not as dead ends, but as raw materials You are reshaping for my good and Your ultimate glory.'
  },
  {
    id: 'b6',
    reference: 'Isaiah 40:31',
    text: 'But those who wait on the Lord shall renew their strength; they shall mount up with wings like eagles, they shall run and not be weary, they shall walk and not faint.',
    explanation: 'Waiting is not passive stagnation; it is an active state of hopeful expectation in God\'s timing. As we wait, there is a holy exchange of our fatigue for His tireless, aerodynamic strength.',
    reflection: 'Lord, give me the patience to wait for Your perfect timing. Fill me with Your enduring spirit so I can rise above daily anxieties like an eagle.'
  },
  {
    id: 'b7',
    reference: 'Matthew 6:33',
    text: 'But seek first the kingdom of God and His righteousness, and all these things shall be added to you.',
    explanation: 'Anxiety often comes from worrying about tomorrow\'s provisions. Jesus recalibrates our priorities: run after His kingdom, align with His holiness, and watch your physical or earthly needs fall into place under His supply.',
    reflection: 'Father, I seek Your presence and righteousness first today. Forgive me for obsessing over material necessities, and let me rest in Your provider heart.'
  },
  {
    id: 'b8',
    reference: 'James 1:5',
    text: 'If any of you lacks wisdom, let him ask of God, who gives to all liberally and without reproach, and it will be given to him.',
    explanation: 'Wisdom is the practical application of spiritual truth to daily dilemmas. God doesn\'t scold us for admitting our confusion; instead, He gladly and generously pours out clarity whenever we ask in sincere faith.',
    reflection: 'Gracious Giver, I admit my limited perspective. Please grant me divine wisdom to handle my relationships, work coordinates, and private decisions today.'
  },
  {
    id: 'b9',
    reference: 'Hebrews 11:1',
    text: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
    explanation: 'Faith is not a vague positive thinking pattern. It is a solid assurance and tangible conviction in the reality of God\'s promises, holding onto them long before they manifest in our physical sight.',
    reflection: 'Lord, increase my faith. Grant me spiritual eyes to see what You are planning behind the scenes, holding fast to the reality of Your goodness.'
  },
  {
    id: 'b10',
    reference: 'Romans 12:2',
    text: 'And do not be conformed to this world, but be transformed by the renewing of your mind, that you may prove what is that good and acceptable and perfect will of God.',
    explanation: 'True life transformation begins in the thought life. By filtering our perspectives through the truth of scripture rather than daily cultural currents, our habits, choices, and direction are beautiful aligned with God\'s best.',
    reflection: 'Renew my mind today, Father. Clear away toxic, critical, or anxious thoughts. Help me adopt Your thoughts and discern Your wonderful path for me.'
  },
  {
    id: 'b11',
    reference: 'Psalm 46:1',
    text: 'God is our refuge and strength, a very present help in trouble.',
    explanation: 'A refuge is a fortress we run into for protection. The verse highlights that God isn\'t a distant savior; He is an immediate, highly accessible helper in the very midst of our storms.',
    reflection: 'When storms of life rage around me today, Father, let me find instant sanctuary in Your presence. You are my secure shelter and my strength.'
  },
  {
    id: 'b12',
    reference: '1 Peter 5:7',
    text: 'Casting all your care upon Him, for He cares for you.',
    explanation: 'The original language suggests "hurling" or throwing our heavy anxieties entirely onto God. We do this because His deep affection for us makes Him willing and glad to carry our burdens.',
    reflection: 'Lord, I cast the worries of my career, my family, and my future onto Your shoulders. I choose not to carry these burdens today, knowing You hold me.'
  },
  {
    id: 'b13',
    reference: 'Psalm 119:105',
    text: 'Your word is a lamp to my feet and a light to my path.',
    explanation: 'In ancient times, a foot-lamp illuminated only the very next step in the dark. Similarly, God\'s word provides the incremental guidance we need for today, keeping us safe one step at a time.',
    reflection: 'Speak to my heart through Your word today, Father. Light the next step I need to take, and keep my feet from slipping in the dark.'
  },
  {
    id: 'b14',
    reference: 'Proverbs 4:23',
    text: 'Keep your heart with all diligence, for out of it spring the issues of life.',
    explanation: 'Our thoughts, motives, desires, and decisions are formed in the heart. Diligently guarding what we allow to enter our hearts ensures we remain pure, wise, and healthy in all areas of life.',
    reflection: 'Guard my heart today from bitterness, green-eyed jealousy, and anger. Keep my inner spring pure and centered on Your unconditional love.'
  },
  {
    id: 'b15',
    reference: 'Isaiah 26:3',
    text: 'You will keep him in perfect peace, whose mind is stayed on You, because he trusts in You.',
    explanation: 'Peace is not the absence of external trouble, but the presence of an unwavering focus on God. When our minds are anchored on His power and faithfulness, we enjoy supernatural quietness.',
    reflection: 'Father, when anxious headlines or daily challenges try to steal my peace, keep my mental focus anchored steady on Your greatness.'
  },
  {
    id: 'b16',
    reference: 'Galatians 6:9',
    text: 'And let us not grow weary while doing good, for in due season we shall reap if we do not lose heart.',
    explanation: 'Spiritual farming takes time. Doing good can be exhausting when we don\'t see instant results. This verse promises that there is a guaranteed harvest if we keep sowing seeds of love and integrity.',
    reflection: 'Lord, renew my endurance today. When I feel like giving up or practicing compromise, remind me of the eternal harvest of righteousness ahead.'
  },
  {
    id: 'b17',
    reference: 'Ephesians 4:32',
    text: 'And be kind to one another, tenderhearted, forgiving one another, even as God in Christ forgave you.',
    explanation: 'Our willingness to forgive is the direct reflection of the absolute forgiveness we have received from God. Approaching painful relational situations with dynamic mercy is how we make God visible.',
    reflection: 'Soften my heart today. Release me from resentments, and let Your forgiveness flow through me to touch those who have hurt me.'
  },
  {
    id: 'b18',
    reference: 'Psalm 37:4',
    text: 'Delight yourself also in the Lord, and He shall give you the desires of your heart.',
    explanation: 'When we find our ultimate pleasure, satisfaction, and hobby in God\'s presence, our heart\'s desires are naturally refined to match His desires, ensuring our requests are beautiful, clean, and granted.',
    reflection: 'Lord, let my soul find complete delight in You today. Shape my dreams and wishes to reflect Your loving and dynamic purposes.'
  },
  {
    id: 'b19',
    reference: '2 Timothy 1:7',
    text: 'For God has not given us a spirit of fear, but of power and of love and of a sound mind.',
    explanation: 'Anxiety, panic, and timidity do not originate from God. Instead, He endows us with inner spiritual authority, infinite compassion, and clear self-control to evaluate situations rationally.',
    reflection: 'I stand in Your power today, Father. I reject every form of fear and step out with a clear, sound mind, guided by absolute love.'
  },
  {
    id: 'b20',
    reference: 'Colossians 3:23',
    text: 'And whatever you do, do it heartily, as to the Lord and not to men.',
    explanation: 'This elevates our daily routine into an act of worship. Whether washing dishes, writing software, or chairing a board meeting, doing it for God transforms the ordinary into the sacred.',
    reflection: 'Let my workspace be my sanctuary today, Lord. I dedicate my efforts and attention to You, executing every task with pristine integrity.'
  },
  {
    id: 'b21',
    reference: 'Psalm 100:4',
    text: 'Enter into His gates with thanksgiving, and into His courts with praise; be thankful to Him, and bless His name.',
    explanation: 'Gratitude is the passport to the Divine Presence. Approaching God with a heart that actively acknowledges His existing blessings unlocks closer communion and opens our eyes to His current works.',
    reflection: 'Thank You, Father, for the gift of life, breath, friendship, and hope. I enter this day singing of Your kindness and constant mercy.'
  },
  {
    id: 'b22',
    reference: 'Philippians 4:6-7',
    text: 'Be anxious for nothing, but in everything by prayer and supplication, with thanksgiving, let your requests be made known to God; and the peace of God, which surpasses all understanding, will guard your hearts and minds through Christ Jesus.',
    explanation: 'This is the divine exchange: we hand over our anxieties in prayer, accompanied by the sweet incense of gratitude, and He wraps our hearts in an incomprehensible peace that acts like a military guard.',
    reflection: 'Lord, I trade my worries for Your peace. I present my personal concerns to You now, and I thank You in advance for how You will handle them.'
  },
  {
    id: 'b23',
    reference: 'John 14:27',
    text: 'Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid.',
    explanation: 'Earthly peace depends on comfortable circumstances. Christ\'s peace, however, is an inward quality unaffected by external crises—a dynamic legacy given to all believers.',
    reflection: 'I receive Your permanent peace today, Jesus. Let this supernatural calm quiet every rising fear or anxiety in my immediate environment.'
  },
  {
    id: 'b24',
    reference: 'Isaiah 41:10',
    text: 'Fear not, for I am with you; be not dismayed, for I am your God. I will strengthen you, yes, I will help you, I will uphold you with My righteous right hand.',
    explanation: 'This verse is a direct pledge of divine support. When we feel overwhelmed or like we are falling, God promises to grasp us firmly, keeping us upright.',
    reflection: 'Hold me up today, Father. When my steps falter, strengthen my core and remind me that Your righteous hand has got me secured.'
  },
  {
    id: 'b25',
    reference: 'Proverbs 18:10',
    text: 'The name of the Lord is a strong tower; the righteous run to it and are safe.',
    explanation: 'In ancient defenses, a strong tower stood in the center of a city. No matter how fierce the battle, running inside guaranteed safety. Invoking God\'s character is our defensive sanctuary.',
    reflection: 'When I feel spiritually or mentally attacked, Lord, I run into Your name. Thank You for being my indestructible refuge.'
  },
  {
    id: 'b26',
    reference: 'Zephaniah 3:17',
    text: 'The Lord your God is in your midst, the Mighty One, will save; He will rejoice over you with gladness, He will quiet you with His love, He will rejoice over you with singing.',
    explanation: 'A breathtakingly intimate view of God: He isn\'t looking down in anger. He is actively singing over you, rejoicing, and wrapping you in an affectionate quietness that heals all trauma.',
    reflection: 'Father, quiet my chaotic thoughts with Your love. Let me hear the spiritual song of celebration You sing over my life today.'
  },
  {
    id: 'b27',
    reference: 'Lamentations 3:22-23',
    text: 'Through the Lord\'s mercies we are not consumed, because His compassions fail not. They are new every morning; great is Your faithfulness.',
    explanation: 'Every sunrise is a clean slate. No matter the failures of yesterday, God\'s warehouse of mercy is fully restocked for us every morning, offering endless fresh starts.',
    reflection: 'Thank You for a brand new morning and a brand new supply of Your mercy. I embrace this fresh start, leaving yesterday\'s regrets completely behind.'
  },
  {
    id: 'b28',
    reference: 'Romans 15:13',
    text: 'Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope by the power of the Holy Spirit.',
    explanation: 'Hope is not a fragile wish; it is a confident anticipation. God doesn\'t just give hope—He fills us to overflowing with joy and peace as we trust Him daily.',
    reflection: 'Fill me up, O God of hope! Let joy and peace bubble over from my life to refresh those around me who are walking in hopelessness.'
  },
  {
    id: 'b29',
    reference: 'Psalm 121:1-2',
    text: 'I will lift up my eyes to the hills—from whence comes my help? My help comes from the Lord, who made heaven and earth.',
    explanation: 'Instead of staring downward at our issues or around at human sources, we lift our gaze to the Creator of the universe. The architect of the stars has pledged to assist us.',
    reflection: 'I lift my eyes off my problems and focus on Your infinite power today. My practical help comes from You, Maker of the heavens.'
  },
  {
    id: 'b30',
    reference: 'Matthew 11:28-30',
    text: 'Come to Me, all you who labor and are heavy laden, and I will give you rest. Take My yoke upon you and learn from Me, for I am gentle and lowly in heart, and you will find rest for your souls.',
    explanation: 'Jesus invites us to step out of religious or legalistic burnout. Walking in rhythm with His gentle heart releases our inner tension, offering deep rest for our exhausted souls.',
    reflection: 'Jesus, I come to You exhausted from performing. I trade my heavy burdens for Your light yoke, and lean into Your gentle pace.'
  },
  {
    id: 'b31',
    reference: 'Ephesians 3:20',
    text: 'Now to Him who is able to do exceedingly abundantly above all that we ask or think, according to the power that works in us.',
    explanation: 'Our highest prayers and wild imaginations are only the floorboards of what God is capable of doing. His power is already active within our spirit, pushing past our limitations.',
    reflection: 'Father, expand my expectations today. Work through my prayers and actions beyond what I can conceptualize, and let Your power be magnified.'
  }
];

// 31 Daily Motivational Quotes with authors and actionable, empowering insights
export const MOTIVATIONAL_QUOTES: MotivationalQuote[] = [
  {
    id: 'm1',
    text: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    insight: 'Passionate focus changes your chemistry. When you connect with the core meaning of your tasks, they cease to be chores and become creative expressions of your potential.'
  },
  {
    id: 'm2',
    text: 'Believe you can and you\'re halfway there.',
    author: 'Theodore Roosevelt',
    insight: 'The mind is the ultimate gatekeeper. By shifting your conviction from doubt to complete probability, you write the mental blueprint for success before physical labor even begins.'
  },
  {
    id: 'm3',
    text: 'The future belongs to those who believe in the beauty of their dreams.',
    author: 'Eleanor Roosevelt',
    insight: 'Your visions are seeds of potential. Cherish them, give them mental space, and protect them from pessimistic noise; they are the architectures of tomorrow.'
  },
  {
    id: 'm4',
    text: 'It always seems impossible until it\'s done.',
    author: 'Nelson Mandela',
    insight: 'Breakthroughs always challenge established expectations. The illusion of impossibility is shattered the instant a single step is taken with persistent courage.'
  },
  {
    id: 'm5',
    text: 'Do not wait for standard opportunities; create them.',
    author: 'George Bernard Shaw',
    insight: 'Passive waiting breeds stagnation. Active execution, continuous learning, and courage in simple moments are what form magnificent openings.'
  },
  {
    id: 'm6',
    text: 'The best way to predict your future is to create it.',
    author: 'Abraham Lincoln',
    insight: 'You are not a passive spectator of fate. Your choices, habits, and daily actions write the chapters of your life in real-time.'
  },
  {
    id: 'm7',
    text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
    author: 'Winston Churchill',
    insight: 'Resilience is the only true currency. See every win as a checkpoint and every setback as a classroom, and you will become unstoppable.'
  },
  {
    id: 'm8',
    text: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.',
    author: 'Ralph Waldo Emerson',
    insight: 'Do not allow your history or your anxieties to overshadow your core potential. You house an internal resource base far greater than any external event.'
  },
  {
    id: 'm9',
    text: 'Continuous effort, not strength or intelligence, is the key to unlocking our potential.',
    author: 'Liane Cardes',
    insight: 'Consistency beats raw talent. Small, daily developmental steps yield monumental compounded changes over the span of a single year.'
  },
  {
    id: 'm10',
    text: 'You miss 100% of the shots you don\'t take.',
    author: 'Wayne Gretzky',
    insight: 'Fear of failure keeps us on the sidelines. Remember that a missed attempt is rich with lessons, while not trying guarantees zero progress.'
  },
  {
    id: 'm11',
    text: 'Act as if what you do makes a difference. It does.',
    author: 'William James',
    insight: 'Your actions have a ripple effect. Every kind word, micro-task executed with care, and silent display of integrity matters immensely.'
  },
  {
    id: 'm12',
    text: 'The secret of getting ahead is getting started.',
    author: 'Mark Twain',
    insight: 'Overthinking builds fortresses of procrastination. Dismantle them today by committing to do just five minutes of focused work right now.'
  },
  {
    id: 'm13',
    text: 'To live is the rarest thing in the world. Most people exist, that is all.',
    author: 'Oscar Wilde',
    insight: 'Do not drift through life asleep. Wake up to the colors, the sensations, the relationships, and the purpose waiting in this immediate 24-hour canvas.'
  },
  {
    id: 'm14',
    text: 'It is never too late to be what you might have been.',
    author: 'George Eliot',
    insight: 'Chronology does not limit growth. Your future is not locked by your past; you can choose a new direction and master a new skill at any point.'
  },
  {
    id: 'm15',
    text: 'Do what you can, with what you have, where you are.',
    author: 'Theodore Roosevelt',
    insight: 'Excuses thrive on idealized conditions. Perfection is an illusion; deploy your current, imperfect resources immediately and watch them expand.'
  },
  {
    id: 'm16',
    text: 'The only limit to our realization of tomorrow will be our doubts of today.',
    author: 'Franklin D. Roosevelt',
    insight: 'Your thoughts define your ceiling. Clearing away persistent cynicism allows your potential to stretch toward its true boundaries.'
  },
  {
    id: 'm17',
    text: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Aristotle',
    insight: 'Your destiny is built by routine, not rare sparks of brilliance. Curate your daily habits, and your results will take care of themselves.'
  },
  {
    id: 'm18',
    text: 'Strive not to be a success, but rather to be of value.',
    author: 'Albert Einstein',
    insight: 'Shift your focus from what you can extract from the world to what you can contribute. Usefulness naturally brings respect and sustainability.'
  },
  {
    id: 'm19',
    text: 'Doubt kills more dreams than failure ever will.',
    author: 'Suzy Kassem',
    insight: 'Failure teaches; doubt paralyzes. Dare to take actions even with shaking knees, because action is the only remedy for mental hesitation.'
  },
  {
    id: 'm20',
    text: 'If you want to lift yourself up, lift up someone else.',
    author: 'Booker T. Washington',
    insight: 'Human connection is reciprocal. Elevating others through encouragement and mentorship naturally expands your own leadership and joy.'
  },
  {
    id: 'm21',
    text: 'You draw your strength from your deepest convictions.',
    author: 'Helen Keller',
    insight: 'External motivation fades, but an inner alignment with clear, deep truth creates a reservoir of power that endures any dark storm.'
  },
  {
    id: 'm22',
    text: 'The man who moves a mountain begins by carrying away small stones.',
    author: 'Confucius',
    insight: 'Massive achievements are simply bundles of micro-wins. Focus entirely on moving the small stone in front of you today.'
  },
  {
    id: 'm23',
    text: 'Happiness is not something ready-made. It comes from your own actions.',
    author: 'Dalai Lama',
    insight: 'Do not wait for circumstances to make you happy. Practice gratitude, treat others gently, and pursue clean activities to generate joy from within.'
  },
  {
    id: 'm24',
    text: 'I have not failed. I\'ve just found 10,000 ways that won\'t work.',
    author: 'Thomas A. Edison',
    insight: 'Reframe mistakes as essential data points. Every unsuccessful attempt narrows the playing field and brings you closer to the winning formula.'
  },
  {
    id: 'm25',
    text: 'In the middle of difficulty lies opportunity.',
    author: 'Albert Einstein',
    insight: 'Problems are often packages containing growth. Train your eyes to look past the distress of a challenge to find the hidden lesson or pivot point.'
  },
  {
    id: 'm26',
    text: 'Hardships often prepare ordinary people for an extraordinary destiny.',
    author: 'C.S. Lewis',
    insight: 'The pressure you feel is not here to crush you; it is here to refine you, developing the depth, humility, and authority necessary for your next chapter.'
  },
  {
    id: 'm27',
    text: 'Don\'t watch the clock; do what it does. Keep going.',
    author: 'Sam Levenson',
    insight: 'Time moves forward regardless of distractions. Align yourself with that steady, rhythmic progress, taking your next step without obsessing over the distance.'
  },
  {
    id: 'm28',
    text: 'Dream big and dare to fail.',
    author: 'Norman Vaughan',
    insight: 'Small dreams keep us comfortable but unfulfilled. Take the lid off your expectations; being willing to risk failure is the first step toward greatness.'
  },
  {
    id: 'm29',
    text: 'You cannot cross the sea merely by standing and staring at the water.',
    author: 'Rabindranath Tagore',
    insight: 'Desiring progress without execution is painful. Steer your ship, set your sails, and plunge into action; momentum only rewards movement.'
  },
  {
    id: 'm30',
    text: 'The secret of change is to focus all of your energy not on fighting the old, but on building the new.',
    author: 'Socrates',
    insight: 'Do not waste valuable cognitive energy regretfully analyzing past mistakes. Direct your physical and spiritual forces entirely toward building positive habits today.'
  },
  {
    id: 'm31',
    text: 'Go confidently in the direction of your dreams! Live the life you\'ve imagined.',
    author: 'Henry David Thoreau',
    insight: 'Living authentically requires boldness. Discard the scripts written for you by society or fearful voices, and step onto the unique path of your true calling.'
  }
];

// 31 Daily Wise Sayings with authors and accessible explanations of their wisdom
export const WISE_SAYINGS: WiseSaying[] = [
  {
    id: 'w1',
    text: 'By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.',
    author: 'Confucius',
    explanation: 'Wisdom is achieved through multiple pathways. While life\'s hard experiences are memorable teachers, taking regular quiet time to reflect on our behaviors, values, and outcomes is the most honorable way to grow.'
  },
  {
    id: 'w2',
    text: 'Patience is the companion of wisdom.',
    author: 'Saint Augustine',
    explanation: 'Impulsiveness is the hallmark of immaturity. A truly wise person understands that deep developments, emotional healing, and valuable returns require time and calm preservation.'
  },
  {
    id: 'w3',
    text: 'The only true wisdom is in knowing you know nothing.',
    author: 'Socrates',
    explanation: 'Intellectual humility is the foundation of all learning. When we assume we have figured everything out, we close our minds. Admitting our lack of knowledge opens the floodgates to truth.'
  },
  {
    id: 'w4',
    text: 'A quiet water hides the depths of a wise mind.',
    author: 'African Saying',
    explanation: 'Shallow streams make the most noise, while deep rivers flow silently. True intelligence and spiritual authority are often cloaked in humility, gentle listening, and reserved speaking.'
  },
  {
    id: 'w5',
    text: 'Angry words are like thrown arrows; they cannot be recalled.',
    author: 'Eastern Sayings',
    explanation: 'Relational damage happens in a split second of tongue-slid control. Pause before responding under pressure; taking ten seconds to breathe can save a decade of trust.'
  },
  {
    id: 'w6',
    text: 'The roots of education are bitter, but the fruit is sweet.',
    author: 'Aristotle',
    explanation: 'The process of mastering a discipline, studying, and breaking bad habits is uncomfortable, demanding concentration and self-denial. But the resulting competence and freedom are magnificent rewards.'
  },
  {
    id: 'w7',
    text: 'A horse is strong, but a man of knowledge governs it.',
    author: 'Proverb',
    explanation: 'Raw physical force or sheer energy is secondary to strategic intellect and spiritual self-control. Train your mind, and you will govern variables far larger than your physical self.'
  },
  {
    id: 'w8',
    text: 'Do not repair your house in the rainy season.',
    author: 'West African Wisdom',
    explanation: 'Foresight and early action prevent crises. Cultivate healthy relationships, savings habits, and spiritual foundations during stable seasons so you survive emergencies easily.'
  },
  {
    id: 'w9',
    text: 'He who questions twice is twice as wise.',
    author: 'Wise Saying',
    explanation: 'Never accept surface explanations at face value. Healthy curiosity, careful verification, and open-minded listening lead to stable, bulletproof conclusions.'
  },
  {
    id: 'w10',
    text: 'Turn your face toward the sun, and shadows will fall behind you.',
    author: 'Maori Saying',
    explanation: 'Your mental coordinates define your emotional environment. Focus your gratitude, your hope, and your faith on what is pure and true, and past negative developments will naturally lose focus.'
  },
  {
    id: 'w11',
    text: 'Do not count your chickens before they are hatched.',
    author: 'Aesop',
    explanation: 'Presuming future success without completing the necessary steps breeds pride and messy disappointments. Focus completely on current execution with humble diligence.'
  },
  {
    id: 'w12',
    text: 'Silence is sometimes the most powerful answer.',
    author: 'Dalai Lama',
    explanation: 'Not every argument deserve your feedback. Often, silent dignity and quiet boundaries expose the noise of hostile critics far better than any elaborate explanation.'
  },
  {
    id: 'w13',
    text: 'A tree with strong roots laughs at the storm.',
    author: 'Malay Sayings',
    explanation: 'When your inner values, family integrity, and faith are anchored deep in truth, you can smile when trials rise, knowing you are built to survive.'
  },
  {
    id: 'w14',
    text: 'No legacy is so rich as honesty.',
    author: 'William Shakespeare',
    explanation: 'Deception results in heavy mental debt. A clean, completely transparent character creates deep reliability, giving you a quiet conscience and a reliable path.'
  },
  {
    id: 'w15',
    text: 'Kindness is the language which the deaf can hear and the blind can see.',
    author: 'Mark Twain',
    explanation: 'Empathy transcends all language barriers, social classes, and intellectual debates. Radical compassion is universally understood and instantly melts human defenses.'
  },
  {
    id: 'w16',
    text: 'Better a dry crust with peace and quiet than a house full of feasting, with strife.',
    author: 'Proverbs 17:1',
    explanation: 'Material prosperity without emotional safety and peaceful connections is empty and exhausting. Prioritize quietness, health, and clean love over chaotic gain.'
  },
  {
    id: 'w17',
    text: 'Well begun is half done.',
    author: 'Aristotle',
    explanation: 'Initial planning, clear setups, and quick boldness in taking the first step carry immense momentum. Set your intentions clearly, and the rest will roll.'
  },
  {
    id: 'w18',
    text: 'He who walks with wise men will be wise, but the companion of fools will be destroyed.',
    author: 'Proverbs 13:20',
    explanation: 'Your social environment acts as a silent thermostat. You unconsciously absorb the expectations, vocabularies, and ethics of your immediate group. Choose your circle intentionally.'
  },
  {
    id: 'w19',
    text: 'Be not afraid of going slowly, be afraid only of standing still.',
    author: 'Chinese Saying',
    explanation: 'Progress is progress, no matter how tiny the scale. A seed grows sub-millimeter measurements daily, yet eventually becomes a mighty oak. Avoid freezing up.'
  },
  {
    id: 'w20',
    text: 'He who master others is strong; he who master himself is mighty.',
    author: 'Lao Tzu',
    explanation: 'Controlling physical systems or leading other people is empty if you can\'t control your own desires, temper, and habits. Self-mastery is the ultimate definition of authority.'
  },
  {
    id: 'w21',
    text: 'A gentle answer turns away wrath, but a harsh word stirs up anger.',
    author: 'Proverbs 15:1',
    explanation: 'When someone approaches you with heat, responding with matching anger creates a fire. De-escalate with soft tones and steady looks to disarm their tension.'
  },
  {
    id: 'w22',
    text: 'Wisdom is not a product of schooling but of the lifelong attempt to acquire it.',
    author: 'Albert Einstein',
    explanation: 'Academics provide tools, but wisdom is acquired through active self-examination, experiences, and open-hearted learning that continues until our final breath.'
  },
  {
    id: 'w23',
    text: 'Even a fish would not get caught if it kept its mouth shut.',
    author: 'Korean Wisdom',
    explanation: 'Often the source of our trouble is speaking prematurely, boasting, or gossiping. Protect your opportunities by adopting a habit of calculated, highly respectful speech.'
  },
  {
    id: 'w24',
    text: 'Character is what you do when nobody is looking.',
    author: 'John Wooden',
    explanation: 'Public success is built on private disciplines. The actions you take in complete isolation determine the true strength and longevity of your life.'
  },
  {
    id: 'w25',
    text: 'A drop of honey catches more flies than a gallon of gall.',
    author: 'Abraham Lincoln',
    explanation: 'A sweet, encouraging disposition is infinitely more persuasive and engaging than cold criticism and constant relational pressure.'
  },
  {
    id: 'w26',
    text: 'Measure twice, cut once.',
    author: 'Craftsman Wisdom',
    explanation: 'Careful planning, diligent review, and patience prior to execution save massive amounts of remedial effort. Double-check your alignments before launching.'
  },
  {
    id: 'w27',
    text: 'He who fails to plan is planning to fail.',
    author: 'Benjamin Franklin',
    explanation: 'Intentionality is the rudder of daily life. Spend ten minutes selecting your coordinates every single morning to avoid drifting aimlessly in urgent trivia.'
  },
  {
    id: 'w28',
    text: 'Give a man a fish and you feed him for a day; teach a man to fish and you feed him for a lifetime.',
    author: 'Wise Saying',
    explanation: 'Empowerment beats dependency. Investing effort in training, teaching, and cultivating sustainable habits is a much greater act of love than providing easy, short-lived handouts.'
  },
  {
    id: 'w29',
    text: 'Do not judge a book by its cover.',
    author: 'Common Proverb',
    explanation: 'Surface appearances are highly misleading. A quiet, plain individual may house incredible wisdom and character, while flashy exteriors often mask extreme instability.'
  },
  {
    id: 'w30',
    text: 'Blessed is the one who finds wisdom, and the one who gets understanding.',
    author: 'Proverbs 3:13',
    explanation: 'Acquiring deep clarity and spiritual competence is more profitable than accumulating silver, gold, or fame. It provides a life of clean peace and deep alignment.'
  },
  {
    id: 'w31',
    text: 'The tongue has no bones, but it is strong enough to break a heart.',
    author: 'Proverb',
    explanation: 'Words possess spiritual weight. Be extremely selective with how you speak to your spouse, children, and colleagues today, utilizing your language to build rather than crush.'
  }
];

// Helper to get daily items based on day of year/month deterministically
export function getDailyBibleVerse(date: Date): BibleVerse {
  // Use day of month (1-31) to guarantee one of the 31 unique verses
  const day = date.getDate(); // 1 to 31
  const index = (day - 1) % BIBLE_VERSES.length;
  return BIBLE_VERSES[index];
}

export function getDailyMotivationalQuote(date: Date): MotivationalQuote {
  const day = date.getDate();
  const index = (day - 1) % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[index];
}

export function getDailyWiseSaying(date: Date): WiseSaying {
  const day = date.getDate();
  const index = (day - 1) % WISE_SAYINGS.length;
  return WISE_SAYINGS[index];
}
