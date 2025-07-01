'use client';
import React, { useState, useEffect, useRef } from 'react';
import RowsPhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'react-photo-album/rows.css';
import { useTheme, useMediaQuery } from '@mui/material';
import Image from 'next/image'; // Added Next.js Image component

const Gallery = ({ photos }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dimensionedPhotos, setDimensionedPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loadedCountRef = useRef(0);

  useEffect(() => {
    const initialPhotos = photos.map((photo) => ({
      ...photo,
      width: 3,
      height: 2,
      loaded: false,
    }));

    setDimensionedPhotos(initialPhotos);
  }, [photos]);

  const handleImageLoad = (index) => (e) => {
    if (dimensionedPhotos[index].loaded) return;

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

  const formattedPhotos = dimensionedPhotos.map((photo) => ({
    src: photo.imageUrl,
    width: photo.width,
    height: photo.height,
    alt: photo.title || 'Gallery image',
    key: photo.id,
  }));

  // Handle swipe to close on mobile
  const handleClose = () => {
    setLightboxOpen(false);
  };

  return (
    <div style={{ margin: '2rem 0' }}>
      {isLoading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          Loading gallery...
        </div>
      )}

      {!isLoading && (
        <RowsPhotoAlbum
          photos={formattedPhotos}
          layout='rows'
          spacing={8} // Add spacing between photos
          targetRowHeight={300}
          rowConstraints={{
            maxPhotos: 4, // Maximum photos per row
            minPhotos: 1, // Minimum photos per row
            singleRowMaxHeight: isMobile ? 200 : 300, // Max height for single photo rows
          }}
          onClick={({ index }) => {
            setCurrentIndex(index);
            setLightboxOpen(true);
          }}
        />
      )}

      {/* Hidden image preloader - using img is acceptable here since it's not visible */}
      <div style={{ display: 'none' }}>
        {photos.map((photo, index) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            src={photo.imageUrl}
            alt='preloader'
            onLoad={handleImageLoad(index)}
            onError={() =>
              handleImageLoad(index)({
                target: { naturalWidth: 3, naturalHeight: 2 },
              })
            }
          />
        ))}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={handleClose}
        slides={formattedPhotos}
        index={currentIndex}
        plugins={[Zoom]}
        animation={{ swipe: 300 }}
        controller={{
          closeOnPullDown: true,
          closeOnBackdropClick: true,
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
          slide: ({ slide, rect }) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                maxHeight: isMobile ? 'calc(100vh - 80px)' : '90vh',
              }}
            >
              {/* Using Next.js Image component for optimized image loading */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
                style={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: '100%',
                }}
                quality={90}
                priority={false}
                unoptimized={false} // Set to true if using external CDN
              />
            </div>
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
    </div>
  );
};

export default Gallery;
