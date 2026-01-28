import React from 'react';
import { SportsMma, SportsKabaddi, Videocam } from '@mui/icons-material';
import LandingPage from '@/components/landing/LandingPage';

const gym02 = () => (
  <LandingPage
    isDarkBackground={true}
    isLightText={true}
    heroSection={{
      title: [
        'Stand Out With',
        'High Quality',
        'Marketing Content', // TODO A/B test this with 'Marketing Videos'
        'For Your Fight Gym',
      ],
      title: [
        'Cinematic Fitness Brand Films That Pack a Punch'
        // 'Promote Your Gym',
        // 'With High-Quality',
        // 'Marketing Content',
        // 'That Packs a Punch',
      ],
      subtitle: [
        'Created by filmmakers who train in combat sports; we know your world.',
        'Capture everything you need in one shoot day: a main promo film + ready-to-post clips to attract new members and keep your current ones engaged.',
      ],
      imageUrl: '/images/landing-gym01/cover.jpg',
      videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA',
    }}
    videoSection={{
      title: 'Our Work in Action',
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
            'Every shoot is optimized for multiple platforms and formats in a single package, so you get weeks of content that works everywhere from IG reels to your website hero video without extra hassle.',
          icon: Videocam,
        },
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
    testimonialsSection={{
      imageUrl: '/images/landing-gym01/cover2.jpg',
      testimonials: [
        {
          avatar: '/images/landing-gym01/gym01-testimonial-avatar1.jpg',
          quote: "Best marketing content we've ever had.",
        },
        {
          avatar: '/images/landing-gym01/gym01-testimonial-avatar1.jpg',
          quote: 'The videos gave me an erection that lasted more than 4 hrs.',
        },
      ],
    }}
    faqSection={[
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
    ]}
  />
);

export default gym02;