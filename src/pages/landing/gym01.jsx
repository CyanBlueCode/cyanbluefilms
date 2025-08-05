// ANCHOR placeholder data
import React from 'react';
import { SportsMma, SportsKabaddi, Videocam } from '@mui/icons-material';
import LandingPage from '@/components/landing/LandingPage';

const gym01 = () => (
  <LandingPage
    heroSection={{
      title: [
        'Stand Out With',
        'High Quality',
        'Marketing Content', // TODO A/B test this with 'Marketing Videos'
        'For Your Fight Gym',
      ],
      subtitle: [
        'Work with filmmakers who train in combat sports and understand your needs.',
        'Multiple content formats captured in just one shoot day. Designed to bring you new members.',
      ],
      imageUrl: '/images/landing-gym01/cover.jpg',
      videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA',
    }}
    videoSection={{
      title: 'Main Video Sample',
      subtitle: 'This is a video. Wow.',
      thumbnail: '/images/film.jpg',
      videoUrl: 'https://www.youtube.com/embed/Qoa2dEyorcA',
    }}
    benefitsSection={{
      title: 'Why Choose Us',
      subtitle: 'We deliver high-quality, engaging content for your brand.',
      cards: [
        {
          title: 'Made By Fighters',
          description:
            'Work with filmmakers who train in combat sports. We understand the intricacies of striking disciplines and your specific marketing needs.',
          icon: SportsMma,
        },
        {
          title: 'Multi-Platform Package',
          description:
            'Multiple content formats captured in just one shoot day. Designed to bring you new members. We deliver ready-to-post short-content for socials along with your main video.',
          icon: SportsKabaddi,
        },
        {
          title: 'Cinematic Quality',
          description:
            'Shot with pro cinema cameras, lenses, and lighting setups, not photo cameras.',
          icon: Videocam,
        },
      ],
    }}
    packageHighlightsSection={{
      title: 'Video Package',
      subtitle: 'Elevate your marketing, put some nuts in your mouth',
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
    // contactSection={{ backgroundImage: '/images/landing-gym01/cover2.jpg' }}
  />
);

export default gym01;
