import React, { useState } from 'react';
import {
  Box,
  useTheme,
  useMediaQuery,
  Tooltip,
  Typography,
} from '@mui/material';
import Image from 'next/image';

/**
 * - center: JSX element (icon/image) OR centerSrc: string (http url) to render an iframe
 * - items: array of objects with { icon?, imageSrc?, msg }
 */
export default function CircularInfographicMinimal({
  center,
  centerSrc,
  items = [],
  colors,
}) {
  const count = Math.max(0, items.length);
  const [openTooltips, setOpenTooltips] = useState({});

  // responsive sizing using MUI breakpoints
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  const isMd = useMediaQuery(theme.breakpoints.between('sm', 'lg'));
  const size = isSm ? '20rem' : isMd ? '30rem' : '35rem';
  const circleColor = '#00B7EB';
  const tooltipBgColor = colors?.ternaryBg;

  const rOuter = 40; // distance from center for outer circles (percent)

  const positions = Array.from({ length: count }).map((_, i) => {
    const angleDeg = -90 + (360 / count) * i;
    const rad = (angleDeg * Math.PI) / 180;
    const xOuter = 50 + rOuter * Math.cos(rad);
    const yOuter = 50 + rOuter * Math.sin(rad);
    return { xOuter, yOuter };
  });

  return (
    <Box
      onTouchStart={() => setOpenTooltips({})}
      sx={{
        width: size,
        aspectRatio: '1 / 1',
        position: 'relative',
        margin: '0 auto',
        minWidth: '14rem',
      }}
    >
      {/* Minimalist single ring */}
      <svg
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid meet'
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        aria-hidden
      >
        <circle
          cx='50'
          cy='50'
          r='20'
          fill='none'
          stroke={colors?.secondaryBg || '#eaeaea'}
          strokeWidth='0.3'
        />

        {/* Connector lines */}
        {positions.map((p, idx) => (
          <line
            key={idx}
            x1='50'
            y1='50'
            x2={p.xOuter}
            y2={p.yOuter}
            stroke={colors?.secondaryBg || '#eaeaea'}
            strokeWidth='0.5'
            strokeLinecap='round'
          />
        ))}
      </svg>

      {/* Center large circle */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '34%',
          height: '34%',
          borderRadius: '50%',
          backgroundColor: circleColor,
          zIndex: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {centerSrc ? (
          <iframe
            title='center-iframe'
            src={centerSrc}
            style={{ width: '100%', height: '100%', border: 0 }}
            sandbox='allow-scripts allow-same-origin'
          />
        ) : (
          center
        )}
      </Box>

      {/* Outer icon circles with solid grey back-circles */}
      {positions.map((p, idx) => {
        const item = items[idx];

        return (
          <Tooltip
            key={idx}
            title={
              <Box p={1}>
                <Typography variant='body1' sx={{ maxWidth: '30rem' }}>
                  {item?.msg || ''}
                </Typography>
              </Box>
            }
            arrow
            open={!!openTooltips[idx]}
            onClose={() =>
              setOpenTooltips((prev) => ({ ...prev, [idx]: false }))
            }
            disableHoverListener={isSm}
            disableTouchListener
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: tooltipBgColor,
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: '8px',
                  boxShadow: '0 0 8px rgba(0, 0, 0, 0.3)',
                  '& .MuiTooltip-arrow': {
                    color: tooltipBgColor,
                  },
                },
              },
            }}
          >
            <Box
              onTouchStart={(e) => {
                e.stopPropagation();
                setOpenTooltips(prev => {
                  const isCurrentlyOpen = prev[idx];
                  return isCurrentlyOpen ? {} : { [idx]: true };
                });
              }}
              onMouseEnter={!isSm ? () =>
                setOpenTooltips((prev) => ({ ...prev, [idx]: true }))
              : undefined}
              onMouseLeave={!isSm ? () =>
                setOpenTooltips((prev) => ({ ...prev, [idx]: false }))
              : undefined}
              sx={{
                position: 'absolute',
                left: `${p.xOuter}%`,
                top: `${p.yOuter}%`,
                transform: 'translate(-50%, -50%)',
                width: '20%',
                height: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                touchAction: 'manipulation',
              }}
            >
              {/* solid grey back circle */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: colors?.secondaryBg || '#eaeaea',
                  zIndex: 1,
                }}
              />

              {/* foreground circle */}
              <Box
                sx={{
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  backgroundColor: circleColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  zIndex: 2,
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                {item?.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.msg}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  item?.icon
                )}
              </Box>
            </Box>
          </Tooltip>
        );
      })}
    </Box>
  );
}
