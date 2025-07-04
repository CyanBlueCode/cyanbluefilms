'use client';
import { useState, useEffect } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import Gallery from './Gallery';
import GalleryPlaceholder from './Placeholder';
import { getThumbnailUrl, getOptimizedImageUrl } from '@/utils/imagekit'; // Use client-side utilities

// const ITEMS_PER_PAGE = 50;
const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL;

const CategoryGallery = ({ categoryName }) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!categoryName || !WORKER_URL) return;

    const fetchPhotos = async () => {
      try {
        setLoading(true);

        // Fetch from Cloudflare Worker
        const response = await fetch(
          `${WORKER_URL}/folder-images?folder=/portfolio/${categoryName}`
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to fetch images');
        }

        const images = await response.json();

        // Map to the format expected by Gallery
        const formattedPhotos = images.map((img) => ({
          id: img.id,
          title: img.name,
          filePath: img.filePath,
          // Generate URLs using our utility
          thumbnailUrl: getThumbnailUrl(img.filePath),
          imageUrl: getOptimizedImageUrl(img.filePath),
        }));

        setPhotos(formattedPhotos);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [categoryName]);

  return (
    <Box sx={{ pt: 15, pb: 4 }}>
      <Typography
        variant='h2'
        sx={{
          textAlign: 'center',
          mb: 4,
          textTransform: 'capitalize',
        }}
      >
        {categoryName} Gallery
      </Typography>

      {loading ? (
        <GalleryPlaceholder />
      ) : photos.length > 0 ? (
        <>
          <Gallery photos={photos} />

          {/* {totalPages > 1 && (
            <Stack direction='row' spacing={2} justifyContent='center' mt={4}>
              <Button
                variant='outlined'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Previous
              </Button>

              <Typography variant='body1' display='flex' alignItems='center'>
                Page {currentPage} of {totalPages}
              </Typography>

              <Button
                variant='outlined'
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </Stack>
          )} */}
        </>
      ) : (
        <Typography variant='h5' textAlign='center'>
          No photos found for this category
        </Typography>
      )}
    </Box>
  );
};

export default CategoryGallery;
