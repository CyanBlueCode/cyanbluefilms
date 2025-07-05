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
        height: { xs: '91vh', sm: '100%' },
      }}
    >
      <HeroCarousel images={heroImages} />
    </Box>
  );
};

export default Home;
