import { BibleVerse, MotivationalQuote, WiseSaying } from './types';

// General fallback pool — used for any month that doesn't have its own
// dedicated set below (see BIBLE_VERSES_BY_MONTH).
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
  },
  {
    id: 'b32',
    reference: 'John 15:5',
    text: 'I am the vine, you are the branches. He who abides in Me, and I in him, bears much fruit; for without Me you can do nothing.',
    explanation: 'A branch has no independent life apart from the vine — its fruitfulness is entirely a byproduct of connection. Our productivity, character, and impact flow not from effort alone but from staying constantly attached to Christ.',
    reflection: 'Jesus, keep me abiding in You today. Let every good thing I produce simply be the natural overflow of staying close to You, not strain from working alone.'
  },
  {
    id: 'b33',
    reference: 'Psalm 27:1',
    text: 'The Lord is my light and my salvation; whom shall I fear? The Lord is the strength of my life; of whom shall I be afraid?',
    explanation: 'Light exposes danger and shows the way forward; salvation removes the threat entirely. With both realities anchored in God, fear loses its grip because there is nothing left unaddressed.',
    reflection: 'Lord, be my light in every uncertain situation today. Since You are my strength and salvation, I release the fears that have no true claim on me.'
  },
  {
    id: 'b34',
    reference: 'Proverbs 16:3',
    text: 'Commit your works to the Lord, and your thoughts will be established.',
    explanation: 'Mental chaos often comes from carrying plans alone. When we hand our projects, goals, and decisions over to God first, our thinking settles because we are no longer solely responsible for the outcome.',
    reflection: 'Father, I commit today\'s tasks and plans into Your hands before I begin. Settle my scattered thoughts and establish my steps according to Your will.'
  },
  {
    id: 'b35',
    reference: 'Micah 6:8',
    text: 'He has shown you, O man, what is good; and what does the Lord require of you but to do justly, to love mercy, and to walk humbly with your God?',
    explanation: 'Spirituality is often overcomplicated. This verse strips it down to three practical postures: fairness in action, tenderness toward others, and a humble, ongoing walk with God rather than showy religion.',
    reflection: 'Lord, simplify my faith today. Help me act justly toward others, love mercy readily, and walk humbly with You rather than performing for anyone else.'
  },
  {
    id: 'b36',
    reference: '1 Corinthians 13:4-7',
    text: 'Love suffers long and is kind; love does not envy; love does not parade itself, is not puffed up; bears all things, believes all things, hopes all things, endures all things.',
    explanation: 'This is love defined by action rather than feeling. Each clause describes a discipline — patience over irritation, humility over pride, endurance over giving up — that any of us can practice regardless of mood.',
    reflection: 'Teach me today, Lord, to love through action: patient instead of irritable, humble instead of boastful, enduring instead of giving up on the people in my life.'
  },
  {
    id: 'b37',
    reference: 'Deuteronomy 31:6',
    text: 'Be strong and of good courage, do not fear nor be afraid of them; for the Lord your God, He is the One who goes with you. He will not leave you nor forsake you.',
    explanation: 'Courage here is rooted in company, not personal bravado. Because God commits to travel every step of the road with us, the fear of facing it alone is removed entirely.',
    reflection: 'Father, remind me today that I am never facing anything alone. Because You go with me and will not leave me, I choose courage over fear.'
  },
  {
    id: 'b38',
    reference: 'Psalm 34:18',
    text: 'The Lord is near to those who have a broken heart, and saves such as have a contrite spirit.',
    explanation: 'God is not distant from pain — He draws especially close to it. Brokenness is not a disqualifier from His presence; it is often the very condition that positions us to feel Him nearest.',
    reflection: 'Lord, in whatever is broken in me today, draw near. Let me feel Your closeness precisely in the places that hurt, not just in the places that are whole.'
  },
  {
    id: 'b39',
    reference: 'Jeremiah 29:11',
    text: 'For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.',
    explanation: 'Even amid displacement and hardship, God discloses His intentions: not harm, but a deliberate future built on peace and hope. Our present circumstance is not the final word on our story.',
    reflection: 'Father, when my present season feels uncertain, remind me that Your thoughts toward me are peace, not harm. I trust You with the future You are shaping.'
  },
  {
    id: 'b40',
    reference: 'Galatians 5:22-23',
    text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, kindness, goodness, faithfulness, gentleness, self-control. Against such there is no law.',
    explanation: 'Rather than a checklist of rules, spiritual maturity is described as fruit — a natural, gradual outgrowth of a life rooted in the Spirit rather than forced effort or self-discipline alone.',
    reflection: 'Holy Spirit, grow Your fruit in me today — not by my striving, but by staying rooted in You, so love, joy, peace, and self-control ripen naturally in my life.'
  }
];

// ─── Month-specific verse sets ──────────────────────────────────────────────
// Dedicated verses for the current month (September) plus the next four
// (October → January). Explanations here are kept short and direct, as
// requested — one plain sentence instead of a full devotional paragraph.
// Any month not listed here (February–August) falls back to BIBLE_VERSES
// above via the modulo rotation, so nothing else in the app breaks.
export const BIBLE_VERSES_BY_MONTH: Record<number, BibleVerse[]> = {
  // September — index 8
  8: [
    { id: 'sep-01', reference: 'Ecclesiastes 3:1', text: 'To every thing there is a season, and a time to every purpose under the heaven.', explanation: 'Nothing in your life right now is permanent — this season has a purpose and an end.', reflection: 'Lord, help me trust Your timing instead of rushing or resisting this season.' },
    { id: 'sep-02', reference: 'Proverbs 16:9', text: 'A man\'s heart deviseth his way: but the Lord directeth his steps.', explanation: 'Plan carefully, but hold your plans loosely — God has the final say on your path.', reflection: 'Father, adjust my steps today even when they don\'t match my plan.' },
    { id: 'sep-03', reference: 'Philippians 1:6', text: 'He which hath begun a good work in you will perform it until the day of Jesus Christ.', explanation: 'God doesn\'t abandon what He starts in you — the work in progress is still His.', reflection: 'Thank You, Lord, for not giving up on the work You started in me.' },
    { id: 'sep-04', reference: 'Proverbs 22:6', text: 'Train up a child in the way he should go: and when he is old, he will not depart from it.', explanation: 'What you build into someone early shapes the direction they hold onto for life.', reflection: 'Lord, help me invest patiently in the people I\'m responsible for.' },
    { id: 'sep-05', reference: 'Ephesians 4:23', text: 'And be renewed in the spirit of your mind.', explanation: 'A fresh start begins in how you think, not just in your circumstances.', reflection: 'Renew my thinking today, Lord, before I renew anything else.' },
    { id: 'sep-06', reference: '2 Timothy 2:15', text: 'Study to shew thyself approved unto God, a workman that needeth not to be ashamed.', explanation: 'Diligence in learning is an act of respect toward the work you\'ve been given.', reflection: 'Give me discipline today to study and prepare well, not just get by.' },
    { id: 'sep-07', reference: 'Proverbs 9:10', text: 'The fear of the Lord is the beginning of wisdom.', explanation: 'Real wisdom starts with reverence for God, not just accumulated information.', reflection: 'Lord, let reverence for You shape how I use everything I learn.' },
    { id: 'sep-08', reference: 'Isaiah 43:19', text: 'Behold, I will do a new thing; now it shall spring forth.', explanation: 'God is already at work on something new, even before you can see it.', reflection: 'Open my eyes, Lord, to what You\'re starting that I haven\'t noticed yet.' },
    { id: 'sep-09', reference: 'Psalm 90:12', text: 'So teach us to number our days, that we may apply our hearts unto wisdom.', explanation: 'Treating your time as limited is what makes you use it wisely.', reflection: 'Father, help me spend today like it actually matters.' },
    { id: 'sep-10', reference: 'Proverbs 1:5', text: 'A wise man will hear, and will increase learning.', explanation: 'Wisdom grows through listening, not through always having the answer.', reflection: 'Lord, make me quick to listen today, not quick to assume.' },
    { id: 'sep-11', reference: 'James 1:22', text: 'Be ye doers of the word, and not hearers only.', explanation: 'Knowing what\'s right only matters once you actually act on it.', reflection: 'Help me act on what I already know today, not just agree with it.' },
    { id: 'sep-12', reference: 'Proverbs 4:7', text: 'Wisdom is the principal thing; therefore get wisdom.', explanation: 'Of everything worth pursuing, wisdom is worth prioritizing above the rest.', reflection: 'Lord, let me value wisdom above convenience today.' },
    { id: 'sep-13', reference: 'Psalm 32:8', text: 'I will instruct thee and teach thee in the way which thou shalt go.', explanation: 'God commits to actively guiding you, not just leaving you to figure it out.', reflection: 'Teach me, Lord — I\'m listening for Your direction today.' },
    { id: 'sep-14', reference: 'Habakkuk 2:2', text: 'Write the vision, and make it plain upon tables.', explanation: 'A clear, written goal is easier to act on than a vague idea in your head.', reflection: 'Help me get honest and specific about what I\'m working toward.' },
    { id: 'sep-15', reference: 'Proverbs 24:27', text: 'Prepare thy work without, and make it fit for thyself in the field.', explanation: 'Get the groundwork done first — build the foundation before the house.', reflection: 'Lord, give me patience for preparation, not just the finished result.' },
    { id: 'sep-16', reference: 'Nehemiah 8:10', text: 'The joy of the Lord is your strength.', explanation: 'Joy isn\'t a reward for finishing the work — it\'s fuel to keep going.', reflection: 'Let Your joy carry me through today\'s tasks, Lord, not just my willpower.' },
    { id: 'sep-17', reference: 'Proverbs 21:5', text: 'The thoughts of the diligent tend only to plenteousness.', explanation: 'Steady, careful effort builds more than quick shortcuts ever do.', reflection: 'Help me choose diligence over the easy shortcut today.' },
    { id: 'sep-18', reference: 'Galatians 6:4', text: 'Let every man prove his own work.', explanation: 'Measure your progress against your own effort, not against someone else\'s.', reflection: 'Lord, keep my eyes on my own work instead of comparing.' },
    { id: 'sep-19', reference: 'Psalm 1:2-3', text: 'His delight is in the law of the Lord... he shall be like a tree planted by the rivers of water.', explanation: 'Consistent time in God\'s word is what keeps you steady and fruitful.', reflection: 'Root me deep today, Lord, so I don\'t dry out under pressure.' },
    { id: 'sep-20', reference: '1 Corinthians 3:6', text: 'I have planted, Apollos watered; but God gave the increase.', explanation: 'You do the work; the actual growth and results are God\'s to give.', reflection: 'Lord, I\'ll do my part today and trust You for the outcome.' }
  ],
  // October — index 9
  9: [
    { id: 'oct-01', reference: '2 Corinthians 9:6', text: 'He which soweth bountifully shall reap also bountifully.', explanation: 'What you generously put in tends to come back to you the same way.', reflection: 'Lord, make me generous today, not calculating about what I give.' },
    { id: 'oct-02', reference: 'Psalm 107:1', text: 'O give thanks unto the Lord, for he is good.', explanation: 'Gratitude starts with who God is, before it even gets to what He\'s done.', reflection: 'Thank You, Lord, simply for being good today.' },
    { id: 'oct-03', reference: 'James 1:2-4', text: 'Count it all joy when ye fall into divers temptations... patience have her perfect work.', explanation: 'Hard seasons are doing something in you that comfort never could.', reflection: 'Help me see what this trial is building in me, Lord.' },
    { id: 'oct-04', reference: '1 Thessalonians 5:18', text: 'In every thing give thanks: for this is the will of God.', explanation: 'Thankfulness in hard moments, not just good ones, is what\'s asked of us.', reflection: 'Give me a thankful heart today, even in the parts that are hard.' },
    { id: 'oct-05', reference: 'Psalm 92:1', text: 'It is a good thing to give thanks unto the Lord.', explanation: 'Gratitude isn\'t just polite — it\'s genuinely good for you.', reflection: 'Lord, let gratitude shape my mood today, not circumstances.' },
    { id: 'oct-06', reference: 'Hosea 10:12', text: 'Sow to yourselves in righteousness, reap in mercy.', explanation: 'What you consistently practice is what eventually defines you.', reflection: 'Help me sow good choices today, trusting the harvest to You.' },
    { id: 'oct-07', reference: 'Proverbs 11:25', text: 'The liberal soul shall be made fat.', explanation: 'A generous spirit tends to end up more satisfied, not less.', reflection: 'Lord, loosen my grip on what I hold too tightly.' },
    { id: 'oct-08', reference: 'Deuteronomy 8:18', text: 'Remember the Lord thy God: for it is he that giveth thee power to get wealth.', explanation: 'Whatever ability you have to provide for yourself ultimately traces back to Him.', reflection: 'Thank You, Lord, for the strength and skill You\'ve given me.' },
    { id: 'oct-09', reference: 'Psalm 65:11', text: 'Thou crownest the year with thy goodness.', explanation: 'Looking back, God\'s goodness shows up across the whole stretch of a year.', reflection: 'Help me notice Your goodness across this past season, Lord.' },
    { id: 'oct-10', reference: '2 Corinthians 4:16', text: 'Though our outward man perish, yet the inward man is renewed day by day.', explanation: 'Even as circumstances wear you down, God is quietly rebuilding you inside.', reflection: 'Renew me on the inside today, Lord, regardless of what\'s happening outside.' },
    { id: 'oct-11', reference: 'Romans 5:3-4', text: 'Tribulation worketh patience; and patience, experience; and experience, hope.', explanation: 'Difficulty, handled well, builds character in a specific, traceable order.', reflection: 'Lord, let this hard thing produce patience in me, not bitterness.' },
    { id: 'oct-12', reference: 'Job 8:7', text: 'Though thy beginning was small, yet thy latter end should greatly increase.', explanation: 'A small, humble start doesn\'t predict a small finish.', reflection: 'Help me not despise small beginnings, Lord.' },
    { id: 'oct-13', reference: 'Psalm 126:5', text: 'They that sow in tears shall reap in joy.', explanation: 'The effort that costs you the most now can produce the deepest joy later.', reflection: 'Lord, turn what\'s costing me right now into future joy.' },
    { id: 'oct-14', reference: 'Proverbs 14:23', text: 'In all labour there is profit.', explanation: 'Real work — even unglamorous work — produces something worthwhile.', reflection: 'Help me find value in today\'s unglamorous tasks, Lord.' },
    { id: 'oct-15', reference: 'Colossians 3:15', text: 'Let the peace of God rule in your hearts... and be ye thankful.', explanation: 'Let peace, not anxiety, be what actually governs your reactions today.', reflection: 'Lord, let Your peace lead instead of my worry.' },
    { id: 'oct-16', reference: 'Ecclesiastes 11:6', text: 'In the morning sow thy seed, and in the evening withhold not thine hand.', explanation: 'Keep working consistently — you don\'t always know in advance what will succeed.', reflection: 'Give me persistence today, even without guaranteed results.' },
    { id: 'oct-17', reference: '1 Corinthians 15:58', text: 'Always abounding in the work of the Lord, forasmuch as ye know that your labour is not in vain.', explanation: 'Effort done for God is never actually wasted, even when it feels that way.', reflection: 'Remind me today, Lord, that this effort isn\'t pointless.' },
    { id: 'oct-18', reference: 'Psalm 30:5', text: 'Weeping may endure for a night, but joy cometh in the morning.', explanation: 'Painful seasons are real, but they aren\'t the final word.', reflection: 'Lord, meet me in tonight\'s sorrow and bring tomorrow\'s joy.' },
    { id: 'oct-19', reference: 'Proverbs 3:9', text: 'Honour the Lord with thy substance, and with the firstfruits of all thine increase.', explanation: 'What you do with your resources reveals what you actually honor.', reflection: 'Help me put You first with what I have, Lord, not what\'s left over.' },
    { id: 'oct-20', reference: 'Philippians 4:11', text: 'I have learned, in whatsoever state I am, therewith to be content.', explanation: 'Contentment is a learned skill, not something you\'re just born with.', reflection: 'Teach me contentment today, Lord, regardless of my circumstances.' }
  ],
  // November — index 10
  10: [
    { id: 'nov-01', reference: 'Psalm 136:1', text: 'O give thanks unto the Lord; for he is good: for his mercy endureth for ever.', explanation: 'His goodness isn\'t occasional — it\'s constant, which is worth thanking Him for.', reflection: 'Lord, thank You for mercy that never runs out.' },
    { id: 'nov-02', reference: 'Colossians 3:17', text: 'Whatsoever ye do in word or deed, do all in the name of the Lord Jesus, giving thanks.', explanation: 'Gratitude can color everything you say and do, not just special occasions.', reflection: 'Help me do today\'s ordinary tasks with a thankful heart.' },
    { id: 'nov-03', reference: '1 Chronicles 16:34', text: 'O give thanks unto the Lord; for he is good; for his mercy endureth for ever.', explanation: 'A short, repeatable line of thanks is worth saying often, not just once.', reflection: 'Lord, let this simple thanks become a daily habit for me.' },
    { id: 'nov-04', reference: 'Psalm 95:2', text: 'Let us come before his presence with thanksgiving.', explanation: 'Thankfulness is a good way to enter God\'s presence, not just leave it.', reflection: 'I come to You now, Lord, with thanks before anything else.' },
    { id: 'nov-05', reference: 'Ephesians 5:20', text: 'Giving thanks always for all things unto God.', explanation: 'This includes the hard things too — thanks isn\'t limited to the easy parts of life.', reflection: 'Help me find something to thank You for, even in what\'s difficult.' },
    { id: 'nov-06', reference: 'Psalm 9:1', text: 'I will praise thee, O Lord, with my whole heart.', explanation: 'Half-hearted gratitude is still gratitude, but full-hearted praise is the goal.', reflection: 'Lord, take my whole heart today, not just part of it.' },
    { id: 'nov-07', reference: '2 Corinthians 2:14', text: 'Now thanks be unto God, which always causeth us to triumph in Christ.', explanation: 'Victory in hard situations comes through Christ, which is worth thanking Him for.', reflection: 'Thank You for the wins I didn\'t earn on my own, Lord.' },
    { id: 'nov-08', reference: 'Psalm 107:8-9', text: 'Oh that men would praise the Lord for his goodness... he satisfieth the longing soul.', explanation: 'God actually meets the deep longing in you, not just the surface needs.', reflection: 'Satisfy what I\'m really longing for today, Lord.' },
    { id: 'nov-09', reference: 'Hebrews 13:15', text: 'Let us offer the sacrifice of praise to God continually.', explanation: 'Praise sometimes costs something, especially when it\'s hard to feel grateful.', reflection: 'Help me offer praise today even when I don\'t feel like it.' },
    { id: 'nov-10', reference: 'Psalm 34:1', text: 'I will bless the Lord at all times: his praise shall continually be in my mouth.', explanation: 'This is a decision to keep praising, not a feeling that just shows up.', reflection: 'Lord, let praise be my default response today.' },
    { id: 'nov-11', reference: '1 Timothy 4:4', text: 'Every creature of God is good, and nothing to be refused, if it be received with thanksgiving.', explanation: 'Receiving something with gratitude changes how you experience it.', reflection: 'Help me receive today\'s blessings with thanks, not indifference.' },
    { id: 'nov-12', reference: 'Psalm 28:7', text: 'My heart trusted in him, and I am helped: therefore my heart greatly rejoiceth.', explanation: 'Trust and help go together — rejoicing follows once you\'ve actually leaned on Him.', reflection: 'Lord, help me trust You before I see the outcome.' },
    { id: 'nov-13', reference: 'Deuteronomy 26:11', text: 'Thou shalt rejoice in every good thing which the Lord thy God hath given unto thee.', explanation: 'Rejoicing over what you already have is worth practicing, not just wishing for more.', reflection: 'Help me celebrate what I have today, Lord.' },
    { id: 'nov-14', reference: 'Psalm 103:2', text: 'Bless the Lord, O my soul, and forget not all his benefits.', explanation: 'It\'s easy to forget His past kindness once a new problem shows up.', reflection: 'Remind me today, Lord, of what You\'ve already done for me.' },
    { id: 'nov-15', reference: 'Romans 12:12', text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer.', explanation: 'Hope, patience, and prayer work together to carry you through hard seasons.', reflection: 'Lord, keep me hopeful, patient, and prayerful today.' },
    { id: 'nov-16', reference: 'Psalm 145:3', text: 'Great is the Lord, and greatly to be praised.', explanation: 'His greatness is the actual reason praise makes sense at all.', reflection: 'Help me see how great You truly are today, Lord.' },
    { id: 'nov-17', reference: 'Luke 17:15-16', text: 'One of them, when he saw that he was healed, turned back, and with a loud voice glorified God.', explanation: 'Out of ten people healed, only one came back to say thank you.', reflection: 'Lord, help me be the one who remembers to say thank You.' },
    { id: 'nov-18', reference: 'Psalm 118:1', text: 'O give thanks unto the Lord; for he is good.', explanation: 'A short, simple line — but worth actually saying out loud today.', reflection: 'Thank You, Lord. Simply, thank You.' },
    { id: 'nov-19', reference: 'Proverbs 17:22', text: 'A merry heart doeth good like a medicine.', explanation: 'A genuinely joyful outlook has a real, physical effect on you.', reflection: 'Lord, lighten my heart today, not just my circumstances.' },
    { id: 'nov-20', reference: 'Colossians 2:6-7', text: 'Rooted and built up in him... abounding therein with thanksgiving.', explanation: 'A life rooted in Christ naturally overflows into thankfulness.', reflection: 'Root me deeper in You today, Lord, and let thanks follow.' }
  ],
  // December — index 11
  11: [
    { id: 'dec-01', reference: 'Isaiah 9:6', text: 'Unto us a child is born, unto us a son is given... his name shall be called Wonderful, Counsellor, The mighty God.', explanation: 'The names given to this child describe exactly who He is, not just a title.', reflection: 'Lord, let this season remind me who Jesus actually is.' },
    { id: 'dec-02', reference: 'Luke 2:11', text: 'For unto you is born this day... a Saviour, which is Christ the Lord.', explanation: 'This news was personal — a Savior born specifically for you.', reflection: 'Thank You for a Savior born for me, not just for the world in general.' },
    { id: 'dec-03', reference: 'Matthew 1:23', text: 'They shall call his name Emmanuel, which being interpreted is, God with us.', explanation: 'Christmas is fundamentally about God choosing to be present with us.', reflection: 'Remind me today, Lord, that You are with me right now.' },
    { id: 'dec-04', reference: 'Isaiah 7:14', text: 'Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.', explanation: 'This promise was made centuries before it happened, and it still came true.', reflection: 'Help me trust Your promises today the way this one came true.' },
    { id: 'dec-05', reference: 'Luke 2:14', text: 'Glory to God in the highest, and on earth peace, good will toward men.', explanation: 'Heaven\'s celebration and earth\'s peace are connected in this one moment.', reflection: 'Let Your peace, not busyness, define my Christmas season.' },
    { id: 'dec-06', reference: 'Titus 2:11', text: 'The grace of God that bringeth salvation hath appeared to all men.', explanation: 'This grace wasn\'t limited to a select few — it appeared for everyone.', reflection: 'Thank You, Lord, that Your grace includes me.' },
    { id: 'dec-07', reference: 'John 1:14', text: 'The Word was made flesh, and dwelt among us.', explanation: 'God didn\'t just speak from a distance — He became one of us.', reflection: 'Help me grasp today what it means that You came close.' },
    { id: 'dec-08', reference: 'Luke 1:37', text: 'For with God nothing shall be impossible.', explanation: 'The impossible birth announced in this chapter is proof this promise is real.', reflection: 'Lord, remind me today of what You\'ve made possible before.' },
    { id: 'dec-09', reference: 'Micah 5:2', text: 'Out of thee shall he come forth unto me that is to be ruler in Israel.', explanation: 'God chose a small, overlooked town for His biggest announcement.', reflection: 'Help me trust that small, overlooked places matter to You too.' },
    { id: 'dec-10', reference: 'Galatians 4:4-5', text: 'When the fulness of the time was come, God sent forth his Son.', explanation: 'This wasn\'t rushed or delayed — it happened at exactly the right time.', reflection: 'Lord, help me trust Your timing in my own life right now.' },
    { id: 'dec-11', reference: 'John 3:16', text: 'For God so loved the world, that he gave his only begotten Son.', explanation: 'Christmas traces back to one motive: love, and a costly gift because of it.', reflection: 'Thank You, Lord, for loving me enough to give this much.' },
    { id: 'dec-12', reference: 'Luke 2:10', text: 'Fear not: for, behold, I bring you good tidings of great joy.', explanation: 'The very first instruction attached to this news was: don\'t be afraid.', reflection: 'Replace my fear today, Lord, with this good news instead.' },
    { id: 'dec-13', reference: 'Isaiah 60:1', text: 'Arise, shine; for thy light is come.', explanation: 'Light has already arrived — the response asked of you is to rise and reflect it.', reflection: 'Help me shine what You\'ve already given me, Lord.' },
    { id: 'dec-14', reference: 'Psalm 96:11', text: 'Let the heavens rejoice, and let the earth be glad.', explanation: 'This is an invitation to celebration that includes all of creation, not just people.', reflection: 'Lord, let my gladness today match what heaven already knows.' },
    { id: 'dec-15', reference: 'Titus 3:4', text: 'The kindness and love of God our Saviour toward man appeared.', explanation: 'God\'s character became visible, not just theoretical, in this event.', reflection: 'Help me see Your kindness clearly today, Lord.' },
    { id: 'dec-16', reference: 'Matthew 2:10', text: 'When they saw the star, they rejoiced with exceeding great joy.', explanation: 'These travelers had been searching a long time — the arrival was worth the wait.', reflection: 'Lord, let me rejoice like this over what You\'ve brought me to.' },
    { id: 'dec-17', reference: '1 John 4:9', text: 'God sent his only begotten Son into the world, that we might live through him.', explanation: 'The purpose behind this gift was specifically your life, not just a symbolic gesture.', reflection: 'Thank You for a gift with my actual life in mind, Lord.' },
    { id: 'dec-18', reference: 'Luke 2:19', text: 'Mary kept all these things, and pondered them in her heart.', explanation: 'Not every response to God\'s work needs to be loud — some things are worth quietly treasuring.', reflection: 'Help me slow down today and treasure what You\'re doing, Lord.' },
    { id: 'dec-19', reference: 'Isaiah 40:5', text: 'The glory of the Lord shall be revealed, and all flesh shall see it together.', explanation: 'What God reveals isn\'t meant to stay hidden — it\'s meant to be seen widely.', reflection: 'Lord, let Your glory be visible through me today.' },
    { id: 'dec-20', reference: 'Revelation 21:5', text: 'Behold, I make all things new.', explanation: 'God\'s work of renewal didn\'t end at Christmas — it continues even now.', reflection: 'Make something new in me today, Lord, as this year closes.' }
  ],
  // January — index 0
  0: [
    { id: 'jan-01', reference: 'Philippians 3:13-14', text: 'Forgetting those things which are behind... I press toward the mark.', explanation: 'Progress requires releasing your grip on the past, not just wanting the future.', reflection: 'Lord, help me let go of last year and press toward what\'s ahead.' },
    { id: 'jan-02', reference: 'Ecclesiastes 3:11', text: 'He hath made every thing beautiful in his time.', explanation: 'Good timing matters as much as good effort — trust His pace, not just your plan.', reflection: 'Help me trust Your timing for this new year, Lord.' },
    { id: 'jan-03', reference: 'Psalm 37:5', text: 'Commit thy way unto the Lord; trust also in him; and he shall bring it to pass.', explanation: 'Handing God your plans is the first step, not the last resort.', reflection: 'Lord, I commit this year\'s plans to You before I even begin.' },
    { id: 'jan-04', reference: 'Deuteronomy 31:8', text: 'The Lord, he it is that doth go before thee; he will be with thee.', explanation: 'Whatever this year holds, you\'re not walking into it first or alone.', reflection: 'Thank You for going ahead of me into this new year, Lord.' },
    { id: 'jan-05', reference: '2 Corinthians 5:17', text: 'Old things are passed away; behold, all things are become new.', explanation: 'A genuine fresh start is possible — last year doesn\'t have to define this one.', reflection: 'Lord, help this actually be a fresh start, not just a new date.' },
    { id: 'jan-06', reference: 'Psalm 139:23-24', text: 'Search me, O God, and know my heart... lead me in the way everlasting.', explanation: 'A good year starts with honest self-examination, not just new goals.', reflection: 'Search my heart honestly, Lord, before I set my plans.' },
    { id: 'jan-07', reference: 'Hebrews 12:1', text: 'Let us run with patience the race that is set before us.', explanation: 'This is a marathon, not a sprint — pace matters more than a fast start.', reflection: 'Give me patience for the long run this year, Lord.' },
    { id: 'jan-08', reference: 'Deuteronomy 30:19', text: 'Choose life, that both thou and thy seed may live.', explanation: 'You have a real choice in front of you — make it deliberately, not by default.', reflection: 'Help me choose well today, Lord, not just drift.' },
    { id: 'jan-09', reference: 'Proverbs 4:25-26', text: 'Let thine eyes look right on... ponder the path of thy feet.', explanation: 'Stay focused on where you\'re actually headed, not distracted by every direction.', reflection: 'Keep my focus steady this year, Lord.' },
    { id: 'jan-10', reference: 'Psalm 51:10', text: 'Create in me a clean heart, O God; and renew a right spirit within me.', explanation: 'A new year is a good moment to ask for a genuinely renewed heart, not just new habits.', reflection: 'Renew my heart this year, Lord, not just my routine.' },
    { id: 'jan-11', reference: 'Ephesians 5:15-16', text: 'See then that ye walk circumspectly... redeeming the time.', explanation: 'Being intentional with your time is a skill worth practicing this year.', reflection: 'Help me use my time well this year, Lord.' },
    { id: 'jan-12', reference: 'James 4:14-15', text: 'If the Lord will, we shall live, and do this, or that.', explanation: 'Plan for the year, but hold it with open hands, not tight fists.', reflection: 'Lord, I make plans this year, but Your will comes first.' },
    { id: 'jan-13', reference: 'Proverbs 27:1', text: 'Boast not thyself of to morrow; for thou knowest not what a day may bring forth.', explanation: 'Confidence about the future should stay humble, since none of it is guaranteed.', reflection: 'Keep me humble about tomorrow, Lord, and present today.' },
    { id: 'jan-14', reference: 'Psalm 143:10', text: 'Teach me to do thy will; for thou art my God.', explanation: 'A good year isn\'t about doing more — it\'s about doing what He actually wants.', reflection: 'Teach me Your will this year, Lord, not just my ambition.' },
    { id: 'jan-15', reference: '1 Corinthians 9:24', text: 'Run, that ye may obtain.', explanation: 'Effort matters — showing up in the race is what makes reaching the goal possible.', reflection: 'Give me the discipline to actually run this year, Lord.' },
    { id: 'jan-16', reference: 'Proverbs 19:21', text: 'There are many devices in a man\'s heart; nevertheless the counsel of the Lord, that shall stand.', explanation: 'You can plan all you want, but His purpose is what ultimately holds.', reflection: 'Lord, let Your purpose stand above my own plans this year.' },
    { id: 'jan-17', reference: 'Psalm 20:4', text: 'Grant thee according to thine own heart, and fulfil all thy counsel.', explanation: 'This is a prayer worth praying over your own goals this year.', reflection: 'Lord, align my heart\'s desires with Your counsel this year.' },
    { id: 'jan-18', reference: '2 Peter 3:18', text: 'Grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ.', explanation: 'The real goal this year isn\'t just achievement — it\'s growth in knowing Him.', reflection: 'Let me know You more this year, Lord, above everything else.' },
    { id: 'jan-19', reference: 'Habakkuk 3:19', text: 'The Lord God is my strength, and he will make my feet like hinds\' feet.', explanation: 'Steady footing on difficult ground is something He provides, not something you produce.', reflection: 'Be my strength this year, Lord, especially on uncertain ground.' },
    { id: 'jan-20', reference: 'Isaiah 65:17', text: 'For, behold, I create new heavens and a new earth.', explanation: 'God\'s renewal isn\'t limited to your life — He\'s remaking everything, eventually.', reflection: 'Thank You, Lord, that Your renewal is bigger than just this year.' }
  ]
};

export function getDailyBibleVerse(date: Date): BibleVerse {
  const month = date.getMonth();
  const day = date.getDate();
  const monthlyPool = BIBLE_VERSES_BY_MONTH[month];
  if (monthlyPool && monthlyPool.length > 0) {
    return monthlyPool[(day - 1) % monthlyPool.length];
  }
  // Months without a dedicated set (Feb–Aug) fall back to the general pool.
  const index = (day - 1 + month * 9) % BIBLE_VERSES.length;
  return BIBLE_VERSES[index];
}

// ─── Motivational quotes and wise sayings — unchanged ───────────────────────

// 40 Motivational Quotes with authors and actionable, empowering insights
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
  },
  {
    id: 'm32',
    text: 'Whether you think you can, or you think you can\'t — you\'re right.',
    author: 'Henry Ford',
    insight: 'Your expectation quietly shapes your effort. Two people with identical skill often diverge in outcome purely because of the story each one believes about their own capability.'
  },
  {
    id: 'm33',
    text: 'The only impossible journey is the one you never begin.',
    author: 'Tony Robbins',
    insight: 'Impossibility is often a label we attach before ever testing the first step. Begin imperfectly; momentum has a way of revealing a path that standing still never will.'
  },
  {
    id: 'm34',
    text: 'Everything you\'ve ever wanted is on the other side of fear.',
    author: 'George Addair',
    insight: 'Fear usually guards the exact threshold where growth lives. Treat its presence not as a stop sign but as a marker that something worthwhile is just ahead.'
  },
  {
    id: 'm35',
    text: 'Success usually comes to those who are too busy to be looking for it.',
    author: 'Henry David Thoreau',
    insight: 'Chasing outcomes directly often produces anxiety instead of results. Pour your energy into meaningful daily work, and success tends to arrive as a byproduct.'
  },
  {
    id: 'm36',
    text: 'Opportunities don\'t happen. You create them.',
    author: 'Chris Grosser',
    insight: 'Waiting for a perfect opening keeps you passive. The people who advance are usually the ones who build the door instead of waiting for one to open.'
  },
  {
    id: 'm37',
    text: 'Don\'t be afraid to give up the good to go for the great.',
    author: 'John D. Rockefeller',
    insight: 'Comfortable and adequate can quietly become the enemy of exceptional. Periodically ask whether what\'s "good enough" is actually costing you something greater.'
  },
  {
    id: 'm38',
    text: 'The way to get started is to quit talking and begin doing.',
    author: 'Walt Disney',
    insight: 'Planning has diminishing returns once the basic direction is clear. At some point, the only way to learn what actually works is to start moving and adjust as you go.'
  },
  {
    id: 'm39',
    text: 'Your time is limited, so don\'t waste it living someone else\'s life.',
    author: 'Steve Jobs',
    insight: 'Borrowed ambitions rarely satisfy. Regularly check whether your goals are truly yours, or inherited scripts from family, culture, or comparison you never chose.'
  },
  {
    id: 'm40',
    text: 'The harder you work for something, the greater you\'ll feel when you achieve it.',
    author: 'Anonymous',
    insight: 'Effortless wins fade quickly from memory, but hard-earned ones become part of your identity. Let the difficulty of the climb add to the value of the summit, not subtract from it.'
  }
];

// 40 Wise Sayings with authors and accessible explanations of their wisdom
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
  },
  {
    id: 'w32',
    text: 'The bamboo that bends is stronger than the oak that resists.',
    author: 'Japanese Proverb',
    explanation: 'Rigidity often breaks under pressure that flexibility would have survived. Wisdom sometimes looks like adapting your approach rather than stubbornly holding your original position.'
  },
  {
    id: 'w33',
    text: 'Not all those who wander are lost.',
    author: 'J.R.R. Tolkien',
    explanation: 'A winding, uncertain path is not automatically a mistake. Some of the most meaningful growth happens during seasons that don\'t look linear or clearly mapped out from the outside.'
  },
  {
    id: 'w34',
    text: 'When the student is ready, the teacher appears.',
    author: 'Buddhist Proverb',
    explanation: 'Readiness matters as much as opportunity. The same lesson can pass by unnoticed for years until the moment we\'re finally humble and attentive enough to actually receive it.'
  },
  {
    id: 'w35',
    text: 'A single arrow is easily broken, but not ten in a bundle.',
    author: 'Japanese Proverb',
    explanation: 'Isolation makes us fragile; community makes us resilient. Whatever burden feels unbearable alone often becomes manageable the moment it is shared with others.'
  },
  {
    id: 'w36',
    text: 'The best time to plant a tree was 20 years ago. The second best time is now.',
    author: 'Chinese Proverb',
    explanation: 'Regret over a late start is wasted energy compared to simply beginning today. The gap between an ideal timeline and your actual one closes the moment you take the first step.'
  },
  {
    id: 'w37',
    text: 'Little strokes fell great oaks.',
    author: 'Benjamin Franklin',
    explanation: 'No single action topples something significant, whether a habit, a debt, or a mighty tree. Consistent small effort, repeated over time, is what eventually brings down the largest obstacles.'
  },
  {
    id: 'w38',
    text: 'He that would eat the fruit must climb the tree.',
    author: 'Proverb',
    explanation: 'Reward is rarely separated from effort by more than one honest step. Wishing for the fruit while avoiding the climb is simply another way of choosing to stay hungry.'
  },
  {
    id: 'w39',
    text: 'Fall seven times, stand up eight.',
    author: 'Japanese Proverb',
    explanation: 'The count of failures is irrelevant next to the count of times you got back up. Resilience isn\'t the absence of falling; it\'s simply refusing to let the last fall be final.'
  },
  {
    id: 'w40',
    text: 'There is no shortcut to any place worth going.',
    author: 'Beverly Sills',
    explanation: 'Anything genuinely valuable — mastery, character, deep relationships — is built through time and repetition, not discovered through a clever bypass. Respect the process instead of hunting for a way around it.'
  }
];

export function getDailyMotivationalQuote(date: Date): MotivationalQuote {
  const day = date.getDate();
  const month = date.getMonth();
  const index = (day - 1 + month * 9) % MOTIVATIONAL_QUOTES.length;
  return MOTIVATIONAL_QUOTES[index];
}

export function getDailyWiseSaying(date: Date): WiseSaying {
  const day = date.getDate();
  const month = date.getMonth();
  const index = (day - 1 + month * 9) % WISE_SAYINGS.length;
  return WISE_SAYINGS[index];
}
