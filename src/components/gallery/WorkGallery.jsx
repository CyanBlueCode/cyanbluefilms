'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import Gallery from './Gallery';
import GalleryPlaceholder from './Placeholder';
import { getThumbnailUrl, getOptimizedImageUrl } from '@/utils/imagekit';
import { combineImageArrays } from '@/utils/shuffleImages';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL;

const WorkGallery = ({ shuffle = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const INITIAL_LOAD = isMobile ? 10 : 20;
  const BATCH_SIZE = isMobile ? 5 : 20;

  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  // Fetch and combine images from folders A and B
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);

        const [responseA, responseB] = await Promise.all([
          fetch(`${WORKER_URL}/folder-images?folder=/portfolio/work/A`),
          fetch(`${WORKER_URL}/folder-images?folder=/portfolio/work/B`),
        ]);

        if (!responseA.ok || !responseB.ok) {
          throw new Error('Failed to fetch images');
        }

        const [imagesA, imagesB] = await Promise.all([
          responseA.json(),
          responseB.json(),
        ]);

        const combined = combineImageArrays(imagesA, imagesB, shuffle);

        const formatted = combined.map((img) => ({
          id: img.id,
          title: img.name,
          filePath: img.filePath,
          thumbnailUrl: getThumbnailUrl(img.filePath),
          imageUrl: getOptimizedImageUrl(img.filePath),
          width: img.width,
          height: img.height,
        }));

        setAllImages(formatted);
        setDisplayedPhotos(formatted.slice(0, INITIAL_LOAD));
        setCurrentIndex(INITIAL_LOAD);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [shuffle, INITIAL_LOAD]);

  // Load more images
  const loadMore = useCallback(() => {
    if (currentIndex >= allImages.length) return;

    const nextBatch = allImages.slice(currentIndex, currentIndex + BATCH_SIZE);
    setDisplayedPhotos((prev) => [...prev, ...nextBatch]);
    setCurrentIndex((prev) => prev + BATCH_SIZE);
  }, [currentIndex, allImages, BATCH_SIZE]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (loading || currentIndex >= allImages.length) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    if (sentinelRef.current) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loading, currentIndex, allImages.length, loadMore]);

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Typography
        variant='h2'
        sx={{
          textAlign: 'center',
          mb: 4,
          textTransform: 'capitalize',
        }}
      >
        Lens through which we see the world
      </Typography>

      {loading ? (
        <GalleryPlaceholder />
      ) : displayedPhotos.length > 0 ? (
        <>
          <Gallery photos={displayedPhotos} />
          {currentIndex < allImages.length && (
            <div ref={sentinelRef} style={{ height: '20px', margin: '20px 0' }} />
          )}
        </>
      ) : (
        <Typography variant='h5' textAlign='center'>
          No photos found for this gallery
        </Typography>
      )}
    </Box>
  );
};

export default WorkGallery;
