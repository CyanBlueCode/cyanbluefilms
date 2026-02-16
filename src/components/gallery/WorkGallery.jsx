'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Typography, Box } from '@mui/material';
import Gallery from './Gallery';
import GalleryPlaceholder from './Placeholder';
import { getThumbnailUrl, getOptimizedImageUrl } from '@/utils/imagekit';
import { combineImageArrays } from '@/utils/shuffleImages';

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL || 'https://cbf-worker.cyanblue.workers.dev';

const WorkGallery = ({ shuffle = true }) => {
  const [loading, setLoading] = useState(true);
  const [allPhotos, setAllPhotos] = useState([]);
  const [displayedPhotos, setDisplayedPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching from worker:', WORKER_URL);

        const [responseA, responseB] = await Promise.all([
          fetch(`${WORKER_URL}/folder-images?folder=/portfolio/work/A`),
          fetch(`${WORKER_URL}/folder-images?folder=/portfolio/work/B`),
        ]);

        if (!responseA.ok || !responseB.ok) {
          const errorA = !responseA.ok ? await responseA.text() : '';
          const errorB = !responseB.ok ? await responseB.text() : '';
          throw new Error(`Failed to fetch images: ${errorA} ${errorB}`);
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

        setAllPhotos(formatted);
        setDisplayedPhotos(formatted.slice(0, 20));
        setCurrentIndex(20);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [shuffle]);

  const loadMore = useCallback(() => {
    if (currentIndex >= allPhotos.length) return;
    
    const nextBatch = allPhotos.slice(currentIndex, currentIndex + 20);
    setDisplayedPhotos(prev => [...prev, ...nextBatch]);
    setCurrentIndex(prev => prev + 20);
  }, [currentIndex, allPhotos]);

  useEffect(() => {
    if (loading || !sentinelRef.current || currentIndex >= allPhotos.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [loading, currentIndex, allPhotos.length, loadMore]);

  return (
    <Box sx={{ pt: 10, pb: 4 }}>
      <Typography
        variant='h2'
        sx={{
          textAlign: 'center',
          mb: 4,
          textTransform: 'capitalize',
          px: 1
        }}
      >
        Lens through which we see the world
      </Typography>

      {loading ? (
        <GalleryPlaceholder />
      ) : error ? (
        <Typography variant='h5' textAlign='center' color='error'>
          {error}
        </Typography>
      ) : displayedPhotos.length > 0 ? (
        <>
          <Gallery photos={displayedPhotos} />
          {currentIndex < allPhotos.length && (
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
