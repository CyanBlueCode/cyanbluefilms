// Configuration to enable/disable CMS for specific landing pages
export const enableTestVersionsByPage = {
  // NOTE false disconnects CMS for page & uses default data below only
  combatSports: true,
  fightSports: true,
  actionSports: true,
  highOctane: true,
  fitness: true,
  fitnessBrands: true,
  agencyPartners: true,
  brandedSponsoredDocs: true,
};

// Shared loading component
export const LoadingScreen = () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000',
      backgroundImage: 'url(/images/landing/leo_poster-frame.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  />
);

// Default data for combat sports landing page
export const combatSportsDefaultData = {
  heroSection: {
    title: 'Cinematic Fitness Brand Films That Pack a Punch',
    subtitle: [
      'Created by filmmakers who train in combat sports; we know your world.',
      'Capture everything you need in one shoot day: a main promo film + ready-to-post clips to attract new members and keep your current ones engaged.',
    ],
    callButtonText: 'Book a call',
    backgroundVideo: {
      filePath: '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop.mov',
      posterFramePath:
        '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop_PosterFrame.jpg',
      vidWidth: 1920,
      codec: 'h264',
      audio: false,
    },
  },
  mainVideoSection: {
    title: 'Our Work in Action',
    subtitle:
      'A glimpse at the high-quality tailored marketing hero videos we create for combat sports gyms like yours',
    thumbnail: '/images/film.jpg',
    videoUrl: 'https://www.youtube.com/embed/J0IItrdHQ2s',
    chapters: [
      {
        title: 'Head Coach Introduction',
        description:
          'Designed to work both as a standalone asset and intro of the full brand film.',
        percentage: 32,
        imageUrl: '/images/landing/cover.jpg',
      },
      {
        title: 'Boxing Training',
        description:
          'High-energy boxing training sequences with title holding pro athletes, lead by 3 division world champ Leo Santa Cruz. Designed with multiple cutdown points for versatile short-form trims.',
        percentage: 30,
        imageUrl: '/images/landing/cover2.jpg',
      },
      {
        title: 'Conditioning',
        description:
          'Conditioning sequences that work as standalone social media and ad cutdowns',
        percentage: 10,
        imageUrl: '/images/hero2.jpg',
      },
      {
        title: 'Sparring',
        description: 'Technical sparring',
        percentage: 23,
        imageUrl: '/images/film.jpg',
      },
      {
        title: 'Recovery Equipment',
        description: 'Shiny high tech equipment',
        percentage: 4,
        imageUrl: '/images/film.jpg',
      },
    ],
  },
  benefitsSection: {
    title: 'Why Choose Us',
    subtitle:
      "We don't just make videos, we create high-value tailored marketing assets that drive new members and set your fitness brand apart",
    cards: [
      {
        title: 'Content That Converts',
        description:
          'We train in combat sports and understand fight culture from the inside. Our videos resonate with both casual fitness seekers and serious fighters alike, and turn viewers into paying members, not just likes.',
      },
      {
        title: 'Stand Out From The Competition',
        description:
          'Generic social clips get lost in the scroll. Our professional videos make your gym look world-class. Tailored to your gym and shot on real cinema cameras, giving you a clear edge over competitors in a crowded market.',
      },
      {
        title: 'Max Reach From One Shoot',
        description:
          'Every shoot is optimized for multiple platforms and formats in a single package, so you get weeks of content that works everywhere from IG reels to your website hero video without extra hassle.',
      },
      {
        title: 'Max Reach From One Shoot!!!',
        description:
          'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test .',
      },
      {
        title: 'BACKGROUND IMAGE TEST',
        description:
          'background image test test test test test test test test test test test test test test test test test test test test test test test. not sure if I like this...',
        backgroundImage: '/images/landing/cover.jpg',
      },
    ],
  },
  packageHighlightsSection: {
    title: 'Multi-Platform Video Package',
    subtitle:
      'Get a versatile main hero video and multiple platform-ready assets all in a single shoot day',
    title2: 'Social media cutdowns',
    subtitle2: 'Cutdowns for social media',
    packageGraphic: '/images/hero2.jpg',
    videos: [
      {
        title: '01',
        videoUrl: 'https://player.vimeo.com/video/1160684839',
      },
      {
        title: '02',
        videoUrl: 'https://player.vimeo.com/video/1160684862',
      },
      {
        title: '03',
        videoUrl: 'https://player.vimeo.com/video/1160684857',
      },
      {
        title: '04 Jose',
        videoUrl: 'https://player.vimeo.com/video/1160684849',
      },
      {
        title: 'intro',
        videoUrl: 'https://www.youtube.com/embed/j5XQj_Goq6I',
      },
    ],
    infographic: {
      title: "Here's a fun wheel thingy",
      subtitle:
        'Imagine here is some artfully crafted copy describing this circle thing below wow',
      centerText:
        "This is our comprehensive video production package designed specifically for combat sports gyms. We understand the unique culture and energy of fight training because we're part of that world. Our approach combines cinematic storytelling with authentic fight culture to create content that resonates with both casual fitness seekers and serious fighters. Every shoot is strategically planned to maximize your content output - from a hero video for your website to social media clips that drive engagement and new member sign-ups.",
      items: [
        {
          msg: 'Ready to go short-form posts for Instagram, TikTok, and other social media sites',
        },
        {
          msg: 'Use as looping background video in-store or at conventions/events',
        },
        {
          msg: 'Run attention grabbing YouTube ads, or embed the videos directly on your website',
        },
        {
          msg: 'Use as looping content for all device formats, from phones to laptops to TVs',
        },
        {
          msg: 'Boost your presence and credibility on Google Maps/Yelp',
        },
        {
          msg: 'Includes multiple cuts perfect for paid ads on all platforms + A/B testing',
        },
      ],
    },
  },
  secondaryVideoSection: {
    title: 'Long Form Work',
    subtitle:
      'Truly elevate your brand with festival worthy branded & sponsored documentaries',
    imageUrl: '/images/landing/TBAC.jpeg',
    videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA',
  },
  processSection: {
    hideSection: false,
    title: 'Our Process',
    subtitle:
      'Quick overview of how our project execution process from beginning to end',
    data: [
      {
        title: 'Planning',
        content:
          'We start by understanding your goals, target audience, and brand identity to create a tailored production strategy.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: 'Test button',
        buttonLink: 'google.com',
      },
      {
        title: 'Pre-Production',
        content:
          'Our team handles all logistics, from location scouting to talent coordination, ensuring a smooth shoot day.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Principle Photography',
        content:
          'Using cinema-grade equipment, we capture stunning footage that showcases your brand in the best light.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Post-Production',
        content:
          'Our editors craft your story with professional color grading, sound design, and motion graphics.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Delivery',
        content:
          'Receive your final videos optimized for all platforms, ready to elevate your marketing and drive results.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
    ],
  },
  clientBrandsSection: {
    title: 'Trusted by Leading Brands',
    backgroundImagePath: '/images/landing/cover.jpg',
    clientBrands: [
      '/images/landing/brand-logos/logo-hbo.png',
      '/images/landing/brand-logos/logo-zara.png',
      '/images/landing/brand-logos/logo-warby-parker.png',
      '/images/landing/brand-logos/logo-adtec.png',
    ],
  },
  faqSection: {
    title: 'FAQs',
    subtitle: 'Find answers to common questions about our services',
    items: [
      {
        question: 'Will you run the marketing for us too?',
        answer:
          "Nope. We create the content, not the marketing. To actually get new members or exposure, you'll need to use what we create in your own campaigns, socials, ads, or website. We're your partner that delivers pro-level videos and photos that sell your gym for you, you just need to put it out there.",
      },
      {
        question: 'How long does the process take?',
        answer:
          "The shoot itself usually takes <strong>one day</strong>. The full project — planning, filming, and editing — typically runs <strong>3-4 weeks</strong>. We spend time upfront with you to understand your goals so everything we create hits the mark. You'll be involved in planning, but we handle all the technical work.",
      },
      {
        question: 'Will filming disrupt our classes?',
        answer:
          'Minimal disruption is our goal. Most shoots require <strong>only 2-3 crew members for a single day</strong>. We can get most of the content in one extended class of regular members, or we can schedule the shoot during off-hours. Your gym keeps running while we capture everything we need.',
      },
      {
        question: 'What kind of gear do you use?',
        answer:
          "We use actual <strong>cinema cameras, cine lenses, and pro lighting rigs</strong> some of the same equipment found on Hollywood sets. It does mean we'll need to setup lights and gear around the gym, but trust us, you'll be glad we did once you see the results.",
      },
      {
        question: 'Can I request changes to the edits?',
        answer:
          'Absolutely. Every project comes with <strong>one free round of revisions</strong>. Need extra cuts, social clips, or alternate edits? We can do those too at a simple hourly rate.',
      },
      {
        question: 'Do you provide photography?',
        answer:
          'Every package includes <strong>10+ high-res 4K images</strong> pulled from the shoot footage. Larger sets of dedicated professional photos (30+ megapixels) are also available as an upgrade.',
      },
      {
        question: "What's included in the base package?",
        answer:
          'You get:<br /><strong>1 polished hero video</strong> (~1-3 minutes) for your website, YouTube, Yelp, Maps, in-gym display, etc<br /><strong>3 social-ready & ad-ready edited sequences</strong> (~10-30 seconds each)<br /><strong>10+ edited images from footage</strong><br />You can also re-trim these videos yourself any time for extra shorts, posts, or GIFs.',
      },
      {
        question: 'How much does it cost?',
        answer:
          "Pricing starts at around <strong>$2,750</strong>, depending on your gym size, how ambitious the project is, and how much content you want. To put it in perspective, that's roughly equivalent to only <strong>one new member's annual membership</strong>, but it's a one-time investment that continues to pay off as potential new members see your gym.",
      },
      {
        question: 'I need content regularly, can you help with that?',
        answer:
          'Absolutely. Many gyms find it valuable to schedule ongoing shoots or monthly content refreshes to keep their marketing fresh and maintain momentum. We offer discounted retainers and can tailor a plan that fits your goals, budget, and cadence without disrupting your regular operations.',
      },
    ],
  },
  contactSection: {
    title: 'Upgrade Your Marketing Today',
    titleVariant: 'h3',
    isUpperCase: true,
    contactTitle: undefined,
    contactTitleVariant: 'h5',
    callBookingTitle: 'Book a call',
    callBookingTitleVariant: 'h4',
    backgroundImage: undefined,
  },
};

// Default data for combat sports landing page
export const fightSportsDefaultData = {
  heroSection: {
    title: 'Cinematic Fitness Brand Films That Pack a Punch',
    subtitle: [
      'Created by filmmakers who train in combat sports; we know your world.',
      'Capture everything you need in one shoot day: a main promo film + ready-to-post clips to attract new members and keep your current ones engaged.',
    ],
    backgroundVideo: {
      filePath: '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop.mov',
      posterFramePath:
        '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop_PosterFrame.jpg',
      vidWidth: 1920,
      codec: 'h264',
      audio: false,
    },
  },
  mainVideoSection: {
    title: 'Our Work in Action',
    subtitle:
      'A glimpse at the high-quality tailored marketing hero videos we create for combat sports gyms like yours',
    thumbnail: '/images/film.jpg',
    videoUrl: 'https://www.youtube.com/embed/J0IItrdHQ2s',
    chapters: [
      {
        title: 'Head Coach Introduction',
        description:
          'Designed to work both as a standalone asset and intro of the full brand film.',
        percentage: 32,
        imageUrl: '/images/landing/cover.jpg',
      },
      {
        title: 'Boxing Training',
        description:
          'High-energy boxing training sequences with title holding pro athletes, lead by 3 division world champ Leo Santa Cruz. Designed with multiple cutdown points for versatile short-form trims.',
        percentage: 30,
        imageUrl: '/images/landing/cover2.jpg',
      },
      {
        title: 'Conditioning',
        description:
          'Conditioning sequences that work as standalone social media and ad cutdowns',
        percentage: 10,
        imageUrl: '/images/hero2.jpg',
      },
      {
        title: 'Sparring',
        description: 'Technical sparring',
        percentage: 23,
        imageUrl: '/images/film.jpg',
      },
      {
        title: 'Recovery Equipment',
        description: 'Shiny high tech equipment',
        percentage: 4,
        imageUrl: '/images/film.jpg',
      },
    ],
  },
  benefitsSection: {
    title: 'Why Choose Us',
    subtitle:
      "We don't just make videos, we create high-value tailored marketing assets that drive new members and set your fitness brand apart",
    cards: [
      {
        title: 'Content That Converts',
        description:
          'We train in combat sports and understand fight culture from the inside. Our videos resonate with both casual fitness seekers and serious fighters alike, and turn viewers into paying members, not just likes.',
      },
      {
        title: 'Stand Out From The Competition',
        description:
          'Generic social clips get lost in the scroll. Our professional videos make your gym look world-class. Tailored to your gym and shot on real cinema cameras, giving you a clear edge over competitors in a crowded market.',
      },
      {
        title: 'Max Reach From One Shoot',
        description:
          'Every shoot is optimized for multiple platforms and formats in a single package, so you get weeks of content that works everywhere from IG reels to your website hero video without extra hassle.',
      },
      {
        title: 'Max Reach From One Shoot!!!',
        description:
          'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test .',
      },
      {
        title: 'BACKGROUND IMAGE TEST',
        description:
          'background image test test test test test test test test test test test test test test test test test test test test test test test. not sure if I like this...',
        backgroundImage: '/images/landing/cover.jpg',
      },
    ],
  },
  packageHighlightsSection: {
    title: 'Multi-Platform Video Package',
    subtitle:
      'Get a versatile main hero video and multiple platform-ready assets all in a single shoot day',
    title2: 'Social media cutdowns',
    subtitle2: 'Cutdowns for social media',
    packageGraphic: '/images/hero2.jpg',
    videos: [
      {
        title: '01',
        videoUrl: 'https://player.vimeo.com/video/1160684839',
      },
      {
        title: '02',
        videoUrl: 'https://player.vimeo.com/video/1160684862',
      },
      {
        title: '03',
        videoUrl: 'https://player.vimeo.com/video/1160684857',
      },
      {
        title: '04 Jose',
        videoUrl: 'https://player.vimeo.com/video/1160684849',
      },
      {
        title: 'intro',
        videoUrl: 'https://www.youtube.com/embed/j5XQj_Goq6I',
      },
    ],
    infographic: {
      subtitle:
        'Imagine here is some artfully crafted copy describing this circle thing below wow',
      centerText:
        "This is our comprehensive video production package designed specifically for combat sports gyms. We understand the unique culture and energy of fight training because we're part of that world. Our approach combines cinematic storytelling with authentic fight culture to create content that resonates with both casual fitness seekers and serious fighters. Every shoot is strategically planned to maximize your content output - from a hero video for your website to social media clips that drive engagement and new member sign-ups.",
      items: [
        {
          msg: 'Ready to go short-form posts for Instagram, TikTok, and other social media sites',
        },
        {
          msg: 'Use as looping background video in-store or at conventions/events',
        },
        {
          msg: 'Run attention grabbing YouTube ads, or embed the videos directly on your website',
        },
        {
          msg: 'Use as looping content for all device formats, from phones to laptops to TVs',
        },
        {
          msg: 'Boost your presence and credibility on Google Maps/Yelp',
        },
        {
          msg: 'Includes multiple cuts perfect for paid ads on all platforms + A/B testing',
        },
      ],
    },
  },
  secondaryVideoSection: {
    title: 'Long Form Work',
    subtitle:
      'Truly elevate your brand with festival worthy branded & sponsored documentaries',
    imageUrl: '/images/landing/TBAC.jpeg',
    videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA',
  },
  clientBrandsSection: {
    title: 'Trusted by Leading Brands',
    backgroundImagePath: '/images/landing/cover.jpg',
    clientBrands: [
      '/images/landing/brand-logos/logo-hbo.png',
      '/images/landing/brand-logos/logo-zara.png',
      '/images/landing/brand-logos/logo-warby-parker.png',
      '/images/landing/brand-logos/logo-adtec.png',
    ],
  },
  faqSection: [
    {
      question: 'Will you run the marketing for us too?',
      answer:
        "Nope. We create the content, not the marketing. To actually get new members or exposure, you'll need to use what we create in your own campaigns, socials, ads, or website. We're your partner that delivers pro-level videos and photos that sell your gym for you, you just need to put it out there.",
    },
    {
      question: 'How long does the process take?',
      answer:
        "The shoot itself usually takes <strong>one day</strong>. The full project — planning, filming, and editing — typically runs <strong>3-4 weeks</strong>. We spend time upfront with you to understand your goals so everything we create hits the mark. You'll be involved in planning, but we handle all the technical work.",
    },
    {
      question: 'Will filming disrupt our classes?',
      answer:
        'Minimal disruption is our goal. Most shoots require <strong>only 2-3 crew members for a single day</strong>. We can get most of the content in one extended class of regular members, or we can schedule the shoot during off-hours. Your gym keeps running while we capture everything we need.',
    },
    {
      question: 'What kind of gear do you use?',
      answer:
        "We use actual <strong>cinema cameras, cine lenses, and pro lighting rigs</strong> some of the same equipment found on Hollywood sets. It does mean we'll need to setup lights and gear around the gym, but trust us, you'll be glad we did once you see the results.",
    },
    {
      question: 'Can I request changes to the edits?',
      answer:
        'Absolutely. Every project comes with <strong>one free round of revisions</strong>. Need extra cuts, social clips, or alternate edits? We can do those too at a simple hourly rate.',
    },
    {
      question: 'Do you provide photography?',
      answer:
        'Every package includes <strong>10+ high-res 4K images</strong> pulled from the shoot footage. Larger sets of dedicated professional photos (30+ megapixels) are also available as an upgrade.',
    },
    {
      question: "What's included in the base package?",
      answer:
        'You get:<br /><strong>1 polished hero video</strong> (~1-3 minutes) for your website, YouTube, Yelp, Maps, in-gym display, etc<br /><strong>3 social-ready & ad-ready edited sequences</strong> (~10-30 seconds each)<br /><strong>10+ edited images from footage</strong><br />You can also re-trim these videos yourself any time for extra shorts, posts, or GIFs.',
    },
    {
      question: 'How much does it cost?',
      answer:
        "Pricing starts at around <strong>$2,750</strong>, depending on your gym size, how ambitious the project is, and how much content you want. To put it in perspective, that's roughly equivalent to only <strong>one new member's annual membership</strong>, but it's a one-time investment that continues to pay off as potential new members see your gym.",
    },
    {
      question: 'I need content regularly, can you help with that?',
      answer:
        'Absolutely. Many gyms find it valuable to schedule ongoing shoots or monthly content refreshes to keep their marketing fresh and maintain momentum. We offer discounted retainers and can tailor a plan that fits your goals, budget, and cadence without disrupting your regular operations.',
    },
  ],
};

const baseDefaultData = {
  heroSection: {
    title: null,
    subtitle: null,
    callButtonText: 'Book a call',
    backgroundVideo: {
      filePath: '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop.mov',
      posterFramePath:
        '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop_PosterFrame.jpg',
      vidWidth: 1920,
      codec: 'h264',
      audio: false,
    },
  },
  mainVideoSection: {
    title: null,
    subtitle: null,
    thumbnail: '/images/film.jpg',
    videoUrl: 'https://www.youtube.com/embed/J0IItrdHQ2s',
    chapters: [
      {
        title: 'Head Coach Introduction',
        description:
          'Designed to work both as a standalone asset and intro of the full brand film.',
        percentage: 32,
        imageUrl: '/images/landing/cover.jpg',
      },
      {
        title: 'Boxing Training',
        description:
          'High-energy boxing training sequences with title holding pro athletes, lead by 3 division world champ Leo Santa Cruz. Designed with multiple cutdown points for versatile short-form trims.',
        percentage: 30,
        imageUrl: '/images/landing/cover2.jpg',
      },
      {
        title: 'Conditioning',
        description:
          'Conditioning sequences that work as standalone social media and ad cutdowns',
        percentage: 10,
        imageUrl: '/images/hero2.jpg',
      },
      {
        title: 'Sparring',
        description: 'Technical sparring',
        percentage: 23,
        imageUrl: '/images/film.jpg',
      },
      {
        title: 'Recovery Equipment',
        description: 'Shiny high tech equipment',
        percentage: 4,
        imageUrl: '/images/film.jpg',
      },
    ],
  },
  benefitsSection: {
    title: null,
    subtitle: null,
    cards: [
      { title: null, description: null },
      { title: null, description: null },
      { title: null, description: null },
    ],
  },
  packageHighlightsSection: {
    title: null,
    subtitle: null,
    title2: null,
    subtitle2: null,
    packageGraphic: '/images/hero2.jpg',
    videos: [
      { title: '01', videoUrl: 'https://player.vimeo.com/video/1160684839' },
      { title: '02', videoUrl: 'https://player.vimeo.com/video/1160684862' },
      { title: '03', videoUrl: 'https://player.vimeo.com/video/1160684857' },
      {
        title: '04 Jose',
        videoUrl: 'https://player.vimeo.com/video/1160684849',
      },
      { title: 'intro', videoUrl: 'https://www.youtube.com/embed/j5XQj_Goq6I' },
    ],
    infographic: {
      subtitle: null,
      centerText: null,
      items: [
        { msg: null },
        { msg: null },
        { msg: null },
        { msg: null },
        { msg: null },
        { msg: null },
      ],
    },
  },
  secondaryVideoSection: {
    title: null,
    subtitle: null,
    imageUrl: '/images/landing/TBAC.jpeg',
    videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA',
  },
  processSection: {
    hideSection: false,
    title: 'Our Process',
    subtitle:
      'Quick overview of our project execution process from beginning to end',
    data: [
      {
        title: 'Planning',
        content:
          'We start by understanding your goals, target audience, and brand identity to create a tailored production strategy.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Pre-Production',
        content:
          'Our team handles all logistics, from location scouting to talent coordination, ensuring a smooth shoot day.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Principle Photography',
        content:
          'Using cinema-grade equipment, we capture stunning footage that showcases your brand in the best light.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Post-Production',
        content:
          'Our editors craft your story with professional color grading, sound design, and motion graphics.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
      {
        title: 'Delivery',
        content:
          'Receive your final videos optimized for all platforms, ready to elevate your marketing and drive results.',
        imageUrl: '/images/landing/cover2.jpg',
        buttonText: '',
        buttonLink: '',
      },
    ],
  },
  clientBrandsSection: {
    title: null,
    backgroundImagePath: '/images/landing/cover.jpg',
    clientBrands: [
      '/images/landing/brand-logos/logo-hbo.png',
      '/images/landing/brand-logos/logo-zara.png',
      '/images/landing/brand-logos/logo-warby-parker.png',
      '/images/landing/brand-logos/logo-adtec.png',
    ],
  },
  faqSection: {
    title: 'FAQs',
    subtitle: 'Find answers to common questions about our services',
    items: [],
  },
  contactSection: {
    title: 'Upgrade Your Marketing Today',
    titleVariant: 'h3',
    isUpperCase: true,
    contactTitle: undefined,
    contactTitleVariant: 'h5',
    callBookingTitle: 'Book a call',
    callBookingTitleVariant: 'h4',
    backgroundImage: undefined,
  },
};

export const actionSportsDefaultData = baseDefaultData;
export const highOctaneDefaultData = baseDefaultData;
export const fitnessDefaultData = baseDefaultData;
export const fitnessBrandsDefaultData = baseDefaultData;
export const agencyPartnersDefaultData = baseDefaultData;
export const brandedSponsoredDocsDefaultData = baseDefaultData;
