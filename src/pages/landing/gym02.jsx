import React from 'react';
import { 
  SportsMma, 
  SportsKabaddi, 
  Videocam, 
  MovieFilter,
  Instagram,
  YouTube,
  ConnectedTv,
  Devices,
  Map,
  LocalAtm,
} from '@mui/icons-material';
import LandingPage from '@/components/landing/LandingPage';

const gym02 = () => (
  <LandingPage
    isDarkBackground={true}
    isLightText={true}
    heroSection={{
      title: ['Cinematic Fitness Brand Films That Pack a Punch'],
      subtitle: [
        'Created by filmmakers who train in combat sports; we know your world.',
        'Capture everything you need in one shoot day: a main promo film + ready-to-post clips to attract new members and keep your current ones engaged.',
      ],
      backgroundVideo: {
        filePath: '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop.mov',
        posterFramePath:
          '/Banner_Heroes/INEVITABLE-BannerHeroLoopDesktop_PosterFrame.jpg',
        vidWidth: '1920',
        codec: 'h264',
        audio: false,
        forceRatio: undefined,
        custom: undefined,
      },
    }}
    mainVideoSection={{
      title: 'Our Work in Action',
      subtitle:
        'A glimpse at the high-quality tailored marketing hero videos we create for combat sports gyms like yours',
      thumbnail: '/images/film.jpg',
      videoUrl: 'https://www.youtube.com/embed/J0IItrdHQ2s',
    }}
    benefitsSection={{
      title: <>Why Choose&nbsp;Us</>,
      subtitle:
        "We don't just make videos, we create high-value tailored marketing assets that drive new members and set your fitness brand apart",
      cards: [
        {
          title: 'Content That Converts',
          description:
            'We train in combat sports and understand fight culture from the inside. Our videos resonate with both casual fitness seekers and serious fighters alike, and turn viewers into paying members, not just likes.',
          icon: SportsMma,
        },
        {
          title: 'Stand Out From The Competition',
          description:
            'Generic social clips get lost in the scroll. Our professional videos make your gym look world-class. Tailored to your gym and shot on real cinema cameras, giving you a clear edge over competitors in a crowded market.',
          icon: SportsKabaddi,
        },
        {
          title: 'Max Reach From One Shoot',
          description:
            'Every shoot is optimized for multiple platforms and formats in a single package, so you get weeks of content that works everywhere from IG reels to your website hero video without extra hassle.',
          icon: Videocam,
        },
        {
          title: 'Max Reach From One Shoot!!!',
          description:
            'test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test test .',
          icon: Videocam,
        },
        {
          title: 'BACKGROUND IMAGE TEST',
          description:
            'background image test test test test test test test test test test test test test test test test test test test test test test test. not sure if I like this...',
          icon: SportsKabaddi,
          backgroundImage: '/images/landing-gym01/cover.jpg',
        },
      ],
    }}
    packageHighlightsSection={{
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
          // videoUrl: 'https://www.youtube.com/embed/foVmn0fHHEE',
        },
        {
          title: '02',
          videoUrl: 'https://player.vimeo.com/video/1160684862'
          // videoUrl: 'https://www.youtube.com/embed/lkZHurccE34',
        },
        {
          title: '03',
          videoUrl: 'https://player.vimeo.com/video/1160684857'
          // videoUrl: 'https://www.youtube.com/embed/RmjBQQOD0Do',
        },
        {
          title: '04 Jose',
          videoUrl: 'https://player.vimeo.com/video/1160684849'
          // videoUrl: 'https://www.youtube.com/embed/Zx5SlTwb4is',
        },
        {
          title: 'intro',
          // videoUrl: 'https://player.vimeo.com/video/1160688220'
          videoUrl: 'https://www.youtube.com/embed/j5XQj_Goq6I',
        },
      ],
      infographic: {
        title: null,
        subtitle: 'Imagine here is some artfully crafted copy describing this circle thing below wow',
        centerIcon: (
          <MovieFilter
            sx={{
              color: 'white',
              fontSize: { xs: 40, md: 60, lg: 100 },
            }}
          />
        ),
        centerText: "This is our comprehensive video production package designed specifically for combat sports gyms. We understand the unique culture and energy of fight training because we're part of that world. Our approach combines cinematic storytelling with authentic fight culture to create content that resonates with both casual fitness seekers and serious fighters. Every shoot is strategically planned to maximize your content output - from a hero video for your website to social media clips that drive engagement and new member sign-ups.",
        items: [
          {
            icon: <Instagram sx={{ color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } }} />,
            msg: 'Ready to go short-form posts for Instagram, TikTok, and other social media sites',
          },
          {
            icon: <ConnectedTv sx={{ color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } }} />,
            msg: 'Use as looping background video in-store or at conventions/events',
          },
          {
            icon: <YouTube sx={{ color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } }} />,
            msg: 'Run attention grabbing YouTube ads, or embed the videos directly on your website',
          },
          {
            icon: <Devices sx={{ color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } }} />,
            msg: 'Get high-quality content for all device formats from phone screens to laptops to TVs',
          },
          {
            icon: <Map sx={{ color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } }} />,
            msg: 'Boost your presence and credibility on Google Maps/Yelp',
          },
          {
            icon: <LocalAtm sx={{ color: 'white', fontSize: { xs: 35, sm: 50, md: 50, lg: 60 } }} />,
            msg: 'Includes multiple cuts perfect for paid ads on all platforms + A/B testing',
          },
        ],
      },
    }}
    secondaryVideoSection={{
      title: 'Long Form Work',
      subtitle: 'Truly elevate your brand with festival worthy branded & sponsored documentaries',
      imageUrl: '/images/landing-gym01/TBAC.jpeg',
      videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA'
    }}
    clientBrandsSection={{
      title: 'Trusted by Leading Brands',
      // subtitle: 'We\'ve worked with industry leaders to create compelling content',
      backgroundImagePath: '/images/landing-gym01/cover.jpg',
      clientBrands: [
        '/images/landing-gym01/brand-logos/logo-hbo.png',
        '/images/landing-gym01/brand-logos/logo-zara.png',
        '/images/landing-gym01/brand-logos/logo-warby-parker.png',
        '/images/landing-gym01/brand-logos/logo-adtec.png',
      ],
    }}
    faqSection={[
      {
        question: 'Will you run the marketing for us too?',
        answer: (
          <>
            Nope. We create the content, not the marketing. To actually get new
            members or exposure, you&apos;ll need to use what we create in your
            own campaigns, socials, ads, or website. We&apos;re your partner
            that delivers pro-level videos and photos that sell your gym for
            you, you just need to put it out there.
          </>
        ),
      },
      {
        question: 'How long does the process take?',
        answer: (
          <>
            The shoot itself usually takes <strong>one day</strong>. The full
            project — planning, filming, and editing — typically runs{' '}
            <strong>3-4 weeks</strong>. We spend time upfront with you to
            understand your goals so everything we create hits the mark.
            You&apos;ll be involved in planning, but we handle all the technical
            work.
          </>
        ),
      },
      {
        question: 'Will filming disrupt our classes?',
        answer: (
          <>
            Minimal disruption is our goal. Most shoots require{' '}
            <strong>only 2-3 crew members for a single day</strong>. We can get
            most of the content in one extended class of regular members, or we
            can schedule the shoot during off-hours. Your gym keeps running
            while we capture everything we need. This could even be a fun
            experience for your existing students and boost member retention.
          </>
        ),
      },
      {
        question: 'What kind of gear do you use?',
        answer: (
          <>
            We use actual{' '}
            <strong>cinema cameras, cine lenses, and pro lighting rigs</strong>{' '}
            some of the same equipment found on Hollywood sets. It does mean
            we&apos;ll need to setup lights and gear around the gym, but trust
            us, you&apos;ll be glad we did once you see the results.
          </>
        ),
      },
      {
        question: 'Can I request changes to the edits?',
        answer: (
          <>
            Absolutely. Every project comes with{' '}
            <strong>one free round of revisions</strong>. Need extra cuts,
            social clips, or alternate edits? We can do those too at a simple
            hourly rate.
          </>
        ),
      },
      {
        question: 'Do you provide photography?',
        answer: (
          <>
            Every package includes <strong>10+ high-res 4K images</strong>{' '}
            pulled from the shoot footage. Larger sets of dedicated professional
            photos (30+ megapixels) are also available as an upgrade.
          </>
        ),
      },
      {
        question: "What's included in the base package?",
        answer: (
          <>
            You get:
            <br />- <strong>1 polished hero video</strong> (~1-3 minutes) for
            your website, YouTube, Yelp, Maps, in-gym display, etc
            <br />- <strong>
              3 social-ready & ad-ready edited sequences
            </strong>{' '}
            (~10-30 seconds each)
            <br />- <strong>10+ edited images from footage</strong>
            <br />
            You can also re-trim these videos yourself any time for extra
            shorts, posts, or GIFs. So a single shoot can provide{' '}
            <strong>months of high-quality content</strong>.
          </>
        ),
      },
      {
        question: 'How much does it cost?',
        answer: (
          <>
            Pricing starts at around <strong>$2,750</strong>, depending on your
            gym size, how ambitious the project is, and how much content you
            want. To put it in perspective, that&apos;s roughly equivalent to
            only <strong>one new member&apos;s annual membership</strong>, but
            it&apos;s a one-time investment that continues to pay off as
            potential new members see your gym.
          </>
        ),
      },
      {
        question: 'I need content regularly, can you help with that?',
        answer: (
          <>
            Absolutely. Many gyms find it valuable to schedule ongoing shoots or
            monthly content refreshes to keep their marketing fresh and maintain
            momentum. We offer discounted retainers and can tailor a plan that
            fits your goals, budget, and cadence without disrupting your regular
            operations.
          </>
        ),
      },
    ]}
  />
);

export const getStaticProps = async () => ({
  props: {
    hideConstructionBanner: true,
  },
});

export default gym02;
