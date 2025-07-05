'use client';
import React, { useState, useEffect, useRef } from 'react';
import RowsPhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'react-photo-album/rows.css';
import { useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import GalleryPlaceholder from '@/components/gallery/Placeholder';

const Gallery = ({ photos }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dimensionedPhotos, setDimensionedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lightboxLoading, setLightboxLoading] = useState(false);
  const loadedCountRef = useRef(0);

  // Initialize photos with placeholder dimensions
  useEffect(() => {
    const initialPhotos = photos.map((photo, index) => ({
      ...photo,
      width: photo.width || 3,
      height: photo.height || 2,
      loaded: false,
      index,
    }));

    setDimensionedPhotos(initialPhotos);
  }, [photos]);

  const handleImageLoad = (index) => (e) => {
    if (dimensionedPhotos[index]?.loaded) return;

    const img = e.target;
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    setDimensionedPhotos((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        width,
        height,
        loaded: true,
      };
      return updated;
    });

    loadedCountRef.current++;
    if (loadedCountRef.current === photos.length) {
      setIsLoading(false);
    }
  };

  const handleLightboxOpen = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setLightboxLoading(true);
  };

  const handleLightboxSlideLoaded = (index) => {
    if (index === currentIndex) {
      setLightboxLoading(false);
    }
  };

  // Format photos for react-photo-album
  const formattedPhotos = dimensionedPhotos.map((photo) => ({
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
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      {isLoading ? (
        <GalleryPlaceholder />
      ) : (
        <RowsPhotoAlbum
          photos={formattedPhotos.filter((p) => p.width > 0 && p.height > 0)}
          layout='rows'
          spacing={8}
          targetRowHeight={300}
          rowConstraints={{
            maxPhotos: isMobile ? 2 : 4,
            minPhotos: 1,
            singleRowMaxHeight: isMobile ? 200 : 300,
          }}
          onClick={({ index }) => handleLightboxOpen(index)}
        />
      )}
      {/* NOTE react-photo-album requires dimensions for layout calc */}
      {/* Hidden image preloader to get dimensions */}
      <div style={{ display: 'none' }}>
        {photos.map((photo, index) => (
          // REVIEW could use a better implementation
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={photo.thumbnailUrl}
            alt='preloader'
            onLoad={handleImageLoad(index)}
            onError={() =>
              handleImageLoad(index)({
                target: {
                  naturalWidth: photo.width || 3,
                  naturalHeight: photo.height || 2,
                },
              })
            }
          />
        ))}
      </div>

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
        }}
        on={{
          slideLoading: ({ index }) => handleLightboxSlideLoaded(index),
        }}
        render={{
          buttonPrev: lightboxOpen ? undefined : null,
          buttonNext: lightboxOpen ? undefined : null,
          iconClose: () => (
            <svg width='32' height='32' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
              />
            </svg>
          ),
          // Add loading indicator for lightbox
          iconLoading: () => <CircularProgress size={24} color='inherit' />,
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
