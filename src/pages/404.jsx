import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Log 404 errors to future analytics
    console.error('404 Page Not Found: ', router.asPath);
  }, [router.asPath]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Oh no.
      </Typography>
      <Typography variant="h5" sx={{ mb: 4 }}>
        The page you&apos;re looking for doesn&apos;t
        <br/>
        exist or has been moved ☹️
      </Typography>
      <Button 
        variant="contained" 
        color="primary"
        onClick={() => router.push('/')}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default Custom404;