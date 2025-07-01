'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, CircularProgress } from '@mui/material';
import Gallery from '../../components/gallery/Gallery';

// Mock data for each category
const CATEGORY_PHOTOS = {
  city: [
    { id: 1, imageUrl: '/images/city.jpg' },
    { id: 2, imageUrl: '/images/city2.jpg' },
    { id: 3, imageUrl: '/images/city3.jpg' },
    { id: 4, imageUrl: '/images/city4.jpg' },
    { id: 5, imageUrl: '/images/city5.jpg' },
    { id: 6, imageUrl: '/images/city6.jpg' },
  ],
  street: [
    { id: 1, imageUrl: '/images/street.jpg' },
    { id: 2, imageUrl: '/images/city.jpg' },
    { id: 3, imageUrl: '/images/product.jpg' },
    { id: 4, imageUrl: '/images/people.jpg' },
    { id: 6, imageUrl: '/images/city.jpg' },
    { id: 5, imageUrl: '/images/street.jpg' },
    { id: 8, imageUrl: '/images/people.jpg' },
    { id: 7, imageUrl: '/images/product.jpg' },
  ],
  people: [
    { id: 1, imageUrl: '/images/people.jpg' },
    { id: 2, imageUrl: '/images/people2.jpg' },
  ],
  product: [
    { id: 1, imageUrl: '/images/product.jpg' },
    { id: 2, imageUrl: '/images/product2.jpg' },
  ],
};

const CategoryGallery = () => {
  const { pathname: category } = useRouter();
  const [loading, setLoading] = useState(true);

  // REVIEW placeholder; remove after real api integration
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  // Get formatted category name
  const formattedCategory = category ? category?.split('/')[2] : '';

  const photos = category ? CATEGORY_PHOTOS[formattedCategory] || [] : [];

  console.log('photos!! =>', photos);

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
        {formattedCategory} Gallery
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress size={60} />
        </Box>
      ) : photos.length > 0 ? (
        <Gallery photos={photos} />
      ) : (
        <Typography variant='h5' textAlign='center'>
          No photos found for this category
        </Typography>
      )}
    </Box>
  );
};

export default CategoryGallery;
