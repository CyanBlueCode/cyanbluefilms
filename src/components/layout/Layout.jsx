'use client';
import { Container, CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import CustomAppBar from './AppBar';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/next';

const Layout = ({ children }) => {
  const [windowHeight, setWindowHeight] = useState('100vh');

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
