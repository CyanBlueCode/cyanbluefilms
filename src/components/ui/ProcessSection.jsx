import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

const ProcessSection = ({ title, subtitle, data = [], colors = {} }) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

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

  if (!data || data.length === 0) return null;

  return (
    <Box
      sx={{
        width: '100vw',
        backgroundColor: colors?.primaryBg || '#000',
        py: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6, px: 2 }}>
        <Typography
          variant='h3'
          color={colors?.titleText || '#191919'}
          textTransform='uppercase'
          fontWeight={600}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant='h6'
          color={colors?.subtitleText || '#191919'}
          fontWeight={400}
          sx={{ maxWidth: { xs: '90vw', sm: '70vw', md: '50vw' }, mx: 'auto' }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Process Items */}
      <Box
        sx={{
          width: { xs: '95vw', md: '70vw' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 6, md: 8 },
        }}
      >
        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          const isVisible = visibleItems.has(index);

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
              }}
            >
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
                    <Typography variant='h6' sx={{ color: '#eaeaea', fontWeight: 600 }}>
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
