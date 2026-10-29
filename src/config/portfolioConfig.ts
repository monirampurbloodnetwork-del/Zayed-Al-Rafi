/**
 * ============================================================================
 * ZAYED AL RAFI — CENTRALIZED PORTFOLIO CONFIGURATION
 * ============================================================================
 * Edit this single file to update personal details, biography, learning
 * milestones, skills, selected projects, social links, or background videos.
 * No component code changes are required for routine content updates.
 */

export type LanguageCode = 'en' | 'bn';

export type SectionId =
  | 'home'
  | 'about'
  | 'education'
  | 'skills'
  | 'goals'
  | 'contact';

export type ReelId = 'reel-01' | 'reel-02' | 'reel-03' | 'reel-04' | 'reel-05';

export interface VideoReelConfig {
  id: ReelId;
  indexLabel: string;
  title: string;
  canonicalFile: string;
  driveSourceName: string;
  driveFileId: string;
  videoSrc: string;
  posterSrc: string;
  /** Safe starting timestamp (seconds) so initial playback begins on a clean atmospheric frame */
  initialTime: number;
  /** Clean loop window (seconds) preserving seamless studio visuals */
  loopStart: number;
  loopEnd: number;
  /** CSS object-position on desktop / widescreen viewports */
  objectPosition: string;
  /** CSS object-position on mobile portrait viewports */
  mobileObjectPosition: string;
  /** Sections backed by this background video reel */
  sections: SectionId[];
}

export interface EducationMilestone {
  id: string;
  statusBadge: { en: string; bn: string };
  title: { en: string; bn: string };
  institution?: { en: string; bn: string };
  description: { en: string; bn: string };
  isCurrent?: boolean;
}

export interface SkillEntry {
  id: string;
  icon: 'cpu' | 'layout' | 'palette' | 'film' | 'message';
  title: { en: string; bn: string };
  focusTag: { en: string; bn: string };
  description: { en: string; bn: string };
}

export interface InterestEntry {
  id: string;
  icon: 'trophy' | 'gamepad' | 'camera' | 'pen' | 'terminal' | 'sparkles';
  label: { en: string; bn: string };
  detail: { en: string; bn: string };
}

export interface GoalPillar {
  id: string;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
}

export const PORTFOLIO_CONFIG = {
  identity: {
    fullName: 'Zayed Al Rafi',
    firstName: 'Zayed',
    lastName: 'Al Rafi',
    monogram: 'ZR',
    portraitSrc: './images/zayed-portrait.jpg',
    portraitAlt: 'Portrait of Zayed Al Rafi',
    locationLabel: {
      en: 'Bangladesh',
      bn: 'বাংলাদেশ',
    },
    roleBadge: {
      en: 'Student & Creative Digital Explorer',
      bn: 'শিক্ষার্থী ও ডিজিটাল সৃজনশীল অনুসন্ধানী',
    },
    /**
     * PRIVACY CONTROL:
     * Date of birth (6 September 2008) is kept strictly private by default.
     * Keep `displayDateOfBirth: false` unless you explicitly want it shown on the page.
     */
    displayDateOfBirth: false,
    privateDateOfBirth: '6 September 2008',
    enableLanguageToggle: true,
  },

  contact: {
    email: 'alzayedrafi@gmail.com',
    emailHref: 'mailto:alzayedrafi@gmail.com',
    phoneDisplay: '01918596621',
    phoneInternational: '+880 1918-596621',
    phoneHref: 'tel:+8801918596621',
    whatsappUrl: 'https://wa.me/8801918596621',
    facebookUrl: 'https://www.facebook.com/zayed.rafi.0',
    instagramUrl: 'https://www.instagram.com/_zayed_rafi?psln=MTBrZmY3dDl3dXI3dw==',
  },

  videoController: {
    /** Pause active background video ~600ms after scrolling stops */
    scrollPauseDelayMs: 600,
    /** Smooth crossfade duration between section background videos (500–900ms) */
    crossfadeDurationMs: 720,
  },

  videoReels: [
    {
      id: 'reel-01',
      indexLabel: '01',
      title: 'Hero Atmosphere',
      canonicalFile: '01-hero-intro.mp4',
      driveSourceName: 'Website_hero_animation_creation_e74ddf56.mp4',
      driveFileId: '1oKFB7VC1ij5XALdKsrXpGoCwxyLtDtjt',
      videoSrc: './videos/01-hero-intro.mp4',
      posterSrc: './posters/01-hero-intro.jpg',
      initialTime: 3.6,
      loopStart: 0.4,
      loopEnd: 6.2,
      objectPosition: 'center center',
      mobileObjectPosition: '68% center',
      sections: ['home'],
    },
    {
      id: 'reel-02',
      indexLabel: '02',
      title: 'Portrait Reveal',
      canonicalFile: '02-portrait-reveal.mp4',
      driveSourceName: 'minimax-h3-max_a_Create_an_exactly_8-.mp4',
      driveFileId: '15rfX6XIifvNgCZMLzb2mfew-Zh2EEueN',
      videoSrc: './videos/02-portrait-reveal.mp4',
      posterSrc: './posters/02-portrait-reveal.jpg',
      initialTime: 4.2,
      loopStart: 1.0,
      loopEnd: 9.8,
      objectPosition: 'center 24%',
      mobileObjectPosition: '60% 20%',
      sections: ['about'],
    },
    {
      id: 'reel-03',
      indexLabel: '03',
      title: '3D Architecture',
      canonicalFile: '03-3d-architecture.mp4',
      driveSourceName: '3D_motion_design_clip_eac0fee3.mp4',
      driveFileId: '1_Y1LZWS15beOziFtSJGgJggsvgv_AxxE',
      videoSrc: './videos/03-3d-architecture.mp4',
      posterSrc: './posters/03-3d-architecture.jpg',
      initialTime: 1.9,
      loopStart: 0.55,
      loopEnd: 7.85,
      objectPosition: 'center center',
      mobileObjectPosition: 'center center',
      sections: ['education', 'skills'],
    },
    {
      id: 'reel-04',
      indexLabel: '04',
      title: 'Future Horizons',
      canonicalFile: '04-project-showcase.mp4',
      driveSourceName: 'Create_3D_motion_graphics_clip_5e39a886.mp4',
      driveFileId: '1br0ZVcOMeTexivDZWT7WTBlfBNXphjmG',
      videoSrc: './videos/04-project-showcase.mp4',
      posterSrc: './posters/04-project-showcase.jpg',
      initialTime: 3.9,
      loopStart: 0.15,
      loopEnd: 7.85,
      objectPosition: 'center center',
      mobileObjectPosition: 'center center',
      sections: ['goals'],
    },
    {
      id: 'reel-05',
      indexLabel: '05',
      title: 'Signature Outro',
      canonicalFile: '05-signature-outro.mp4',
      driveSourceName: 'Creating_website_portfolio_outro…_f2328ef4.mp4',
      driveFileId: '1nfQ1k_CecgPDNaIzhxCzP7DYJey7u_dt',
      videoSrc: './videos/05-signature-outro.mp4',
      posterSrc: './posters/05-signature-outro.jpg',
      initialTime: 2.8,
      loopStart: 0.25,
      loopEnd: 5.1,
      objectPosition: 'center center',
      mobileObjectPosition: '65% center',
      sections: ['contact'],
    },
  ] as VideoReelConfig[],

  navigation: [
    { id: 'home' as SectionId, label: { en: 'Home', bn: 'হোম' } },
    { id: 'about' as SectionId, label: { en: 'About', bn: 'পরিচিতি' } },
    { id: 'education' as SectionId, label: { en: 'Learning Journey', bn: 'শিক্ষাপথ' } },
    { id: 'skills' as SectionId, label: { en: 'Skills & Interests', bn: 'দক্ষতা ও আগ্রহ' } },
    { id: 'goals' as SectionId, label: { en: 'Future Goals', bn: 'ভবিষ্যৎ লক্ষ্য' } },
    { id: 'contact' as SectionId, label: { en: 'Contact', bn: 'যোগাযোগ' } },
  ],

  hero: {
    eyebrow: {
      en: 'PERSONAL PORTFOLIO',
      bn: 'ব্যক্তিগত পোর্টফোলিও',
    },
    taglinePrefix: {
      en: 'Dream. Learn. Create.',
      bn: 'স্বপ্ন দেখো। শেখো। সৃষ্টি করো।',
    },
    taglineAccent: {
      en: 'Become.',
      bn: 'গড়ে ওঠো।',
    },
    intro: {
      en: 'I am Zayed Al Rafi — a student, curious technologist, and creative mind steadily shaping my craft across modern web design, visual storytelling, and digital media, one deliberate step each day.',
      bn: 'আমি জায়েদ আল রাফি — একজন শিক্ষার্থী, প্রযুক্তিপ্রেমী ও সৃজনশীল মানুষ। আধুনিক ওয়েব ডিজাইন, ভিজ্যুয়াল স্টোরিটেলিং এবং ডিজিটাল প্রযুক্তির জগতে প্রতিদিন একটু একটু করে নিজেকে গড়ে তুলছি।',
    },
    primaryCta: {
      en: 'About Me',
      bn: 'আমার সম্পর্কে',
    },
    secondaryCta: {
      en: 'Contact Me',
      bn: 'যোগাযোগ করুন',
    },
    scrollHint: {
      en: 'Scroll to set background cinema in motion',
      bn: 'স্ক্রল করলে ব্যাকগ্রাউন্ড সিনেমা সচল হবে',
    },
    portraitCaption: {
      title: { en: 'Zayed Al Rafi', bn: 'জায়েদ আল রাফি' },
      subtitle: { en: 'Authentic Mindset · Steady Craft', bn: 'সততা · নিষ্ঠা · সৃজনশীলতা' },
    },
  },

  about: {
    eyebrow: {
      en: 'ABOUT ME',
      bn: 'আমার সম্পর্কে',
    },
    headingLead: {
      en: 'A personal story shaped by',
      bn: 'কৌতূহল, মূল্যবোধ ও শেখার আগ্রহে গড়া',
    },
    headingAccent: {
      en: 'curiosity & character.',
      bn: 'আমার পথচলা।',
    },
    leadParagraph: {
      en: 'I am Zayed Al Rafi — a student with a deep appreciation for thoughtful design, emerging technology, and honest self-improvement.',
      bn: 'আমি জায়েদ আল রাফি — চিন্তাশীল ডিজাইন, নতুন প্রযুক্তি এবং আত্মউন্নয়নের প্রতি গভীর আগ্রহ নিয়ে এগিয়ে চলা একজন শিক্ষার্থী।',
    },
    bodyParagraphs: {
      en: [
        'To me, life is more than the passing of time. Every single day is an open opportunity to learn something unfamiliar, refine how I think, and prepare myself with discipline for the road ahead.',
        'I believe a person’s truest identity does not rest merely in titles or appearances — it lives in their curiosity, consistency, values, and the quiet care they bring to everything they create.',
      ],
      bn: [
        'জীবনকে আমি কেবল সময়ের প্রবাহ হিসেবে দেখি না; বরং প্রতিটি দিনকে নতুন কিছু শেখার, নিজের চিন্তাকে পরিশীলিত করার এবং আগামী দিনের জন্য নিজেকে প্রস্তুত করার একটি সুযোগ হিসেবে দেখি।',
        'আমি বিশ্বাস করি, একজন মানুষের প্রকৃত পরিচয় শুধু বাহ্যিক পরিচয়ে সীমাবদ্ধ নয়—তার চিন্তা, নৈতিকতা, পরিশ্রম এবং স্বপ্নের সততার মধ্যেই তার আসল পরিচয় ফুটে ওঠে।',
      ],
    },
    pillars: [
      {
        label: { en: 'Mindset', bn: 'মানসিকতা' },
        value: { en: 'Consistent Daily Learning', bn: 'প্রতিদিনের ধারাবাহিক শেখা' },
      },
      {
        label: { en: 'Creative Focus', bn: 'সৃজনশীল দিক' },
        value: { en: 'Web, Visuals & Digital Media', bn: 'ওয়েব, ডিজাইন ও ডিজিটাল মিডিয়া' },
      },
      {
        label: { en: 'Core Principle', bn: 'মূল বিশ্বাস' },
        value: { en: 'Authenticity Over Noise', bn: 'সততা ও পরিচ্ছন্ন কাজ' },
      },
    ],
  },

  education: {
    eyebrow: {
      en: 'EDUCATION & LEARNING JOURNEY',
      bn: 'শিক্ষা ও শেখার পথচলা',
    },
    headingLead: {
      en: 'Foundations built through',
      bn: 'প্রাতিষ্ঠানিক শিক্ষা ও স্বশিক্ষার',
    },
    headingAccent: {
      en: 'study & self-discovery.',
      bn: 'ধারাবাহিক যাত্রা।',
    },
    intro: {
      en: 'Formal classroom discipline paired with independent exploration in technology, visual communication, and modern web building. Every milestone below remains openly editable as new academic chapters unfold.',
      bn: 'প্রাতিষ্ঠানিক পড়াশোনার শৃঙ্খলার পাশাপাশি নিজ উদ্যোগে প্রযুক্তি, ভিজ্যুয়াল কমিউনিকেশন ও আধুনিক ওয়েব নির্মাণের চর্চা করে যাচ্ছি।',
    },
    /**
     * Authentic milestones only — no fabricated exam years or copied credentials.
     * Add specific school/college names or graduation years here anytime.
     */
    milestones: [
      {
        id: 'foundation',
        statusBadge: { en: 'Foundation', bn: 'ভিত্তি' },
        title: {
          en: 'Primary & Secondary Academic Grounding',
          bn: 'প্রাথমিক ও মাধ্যমিক শিক্ষার ভিত্তি',
        },
        description: {
          en: 'Developed core analytical thinking, mathematics, language fluency, and an early fascination with computers and information technology.',
          bn: 'গণিত, ভাষা, বিশ্লেষণধর্মী চিন্তাভাবনা এবং কম্পিউটার ও তথ্যপ্রযুক্তির প্রতি প্রাথমিক আগ্রহের দৃঢ় ভিত্তি গড়ে ওঠে।',
        },
      },
      {
        id: 'current-studies',
        statusBadge: { en: 'Current Focus', bn: 'বর্তমান অধ্যায়' },
        title: {
          en: 'College Studies & Personal Discipline',
          bn: 'কলেজ শিক্ষাজীবন ও আত্মগঠন',
        },
        description: {
          en: 'Advancing through formal academic studies with focus, discipline, teamwork, and clear communication while balancing creative digital pursuits.',
          bn: 'নিয়মানুবর্তিতা, একাগ্রতা এবং যোগাযোগ দক্ষতা চর্চার মধ্য দিয়ে বর্তমান শিক্ষাজীবন ও সৃজনশীল চর্চাকে এগিয়ে নিচ্ছি।',
        },
        isCurrent: true,
      },
      {
        id: 'digital-craft',
        statusBadge: { en: 'Self-Directed', bn: 'স্বশিক্ষিত চর্চা' },
        title: {
          en: 'Independent Web, Design & Media Exploration',
          bn: 'ওয়েব ডিজাইন, গ্রাফিক্স ও ডিজিটাল মিডিয়া অনুশীলন',
        },
        description: {
          en: 'Practicing responsive interface design, visual layout systems, graphic composition, and video editing through hands-on personal experiments.',
          bn: 'রেসপনসিভ ওয়েব ডিজাইন, ভিজ্যুয়াল লেআউট, গ্রাফিক ডিজাইন এবং ভিডিও এডিটিং নিয়ে নিয়মিত ব্যক্তিগত অনুশীলন ও প্রজেক্ট তৈরি।',
        },
      },
      {
        id: 'future-learning',
        statusBadge: { en: 'Next Chapter', bn: 'আগামীর লক্ষ্য' },
        title: {
          en: 'Higher Studies in Technology & Creative Engineering',
          bn: 'প্রযুক্তি ও সৃজনশীল প্রকৌশলে উচ্চশিক্ষার প্রস্তুতি',
        },
        description: {
          en: 'Preparing step by step for deeper academic study in computer science, interactive software, and purposeful digital product creation.',
          bn: 'কম্পিউটার বিজ্ঞান, সফটওয়্যার ও সৃজনশীল ডিজিটাল প্রযুক্তিতে আরও গভীর জ্ঞান অর্জনের লক্ষ্যে ধারাবাহিক প্রস্তুতি।',
        },
      },
    ] as EducationMilestone[],
  },

  skillsAndInterests: {
    eyebrow: {
      en: 'SKILLS & CREATIVE INTERESTS',
      bn: 'দক্ষতা ও আগ্রহের ক্ষেত্র',
    },
    headingLead: {
      en: 'Areas of genuine practice',
      bn: 'যে বিষয়গুলোতে নিয়মিত চর্চা',
    },
    headingAccent: {
      en: '& creative curiosity.',
      bn: 'ও গভীর আগ্রহ।',
    },
    intro: {
      en: 'Rather than claiming inflated percentages, here are the real disciplines I actively study, enjoy practicing, and refine through hands-on exploration.',
      bn: 'অতিরঞ্জিত দাবির পরিবর্তে যে বিষয়গুলোতে আমি সত্যিকারের আগ্রহ নিয়ে শিখছি ও নিয়মিত অনুশীলন করছি, সেগুলো নিচে তুলে ধরা হলো।',
    },
    skills: [
      {
        id: 'ict',
        icon: 'cpu',
        title: { en: 'Computer & ICT', bn: 'Computer / ICT' },
        focusTag: { en: 'Digital Foundations', bn: 'ডিজিটাল প্রযুক্তি' },
        description: {
          en: 'Strong everyday curiosity for computer systems, modern software tools, productivity workflows, and practical digital problem-solving.',
          bn: 'কম্পিউটার সিস্টেম, আধুনিক সফটওয়্যার টুলস এবং ডিজিটাল প্রযুক্তি নিয়ে কাজ ও সমাধান খোঁজার নিয়মিত আগ্রহ।',
        },
      },
      {
        id: 'web-design',
        icon: 'layout',
        title: { en: 'Web Design & Frontend', bn: 'Web Design' },
        focusTag: { en: 'Responsive Interfaces', bn: 'রেসপনসিভ ওয়েব' },
        description: {
          en: 'Crafting clean, responsive, and user-friendly web experiences with attention to typography, spacing, motion, and mobile usability.',
          bn: 'আধুনিক, রেসপনসিভ ও ব্যবহারবান্ধব ওয়েবসাইট তৈরির প্রতি গভীর আগ্রহ এবং টাইপোগ্রাফি ও মোশন নিয়ে কাজ করার চেষ্টা।',
        },
      },
      {
        id: 'graphic-design',
        icon: 'palette',
        title: { en: 'Graphic & Visual Design', bn: 'Graphic Design' },
        focusTag: { en: 'Visual Composition', bn: 'ভিজ্যুয়াল ডিজাইন' },
        description: {
          en: 'Translating raw ideas into balanced visual layouts, social visuals, color-controlled compositions, and expressive digital graphics.',
          bn: 'ভিজ্যুয়াল আইডিয়াকে পরিমিত রঙ, সুন্দর কম্পোজিশন ও সৃজনশীল ডিজাইনে রূপ দেওয়ার ধারাবাহিক প্রচেষ্টা।',
        },
      },
      {
        id: 'video-editing',
        icon: 'film',
        title: { en: 'Video Editing & Motion', bn: 'Video Editing' },
        focusTag: { en: 'Pacing & Atmosphere', bn: 'ভিডিও ও মোশন' },
        description: {
          en: 'Shaping digital clips and visual stories through clean cuts, atmospheric pacing, sound timing, and subtle cinematic presentation.',
          bn: 'ডিজিটাল কনটেন্ট ও ভিডিওকে সুন্দর ছন্দ, আলো-ছায়া ও আকর্ষণীয় উপস্থাপনায় ফুটিয়ে তোলার আগ্রহ।',
        },
      },
      {
        id: 'communication',
        icon: 'message',
        title: { en: 'Communication & Expression', bn: 'Communication' },
        focusTag: { en: 'Clarity & Respect', bn: 'যোগাযোগ দক্ষতা' },
        description: {
          en: 'Connecting thoughtfully with people, listening well, articulating ideas clearly in both Bangla and English, and collaborating with respect.',
          bn: 'মানুষের সঙ্গে আন্তরিকভাবে যোগাযোগ করা, মনোযোগ দিয়ে শোনা এবং নিজের ভাবনা স্পষ্টভাবে প্রকাশ করার দক্ষতা।',
        },
      },
    ] as SkillEntry[],

    interestsHeading: {
      en: 'Personal Interests & Everyday Inspiration',
      bn: 'ব্যক্তিগত আগ্রহ ও শখ',
    },
    interestsReflection: {
      en: 'Beyond screens and study desks, football, gaming, photography, writing, and creative exploration keep my perspective fresh. To me, hobbies are not merely ways to pass free hours — they sharpen observation and open new doors of thought.',
      bn: 'পড়াশোনা ও প্রযুক্তির পাশাপাশি ফুটবল, গেমিং, ফটোগ্রাফি, লেখালেখি এবং সৃজনশীল কাজ আমার প্রিয় আগ্রহের জায়গা। আমার কাছে শখ মানে শুধু অবসর কাটানো নয়; বরং মনকে সতেজ রাখা এবং নতুন চিন্তার জানালা খুলে দেওয়া।',
    },
    interests: [
      {
        id: 'football',
        icon: 'trophy',
        label: { en: 'Football', bn: 'ফুটবল' },
        detail: { en: 'Team spirit, rhythm & focus on the pitch', bn: 'মাঠের ছন্দ, দলগত সমন্বয় ও উদ্দীপনা' },
      },
      {
        id: 'gaming',
        icon: 'gamepad',
        label: { en: 'Gaming', bn: 'গেমিং' },
        detail: { en: 'Strategy, interactive worlds & quick decisions', bn: 'কৌশল, ইন্টারঅ্যাক্টিভ জগৎ ও দ্রুত চিন্তা' },
      },
      {
        id: 'photography',
        icon: 'camera',
        label: { en: 'Photography', bn: 'ফটোগ্রাফি' },
        detail: { en: 'Framing everyday light, mood & quiet moments', bn: 'আলো, ফ্রেম ও প্রতিদিনের নীরব মুহূর্ত ধরে রাখা' },
      },
      {
        id: 'writing',
        icon: 'pen',
        label: { en: 'Writing', bn: 'লেখালেখি' },
        detail: { en: 'Organizing reflections, notes & personal stories', bn: 'নিজের ভাবনা, অনুভূতি ও গল্প শব্দের ভাঁজে সাজানো' },
      },
      {
        id: 'technology',
        icon: 'terminal',
        label: { en: 'Technology', bn: 'প্রযুক্তি' },
        detail: { en: 'Exploring modern web tools, AI & digital craft', bn: 'নতুন ওয়েব টুলস ও আধুনিক প্রযুক্তির অনুসন্ধান' },
      },
      {
        id: 'creative-work',
        icon: 'sparkles',
        label: { en: 'Creative Work', bn: 'সৃজনশীল কাজ' },
        detail: { en: 'Visual experiments, layout studies & concepts', bn: 'নতুন ভিজ্যুয়াল আইডিয়া ও ডিজাইন এক্সপেরিমেন্ট' },
      },
    ] as InterestEntry[],
  },

  futureGoals: {
    eyebrow: {
      en: 'FUTURE GOALS',
      bn: 'ভবিষ্যৎ লক্ষ্য',
    },
    headingLead: {
      en: 'A long horizon ahead,',
      bn: 'সামনে এখনো অনেক দূরের পথ—',
    },
    headingAccent: {
      en: 'walked one honest step at a time.',
      bn: 'প্রতিদিন একটু করে এগিয়ে চলা।',
    },
    lead: {
      en: 'My ambition is not to stop at a single milestone. By uniting disciplined study, modern technology, creative sensibility, and steady effort, I want to build work that carries genuine value and earns lasting respect.',
      bn: 'আমার স্বপ্ন কোনো একটি নির্দিষ্ট বিন্দুতে থেমে যাওয়া নয়। জ্ঞান, আধুনিক প্রযুক্তি, সৃজনশীলতা ও নিজের পরিশ্রমকে কাজে লাগিয়ে ভবিষ্যতে একটি অর্থবহ ও সম্মানজনক অবস্থান তৈরি করতে চাই।',
    },
    quote: {
      en: '“Someone who moves steadily toward their dream a little every single day will, sooner or later, find the road opening to their destination.”',
      bn: '“যে মানুষ নিজের স্বপ্নকে সত্যি করার জন্য প্রতিদিন একটু একটু করে এগিয়ে যায়, একদিন না একদিন তার পথ ঠিকই গন্তব্যের কাছে পৌঁছে যায়।”',
    },
    pillars: [
      {
        id: 'depth',
        title: { en: 'Technical Depth', bn: 'প্রযুক্তিগত গভীরতা' },
        description: {
          en: 'Grow from foundational web design into confident full-spectrum software & interactive engineering.',
          bn: 'ওয়েব ডিজাইনের ভিত্তি থেকে ধাপে ধাপে আধুনিক সফটওয়্যার ও ইন্টারঅ্যাক্টিভ ইঞ্জিনিয়ারিংয়ে দক্ষতা অর্জন।',
        },
      },
      {
        id: 'creativity',
        title: { en: 'Thoughtful Craft', bn: 'পরিশীলিত সৃজনশীলতা' },
        description: {
          en: 'Create digital experiences, designs, and stories that feel calm, purposeful, and memorably human.',
          bn: 'এমন ডিজিটাল কাজ ও ডিজাইন তৈরি করা যা মানুষের কাছে সহজ, সুন্দর এবং অর্থবহ মনে হয়।',
        },
      },
      {
        id: 'contribution',
        title: { en: 'Meaningful Impact', bn: 'ইতিবাচক অবদান' },
        description: {
          en: 'Use knowledge and integrity to contribute positively to my community and inspire fellow young learners.',
          bn: 'নিজের জ্ঞান, সততা ও কাজ দিয়ে সমাজ ও চারপাশের মানুষের জন্য ইতিবাচক কিছু করে যাওয়া।',
        },
      },
    ] as GoalPillar[],
  },

  contactSection: {
    eyebrow: {
      en: 'CONTACT',
      bn: 'যোগাযোগ',
    },
    headingLead: {
      en: 'Let’s start a',
      bn: 'চলুন কথা বলি বা',
    },
    headingAccent: {
      en: 'conversation.',
      bn: 'যোগাযোগ করি।',
    },
    intro: {
      en: 'Whether you want to say hello, exchange ideas, collaborate on a creative project, or simply connect — feel welcome to reach out directly through any channel below.',
      bn: 'কোনো কথা, সৃজনশীল আইডিয়া বা সহযোগিতার জন্য নিচের যেকোনো মাধ্যমে সরাসরি যোগাযোগ করতে পারেন।',
    },
  },

  footer: {
    creditPrefix: 'Developed by',
    creditAuthor: 'Zarif.',
  },
} as const;
