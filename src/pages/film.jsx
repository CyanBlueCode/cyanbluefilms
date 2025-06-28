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
      "Commercial project for Earthside Farms' new healthy mango snacks",
  },
  {
    id: 'iSLqjiPa94Y',
    title: 'Ultralight',
    description:
      "Commercial project for AdTec Footwear's Ultralight line of work boots",
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
      backgroundPosition: 'center'
    }}
  >
    {filmsList.map((film, index) => (
      <Box
        key={index}
        sx={{
          mb: 2,
          pt: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
          }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${film.id}`}
            title={film.title}
            style={{
              width: '50rem',
              maxWidth: '80%',
              height: '28.125rem',
              maxHeight: '100%',
              border: 'none',
            }}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
        </Box>
        <Typography variant='h4' gutterBottom sx={{ pt: 2, color: 'white' }}>
          {film.title}
        </Typography>
        <Typography variant='body1' sx={{ color: 'white' }}>
          {film.description}
        </Typography>
      </Box>
    ))}
  </Box>
);

export default Film;
