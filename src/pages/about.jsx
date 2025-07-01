import { Box, Typography, Container } from '@mui/material';

const About = () => (
  <Container maxWidth='md' sx={{ py: 10 }}>
    <Typography variant='h2' gutterBottom>
      Our Story
    </Typography>

    <Box
      sx={{
        backgroundImage: 'url(/images/about-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 300,
        width: '100%',
        mb: 4,
        borderRadius: 1,
      }}
    />

    <Typography variant='body1' sx={{ mb: 2 }}>
      Cyan Blue Films is a Los Angeles-based production company specializing in
      cinematic storytelling through photography and artistic film. Founded in
      2024 by award-winning filmmakers, we bring a unique artistic vision to
      every project.
    </Typography>

    <Typography variant='body1' sx={{ mb: 2 }}>
      Our team combines technical expertise with creative passion to deliver
      visual experiences that resonate with audiences. From commercial campaigns
      to artistic documentaries, we approach each project with meticulous
      attention to detail.
    </Typography>

    <Typography variant='h4' gutterBottom sx={{ mt: 4 }}>
      Our Philosophy
    </Typography>
    <Typography variant='body1'>
      We believe in the power of visual storytelling to connect people, evoke
      emotions, and inspire change. Every frame we capture is crafted with
      intention and purpose.
    </Typography>
  </Container>
);

export default About;
