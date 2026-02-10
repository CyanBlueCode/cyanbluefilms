import React, { useState } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { PlayArrow } from '@mui/icons-material';
import Image from 'next/image';
import { SectionHeader } from '@/utils/TextHelpers';

const VideoModal = ({ videoUrl, open, onClose }) => {
  const [iframeSrc, setIframeSrc] = React.useState('');

  React.useEffect(() => {
    if (open && videoUrl) {
      const timer = setTimeout(() => {
        setIframeSrc(`${videoUrl}?autoplay=1`);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIframeSrc('');
    }
  }, [open, videoUrl]);

  return (
    <Box
      sx={{
        display: open ? 'block' : 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: 'rgba(0, 0, 0, 0.9)',
        zIndex: 9999,
      }}
      onClick={onClose}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '100vw', sm: '80dvw' },
          aspectRatio: '16/9',
          bgcolor: 'black',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {iframeSrc && (
          <iframe
            width='100%'
            height='100%'
            src={iframeSrc}
            title='Video'
            frameBorder='0'
            allowFullScreen
            allow='autoplay'
          />
        )}
      </Box>
    </Box>
  );
};

const VideoSection = ({ section, colors, backgroundColor }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openTooltip, setOpenTooltip] = useState(null);

  if (!section) return null;

  return (
    <Box
      sx={{
        width: '100vw',
        backgroundColor: backgroundColor || colors?.tertiaryBg || '#eaeaea',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <SectionHeader
        title={section.title}
        subtitle={section.subtitle}
        colors={colors}
      />

      <Box
        sx={{
          backgroundColor: 'rgb(0, 0, 0, 1)',
          border: 'none',
          aspectRatio: '16/9',
          width: { xs: '100vw', sm: '70vw' },
          position: 'relative',
          mt: 4,
        }}
      >
        {section.imageUrl ? (
          <>
            <Box
              onClick={() => setModalOpen(true)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                cursor: 'pointer',
              }}
            >
              <Image
                src={section.imageUrl}
                alt={section.title || 'Video Thumbnail'}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Button
              onClick={() => setModalOpen(true)}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: (theme) => alpha(theme.palette.cyanBlue.main, 0.75),
                color: '#fff',
                borderRadius: '50%',
                minWidth: { xs: 50, sm: 64 },
                width: { xs: 50, sm: 64 },
                height: { xs: 50, sm: 64 },
              }}
            >
              <PlayArrow fontSize='large' />
            </Button>
            <VideoModal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              videoUrl={section.videoUrl}
            />
          </>
        ) : (
          <iframe
            width='100%'
            height='100%'
            src={`${section.videoUrl}?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&vq=hd1080`}
            title={section.title || 'Video'}
            frameBorder='0'
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
      </Box>

      {/* Chapter Bar */}
      {section.chapters && section.chapters.length > 0 && (
        <Box
          sx={{
            width: { xs: '100vw', sm: '70vw' },
            height: { xs: 10, sm: 12 },
            display: 'flex',
            gap: 0.5,
            mt: 2,
            px: 0.5,
            animation: 'subtlePulse 3s ease-in-out infinite',
            '@keyframes subtlePulse': {
              '0%, 100%': { opacity: 0.5 },
              '50%': { opacity: 1 },
            },
          }}
        >
          {section.chapters.map((chapter, index) => (
            <Tooltip
              key={index}
              open={openTooltip === index || hoveredIndex === index}
              onClose={() => setOpenTooltip(null)}
              title={
                <Box sx={{ textAlign: 'center', p: 1 }}>
                  {chapter.imageUrl && (
                    <Box
                      sx={{
                        mb: 1,
                        position: 'relative',
                        width: 120,
                        height: 68,
                        mx: 'auto',
                      }}
                    >
                      <Image
                        src={chapter.imageUrl}
                        alt={chapter.title}
                        fill
                        style={{ objectFit: 'cover', borderRadius: 4 }}
                      />
                    </Box>
                  )}
                  <Typography variant='body2' sx={{ fontWeight: 600, mb: 0.5 }}>
                    {chapter.title}
                  </Typography>
                  <Typography variant='caption'>
                    {chapter.description}
                  </Typography>
                </Box>
              }
              arrow
              placement='bottom'
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'rgba(0, 0, 0, 0.95)',
                    maxWidth: 200,
                    p: 0,
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                    '& .MuiTooltip-arrow': {
                      color: 'rgba(0, 0, 0, 0.95)',
                      '&::before': {
                        border: '2px solid rgba(255, 255, 255, 0.2)',
                      },
                    },
                    // border: '1px solid rgba(255, 255, 255, 0.2)',
                    // boxShadow:
                    //   '0 0 0 1px rgba(0, 188, 235, 0.3), 0 4px 20px rgba(0, 0, 0, 0.8)',
                    // '& .MuiTooltip-arrow': {
                    //   color: 'rgba(0, 0, 0, 0.95)',
                    //   '&::before': {
                    //     border: '1px solid rgba(255, 255, 255, 0.2)',
                    //     boxShadow: '0 0 0 1px rgba(0, 188, 235, 0.3)',
                    //   },
                    // },
                  },
                },
              }}
            >
              <Box
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() =>
                  setOpenTooltip(openTooltip === index ? null : index)
                }
                sx={{
                  flex: chapter.percentage,
                  height: '100%',
                  bgcolor: hoveredIndex === index ? 'cyanBlue.main' : '#eaeaea',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  transform:
                    hoveredIndex === index ? 'scaleY(1.3)' : 'scaleY(1)',
                  borderRadius:
                    index === 0
                      ? '4px 0 0 4px'
                      : index === section.chapters.length - 1
                        ? '0 4px 4px 0'
                        : 0,
                }}
              />
            </Tooltip>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VideoSection;
