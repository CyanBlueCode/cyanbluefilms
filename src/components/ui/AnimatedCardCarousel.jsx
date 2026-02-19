import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  IconButton,
  Avatar,
  CardContent,
  Typography,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  PlayArrow,
} from '@mui/icons-material';

const AnimatedCardCarousel = ({
  items = [],
  autoScrollInterval = 6000,
  colors = {},
  cardHeight = 360,
  customCardRenderer,
  shouldInfiniteAutoScroll = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoScrollDisabled = autoScrollInterval === 0;

  const startAutoScroll = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }
    }, autoScrollInterval);
  };

  useEffect(() => {
    if (items.length > 1 && !autoScrollDisabled && shouldInfiniteAutoScroll) {
      startAutoScroll();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, isPaused, autoScrollInterval, shouldInfiniteAutoScroll]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const getCardStyle = (index) => {
    const diff = (index - currentIndex + items.length) % items.length;
    const totalCards = items.length;
    const isCenter = diff === 0;

    let translateX = 0;
    let scale = 0.8;
    let zIndex = 1;

    if (isCenter) {
      translateX = 0;
      scale = 1.1;
      zIndex = totalCards;
    } else {
      const position = diff <= totalCards / 2 ? diff : diff - totalCards;
      translateX = position * 70;
      scale = Math.max(0.7, 1.1 - Math.abs(position) * 0.1);
      zIndex = totalCards - Math.abs(position);
    }

    return {
      transform: `translateX(${translateX}%) scale(${scale})`,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      position: 'absolute',
      left: '50%',
      marginLeft: customCardRenderer
        ? { xs: '-150px', sm: '-175px', md: '-200px' }
        : '-140px',
    };
  };

  // NOTE: Icons for benefit cards are defined in /utils/cmsTransformAndManualConfigs.js
  const defaultRenderCard = (item) => (
    <Box
      sx={{
        width: 280,
        height: cardHeight,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
        textAlign: 'center',
        backgroundColor: colors?.secondaryBg || '#222',
        color: colors?.titleText || '#fff',
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        // border: item.backgroundImage
        //   ? '1px solid rgba(255, 255, 255, 0.1)'
        //   : 'none',
        backgroundImage: item.backgroundImage
          ? `url(${item.backgroundImage})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': item.backgroundImage
          ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1,
            }
          : {},
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        {typeof item.icon === 'string' ? (
          <Avatar src={item.icon} sx={{ width: 80, height: 80 }} />
        ) : (
          <Box
            component={item.icon}
            sx={{ fontSize: 48, color: 'cyanBlue.main' }}
          />
        )}
        <CardContent>
          <Typography variant='h6' gutterBottom sx={{ color: 'inherit' }}>
            {item.title}
          </Typography>
          <Typography variant='body2' sx={{ color: 'inherit' }}>
            {item.description}
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );

  if (!items.length) return null;

  return (
    <Box sx={{ position: 'relative', width: { xs: '100vw', sm: '100%' } }}>
      {/* Carousel Container */}
      <Box
        sx={{
          position: 'relative',
          height: customCardRenderer 
            ? { xs: 475, sm: 538, md: 600 }
            : Math.max(cardHeight * 1.2, cardHeight + 100),
          overflow: { xs: 'hidden', sm: 'visible' },
          mx: { xs: 0, sm: 'auto' },
          width: { xs: '100vw', sm: '100%' },
          display: 'flex',
          alignItems: 'center',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const diff = (index - currentIndex + items.length) % items.length;
          const isCenter = diff === 0;
          return (
            <Box key={index} sx={getCardStyle(index)}>
              <Box
                sx={{
                  position: 'relative',
                  '&::after': !isCenter
                    ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        borderRadius: 2,
                        zIndex: 10,
                      }
                    : {},
                }}
              >
                {customCardRenderer
                  ? customCardRenderer(item, index)
                  : defaultRenderCard(item, index)}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Navigation Controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton
          onClick={goToPrevious}
          sx={{
            color: colors?.titleText || '#fff',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <ChevronLeft />
        </IconButton>

        {!autoScrollDisabled && shouldInfiniteAutoScroll ? (
          <IconButton
            onClick={togglePause}
            sx={{
              color: colors?.titleText || '#fff',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            }}
          >
            {isPaused ? <PlayArrow /> : <Pause />}
          </IconButton>
        ) : (
          <Box sx={{ width: 40 }} />
        )}

        <IconButton
          onClick={goToNext}
          sx={{
            color: colors?.titleText || '#fff',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default AnimatedCardCarousel;
