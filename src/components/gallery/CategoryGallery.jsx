'use client';
import { useState, useEffect } from 'react';
import { Typography, Box, Button, Stack } from '@mui/material';
import Gallery from './Gallery';
import GalleryPlaceholder from './Placeholder';
import { getThumbnailUrl, getOptimizedImageUrl } from '@/utils/imagekit'; // Use client-side utilities

const ITEMS_PER_PAGE = 50;

const CategoryGallery = ({ categoryName }) => {
  const [loading, setLoading] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!categoryName) return;

    const fetchPhotos = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/folder-images?folder=/portfolio/${categoryName}`
        );

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to fetch images');
        }

        const allImages = await response.json();
        setTotalPages(Math.ceil(allImages.length / ITEMS_PER_PAGE));

        // Get current page images
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const currentImages = allImages.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );

        // Map to the format expected by Gallery
        const formattedPhotos = currentImages.map((img) => ({
          id: img.id,
          title: img.name,
          filePath: img.filePath,
          thumbnailUrl: getThumbnailUrl(img.filePath),
          imageUrl: getOptimizedImageUrl(img.filePath),
          width: img.width,
          height: img.height,
        }));

        setPhotos(formattedPhotos);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [categoryName, currentPage]);

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

          {totalPages > 1 && (
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
          )}
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
