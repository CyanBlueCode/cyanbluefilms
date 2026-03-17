import { Box, Typography, Container } from '@mui/material';
import { TitleSection } from '@/utils/TextHelpers';
import { useIsMobile } from '@/utils/useIsMobile';

const About = () => (
  <Container maxWidth='md' sx={{ py: 10 }}>
    <TitleSection
      title='About Us'
      titleVariant={useIsMobile() ? 'h4' : 'h2'}
      isPageTitle={true}
      pb={6}
    />

    <Box
      sx={{
        backgroundImage: 'url(/images/about-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: 350, sm: 500 },
        width: '100%',
        mb: 4,
        borderRadius: 1,
      }}
    />

    <Typography variant='h5' sx={{ my: 2 }}>
      We are a Los Angeles-based production company focused on elevating the
      visual identity of modern combat sports and performance culture.
    </Typography>

    <Typography variant='h5' sx={{ mb: 2 }}>
      Our team comes from both sides of the lens: filmmakers by trade, boxers by
      discipline. We understand the culture, the environments, and the athletes
      that define this world.
    </Typography>
    <Typography variant='h5' sx={{ mb: 2 }}>
      From commercial campaigns to branded and sponsored documentaries, we build
      efficient production frameworks designed for modern athletic brands. The
      result is cinematic films that feel authentic to the culture and showcase
      the products, athletes, and brands shaping combat and performance sports.
    </Typography>
    {/* 
    <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
      Our Philosophy
    </Typography>
    <Typography variant='body1'>
      We believe in the power of visual storytelling to connect people, evoke
      emotions, and inspire change. Every frame we capture is crafted with
      intention and purpose.
    </Typography> */}
  </Container>
);

export default About;
