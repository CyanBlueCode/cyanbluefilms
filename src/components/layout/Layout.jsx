'use client';
import { useContext, useEffect, useState } from 'react';
import { Container, CssBaseline, Box, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import CustomAppBar from './AppBar';
import Footer from './Footer';
import { Analytics } from '@vercel/analytics/next';
import { showConstructionBannerContext } from '../../context/GlobalContext';

const Layout = ({ children, hideConstructionBanner = false }) => { // REVIEW temp construction banner code
  const [windowHeight, setWindowHeight] = useState('100vh');

  // ========== CONSTRUCTION BANNER - DELETE THIS ENTIRE SECTION WHEN SITE IS COMPLETE ==========
  const SHOW_CONSTRUCTION_BANNER_DEV = true;

  const { showConstructionBanner, closeConstructionBanner } = useContext(
    showConstructionBannerContext
  );

  const ConstructionBanner = () => (
    <Alert
      severity='warning'
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: '#ff9800',
        color: 'white',
        borderRadius: 2,
        textAlign: 'center',
        maxWidth: 300,
        fontWeight: 'bold',
        '& .MuiAlert-icon': { color: 'white' },
      }}
      action={
        <IconButton
          size='small'
          onClick={closeConstructionBanner}
          sx={{ color: 'white' }}
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
    >
      UNDER CONSTRUCTION
      <br />
      🚧
      <br />
      Our site is currently undergoing a redesign.
      <br />
      All content you see are currently placeholders, but feel free to X this
      message and look around.
    </Alert>
  );
  // ========== END CONSTRUCTION BANNER SECTION - DELETE ABOVE ==========

  useEffect(() => {
    // Handle mobile viewport height issues
    const setRealHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      setWindowHeight('calc(var(--vh, 1vh) * 100)');
    };

    setRealHeight();
    window.addEventListener('resize', setRealHeight);

    return () => window.removeEventListener('resize', setRealHeight);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {showConstructionBanner && SHOW_CONSTRUCTION_BANNER_DEV && !hideConstructionBanner && (
        <ConstructionBanner />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: windowHeight,
          width: '100%',
        }}
      >
        <CustomAppBar />
        <Container
          component='main'
          maxWidth='lg'
          sx={{
            flex: 1,
            width: '100%',
            minWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {children}
          <Analytics />
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
