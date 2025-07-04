import { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import ImageButton from '@/components/ui/ImageButton';
import { getCoverImageUrl } from '@/utils/imagekit'; // Use client-side utility

const categories = [
  { name: 'City', folder: 'city' },
  { name: 'Street', folder: 'street' },
  { name: 'People', folder: 'people' },
  { name: 'Product', folder: 'product' },
];

const Photo = () => {
  const [coverUrls, setCoverUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate cover URLs for each category
    const urls = {};
    categories.forEach((category) => {
      urls[category.folder] = getCoverImageUrl(
        `/portfolio/${category.folder}/cover-${category.folder}.jpg`
      );
    });

    setCoverUrls(urls);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 15 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pt: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {categories.map((category, index) => (
        <ImageButton
          key={index}
          // TODO add default cover image
          imageUrl={coverUrls[category.folder] || '/images/default-cover.jpg'}
          text={category.name}
          href={`/photo/${category.name.toLowerCase()}`}
          width='100%'
        />
      ))}
    </Box>
  );
};

export default Photo;
