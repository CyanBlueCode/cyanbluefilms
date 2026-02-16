import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Star } from '@mui/icons-material';
import Image from 'next/image';
import { TitleSection } from '@/utils/TextHelpers';

const ProcessSection = ({ title, subtitle, data = [], colors = {} }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [lineHeight, setLineHeight] = useState(0);
  const itemRefs = useRef([]);
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [data.length]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || itemRefs.current.length === 0) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const lastItemRef = itemRefs.current[itemRefs.current.length - 1];

      let totalHeight = 0;
      let maxHeight = 0;

      if (lastItemRef) {
        const lastRect = lastItemRef.getBoundingClientRect();
        maxHeight = lastRect.top - containerRect.top;
      }

      itemRefs.current.forEach((ref) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const itemTop = rect.top - containerRect.top;
        const itemBottom = itemTop + rect.height;

        if (rect.top < viewportCenter) {
          if (rect.bottom > viewportCenter) {
            const progress = (viewportCenter - rect.top) / rect.height;
            totalHeight = itemTop + rect.height * progress + 60;
          } else {
            totalHeight = itemBottom;
          }
        }
      });

      setLineHeight(Math.min(totalHeight, maxHeight));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [data.length]);

  if (!data || data.length === 0) return null;

  return (
    <Box
      sx={{
        width: '100vw',
        backgroundColor: colors?.primaryBg || '#000',
        pb: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <TitleSection
        title={title}
        subtitle={subtitle}
        colors={colors}
      />

      {/* Process Items */}
      <Box
        ref={containerRef}
        sx={{
          width: { xs: '95vw', md: '70vw' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 6, md: 8 },
          position: 'relative',
          pl: { xs: 6, md: 10 },
          pr: { xs: 2, md: 0 },
        }}
      >
        {/* Animated Progress Line */}
        <Box
          ref={lineRef}
          sx={{
            position: 'absolute',
            left: { xs: '18px', md: '33px' },
            top: 10,
            width: { xs: '6px', md: '8px' },
            height: `${lineHeight}px`,
            bgcolor: '#eaeaea',
            transition: 'height 0.1s linear',
            zIndex: 0,
            borderRadius: '0 0 3px 3px',
          }}
        />
        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          const isVisible = visibleItems.has(index);
          const isLastItem = index === data.length - 1;

          return (
            <Box
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  md: isEven ? 'row' : 'row-reverse',
                },
                gap: { xs: 3, md: 6 },
                alignItems: 'center',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                position: 'relative',
              }}
            >
              {/* Number Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: '-45px', md: '-66px' },
                  top: 0,
                  width: { xs: 36, md: 44 },
                  height: { xs: 36, md: 44 },
                  borderRadius: '50%',
                  bgcolor: '#eaeaea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                {isLastItem ? (
                  <Star
                    sx={{
                      color: '#000',
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      animation: 'spinStar 2.6s ease-in-out infinite',
                      '@keyframes spinStar': {
                        '0%': { transform: 'rotateY(0deg)' },
                        '23.08%': { transform: 'rotateY(360deg)' },
                        '100%': { transform: 'rotateY(360deg)' },
                      },
                    }}
                  />
                ) : (
                  <Typography
                    variant='body2'
                    sx={{
                      color: '#000',
                      fontWeight: 700,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </Typography>
                )}
              </Box>
              {/* Image Card */}
              <Box
                sx={{
                  flex: 1,
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                }}
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>

              {/* Content */}
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  textAlign: { xs: 'left', md: isEven ? 'left' : 'right' },
                  alignItems: {
                    xs: 'flex-start',
                    md: isEven ? 'flex-start' : 'flex-end',
                  },
                }}
              >
                <Typography
                  variant='h4'
                  color={colors?.titleText || '#191919'}
                  fontWeight={600}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant='h6'
                  color={colors?.bodyText || '#333333'}
                  sx={{ lineHeight: 1.7 }}
                >
                  {item.content}
                </Typography>
                {item.buttonText && item.buttonLink && (
                  <Button
                    variant='outlined'
                    href={item.buttonLink}
                    sx={{
                      mt: 1,
                      height: '50px',
                      width: 'max-content',
                      borderRadius: '5px',
                      fontSize: '1.5rem',
                      backgroundColor: 'transparent',
                      borderWidth: '3px',
                      borderColor: '#eaeaea',
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        borderColor: '#eaeaea',
                        boxShadow: 'none',
                      },
                    }}
                  >
                    <Typography
                      variant='h6'
                      sx={{ color: '#eaeaea', fontWeight: 600 }}
                    >
                      {item.buttonText}
                    </Typography>
                  </Button>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProcessSection;
