import React from 'react';
import { SportsMma, SportsKabaddi, Videocam } from '@mui/icons-material';
import LandingPage from '@/components/landing/LandingPage';

const gym01 = () => (
  <LandingPage
    heroSection={{
      title: [
        'Promote Your Gym',
        'With High-Quality',
        'Marketing Content',
        'That Packs a Punch',
      ],
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
      title: 'See Our Work in Action',
      subtitle:
        'A glimpse at the high-quality tailored marketing hero videos we create for combat sports gyms like yours',
      thumbnail: '/images/film.jpg',
      videoUrl: 'https://www.youtube.com/embed/J0IItrdHQ2s',
    }}
    benefitsSection={{
      title: <>Why Choose&nbsp;Us</>,
      subtitle:
        "We don't just make videos, we create high-value tailored marketing assets that drive new members and set your fight gym apart",
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
            // 'Multiple content formats captured in just one shoot day. Designed to bring you new members. We deliver ready-to-post short-content for socials along with your main video.',
            'Every shoot is optimized for multiple platforms and formats in a single package, so you get weeks of content that works everywhere from IG reels to your website hero video without extra hassle.',
          icon: Videocam,
        },
        // cards: [
        //   {
        //     title: 'Made By Fighters',
        //     description:
        //       'Work with filmmakers who train in combat sports. We understand the intricacies of striking disciplines, gym culture, and your specific marketing needs.',
        //     icon: SportsMma,
        //   },
        //   {
        //     title: 'Complete Package',
        //     description:
        //       // 'Multiple content formats captured in just one shoot day. Designed to bring you new members. We deliver ready-to-post short-content for socials along with your main video.',
        //       'Get a versatile content package in as little as 1 shoot day: a main hero video, short clips for social media and ads, and professional photos. Ready for all your marketing channels without extra work.',
        //     icon: SportsKabaddi,
        //   },
        //   {
        //     title: 'Be A Stand Out Gym',
        //     description:
        //       'Shot with pro cinema cameras, lenses, and lighting setups, not photo cameras.',
        //     icon: Videocam,
        //   },
        // Conversion-Focused Deliverables
        // Every asset is designed with an audience and CTA in mind — landing pages, social cuts, and hero vids that are optimised to drive inquiries and signups.
      ],
    }}
    packageHighlightsSection={{
      title: 'Multi-Platform Video Package',
      subtitle:
        'Get a versatile main hero video and multiple platform-ready assets all in a single shoot day',
      packageGraphic: '/images/hero2.jpg',
      videos: [
        {
          title: 'Video 1',
          description: 'Description for Video 1',
          videoUrl: 'https://www.youtube.com/embed/iSLqjiPa94Y',
        },
        {
          title: 'Video 2',
          description: 'Description for Video 2',
          videoUrl: 'https://www.youtube.com/embed/deLt6pwflKU',
        },
        {
          title: 'Video 3',
          description: 'Description for Video 3',
          videoUrl: 'https://www.youtube.com/embed/6TWPuaUCoUY',
        },
      ],
    }}
    clientBrandsSection={{
      title: 'Trusted by Leading Brands',
      subtitle: 'We\'ve worked with industry leaders to create compelling content',
      backgroundImagePath: '/images/landing/cover2.jpg',
      clientBrands: [
        '/images/landing/brand-logos/logo-hbo.png',
        '/images/landing/brand-logos/logo-warby-parker.png',
        '/images/landing/brand-logos/logo-hbo.png',
        '/images/landing/brand-logos/logo-warby-parker.png',
      ],
    }}
    faqSection={
      [
        {
          question: 'Will you run the marketing for us too?',
          answer: (
            <>
              Nope. We create the content, not the marketing. To actually get
              new members or exposure, you&apos;ll need to use what we create in
              your own campaigns, socials, ads, or website. We&apos;re your
              partner that delivers pro-level videos and photos that sell your
              gym for you, you just need to put it out there.
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
              You&apos;ll be involved in planning, but we handle all the
              technical work.
            </>
          ),
        },
        {
          question: 'Will filming disrupt our classes?',
          answer: (
            <>
              Minimal disruption is our goal. Most shoots require{' '}
              <strong>only 2-3 crew members for a single day</strong>. We can
              get most of the content in one extended class of regular members,
              or we can schedule the shoot during off-hours. Your gym keeps
              running while we capture everything we need. This could even be a
              fun experience for your existing students and boost member
              retention.
            </>
          ),
        },
        {
          question: 'What kind of gear do you use?',
          answer: (
            <>
              We use actual{' '}
              <strong>
                cinema cameras, cine lenses, and pro lighting rigs
              </strong>{' '}
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
              pulled from the shoot footage. Larger sets of dedicated
              professional photos (30+ megapixels) are also available as an
              upgrade.
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
              <br />-{' '}
              <strong>3 social-ready & ad-ready edited sequences</strong>{' '}
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
              Pricing starts at around <strong>$2,750</strong>, depending on
              your gym size, how ambitious the project is, and how much content
              you want. To put it in perspective, that&apos;s roughly equivalent
              to only <strong>one new member&apos;s annual membership</strong>,
              but it&apos;s a one-time investment that continues to pay off as
              potential new members see your gym.
            </>
          ),
        },
        {
          question: 'I need content regularly, can you help with that?',
          answer: (
            <>
              Absolutely. Many gyms find it valuable to schedule ongoing shoots
              or monthly content refreshes to keep their marketing fresh and
              maintain momentum. We offer discounted retainers and can tailor a
              plan that fits your goals, budget, and cadence without disrupting
              your regular operations.
            </>
          ),
        },
      ]

      //   [
      //   {
      //     question: 'How long does a typical video shoot take?',
      //     answer:
      //       'Most shoots are completed in a single day, typically 4-6 hours depending on the scope of content needed.',
      //   },
      //   {
      //     question: 'What equipment do you use for filming?',
      //     answer:
      //       'We use professional cinema cameras, dedicated cine lenses, and professional lighting and grip gear often found on Hollywood productions.',
      //   },
      //   {
      //     question: 'Do you provide content for social media platforms?',
      //     answer:
      //       'Yes, we deliver multiple content formats including ready-to-post short-form content optimized for social media platforms.',
      //   },
      //   {
      //     question:
      //       'What makes you different from other video production companies?',
      //     answer:
      //       'Our team consists of filmmakers who have trained in combat sports and striking, giving us unique insight into the fight gym industry and your specific marketing needs.',
      //   },
      //   {
      //     question: 'How quickly can we expect to receive our finished content?',
      //     answer:
      //       'Typical turnaround time is 1-2 weeks after the shoot, depending on the complexity and amount of content requested.',
      //   },
      // ]
    }
    // contactSection={{ backgroundImage: '/images/landing/cover2.jpg' }}
  />
);

export default gym01;
