import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

const ScrollingLogos = ({
  clientBrands,
  animationDuration = '15s',
  logoHeight = { xs: 60, md: 70 },
}) => {
  if (!clientBrands?.length) return null;

  // Responsive animation duration
  const getResponsiveDuration = () => {
    const baseDuration = parseFloat(animationDuration);
    const logoCount = clientBrands.length;
    
    // Scale duration based on logo count to maintain consistent visual speed
    const scaledDuration = baseDuration * (logoCount / 3);
    
    return {
      xs: `${scaledDuration * 0.9}s`,
      sm: `${scaledDuration * 0.95}s`,
      md: `${scaledDuration}s`,
    };
  };

  const responsiveDuration = getResponsiveDuration();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: { xs: 80, md: 120 },
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          width: 'max-content',
          animation: {
            xs: `scroll ${responsiveDuration.xs} linear infinite`,
            sm: `scroll ${responsiveDuration.sm} linear infinite`,
            md: `scroll ${responsiveDuration.md} linear infinite`,
          },
          '@keyframes scroll': {
            from: { transform: 'translateX(0)' },
            to: { transform: 'translateX(-33.333%)' },
          },
        }}
      >
        {/* NOTE we must duplicate the clientBrands array 3x to ensure seamless infinite scrolling, because math */}
        {[...clientBrands, ...clientBrands, ...clientBrands].map(
          (logoPath, index) => (
            <Box
              key={index}
              sx={{
                flexShrink: 0,
                height: logoHeight,
                mx: { xs: 3, md: 4 },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Image
                src={logoPath}
                alt={`Client brand logo ${index + 1}`}
                width={0}
                height={0}
                sizes='200px'
                style={{
                  width: 'auto',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </Box>
          ),
        )}
      </Box>
    </Box>
  );
};

export default ScrollingLogos;
