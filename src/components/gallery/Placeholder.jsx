import { Skeleton } from '@mui/material';

const GalleryPlaceholder = () => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      gap: '1rem',
    }}
  >
    {[...Array(12)].map((_, i) => (
      <Skeleton
        key={i}
        variant='rectangular'
        width='100%'
        height={300}
        sx={{ borderRadius: 1 }}
      />
    ))}
  </div>
);

export default GalleryPlaceholder;
