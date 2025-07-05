import { Skeleton, useMediaQuery, Box } from '@mui/material';

const GalleryPlaceholder = () => {
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );
  const animation = prefersReducedMotion ? false : 'pulse';

  return (
    <Box
      sx={{
        display: 'grid',
        width: '90vw',
        height: {
          xs: '100%',
          sm: '80vh',
        },
        gridTemplateColumns: {
          xs: '1fr', // mobile: 1 column
          sm: 'repeat(2, 1fr)', // tablets: 2 columns
          md: 'repeat(6, 1fr)', // desktop: 4 columns
        },
        gap: 2,
      }}
    >
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            width: '100%',
            aspectRatio: {
              xs: '3 / 2', // mobile: landscape 3:2
              sm: '2 / 3', // tablet+: portrait 2:3
            },
          }}
        >
          <Skeleton
            variant='rectangular'
            animation={animation}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default GalleryPlaceholder;
