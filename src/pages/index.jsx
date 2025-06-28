// import HeroCarousel from '../components/ui/HeroCarousel';

// const HERO_IMAGES = [
//   { src: '/images/hero1.jpg' },
//   { src: '/images/hero2.jpg' },
//   { src: '/images/hero3.jpg' },
// ];

// const Home = () => (
//   <div
//     style={{ display: 'flex', justifyContent: 'center', overflow: 'hidden' }}
//   >
//     <HeroCarousel images={HERO_IMAGES} />
//   </div>
// );

// export default Home;

import { useEffect } from 'react';
import HeroCarousel from '../components/ui/HeroCarousel';

const heroImages = [
  { src: '/images/hero1.jpg' },
  { src: '/images/hero2.jpg' },
  { src: '/images/hero3.jpg' },
];

const Home = () => {
  useEffect(() => {
    // Disable scroll on home page
    // NOTE: global.css currently disables all scroll bars, so this isn't necessary.
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', height: '100%'}}
    >
      <HeroCarousel images={heroImages} />
    </div>
  );
};

export default Home;
