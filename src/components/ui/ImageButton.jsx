import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const ImageButton = ({
  imageUrl,
  text,
  href,
  aspectRatio = '2.35/1',
  width = { xs: '90%', sm: '80%', md: '70%', lg: '50%' }, // Responsive width
  height = { xs: '10rem', sm: '15rem', md: '20rem', lg: '20rem' }, // Responsive height
}) => {
  const router = useRouter();

  return (
    <Box
      component='a'
      onClick={() => router.push(href)}
      sx={{
        position: 'relative',
        width: width,
        height: height,
        aspectRatio: aspectRatio,
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 2,
        overflow: 'hidden',
        mb: { xs: 3, md: 4 }, // Responsive margin
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.03)',
          '& .overlay': {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          },
        },
      }}
    >
      <Box
        className='overlay'
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Typography
          variant='h3'
          color='white'
          sx={{
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }, // Responsive text
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageButton;
