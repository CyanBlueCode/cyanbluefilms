'use client';
import { useEffect } from 'react';
import HeroCarousel from '../components/ui/HeroCarousel';
import { Box } from '@mui/material';

// NOTE add images in order by number; images must be named hero#.jpg
const order = [1, 2, 5, 4, 3];
const heroImages = order.map((number) =>
  !!number
    ? {
        src: `/images/hero${number}.jpg`,
      }
    : []
);

const Home = () => {
  useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVH();
  window.addEventListener('resize', setVH);
  return () => window.removeEventListener('resize', setVH);
}, []);

  useEffect(() => {
    // Disable scroll on home page
    // NOTE: global.css currently disables all scroll bars, so this is just a backup.
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height: 'calc(var(--vh, 1vh) * 91)',
      }}
    >
      <HeroCarousel images={heroImages} />
    </Box>
  );
};

export default Home;
