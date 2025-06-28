import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const HeroCarousel = ({ images, interval = 3500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <Box
      sx={{
        // REVIEW can't set relative position; everything disappears
        //   position: 'relative',
        //   marginLeft: 'calc(-50vw + 50%)',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 2 : 1,
            transition: 'opacity 1s ease-in-out',
            pointerEvents: 'none', // avoids interaction bugs
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
      </Box>
    </Box>
  );
};

export default HeroCarousel;
