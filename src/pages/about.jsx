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
      We are a Los Angeles-based international production company specializing in
      cinematic commercial film for premium brands.
    </Typography>

    <Typography variant='h5' sx={{ mb: 2 }}>
      We deliver visual engineering and stories that capture audiences. From commercial campaigns
      to branded and sponsored documentaries, we approach every project with organized structure, meticulous
      attention to detail, and technical proficiency.
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
