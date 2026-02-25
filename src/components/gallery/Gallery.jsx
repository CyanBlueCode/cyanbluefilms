'use client';
import React, { useState, useRef } from 'react';
import RowsPhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'react-photo-album/rows.css';
import { CircularProgress } from '@mui/material';
import { useIsMobile } from '@/utils/useIsMobile';

const Gallery = ({ photos }) => {
  const isMobile = useIsMobile();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxLoading, setLightboxLoading] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const hideTimeoutRef = useRef(null);

  const handleLightboxOpen = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setLightboxLoading(true);
    resetHideTimer();
  };

  const handleLightboxSlideLoaded = (index) => {
    if (index === currentIndex) {
      setLightboxLoading(false);
    }
  };

  // Format photos for react-photo-album
  const formattedPhotos = photos.map((photo) => ({
    src: photo.thumbnailUrl,
    width: photo.width,
    height: photo.height,
    alt: photo.title || 'Gallery image',
    key: photo.id,
  }));

  // Format slides for lightbox
  const lightboxSlides = photos.map((photo) => ({
    src: photo.imageUrl,
    alt: photo.title || 'Gallery image',
  }));

  const handleClose = () => {
    setLightboxOpen(false);
    setLightboxLoading(false);
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
  };

  const resetHideTimer = () => {
    if (!isMobile) return;
    setShowControls(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
  };

  return (
    <div style={{ margin: '2rem 0' }} onClick={resetHideTimer}>
      <RowsPhotoAlbum
        photos={formattedPhotos.filter((p) => p.width > 0 && p.height > 0)}
        layout='rows'
        spacing={8}
        targetRowHeight={300}
        rowConstraints={{
          maxPhotos: isMobile ? 2 : 4,
          minPhotos: isMobile ? 1 : 3,
          singleRowMaxHeight: isMobile ? 200 : 300,
        }}
        onClick={({ index }) => handleLightboxOpen(index)}
      />

      <Lightbox
        open={lightboxOpen}
        close={handleClose}
        slides={lightboxSlides}
        index={currentIndex}
        plugins={[Zoom]}
        animation={{ swipe: 300 }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
          ...(isMobile && { touchAction: 'pan-y' }),
        }}
        toolbar={{
          buttons: ['close'],
        }}
        carousel={{
          ...(isMobile && { finite: false }),
        }}
        // NOTE Auto-hide navigation arrows on mobile after 2 seconds of inactivity.
        // Arrows reappear on tap/slide change and stay visible on desktop.
        on={{
          view: () => {
            const img = document.querySelector('.yarl__slide_current img');
            if (img) img.oncontextmenu = (e) => e.preventDefault();
            resetHideTimer();
          },
          slideLoading: ({ index }) => handleLightboxSlideLoaded(index),
        }}
        render={{
          buttonPrev: isMobile && !showControls ? () => null : undefined,
          buttonNext: isMobile && !showControls ? () => null : undefined,
          iconClose: () => (
            <svg width='32' height='32' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
              />
            </svg>
          ),
        }}
        styles={{
          container: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            maxHeight: '100vh',
            overflow: 'hidden',
          },
          root: {
            '--yarl__color_backdrop': 'rgba(0, 0, 0, 0.9)',
          },
          slide: {
            padding: isMobile ? '10px' : '20px',
            boxSizing: 'border-box',
          },
        }}
      />

      {/* Lightbox loading overlay */}
      {lightboxLoading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1400,
          }}
        >
          <CircularProgress size={60} color='secondary' />
        </div>
      )}
    </div>
  );
};

export default Gallery;
