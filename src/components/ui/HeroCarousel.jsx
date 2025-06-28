'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';

const HeroCarousel = ({ images, interval = 3600 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Rotate carousel images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      setProgress(0);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  // Animate progress using fixed interval
  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / interval) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    };
    tick();
  }, [currentIndex, interval]);

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      {images.map((img, idx) => (
        <Box
          key={idx}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${img.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: idx === currentIndex ? 1 : 0,
            zIndex: idx === currentIndex ? 2 : 1,
            transition: 'opacity 0.5s ease-in-out',
            pointerEvents: 'none',
          }}
        />
      ))}

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.3)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
          textAlign: 'center',
          p: 3,
        }}
      >
        {/* <Typography variant='h1' sx={{ mb: 2 }}>
          Cyan Blue Films
        </Typography> */}
        <Typography variant='h4'>
          Cinematic Storytelling Through Visual Excellence
        </Typography>
        <LinearProgress
          variant='determinate'
          value={progress}
          sx={{
            position: 'absolute',
            bottom: 24,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '10%',
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(255,255,255,0.3)',
            '& .MuiLinearProgress-bar': {
              backgroundColor: 'rgba(255,255,255,0.8)',
              borderRadius: 3,
              transition: 'transform 200ms linear',
            },
            // Disable transition on reset to zero
            '&[aria-valuenow="0"] .MuiLinearProgress-bar': {
              transition: 'none',
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default HeroCarousel;
