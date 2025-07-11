import { Box, Typography } from '@mui/material';

const filmsList = [
  {
    id: 'Qoa2dEyorcA',
    title: 'To Be A Champion',
    description:
      'A documentary portrait about boxing, identity, purpose, and the unexpected shape of personal victory',
  },
  {
    id: 'PreLXNPv_vA',
    title: 'Snack Smarter',
    description:
      "Commercial project for a healthy snack company's new mango snacks",
  },
  {
    id: 'iSLqjiPa94Y',
    title: 'Ultralight',
    description:
      "Commercial project for footwear brand's new line of work boots",
  },
  {
    id: 'a6ryyXxvTyY',
    title: 'Neon',
    description: 'Cinematic fashion shoot teaser for a modeling agency',
  },
];

const Film = () => (
  <Box
    sx={{
      py: 10,
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(/images/film-bg.png)',
      // backgroundSize: 'contain',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {filmsList.map((film, index) => (
      <Box
        key={index}
        sx={{
          mb: 2,
          pt: 4,
          width: '100%',
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%', // full width of container
            maxWidth: { xs: '100%', sm: '50rem' }, // limit only on larger screens
            aspectRatio: '16 / 9',
            position: 'relative',
            overflow: 'hidden',
            mx: 'auto',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${film.id}`}
            title={film.title}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              padding: '0.5rem',
              top: 0,
              left: 0,
              border: 'none',
            }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Box>
        <Typography
          variant='h5'
          gutterBottom
          sx={{ pt: 2, color: 'white', fontWeight: 600 }}
        >
          {film.title}
        </Typography>
        <Typography variant='body1' sx={{ color: 'white', px: 2 }}>
          {film.description}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default Film;
